import React from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';

interface HeroProps {
  onStartPlanning: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartPlanning }) => {
  return (
    <div id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/travelhero/1920/1080"
          alt="Travel Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-slate-50/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-[-80px]">
        <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-1.5 mb-6">
          <span className="text-white font-medium text-sm tracking-wide uppercase">Discover the Extraordinary</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-sm">
          Explore the World <br />
          <span className="text-secondary-400">One Journey at a Time</span>
        </h1>
        <p className="text-xl text-slate-100 mb-10 max-w-2xl mx-auto font-light">
          Your dream vacation awaits. Curate personalized itineraries, discover hidden gems, and book unforgettable experiences with GlobalLY.
        </p>

        {/* Mock Search Bar - Visual Only, clicks lead to planner */}
        <div className="bg-white p-3 rounded-2xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-2 md:gap-4 transform hover:scale-[1.01] transition-transform duration-300">
            
            <div className="flex-1 flex items-center px-4 py-3 bg-slate-50 rounded-xl border border-transparent hover:border-primary-200 transition-colors group cursor-pointer" onClick={onStartPlanning}>
                <MapPin className="text-primary-500 mr-3" size={20} />
                <div className="text-left">
                    <p className="text-xs text-slate-500 font-semibold uppercase">Location</p>
                    <p className="text-slate-900 font-medium">Where are you going?</p>
                </div>
            </div>

            <div className="flex-1 flex items-center px-4 py-3 bg-slate-50 rounded-xl border border-transparent hover:border-primary-200 transition-colors group cursor-pointer" onClick={onStartPlanning}>
                <Calendar className="text-primary-500 mr-3" size={20} />
                <div className="text-left">
                    <p className="text-xs text-slate-500 font-semibold uppercase">Date</p>
                    <p className="text-slate-900 font-medium">Choose a date</p>
                </div>
            </div>

            <button 
                onClick={onStartPlanning}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary-600/30 transition-all flex items-center justify-center gap-2"
            >
                <Search size={20} />
                Plan Trip
            </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-white/80 text-sm font-medium">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary-400"></span>
                700+ Destinations
            </div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary-400"></span>
                24/7 Support
            </div>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary-400"></span>
                Best Price Guarantee
            </div>
        </div>
      </div>
    </div>
  );
};