/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Category = "Web Development" | "Mobile Dev" | "Design" | "Writing" | "Marketing";
export type ExperienceLevel = "Beginner" | "Intermediate" | "Expert";

export interface Gig {
  id: number;
  title: string;
  category: Category;
  budget: number;
  experienceLevel: ExperienceLevel;
  description: string;
  postedDate: string;
  clientName: string;
  location: string;
}

export interface FilterState {
  categories: Category[];
  budgetRange: [number, number];
  experienceLevels: ExperienceLevel[];
}

export type SortOption = "newest" | "oldest" | "budget_high" | "budget_low";
