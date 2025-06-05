import os
import uuid
import warnings
from constants import *
from flask_cors import CORS
from rag_engine import get_answer
from flask import send_from_directory,Flask, request, jsonify
from video_to_text_inference import text_inference
from capture_sign_from_video import capture_landmarks 
from text_openai_corrector import correct_sign_language_sentence

warnings.filterwarnings("ignore")

app = Flask(__name__)

CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def predict_text(parquet_file_path):
    if not os.path.exists(parquet_file_path):
        return jsonify({'error': f'File not found: {parquet_file_path}'}), 404

    try:
        prediction = text_inference(parquet_file_path)
        corrected_prediction = correct_sign_language_sentence(prediction)
        return jsonify({'status': 'success', 'prediction': corrected_prediction}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/process', methods=['POST'])
def process_video():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        unique_filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
        video_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        
        file.save(video_path)

        try:
            result_json, parquet_path = capture_landmarks(video_path)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
        return predict_text(parquet_path)
    else:
        return jsonify({'error': 'Invalid file type'}), 400

@app.route('/answer', methods=['POST'])
def answer_query():
    try:
        data = request.get_json()
        query = data.get("query")
        if not query:
            return jsonify({"error": "Missing 'query' field in request body"}), 400

        result = get_answer(query)

        if isinstance(result, dict) and result.get("file"):
            filename = result["file"].split('/')[-1]

            return send_from_directory(
                DOCUMENTS_DIR,
                filename,
                as_attachment=True,
                mimetype="application/pdf"
            )

        return jsonify({"status": "success", "answer": result}), 200

    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500
    
if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    app.run(debug=True, port=5000)
