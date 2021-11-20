import nltk
from nltk.stem.wordnet import WordNetLemmatizer
import pickle
import pandas as pd
import numpy as np
import json
import csv

data = pickle.load( open( "chatbot-data.pkl", "rb" ) )
words = data['words']
classes = data['classes']

# Load intents data
intents =  json.load(open('intents 2.json'))['intents']
lemma_function = WordNetLemmatizer()

#load model
with open(f'chatbot-model.pkl', 'rb') as f:
    model = pickle.load(f)

csvFilePath = r'customer_testing.csv'

def get_words_from_input_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemma_function.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def get_input_as_bag_of_words(sentence, words, show_details=False):
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

def classify_input(sentence):
    ERROR_THRESHOLD = 0.25
    input_data = pd.DataFrame([get_input_as_bag_of_words(sentence, words)], dtype=float, index=['input'])
    results = model.predict([input_data])[0]
    # filter out predictions below a threshold, and provide intent index
    results = [[i,r] for i,r in enumerate(results)]
    # sort by strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        response = None
        context = None
        for intent in intents:
            if intent['tag'] == classes[r[0]]:
                response = intent['responses']
                context = intent['context']

        return_list.append({'tag': classes[r[0]], 'probability': str(r[1]), 'response': response, 'context': context})
    
    return return_list

total = 0
correct = 0

with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
         
        # Convert each row into a dictionary
        # and add it to data
        for rows in csvReader:
            sentence = rows['UTTERANCES']
            response = classify_input(sentence)
            tag = response[0]['tag'] if response[0] else ''
            if tag == rows['INTENT_NAME']:
                correct+=1
            total+=1
            print(f'total:{total} correct:{correct}')


