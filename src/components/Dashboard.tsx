import React, { useState, useEffect } from 'react';
import { CodeEditor } from './CodeEditor';
import { AICodeAnalysis } from './AICodeAnalysis';
import { MockInterview } from './MockInterview';
import { StudyPlan } from './StudyPlan';
import { ProblemList } from './ProblemList';
import { ScreenshotUploader } from './ScreenshotUploader';
import { VoiceAssistant } from './VoiceAssistant';
import { Layout, Code2, Video, BookOpen } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'practice' | 'interview' | 'study'>('practice');
  const { currentProblem, loadProblems } = useStore();

  useEffect(() => {
    loadProblems();
  }, []);

  const renderProblemDetails = () => {
    if (!currentProblem) return null;

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{currentProblem.title}</h1>
          <button
            onClick={() => useStore.getState().setCurrentProblem(null)}
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Problems
          </button>
        </div>
        <p className="text-gray-600 mb-4">{currentProblem.description}</p>
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <h3 className="font-medium mb-2">Examples:</h3>
          {currentProblem.examples?.map((example, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <p className="font-mono text-sm">Input: {example.input}</p>
              <p className="font-mono text-sm">Output: {example.output}</p>
              {example.explanation && (
                <p className="text-sm text-gray-600 mt-1">
                  Explanation: {example.explanation}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">Constraints:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {currentProblem.constraints?.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      {/* Tab Navigation */}
      <div className="mb-8">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-4 py-2 rounded-md flex items-center ${
              activeTab === 'practice'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Code2 className="h-5 w-5 mr-2" />
            Practice
          </button>
          <button
            onClick={() => setActiveTab('interview')}
            className={`px-4 py-2 rounded-md flex items-center ${
              activeTab === 'interview'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Video className="h-5 w-5 mr-2" />
            Mock Interview
          </button>
          <button
            onClick={() => setActiveTab('study')}
            className={`px-4 py-2 rounded-md flex items-center ${
              activeTab === 'study'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Study Plan
          </button>
        </nav>
      </div>

      {/* Utility Tools */}
      <div className="mb-8 space-y-4">
        <ScreenshotUploader />
        <VoiceAssistant />
      </div>

      {/* Main Content */}
      {activeTab === 'practice' && (
        <div className="space-y-8">
          {!currentProblem ? (
            <ProblemList />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                {renderProblemDetails()}
                <AICodeAnalysis />
              </div>
              <CodeEditor />
            </div>
          )}
        </div>
      )}

      {activeTab === 'interview' && <MockInterview />}
      {activeTab === 'study' && <StudyPlan />}
    </main>
  );
};