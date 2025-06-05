import os
import re
import traceback
from constants import * 
from langchain_community.vectorstores import Chroma
from langchain_community.chat_models import ChatOpenAI
from langchain_community.embeddings import OpenAIEmbeddings

if not os.getenv("OPENAI_API_KEY"):
    os.environ["OPENAI_API_KEY"] = API_KEY

try:
    embedding_function = OpenAIEmbeddings()
    rag_db = Chroma(persist_directory=RAG_CHROMA_PATH, embedding_function=embedding_function)
    pdf_db = Chroma(persist_directory=PDF_META_CHROMA_PATH, embedding_function=embedding_function)
    model = ChatOpenAI()
except Exception as init_error:
    traceback.print_exc()
    raise init_error

def normalize(text):
    return re.sub(r'\W+', '', text).lower()

def match_local_pdf(query, pdf_db):
    try:
        results = pdf_db.similarity_search_with_relevance_scores(query, k=3)
        print(results)
        for doc, score in results:
            if score >= 0.7:
                return {"file": doc.metadata["file_path"]}

        return {"error": "Sorry, I couldn’t find a matching document."}
    except Exception:
        traceback.print_exc()
        return {"error": "Search failed internally."}

def generate_greeting_response():
    resp = model.invoke(GREETING_PROMPT.format_prompt().to_messages())
    return resp.content.strip()

def classify_intent(query) -> str:
    msgs = INTENT_PROMPT.format_prompt(text=query).to_messages()
    resp = model.invoke(msgs)
    return resp.content.strip()

def is_identity_question(query) -> bool:
    patterns = [
        "who are you", "what are you", "your role", "about you",
        "introduce yourself", "what is asl-gpt", "who is asl-gpt", "who am i speaking to",
        "who is the assistant"
    ]
    q = query.lower()
    return any(p in q for p in patterns)

def get_answer(query: str):
    try:
        if is_identity_question(query):
            return (
                "I am ASL-GPT, your E-JUST assistant. "
                "I help students from admission till graduation with all university information and support!"
            )

        intent = classify_intent(query)

        if intent == "retrieve_file":
            return match_local_pdf(query, pdf_db)

        if intent == "only_greeting":
            return generate_greeting_response()

        results = rag_db.similarity_search_with_relevance_scores(query, k=6)
        context_text = "\n\n---\n\n".join(doc.page_content for doc, _ in results)
        top_score = results[0][1] if results else 0.0

        if results and top_score > 0.7:
            prompt = PROMPT_TEMPLATE.format_messages(context=context_text, question=query)
            response = model.invoke(prompt)
            return response.content

        return "I'm sorry, I couldn't find information related to that. Please contact info@ejust.edu.eg for assistance."

    except Exception:
        traceback.print_exc()
        return "An internal error occurred. Please try again or contact support."