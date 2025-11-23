import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Calendar, Users, DollarSign, MapPin, Clock, CheckCircle, Loader2, ArrowRight, Plane, ArrowLeft, Mail, Phone, User } from 'lucide-react';
import { BookingRequest, TravelPackage } from '../types';
import { generateTripPackage } from '../services/geminiService';

export const Planner: React.FC = () => {
  const [step, setStep] = useState<'form' | 'loading' | 'result' | 'contact' | 'booked'>('form');
  const [formData, setFormData] = useState<BookingRequest>({
    destination: '',
    dates: '',
    duration: 5,
    travelers: 2,
    budget: 'Standard'
  });
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [packageData, setPackageData] = useState<TravelPackage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!process.env.API_KEY) {
        setError("API Key is missing. Please configure the environment.");
        return;
    }
    setError(null);
    setStep('loading');
    
    try {
      const result = await generateTripPackage(formData);
      if (result) {
        setPackageData(result);
        setStep('result');
      } else {
        setError("Could not generate itinerary. Please try again.");
        setStep('form');
      }
    } catch (err) {
        console.error(err);
      setError("An error occurred while communicating with our AI agent.");
      setStep('form');
    }
  };

  const handleProceedToBook = () => {
    setStep('contact');
  };

  const handleFinalBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const response = await fetch("https://formspree.io/f/mldvkano", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _subject: `New Booking Request: ${packageData?.title}`,
                ...contactData,
                booking_details: {
                    destination: packageData?.destination,
                    price: packageData?.price,
                    duration: packageData?.duration,
                    travelers: packageData?.travelers,
                    dates: formData.dates,
                    budget: formData.budget,
                    itinerary_summary: packageData?.description
                }
            })
        });

        if (response.ok) {
            setStep('booked');
        } else {
            setError("There was a problem submitting your booking. Please try again.");
        }
    } catch (err) {
        setError("Network error. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStep('form');
    setPackageData(null);
    setFormData({
        destination: '',
        dates: '',
        duration: 5,
        travelers: 2,
        budget: 'Standard'
    });
    setContactData({
        name: '',
        email: '',
        phone: '',
        notes: ''
    });
  };

  return (
    <div id="planner" className="py-20 bg-slate-50 scroll-mt-20" ref={formRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-primary-600 font-semibold tracking-wide uppercase">AI-Powered Booking</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-2">
            Custom Trip Planner
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Tell us where and when, and our AI will build a complete itinerary with hotels, pricing, and daily activities instantly.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 min-h-[500px]">
          
          {step === 'form' && (
            <div className="p-8 md:p-12">
               {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg">
                        {error}
                    </div>
                )}
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Destination</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 text-slate-400" size={20} />
                      <input
                        type="text"
                        name="destination"
                        required
                        placeholder="e.g., Kyoto, Japan"
                        value={formData.destination}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Travel Dates (Approx)</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 text-slate-400" size={20} />
                      <input
                        type="text"
                        name="dates"
                        required
                        placeholder="e.g., October 15-25"
                        value={formData.dates}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Duration (Days)</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3.5 text-slate-400" size={20} />
                        <input
                          type="number"
                          name="duration"
                          min={1}
                          max={30}
                          required
                          value={formData.duration}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Travelers</label>
                        <div className="relative">
                          <Users className="absolute left-3 top-3.5 text-slate-400" size={20} />
                          <input
                            type="number"
                            name="travelers"
                            min={1}
                            required
                            value={formData.travelers}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                          />
                        </div>
                      </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Budget Level</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3.5 text-slate-400" size={20} />
                      <select
                        name="budget"
                        value={formData.budget}
                        // @ts-ignore
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all appearance-none bg-white"
                      >
                        <option value="Budget">Budget Friendly</option>
                        <option value="Standard">Standard</option>
                        <option value="Luxury">Luxury</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles size={20} />
                    Generate My Itinerary
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-4">
                    Powered by Gemini AI. Itineraries are generated in real-time.
                  </p>
                </div>
              </form>
            </div>
          )}

          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center h-full min-h-[500px] p-8">
              <Loader2 className="w-16 h-16 text-primary-600 animate-spin mb-6" />
              <h3 className="text-xl font-bold text-slate-800">Designing your trip...</h3>
              <p className="text-slate-500 mt-2">Checking flights, hotels, and experiences for {formData.destination}</p>
            </div>
          )}

          {step === 'result' && packageData && (
            <div className="flex flex-col md:flex-row h-full min-h-[600px]">
              {/* Sidebar Info */}
              <div className="w-full md:w-1/3 bg-slate-50 p-8 border-r border-slate-100 flex flex-col">
                <div className="mb-6">
                  <div className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">Your Trip</div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 leading-tight mb-2">{packageData.destination}</h3>
                  <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                    <span className="bg-white border px-2 py-1 rounded-md flex items-center gap-1"><Clock size={14}/> {packageData.duration}</span>
                    <span className="bg-white border px-2 py-1 rounded-md flex items-center gap-1"><Users size={14}/> {packageData.travelers} Pax</span>
                  </div>
                </div>
                
                <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <p className="text-slate-500 text-xs uppercase font-bold mb-1">Estimated Price</p>
                  <div className="text-3xl font-bold text-primary-600">{packageData.price}</div>
                  <p className="text-xs text-slate-400 mt-1">*Includes taxes & fees</p>
                </div>

                <div className="mb-6">
                    <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <Plane size={16} className="text-primary-500"/> Inclusions
                    </h4>
                    <ul className="space-y-2">
                        {packageData.inclusions.map((inc, idx) => (
                            <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                                {inc}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="mt-auto">
                    <button onClick={handleProceedToBook} className="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-3 rounded-xl shadow-md transition-colors mb-3">
                        Proceed to Book
                    </button>
                    <button onClick={reset} className="w-full bg-white border border-slate-200 text-slate-600 font-medium py-3 rounded-xl hover:bg-slate-50 transition-colors">
                        Start Over
                    </button>
                </div>
              </div>

              {/* Itinerary Content */}
              <div className="w-full md:w-2/3 p-8 overflow-y-auto h-[600px] custom-scrollbar">
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">{packageData.title}</h3>
                <p className="text-slate-600 mb-8">{packageData.description}</p>

                <div className="mb-8 p-5 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-2">Accommodation</h4>
                    <p className="text-blue-800 text-sm">{packageData.hotelDetails}</p>
                </div>

                <h4 className="text-lg font-bold text-slate-800 mb-6 border-b pb-2">Day-by-Day Itinerary</h4>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {packageData.itinerary.map((day, idx) => (
                        <div key={idx} className="relative flex items-start group is-active">
                            <div className="absolute left-0 ml-5 h-full w-0.5 bg-slate-200 -translate-x-1/2"></div>
                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 ml-0 rounded-full bg-primary-100 text-primary-600 font-bold border-4 border-white shadow-sm z-10">
                                {day.day}
                            </div>
                            <div className="ml-6 flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                                    <h5 className="font-bold text-slate-900 text-lg">{day.title}</h5>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                                    {day.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {step === 'contact' && packageData && (
             <div className="p-8 md:p-12">
                <div className="mb-8">
                    <button onClick={() => setStep('result')} className="text-slate-500 hover:text-primary-600 flex items-center gap-1 mb-4">
                        <ArrowLeft size={16} /> Back to Itinerary
                    </button>
                    <h3 className="text-2xl font-display font-bold text-slate-900">Confirm Your Booking</h3>
                    <p className="text-slate-600">Please provide your details so we can finalize your trip to <span className="font-bold text-primary-600">{packageData.destination}</span>.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                             <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Trip Summary</h4>
                             <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Destination</span>
                                    <span className="font-medium text-slate-900">{packageData.destination}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Dates</span>
                                    <span className="font-medium text-slate-900">{formData.dates}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Travelers</span>
                                    <span className="font-medium text-slate-900">{packageData.travelers}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Duration</span>
                                    <span className="font-medium text-slate-900">{packageData.duration}</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-slate-200">
                                    <span className="font-bold text-slate-800">Total Price</span>
                                    <span className="font-bold text-primary-600">{packageData.price}</span>
                                </div>
                             </div>
                        </div>
                    </div>

                    <form onSubmit={handleFinalBooking} className="space-y-6">
                         {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 text-slate-400" size={20} />
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    value={contactData.name}
                                    onChange={handleContactChange}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-slate-400" size={20} />
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    value={contactData.email}
                                    onChange={handleContactChange}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3.5 text-slate-400" size={20} />
                                <input 
                                    type="tel" 
                                    name="phone"
                                    required
                                    value={contactData.phone}
                                    onChange={handleContactChange}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes</label>
                            <textarea 
                                name="notes"
                                value={contactData.notes}
                                onChange={handleContactChange}
                                className="w-full p-4 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none h-32 resize-none"
                                placeholder="Any special requests or dietary restrictions?"
                            ></textarea>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-primary-600 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 transform hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} /> Processing...
                                </>
                            ) : (
                                "Confirm Booking"
                            )}
                        </button>
                    </form>
                </div>
             </div>
          )}

        {step === 'booked' && (
            <div className="flex flex-col items-center justify-center h-full min-h-[500px] p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-display font-bold text-slate-900 mb-4">Booking Request Received!</h3>
                <p className="text-lg text-slate-600 max-w-md mx-auto mb-8">
                    Thank you <strong>{contactData.name}</strong>! One of our travel agents is reviewing your AI-generated itinerary for <strong>{packageData?.destination}</strong>. We will contact you at <strong>{contactData.email}</strong> shortly.
                </p>
                <button 
                    onClick={reset}
                    className="bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 transition-all flex items-center gap-2"
                >
                    Plan Another Trip <ArrowRight size={18} />
                </button>
            </div>
        )}
        </div>
      </div>
    </div>
  );
};