import React from 'react';
import { Brain, Zap, AlertTriangle, CheckCircle2, Code2, Timer, Database } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CodeAnalysis } from '../types';

export const AICodeAnalysis: React.FC = () => {
  const { aiFeedback, isAnalyzing } = useStore();

  if (isAnalyzing) {
    return (
      <div className="animate-pulse bg-white rounded-lg shadow-lg p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!aiFeedback) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <Brain className="h-6 w-6 text-indigo-600 mr-2" />
        AI Code Analysis
      </h2>

      {/* Performance Metrics */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Timer className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-medium text-green-800">Time Complexity</h3>
          </div>
          <p className="text-green-600 font-mono">{aiFeedback.timeComplexity}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Database className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-medium text-blue-800">Space Complexity</h3>
          </div>
          <p className="text-blue-600 font-mono">{aiFeedback.spaceComplexity}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Zap className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="font-medium text-purple-800">Performance Score</h3>
          </div>
          <p className="text-purple-600 font-bold text-lg">{aiFeedback.performance.score}/100</p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 flex items-center">
          <Brain className="h-5 w-5 text-indigo-600 mr-2" />
          Suggestions
        </h3>
        <ul className="space-y-2">
          {aiFeedback.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start text-sm bg-gray-50 p-3 rounded-md">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Optimizations */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 flex items-center">
          <Zap className="h-5 w-5 text-yellow-500 mr-2" />
          Optimization Suggestions
        </h3>
        <ul className="space-y-2">
          {aiFeedback.optimizations.map((optimization, index) => (
            <li key={index} className="bg-yellow-50 p-3 rounded-md text-sm">
              {optimization}
            </li>
          ))}
        </ul>
      </div>

      {/* Design Patterns */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 flex items-center">
          <Code2 className="h-5 w-5 text-indigo-500 mr-2" />
          Identified Patterns
        </h3>
        <div className="flex flex-wrap gap-2">
          {aiFeedback.patterns.map((pattern, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
            >
              {pattern}
            </span>
          ))}
        </div>
      </div>

      {/* Performance Details */}
      <div>
        <h3 className="text-lg font-medium mb-3">Performance Details</h3>
        <ul className="space-y-2">
          {aiFeedback.performance.details.map((detail, index) => (
            <li key={index} className="flex items-center text-sm text-gray-700">
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};