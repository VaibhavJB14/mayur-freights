import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface PageProps {
  setCurrentPage: (page: string) => void;
}

interface NavProps extends PageProps {
  currentPage: string;
}

// ==========================================
// GLOBAL STYLES (Fonts & Base Styling)
// ==========================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Cormorant+Garamond:wght@400;500;600;700&display=swap');

    body {
      font-family: 'Poppins', sans-serif;
    }

    .font-heading {
      font-family: 'Playfair Display', serif;
    }

    .font-curvy {
      font-family: 'Cormorant Garamond', serif;
      letter-spacing: 0.02em;
    }

    /* Ensure Tailwind's font-sans is overridden */
    .font-sans {
      font-family: 'Poppins', sans-serif !important;
    }
  `}</style>
);

// ==========================================
// INTRO OVERLAY (airplane rotated 90° CW + percentage)
// ==========================================
const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const totalDuration = 2500;
    const steps = 100;
    const stepTime = totalDuration / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current > 100) {
        current = 100;
        clearInterval(interval);
      }
      setPercent(current);
    }, stepTime);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setIsFadingOut(true), 2000);
    const t2 = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        .plane-track {
          position: absolute;
          bottom: 5rem;
          left: 50%;
          transform: translateX(-50%);
          width: 12rem;
          height: 0.125rem;
          background: rgba(84, 172, 191, 0.4);
          border-radius: 999px;
          overflow: visible;
        }
        .plane {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%) rotate(90deg);
          animation: fly 2.4s ease-in-out 0.3s forwards;
          color: #D4AF37;
        }
        @keyframes fly {
          0% { left: 0; }
          100% { left: calc(100% - 1.2rem); }
        }
      `}</style>
      <div
        className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#011C40] transition-opacity duration-700 ease-in-out ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className={`flex flex-col items-center justify-center transform transition-all duration-1000 ease-out ${isFadingOut ? 'scale-110 opacity-0' : 'scale-100 opacity-100 animate-fade-in-up'}`}>
          <img
            src="/logo.png"
            alt="Mayura Logo"
            className="w-32 h-32 md:w-40 md:h-40 object-contain brightness-0 invert mb-6 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          />
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Mayura Freight
          </h1>
          <p className="text-[#D4AF37] font-bold tracking-[0.3em] uppercase mt-3 text-sm md:text-base font-heading">
            & Trades Pvt Ltd
          </p>
        </div>

        <div className="absolute bottom-20 z-10 text-[#D4AF37] font-bold text-lg">
          {percent}%
        </div>

        <div className="plane-track">
          <svg
            className="plane w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>
      </div>
    </>
  );
};

// ==========================================
// IMAGE SLIDER (2 sec per image, stagger 20ms)
// ==========================================
const ImageSlider = ({ images, title, delay = 0 }: { images: string[]; title: string; delay?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000); // 2 seconds per image
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [images.length, delay]);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${images.length * 100}%`
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${title} image ${index + 1}`}
            className="h-full object-cover"
            style={{ width: `${100 / images.length}%` }}
          />
        ))}
      </div>
    </div>
  );
};

// ==========================================
// SHARED COMPONENTS (with new fonts)
// ==========================================

