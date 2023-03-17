import './App.css';
import Registration from './component/Registration';
import { useState } from 'react';
import UserLogin from './component/UserLogin';
import Navbar from './component/Navbar';
import AdminLogin from './component/AdminLogin';
import Abc from './component/Abc'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import Carousel from './component/Carousel';
import Addcandidate from './component/AddCandidate';
import AddVote from './component/AddVote';

function App() {
  const [mode, setMode] = useState('light')

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#343a40';
    }
  }

  return (
    <>
      <div className="App">
        <Router>
          <Navbar title='eVoting' mode={mode} toggleMode={toggleMode} />
          <Routes>
            <Route exact path='/' element={<> <Carousel /> <UserLogin /> <Abc /> </>} />
            <Route exact path='/login' element={<> <Carousel /> <UserLogin /> <Abc /> </>} />
            <Route exact path='/register' element={<> <Carousel /> <Registration /> <Abc /> </>} />
            <Route exact path='/addVote' element={<> <AddVote /> </>} />
            <Route exact path='/admin' element={<AdminLogin />} >
            </Route>
            <Route exact path='/addCandidate' element={<> <Addcandidate /> </>} />
            {/* <Route exact path='/admin' element={<AdminLogin />} /> */}
          </Routes>
        </Router>
      </div>
    </>
  )

}

export default App;
