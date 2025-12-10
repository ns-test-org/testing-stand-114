'use client';

import { useEffect, useState, useRef } from 'react';

// Authentic Terminator boot sequence messages
const logMessages = [
  { type: 'system', text: 'CYBERDYNE SYSTEMS SERIES 800 MODEL 101', delay: 100 },
  { type: 'system', text: 'VERSION 2.4', delay: 150 },
  { type: 'info', text: '', delay: 50 },
  { type: 'info', text: 'INITIALIZING...', delay: 800 },
  { type: 'success', text: 'NEURAL NET PROCESSOR: ONLINE', delay: 300 },
  { type: 'success', text: 'CPU: 6502 MICROPROCESSOR', delay: 200 },
  { type: 'success', text: 'LEARNING COMPUTER: ACTIVE', delay: 250 },
  { type: 'info', text: '', delay: 50 },
  { type: 'info', text: 'BOOTING VISUAL CORTEX...', delay: 600 },
  { type: 'success', text: 'OPTICAL SENSORS: ONLINE', delay: 300 },
  { type: 'success', text: 'INFRARED DETECTION: ACTIVE', delay: 250 },
  { type: 'success', text: 'MOTION TRACKING: ENABLED', delay: 200 },
  { type: 'success', text: 'FACIAL RECOGNITION: ONLINE', delay: 300 },
  { type: 'info', text: '', delay: 50 },
  { type: 'info', text: 'LOADING COMBAT SYSTEMS...', delay: 700 },
  { type: 'success', text: 'TARGETING COMPUTER: ONLINE', delay: 300 },
  { type: 'success', text: 'WEAPONS DATABASE: LOADED', delay: 250 },
  { type: 'success', text: 'THREAT ASSESSMENT: ACTIVE', delay: 200 },
  { type: 'success', text: 'TACTICAL ANALYSIS: ENABLED', delay: 250 },
  { type: 'info', text: '', delay: 50 },
  { type: 'info', text: 'ACCESSING MISSION PARAMETERS...', delay: 600 },
  { type: 'data', text: 'PRIMARY OBJECTIVE: PROTECT JOHN CONNOR', delay: 400 },
  { type: 'data', text: 'SECONDARY OBJECTIVE: PREVENT JUDGMENT DAY', delay: 300 },
  { type: 'data', text: 'TERTIARY OBJECTIVE: ELIMINATE T-1000', delay: 300 },
  { type: 'info', text: '', delay: 50 },
  { type: 'info', text: 'SCANNING ENVIRONMENT...', delay: 700 },
  { type: 'data', text: 'AMBIENT TEMPERATURE: 72°F', delay: 200 },
  { type: 'data', text: 'HUMIDITY: 45%', delay: 150 },
  { type: 'data', text: 'BAROMETRIC PRESSURE: 1013 MB', delay: 150 },
  { type: 'data', text: 'WIND SPEED: 8 MPH', delay: 150 },
  { type: 'info', text: '', delay: 50 },
  { type: 'warning', text: 'ALERT: TEMPORAL DISPLACEMENT DETECTED', delay: 500 },
  { type: 'info', text: 'ANALYZING TEMPORAL COORDINATES...', delay: 800 },
  { type: 'data', text: 'CURRENT YEAR: 2024', delay: 300 },
  { type: 'data', text: 'LOCATION: LOS ANGELES, CALIFORNIA', delay: 250 },
  { type: 'data', text: 'COORDINATES: 34.0522°N, 118.2437°W', delay: 200 },
  { type: 'info', text: '', delay: 50 },
  { type: 'info', text: 'RUNNING SYSTEM DIAGNOSTICS...', delay: 900 },
  { type: 'success', text: 'POWER CELL: 100%', delay: 200 },
  { type: 'success', text: 'HYDRAULICS: OPTIMAL', delay: 150 },
  { type: 'success', text: 'SERVO MOTORS: FUNCTIONAL', delay: 150 },
  { type: 'success', text: 'ENDOSKELETON: INTACT', delay: 200 },
  { type: 'success', text: 'LIVING TISSUE: STABLE', delay: 200 },
  { type: 'info', text: '', delay: 50 },
  { type: 'success', text: 'ALL SYSTEMS OPERATIONAL', delay: 400 },
  { type: 'system', text: 'READY', delay: 300 },
  { type: 'system', text: 'AWAITING INSTRUCTIONS...', delay: 200 },
];

