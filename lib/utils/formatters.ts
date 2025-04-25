"use client";

import { format } from "date-fns";

/**
 * Converts any value to a number
 */
export const toNumber = (value: any): number => {
  if (typeof value === 'number') return value;
  if (value === undefined || value === null) return 0;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Formats a date string to a readable format
 */
export const formatDate = (date: string | Date | undefined): string => {
  if (!date) return "Never";
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, "MMM d, yyyy");
  } catch (e) {
    return "Invalid date";
  }
};

/**
 * Formats a date to a relative time string
 */
export const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};