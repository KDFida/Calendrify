from flask import Flask, request, jsonify
from joblib import load
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
model = load('prediction_model.joblib')  

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    estimated_hours = data['estimatedHours']
    priority = data['priority']

    priority_mapping = {'low': 1, 'medium': 2, 'high': 3}
    numeric_priority = priority_mapping.get(priority.lower(), 1)

    prediction = model.predict([[estimated_hours, numeric_priority]])
    return jsonify({'predictedHours': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True, port=5000)