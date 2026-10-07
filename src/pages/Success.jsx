import { Link } from "react-router-dom";

export default function Success({ student }) {
  if (!student)
    return (
      <div className="card">
        <p>No data yet.</p>
        <Link className="btn" to="/register">Go to Registration</Link>
      </div>
    );
  return (
    <div className="card">
      <h2>Registration Successful</h2>
      <p>Student Name: {student.name}</p>
      <p>Email: {student.email}</p>
      <p>Department: {student.department}</p>
      <p>Year: {student.year}</p>
    </div>
  );
}
