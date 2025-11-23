import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Planner } from './components/Planner';
import { FeaturedPackages } from './components/FeaturedPackages';
import { Destinations } from './components/Destinations';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={handleNavigate} />
      <main className="flex-grow">
        <Hero onStartPlanning={() => handleNavigate('planner')} />
        <FeaturedPackages />
        <Destinations />
        <Planner />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;