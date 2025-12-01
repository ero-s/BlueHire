export const Availability = {
  AVAILABLE_NOW: "Available Now",
  WEEKENDS: "Weekends Only",
  WEEKDAYS: "Weekdays Only",
  NEXT_WEEK: "Available Next Week",
} as const;

export type Availability = typeof Availability[keyof typeof Availability];

export interface Worker {
  id: string;
  name: string;
  trade: string;
  location: string;
  rating: number;
  reviews: number;
  availability: Availability;
  imageUrl: string;
  bio: string;
}

export interface FiltersState {
  trade: string;
  location: string;
  availability: string;
  rating: number;
}
