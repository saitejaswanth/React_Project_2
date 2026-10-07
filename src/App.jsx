import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Directory from './pages/Directory';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('portal_students');
    if (saved) {
      try {
        setStudents(JSON.parse(saved));
      } catch (e) {
        setStudents([]);
      }
    }
    const savedTheme = localStorage.getItem('portal_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('portal_theme', nextTheme);
  };

  const saveStudents = (updatedList) => {
    setStudents(updatedList);
    localStorage.setItem('portal_students', JSON.stringify(updatedList));
  };

  const handleSaveStudent = (studentData) => {
    if (editingStudent) {
      const updated = students.map((s) => (s.id === studentData.id ? studentData : s));
      saveStudents(updated);
      setEditingStudent(null);
    } else {
      saveStudents([studentData, ...students]);
    }
    setCurrentPage('directory');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this record permanently?')) {
      saveStudents(students.filter((s) => s.id !== id));
    }
  };

  const handleBulkImport = (importedStudents) => {
    saveStudents([...importedStudents, ...students]);
    alert(`Successfully imported ${importedStudents.length} students!`);
  };

  return (
    <div>
      <header className="navbar">
        <div className="brand">🎓 Academix Portal</div>
        <nav className="nav-links">
          <button
            className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('home'); setEditingStudent(null); }}
          >
            Dashboard
          </button>
          <button
            className={`nav-btn ${currentPage === 'register' && !editingStudent ? 'active' : ''}`}
            onClick={() => { setCurrentPage('register'); setEditingStudent(null); }}
          >
            Register Student
          </button>
          <button
            className={`nav-btn ${currentPage === 'directory' ? 'active' : ''}`}
            onClick={() => { setCurrentPage('directory'); setEditingStudent(null); }}
          >
            Directory ({students.length})
          </button>
          <button className="btn-secondary" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </nav>
      </header>

      <main className="container">
        {currentPage === 'home' && (
          <Home students={students} onNavigate={setCurrentPage} />
        )}
        {currentPage === 'register' && (
          <Registration
            initialData={editingStudent}
            onSave={handleSaveStudent}
            onCancel={() => { setEditingStudent(null); setCurrentPage('directory'); }}
          />
        )}
        {currentPage === 'directory' && (
          <Directory
            students={students}
            onDelete={handleDelete}
            onEdit={(student) => {
              setEditingStudent(student);
              setCurrentPage('register');
            }}
            onBulkImport={handleBulkImport}
          />
        )}
      </main>
    </div>
  );
}