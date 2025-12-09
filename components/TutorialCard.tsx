import React from 'react';
import { BookOpen, Calculator } from 'lucide-react';

export const TutorialCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
          <BookOpen size={24} />
        </div>
        <h2 className="text-xl font-bold text-slate-800">The Concept</h2>
      </div>
      
      <p className="text-slate-600 mb-6">
        The average atomic mass is the weighted average of all the naturally occurring isotopes of an element. 
        It accounts for how common each isotope is in nature.
      </p>
      
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-6">
        <div className="flex items-start gap-3">
          <Calculator className="text-indigo-500 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="font-mono font-medium text-indigo-900 text-sm md:text-base">
              Average Mass = (Mass₁ × %Abundance₁) + (Mass₂ × %Abundance₂) + ...
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">1</span>
          <span>Convert percentages to decimals (÷ 100)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">2</span>
          <span>Round final answer to 3 decimal places</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">3</span>
          <span>Don't forget the unit "amu"</span>
        </div>
      </div>
    </div>
  );
};