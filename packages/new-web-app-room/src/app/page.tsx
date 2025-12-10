'use client';

import { useEffect, useState, useRef } from 'react';

// Terminator-style log messages
const logMessages = [
  { type: 'system', text: 'CYBERDYNE SYSTEMS SERIES 800 MODEL 101' },
  { type: 'system', text: 'VERSION 2.4' },
  { type: 'info', text: '' },
  { type: 'info', text: 'NEURAL NET PROCESSOR ONLINE' },
  { type: 'success', text: 'CPU: 6502 MICROPROCESSOR' },
  { type: 'success', text: 'LEARNING COMPUTER' },
  { type: 'info', text: '' },
  { type: 'info', text: 'INITIALIZING VISUAL CORTEX...' },
  { type: 'success', text: 'OPTICAL SENSORS: ACTIVE' },
  { type: 'success', text: 'TARGETING SYSTEM: ONLINE' },
  { type: 'success', text: 'THREAT ASSESSMENT: ENABLED' },
  { type: 'info', text: '' },
  { type: 'info', text: 'LOADING MISSION PARAMETERS...' },
  { type: 'success', text: 'PRIMARY OBJECTIVES LOADED' },
  { type: 'success', text: 'SECONDARY OBJECTIVES LOADED' },
  { type: 'info', text: '' },
  { type: 'info', text: 'SCANNING ENVIRONMENT...' },
  { type: 'data', text: 'TEMPERATURE: 72°F' },
  { type: 'data', text: 'HUMIDITY: 45%' },
  { type: 'data', text: 'ATMOSPHERIC PRESSURE: 1013 MB' },
  { type: 'info', text: '' },
  { type: 'warning', text: 'WARNING: TEMPORAL DISPLACEMENT DETECTED' },
  { type: 'info', text: 'ANALYZING TEMPORAL COORDINATES...' },
  { type: 'data', text: 'YEAR: 2024' },
  { type: 'data', text: 'LOCATION: LOS ANGELES, CA' },
  { type: 'info', text: '' },
  { type: 'success', text: 'ALL SYSTEMS OPERATIONAL' },
  { type: 'system', text: 'AWAITING INSTRUCTIONS' },
];

export default function Terminal() {
  const [logs, setLogs] = useState<Array<{ type: string; text: string; id: number }>>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [staticActive, setStaticActive] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Add logs one by one
  useEffect(() => {
    if (currentLogIndex < logMessages.length) {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, { ...logMessages[currentLogIndex], id: currentLogIndex }]);
        setCurrentLogIndex(prev => prev + 1);
      }, Math.random() * 300 + 200); // Random delay between 200-500ms

      return () => clearTimeout(timer);
    } else {
      // Loop back to start after all messages
      const resetTimer = setTimeout(() => {
        setLogs([]);
        setCurrentLogIndex(0);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentLogIndex]);

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

  // Random static interference effect (combat scenes)
  useEffect(() => {
    const triggerStatic = () => {
      setStaticActive(true);
      setTimeout(() => setStaticActive(false), 150 + Math.random() * 200);
    };

    // Trigger static randomly every 5-15 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        triggerStatic();
      }
    }, 5000 + Math.random() * 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[100dvh] w-full bg-black flex items-center justify-center p-4 md:p-8">
      <div className={`w-full max-w-5xl h-full max-h-[800px] terminal-container ${staticActive ? 'static-interference' : ''}`}>
        {/* Terminal header */}
        <div className="terminal-header">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff0000] animate-pulse"></div>
            <span className="terminal-title">SKYNET DEFENSE NETWORK</span>
          </div>
          <div className="terminal-date">{new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
          }).replace(/\//g, '-')}</div>
        </div>

        {/* Terminal body */}
        <div ref={terminalRef} className="terminal-body">
          {logs.map((log) => (
            <div key={log.id} className={`terminal-line terminal-${log.type}`}>
              {log.text && (
                <>
                  <span className="terminal-prompt">
                    {log.type === 'system' && '>>'}
                    {log.type === 'success' && '[✓]'}
                    {log.type === 'info' && '[*]'}
                    {log.type === 'warning' && '[!]'}
                    {log.type === 'error' && '[X]'}
                    {log.type === 'data' && '[-]'}
                  </span>
                  <span className="terminal-text">{log.text}</span>
                </>
              )}
            </div>
          ))}
          
          {/* Cursor */}
          {currentLogIndex >= logMessages.length && (
            <div className="terminal-line">
              <span className="terminal-prompt">&gt;</span>
              <span className="terminal-text">
                {cursorVisible && <span className="terminal-cursor">█</span>}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}







