import React from 'react';

interface FmControlsProps {
  harmonicity: number;
  modulationIndex: number;
  volume: number;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  carrierType: OscillatorType;
  modulatorType: OscillatorType;
  onHarmonicityChange: (value: number) => void;
  onModulationIndexChange: (value: number) => void;
  onVolumeChange: (value: number) => void;
  onAttackChange: (value: number) => void;
  onDecayChange: (value: number) => void;
  onSustainChange: (value: number) => void;
  onReleaseChange: (value: number) => void;
  onCarrierTypeChange: (value: OscillatorType) => void;
  onModulatorTypeChange: (value: OscillatorType) => void;
}

const FmControls: React.FC<FmControlsProps> = ({
  harmonicity,
  modulationIndex,
  volume,
  attack,
  decay,
  sustain,
  release,
  carrierType,
  modulatorType,
  onHarmonicityChange,
  onModulationIndexChange,
  onVolumeChange,
  onAttackChange,
  onDecayChange,
  onSustainChange,
  onReleaseChange,
  onCarrierTypeChange,
  onModulatorTypeChange,
}) => {
  const waveforms: OscillatorType[] = ['sine', 'square', 'sawtooth', 'triangle'];

  return (
    <div style={{
      padding: '20px',
      maxWidth: '100%',
      border: '5px solid #000',
      background: '#fff',
      marginBottom: '20px'
    }}>
      <h3>FM Synthesis Controls</h3>

      <div style={{
        marginBottom: '30px',
        border: '3px solid #000',
        padding: '15px',
        background: '#fff'
      }}>
        <h4>Oscillators</h4>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Harmonicity (Mod Freq Ratio): {harmonicity.toFixed(2)}
            <br />
            <input
              type="range"
              min="0.5"
              max="8"
              step="0.1"
              value={harmonicity}
              onChange={(e) => onHarmonicityChange(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Modulation Index (FM Depth): {modulationIndex.toFixed(1)}
            <br />
            <input
              type="range"
              min="0"
              max="50"
              step="0.5"
              value={modulationIndex}
              onChange={(e) => onModulationIndexChange(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Volume: {Math.round(volume * 100)}%
            <br />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </label>
        </div>
      </div>

      <div style={{
        marginBottom: '30px',
        border: '3px solid #000',
        padding: '15px',
        background: '#fff'
      }}>
        <h4>ADSR Envelope</h4>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Attack: {attack.toFixed(2)}s
            <br />
            <input
              type="range"
              min="0.01"
              max="2"
              step="0.01"
              value={attack}
              onChange={(e) => onAttackChange(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Decay: {decay.toFixed(2)}s
            <br />
            <input
              type="range"
              min="0.01"
              max="2"
              step="0.01"
              value={decay}
              onChange={(e) => onDecayChange(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Sustain: {sustain.toFixed(2)}
            <br />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={sustain}
              onChange={(e) => onSustainChange(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Release: {release.toFixed(2)}s
            <br />
            <input
              type="range"
              min="0.01"
              max="3"
              step="0.01"
              value={release}
              onChange={(e) => onReleaseChange(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </label>
        </div>
      </div>

      <div style={{
        marginBottom: '20px',
        border: '3px solid #000',
        padding: '15px',
        background: '#fff'
      }}>
        <h4>Waveforms</h4>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Carrier Waveform:
            <br />
            <select
              value={carrierType}
              onChange={(e) => onCarrierTypeChange(e.target.value as OscillatorType)}
              style={{ width: '100%' }}
            >
              {waveforms.map((wf) => (
                <option key={wf} value={wf}>
                  {wf.charAt(0).toUpperCase() + wf.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Modulator Waveform:
            <br />
            <select
              value={modulatorType}
              onChange={(e) => onModulatorTypeChange(e.target.value as OscillatorType)}
              style={{ width: '100%' }}
            >
              {waveforms.map((wf) => (
                <option key={wf} value={wf}>
                  {wf.charAt(0).toUpperCase() + wf.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FmControls;
