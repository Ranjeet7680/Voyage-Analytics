from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os

app = Flask(__name__)
# Enable CORS for the Next.js frontend
CORS(app, resources={r"/predict": {"origins": "*"}})

# Pointing to the model in the parent directory
model_path = os.path.join(os.path.dirname(__file__), '..', 'model.pkl')

if os.path.exists(model_path):
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    print("Model loaded successfully.")
else:
    print(f"Error: {model_path} not found. Please make sure train_model.py was run.")
    model = None

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        data = request.json
        input_data = {
            'from': data.get('source', 'Delhi (DEL)'),
            'to': data.get('destination', 'Mumbai (BOM)'),
            'flightType': data.get('flightClass', 'economic'),
            'distance': float(data.get('distance', 1000.0)),
            'agency': data.get('agency', 'CloudFy')
        }

        df = pd.DataFrame([input_data])
        predicted_price = model.predict(df)[0]
        
        return jsonify({
            "predicted_price": round(predicted_price, 2),
            "confidence": 85,
            "currency": "INR"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "API is running!"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
