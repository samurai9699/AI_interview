import React, { useState, useEffect } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useStore } from '../store/useStore';
import { Play, RotateCcw, Loader, AlertTriangle } from 'lucide-react';
import { AICodeAnalysis } from './AICodeAnalysis';
import { CodeAnalyzer } from '../utils/codeAnalysis';

export const CodeEditor: React.FC = () => {
  const { 
    code, 
    setCode, 
    selectedLanguage, 
    isProcessing,
    setProcessing,
    setAIFeedback,
    currentProblem 
  } = useStore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeCode = async (codeToAnalyze: string) => {
    if (!codeToAnalyze.trim()) {
      setError('Please enter some code to analyze.');
      setAIFeedback(null);
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const analyzer = new CodeAnalyzer(codeToAnalyze, selectedLanguage);
      const result = await analyzer.analyze();

      if ('error' in result) {
        setError(result.error);
        setAIFeedback(null);
        setShowAnalysis(false);
      } else {
        setAIFeedback(result);
        setShowAnalysis(true);
      }
    } catch (error) {
      console.error('Error analyzing code:', error);
      setError('Failed to analyze code. Please try again.');
      setAIFeedback(null);
      setShowAnalysis(false);
    } finally {
      setProcessing(false);
    }
  };

  // Debounced code analysis
  useEffect(() => {
    const timer = setTimeout(() => {
      if (code.trim()) {
        analyzeCode(code);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [code, selectedLanguage]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await analyzeCode(code);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCode('');
    setShowAnalysis(false);
    setAIFeedback(null);
    setError(null);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="w-full bg-gray-900 rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <select 
            className="bg-gray-700 text-white px-3 py-1 rounded-md"
            value={selectedLanguage}
            onChange={(e) => useStore.getState().setLanguage(e.target.value as any)}
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="rust">Rust</option>
            <option value="go">Go</option>
            <option value="swift">Swift</option>
          </select>
          <div className="flex space-x-2">
            <button
              onClick={handleReset}
              className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 flex items-center"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !code.trim()}
              className={`px-3 py-1 rounded-md flex items-center ${
                isSubmitting || !code.trim()
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-500'
              }`}
            >
              {isSubmitting ? (
                <Loader className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-1" />
              )}
              {isSubmitting ? 'Analyzing...' : 'Run Code'}
            </button>
          </div>
        </div>
        <div className="p-4">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-[500px] bg-transparent text-white font-mono focus:outline-none resize-none"
            placeholder="Write your code here..."
            spellCheck="false"
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Analysis Panel */}
      {showAnalysis && !error && (
        <div className="transition-all duration-300 ease-in-out">
          <AICodeAnalysis />
        </div>
      )}
    </div>
  );
};