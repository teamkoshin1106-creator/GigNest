/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User as UserType } from '../types';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { ArrowLeft, User, Mail, Shield, Briefcase, Star, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfilePageProps {
  user: UserType;
  onBack: () => void;
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onBack, onLogout }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-bg-main pb-20"
    >
      <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center text-sm font-bold text-slate-400 hover:text-primary transition-colors group"
        >
          <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Gigs
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Profile Card */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary text-white shadow-xl shadow-primary/20">
                <User size={48} />
              </div>
              <h1 className="text-2xl font-black text-text-primary tracking-tight">{user.name}</h1>
              <p className="text-sm font-bold text-text-secondary mt-1 uppercase tracking-widest">Freelancer</p>
              
              <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
                <div className="flex items-center text-sm text-text-secondary">
                  <Mail size={16} className="mr-3 text-slate-300" />
                  <span className="font-medium">sowmya@example.com</span>
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <Shield size={16} className="mr-3 text-slate-300" />
                  <span className="font-medium">Verified Account</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-8 border-red-50 text-red-500 hover:bg-red-50 hover:border-red-100"
                onClick={onLogout}
              >
                Sign Out
              </Button>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50">
                  <p className="text-xl font-black text-text-primary">0</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Applied</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50">
                  <p className="text-xl font-black text-text-primary">0</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Earnings</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-black text-text-primary mb-6">Professional Skills</h2>
              <div className="flex flex-wrap gap-3">
                {user.skills.length > 0 ? user.skills.map(skill => (
                  <Badge key={skill} variant="info" className="px-4 py-2 text-sm">
                    {skill}
                  </Badge>
                )) : (
                  <p className="text-sm text-slate-400 italic">No skills added yet. Update your profile to show your expertise.</p>
                )}
              </div>
              <Button variant="ghost" className="mt-6 text-primary font-bold">
                Edit Skills
              </Button>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-xl font-black text-text-primary mb-6">Recent Activity</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                    <Clock size={20} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-bold text-text-primary">Joined GigNest</p>
                    <p className="text-xs text-text-secondary mt-1">Welcome to the community! Start exploring gigs today.</p>
                    <p className="text-[10px] font-bold text-slate-300 uppercase mt-2">Just Now</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-black mb-2">Complete your profile</h2>
                <p className="text-indigo-100 text-sm mb-6 max-w-md">Users with complete profiles are 4x more likely to get hired by top clients.</p>
                <Button className="bg-white text-indigo-600 hover:bg-indigo-50 border-none font-black">
                  Finish Setup
                </Button>
              </div>
              <div className="absolute -right-10 -bottom-10 h-40 w-40 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -left-10 -top-10 h-40 w-40 bg-indigo-400/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
