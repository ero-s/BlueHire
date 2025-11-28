export interface Worker {
  id: string;
  name: string;
  avatar: string;
  category: string;
  // Extended fields for Find Workers & Profile
  location?: string;
  rating?: number;
  availability?: "Available" | "Busy" | "Weekends Only";
  hourlyRate?: number;
  bio?: string;
  skills?: string[];
  email?: string;
  phone?: string;
  address?: string;
  coverageArea?: string;
}

export interface PastHire {
  id: string;
  worker: Worker;
  date: string;
  paymentAmount: number;
  paymentStatus: "Paid" | "Refunded";
  rating: number; // 0-5
}

export interface Booking {
  id: string; // Corresponds to bookingID
  worker: Worker;
  serviceDate: string; // Corresponds to scheduledDateTime
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  price: number;
  // New fields from Class Diagram
  description: string;
  location: string;
  createdAt: string;
}

export interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
}

export interface Contact {
  id: string;
  name: string;
  role?: string;
  status: "Active" | "Offline";
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unread?: number;
}
