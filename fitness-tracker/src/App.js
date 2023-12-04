
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Homepage';
import Schedule from './Schedule';
// Import your pages here

function App() {

  return (
    // Add your paths here
    // Moved the home page to a separate file
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/schedule' element={<Schedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
