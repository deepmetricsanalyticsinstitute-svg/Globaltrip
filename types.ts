export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TravelPackage {
  id?: string;
  destination: string;
  title: string;
  price: string;
  duration: string;
  travelers: number;
  description: string;
  hotelDetails: string;
  inclusions: string[];
  itinerary: ItineraryDay[];
  image?: string;
}

export interface BookingRequest {
  destination: string;
  dates: string;
  duration: number;
  travelers: number;
  budget: 'Budget' | 'Standard' | 'Luxury';
}

export enum ViewState {
  HOME = 'HOME',
  PLANNER = 'PLANNER',
  CONFIRMATION = 'CONFIRMATION'
}