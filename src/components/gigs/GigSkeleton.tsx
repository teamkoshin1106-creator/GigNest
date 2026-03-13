/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const GigSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm animate-pulse">
      <div className="flex flex-col h-full">
        <div className="mb-4 flex items-start justify-between">
          <div className="h-6 w-24 rounded-full bg-slate-100" />
          <div className="h-6 w-16 rounded-lg bg-slate-100" />
        </div>

        <div className="mb-2 h-7 w-3/4 rounded-lg bg-slate-100" />
        <div className="mb-6 h-4 w-full rounded-lg bg-slate-100" />

        <div className="mt-auto flex flex-wrap gap-3 pt-4 border-t border-slate-50">
          <div className="h-5 w-20 rounded-full bg-slate-100" />
          <div className="h-4 w-24 rounded-lg bg-slate-100" />
          <div className="h-4 w-24 rounded-lg bg-slate-100" />
        </div>
        
        <div className="mt-4 flex items-center space-x-2">
          <div className="h-6 w-6 rounded-full bg-slate-100" />
          <div className="h-3 w-20 rounded-lg bg-slate-100" />
        </div>
      </div>
    </div>
  );
};
