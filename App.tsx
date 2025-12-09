import React, { useState, useEffect } from 'react';
import { Atom, RefreshCw } from 'lucide-react';
import { TutorialCard } from './components/TutorialCard';
import { ProblemCard } from './components/ProblemCard';
import { generateProblemSet } from './services/chemistryService';
import { ProblemData } from './types';

function App() {
  const [problems, setProblems] = useState<ProblemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProblems = () => {
    setIsLoading(true);
    // Simulate a brief delay for better UX on refresh
    setTimeout(() => {
      setProblems(generateProblemSet(4));
      setIsLoading(false);
    }, 400);
  };

  useEffect(() => {
    loadProblems();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 bg-opacity-90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Atom size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Atomic Mass Master</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Chemistry Activity</p>
            </div>
          </div>
          
          <button 
            onClick={loadProblems}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Generate New Problems
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Intro / Tutorial */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <TutorialCard />
        </div>

        {/* Problems List */}
        <div className="space-y-6">
          {problems.map((problem, index) => (
            <div 
              key={problem.id} 
              className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-backwards"
              style={{ animationDelay: `${200 + (index * 100)}ms` }}
            >
              <ProblemCard 
                problem={problem} 
                index={index} 
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-slate-400 text-sm">
          <p>Practice makes perfect. Refresh to try new variations.</p>
        </div>

      </main>
    </div>
  );
}

export default App;