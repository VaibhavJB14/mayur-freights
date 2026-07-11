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
            controls.enableZoom = true;
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

  const ORIGIN = { lat: 12.9716, lng: 77.5946 }; // Bangalore
  
  const majorCountries = [
    { name: 'USA', lat: 39.8, lng: -98.5 },
    { name: 'Canada', lat: 56.1, lng: -106.3 },
    { name: 'Mexico', lat: 23.6, lng: -102.5 },
    { name: 'Brazil', lat: -14.2, lng: -51.9 },
    { name: 'Argentina', lat: -38.4, lng: -63.6 },
    { name: 'Chile', lat: -35.6, lng: -71.5 },
    { name: 'Colombia', lat: 4.5, lng: -74.0 },
    { name: 'Peru', lat: -9.1, lng: -75.0 },
    { name: 'Venezuela', lat: 6.4, lng: -66.5 },
    { name: 'UK', lat: 55.3, lng: -3.4 },
    { name: 'Germany', lat: 51.1, lng: 10.4 },
    { name: 'France', lat: 46.2, lng: 2.2 },
    { name: 'Italy', lat: 41.8, lng: 12.5 },
    { name: 'Spain', lat: 40.4, lng: -3.7 },
    { name: 'Russia', lat: 61.5, lng: 105.3 },
    { name: 'Netherlands', lat: 52.1, lng: 5.2 },
    { name: 'Switzerland', lat: 46.8, lng: 8.2 },
    { name: 'Sweden', lat: 60.1, lng: 18.6 },
    { name: 'Poland', lat: 51.9, lng: 19.1 },
    { name: 'Norway', lat: 60.4, lng: 8.4 },
    { name: 'Ukraine', lat: 48.3, lng: 31.1 },
    { name: 'South Africa', lat: -30.5, lng: 22.9 },
    { name: 'Nigeria', lat: 9.0, lng: 8.6 },
    { name: 'Egypt', lat: 26.8, lng: 30.8 },
    { name: 'Kenya', lat: -0.02, lng: 37.9 },
    { name: 'Morocco', lat: 31.7, lng: -7.0 },
    { name: 'Ethiopia', lat: 9.1, lng: 40.4 },
    { name: 'Ghana', lat: 7.9, lng: -1.0 },
    { name: 'UAE', lat: 23.4, lng: 53.8 },
    { name: 'Saudi Arabia', lat: 23.8, lng: 45.0 },
    { name: 'Turkey', lat: 38.9, lng: 35.2 },
    { name: 'Israel', lat: 31.0, lng: 34.8 },
    { name: 'Iran', lat: 32.4, lng: 53.6 },
    { name: 'China', lat: 35.8, lng: 104.1 },
    { name: 'Japan', lat: 36.2, lng: 138.2 },
    { name: 'South Korea', lat: 35.9, lng: 127.7 },
    { name: 'Singapore', lat: 1.3, lng: 103.8 },
    { name: 'Indonesia', lat: -0.7, lng: 113.9 },
    { name: 'Vietnam', lat: 14.0, lng: 108.2 },
    { name: 'Thailand', lat: 15.8, lng: 100.9 },
    { name: 'Malaysia', lat: 4.2, lng: 109.5 },
    { name: 'Philippines', lat: 12.8, lng: 121.7 },
    { name: 'Pakistan', lat: 30.3, lng: 69.3 },
    { name: 'Bangladesh', lat: 23.6, lng: 90.3 },
    { name: 'Australia', lat: -25.2, lng: 133.7 },
    { name: 'New Zealand', lat: -40.9, lng: 174.8 }
  ];

  const majorCities = [
    { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Kochi', lat: 9.9312, lng: 76.2673 },
  ];

  const arcsData = majorCountries.map((d, i) => {
    return {
      startLat: ORIGIN.lat,
      startLng: ORIGIN.lng,
      endLat: d.lat,
      endLng: d.lng,
      color: ['rgba(212, 175, 55, 0.8)', '#54ACBF'], // Gold to Cyan
      order: i
    };
  });

  const ringsData = majorCities.map(c => ({ lat: c.lat, lng: c.lng }));

  const getCityLabelCoords = (city: any) => {
    if (city.name === 'Bengaluru') return { lat: city.lat - 1.5, lng: city.lng - 2.5 };
    if (city.name === 'Chennai') return { lat: city.lat + 1.5, lng: city.lng + 2.5 };
    return { lat: city.lat, lng: city.lng };
  };

  const labelsData = [
    ...majorCountries.map(c => ({ lat: c.lat, lng: c.lng, text: c.name, size: 1.0, color: 'rgba(255, 255, 255, 0.85)', isCity: false })),
    ...majorCities.map(c => {
      const coords = getCityLabelCoords(c);
      return { lat: coords.lat, lng: coords.lng, text: c.name, size: 1.3, color: '#D4AF37', isCity: true };
    })
  ];

  const [isZoomed, setIsZoomed] = useState(false);
  const handleDoubleClick = () => {
    if (globeEl.current) {
      if (isZoomed) {
        globeEl.current.pointOfView({ lat: 20, lng: 80, altitude: 2.2 }, 1000);
      } else {
        globeEl.current.pointOfView({ lat: 20, lng: 80, altitude: 1.1 }, 1000);
      }
      setIsZoomed(!isZoomed);
    }
  };

  return (
    <div ref={containerRef} onDoubleClick={handleDoubleClick} className="absolute inset-0 w-full h-full cursor-grab">
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
          arcDashGap={2}
          arcDashInitialGap={(d) => (d as any).order * 0.12}
          arcDashAnimateTime={3000}
          arcsTransitionDuration={0}

          ringsData={ringsData}
          ringColor={() => (t: number) => `rgba(212, 175, 55, ${1 - t})`}
          ringMaxRadius={4}
          ringPropagationSpeed={1.5}
          ringRepeatPeriod={1500}
          
          labelsData={labelsData}
          labelLat={d => (d as any).lat}
          labelLng={d => (d as any).lng}
          labelText={d => (d as any).text}
          labelSize={d => (d as any).size}
          labelDotRadius={d => (d as any).isCity ? 0 : 0.15}
          labelColor={d => (d as any).color}
          labelResolution={2}
        />
      )}
    </div>
  );
}
