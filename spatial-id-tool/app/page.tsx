
'use client';

import { useState } from 'react';
import { Space } from './lib/src/index';

export default function HomePage() {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [alt, setAlt] = useState('');
  const [zoom, setZoom] = useState('');
  const [result, setResult] = useState('');

  const handleCalculate = () => {
    const space = new Space();
    const tile = space.fromLatLngAltZoom(
      parseFloat(lat),
      parseFloat(lng),
      parseFloat(alt),
      parseInt(zoom)
    );
    setResult(JSON.stringify(tile));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Spatial ID Tool</h1>
      <input placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} />
      <input placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} />
      <input placeholder="Altitude" value={alt} onChange={(e) => setAlt(e.target.value)} />
      <input placeholder="Zoom" value={zoom} onChange={(e) => setZoom(e.target.value)} />
      <button onClick={handleCalculate}>Calculate</button>
      <pre>{result}</pre>
    </div>
  );
}
