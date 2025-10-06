'use client';

import { useState } from 'react';
import { detectDisease } from '@/utils/api';
import { Loader2, Upload, Bug, AlertCircle, X } from 'lucide-react';
import Image from 'next/image';

export default function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setError(null);
      setResult(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await detectDisease(selectedFile);
      setResult(response);
    } catch (err) {
      setError('Failed to detect disease. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Plant Disease Detection
          </h1>
          <p className="text-gray-600">
            Upload a plant leaf image to detect diseases using AI
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Plant Leaf Image
              </label>

              {!preview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG up to 5MB
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    Select Image
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <div className="border-2 border-gray-300 rounded-lg p-4">
                    <Image
                      src={preview}
                      alt="Preview"
                      width={800}
                      height={600}
                      className="max-h-96 mx-auto rounded-lg object-contain"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {selectedFile.name}
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !selectedFile}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Bug className="h-5 w-5 mr-2" />
                  Detect Disease
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
            <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                <Bug className="h-6 w-6 mr-2" />
                Detection Result
              </h3>

              <div className="bg-white rounded-lg p-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Detected Disease:</p>
                  <p className="text-3xl font-bold text-blue-600 break-words">
                    {result.disease.replace(/_/g, ' ')}
                  </p>
                  <p className="text-gray-600 mt-2">
                    Confidence: <span className="font-semibold text-blue-600">{result.confidence}%</span>
                  </p>
                </div>

                {/* Top 3 Predictions */}
                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Top 3 Predictions:
                  </p>
                  <div className="space-y-2">
                    {result.top_predictions.map((pred, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="text-sm font-medium">
                          {index + 1}. {pred.disease.replace(/_/g, ' ')}
                        </span>
                        <span className="text-sm font-semibold text-blue-600">
                          {pred.confidence}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendation */}
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> This is an AI prediction. Please consult with
                    agricultural experts for proper diagnosis and treatment recommendations.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}