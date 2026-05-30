import { useState, useCallback } from 'react';
import { computeStats } from '../utils/priceUtils';

// ─── Mock data generator (used when the API is unreachable) ───────────────────
function generateMockData() {
  const d = {};
  for (let i = 0; i < 24; i++) {
    const h   = i.toString().padStart(2, '0');
    const h2  = ((i + 1) % 24).toString().padStart(2, '0');
    const key = `${h}-${h2}`;
    // Simulate a realistic PVPC daily curve: cheap at night, peaks at 10h and 20h
    const t = (i - 13) * Math.PI / 12;
    const p = Math.max(0.04, 0.135 + 0.065 * Math.sin(t) + 0.015 * (Math.random() - 0.5));
    d[key] = {
      price:          p,
      'is-cheap':     p < 0.09,
      'is-under-avg': p < 0.135,
      hour:           key,
    };
  }
  return d;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function usePVPC() {
  const [data,    setData]    = useState({});
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDemo,  setIsDemo]  = useState(false);
  const [error,   setError]   = useState(null);

  /**
   * Fetches all 24h prices for the given zone code.
   * Zone codes: 'PCB' (Península), 'CYM' (Canarias), 'BAL' (Baleares)
   *
   * API: https://api.preciodelaluz.org/v1/prices/all?zone=PCB
   * No auth token needed. Returns JSON keyed by hour range, e.g.:
   *   { "00-01": { price: 0.124, "is-cheap": true, "is-under-avg": true }, ... }
   */
  const fetchZone = useCallback(async (zone) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.preciodelaluz.org/v1/prices/all?zone=${zone}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      setData(json);
      setStats(computeStats(json));
      setIsDemo(false);
    } catch (err) {
      // API unreachable (CORS in dev, network issue, etc.) → show demo data
      const mock = generateMockData();
      setData(mock);
      setStats(computeStats(mock));
      setIsDemo(true);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, stats, loading, isDemo, error, fetchZone };
}
