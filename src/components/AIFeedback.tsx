import React from 'react';
import { MessageSquare, Zap, Clock, Brain } from 'lucide-react';

export const AIFeedback: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Brain className="h-6 w-6 text-indigo-600 mr-2" />
        AI Analysis
      </h2>
      
      <div className="space-y-6">
        <div className="border-l-4 border-indigo-500 pl-4">
          <h3 className="font-medium flex items-center">
            <MessageSquare className="h-5 w-5 text-indigo-600 mr-2" />
            Suggestions
          </h3>
          <p className="text-gray-600 mt-2">
            Consider using a hash map to optimize the lookup operation. This would reduce the time complexity from O(n) to O(1).
          </p>
        </div>

        <div className="border-l-4 border-green-500 pl-4">
          <h3 className="font-medium flex items-center">
            <Zap className="h-5 w-5 text-green-600 mr-2" />
            Optimizations
          </h3>
          <p className="text-gray-600 mt-2">
            The current solution uses unnecessary space. Consider using in-place operations to optimize memory usage.
          </p>
        </div>

        <div className="border-l-4 border-yellow-500 pl-4">
          <h3 className="font-medium flex items-center">
            <Clock className="h-5 w-5 text-yellow-600 mr-2" />
            Complexity Analysis
          </h3>
          <div className="mt-2 space-y-1 text-gray-600">
            <p>Time Complexity: O(n)</p>
            <p>Space Complexity: O(n)</p>
          </div>
        </div>
      </div>
    </div>
  );
};