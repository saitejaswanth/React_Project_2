import React from 'react';

export default function Home({ students, onNavigate }) {
  const departments = [...new Set(students.map((s) => s.department))];
  const paidCount = students.filter((s) => s.feeStatus === 'Paid').length;
  const activeCount = students.filter((s) => s.status === 'Active').length;

  return (
    <div>
      <div className="card">
        <h2>Institutional Overview</h2>
        <p style={{ marginTop: '6px', color: 'var(--text-muted)' }}>
          Real-time snapshot of enrollment, departments, and financial compliance.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Enrolled Total</h4>
          <div className="stat-number">{students.length}</div>
        </div>
        <div className="stat-card">
          <h4>Active Students</h4>
          <div className="stat-number" style={{ color: 'var(--success)' }}>
            {activeCount}
          </div>
        </div>
        <div className="stat-card">
          <h4>Departments</h4>
          <div className="stat-number">{departments.length}</div>
        </div>
        <div className="stat-card">
          <h4>Fees Cleared</h4>
          <div className="stat-number" style={{ color: 'var(--primary)' }}>
            {paidCount}
          </div>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', gap: '12px' }}>
        <button className="btn-primary" onClick={() => onNavigate('register')}>
          + New Admission
        </button>
        <button className="btn-secondary" onClick={() => onNavigate('directory')}>
          Browse Student Directory
        </button>
      </div>
    </div>
  );
}