import React, { useState, useEffect } from 'react';

export default function Registration({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: 'Male',
    department: 'Computer Science',
    year: '1st Year',
    feeStatus: 'Paid',
    status: 'Active',
    address: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const record = {
      ...formData,
      id: initialData?.id || `STU-${Date.now().toString().slice(-5)}`,
      registeredAt: initialData?.registeredAt || new Date().toLocaleDateString()
    };

    onSave(record);
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '16px' }}>
        {initialData ? `Edit Record: ${initialData.id}` : 'Student Admission Form'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. Alex Morgan"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. alex@university.edu"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. 9876543210"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select name="department" value={formData.department} onChange={handleChange}>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics & Comm.">Electronics & Comm.</option>
              <option value="Mechanical Eng.">Mechanical Eng.</option>
            </select>
          </div>

          <div className="form-group">
            <label>Academic Year</label>
            <select name="year" value={formData.year} onChange={handleChange}>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div className="form-group">
            <label>Fee Status</label>
            <select name="feeStatus" value={formData.feeStatus} onChange={handleChange}>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Due">Due</option>
            </select>
          </div>

          <div className="form-group">
            <label>Enrollment Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '16px' }}>
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="City, State"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
          <button type="submit" className="btn-primary">
            {initialData ? 'Update Record' : 'Submit Admission'}
          </button>
          {initialData && (
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}