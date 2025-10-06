// API configuration and utility functions
const API_BASE_URL = 'https://web-production-26984.up.railway.app';

// Crop Recommendation API
export const recommendCrop = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recommend-crop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to get crop recommendation');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Disease Detection API
export const detectDisease = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/api/detect-disease`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to detect disease');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Get available crops
export const getCrops = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/crops`);
    
    if (!response.ok) {
      throw new Error('Failed to get crops');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Get detectable diseases
export const getDiseases = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/diseases`);
    
    if (!response.ok) {
      throw new Error('Failed to get diseases');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Health check
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    
    if (!response.ok) {
      throw new Error('API is not responding');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
