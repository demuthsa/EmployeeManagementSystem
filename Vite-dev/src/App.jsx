import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import reactLogo from './assets/react.svg'
import './App.css'
// You no longer need to "import React from 'react' " on every page/componant (only do it in main.jsx), .jsx does it for you

// import pages
import HomePage from './pages/HomePage';

import EmployeesPage from './pages/Employees';
import EmployeeNew from './pages/EmployeeNew';

import TimeOffRequestsPage from './pages/TimeOffRequests';
import TimeOffRequestNew from './pages/TimeOffRequestNew';
import TimeOffRequestForm from './pages/TimeOffRequestForm';

import PositionsPage from './pages/Positions';
import PositionsNew from './pages/PositionNew';


import ShiftsPage from './pages/ShiftsPage';
import ShiftsNew from './pages/ShiftsNew';
import ShiftsUpdate from './pages/ShiftsUpdate';

import EmployeeShiftsPage from './pages/EmployeeShiftsPage';
import EmployeeShiftsNew from './pages/EmployeeShiftsNew';
import EmployeeShiftsUpdate from './pages/EmployeeShiftsUpdate';
import RequestNew from './pages/TimeOffRequestNew';

// import components
import Navigation from './components/Navigation';
import EmployeeForm from './pages/EmployeeForm';



function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img class="medical-logo" src="/medical-logo.png" alt="medical logo" />
        <h1>Tegridy Timetable</h1>
        <h4>REDUCE CHAOS, COSTS, AND TURNOVER</h4>
      </header>
      <main className="App-main">
        <Router>
            {/* PLEASE NOTE: <nav> tags are inside the <Navigation /> componant */}
            <Navigation />
            
            {/* THIS SETS UP THE URL ROUTES FOR REACT FRONTEND */}
            <Routes>
              {/* HOME REACT ROUTE */}
              <Route path="/" element={<HomePage />} />

              {/* EMPLOYEE REACT ROUTES */}
              <Route path="/employees" element={<EmployeesPage />} />
              <Route path="/EmployeeNew" element={<EmployeeNew />}/>

              {/* TIME OFF REQUEST REACT ROUTES */}
              <Route path="/time-off-requests" element={<TimeOffRequestsPage />} />
              <Route path="/TimeOffRequestNew" element={<RequestNew />}/>

              {/* POSITIONS REACT ROUTES */}
              <Route path="/positions" element={<PositionsPage />} />
              <Route path="/positionsnew" element={<PositionsNew />} /> 

              {/* SHIFTS REACT ROUTES */}
              <Route path="/shifts" element={<ShiftsPage />}></Route>
              <Route path="/shiftsnew" element={<ShiftsNew />}></Route>
              <Route path="/shiftsupdate" element={<ShiftsUpdate />}></Route>

              {/* EMPLOYEE_SHIFTS REACT ROUTES */}
              <Route path="/employee-shifts" element={<EmployeeShiftsPage />}></Route>
              <Route path="/employee-shifts-new" element={<EmployeeShiftsNew />}></Route>
              <Route path="/employee-shifts-update" element={<EmployeeShiftsUpdate />}></Route>

              {/* ZAC FIX ON MAIN ABOVE  */}

              {/* EXAMPLE ROUTES and HOOKs from an old project (delete this eventually) */}
              {/* <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route> */}
              {/* <Route path="/edit" element={ <EditExercisePage exerciseToEdit={exerciseToEdit}/>}></Route> */}
              {/* <Route path="/add" element={ <CreateExercisePage />}></Route> */}

              {/* Here is a comment */}

            </Routes>
          </Router>
      </main>
      <footer className="App-footer">
        <p>© 2023 Zachary Maes & Sam DeMuth</p>
      </footer>

    </div>
  )
}

export default App
