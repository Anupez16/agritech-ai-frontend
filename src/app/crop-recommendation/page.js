'use client';

import { useState } from 'react';
import { recommendCrop } from '@/utils/api';
import { Loader2, Sprout, AlertCircle } from 'lucide-react';

export default function CropRecommendation() {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = {
        N: parseFloat(formData.N),
        P: parseFloat(formData.P),
        K: parseFloat(formData.K),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall)
      };

      const response = await recommendCrop(data);
      setResult(response);
    } catch (err) {
      setError('Failed to get recommendation. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Crop Recommendation
          </h1>
          <p className="text-gray-600">
            Enter your soil and environmental parameters to get AI-powered crop recommendations
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Soil Nutrients */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Soil Nutrients (kg/ha)</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nitrogen (N)
                  </label>
                  <input
                    type="number"
                    name="N"
                    value={formData.N}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    max="200"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium placeholder:text-gray-400"
                    placeholder="e.g., 90"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phosphorus (P)
                  </label>
                  <input
                    type="number"
                    name="P"
                    value={formData.P}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    max="200"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium placeholder:text-gray-400"
                    placeholder="e.g., 42"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Potassium (K)
                  </label>
                  <input
                    type="number"
                    name="K"
                    value={formData.K}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    max="200"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium placeholder:text-gray-400"
                    placeholder="e.g., 43"
                  />
                </div>
              </div>
            </div>

            {/* Environmental Parameters */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Environmental Parameters</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="-10"
                    max="60"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium placeholder:text-gray-400"
                    placeholder="e.g., 20.87"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Humidity (%)
                  </label>
                  <input
                    type="number"
                    name="humidity"
                    value={formData.humidity}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium placeholder:text-gray-400"
                    placeholder="e.g., 82.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soil pH
                  </label>
                  <input
                    type="number"
                    name="ph"
                    value={formData.ph}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    max="14"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium placeholder:text-gray-400"
                    placeholder="e.g., 6.50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rainfall (mm)
                  </label>
                  <input
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    max="500"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium placeholder:text-gray-400"
                    placeholder="e.g., 202.93"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sprout className="h-5 w-5 mr-2" />
                  Get Recommendation
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                <Sprout className="h-6 w-6 mr-2" />
                Recommended Crop
              </h3>
              <div className="bg-white rounded-lg p-6">
                <p className="text-4xl font-bold text-green-600 mb-2 capitalize">
                  {result.recommended_crop}
                </p>
                <p className="text-gray-600 mb-4">
                  Confidence: <span className="font-semibold text-green-600">{result.confidence}%</span>
                </p>
                
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-gray-600 mb-2 font-semibold">Input Parameters Used:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">N:</span> {result.input_parameters.N}
                    </div>
                    <div>
                      <span className="text-gray-500">P:</span> {result.input_parameters.P}
                    </div>
                    <div>
                      <span className="text-gray-500">K:</span> {result.input_parameters.K}
                    </div>
                    <div>
                      <span className="text-gray-500">Temp:</span> {result.input_parameters.temperature}°C
                    </div>
                    <div>
                      <span className="text-gray-500">Humidity:</span> {result.input_parameters.humidity}%
                    </div>
                    <div>
                      <span className="text-gray-500">pH:</span> {result.input_parameters.ph}
                    </div>
                    <div>
                      <span className="text-gray-500">Rainfall:</span> {result.input_parameters.rainfall}mm
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}