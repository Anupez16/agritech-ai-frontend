'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Clock, Sprout, Bug, TrendingUp } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function History() {
  const [cropPredictions, setCropPredictions] = useState([]);
  const [diseasePredictions, setDiseasePredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('crop');

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    setLoading(true);
    
    try {
      // Fetch crop predictions
      const { data: crops, error: cropError } = await supabase
        .from('crop_predictions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (cropError) throw cropError;
      setCropPredictions(crops || []);

      // Fetch disease predictions
      const { data: diseases, error: diseaseError } = await supabase
        .from('disease_predictions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (diseaseError) throw diseaseError;
      setDiseasePredictions(diseases || []);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Prediction History
          </h1>
          <p className="text-gray-600">
            View your past crop recommendations and disease detections
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Predictions</p>
                <p className="text-3xl font-bold text-gray-900">
                  {cropPredictions.length + diseasePredictions.length}
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Crop Recommendations</p>
                <p className="text-3xl font-bold text-green-600">
                  {cropPredictions.length}
                </p>
              </div>
              <Sprout className="h-10 w-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Disease Detections</p>
                <p className="text-3xl font-bold text-blue-600">
                  {diseasePredictions.length}
                </p>
              </div>
              <Bug className="h-10 w-10 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab('crop')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'crop'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Crop Predictions ({cropPredictions.length})
            </button>
            <button
              onClick={() => setActiveTab('disease')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'disease'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Disease Predictions ({diseasePredictions.length})
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading predictions...</p>
            </div>
          ) : (
            <>
              {/* Crop Predictions */}
              {activeTab === 'crop' && (
                <div className="space-y-4">
                  {cropPredictions.length === 0 ? (
                    <div className="text-center py-12">
                      <Sprout className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No crop predictions yet</p>
                    </div>
                  ) : (
                    cropPredictions.map((prediction) => (
                      <div
                        key={prediction.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Sprout className="h-5 w-5 text-green-600" />
                              <h3 className="text-xl font-bold text-green-600 capitalize">
                                {prediction.recommended_crop}
                              </h3>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                {prediction.confidence}% confidence
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                              <div>N: {prediction.nitrogen}</div>
                              <div>P: {prediction.phosphorus}</div>
                              <div>K: {prediction.potassium}</div>
                              <div>Temp: {prediction.temperature}°C</div>
                              <div>Humidity: {prediction.humidity}%</div>
                              <div>pH: {prediction.ph}</div>
                              <div>Rainfall: {prediction.rainfall}mm</div>
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <Clock className="h-4 w-4 inline mr-1" />
                            {formatDate(prediction.created_at)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Disease Predictions */}
              {activeTab === 'disease' && (
                <div className="space-y-4">
                  {diseasePredictions.length === 0 ? (
                    <div className="text-center py-12">
                      <Bug className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No disease predictions yet</p>
                    </div>
                  ) : (
                    diseasePredictions.map((prediction) => (
                      <div
                        key={prediction.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Bug className="h-5 w-5 text-blue-600" />
                              <h3 className="text-xl font-bold text-blue-600">
                                {prediction.detected_disease.replace(/_/g, ' ')}
                              </h3>
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {prediction.confidence}% confidence
                              </span>
                            </div>
                            {prediction.top_predictions && (
                              <div className="text-sm text-gray-600">
                                <p className="font-semibold mb-1">Top predictions:</p>
                                <div className="space-y-1">
                                  {prediction.top_predictions.map((pred, idx) => (
                                    <div key={idx} className="flex justify-between">
                                      <span>{pred.disease.replace(/_/g, ' ')}</span>
                                      <span className="font-medium">{pred.confidence}%</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <Clock className="h-4 w-4 inline mr-1" />
                            {formatDate(prediction.created_at)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}