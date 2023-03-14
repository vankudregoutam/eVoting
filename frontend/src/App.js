import './App.css';
import Registration from './component/Registration';
import { useState } from 'react';
import UserLogin from './component/UserLogin';
import Navbar from './component/Navbar';
import AdminLogin from './component/AdminLogin';
import Abc from './component/Abc'
// import Registration from './Registration'
// import Login from './Login'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import Carousel from './component/Carousel';
import Addcandidate from './component/Addcandidate1';
import UserHome from './component/UserHome';
// import FaceRecognition from './component/FaceRecognition';

function App() {
  // const [currentForm, setCurrentForm] = useState('')
  const [mode, setMode] = useState('light')

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#343a40';
    }
  }

  // return (
  //   <div className="App">
  {/* <Router >
        <Navbar title='eVoting' mode={mode} toggleMode={toggleMode} />
        <div className="container">
          <Routes>
            <Route exact path='/admin' element={<> <Carousel /> <AdminLogin /> </>} />
          </Routes>
          <Routes>
            <Route exact path='/' element={<> <Carousel /> {currentForm === 'register' ? <Registration onFormSwitch={toggleForm} /> : <UserLogin onFormSwitch={toggleForm} /> } <Abc /> </>} /> */}
  {/* <Route path='/' element={<> <Carousel /> <UserLogin /> <Abc /> </>} /> */ }
  {/* <Route path='/' element={<><Carousel /> <UserLogin /> </>} /> */ }
  {/* <Route path='/' element={<> <Carousel /> {currentForm === 'register' ? <Registration onFormSwitch={toggleForm} /> : <Login onFormSwitch={toggleForm} /> } </>} /> */ }
  {/* </Routes>
        </div>
      </Router > */}
  //   </div>
  // );

  return (
    <>
      <div className="App">
        <Router>
          <Navbar title='eVoting' mode={mode} toggleMode={toggleMode} />
          <Routes>
            <Route exact path='/' element={<> <Carousel /> <UserLogin /> <Abc /> </>} />
            <Route exact path='/admin' element={<> <AdminLogin /> </>} />
            <Route path='/login' element={<> <Carousel /> <UserLogin /> <Abc /> </>} />
            <Route path='/register' element={<> <Carousel /> <Registration /> <Abc /> </>} />
            <Route path='/addCandidate' element={<> <Addcandidate /> </>} />
            <Route path='/addVote' element={<> <UserHome /> </>} />
          {/* <Addcandidate /> */}
          </Routes>

        </Router>
      </div>
      {/* <FaceRecognition /> */}
    </>
  )

}

export default App;
