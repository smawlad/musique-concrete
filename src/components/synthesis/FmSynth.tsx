import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { initTone } from '../../lib/audio';
import FmControls from './FmControls';
import Keyboard from './Keyboard';
import Presets from './Presets';
import Visualizer from './Visualizer';

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

const FmSynth = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [settings, setSettings] = useState<SynthSettings>({
    harmonicity: 3,
    modulationIndex: 10,
    volume: 0.5,
    attack: 0.01,
    decay: 0.2,
    sustain: 0.3,
    release: 0.5,
    carrierType: 'sine',
    modulatorType: 'sine',
  });

  const polySynthRef = useRef<Tone.PolySynth<Tone.FMSynth> | null>(null);

  useEffect(() => {
    // Create polyphonic FM synth with 8 voices
    const polySynth = new Tone.PolySynth(Tone.FMSynth);
    polySynth.maxPolyphony = 8;

    polySynth.toDestination();
    polySynthRef.current = polySynth;

    // Set initial parameters
    updateSynthParameters(polySynth, settings);

    return () => {
      polySynth.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (polySynthRef.current) {
      updateSynthParameters(polySynthRef.current, settings);
    }
  }, [settings]);

  const updateSynthParameters = (
    synth: Tone.PolySynth<Tone.FMSynth>,
    settings: SynthSettings
  ) => {
    synth.set({
      harmonicity: settings.harmonicity,
      modulationIndex: settings.modulationIndex,
      volume: Tone.gainToDb(settings.volume),
      envelope: {
        attack: settings.attack,
        decay: settings.decay,
        sustain: settings.sustain,
        release: settings.release,
      },
      oscillator: {
        type: settings.carrierType,
      },
      modulationEnvelope: {
        attack: settings.attack,
        decay: settings.decay,
        sustain: settings.sustain,
        release: settings.release,
      },
    });
  };

  const handleInit = async () => {
    await initTone();
    setIsInitialized(true);
  };

  const handleNoteOn = (note: string, frequency: number) => {
    if (polySynthRef.current && isInitialized) {
      polySynthRef.current.triggerAttack(note);
    }
  };

  const handleNoteOff = (note: string) => {
    if (polySynthRef.current && isInitialized) {
      polySynthRef.current.triggerRelease(note);
    }
  };

  const handleLoadPreset = (presetSettings: SynthSettings) => {
    setSettings(presetSettings);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>FM Synthesis Explorer</h2>

      {!isInitialized ? (
        <div style={{ border: '5px solid #000', padding: '30px', background: '#fff' }}>
          <p style={{ marginBottom: '20px', fontSize: '16px' }}>
            CLICK THE BUTTON BELOW TO INITIALIZE AUDIO
          </p>
          <button
            onClick={handleInit}
            style={{
              padding: '20px 40px',
              fontSize: '20px',
            }}
          >
            Initialize Audio
          </button>
        </div>
      ) : (
        <div>
          <Visualizer />

          <Presets
            currentSettings={settings}
            onLoadPreset={handleLoadPreset}
          />

          <Keyboard onNoteOn={handleNoteOn} onNoteOff={handleNoteOff} />

          <FmControls
            harmonicity={settings.harmonicity}
            modulationIndex={settings.modulationIndex}
            volume={settings.volume}
            attack={settings.attack}
            decay={settings.decay}
            sustain={settings.sustain}
            release={settings.release}
            carrierType={settings.carrierType}
            modulatorType={settings.modulatorType}
            onHarmonicityChange={(value) =>
              setSettings({ ...settings, harmonicity: value })
            }
            onModulationIndexChange={(value) =>
              setSettings({ ...settings, modulationIndex: value })
            }
            onVolumeChange={(value) =>
              setSettings({ ...settings, volume: value })
            }
            onAttackChange={(value) =>
              setSettings({ ...settings, attack: value })
            }
            onDecayChange={(value) =>
              setSettings({ ...settings, decay: value })
            }
            onSustainChange={(value) =>
              setSettings({ ...settings, sustain: value })
            }
            onReleaseChange={(value) =>
              setSettings({ ...settings, release: value })
            }
            onCarrierTypeChange={(value) =>
              setSettings({ ...settings, carrierType: value })
            }
            onModulatorTypeChange={(value) =>
              setSettings({ ...settings, modulatorType: value })
            }
          />
        </div>
      )}
    </div>
  );
};

export default FmSynth;
