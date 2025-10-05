from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_KEY")

supabase: Client = create_client(url, key)

def save_crop_prediction(user_id, data, result):
    """Save crop prediction to database"""
    try:
        response = supabase.table('crop_predictions').insert({
            'user_id': user_id,
            'nitrogen': data['N'],
            'phosphorus': data['P'],
            'potassium': data['K'],
            'temperature': data['temperature'],
            'humidity': data['humidity'],
            'ph': data['ph'],
            'rainfall': data['rainfall'],
            'recommended_crop': result['recommended_crop'],
            'confidence': result['confidence']
        }).execute()
        return response
    except Exception as e:
        print(f"Error saving crop prediction: {e}")
        return None

def save_disease_prediction(user_id, result):
    """Save disease prediction to database"""
    try:
        response = supabase.table('disease_predictions').insert({
            'user_id': user_id,
            'detected_disease': result['disease'],
            'confidence': result['confidence'],
            'top_predictions': result['top_predictions']
        }).execute()
        return response
    except Exception as e:
        print(f"Error saving disease prediction: {e}")
        return None