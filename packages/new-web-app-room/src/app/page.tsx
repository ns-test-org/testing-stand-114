'use client';

import { useEffect, useState, useRef } from 'react';

// Simulated log messages for the terminal
const logMessages = [
  { type: 'system', text: 'SYSTEM BOOT SEQUENCE INITIATED...' },
  { type: 'success', text: 'CPU: 8086 PROCESSOR DETECTED' },
  { type: 'success', text: 'MEMORY: 640KB OK' },
  { type: 'info', text: 'LOADING KERNEL v2.1.4...' },
  { type: 'success', text: 'KERNEL LOADED SUCCESSFULLY' },
  { type: 'info', text: 'INITIALIZING DEVICE DRIVERS...' },
  { type: 'success', text: 'DISK CONTROLLER: OK' },
  { type: 'success', text: 'VIDEO ADAPTER: CGA DETECTED' },
  { type: 'success', text: 'KEYBOARD: INITIALIZED' },
  { type: 'info', text: 'MOUNTING FILE SYSTEMS...' },
  { type: 'success', text: 'ROOT FS MOUNTED AT /' },
  { type: 'info', text: 'STARTING NETWORK SERVICES...' },
  { type: 'success', text: 'NETWORK: ONLINE' },
  { type: 'warning', text: 'WARNING: LOW DISK SPACE ON /DEV/HDA1' },
  { type: 'info', text: 'LOADING USER ENVIRONMENT...' },
  { type: 'success', text: 'USER SESSION STARTED' },
  { type: 'system', text: 'READY FOR INPUT' },
];

export default function Terminal() {
  const [logs, setLogs] = useState<Array<{ type: string; text: string; id: number }>>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
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

  return (
    <div className="h-[100dvh] w-full bg-black flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl h-full max-h-[800px] terminal-container">
        {/* Terminal header */}
        <div className="terminal-header">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00ff00]"></div>
            <span className="terminal-title">SYSTEM TERMINAL v2.1.4</span>
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
              <span className="terminal-prompt">
                {log.type === 'system' && '[SYSTEM]'}
                {log.type === 'success' && '[ OK  ]'}
                {log.type === 'info' && '[INFO ]'}
                {log.type === 'warning' && '[WARN ]'}
                {log.type === 'error' && '[ERROR]'}
              </span>
              <span className="terminal-text">{log.text}</span>
            </div>
          ))}
          
          {/* Cursor */}
          {currentLogIndex >= logMessages.length && (
            <div className="terminal-line">
              <span className="terminal-prompt">[USER ]</span>
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

