
'use client'; // ← クライアントコンポーネント指定

import { useState } from 'react';
import { Space } from '../lib/ouranos-gex-lib-for-javascript/index';

export default function Home() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [zoom, setZoom] = useState('25');
  const [alt, setAlt] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const latNum = parseFloat(lat);
      const lonNum = parseFloat(lon);
      const zoomNum = parseInt(zoom, 10);
      const altNum = alt ? parseFloat(alt) : undefined;

      if (Number.isNaN(latNum) || Number.isNaN(lonNum)) {
        setError('lat と lon は必須です');
        return;
      }

      const space = new Space({ lng: lonNum, lat: latNum, alt: altNum }, zoomNum);
      setResult({
        zfxyStr: space.zfxyStr,
        tilehash: space.tilehash,
        zfxy: space.zfxy,
        zoom: space.zoom,
        center: space.center,
        alt: space.alt
      });
    } catch (err: any) {
      setError('計算エラー: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Spatial ID 計算ツール</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>緯度(lat): </label>
          <input value={lat} onChange={(e) => setLat(e.target.value)} required />
        </div>
        <div>
          <label>経度(lon): </label>
          <input value={lon} onChange={(e) => setLon(e.target.value)} required />
        </div>
        <div>
          <label>ズーム(zoom): </label>
          <input value={zoom} onChange={(e) => setZoom(e.target.value)} />
        </div>
        <div>
          <label>高度(alt): </label>
          <input value={alt} onChange={(e) => setAlt(e.target.value)} />
        </div>
        <button type="submit">計算</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>結果</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
