import cv2
import numpy as np
import pandas as pd
import mediapipe as mp

mp_drawing = mp.solutions.drawing_utils
mp_holistic = mp.solutions.holistic

def capture_landmarks(video_path):
    frames_data = []
    cap = cv2.VideoCapture(video_path)
    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        frame = 0
        while cap.isOpened():
            success, image = cap.read()
            if not success:
                break

            image.flags.writeable = False
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            results = holistic.process(image)

            frame_data = {'sequence_id': 0, 'frame': frame}

            if results.face_landmarks:
                for idx, point in enumerate(results.face_landmarks.landmark):
                    frame_data[f"x_face_{idx}"] = point.x
                    frame_data[f"y_face_{idx}"] = point.y
                    frame_data[f"z_face_{idx}"] = point.z
            if results.pose_landmarks:
                for idx, point in enumerate(results.pose_landmarks.landmark):
                    frame_data[f"x_pose_{idx}"] = point.x
                    frame_data[f"y_pose_{idx}"] = point.y
                    frame_data[f"z_pose_{idx}"] = point.z
            if results.left_hand_landmarks:
                for idx, point in enumerate(results.left_hand_landmarks.landmark):
                    frame_data[f"x_left_hand_{idx}"] = point.x
                    frame_data[f"y_left_hand_{idx}"] = point.y
                    frame_data[f"z_left_hand_{idx}"] = point.z
            if results.right_hand_landmarks:
                for idx, point in enumerate(results.right_hand_landmarks.landmark):
                    frame_data[f"x_right_hand_{idx}"] = point.x
                    frame_data[f"y_right_hand_{idx}"] = point.y
                    frame_data[f"z_right_hand_{idx}"] = point.z

            frames_data.append(frame_data)

            frame += 1

    cap.release()

    landmark_data = pd.DataFrame(frames_data).fillna(np.nan)

    extension = video_path.split('.')[-1]
    output_file = video_path.replace(f".{extension}", f".parquet")

    landmark_data.to_parquet(output_file)

    return landmark_data.to_json(orient="records", lines=True), output_file