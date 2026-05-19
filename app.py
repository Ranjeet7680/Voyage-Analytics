from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os

app = Flask(__name__)
# Enable CORS for the Next.js frontend (which runs on port 3000)
CORS(app, resources={r"/*": {"origins": "*"}})

model_path = 'model.pkl'
if os.path.exists(model_path):
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    print("Model loaded successfully.")
else:
    print(f"Error: {model_path} not found. Please run train_model.py first.")
    model = None

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        data = request.json
        # Expected features: ['from', 'to', 'flightType', 'distance', 'agency']
        
        # Default values if something is missing
        input_data = {
            'from': data.get('source', 'Delhi (DEL)'),
            'to': data.get('destination', 'Mumbai (BOM)'),
            'flightType': data.get('flightClass', 'economic'),
            'distance': float(data.get('distance', 1000.0)),
            'agency': data.get('agency', 'CloudFy')
        }

        # Convert to DataFrame as the sklearn pipeline expects a DataFrame
        df = pd.DataFrame([input_data])
        
        # Predict
        predicted_price = model.predict(df)[0]
        
        # Format the response
        return jsonify({
            "predicted_price": round(predicted_price, 2),
            "confidence": 85, # Mock confidence score
            "currency": "INR"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/search_hotels', methods=['POST'])
def search_hotels():
    try:
        data = request.json
        destination = data.get('destination', 'Rio de Janeiro (RJ)')
        
        hotels_path = 'travel_capstone dataset/hotels.csv'
        if not os.path.exists(hotels_path):
            return jsonify({"error": "Dataset not found"}), 404
            
        # Read the dataset
        df = pd.read_csv(hotels_path)
        
        # Filter by place
        place_df = df[df['place'] == destination]
        
        if place_df.empty:
            return jsonify({"results": []})
            
        # Group by hotel name and get average price
        hotel_stats = place_df.groupby('name')['price'].mean().reset_index()
        hotel_stats = hotel_stats.sort_values(by='price', ascending=True).head(3)
        
        results = []
        for index, row in hotel_stats.iterrows():
            results.append({
                "name": row['name'],
                "price_per_night": round(row['price'], 2),
                "rating": round(4.0 + (index * 0.2), 1), # mock rating
                "match": round(90 + (index * 2), 1) # mock AI match score
            })
            
        return jsonify({
            "destination": destination,
            "results": results
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "API is running!"})

if __name__ == '__main__':
    # Run the Flask app on port 5000
    app.run(debug=True, host='0.0.0.0', port=5000)
