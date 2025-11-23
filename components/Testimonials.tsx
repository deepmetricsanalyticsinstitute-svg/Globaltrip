import React from 'react';
import { Quote } from 'lucide-react';

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "Travel Enthusiast",
    text: "GlobalLY planned our honeymoon perfectly. The AI itinerary was surprisingly detailed and fit our vibe exactly!",
    img: "https://picsum.photos/seed/person1/100/100"
  },
  {
    name: "Michael Chen",
    role: "Business Traveler",
    text: "Efficient, modern, and reliable. Booking my corporate retreat was a breeze with their system.",
    img: "https://picsum.photos/seed/person2/100/100"
  },
  {
    name: "Emma Wilson",
    role: "Family Vacation",
    text: "I loved how I could customize the budget. We got a luxury experience for a standard price. Highly recommend!",
    img: "https://picsum.photos/seed/person3/100/100"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">What Travelers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-slate-50 p-8 rounded-2xl relative">
              <Quote className="absolute top-6 right-6 text-primary-200 w-10 h-10 rotate-180" />
              <div className="flex items-center gap-4 mb-6">
                <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100" />
                <div>
                  <h4 className="font-bold text-slate-900">{review.name}</h4>
                  <p className="text-xs text-primary-600 font-medium">{review.role}</p>
                </div>
              </div>
              <p className="text-slate-600 italic">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};