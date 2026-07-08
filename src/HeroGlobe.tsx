import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

export default function HeroGlobe() {
  const globeEl = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [countries, setCountries] = useState<any>({ features: [] });

  useEffect(() => {
    // Fetch GeoJSON for country polygons
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    // Initial size
    setTimeout(updateDimensions, 100);
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      if (globeEl.current) {
        try {
          // Position the camera to focus on India, without auto-rotation
          const controls = globeEl.current.controls();
          if (controls) {
            controls.autoRotate = false;
            controls.enableZoom = false;
          }
          
          if (typeof globeEl.current.pointOfView === 'function') {
            globeEl.current.pointOfView({ lat: 20, lng: 80, altitude: 2.2 }, 1000);
          }
          
          // Make the base globe slightly lighter
          if (typeof globeEl.current.globeMaterial === 'function') {
            const globeMaterial = globeEl.current.globeMaterial();
            if (globeMaterial && globeMaterial.color) {
              globeMaterial.color.set('#ffffff'); // reset color to display image naturally
            }
          }
        } catch (error) {
          console.error("Globe initialization error:", error);
        }
      }
    }, 100);
    
    return () => clearTimeout(initTimer);
  }, [dimensions, countries]); // Trigger after dimensions are set

  const ORIGIN = { lat: 13.0, lng: 77.5 }; // Bangalore/South India
  
  const destinations = [
    { name: 'Belarus', lat: 53.9, lng: 27.5 },
    { name: 'Kazakhstan', lat: 51.1, lng: 71.4 },
    { name: 'Kyrgyzstan', lat: 42.8, lng: 74.5 },
    { name: 'Georgia', lat: 41.7, lng: 44.8 },
    { name: 'Uzbekistan', lat: 41.2, lng: 69.2 },
    { name: 'Bosnia', lat: 43.8, lng: 18.4 },
    { name: 'Vietnam', lat: 21.0, lng: 105.8 },
    { name: 'Philippines', lat: 14.5, lng: 120.9 },
    { name: 'Timor-Leste', lat: -8.5, lng: 125.5 },
    { name: 'Mauritius', lat: -20.3, lng: 57.5 },
    { name: 'Russia', lat: 55.7, lng: 37.6 },
  ];

  const arcsData = destinations.map(d => ({
    startLat: ORIGIN.lat,
    startLng: ORIGIN.lng,
    endLat: d.lat,
    endLng: d.lng,
    color: ['rgba(212, 175, 55, 0.8)', '#54ACBF'] // Gold to Cyan
  }));

  const ringsData = [{ lat: ORIGIN.lat, lng: ORIGIN.lng }];

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Globe
          ref={globeEl}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
          
          showAtmosphere={true}
          atmosphereColor="#ffffff"
          atmosphereAltitude={0.15}
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"

          arcsData={arcsData}
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={2000}
          arcsTransitionDuration={0}

          ringsData={ringsData}
          ringColor={() => (t: number) => `rgba(212, 175, 55, ${1 - t})`}
          ringMaxRadius={12}
          ringPropagationSpeed={2.5}
          ringRepeatPeriod={1000}
        />
      )}
    </div>
  );
}
