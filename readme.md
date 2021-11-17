Code for ML Project

run ml_model.py in model folder

Curl to get response

curl --location --request POST 'localhost:5001/chatbot/classify' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3AJyrF2wbifZOhWpGeMq8LOk4wyuORxQfe.7g3XJrrRmj04nqDjtPp3ofBYuD2UyhhW6UfZ1uFkrIA' \
--data-raw '{
    "sentence": "What are the adverse side effects of this drug?"
}'