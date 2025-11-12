import React, { useState, useEffect } from 'react';

interface SynthSettings {
  harmonicity: number;
  modulationIndex: number;
  volume: number;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  carrierType: OscillatorType;
  modulatorType: OscillatorType;
}

interface Preset {
  name: string;
  settings: SynthSettings;
}

interface PresetsProps {
  currentSettings: SynthSettings;
  onLoadPreset: (settings: SynthSettings) => void;
}

const defaultPresets: Preset[] = [
  {
    name: 'Bell',
    settings: {
      harmonicity: 7,
      modulationIndex: 12,
      volume: 0.5,
      attack: 0.01,
      decay: 0.4,
      sustain: 0.1,
      release: 1.5,
      carrierType: 'sine',
      modulatorType: 'sine',
    },
  },
  {
    name: 'Bass',
    settings: {
      harmonicity: 1,
      modulationIndex: 8,
      volume: 0.6,
      attack: 0.01,
      decay: 0.1,
      sustain: 0.8,
      release: 0.3,
      carrierType: 'sine',
      modulatorType: 'sine',
    },
  },
  {
    name: 'Pad',
    settings: {
      harmonicity: 3,
      modulationIndex: 5,
      volume: 0.4,
      attack: 0.5,
      decay: 0.3,
      sustain: 0.7,
      release: 2,
      carrierType: 'sine',
      modulatorType: 'triangle',
    },
  },
  {
    name: 'Brass',
    settings: {
      harmonicity: 2,
      modulationIndex: 15,
      volume: 0.5,
      attack: 0.02,
      decay: 0.2,
      sustain: 0.6,
      release: 0.4,
      carrierType: 'sawtooth',
      modulatorType: 'square',
    },
  },
  {
    name: 'E-Piano',
    settings: {
      harmonicity: 4,
      modulationIndex: 10,
      volume: 0.5,
      attack: 0.01,
      decay: 0.3,
      sustain: 0.2,
      release: 0.8,
      carrierType: 'sine',
      modulatorType: 'sine',
    },
  },
];

const STORAGE_KEY = 'fm-synth-custom-presets';

const Presets: React.FC<PresetsProps> = ({ currentSettings, onLoadPreset }) => {
  const [customPresets, setCustomPresets] = useState<Preset[]>([]);
  const [presetName, setPresetName] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);

  useEffect(() => {
    loadCustomPresets();
  }, []);

  const loadCustomPresets = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCustomPresets(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load custom presets', e);
      }
    }
  };

  const saveCustomPresets = (presets: Preset[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
    setCustomPresets(presets);
  };

  const handleSavePreset = () => {
    if (!presetName.trim()) {
      alert('Please enter a preset name');
      return;
    }

    const newPreset: Preset = {
      name: presetName,
      settings: { ...currentSettings },
    };

    const updated = [...customPresets, newPreset];
    saveCustomPresets(updated);
    setPresetName('');
    setShowSaveForm(false);
  };

  const handleDeletePreset = (index: number) => {
    if (window.confirm('Delete this preset?')) {
      const updated = customPresets.filter((_, i) => i !== index);
      saveCustomPresets(updated);
    }
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '100%',
      border: '5px solid #000',
      background: '#fff',
      marginBottom: '20px'
    }}>
      <h3>Presets</h3>

      <div style={{
        marginBottom: '30px',
        border: '3px solid #000',
        padding: '15px',
        background: '#fff'
      }}>
        <h4>Factory Presets</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '15px' }}>
          {defaultPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onLoadPreset(preset.settings)}
              style={{
                padding: '12px 24px',
                fontSize: '14px'
              }}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        marginBottom: '30px',
        border: '3px solid #000',
        padding: '15px',
        background: '#fff'
      }}>
        <h4>Custom Presets</h4>
        {customPresets.length === 0 ? (
          <p style={{ fontSize: '14px', marginTop: '15px' }}>NO CUSTOM PRESETS SAVED</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '15px' }}>
            {customPresets.map((preset, index) => (
              <div key={index} style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => onLoadPreset(preset.settings)}
                  style={{
                    padding: '12px 24px',
                    fontSize: '14px'
                  }}
                >
                  {preset.name}
                </button>
                <button
                  onClick={() => handleDeletePreset(index)}
                  style={{
                    padding: '12px 16px',
                    fontSize: '14px'
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{
        border: '3px solid #000',
        padding: '15px',
        background: '#fff'
      }}>
        {!showSaveForm ? (
          <button
            onClick={() => setShowSaveForm(true)}
            style={{
              padding: '15px 30px',
              fontSize: '14px'
            }}
          >
            Save Current Settings as Preset
          </button>
        ) : (
          <div style={{ marginTop: '10px' }}>
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="ENTER PRESET NAME"
              style={{
                marginRight: '10px',
                marginBottom: '10px',
                width: '300px'
              }}
            />
            <br />
            <button
              onClick={handleSavePreset}
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                marginRight: '10px',
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowSaveForm(false);
                setPresetName('');
              }}
              style={{
                padding: '12px 24px',
                fontSize: '14px'
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Presets;
