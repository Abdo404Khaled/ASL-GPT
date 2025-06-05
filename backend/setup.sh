#!/bin/bash

echo "🚀 Starting ASL-GPT environment setup..."

cd "$(dirname "$0")"

if ! command -v poetry &> /dev/null; then
    echo "📦 Poetry not found. Installing Poetry..."
    curl -sSL https://install.python-poetry.org | python3 -
    export PATH="$HOME/.local/bin:$PATH"
else
    echo "📦 Poetry is already installed ✅"
fi

echo "🐍 Ensuring Python version is 3.9 - 3.11..."
poetry env use $(which python3)

echo "📚 Installing dependencies with Poetry..."
poetry install --no-root

echo "🔧 Installing pip-only packages ..."
poetry run pip install -r requirements.txt
poetry remove mediapipe
poetry add mediapipe
poetry run pip install chromadb

echo ""
echo "✅ Setup complete!"
echo ""

VENV_PATH=$(poetry env info --path)

echo "👉 Activating Poetry environment at: $VENV_PATH"
source "$VENV_PATH/bin/activate"

echo "🚀 Running app.py inside Poetry environment..."
python app.py

