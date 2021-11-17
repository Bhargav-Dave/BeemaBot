import nltk
from nltk.corpus import wordnet as wn
from nltk.stem.wordnet import WordNetLemmatizer

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

import pickle
import pandas as pd
import numpy as np
import tensorflow as tf

# initialize flask server
app = Flask(__name__)
CORS(app)

# Load our bag of words and classes 
data = pickle.load( open( "chatbot-data.pkl", "rb" ) )
words = data['words']
classes = data['classes']

#load model
with open(f'chatbot-model.pkl', 'rb') as f:
    model = pickle.load(f)


# Functions to preprocess data 
lemma_function = WordNetLemmatizer()

def get_words_from_input_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemma_function.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def get_input_as_bag_of_words(sentence, words, show_details=True):
    sentence_words = get_words_from_input_sentence(sentence)
    bag = [0]*len(words)  
    for s in sentence_words:
        for i,w in enumerate(words):
            if w == s: 
                # assign 1 if current word is in the vocabulary position
                bag[i] = 1
                if show_details:
                    print ("found in bag: %s" % w)

    return(np.array(bag))

# function to classify input sentence
def classify_input(sentence):
    ERROR_THRESHOLD = 0.25
    
    input_data = pd.DataFrame([get_input_as_bag_of_words(sentence, words)], dtype=float, index=['input'])
    results = model.predict([input_data])[0]
    # filter out predictions below a threshold, and provide intent index
    results = [[i,r] for i,r in enumerate(results) if r>ERROR_THRESHOLD]
    # sort by strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append((classes[r[0]], str(r[1])))
    # return tuple of intent and probability
    
    return return_list

@app.route("/chatbot/classify", methods=['POST'])
def classify():
    sentence = request.json['sentence']
    # get prediction from model
    model_output = classify_input(sentence)
    response = jsonify(model_output)
    return response

# running REST interface, port=5000 for direct test, port=5001 for deployment from PM2
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)

