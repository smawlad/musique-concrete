import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';

interface VisualizerProps {
  width?: number;
  height?: number;
}

const Visualizer: React.FC<VisualizerProps> = ({ width = 600, height = 150 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<Tone.Analyser | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Create analyser node
    const analyser = new Tone.Analyser('waveform', 1024);
    Tone.getDestination().connect(analyser);
    analyserRef.current = analyser;

    // Start animation
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      analyser.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animate = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;

    if (!canvas || !analyser) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    // Get waveform data
    const waveform = analyser.getValue() as Float32Array;
    const bufferLength = waveform.length;

    // Clear canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw waveform
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#000';
    ctx.beginPath();

    const sliceWidth = canvas.width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const sample = waveform[i];
      const v = (sample + 1) / 2; // Normalize from [-1, 1] to [0, 1]
      const y = v * canvas.height;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Draw center line
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '100%',
      border: '5px solid #000',
      background: '#fff',
      marginBottom: '20px'
    }}>
      <h3>Waveform Visualizer</h3>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          border: '5px solid #000',
          backgroundColor: '#fff',
          width: '100%',
          marginTop: '15px'
        }}
      />
    </div>
  );
};

export default Visualizer;
