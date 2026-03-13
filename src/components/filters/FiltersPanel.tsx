/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FilterState, Category, ExperienceLevel } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { AlertCircle, X } from 'lucide-react';

const CATEGORIES: Category[] = ["Web Development", "Mobile Dev", "Design", "Writing", "Marketing"];
const EXPERIENCE_LEVELS: (ExperienceLevel | "All")[] = ["All", "Beginner", "Intermediate", "Expert"];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  onClear?: () => void;
  showClear?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children, onClear, showClear }) => (
  <div className="py-8 px-2 first:pt-0 first:pb-8 border-t first:border-t-0 border-slate-100/80">
    <div className="flex items-center justify-between mb-6">
      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-700">{title}</h4>
      {showClear && onClear && (
        <button 
          onClick={onClear}
          className="px-3 py-1 rounded-full bg-primary/5 text-[9px] font-black text-primary border border-primary/10 hover:bg-primary hover:text-white hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300 active:scale-95"
        >
          Clear
        </button>
      )}
    </div>
    <div>
      {children}
    </div>
  </div>
);

export const FiltersPanel: React.FC<{
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
  className?: string;
}> = ({ filters, setFilters, onReset, className = "" }) => {
  const [budgetError, setBudgetError] = useState<string | null>(null);

  const toggleCategory = (category: Category) => {
    setFilters(prev => ({
      ...prev,
      categories: (prev.categories || []).includes(category)
        ? (prev.categories || []).filter(c => c !== category)
        : [...(prev.categories || []), category]
    }));
  };

  const handleExperienceChange = (level: ExperienceLevel | "All") => {
    setFilters(prev => ({
      ...prev,
      experienceLevels: level === "All" ? [] : [level]
    }));
  };

  const handleBudgetInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value);
    if (isNaN(value)) return;

    setFilters(prev => {
      const newRange = [...prev.budgetRange] as [number, number];
      newRange[index] = value;
      return { ...prev, budgetRange: newRange };
    });
  };

  useEffect(() => {
    if (filters.budgetRange[1] < filters.budgetRange[0]) {
      setBudgetError("Max budget cannot be less than min budget");
    } else {
      setBudgetError(null);
    }
  }, [filters.budgetRange]);

  return (
    <div className={`flex flex-col h-full bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/30 border border-slate-100 ${className}`}>
      <div className="flex-1 overflow-y-auto pr-2 -mr-2">
        <FilterSection 
          title="Categories" 
          showClear={(filters.categories || []).length > 0}
          onClear={() => setFilters(prev => ({ ...prev, categories: [] }))}
        >
          <div className="flex flex-col gap-3">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`
                  w-full px-4 py-3 rounded-2xl text-sm font-bold transition-all border text-left
                  ${(filters.categories || []).includes(category)
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105'
                    : 'bg-white border-slate-100 text-slate-600 hover:border-primary/30 hover:bg-slate-50'}
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Experience Level">
          <div className="space-y-3">
            {EXPERIENCE_LEVELS.map(level => (
              <label key={level} className={`
                flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer group
                ${(level === "All" ? (filters.experienceLevels || []).length === 0 : (filters.experienceLevels || []).includes(level as ExperienceLevel))
                  ? 'border-primary bg-primary/8 text-primary shadow-md shadow-primary/10'
                  : 'border-slate-100 hover:border-slate-200 bg-white text-slate-600'}
              `}>
                <div className={`
                  flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all flex-shrink-0
                  ${(level === "All" ? (filters.experienceLevels || []).length === 0 : (filters.experienceLevels || []).includes(level as ExperienceLevel))
                    ? 'border-primary bg-primary'
                    : 'border-slate-300 bg-white group-hover:border-slate-400'}
                `}>
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
                <input
                  type="radio"
                  name="experience"
                  checked={level === "All" ? (filters.experienceLevels || []).length === 0 : (filters.experienceLevels || []).includes(level as ExperienceLevel)}
                  onChange={() => handleExperienceChange(level)}
                  className="sr-only"
                />
                <span className="ml-3 text-sm font-bold">
                  {level}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Budget Range (₹)">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block">Min Budget</label>
                <input
                  type="number"
                  value={filters.budgetRange[0]}
                  onChange={(e) => handleBudgetInputChange(e, 0)}
                  className="w-full px-4 py-4 rounded-2xl border-2 border-slate-200 bg-white text-base font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="5000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block">Max Budget</label>
                <input
                  type="number"
                  value={filters.budgetRange[1]}
                  onChange={(e) => handleBudgetInputChange(e, 1)}
                  className="w-full px-4 py-4 rounded-2xl border-2 border-slate-200 bg-white text-base font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="50000"
                />
              </div>
            </div>
            <div className="pt-2">
              <div className="text-center bg-gradient-to-r from-slate-50 to-slate-50 rounded-2xl py-4 border border-slate-100">
                <div className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Selected Range</div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-primary font-black text-sm">₹{(filters.budgetRange[0] || 0).toLocaleString('en-IN')}</span>
                  <span className="text-slate-300">–</span>
                  <span className="text-primary font-black text-sm">₹{(filters.budgetRange[1] || 0).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
            {budgetError && (
              <div className="flex items-start text-red-600 text-xs font-bold bg-red-50 p-3 rounded-2xl border border-red-100">
                <AlertCircle size={14} className="mr-2 mt-0.5 shrink-0" />
                <span>{budgetError}</span>
              </div>
            )}
          </div>
        </FilterSection>
      </div>

      <div className="pt-8 mt-8 border-t border-slate-100">
        <button 
          onClick={onReset}
          className="group relative w-full py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 text-xs font-black text-slate-500 hover:text-white transition-all duration-300 uppercase tracking-[0.15em] overflow-hidden hover:shadow-lg hover:shadow-primary/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10">Reset All Filters</span>
        </button>
      </div>
    </div>
  );
};
