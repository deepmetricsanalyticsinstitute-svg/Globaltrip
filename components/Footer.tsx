import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email) return;
    
    try {
        await fetch("https://formspree.io/f/mldvkano", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, _subject: "Newsletter Subscription" })
        });
        setSubscribed(true);
        setEmail('');
    } catch (err) {
        console.error("Subscription failed");
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
             <span className="font-display font-bold text-2xl text-white block mb-6">
              Global<span className="text-primary-500">LY</span>
            </span>
            <p className="text-sm leading-relaxed mb-6">
              Your trusted partner for international travel. We combine modern technology with human expertise to craft unforgettable journeys.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#popular" className="hover:text-white transition-colors">Packages</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Destinations</a></li>
              <li><a href="#planner" className="hover:text-white transition-colors">Trip Planner</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-500 mt-0.5" />
                <span>123 Travel Lane, Suite 100<br/>New York, NY 10012</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500" />
                <span>hello@globally.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe for latest offers and travel tips.</p>
            {subscribed ? (
                <div className="flex items-center gap-2 text-green-400 font-bold bg-green-400/10 p-3 rounded-lg">
                    <Check size={18} /> Subscribed!
                </div>
            ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address" 
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary-500 text-white text-sm"
                    required
                />
                <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 rounded-lg transition-colors text-sm">
                    Subscribe
                </button>
                </form>
            )}
          </div>

        </div>
        <div className="border-t border-slate-800 mt-16 pt-8 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} GlobalLY Travel. All rights reserved.
        </div>
      </div>
    </footer>
  );
};