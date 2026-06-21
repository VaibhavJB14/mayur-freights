import React, { useState, useEffect } from 'react';

// ==========================================
// SHARED COMPONENTS
// ==========================================

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (page: string) => void }) => (
  <nav className="relative z-50 flex flex-col md:flex-row items-center justify-between px-8 w-full max-w-screen-2xl mx-auto pt-4">
    <div className="hidden md:flex bg-white/10 backdrop-blur-md p-1.5 rounded-full items-center gap-2 mt-6 border border-white/10">
      {['home', 'about', 'services', 'contact'].map((page) => (
        <button 
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`capitalize px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            currentPage === page 
              ? 'bg-[#e61919] text-white shadow-lg' 
              : 'text-white/80 hover:text-white'
          }`}
        >
          {page === 'about' ? 'About Us' : page}
        </button>
      ))}
    </div>

    <div className="bg-white px-8 py-5 rounded-b-[2rem] shadow-2xl flex items-center gap-3 shrink-0 mx-auto md:absolute md:left-1/2 md:-translate-x-1/2 md:top-0 border-b-4 border-[#e61919] cursor-pointer" onClick={() => setCurrentPage('home')}>
      <svg className="w-8 h-8 text-[#e61919]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path d="M10 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM21 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
        <path d="M14 2H5a2 2 0 0 0-2 2v11h16V7l-5-5ZM3 15h18v-4H3v4Z" />
      </svg>
      <div>
        <span className="block text-xl font-extrabold text-[#0a0f16] tracking-tight leading-none">Mayura Freight</span>
        <span className="block text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-1">& Trades Pvt Ltd</span>
      </div>
    </div>

    <div className="hidden md:flex items-center gap-3 mt-6">
      <button onClick={() => setCurrentPage('contact')} className="bg-[#e61919] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#e61919]/30 hover:bg-red-700 transition-colors">
        Get in touch
        <svg className="w-4 h-4 bg-white/20 rounded-full p-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  </nav>
);

