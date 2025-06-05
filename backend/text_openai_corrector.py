import os
from openai import OpenAI
from constants import API_KEY

client = OpenAI(api_key=API_KEY)

SYSTEM_PROMPT = \
"""
You are a corrector specialized in processing recognized sign language outputs. These inputs may be noisy, partial, or unstructured, and often lack proper grammar, word order, or clarity.

Your task is to:
- Attempt to correct and complete the sentence or words logically.
- Interpret possibly misspelled or partial words using context or common substitutions.
- Always return a cleaned and logical English sentence that best reflects the intended meaning.
- If the sentence is too ambiguous to correct, return the original input unchanged.

Respond **only** with the corrected sentence (do not explain your reasoning).

Input: {unstructured sign language sentence}
Output: {corrected English sentence or original if no correction is possible}
"""

def correct_sign_language_sentence(input_sentence):
    response = client.chat.completions.create(model="gpt-4o",
    messages=[
        {"role": "user", "content": SYSTEM_PROMPT},
        {"role": "user", "content": f"Input: {input_sentence}"}
    ])
    return response.choices[0].message.content
