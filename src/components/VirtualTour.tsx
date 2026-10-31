import React, { useState, useRef, useEffect } from 'react';
import {
  RotateCcw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Info,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  Compass
} from 'lucide-react';
import { VIRTUAL_TOUR_SCENES } from '../data/hotelData';
import { VirtualTourScene } from '../types';

interface VirtualTourProps {
  onBookExperience?: () => void;
}

export const VirtualTour: React.FC<VirtualTourProps> = ({ onBookExperience }) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const activeScene: VirtualTourScene = VIRTUAL_TOUR_SCENES[activeSceneIndex];

  // Panoramic drag & pan state
  const [panX, setPanX] = useState(0); // 0 to 100 percentage
  const [panY, setPanY] = useState(0); // -15 to +15 vertical tilt
  const [zoomLevel, setZoomLevel] = useState(1); // 1 to 1.8
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<{
    label: string;
    detail: string;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });

  // Auto rotation effect
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setPanX((prev) => (prev + 0.15) % 100);
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Mouse & Touch Pan Handling
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;
    startPosRef.current = { x: e.clientX, y: e.clientY };

    setPanX((prev) => {
      const next = prev - dx * 0.1;
      return (next + 100) % 100;
    });

    setPanY((prev) => {
      const next = prev - dy * 0.1;
      return Math.max(-15, Math.min(15, next));
    });
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <section id="virtual-tour" className="py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-700 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Himalayan 360° Panoramic Exploration</span>
              <span aria-hidden="true">·</span>
              <span>Virtual Immersion</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 [text-wrap:balance]">
              Gaze Upon The Alpine Mountain Sanctuaries
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Survey our cliffside observation decks, royal hearth suites, heated cedar plunge pools, and conservatory dining pavilions from any corner of the globe.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <Eye className="w-4 h-4 text-blue-600" />
            <span className="font-medium">Pan 360 Degrees via Cursor or Touch</span>
          </div>
        </div>

        {/* 360 Virtual Tour Canvas Container */}
        <div
          ref={containerRef}
          className={`relative rounded-3xl overflow-hidden border border-slate-300 bg-black select-none shadow-2xl transition-all duration-300 ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[500px] sm:h-[600px] w-full'
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Panoramic Image Layer with 360 Pan Transform */}
          <div
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-75"
            style={{
              transform: `scale(${zoomLevel}) translateY(${panY}px)`,
            }}
          >
            <div
              className="w-full h-full bg-cover bg-center transition-all duration-500"
              style={{
                backgroundImage: `url(${activeScene.panoramaUrl})`,
                backgroundPosition: `${panX}% center`,
              }}
            />
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/50 pointer-events-none" />
          </div>

          {/* Hotspots Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {activeScene.hotspots.map((hs, index) => {
              const offsetPercent = (hs.x - panX + 150) % 100;
              const isVisible = offsetPercent > 5 && offsetPercent < 95;

              if (!isVisible) return null;

              return (
                <div
                  key={index}
                  style={{
                    left: `${offsetPercent}%`,
                    top: `${hs.y + panY * 0.5}%`,
                  }}
                  className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHotspot({ label: hs.label, detail: hs.detail });
                    }}
                    className="relative flex items-center justify-center p-2 rounded-full cursor-pointer"
                    aria-label={`View detail: ${hs.label}`}
                  >
                    {/* Pulsing ring */}
                    <span className="absolute w-8 h-8 rounded-full bg-blue-400/50 animate-ping" />
                    {/* Hotspot core */}
                    <span className="relative w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl flex items-center justify-center border-2 border-white">
                      <Info className="w-4 h-4" />
                    </span>
                  </button>

                  {/* Hover tooltip label */}
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-slate-900/95 border border-sky-400 px-3.5 py-1.5 rounded-xl text-xs text-white shadow-xl backdrop-blur-md">
                    <strong className="text-amber-300 block">{hs.label}</strong>
                    <span className="text-[11px] text-slate-300">Click to explore</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Hotspot Modal Card */}
          {selectedHotspot && (
            <div
              className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 max-w-sm w-11/12 bg-white/95 border border-slate-200 p-6 rounded-3xl shadow-2xl backdrop-blur-md animate-fade-in text-xs text-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <h4 className="font-serif text-lg font-bold text-slate-900">{selectedHotspot.label}</h4>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                {selectedHotspot.detail}
              </p>
              {onBookExperience && (
                <button
                  onClick={onBookExperience}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-bold uppercase tracking-wider rounded-xl text-[11px] transition-all hover:from-blue-800 hover:to-indigo-900 shadow-md"
                >
                  Reserve Experience Here
                </button>
              )}
            </div>
          )}

          {/* Top Info Bar inside Virtual Tour */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
            <div className="bg-slate-950/80 backdrop-blur-md border border-slate-700 px-4 py-2.5 rounded-2xl pointer-events-auto shadow-lg text-white">
              <span className="text-[10px] uppercase tracking-widest text-sky-300 block font-bold">Viewing Area</span>
              <h3 className="font-serif text-base sm:text-lg text-white font-medium">{activeScene.title}</h3>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className="p-2.5 bg-slate-950/80 hover:bg-slate-800 border border-slate-700 text-white rounded-xl backdrop-blur-md transition-colors shadow-lg cursor-pointer"
                title={isAutoRotating ? 'Pause 360 Auto-Rotation' : 'Resume 360 Auto-Rotation'}
              >
                {isAutoRotating ? <Pause className="w-4 h-4 text-amber-300" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.2))}
                className="p-2.5 bg-slate-950/80 hover:bg-slate-800 border border-slate-700 text-white rounded-xl backdrop-blur-md transition-colors shadow-lg cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={() => setZoomLevel((z) => Math.max(1, z - 0.2))}
                className="p-2.5 bg-slate-950/80 hover:bg-slate-800 border border-slate-700 text-white rounded-xl backdrop-blur-md transition-colors shadow-lg cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setPanX(0);
                  setPanY(0);
                  setZoomLevel(1);
                }}
                className="p-2.5 bg-slate-950/80 hover:bg-slate-800 border border-slate-700 text-white rounded-xl backdrop-blur-md transition-colors shadow-lg cursor-pointer"
                title="Reset View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-2.5 bg-slate-950/80 hover:bg-slate-800 border border-slate-700 text-white rounded-xl backdrop-blur-md transition-colors shadow-lg cursor-pointer"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Bottom Scene Quick Navigator */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
            <button
              onClick={() => {
                setActiveSceneIndex((idx) => (idx - 1 + VIRTUAL_TOUR_SCENES.length) % VIRTUAL_TOUR_SCENES.length);
                setSelectedHotspot(null);
              }}
              className="p-2.5 bg-slate-950/80 hover:bg-slate-800 border border-slate-700 text-white rounded-xl backdrop-blur-md pointer-events-auto shadow-lg cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2 pointer-events-auto bg-slate-950/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700 shadow-lg">
              {VIRTUAL_TOUR_SCENES.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => {
                    setActiveSceneIndex(idx);
                    setSelectedHotspot(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    idx === activeSceneIndex
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  {scene.title.split(' ')[0]} {scene.title.split(' ')[1]}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setActiveSceneIndex((idx) => (idx + 1) % VIRTUAL_TOUR_SCENES.length);
                setSelectedHotspot(null);
              }}
              className="p-2.5 bg-slate-950/80 hover:bg-slate-800 border border-slate-700 text-white rounded-xl backdrop-blur-md pointer-events-auto shadow-lg cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scene Description Card Below Canvas */}
        <div className="mt-6 bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-slate-800">
          <div>
            <h4 className="font-serif text-xl font-bold text-slate-900 mb-1">
              {activeScene.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {activeScene.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
              Scene {activeSceneIndex + 1} of {VIRTUAL_TOUR_SCENES.length}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
