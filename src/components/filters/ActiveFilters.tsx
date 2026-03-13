/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X } from 'lucide-react';
import { FilterState, Category, ExperienceLevel } from '../../types';

interface ActiveFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters, setFilters }) => {
  const hasActiveFilters = 
    (filters.categories || []).length > 0 || 
    (filters.experienceLevels || []).length > 0 || 
    filters.budgetRange[0] !== 5000 || 
    filters.budgetRange[1] !== 50000;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {(filters.categories || []).map(cat => (
        <button
          key={cat}
          onClick={() => setFilters(prev => ({ ...prev, categories: (prev.categories || []).filter(c => c !== cat) }))}
          className="inline-flex items-center px-3 py-1.5 rounded-xl bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 transition-all border border-primary/10"
        >
          {cat} <X size={12} className="ml-2" />
        </button>
      ))}
      
      {(filters.experienceLevels || []).map(exp => (
        <button
          key={exp}
          onClick={() => setFilters(prev => ({ ...prev, experienceLevels: (prev.experienceLevels || []).filter(e => e !== exp) }))}
          className="inline-flex items-center px-3 py-1.5 rounded-xl bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 transition-all border border-primary/10"
        >
          {exp} <X size={12} className="ml-2" />
        </button>
      ))}
      
      {(filters.budgetRange[0] !== 5000 || filters.budgetRange[1] !== 50000) && (
        <button
          onClick={() => setFilters(prev => ({ ...prev, budgetRange: [5000, 50000] }))}
          className="inline-flex items-center px-3 py-1.5 rounded-xl bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/10 transition-all border border-primary/10"
        >
          ₹{filters.budgetRange[0]} - ₹{filters.budgetRange[1]} <X size={12} className="ml-2" />
        </button>
      )}
    </div>
  );
};
