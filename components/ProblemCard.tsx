import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CheckCircle2, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { ProblemData, FeedbackStatus } from '../types';
import { checkAnswer } from '../services/chemistryService';

interface ProblemCardProps {
  problem: ProblemData;
  index: number;
}

const COLORS = ['#4f46e5', '#06b6d4', '#8b5cf6'];

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem, index }) => {
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<FeedbackStatus>(FeedbackStatus.IDLE);

  const handleSubmit = () => {
    const result = checkAnswer(inputValue, problem.correctAnswer);
    
    if (result === 'correct') {
      setStatus(FeedbackStatus.SUCCESS);
    } else if (result === 'missing_unit') {
      setStatus(FeedbackStatus.MISSING_UNIT);
    } else {
      setStatus(FeedbackStatus.ERROR);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && status !== FeedbackStatus.SUCCESS) {
      handleSubmit();
    }
  };

  const chartData = problem.isotopes.map(iso => ({
    name: iso.name.split(' ')[1], // Short name for legend
    value: parseFloat(iso.percent)
  }));

  const isSolved = status === FeedbackStatus.SUCCESS;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 transition-all hover:shadow-md">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-bold text-slate-800 text-lg">
          Problem {index + 1}: <span className="text-indigo-600">{problem.elementName}</span>
        </h3>
        {isSolved && (
          <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            <CheckCircle2 size={16} /> Solved
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Table */}
          <div className="lg:col-span-2">
            <p className="text-slate-600 mb-4">
              Calculate the average atomic mass based on the following isotopic data:
            </p>
            
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Isotope</th>
                    <th className="px-4 py-3">Mass (amu)</th>
                    <th className="px-4 py-3">Abundance (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {problem.isotopes.map((iso, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                          {iso.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600">{iso.mass}</td>
                      <td className="px-4 py-3 font-mono text-slate-600">{iso.percent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Chart */}
          <div className="h-48 lg:h-auto min-h-[200px] relative bg-slate-50/50 rounded-xl border border-slate-100 hidden sm:block">
            <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-xs font-medium uppercase tracking-wider pointer-events-none z-0">
              Abundance
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value: number) => [`${value}%`, 'Abundance']}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Input Section */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <label htmlFor={`input-${problem.id}`} className="block text-sm font-medium text-slate-700 mb-2">
            Your Answer
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id={`input-${problem.id}`}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSolved}
              placeholder="e.g., 55.123 amu"
              className={`flex-1 min-w-[200px] px-4 py-2.5 rounded-lg border text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all
                ${status === FeedbackStatus.ERROR ? 'border-red-300 focus:ring-red-200 bg-red-50/20' : 
                  status === FeedbackStatus.SUCCESS ? 'border-emerald-300 bg-emerald-50/20 text-emerald-900' : 
                  'border-slate-300 focus:border-indigo-500 focus:ring-indigo-200'}`}
            />
            <button
              onClick={handleSubmit}
              disabled={isSolved}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 min-w-[140px]
                ${isSolved 
                  ? 'bg-emerald-600 text-white cursor-default' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow active:scale-95'}`}
            >
              {isSolved ? (
                <>Correct <CheckCircle2 size={18} /></>
              ) : (
                <>Check Answer <ArrowRight size={18} /></>
              )}
            </button>
          </div>

          {/* Feedback Messages */}
          <div className="mt-3 min-h-[1.5rem]">
            {status === FeedbackStatus.ERROR && (
              <div className="flex items-start gap-2 text-red-600 text-sm animate-in fade-in slide-in-from-top-1 duration-200">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>Incorrect. Remember to convert percentages to decimals (e.g., 50% = 0.50) before multiplying.</span>
              </div>
            )}
            {status === FeedbackStatus.MISSING_UNIT && (
              <div className="flex items-start gap-2 text-amber-600 text-sm animate-in fade-in slide-in-from-top-1 duration-200">
                <HelpCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>Almost there! The number is correct, but you are missing the unit <strong>amu</strong>.</span>
              </div>
            )}
            {status === FeedbackStatus.SUCCESS && (
               <div className="flex items-start gap-2 text-emerald-600 text-sm animate-in fade-in slide-in-from-top-1 duration-200">
                <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />
                <span>Great job! The average atomic mass is <strong>{problem.correctAnswer} amu</strong>.</span>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};