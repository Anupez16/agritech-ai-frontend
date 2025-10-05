'use client';

import Link from 'next/link';
import { Sprout, Bug, TrendingUp, Shield, Users, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Smart Farming with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get instant crop recommendations and plant disease detection using 
            advanced machine learning technology
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/crop-recommendation"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Recommend Crops
            </Link>
            <Link
              href="/disease-detection"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold border-2 border-green-600 hover:bg-green-50 transition-colors"
            >
              Detect Disease
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Crop Recommendation */}
            <div className="bg-green-50 p-8 rounded-xl">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Crop Recommendation</h3>
              <p className="text-gray-600 mb-4">
                Get personalized crop suggestions based on your soil nutrients, 
                climate conditions, and environmental factors.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  22 different crop types supported
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Based on NPK soil analysis
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Weather and pH optimization
                </li>
              </ul>
            </div>

            {/* Disease Detection */}
            <div className="bg-blue-50 p-8 rounded-xl">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Bug className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Disease Detection</h3>
              <p className="text-gray-600 mb-4">
                Upload plant leaf images to instantly detect diseases and get 
                treatment recommendations.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  15 disease classes detected
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  Instant image analysis
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-2">✓</span>
                  Confidence scores provided
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AgriTech AI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Increase Yield</h3>
              <p className="text-gray-600 text-sm">
                Make data-driven decisions to maximize your crop production
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Protect Crops</h3>
              <p className="text-gray-600 text-sm">
                Early disease detection helps prevent crop losses
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Save Time</h3>
              <p className="text-gray-600 text-sm">
                Get instant AI-powered recommendations in seconds
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Try our AI-powered tools and see the difference in your farming decisions
          </p>
          <Link
            href="/crop-recommendation"
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}