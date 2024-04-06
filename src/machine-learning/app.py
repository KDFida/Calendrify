from flask import Flask, request, jsonify
from joblib import load

app = Flask(__name__)
model = load('prediction_model.joblib')  # Make sure your model file is in the same directory as this script

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    estimated_hours = data['estimatedHours']
    priority = data['priority']
    prediction = model.predict([[estimated_hours, priority]])
    return jsonify({'predictedHours': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Runs on http://localhost:5000