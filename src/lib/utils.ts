
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number | null) => {
  if (amount === null) return 'N/A';
  
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export function getRelativeTime(date: string | Date) {
  const now = new Date();
  const eventDate = new Date(date);
  const diffInDays = Math.floor((now.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return 'Today';
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}

export function getStockStatus(quantity: number) {
  if (quantity === 0) {
    return { status: 'Out of Stock', color: 'text-sake-red' };
  } else if (quantity <= 10) {
    return { status: 'Low Stock', color: 'text-amber-500' };
  } else {
    return { status: 'In Stock', color: 'text-green-600' };
  }
}

export function getEventStatus(startDate: string, endDate: string) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (now < start) {
    return { status: 'Upcoming', color: 'text-amber-500', bgColor: 'bg-amber-100' };
  } else if (now >= start && now <= end) {
    return { status: 'Ongoing', color: 'text-green-600', bgColor: 'bg-green-100' };
  } else {
    return { status: 'Past', color: 'text-gray-500', bgColor: 'bg-gray-100' };
  }
}

export function getRoleBadgeColor(roleId: number) {
  switch (roleId) {
    case 1: return { bg: 'bg-purple-100', text: 'text-purple-800' }; // Super Admin
    case 2:
    case 3: return { bg: 'bg-blue-100', text: 'text-blue-800' }; // Admin
    case 4: return { bg: 'bg-green-100', text: 'text-green-800' }; // Supplier Admin
    case 5: return { bg: 'bg-teal-100', text: 'text-teal-800' }; // Supplier User
    case 6: return { bg: 'bg-orange-100', text: 'text-orange-800' }; // Client
    case 7: return { bg: 'bg-gray-100', text: 'text-gray-800' }; // Regular User
    default: return { bg: 'bg-gray-100', text: 'text-gray-800' };
  }
}

export function getActivityColor(activityType: string) {
  switch (activityType) {
    case 'product_added':
    case 'supplier_added':
    case 'event_created':
    case 'user_registered':
      return 'text-green-600';
    case 'product_updated':
    case 'supplier_updated':
    case 'event_updated':
    case 'user_role_changed':
    case 'order_status_changed':
      return 'text-amber-500';
    case 'product_deleted':
    case 'supplier_deleted':
    case 'event_cancelled':
      return 'text-sake-red';
    case 'enquiry_received':
      return 'text-sake-deep-navy';
    default:
      return 'text-gray-600';
  }
}
