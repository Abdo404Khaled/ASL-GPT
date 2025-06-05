import json
import numpy as np
import pandas as pd
import mediapipe as mp
import tensorflow as tf


def text_inference(parquet_file) -> str:

    with open("assets/inference_args.json", "r") as f:
        inference_config = json.load(f)

    selected_columns = inference_config["selected_columns"]

    df = pd.read_parquet(parquet_file)

    missing_columns = [col for col in selected_columns if col not in df.columns]
    for col in missing_columns:
        df[col] = 0.0

    frames = df[selected_columns].to_numpy(dtype=np.float32)

    model_path = "assets/models/model.tflite"
    interpreter = tf.lite.Interpreter(model_path=model_path)

    input_details = interpreter.get_input_details()

    expected_shape = input_details[0]["shape"]
    if len(frames.shape) != len(expected_shape):
        raise ValueError(
            f"Dimension mismatch: Expected {len(expected_shape)} dimensions, but got {len(frames.shape)}."
        )
    if frames.shape[1] != expected_shape[1]:
        raise ValueError(
            f"Shape mismatch: Model expects {expected_shape[1]} features, but got {frames.shape[1]}."
        )

    interpreter.resize_tensor_input(input_details[0]["index"], frames.shape)
    interpreter.allocate_tensors()

    prediction_fn = interpreter.get_signature_runner("serving_default")
    output = prediction_fn(inputs=frames)

    with open("assets/character_to_prediction_index.json", "r") as f:
        character_map = json.load(f)

    rev_character_map = {v: k for k, v in character_map.items()}

    prediction_str = "".join([rev_character_map.get(s, "") for s in np.argmax(output["outputs"], axis=1)])

    if prediction_str == "2 a-e -aroe":
        prediction_str = "Please sign again to get the correct prediction"

    return prediction_str