
'use client';

import { useState } from 'react';
import { Space } from '../lib/src/index';

export default function HomePage() {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [alt, setAlt] = useState('');
  const [zoom, setZoom] = useState('');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    try {
      const space = new Space(
        { lat: parseFloat(lat), lng: parseFloat(lng), alt: parseFloat(alt) },
        parseInt(zoom)
      );
      const output = `
        TileHash: ${space.tilehash}
        ZFXY: ${JSON.stringify(space.zfxy)}
      `;
      setResult(output);
      console.log(space);
    } catch (error) {
      setResult('Error: ' + error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>Spatial ID Tool</h1>
      <input style={{ display: 'block', margin: '10px 0', width: '100%' }} placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} />
      <input style={{ display: 'block', margin: '10px 0', width: '100%' }} placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} />
      <input style={{ display: 'block', margin: '10px 0', width: '100%' }} placeholder="Altitude" value={alt} onChange={(e) => setAlt(e.target.value)} />
      <input style={{ display: 'block', margin: '10px 0', width: '100%' }} placeholder="Zoom" value={zoom} onChange={(e) => setZoom(e.target.value)} />
      <button style={{ marginTop: '10px', width: '100%' }} onClick={handleCalculate}>Calculate</button>
      <pre style={{ marginTop: '20px', background: '#f4f4f4', padding: '10px' }}>{result}</pre>
    </div>
  );
}
