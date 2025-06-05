# ASL-GPT

**ASL-GPT** is a full-stack RAG (Retrieval-Augmented Generation) system that enables users to interact using either American Sign Language (ASL) videos or text. The system translates ASL videos into grammatically correct English using computer vision and the Squeezeformer model for sign recognition, then retrieves or generates answers from a document-based knowledge base. If a user requests a file, it is retrieved directly from the stored documents.

> **Note:** The RAG (Retrieval-Augmented Generation) system is adaptable and can be tailored for different use cases. In this project, the use case is focused on E-Just, but the architecture allows for easy modification to support other domains or applications as needed.

---

## 📝 Overview

ASL-GPT bridges the communication gap between ASL users and English speakers, combining advanced gesture recognition with retrieval-augmented language generation. Users can submit ASL videos or text queries; the system processes the input, recognizes signs (if video), and provides accurate answers or retrieves files as needed.

**System Components:**
- **Frontend:** React-based web interface for video/text input and displaying answers or files.
- **Backend:** Python (Flask/FastAPI) server for video processing, gesture extraction, sign recognition, translation, and RAG-based answer retrieval.
- **Machine Learning Models:** Squeezeformer for gesture/sign recognition; sequence-to-sequence and retrieval models for translation and answer generation.

---

## 📁 Repository Structure

```
ASL-GPT/
├── backend/
│   ├── app.py            # Main backend server (to be modularized)
│   ├── modules/          # Utility functions (video, preprocessing, etc.)
│   ├── constants.py      # Constants management
│   ├── requirements.txt
│   ├── pyproject.toml
│   └── setup.sh
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page-level components
│   │   ├── hooks/        # Hooks-level components
│   │   └── api/          # API calls and utilities
│   ├── public/
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js & npm
- (Optional) Poetry

### Backend Setup

```bash
cd backend
bash setup.sh
# Or, if using Poetry:
poetry install
poetry run python app.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🧪 API Endpoints

| Endpoint         | Method | Description                        | Request Example                | Response Example              |
|------------------|--------|------------------------------------|-------------------------------|-------------------------------|
| `/process`       | POST   | Upload an ASL video file and get translation | `multipart/form-data` with `file` | `{ "status": "success", "prediction": "Hello!" }` or error |
| `/answer`        | POST   | Ask a question (text or file request) | `{ "query": "How are you?" }` | `{ "status": "success", "answer": "I'm good!" }` or file download |
| `/healthcheck`   | GET    | Check API status                   | -                             | `{ "status": "ok" }`          |

**Example:**
```bash
curl -X POST -F "file=@sample.mp4" http://localhost:5000/process
curl -X POST -H "Content-Type: application/json" -d '{"query":"What is ASL-GPT?"}' http://localhost:5000/answer
```

---

## 🛠️ Development & Best Practices

### Backend

- **Modularization:** Refactor `app.py` into `routes/`, `models/`, and `utils/`.
- **Error Handling:** Implement try/except blocks and return meaningful error messages.
- **Dockerization:** Add a `Dockerfile` for containerized deployment.

### Frontend

- **Component Structure:** Organize code into `components/`, `pages/`, and `hooks/`.
- **State Management:** Integrate Redux or Context API for state handling.
- **Responsive Design:** Ensure UI works across devices.

### Security

- **Input Validation:** Sanitize all user inputs.
- **Authentication:** Implement secure authentication if needed.
- **Dependency Management:** Regularly update and audit dependencies.

---

## 📄 License

See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

- [MediaPipe](https://mediapipe.dev/)
- [OpenCV](https://opencv.org/)
- [Hugging Face Transformers](https://huggingface.co/transformers/)
- [React](https://react.dev/)

---

*This project leverages open-source libraries for computer vision, natural language processing, and retrieval-augmented generation.*