import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
        const response = await fetch("https://formspree.io/f/mldvkano", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            setStatus('error');
        }
    } catch (error) {
        setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold tracking-wide uppercase">Get in Touch</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-2">Contact Us</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Have questions about our packages or need a custom quote? We're here to help.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            {/* Contact Info */}
            <div className="bg-primary-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold font-display mb-6">Contact Information</h3>
                    <p className="text-slate-300 mb-10 leading-relaxed">
                        Fill up the form and our Team will get back to you within 24 hours.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-primary-800 p-3 rounded-lg">
                                <Phone size={24} className="text-secondary-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-secondary-400 uppercase tracking-wide">Phone</p>
                                <p className="text-lg">+1 (555) 123-4567</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <div className="bg-primary-800 p-3 rounded-lg">
                                <Mail size={24} className="text-secondary-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-secondary-400 uppercase tracking-wide">Email</p>
                                <p className="text-lg">hello@globally.com</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <div className="bg-primary-800 p-3 rounded-lg">
                                <MapPin size={24} className="text-secondary-400" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-secondary-400 uppercase tracking-wide">Address</p>
                                <p className="text-lg">123 Travel Lane, Suite 100<br/>New York, NY 10012</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-primary-800/50"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 rounded-full bg-primary-800/50"></div>
            </div>

            {/* Form */}
            <div className="p-10">
                {status === 'success' ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                        <p className="text-slate-600 mb-6">Thank you for contacting us. We will get back to you soon.</p>
                        <button 
                            onClick={() => setStatus('idle')}
                            className="text-primary-600 font-bold hover:underline"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                            <input 
                                type="text" 
                                name="subject"
                                required
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="I need help with..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                            <textarea 
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us more about your travel plans..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all h-32 resize-none"
                            ></textarea>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={status === 'submitting'}
                            className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 hover:bg-primary-700 transform hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {status === 'submitting' ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} /> Sending...
                                </>
                            ) : (
                                <>
                                    Send Message <Send size={20} />
                                </>
                            )}
                        </button>
                        {status === 'error' && (
                            <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
                        )}
                    </form>
                )}
            </div>
        </div>
      </div>
    </section>
  );
};