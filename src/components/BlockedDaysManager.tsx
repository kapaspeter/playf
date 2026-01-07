import React, { useState, useEffect } from 'react';

interface BlockedDay {
  id: number;
  date: string;
  reason: string | null;
}

const BlockedDaysManager: React.FC = () => {
  const [blockedDays, setBlockedDays] = useState<BlockedDay[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newReason, setNewReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlockedDays();
  }, []);

  const fetchBlockedDays = async () => {
    try {
      setError(null);
      const res = await fetch('/api/admin/blocked-days');
      if (res.ok) {
        const data = await res.json();
        setBlockedDays(Array.isArray(data) ? data : []);
      } else {
        setError(`Failed to fetch: ${res.status}`);
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) return;

    setLoading(true);
    const res = await fetch('/api/admin/blocked-days', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: newDate, reason: newReason })
    });

    if (res.ok) {
      setNewDate('');
      setNewReason('');
      fetchBlockedDays();
    }
    setLoading(false);
  };

  const handleUnblock = async (id: number) => {
    if (!confirm('Are you sure you want to unblock this day?')) return;

    const res = await fetch(`/api/admin/blocked-days?id=${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      fetchBlockedDays();
    }
  };

  return (
    <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Manage Blocked Days</h2>
        <button onClick={fetchBlockedDays} style={{ background: 'none', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.25rem 0.5rem', cursor: 'pointer', color: 'var(--text-body)', fontSize: '0.8rem' }}>Refresh List</button>
      </div>

      {error && <div style={{ color: 'var(--color-accent)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
      
      <form onSubmit={handleBlock} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Date</label>
          <input 
            type="date" 
            value={newDate} 
            onChange={(e) => setNewDate(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-body)', color: 'var(--text-body)' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Reason (Optional)</label>
          <input 
            type="text" 
            placeholder="e.g. Holiday, Maintenance"
            value={newReason} 
            onChange={(e) => setNewReason(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-body)', color: 'var(--text-body)' }}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading || !newDate}
          style={{ alignSelf: 'flex-end', padding: '0.5rem 1rem', backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', opacity: loading || !newDate ? 0.6 : 1 }}
        >
          {loading ? 'Blocking...' : 'Block Day'}
        </button>
      </form>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ padding: '0.5rem' }}>Date</th>
              <th style={{ padding: '0.5rem' }}>Reason</th>
              <th style={{ padding: '0.5rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blockedDays.map((day) => (
              <tr key={day.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.5rem' }}>{day.date}</td>
                <td style={{ padding: '0.5rem' }}>{day.reason || '-'}</td>
                <td style={{ padding: '0.5rem' }}>
                  <button 
                    onClick={() => handleUnblock(day.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Unblock
                  </button>
                </td>
              </tr>
            ))}
            {blockedDays.length === 0 && (
              <tr>
                <td colSpan={3} style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No days blocked yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlockedDaysManager;