const Footer = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
  <footer className="bg-[#0a0f16] text-white pt-20 pb-10 px-8 border-t-4 border-[#e61919] w-full mt-auto">
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-8 h-8 text-[#e61919]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M10 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM21 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
              <path d="M14 2H5a2 2 0 0 0-2 2v11h16V7l-5-5ZM3 15h18v-4H3v4Z" />
            </svg>
            <span className="text-2xl font-bold tracking-tight">Mayura Freight</span>
          </div>
          <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
            Redefining logistics and export trade in India through cutting-edge technology, superior customer service, and global connectivity.
          </p>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-400 font-medium">
            <li><button onClick={() => setCurrentPage('home')} className="hover:text-[#e61919] transition-colors">Home</button></li>
            <li><button onClick={() => setCurrentPage('about')} className="hover:text-[#e61919] transition-colors">About Us</button></li>
            <li><button onClick={() => setCurrentPage('services')} className="hover:text-[#e61919] transition-colors">Our Services</button></li>
            <li><button onClick={() => setCurrentPage('contact')} className="hover:text-[#e61919] transition-colors">Contact</button></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-lg font-bold mb-6">Company Values</h4>
          <ul className="space-y-4 text-gray-400 font-medium">
            <li><span className="hover:text-[#e61919] transition-colors cursor-default">Reliability & Trust</span></li>
            <li><span className="hover:text-[#e61919] transition-colors cursor-default">Tech Innovation</span></li>
            <li><span className="hover:text-[#e61919] transition-colors cursor-default">Ethical Integrity</span></li>
            <li><span className="hover:text-[#e61919] transition-colors cursor-default">Eco-Sustainability</span></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-lg font-bold mb-6">Email Us</h4>
          <p className="text-gray-400 mb-6 leading-relaxed">Drop us an email for inquiries, quotes, or logistics support.</p>
          <a href="mailto:info@mayurtrades.com" className="inline-block bg-[#e61919] hover:bg-white hover:text-[#0a0f16] px-8 py-3 rounded-full font-bold transition-colors shadow-lg shadow-[#e61919]/30">
            info@mayurtrades.com
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm font-medium">
        <p>© 2026 Mayura Freight & Trades Pvt Ltd. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const InnerPageHeader = ({ title, subtitle, image }: { title: string, subtitle: string, image: string }) => (
  <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden h-[40vh] min-h-[350px] flex flex-col bg-[#0a0f16] shadow-2xl mt-4 mx-4">
    <div className="absolute inset-0 z-0">
      <img src={image} alt={title} className="w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f16] via-[#0a0f16]/80 to-transparent" />
    </div>
    <div className="relative z-10 flex flex-col justify-center flex-grow px-8 md:px-16 max-w-screen-2xl mx-auto w-full pt-16">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.1] max-w-3xl mb-4">{title}</h1>
      <p className="text-gray-300 text-lg md:text-xl max-w-2xl font-medium leading-relaxed border-l-4 border-[#e61919] pl-4">{subtitle}</p>
    </div>
  </div>
);

// ==========================================
// PAGE COMPONENTS
// ==========================================

const HomePage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => {
  const [activeTab, setActiveTab] = useState('welcome'); 
  return (
    <>
      <div className="relative w-full px-4 pt-4 pb-24">
        <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden min-h-[85vh] flex flex-col bg-[#0a0f16] shadow-2xl">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop" alt="Night Logistics Truck" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f16] via-[#0a0f16]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] via-transparent to-transparent opacity-90" />
          </div>
          <Navbar currentPage="home" setCurrentPage={setCurrentPage} />
          
          <div className="relative z-10 flex flex-col justify-center flex-grow px-8 md:px-16 max-w-screen-2xl mx-auto w-full pt-12 md:pt-0">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] max-w-3xl mb-6">
              Smarter Transport. <br /> Faster Deliveries. <br /> Global Reach.
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 font-medium leading-relaxed">
              Experience technology-driven supply chain solutions built for speed, safety, and efficiency. From South Indian freight to seamless global export trading.
            </p>
            <button onClick={() => setCurrentPage('services')} className="bg-white text-[#0a0f16] hover:bg-gray-200 px-8 py-4 rounded-full font-bold transition-all w-fit flex items-center gap-3 cursor-pointer">
              Explore Our Services
              <span className="bg-[#0a0f16] text-white rounded-full p-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
            </button>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-end justify-between px-8 md:px-16 pb-12 max-w-screen-2xl mx-auto w-full gap-8">
            <div className="flex flex-wrap gap-12 md:gap-24">
              <div><p className="text-4xl md:text-5xl font-extrabold text-white mb-2">100<span className="text-[#e61919]">+</span></p><p className="text-gray-400 text-sm font-medium leading-snug">Global Shipping<br />Destinations</p></div>
              <div><p className="text-4xl md:text-5xl font-extrabold text-white mb-2">24<span className="text-[#e61919]">/</span>7</p><p className="text-gray-400 text-sm font-medium leading-snug">Real-Time<br />Tracking Visibility</p></div>
              <div><p className="text-4xl md:text-5xl font-extrabold text-white mb-2">100<span className="text-[#e61919]">%</span></p><p className="text-gray-400 text-sm font-medium leading-snug">Secure Digital<br />Document Ops</p></div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-screen-xl mx-auto w-full flex-grow px-4">
        
        <section className="mb-32 grid md:grid-cols-2 gap-16 items-center min-h-[400px]">
          <div className="relative">
            <div className="absolute -top-6 -left-6 bg-[#e61919] text-white p-4 rounded-2xl z-10 shadow-lg shadow-[#e61919]/30">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" /></svg>
            </div>
            <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop" alt="Logistics" className="rounded-[2.5rem] shadow-xl w-full h-[450px] object-cover border-8 border-white" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold text-[#0a0f16] mb-6">Welcome to Mayura Freight</h2>
            <div className="min-h-[180px] mb-8">
              {activeTab === 'welcome' && (
                <div className="animate-fade-in">
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">With a strong presence across South India, we specialize in end-to-end supply chain management spanning air, sea, and land freight. We connect local businesses to global trade opportunities.</p>
                  <p className="text-gray-600 text-lg leading-relaxed">We are committed to revolutionizing the industry with state-of-the-art software, offering real-time tracking, AI-driven notifications, and secure digital document management.</p>
                </div>
              )}
              {activeTab === 'reach' && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-[#e61919] mb-4">Our Reach</h3>
                  <p className="text-gray-600 text-lg mb-4 leading-relaxed">We currently serve the entire South Indian market, connecting businesses with global trade opportunities.</p>
                  <p className="text-gray-600 text-lg leading-relaxed">Our strategic expansion plans aim to bring our high-quality services to a broader national and international scale.</p>
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <button onClick={() => setActiveTab(activeTab === 'reach' ? 'welcome' : 'reach')} className={`${activeTab === 'reach' ? 'bg-[#0a0f16] text-white' : 'bg-[#e61919] text-white hover:bg-red-700 shadow-lg shadow-[#e61919]/30'} px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 cursor-pointer`}>
                Our Reach
              </button>
              <button onClick={() => setCurrentPage('about')} className="text-[#0a0f16] hover:bg-gray-200 border-gray-300 px-8 py-3 rounded-full font-bold transition-all border-2 cursor-pointer">
                Read More
              </button>
            </div>
          </div>
        </section>

        {/* 3 SERVICES PREVIEW IN CINEMATIC HOVER-REVEAL DESIGN (GRID ANIMATION FIXED) */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#0a0f16] mb-4">Our Core Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Comprehensive multimodal logistics and trading solutions tailored to your supply chain.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Ocean Freight', img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070', desc: 'Cost-effective Full Container Load (FCL) and LCL shipping across major global trade lanes.', icon: <path d="M2 21h20M19.3 14.8C21.1 13.5 22 11.7 22 10V4h-3v3H5V4H2v6c0 1.7.9 3.5 2.7 4.8L2 18h20l-2.7-3.2ZM12 7v7" /> },
              { title: 'Air Expedited', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074', desc: 'Time-critical delivery via scheduled and charter flights for high-value and urgent cargo.', icon: <path d="M17.8 19.2 16 11l3.5-3.5c.8-.8.8-2.1 0-2.9s-2.1-.8-2.9 0L13 8 4.8 6.2c-.5-.1-1 .1-1.3.5l-.3.4c-.4.5-.3 1.2.2 1.5l6.9 3.4-3.4 3.4-2.1-.5c-.4-.1-.8.1-1.1.4l-.3.3c-.3.4-.3 1 .1 1.2l3.7 2 2 3.7c.2.4.8.4 1.2.1l.3-.3c.3-.3.5-.7.4-1.1l-.5-2.1 3.4-3.4 3.4 6.9c.3.5 1 .6 1.5.2l.4-.3c.4-.3.6-.8.5-1.3Z" /> },
              { title: 'Road Transport', img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070', desc: 'Seamless domestic and cross-border ground transportation utilizing our regional fleet network.', icon: <><path d="M10 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM21 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" /><path d="M14 2H5a2 2 0 0 0-2 2v11h16V7l-5-5ZM3 15h18v-4H3v4Z" /></> }
            ].map((srv, idx) => (
              <div key={idx} onClick={() => setCurrentPage('services')} className="group relative h-[380px] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl">
                <img src={srv.img} alt={srv.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] via-[#0a0f16]/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[#e61919]/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
                  <div className="w-12 h-12 bg-[#e61919] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#e61919]/50 shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">{srv.icon}</svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white mb-0 shrink-0">{srv.title}</h3>
                  
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
                    <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 flex flex-col">
                      <p className="text-gray-300 text-sm leading-relaxed mb-6 mt-3">{srv.desc}</p>
                      <button className="text-white font-bold text-sm flex items-center gap-2 hover:text-[#e61919] transition-colors uppercase tracking-wider w-fit">
                        Explore Service <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#e61919]/50 rounded-[2rem] transition-colors duration-500 pointer-events-none z-20" />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
             <button onClick={() => setCurrentPage('services')} className="bg-[#0a0f16] text-white hover:bg-[#e61919] px-8 py-3 rounded-full font-bold transition-all inline-flex items-center gap-2 cursor-pointer">
                View All Logistics Solutions <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
             </button>
          </div>
        </section>

        <section className="mb-32">
          <div className="bg-[#0a0f16] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#e61919]/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="relative z-10 text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Why Choose Mayura Freight?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">We optimize your entire supply chain with cutting-edge technology and regional expertise.</p>
            </div>
            <div className="relative z-10 grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 bg-[#e61919] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">AI-Powered Tracking</h3>
                <p className="text-gray-400">State-of-the-art real-time software featuring AI-driven notifications and automated workflows for complete visibility.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 bg-[#e61919] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Unmatched Network</h3>
                <p className="text-gray-400">Deep roots across the entire South Indian market, seamlessly connecting local businesses with global trade opportunities.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 bg-[#e61919] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Secure & Compliant</h3>
                <p className="text-gray-400">Hassle-free customs clearance paired with secure digital document management to ensure zero delays at borders.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-32 text-center">
          <h2 className="text-4xl font-extrabold text-[#0a0f16] mb-4">Industries We Serve</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-12">Providing specialized freight solutions across diverse sectors, including exclusive export handling for raw materials.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-[#e61919] hover:-translate-y-2 transition-all flex flex-col items-center">
               <svg className="w-12 h-12 text-[#e61919] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Zm0 0v-5" /></svg>
               <h4 className="font-bold text-[#0a0f16] text-lg">Spices & Sambrani</h4>
               <p className="text-gray-500 text-sm mt-2">Export Specialists</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-[#e61919] hover:-translate-y-2 transition-all flex flex-col items-center">
               <svg className="w-12 h-12 text-[#e61919] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
               <h4 className="font-bold text-[#0a0f16] text-lg">FMCG & Retail</h4>
               <p className="text-gray-500 text-sm mt-2">Consumer Goods</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-[#e61919] hover:-translate-y-2 transition-all flex flex-col items-center">
               <svg className="w-12 h-12 text-[#e61919] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>
               <h4 className="font-bold text-[#0a0f16] text-lg">Manufacturing</h4>
               <p className="text-gray-500 text-sm mt-2">Industrial Cargo</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-[#e61919] hover:-translate-y-2 transition-all flex flex-col items-center">
               <svg className="w-12 h-12 text-[#e61919] mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
               <h4 className="font-bold text-[#0a0f16] text-lg">E-Commerce</h4>
               <p className="text-gray-500 text-sm mt-2">B2B Distribution</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// ==========================================
// ABOUT PAGE (REVERTED TO STANDARD DESIGN)
// ==========================================
const AboutPage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
  <>
    <div className="absolute top-0 w-full z-50">
      <Navbar currentPage="about" setCurrentPage={setCurrentPage} />
    </div>
    <InnerPageHeader 
      title="About Mayura Freight" 
      subtitle="A dynamic and forward-thinking freight forwarding and foreign trading company."
      image="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070"
    />
    <main className="max-w-screen-xl mx-auto w-full flex-grow px-4 py-24">
      <div className="grid md:grid-cols-2 gap-16 mb-24">
        <div>
          <h2 className="text-4xl font-extrabold text-[#0a0f16] mb-6">Who We Are</h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            Mayura Freight & Trades Pvt Ltd. is dedicated to providing seamless logistics solutions. With a strong presence across South India, we specialize in efficient, cost-effective, and reliable shipping and trading services.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Our expertise spans air, sea, and land freight, ensuring smooth and timely deliveries for businesses of all scales. We are primarily focused on freight forwarding across various countries, facilitating global trade with seamless logistics solutions.
          </p>
        </div>
        <div className="bg-[#0a0f16] rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-[#e61919] rounded-full blur-[80px] opacity-40"></div>
          <h3 className="text-2xl font-bold mb-8 relative z-10">Our Core Values</h3>
          <ul className="space-y-6 relative z-10">
            {[
              { title: 'Reliability', desc: 'Delivering trust through consistent and dependable services.' },
              { title: 'Innovation', desc: 'Embracing technology to enhance logistics efficiency.' },
              { title: 'Customer-Centric', desc: 'Prioritizing client needs and providing personalized solutions.' },
              { title: 'Integrity', desc: 'Upholding transparency and ethical business practices.' },
              { title: 'Sustainability', desc: 'Promoting eco-friendly logistics solutions.' }
            ].map((v, i) => (
              <li key={i} className="flex gap-4">
                <div className="mt-1"><svg className="w-5 h-5 text-[#e61919]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></div>
                <div><strong className="text-white block text-lg">{v.title}</strong><span className="text-gray-400 text-sm">{v.desc}</span></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-[#0a0f16] mb-6">Innovation & Future Outlook</h2>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          We are committed to revolutionizing the freight and logistics industry. We are developing state-of-the-art real-time software providing AI-driven notifications, automated workflows, and secure digital document management. We are on a mission to redefine logistics and export trade in India.
        </p>
      </div>
    </main>
  </>
);

const ServicesPage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => (
  <>
    <div className="absolute top-0 w-full z-50">
      <Navbar currentPage="services" setCurrentPage={setCurrentPage} />
    </div>
    <InnerPageHeader 
      title="Our Services" 
      subtitle="Comprehensive multimodal logistics and trading solutions tailored to ensure smooth and timely global deliveries."
      image="https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?q=80&w=2070"
    />
    <main className="max-w-screen-xl mx-auto w-full flex-grow px-4 py-24">
      
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-[#0a0f16] mb-4">Complete Freight & Logistics Network</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Hover over any service to explore our end-to-end supply chain management capabilities.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Ocean Freight', desc: 'Cost-effective Full Container Load (FCL) and Less than Container Load (LCL) shipping across major global trade lanes.', img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070', icon: <path d="M2 21h20M19.3 14.8C21.1 13.5 22 11.7 22 10V4h-3v3H5V4H2v6c0 1.7.9 3.5 2.7 4.8L2 18h20l-2.7-3.2ZM12 7v7" /> },
          { title: 'Air Expedited', desc: 'Time-critical delivery via scheduled and charter flights. Perfect for high-value and urgent cargo requiring maximum security.', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074', icon: <path d="M17.8 19.2 16 11l3.5-3.5c.8-.8.8-2.1 0-2.9s-2.1-.8-2.9 0L13 8 4.8 6.2c-.5-.1-1 .1-1.3.5l-.3.4c-.4.5-.3 1.2.2 1.5l6.9 3.4-3.4 3.4-2.1-.5c-.4-.1-.8.1-1.1.4l-.3.3c-.3.4-.3 1 .1 1.2l3.7 2 2 3.7c.2.4.8.4 1.2.1l.3-.3c.3-.3.5-.7.4-1.1l-.5-2.1 3.4-3.4 3.4 6.9c.3.5 1 .6 1.5.2l.4-.3c.4-.3.6-.8.5-1.3Z" /> },
          { title: 'Road Transport', desc: 'Seamless domestic and cross-border ground transportation. Our extensive regional fleet network guarantees reliable transit times.', img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070', icon: <><path d="M10 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM21 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" /><path d="M14 2H5a2 2 0 0 0-2 2v11h16V7l-5-5ZM3 15h18v-4H3v4Z" /></> },
          { title: 'Custom Clearance', desc: 'Hassle-free and efficient customs processing for seamless trade operations. Our local experts ensure absolute compliance.', img: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c663c0?q=80&w=2070', icon: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> },
          { title: 'Warehousing', desc: 'Safe storage and timely distribution of goods across key locations. Fully secured facilities managed by our inventory systems.', img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070', icon: <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /> },
          { title: 'Cargo Insurance', desc: 'Comprehensive risk management and cargo insurance solutions to protect your valuable shipments financially from origin point to final destination.', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
          { title: 'Supply Consulting', desc: 'Strategic analysis and optimization of your logistics workflows to reduce overall transit costs, minimize bottlenecks, and improve operational efficiency.', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070', icon: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><circle cx="12" cy="12" r="4"/></> },
          { title: 'Last-Mile Delivery', desc: 'Ensuring safe, accurate, and highly timely final-mile delivery directly to your retail locations, distributors, or end-customers.', img: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=2070', icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> },
          { title: 'Export Trading', desc: 'Specializing in the export of high-quality sambrani and spices to global markets, bridging the gap between local producers and international buyers.', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070', icon: <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Zm0 0v-5" /> }
        ].map((srv, idx) => (
          <div key={idx} onClick={() => setCurrentPage('contact')} className="group relative h-[380px] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl">
            <img src={srv.img} alt={srv.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f16] via-[#0a0f16]/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-[#e61919]/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
              <div className="w-12 h-12 bg-[#e61919] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#e61919]/50 shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">{srv.icon}</svg>
              </div>
              <h3 className="text-xl md:text-2xl font-extrabold text-white mb-0 shrink-0">{srv.title}</h3>
              
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
                <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 flex flex-col">
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 mt-3">{srv.desc}</p>
                  <button className="text-white font-bold text-sm flex items-center gap-2 hover:text-[#e61919] transition-colors uppercase tracking-wider w-fit cursor-pointer">
                    Request Quote <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#e61919]/50 rounded-[2rem] transition-colors duration-500 pointer-events-none z-20" />
          </div>
        ))}
      </div>
    </main>
  </>
);

const ContactPage = ({ setCurrentPage }: { setCurrentPage: (page: string) => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Inquiry sent successfully to Mayura Freight!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <div className="absolute top-0 w-full z-50">
        <Navbar currentPage="contact" setCurrentPage={setCurrentPage} />
      </div>
      <InnerPageHeader 
        title="Get in Touch" 
        subtitle="Partner with Mayura Freight & Trades Pvt Ltd. today."
        image="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075"
      />
      <main className="max-w-screen-xl mx-auto w-full flex-grow px-4 py-24">
        <div className="bg-[#0a0f16] text-white rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Let's build your supply chain.</h2>
              <p className="text-gray-300 text-lg mb-12">Whether you need global freight forwarding, reliable customs clearance, or export trading services, our team is ready to assist you.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-[#e61919] p-4 rounded-xl"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg></div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Our Reach</h4>
                    <p className="text-gray-400">Serving the entire South Indian market, with expansive global connectivity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#e61919] p-4 rounded-xl"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Email Us</h4>
                    <p className="text-gray-400">info@mayurtrades.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10">
              <div className="space-y-4">
                <input type="text" placeholder="Your Name / Company" required className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#e61919] focus:ring-1 focus:ring-[#e61919]" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Work Email" required className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#e61919] focus:ring-1 focus:ring-[#e61919]" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <textarea placeholder="Describe your logistics or trading requirements..." required rows={5} className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#e61919] focus:ring-1 focus:ring-[#e61919] resize-none" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
                <button type="submit" className="w-full bg-[#e61919] hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors cursor-pointer shadow-lg shadow-[#e61919]/30">Submit Inquiry</button>
              </div>
            </form>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-[#e61919]/20 rounded-full blur-[120px] pointer-events-none"></div>
        </div>
      </main>
    </>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col font-sans selection:bg-[#e61919] selection:text-white">
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'services' && <ServicesPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'contact' && <ContactPage setCurrentPage={setCurrentPage} />}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;