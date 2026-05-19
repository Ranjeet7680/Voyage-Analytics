import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_squared_error, r2_score
import os

print("Step 2: Dataset Analysis")
# Use the correct path for the dataset
data_path = "travel_capstone dataset/flights.csv"

if not os.path.exists(data_path):
    print(f"Error: Dataset not found at {data_path}")
    exit(1)

# Read a subset of the dataset if it's too large, or read the whole thing
print("Loading dataset...")
df = pd.read_csv(data_path)

print("\n--- Dataset Info ---")
print(df.info())

print("\n--- First 5 Rows ---")
print(df.head())

print("\nStep 3: Flight Price Prediction Model (FIRST BUILD)")
print("Preparing data for training...")

# 1. Feature Selection
# We want to predict 'price' based on flight details
features = ['from', 'to', 'flightType', 'distance', 'agency']
target = 'price'

# Drop rows with missing values in our features or target
df = df.dropna(subset=features + [target])

X = df[features]
y = df[target]

# 2. Train/Test Split (Use a smaller sample for fast training if needed)
# Since the dataset has 270,000+ rows, we'll train on the whole dataset or a sample
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Preprocessing Pipeline
categorical_features = ['from', 'to', 'flightType', 'agency']
numeric_features = ['distance']

# OneHotEncode categorical variables
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ],
    remainder='passthrough' # Leave distance as is
)

# 4. Model Setup
# Using RandomForestRegressor - it's robust and performs well out of the box
# Using fewer estimators for faster training during this first build
model = RandomForestRegressor(n_estimators=50, random_state=42, n_jobs=-1)

# Create a pipeline that does preprocessing then modeling
pipeline = Pipeline(steps=[('preprocessor', preprocessor),
                           ('model', model)])

print(f"Training model on {len(X_train)} samples. This might take a minute...")
pipeline.fit(X_train, y_train)

# 5. Evaluation
print("Evaluating model...")
predictions = pipeline.predict(X_test)
mse = mean_squared_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print(f"Mean Squared Error: {mse:.2f}")
print(f"R2 Score: {r2:.2f}")

print("\nStep 4: Save Model")
model_filename = 'model.pkl'
with open(model_filename, 'wb') as file:
    pickle.dump(pipeline, file)

print(f"Model saved successfully to {model_filename}")
print("\nNext step: Step 5 - Flask REST API")