const Navbar: React.FC<NavProps> = ({ currentPage, setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {scrolled && <div className="h-[100px] w-full hidden md:block invisible" />}

      <div className={`w-full z-[100] transition-all duration-300 ${scrolled ? 'fixed top-0 left-0 right-0 bg-[#011C40]/95 backdrop-blur-md shadow-2xl py-2 border-b border-[#26658C]/50' : 'relative pt-4'}`}>
        <nav className="relative flex flex-col md:flex-row items-center justify-between px-8 w-full max-w-screen-2xl mx-auto">

          <div className={`bg-[#023859] px-6 rounded-b-[2rem] shadow-2xl flex items-center gap-3 shrink-0 border-b-4 border-[#D4AF37] cursor-pointer transition-all duration-300 self-start ${scrolled ? 'py-3 md:rounded-b-xl' : 'py-5'}`} onClick={() => setCurrentPage('home')}>
            <img src="/logo.png" alt="Mayura Logo" className="w-12 h-12 md:w-14 md:h-14 object-contain brightness-0 invert" />
            <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight whitespace-nowrap font-heading">Mayura Freight & Trades Pvt Ltd</span>
          </div>

          <div className="hidden md:flex flex-1 justify-center">
            <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-full flex items-center gap-2 border border-[#26658C]/50 transition-all duration-300">
              {['home', 'about', 'services', 'contact'].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`capitalize px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    currentPage === page
                      ? 'bg-[#D4AF37] text-[#011C40] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'text-[#A7EBF2]/80 hover:text-white hover:bg-[#26658C]/50'
                  }`}
                >
                  {page === 'about' ? 'About Us' : page}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center shrink-0">
            <button onClick={() => setCurrentPage('contact')} className="bg-gradient-to-r from-[#D4AF37] to-[#FDE08B] text-[#011C40] px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-105 transition-all duration-300">
              Get in touch
              <svg className="w-4 h-4 bg-[#011C40]/20 rounded-full p-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

const Footer: React.FC<PageProps> = ({ setCurrentPage }) => (
  <footer className="bg-[#023859] text-white pt-20 pb-10 px-8 border-t-4 border-[#D4AF37] w-full mt-auto">
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12 mb-16">

        <div className="max-w-md text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <img src="/logo.png" alt="Mayura Logo" className="w-12 h-12 md:w-14 md:h-14 object-contain bg-[#011C40] rounded-xl p-1.5 border border-[#D4AF37]" />
            <span className="text-2xl font-bold tracking-tight text-[#D4AF37] font-heading">Mayura Freight</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
            <a href="#" className="p-3 bg-[#011C40] border border-[#26658C] rounded-full hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-300 group shadow-[0_0_10px_rgba(38,101,140,0.3)]" aria-label="Instagram">
              <svg className="w-5 h-5 text-[#A7EBF2] group-hover:text-[#011C40] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="p-3 bg-[#011C40] border border-[#26658C] rounded-full hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-300 group shadow-[0_0_10px_rgba(38,101,140,0.3)]" aria-label="Facebook">
              <svg className="w-5 h-5 text-[#A7EBF2] group-hover:text-[#011C40] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="p-3 bg-[#011C40] border border-[#26658C] rounded-full hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-300 group shadow-[0_0_10px_rgba(38,101,140,0.3)]" aria-label="LinkedIn">
              <svg className="w-5 h-5 text-[#A7EBF2] group-hover:text-[#011C40] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="p-3 bg-[#011C40] border border-[#26658C] rounded-full hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-300 group shadow-[0_0_10px_rgba(38,101,140,0.3)]" aria-label="Twitter">
              <svg className="w-5 h-5 text-[#A7EBF2] group-hover:text-[#011C40] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 0.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-lg font-bold mb-6 text-white font-heading">Quick Links</h4>
          <ul className="space-y-4 text-[#A7EBF2]/80 font-medium">
            <li><button onClick={() => setCurrentPage('home')} className="hover:text-[#D4AF37] transition-colors">Home</button></li>
            <li><button onClick={() => setCurrentPage('about')} className="hover:text-[#D4AF37] transition-colors">About Us</button></li>
            <li><button onClick={() => setCurrentPage('services')} className="hover:text-[#D4AF37] transition-colors">Our Services</button></li>
            <li><button onClick={() => setCurrentPage('contact')} className="hover:text-[#D4AF37] transition-colors">Contact</button></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-lg font-bold mb-6 text-white font-heading">Company Values</h4>
          <ul className="space-y-4 text-[#A7EBF2]/80 font-medium">
            <li><span className="hover:text-[#D4AF37] transition-colors cursor-default">Reliability</span></li>
            <li><span className="hover:text-[#D4AF37] transition-colors cursor-default">Integrity</span></li>
            <li><span className="hover:text-[#D4AF37] transition-colors cursor-default">Innovation</span></li>
            <li><span className="hover:text-[#D4AF37] transition-colors cursor-default">Customer Focus</span></li>
            <li><span className="hover:text-[#D4AF37] transition-colors cursor-default">Sustainability</span></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-lg font-bold mb-6 text-white font-heading">Contact Details</h4>
          <p className="text-[#A7EBF2]/80 mb-4 leading-relaxed">For direct enquiries, request a quote, or operational support.</p>
          <a href="mailto:info@mayurafreight.com" className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#FDE08B] text-[#011C40] hover:scale-105 px-8 py-3 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] mb-3 w-full text-center">
            info@mayurafreight.com
          </a>
          <a href="tel:+919876543210" className="inline-block bg-[#011C40] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#011C40] px-8 py-3 rounded-full font-bold transition-colors w-full text-center">
            +91-9876543210
          </a>
        </div>
      </div>
      <div className="border-t border-[#26658C] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[#54ACBF] text-sm font-medium">
        <p>© 2026 Mayura Freight & Trades Pvt Ltd. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const InnerPageHeader = ({ title, subtitle, image }: { title: string; subtitle: string; image: string }) => (
  <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden h-[40vh] min-h-[350px] flex flex-col bg-[#011C40] shadow-2xl mt-4 mx-4 border border-[#26658C]/30">
    <div className="absolute inset-0 z-0">
      <img src={image} alt={title} className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#011C40] via-[#023859]/80 to-transparent" />
    </div>
    <div className="relative z-10 flex flex-col justify-center flex-grow px-8 md:px-16 max-w-screen-2xl mx-auto w-full pt-16">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] max-w-3xl mb-4 drop-shadow-md font-heading">{title}</h1>
      <p className="text-[#A7EBF2] text-lg md:text-xl max-w-2xl font-medium leading-relaxed border-l-4 border-[#D4AF37] pl-4 font-curvy">{subtitle}</p>
    </div>
  </div>
);

// ==========================================
// PAGE COMPONENTS (fonts applied to headings & key subtitles)
// ==========================================

const HomePage: React.FC<PageProps> = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('welcome');
  return (
    <>
      <div className="relative w-full px-4 pt-4 pb-24">
        <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden min-h-[85vh] flex flex-col bg-[#011C40] shadow-2xl border border-[#26658C]/30">
          <div className="absolute inset-0 z-0">
            <img src="home.png" alt="Night Logistics Truck" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#011C40] via-[#023859]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#011C40] via-transparent to-transparent opacity-90" />
          </div>
          <Navbar currentPage="home" setCurrentPage={setCurrentPage} />
          
          <div className="relative z-10 flex flex-col justify-center flex-grow px-8 md:px-16 max-w-screen-2xl mx-auto w-full pt-12 md:pt-0">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] max-w-3xl mb-6 drop-shadow-lg font-heading">
              Smarter Transport. <br /> <span className="text-[#D4AF37]">Faster Deliveries.</span> <br /> Global Reach.
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 font-medium leading-relaxed">
              Experience a dynamic, technology-driven freight forwarding and foreign trading company delivering reliable, cost-effective logistics solutions across South India and international markets.
            </p>
            <button onClick={() => setCurrentPage('services')} className="bg-gradient-to-r from-[#D4AF37] to-[#FDE08B] text-[#011C40] hover:scale-105 px-8 py-4 rounded-full font-bold transition-all w-fit flex items-center gap-3 cursor-pointer shadow-lg shadow-[#D4AF37]/30">
              Explore Our Services
              <span className="bg-[#011C40] text-[#D4AF37] rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
            </button>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-end justify-between px-8 md:px-16 pb-12 max-w-screen-2xl mx-auto w-full gap-8">
            <div className="flex flex-wrap gap-12 md:gap-24">
              <div><p className="text-4xl md:text-5xl font-extrabold text-white mb-2 font-heading">100<span className="text-[#D4AF37]">+</span></p><p className="text-[#54ACBF] text-sm font-medium leading-snug">Global Shipping<br />Destinations</p></div>
              <div><p className="text-4xl md:text-5xl font-extrabold text-white mb-2 font-heading">24<span className="text-[#D4AF37]">/</span>7</p><p className="text-[#54ACBF] text-sm font-medium leading-snug">Real-Time<br />Tracking Visibility</p></div>
              <div><p className="text-4xl md:text-5xl font-extrabold text-white mb-2 font-heading">100<span className="text-[#D4AF37]">%</span></p><p className="text-[#54ACBF] text-sm font-medium leading-snug">Secure Digital<br />Document Ops</p></div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-screen-xl mx-auto w-full flex-grow px-4">
        
        <section className="mb-32 grid md:grid-cols-2 gap-16 items-center min-h-[400px]">
          <div className="relative">
            <div className="absolute -top-6 -left-6 bg-[#023859] text-[#D4AF37] p-4 rounded-2xl z-10 shadow-lg shadow-[#D4AF37]/20 border border-[#D4AF37]/50">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" /></svg>
            </div>
            <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop" alt="Logistics" className="rounded-[2.5rem] shadow-2xl shadow-[#023859]/20 w-full h-[450px] object-cover border-8 border-[#023859]" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold text-white mb-6 font-heading">Welcome to Mayura Freight</h2>
            <div className="min-h-[180px] mb-8">
              {activeTab === 'welcome' && (
                <div className="animate-fade-in">
                  <p className="text-[#A7EBF2]/80 text-lg mb-6 leading-relaxed">Mayura Freight & Trades Pvt. Ltd. is a dynamic, technology-driven freight forwarding and foreign trading company delivering reliable, cost-effective logistics solutions across South India and international markets.</p>
                  <p className="text-[#A7EBF2]/80 text-lg leading-relaxed">Built on a foundation of integrity and customer-centric service, Mayura Freight combines local expertise with global connectivity to simplify cross-border trade for businesses of every size.</p>
                </div>
              )}
              {activeTab === 'reach' && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-[#D4AF37] mb-4 font-heading">Our Reach & Growth Plans</h3>
                  <p className="text-[#A7EBF2]/80 text-lg mb-4 leading-relaxed">Headquartered in South India, Mayura Freight currently serves businesses across Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, and Kerala.</p>
                  <p className="text-[#A7EBF2]/80 text-lg leading-relaxed">With strategic partnerships and an expanding carrier network, we are scaling operations nationally and internationally to become a preferred logistics partner for exporters, importers, and domestic shippers.</p>
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <button onClick={() => setActiveTab(activeTab === 'reach' ? 'welcome' : 'reach')} className={`${activeTab === 'reach' ? 'bg-transparent border border-[#D4AF37] text-[#D4AF37]' : 'bg-gradient-to-r from-[#D4AF37] to-[#FDE08B] text-[#011C40] hover:scale-105 shadow-lg shadow-[#D4AF37]/30'} px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 cursor-pointer`}>
                Our Reach
              </button>
              <button onClick={() => setCurrentPage('about')} className="bg-transparent text-[#A7EBF2] hover:bg-[#D4AF37] hover:text-[#011C40] border-[#54ACBF] hover:border-[#D4AF37] px-8 py-3 rounded-full font-bold transition-all border cursor-pointer">
                Read More
              </button>
            </div>
          </div>
        </section>

        {/* 3 SERVICES PREVIEW */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4 font-heading">What We Do</h2>
            <p className="text-[#A7EBF2]/80 max-w-2xl mx-auto text-lg font-curvy">Integrated air, ocean, and road freight services, customs clearance, and turnkey solutions.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Freight Forwarding', images: ['https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070', 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070', 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070'], desc: 'Customized sea freight, air freight, and road freight services optimized for speed, cost, and reliability. We manage full container loads (FCL), less-than-container loads (LCL), air cargo, and multimodal shipments to and from major global trade lanes.', icon: <><path d="M2 21h20M19.3 14.8C21.1 13.5 22 11.7 22 10V4h-3v3H5V4H2v6c0 1.7.9 3.5 2.7 4.8L2 18h20l-2.7-3.2ZM12 7v7" /></> },
              { title: 'Customs Clearance & Compliance', images: ['https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?q=80&w=2070', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070'], desc: 'End-to-end customs brokerage and documentation services, including import/export documentation, HS code classification, duty optimization, and compliance with regulatory requirements across jurisdictions.', icon: <><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></> },
              { title: 'Warehousing & Distribution', images: ['https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070', 'https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?q=80&w=2070', 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=2070'], desc: 'Secure, strategically located warehousing, inventory management, pick-and-pack services, and last-mile distribution to support lean supply chains and timely deliveries.', icon: <><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></> }
            ].map((srv, idx) => (
              <div key={idx} onClick={() => setCurrentPage('contact')} className="group relative h-[480px] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl border border-[#26658C]/50 hover:border-[#D4AF37]/50 hover:scale-[1.02] transition-transform duration-500">
                <ImageSlider images={srv.images} title={srv.title} delay={idx * 20} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#011C40] via-[#023859]/70 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div className="absolute inset-0 bg-[#26658C]/30 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#FDE08B] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#D4AF37]/30 shrink-0">
                    <svg className="w-6 h-6 text-[#011C40]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">{srv.icon}</svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white mb-0 shrink-0 font-heading">{srv.title}</h3>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
                    <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 flex flex-col">
                      <p className="text-[#A7EBF2] text-sm leading-relaxed mb-6 mt-3">{srv.desc}</p>
                      <button onClick={(e) => { e.stopPropagation(); setCurrentPage('contact'); }} className="text-white font-bold text-sm flex items-center gap-2 hover:text-[#D4AF37] transition-colors uppercase tracking-wider w-fit cursor-pointer">
                        Request Quote <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
             <button onClick={() => setCurrentPage('services')} className="bg-[#023859] text-[#D4AF37] hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#FDE08B] hover:text-[#011C40] px-8 py-3 rounded-full font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-[#023859]/20 border border-[#D4AF37]/50 hover:border-transparent">
                View All Logistics Solutions <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
             </button>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="mb-32">
          <div className="bg-[#011C40] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl border border-[#D4AF37]/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="relative z-10 text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white font-heading">Why Choose Us</h2>
              <p className="text-[#D4AF37] max-w-2xl mx-auto text-lg font-curvy">We optimize your entire supply chain with cutting-edge technology and regional expertise.</p>
            </div>
            <div className="relative z-10 grid md:grid-cols-3 gap-8">
              <div className="bg-[#023859]/50 backdrop-blur-md p-8 rounded-[2rem] border border-[#26658C]/50 hover:bg-[#26658C]/40 transition-colors"><div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#FDE08B] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#D4AF37]/20"><svg className="w-7 h-7 text-[#011C40]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6v6l4 2"/></svg></div><h3 className="text-2xl font-bold mb-3 text-white font-heading">Regional Expertise, Global Reach</h3><p className="text-[#A7EBF2]/80 text-sm leading-relaxed">Deep understanding of South Indian supply chains combined with an expanding international network to support seamless import/export operations.</p></div>
              <div className="bg-[#023859]/50 backdrop-blur-md p-8 rounded-[2rem] border border-[#26658C]/50 hover:bg-[#26658C]/40 transition-colors"><div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#FDE08B] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#D4AF37]/20"><svg className="w-7 h-7 text-[#011C40]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div><h3 className="text-2xl font-bold mb-3 text-white font-heading">Technology-First Approach</h3><p className="text-[#A7EBF2]/80 text-sm leading-relaxed">We are building a real-time logistics platform featuring live shipment tracking, AI-driven notifications, automated workflows, and secure digital document management accessible via web and mobile.</p></div>
              <div className="bg-[#023859]/50 backdrop-blur-md p-8 rounded-[2rem] border border-[#26658C]/50 hover:bg-[#26658C]/40 transition-colors"><div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#FDE08B] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#D4AF37]/20"><svg className="w-7 h-7 text-[#011C40]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div><h3 className="text-2xl font-bold mb-3 text-white font-heading">Reliability & Speed</h3><p className="text-[#A7EBF2]/80 text-sm leading-relaxed">Proven operational processes and proactive exception management ensure on-time deliveries and minimal disruption.</p></div>
              <div className="bg-[#011C40]/50 backdrop-blur-md p-8 rounded-[2rem] border border-[#26658C]/50 hover:bg-[#26658C]/40 transition-colors"><div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#FDE08B] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#D4AF37]/20"><svg className="w-7 h-7 text-[#011C40]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><h3 className="text-2xl font-bold mb-3 text-white font-heading">Compliance & Transparency</h3><p className="text-[#A7EBF2]/80 text-sm leading-relaxed">Strong customs expertise and transparent pricing protect clients from delays and unexpected costs.</p></div>
              <div className="bg-[#011C40]/50 backdrop-blur-md p-8 rounded-[2rem] border border-[#26658C]/50 hover:bg-[#26658C]/40 transition-colors"><div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#FDE08B] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#D4AF37]/20"><svg className="w-7 h-7 text-[#011C40]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div><h3 className="text-2xl font-bold mb-3 text-white font-heading">Customer-Centric Service</h3><p className="text-[#A7EBF2]/80 text-sm leading-relaxed">Tailored logistics plans, dedicated account management, and 24/7 support for critical shipments.</p></div>
              <div className="bg-[#011C40]/50 backdrop-blur-md p-8 rounded-[2rem] border border-[#26658C]/50 hover:bg-[#26658C]/40 transition-colors"><div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#FDE08B] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#D4AF37]/20"><svg className="w-7 h-7 text-[#011C40]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2.69l5.66 4.2c.2.15.34.37.34.61v9c0 .24-.14.46-.34.61L12 2.69M12 2v20"/></svg></div><h3 className="text-2xl font-bold mb-3 text-white font-heading">Sustainable Practices</h3><p className="text-[#A7EBF2]/80 text-sm leading-relaxed">Commitment to eco-friendly transport options and optimized routing to lower carbon footprint.</p></div>
            </div>
          </div>
        </section>

        {/* OUR TECHNOLOGY */}
        <section className="mb-32">
          <div className="bg-[#023859] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl border border-[#D4AF37]/20">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="relative z-10 text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white font-heading">Our Technology</h2>
              <p className="text-[#A7EBF2] max-w-2xl mx-auto text-lg font-curvy">Mayura Freight is transforming freight forwarding with a proprietary, cloud-based platform that delivers:</p>
            </div>
            <div className="relative z-10 grid md:grid-cols-3 gap-8">
              <div className="bg-[#011C40]/50 backdrop-blur-md p-8 rounded-[2rem] border border-[#26658C]/50 hover:bg-[#26658C]/40 transition-colors"><h3 className="text-2xl font-bold mb-3 text-[#D4AF37] font-heading">Real-time Tracking</h3><p className="text-[#A7EBF2]/80 text-sm leading-relaxed">End-to-end visibility across air, sea, and road shipments.</p></div>
              <div className="bg-[#011C40]/50 backdrop-blur-md p-8 rounded-[2rem] border border-[#26658C]/50 hover:bg-[#26658C]/40 transition-colors"><h3 className="text-2xl font-bold mb-3 text-[#D4AF37] font-heading">AI Notifications</h3><p className="text-[#A7EBF2]/80 text-sm leading-relaxed">Proactive alerts for milestones, delays, and compliance issues.</p></div>
              <div className="bg-[#011C40]/50 backdrop-blur-md p-8 rounded-[2rem] border border-[#26658C]/50 hover:bg-[#26658C]/40 transition-colors"><h3 className="text-2xl font-bold mb-3 text-[#D4AF37] font-heading">Automated Workflows</h3><p className="text-[#A7EBF2]/80 text-sm leading-relaxed">Faster booking, documentation, and customs clearance.</p></div>
              <div className="bg-[#011C40]/50 backdrop-blur-md p-8 rounded-[2rem] border border-[#26658C]/50 hover:bg-[#26658C]/40 transition-colors md:col-span-1"><h3 className="text-2xl font-bold mb-3 text-[#D4AF37] font-heading">Secure Document Management</h3><p className="text-[#A7EBF2]/80 text-sm leading-relaxed">Digital bills of lading, invoices, and certificates with role-based access controls.</p></div>
              <div className="bg-[#011C40]/50 backdrop-blur-md p-8 rounded-[2rem] border border-[#26658C]/50 hover:bg-[#26658C]/40 transition-colors md:col-span-2"><h3 className="text-2xl font-bold mb-3 text-[#D4AF37] font-heading">Mobile & Web Access</h3><p className="text-[#A7EBF2]/80 text-sm leading-relaxed">Easy access to shipment data and reporting on desktop and mobile devices.</p></div>
            </div>
          </div>
        </section>

        {/* INDUSTRIES WE SERVE */}
        <section className="mb-32 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4 font-heading">Industries We Serve</h2>
          <p className="text-[#A7EBF2]/80 max-w-2xl mx-auto text-lg mb-12 font-curvy">We serve all industries, including comprehensive export and import solutions for:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-[#023859]/80 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-2xl border border-[#26658C]/50 hover:border-[#D4AF37] hover:-translate-y-2 transition-all flex flex-col group"><div className="h-40 w-full overflow-hidden bg-[#011C40]"><img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974" alt="Agriculture & Food Exports" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70" /></div><div className="p-8 flex flex-col items-center"><svg className="w-10 h-10 text-[#D4AF37] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Zm0 0v-5" /></svg><h4 className="font-bold text-white text-lg text-center">Agriculture & Food Exports</h4></div></div>
            <div className="bg-[#023859]/80 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-2xl border border-[#26658C]/50 hover:border-[#D4AF37] hover:-translate-y-2 transition-all flex flex-col group"><div className="h-40 w-full overflow-hidden bg-[#011C40]"><img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1950" alt="Retail & E-commerce" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70" /></div><div className="p-8 flex flex-col items-center"><svg className="w-10 h-10 text-[#D4AF37] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><h4 className="font-bold text-white text-lg text-center">Retail & E-commerce</h4></div></div>
            <div className="bg-[#023859]/80 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-2xl border border-[#26658C]/50 hover:border-[#D4AF37] hover:-translate-y-2 transition-all flex flex-col group"><div className="h-40 w-full overflow-hidden bg-[#011C40]"><img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070" alt="Manufacturing & Industrial" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70" /></div><div className="p-8 flex flex-col items-center"><svg className="w-10 h-10 text-[#D4AF37] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg><h4 className="font-bold text-white text-lg text-center">Manufacturing & Industrial</h4></div></div>
            <div className="bg-[#023859]/80 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-2xl border border-[#26658C]/50 hover:border-[#D4AF37] hover:-translate-y-2 transition-all flex flex-col group"><div className="h-40 w-full overflow-hidden bg-[#011C40]"><img src="https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=2070" alt="Pharmaceuticals & Healthcare" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70" /></div><div className="p-8 flex flex-col items-center"><svg className="w-10 h-10 text-[#D4AF37] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><circle cx="12" cy="12" r="4"/></svg><h4 className="font-bold text-white text-lg text-center">Pharmaceuticals & Healthcare</h4></div></div>
            <div className="bg-[#023859]/80 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-2xl border border-[#26658C]/50 hover:border-[#D4AF37] hover:-translate-y-2 transition-all flex flex-col group"><div className="h-40 w-full overflow-hidden bg-[#011C40]"><img src="https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=1974" alt="Automotive & Engineering" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70" /></div><div className="p-8 flex flex-col items-center"><svg className="w-10 h-10 text-[#D4AF37] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg><h4 className="font-bold text-white text-lg text-center">Automotive & Engineering</h4></div></div>
            <div className="bg-[#023859]/80 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-2xl border border-[#26658C]/50 hover:border-[#D4AF37] hover:-translate-y-2 transition-all flex flex-col group"><div className="h-40 w-full overflow-hidden bg-[#011C40]"><img src="/industry.jpg" alt="And every other industry sector" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70" /></div><div className="p-8 flex flex-col items-center"><svg className="w-10 h-10 text-[#D4AF37] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg><h4 className="font-bold text-white text-lg text-center">And every other industry sector</h4></div></div>
          </div>
        </section>
      </main>
    </>
  );
};

const AboutPage: React.FC<PageProps> = ({ setCurrentPage }) => (
  <>
    <div className="absolute top-0 w-full z-50"><Navbar currentPage="about" setCurrentPage={setCurrentPage} /></div>
    <InnerPageHeader title="About Mayura Freight" subtitle="A dynamic, technology-driven freight forwarding and foreign trading company." image="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070" />
    <main className="max-w-screen-xl mx-auto w-full flex-grow px-4 py-24">
      <div className="grid md:grid-cols-2 gap-16 mb-24">
        <div>
          <h2 className="text-4xl font-extrabold text-white mb-6 font-heading">Who We Are</h2>
          <p className="text-[#A7EBF2]/80 text-lg mb-6 leading-relaxed">Mayura Freight & Trades Pvt. Ltd. is a dynamic, technology-driven freight forwarding and foreign trading company delivering reliable, cost-effective logistics solutions across South India and international markets.</p>
          <p className="text-[#A7EBF2]/80 text-lg leading-relaxed">We specialize in integrated air, ocean, and road freight services, customs clearance, warehousing, and export & Import trading. Built on a foundation of integrity and customer-centric service, Mayura Freight combines local expertise with global connectivity to simplify cross-border trade for businesses of every size.</p>
        </div>
        <div className="bg-[#023859] rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden border border-[#D4AF37]/50">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-[#D4AF37] rounded-full blur-[80px] opacity-20"></div>
          <h3 className="text-2xl font-bold mb-8 relative z-10 text-[#D4AF37] font-heading">Our Core Values</h3>
          <ul className="space-y-6 relative z-10">
            {[{ title: 'Reliability', desc: 'Delivering consistent, dependable logistics solutions.' }, { title: 'Integrity', desc: 'Transparent pricing and ethical business conduct.' }, { title: 'Innovation', desc: 'Continual investment in technology to enhance efficiency.' }, { title: 'Customer Focus', desc: 'Tailored solutions and responsive support.' }, { title: 'Sustainability', desc: 'Promoting green logistics initiatives across operations.' }].map((v, i) => (
              <li key={i} className="flex gap-4"><div className="mt-1"><svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></div><div><strong className="text-white block text-lg">{v.title}</strong><span className="text-[#A7EBF2]/80 text-sm block mt-1">{v.desc}</span></div></li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  </>
);

const ServicesPage: React.FC<PageProps> = ({ setCurrentPage }) => (
  <>
    <div className="absolute top-0 w-full z-50"><Navbar currentPage="services" setCurrentPage={setCurrentPage} /></div>
    <InnerPageHeader title="What We Do" subtitle="Comprehensive multimodal integrated freight forwarding, customs clearance, warehousing, and turnkey sourcing solutions." image="https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?q=80&w=2070" />
    <main className="max-w-screen-xl mx-auto w-full flex-grow px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-white mb-4 font-heading">Complete Logistics Network</h2>
        <p className="text-[#A7EBF2]/80 max-w-2xl mx-auto text-lg font-curvy">Hover over any service to explore our end-to-end supply chain management capabilities.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Freight Forwarding', images: ['https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070', 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070', 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070'], desc: 'Customized sea freight, air freight, and road freight services optimized for speed, cost, and reliability. We manage full container loads (FCL), less-than-container loads (LCL), air cargo, and multimodal shipments to and from major global trade lanes.', icon: <><path d="M2 21h20M19.3 14.8C21.1 13.5 22 11.7 22 10V4h-3v3H5V4H2v6c0 1.7.9 3.5 2.7 4.8L2 18h20l-2.7-3.2ZM12 7v7" /></> },
          { title: 'Customs Clearance & Compliance', images: ['https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?q=80&w=2070', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070'], desc: 'End-to-end customs brokerage and documentation services, including import/export documentation, HS code classification, duty optimization, and compliance with regulatory requirements across jurisdictions.', icon: <><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></> },
          { title: 'Warehousing & Distribution', images: ['https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070', 'https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?q=80&w=2070', 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=2070'], desc: 'Secure, strategically located warehousing, inventory management, pick-and-pack services, and last-mile distribution to support lean supply chains and timely deliveries.', icon: <><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></> },
          { title: 'End-to-End Logistics Solutions', images: ['https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070', 'https://images.unsplash.com/photo-1580674684081-77625272a731?q=80&w=2070', 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=2070'], desc: 'Integrated supply chain management, multimodal transportation planning, vendor coordination, and reverse logistics to reduce lead times and lower total landed cost.', icon: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><circle cx="12" cy="12" r="4"/></> },
          { title: 'Export Trading', images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070', 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=2070', 'https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?q=80&w=2070'], desc: 'Provides comprehensive export services for all product categories, leveraging our direct partnerships with manufacturers in China. We specialize in exporting from India, importing from China and Europe, and connecting global buyers with trusted manufacturers.', icon: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Zm0 0v-5" /></> },
          { title: 'Turnkey Sourcing Solutions', images: ['https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2070', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070', 'https://images.unsplash.com/photo-1504917595217-d4bf598bece3?q=80&w=2070'], desc: 'We are specialized in the end-to-end process—from sourcing the product to moving it on our own freight. From any product you need, we deliver complete turnkey solutions—from procurement, quality control, and pricing to packaging, documentation, and shipment using our freight capabilities. Our manufacturer network ensures reliable sourcing, competitive pricing, and seamless cross-border trade across India, China, and Europe.', icon: <><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> },
        ].map((srv, idx) => (
          <div key={idx} onClick={() => setCurrentPage('contact')} className="group relative h-[480px] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl border border-[#26658C]/50 hover:border-[#D4AF37]/50 hover:scale-[1.02] transition-transform duration-500">
            <ImageSlider images={srv.images} title={srv.title} delay={idx * 20} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#011C40] via-[#023859]/70 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <div className="absolute inset-0 bg-[#26658C]/30 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-20">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#FDE08B] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#D4AF37]/30 shrink-0"><svg className="w-6 h-6 text-[#011C40]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">{srv.icon}</svg></div>
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-0 shrink-0 font-heading">{srv.title}</h3>
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
                <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 flex flex-col">
                  <p className="text-[#A7EBF2] text-sm leading-relaxed mb-6 mt-3">{srv.desc}</p>
                  <button onClick={(e) => { e.stopPropagation(); setCurrentPage('contact'); }} className="text-white font-bold text-sm flex items-center gap-2 hover:text-[#D4AF37] transition-colors uppercase tracking-wider w-fit cursor-pointer">Request Quote <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#54ACBF]/50 rounded-[2rem] transition-colors duration-500 pointer-events-none z-30" />
          </div>
        ))}
      </div>
    </main>
  </>
);

const ContactPage: React.FC<PageProps> = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Inquiry sent successfully to Mayura Freight!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <div className="absolute top-0 w-full z-50"><Navbar currentPage="contact" setCurrentPage={setCurrentPage} /></div>
      <InnerPageHeader 
        title="Get in Touch" 
        subtitle="Partner with Mayura Freight & Trades Pvt Ltd. today for smarter, safer, and faster logistics."
        image="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075"
      />
      <main className="max-w-screen-xl mx-auto w-full flex-grow px-4 py-24 space-y-16">
        
        <div className="bg-[#023859] text-white rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl border border-[#D4AF37]/30">
          <div className="relative z-10 grid md:grid-cols-2 gap-16">
            
            <div className="flex flex-col h-full">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white font-heading">Let's build your supply chain.</h2>
              <p className="text-[#A7EBF2] text-lg mb-12 font-curvy">Whether you need global freight forwarding, reliable customs clearance, or turnkey sourcing services, our team is ready to assist you.</p>
              
              <div className="space-y-8 mb-16">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#D4AF37] to-[#FDE08B] p-4 rounded-xl shadow-lg shadow-[#D4AF37]/20"><svg className="w-6 h-6 text-[#011C40]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg></div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-white font-heading">Our Reach</h4>
                    <p className="text-[#A7EBF2]/80">Serving the entire South Indian market—Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, and Kerala.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#D4AF37] to-[#FDE08B] p-4 rounded-xl shadow-lg shadow-[#D4AF37]/20"><svg className="w-6 h-6 text-[#011C40]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-white font-heading">Direct Enquiries</h4>
                    <p className="text-[#A7EBF2]/80">info@mayurafreight.com</p>
                    <p className="text-[#A7EBF2]/80">+91-9876543210</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-[#011C40]/50 backdrop-blur-md p-8 rounded-[2rem] border border-[#26658C]/50 h-fit z-20 relative">
              <div className="space-y-4">
                <input type="text" placeholder="Your Name / Company" required className="w-full bg-[#011C40]/50 border border-[#26658C]/50 rounded-xl px-4 py-4 text-white placeholder:text-[#A7EBF2]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Work Email" required className="w-full bg-[#011C40]/50 border border-[#26658C]/50 rounded-xl px-4 py-4 text-white placeholder:text-[#A7EBF2]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <textarea placeholder="Describe your logistics or trading requirements..." required rows={5} className="w-full bg-[#011C40]/50 border border-[#26658C]/50 rounded-xl px-4 py-4 text-white placeholder:text-[#A7EBF2]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] resize-none" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                <button type="submit" className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FDE08B] hover:scale-105 text-[#011C40] font-bold py-4 rounded-xl transition-all cursor-pointer shadow-lg shadow-[#D4AF37]/30">Submit Inquiry</button>
              </div>
            </form>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
      </main>
    </>
  );
};

// ==========================================
// MAIN APP
// ==========================================

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <GlobalStyles />
      <IntroOverlay onComplete={() => setShowIntro(false)} />
      
      <div className={`min-h-screen bg-[#011C40] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#011C40] ${showIntro ? 'h-screen overflow-hidden' : ''}`}>
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'services' && <ServicesPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'contact' && <ContactPage setCurrentPage={setCurrentPage} />}
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </>
  );
}

export default App;