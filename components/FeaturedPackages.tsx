import React from 'react';
import { Clock, Star, ArrowRight } from 'lucide-react';

const packages = [
  {
    id: 1,
    title: "Majestic Swiss Alps",
    destination: "Switzerland",
    image: "https://picsum.photos/seed/swiss/800/600",
    duration: "7 Days",
    rating: 4.9,
    price: "$2,499",
    tags: ["Nature", "Hiking"]
  },
  {
    id: 2,
    title: "Santorini Sunset Dreams",
    destination: "Greece",
    image: "https://picsum.photos/seed/greece/800/600",
    duration: "5 Days",
    rating: 4.8,
    price: "$1,899",
    tags: ["Romance", "Beach"]
  },
  {
    id: 3,
    title: "Kyoto Cultural Dive",
    destination: "Japan",
    image: "https://picsum.photos/seed/japan/800/600",
    duration: "9 Days",
    rating: 5.0,
    price: "$3,150",
    tags: ["Culture", "Food"]
  },
    {
    id: 4,
    title: "Safari Adventure",
    destination: "Kenya",
    image: "https://picsum.photos/seed/kenya/800/600",
    duration: "6 Days",
    rating: 4.9,
    price: "$2,800",
    tags: ["Wildlife", "Adventure"]
  }
];

export const FeaturedPackages: React.FC = () => {
  return (
    <section id="popular" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary-600 font-semibold uppercase tracking-wider">Handpicked for you</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-2">Popular Packages</h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
            View all destinations <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-slate-800">
                  <Star size={12} className="text-secondary-500 fill-current" /> {pkg.rating}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                    {pkg.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-md">{tag}</span>
                    ))}
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">{pkg.title}</h3>
                <p className="text-slate-500 text-sm mb-4 flex items-center gap-1">
                   {pkg.destination}
                </p>
                <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                  <div className="flex items-center text-slate-500 text-sm">
                    <Clock size={16} className="mr-1" />
                    {pkg.duration}
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    {pkg.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
             <button className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
            View all destinations <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};