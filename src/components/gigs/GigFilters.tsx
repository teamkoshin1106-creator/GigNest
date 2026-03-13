/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FilterState, Category, ExperienceLevel } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { AlertCircle } from 'lucide-react';

interface GigFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
}

const CATEGORIES: Category[] = ["Web Development", "Mobile Dev", "Design", "Writing", "Marketing"];
const EXPERIENCE_LEVELS: (ExperienceLevel | "All")[] = ["All", "Beginner", "Intermediate", "Expert"];

export const GigFilters: React.FC<GigFiltersProps> = ({ filters, setFilters, onReset }) => {
  const [budgetError, setBudgetError] = useState<string | null>(null);

  const toggleCategory = (category: Category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
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
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary">Categories</h4>
            {filters.categories.length > 0 && (
              <button 
                onClick={() => setFilters(prev => ({ ...prev, categories: [] }))}
                className="text-xs font-bold text-primary hover:text-primary-light transition-colors"
              >
                All Categories
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-semibold transition-all
                  ${filters.categories.includes(category)
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-slate-50 border border-slate-100 text-text-secondary hover:border-primary/30'}
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-50">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary">Experience Level</h4>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {EXPERIENCE_LEVELS.map(level => (
              <label key={level} className={`
                flex items-center p-2 rounded-xl border transition-all cursor-pointer group
                ${(level === "All" ? filters.experienceLevels.length === 0 : filters.experienceLevels.includes(level as ExperienceLevel))
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-transparent hover:bg-slate-50 text-text-secondary'}
              `}>
                <input
                  type="radio"
                  name="experience"
                  checked={level === "All" ? filters.experienceLevels.length === 0 : filters.experienceLevels.includes(level as ExperienceLevel)}
                  onChange={() => handleExperienceChange(level)}
                  className="w-4 h-4 border-slate-300 text-primary focus:ring-primary"
                />
                <span className="ml-3 text-sm font-medium">
                  {level}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-50">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary">Budget Range (₹)</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              label="Min"
              value={filters.budgetRange[0]}
              onChange={(e) => handleBudgetInputChange(e, 0)}
              className="text-xs font-bold"
            />
            <Input
              type="number"
              label="Max"
              value={filters.budgetRange[1]}
              onChange={(e) => handleBudgetInputChange(e, 1)}
              className="text-xs font-bold"
            />
          </div>
          {budgetError && (
            <div className="mt-2 flex items-start text-red-500 text-[10px] font-bold">
              <AlertCircle size={12} className="mr-1 mt-0.5 shrink-0" />
              <span>{budgetError}</span>
            </div>
          )}
        </div>
      </div>

      <Button variant="outline" className="w-full rounded-xl py-6 font-bold" onClick={onReset}>
        Reset All Filters
      </Button>
    </div>
  );
};
