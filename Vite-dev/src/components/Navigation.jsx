import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav  className="Nav">
       <Link to="/">Home</Link>
       <Link to="/employees">Employees</Link>
       <Link to="/time-off-requests">Time Off Requests</Link>
       <Link to="/positions">Positions</Link>
       <Link to="/employee-shifts">Employee-Shifts</Link>
       <Link to="/shifts">Shifts</Link>
    </nav>
  );
}

// CHANGE these routes ^ above