import React from 'react';

const destinations = [
    { name: 'Bali', count: '120 Tours', img: 'https://picsum.photos/seed/bali/400/500' },
    { name: 'Paris', count: '85 Tours', img: 'https://picsum.photos/seed/paris/400/500' },
    { name: 'New York', count: '90 Tours', img: 'https://picsum.photos/seed/nyc/400/500' },
    { name: 'Dubai', count: '50 Tours', img: 'https://picsum.photos/seed/dubai/400/500' },
    { name: 'Tokyo', count: '110 Tours', img: 'https://picsum.photos/seed/tokyo/400/500' },
    { name: 'London', count: '75 Tours', img: 'https://picsum.photos/seed/london/400/500' }
];

export const Destinations: React.FC = () => {
    return (
        <section id="destinations" className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900">Top Destinations</h2>
                    <p className="text-slate-600 mt-4">Discover the world's most breathtaking places</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {destinations.map((dest, idx) => (
                        <div key={idx} className="relative group rounded-xl overflow-hidden h-64 cursor-pointer">
                            <img 
                                src={dest.img} 
                                alt={dest.name} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="font-bold text-lg">{dest.name}</h3>
                                <p className="text-xs text-slate-300">{dest.count}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}