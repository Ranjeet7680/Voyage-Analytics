# Voyage Analytics

Voyage Analytics is an advanced AI-powered travel intelligence platform for predicting flight fares, planning trips, recommending hotels, analyzing travel demand, and handling emergency travel disruptions.

## Features

- Premium SaaS-grade landing page built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Recharts, and Lucide icons
- AI flight fare prediction interface with route, class, confidence, and best booking window
- Hotel recommendation cards with price, rating, and AI match score
- AI travel planner chatbot for budget trip planning
- Analytics dashboard for fare trends, demand forecasting, cancellation risk, airport load, and route heatmap
- Emergency mode for cancelled flights, alternate flights, nearby hotels, refund guidance, and emergency support
- Voice assistant, weather insight, currency converter, notifications, saved trips, PDF export, and email itinerary UI flows
- Mobile responsive and production-ready frontend experience

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React

### Backend / ML

- Python
- Flask
- Scikit-learn
- Pandas
- Pickle model artifact

## Project Structure

```text
Voyage-Analytics/
|-- app.py
|-- train_model.py
|-- model.pkl
|-- requirements.txt
|-- travel_capstone dataset/
|   |-- flights.csv
|   |-- hotels.csv
|   `-- users.csv
`-- frontend/
    |-- package.json
    |-- src/
    |   |-- app/
    |   `-- components/
    `-- public/
```

## Getting Started

### 1. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run Backend

```bash
python app.py
```

The Flask API runs locally and is used by the prediction flow.

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Run Frontend

```bash
npm run dev
```

Open the local Next.js URL shown in the terminal.

## Build Commands

```bash
cd frontend
npm run lint
npm run build
```

## GitHub Repository

```text
https://github.com/Ranjeet7680/Voyage-Analytics
```

## Team

- Ranjeet Kumar
- Dhanush S
- Ansh Kheni
- Sahil Thakur
