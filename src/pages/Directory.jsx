import React, { useState } from 'react';

export default function Directory({ students, onDelete, onEdit, onBulkImport }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterFee, setFilterFee] = useState('All');
  const [activeModalStudent, setActiveModalStudent] = useState(null);

  // Search & Filters
  const filteredStudents = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      s.fullName?.toLowerCase().includes(term) ||
      s.email?.toLowerCase().includes(term) ||
      s.id?.toLowerCase().includes(term);
    const matchesDept = filterDept === 'All' || s.department === filterDept;
    const matchesFee = filterFee === 'All' || s.feeStatus === filterFee;
    return matchesSearch && matchesDept && matchesFee;
  });

  // Export to CSV
  const handleExportCSV = () => {
    if (students.length === 0) return alert('No students to export.');
    const headers = ['ID,Name,Email,Phone,Department,Year,FeeStatus,Status,RegisteredDate'];
    const rows = students.map((s) =>
      `"${s.id}","${s.fullName}","${s.email}","${s.phone}","${s.department}","${s.year}","${s.feeStatus}","${s.status}","${s.registeredAt}"`
    );
    const csvBlob = new Blob([[headers, ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'students_registry.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Bulk CSV File Upload
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n').filter((l) => l.trim().length > 0);
      const parsed = lines.slice(1).map((line) => {
        const [id, fullName, email, phone, department, year, feeStatus, status] = line
          .split(',')
          .map((item) => item.replace(/"/g, '').trim());
        return {
          id: id || `STU-${Math.floor(10000 + Math.random() * 90000)}`,
          fullName: fullName || 'Imported Student',
          email: email || 'imported@university.edu',
          phone: phone || 'N/A',
          department: department || 'General',
          year: year || '1st Year',
          feeStatus: feeStatus || 'Paid',
          status: status || 'Active',
          registeredAt: new Date().toLocaleDateString()
        };
      });
      onBulkImport(parsed);
    };
    reader.readAsText(file);
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <h2>Students Directory ({filteredStudents.length})</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <label className="btn-secondary" style={{ cursor: 'pointer' }}>
            📥 Import CSV
            <input type="file" accept=".csv" onChange={handleCSVUpload} style={{ display: 'none' }} />
          </label>
          <button className="btn-secondary" onClick={handleExportCSV}>
            📤 Export CSV
          </button>
        </div>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by ID, name, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ minWidth: '220px' }}
        />
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
          <option value="All">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Electronics & Comm.">Electronics & Comm.</option>
          <option value="Mechanical Eng.">Mechanical Eng.</option>
        </select>
        <select value={filterFee} onChange={(e) => setFilterFee(e.target.value)}>
          <option value="All">All Fee Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Partial">Partial</option>
          <option value="Due">Due</option>
        </select>
      </div>

      {filteredStudents.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
          No records match your criteria.
        </p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Year</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.id}</strong></td>
                  <td>{s.fullName}</td>
                  <td>{s.department}</td>
                  <td>{s.year}</td>
                  <td>
                    <span className={`badge badge-${(s.feeStatus || 'Paid').toLowerCase()}`}>
                      {s.feeStatus || 'Paid'}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-active">{s.status || 'Active'}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn-action" onClick={() => setActiveModalStudent(s)}>
                        ID Card
                      </button>
                      <button className="btn-action" onClick={() => onEdit(s)}>
                        Edit
                      </button>
                      <button className="btn-danger" onClick={() => onDelete(s.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ID Card Modal */}
      {activeModalStudent && (
        <div className="modal-overlay" onClick={() => setActiveModalStudent(null)}>
          <div className="modal-content id-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <h3>ACADEMIC ID CARD</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Portal Verified Record</p>
            </div>
            <div style={{ marginTop: '16px', lineHeight: '1.8', fontSize: '0.9rem' }}>
              <p><strong>Roll No:</strong> {activeModalStudent.id}</p>
              <p><strong>Name:</strong> {activeModalStudent.fullName}</p>
              <p><strong>Email:</strong> {activeModalStudent.email}</p>
              <p><strong>Phone:</strong> {activeModalStudent.phone}</p>
              <p><strong>Department:</strong> {activeModalStudent.department}</p>
              <p><strong>Year:</strong> {activeModalStudent.year}</p>
              <p><strong>Fee Status:</strong> {activeModalStudent.feeStatus}</p>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn-primary" onClick={() => window.print()}>
                🖨️ Print
              </button>
              <button className="btn-secondary" onClick={() => setActiveModalStudent(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}