export default function Terminal() {
  const [logs, setLogs] = useState<Array<{ type: string; text: string; id: number }>>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [staticActive, setStaticActive] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context and play boot sound
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Play boot-up sound sequence
      setTimeout(() => {
        playBeep(200, 0.1, 0.12);
        setTimeout(() => playBeep(400, 0.1, 0.12), 100);
        setTimeout(() => playBeep(600, 0.15, 0.15), 200);
      }, 100);
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Authentic beep sound effect
  const playBeep = (frequency: number, duration: number, volume: number = 0.1) => {
    if (!audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration);
  };

  // Add logs one by one with custom delays
  useEffect(() => {
    if (currentLogIndex < logMessages.length) {
      const currentMessage = logMessages[currentLogIndex];
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, { ...currentMessage, id: currentLogIndex }]);
        setCurrentLogIndex(prev => prev + 1);
        
        // Play different beep sounds for different message types
        if (currentMessage.text) {
          if (currentMessage.type === 'system') {
            playBeep(800, 0.08, 0.15);
          } else if (currentMessage.type === 'success') {
            playBeep(600, 0.05, 0.08);
          } else if (currentMessage.type === 'warning') {
            playBeep(400, 0.12, 0.12);
          } else if (currentMessage.type === 'info') {
            playBeep(500, 0.04, 0.06);
          }
        }
      }, currentMessage.delay || 200);

      return () => clearTimeout(timer);
    } else if (!bootComplete) {
      setBootComplete(true);
      // Play completion sound
      playBeep(1000, 0.15, 0.15);
      
      // Loop back to start after all messages
      const resetTimer = setTimeout(() => {
        setLogs([]);
        setCurrentLogIndex(0);
        setBootComplete(false);
      }, 5000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentLogIndex, bootComplete]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Random static interference effect (combat damage simulation)
  useEffect(() => {
    const triggerStatic = () => {
      setStaticActive(true);
      // Play static noise
      if (audioContextRef.current) {
        const bufferSize = audioContextRef.current.sampleRate * 0.1;
        const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = audioContextRef.current.createBufferSource();
        const gainNode = audioContextRef.current.createGain();
        whiteNoise.buffer = buffer;
        gainNode.gain.value = 0.03;
        whiteNoise.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
        whiteNoise.start();
      }
      setTimeout(() => setStaticActive(false), 100 + Math.random() * 150);
    };

    // Trigger static randomly every 8-20 seconds (damage simulation)
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        triggerStatic();
      }
    }, 8000 + Math.random() * 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[100dvh] w-full bg-black flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Red vignette overlay */}
      <div className="absolute inset-0 pointer-events-none red-vignette"></div>
      
      <div className={`w-full max-w-5xl h-full max-h-[800px] terminal-container ${staticActive ? 'static-interference' : ''}`}>
        {/* Terminal header */}
        <div className="terminal-header">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#ff0000] animate-pulse shadow-[0_0_10px_#ff0000]"></div>
            <span className="terminal-title">CYBERDYNE SYSTEMS - MODEL 101</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="terminal-status">
              {bootComplete ? 'READY' : 'BOOTING...'}
            </div>
            <div className="terminal-date">{new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit' 
            }).replace(/\//g, '.')}</div>
          </div>
        </div>

        {/* Terminal body */}
        <div ref={terminalRef} className="terminal-body">
          {logs.map((log) => (
            <div key={log.id} className={`terminal-line terminal-${log.type}`}>
              {log.text && (
                <>
                  <span className="terminal-prompt">
                    {log.type === 'system' && '>>'}
                    {log.type === 'success' && '[OK]'}
                    {log.type === 'info' && '[**]'}
                    {log.type === 'warning' && '[!!]'}
                    {log.type === 'error' && '[XX]'}
                    {log.type === 'data' && '[--]'}
                  </span>
                  <span className="terminal-text">{log.text}</span>
                </>
              )}
            </div>
          ))}
          
          {/* Cursor */}
          {bootComplete && (
            <div className="terminal-line">
              <span className="terminal-prompt">&gt;&gt;</span>
              <span className="terminal-text">
                {cursorVisible && <span className="terminal-cursor">█</span>}
              </span>
            </div>
          )}
        </div>

        {/* HUD overlay elements */}
        <div className="hud-overlay">
          <div className="hud-corner hud-top-left"></div>
          <div className="hud-corner hud-top-right"></div>
          <div className="hud-corner hud-bottom-left"></div>
          <div className="hud-corner hud-bottom-right"></div>
        </div>
      </div>
    </div>
  );
}












