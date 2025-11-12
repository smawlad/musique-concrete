import React, { useEffect, useCallback } from 'react';

interface KeyboardProps {
  onNoteOn: (note: string, frequency: number) => void;
  onNoteOff: (note: string) => void;
}

// Map of computer keys to notes and frequencies
const keyMap: { [key: string]: { note: string; frequency: number } } = {
  'a': { note: 'C4', frequency: 261.63 },
  'w': { note: 'C#4', frequency: 277.18 },
  's': { note: 'D4', frequency: 293.66 },
  'e': { note: 'D#4', frequency: 311.13 },
  'd': { note: 'E4', frequency: 329.63 },
  'f': { note: 'F4', frequency: 349.23 },
  't': { note: 'F#4', frequency: 369.99 },
  'g': { note: 'G4', frequency: 392.00 },
  'y': { note: 'G#4', frequency: 415.30 },
  'h': { note: 'A4', frequency: 440.00 },
  'u': { note: 'A#4', frequency: 466.16 },
  'j': { note: 'B4', frequency: 493.88 },
  'k': { note: 'C5', frequency: 523.25 },
};

const Keyboard: React.FC<KeyboardProps> = ({ onNoteOn, onNoteOff }) => {
  const activeKeys = React.useRef<Set<string>>(new Set());

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();

    // Prevent repeats when key is held
    if (activeKeys.current.has(key)) return;

    const noteInfo = keyMap[key];
    if (noteInfo) {
      event.preventDefault();
      activeKeys.current.add(key);
      onNoteOn(noteInfo.note, noteInfo.frequency);
    }
  }, [onNoteOn]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    const noteInfo = keyMap[key];

    if (noteInfo) {
      event.preventDefault();
      activeKeys.current.delete(key);
      onNoteOff(noteInfo.note);
    }
  }, [onNoteOff]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const handleMouseDown = (note: string, frequency: number) => {
    onNoteOn(note, frequency);
  };

  const handleMouseUp = (note: string) => {
    onNoteOff(note);
  };

  const isBlackKey = (note: string) => note.includes('#');

  return (
    <div style={{ padding: '20px', border: '5px solid #000', background: '#fff', marginBottom: '20px' }}>
      <h3>Keyboard</h3>
      <p style={{ fontSize: '14px', marginBottom: '20px', marginTop: '10px' }}>
        USE COMPUTER KEYBOARD (A-K ROW) OR CLICK KEYS BELOW
      </p>

      <div style={{
        position: 'relative',
        height: '200px',
        marginTop: '10px',
        userSelect: 'none',
        border: '4px solid #000',
        background: '#fff',
        display: 'inline-block',
        minWidth: 'fit-content'
      }}>
        {/* Render white keys first */}
        {Object.entries(keyMap)
          .filter(([, { note }]) => !isBlackKey(note))
          .map(([key, { note, frequency }]) => (
            <div
              key={note}
              onMouseDown={() => handleMouseDown(note, frequency)}
              onMouseUp={() => handleMouseUp(note)}
              onMouseLeave={() => handleMouseUp(note)}
              style={{
                position: 'relative',
                display: 'inline-block',
                width: '60px',
                height: '200px',
                backgroundColor: '#fff',
                border: '4px solid #000',
                cursor: 'pointer',
                verticalAlign: 'top',
                boxSizing: 'border-box'
              }}
            >
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '12px',
                  color: '#000',
                  fontWeight: 900,
                  letterSpacing: '1px',
                  marginBottom: '4px'
                }}>
                  {note}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#000',
                  fontWeight: 'bold',
                  border: '2px solid #000',
                  padding: '2px 6px',
                  display: 'inline-block'
                }}>
                  {key.toUpperCase()}
                </div>
              </div>
            </div>
          ))}

        {/* Render black keys on top */}
        {Object.entries(keyMap)
          .filter(([, { note }]) => isBlackKey(note))
          .map(([key, { note, frequency }]) => (
            <div
              key={note}
              onMouseDown={() => handleMouseDown(note, frequency)}
              onMouseUp={() => handleMouseUp(note)}
              onMouseLeave={() => handleMouseUp(note)}
              style={{
                position: 'absolute',
                top: '0',
                left: getBlackKeyPosition(note),
                width: '40px',
                height: '120px',
                backgroundColor: '#000',
                border: '4px solid #000',
                cursor: 'pointer',
                zIndex: 2,
                boxSizing: 'border-box'
              }}
            >
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '11px',
                  color: '#fff',
                  fontWeight: 900,
                  letterSpacing: '1px',
                  marginBottom: '4px'
                }}>
                  {note}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#fff',
                  fontWeight: 'bold',
                  border: '2px solid #fff',
                  padding: '2px 4px',
                  display: 'inline-block'
                }}>
                  {key.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

// Helper to position black keys between white keys
// Each white key is 60px wide, black keys are 40px wide
// Black keys should be centered between white keys
const getBlackKeyPosition = (note: string): string => {
  const whiteKeyWidth = 60;
  const blackKeyWidth = 40;
  const halfBlack = blackKeyWidth / 2;

  const positions: { [key: string]: string } = {
    'C#4': `${whiteKeyWidth * 1 - halfBlack}px`, // Between C4 and D4
    'D#4': `${whiteKeyWidth * 2 - halfBlack}px`, // Between D4 and E4
    'F#4': `${whiteKeyWidth * 4 - halfBlack}px`, // Between F4 and G4
    'G#4': `${whiteKeyWidth * 5 - halfBlack}px`, // Between G4 and A4
    'A#4': `${whiteKeyWidth * 6 - halfBlack}px`, // Between A4 and B4
  };
  return positions[note] || '0px';
};

export default Keyboard;
