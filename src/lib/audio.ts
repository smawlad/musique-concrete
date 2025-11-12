import * as Tone from 'tone';

let audioContext: AudioContext;

export const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

// Initialize Tone.js audio context (requires user interaction)
export const initTone = async () => {
  await Tone.start();
  console.log('Tone.js audio context started');
};

// Get Tone.js context
export const getToneContext = () => Tone.getContext();

// Export Tone for convenience
export { Tone };
