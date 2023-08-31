import './App.css';
import Auth from './components/Auth';
import Header from './components/Header';
import Courses from './components/Courses';
import {Routes, Route} from 'react-router-dom';
import AddCourse from './components/AddCourse';
import CoursePage from './components/CoursePage';
import MyCourses from './components/MyCourses';

function App() {
  return (
    <div className="App">
    <Header/>
    <main>
          <Routes>
            <Route path="/" element={<Courses />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/coursePage" element={<CoursePage />} />
            <Route path="/myCourses" element={<MyCourses />} />
            <Route path="/addCourse" element={<AddCourse />} />
          </Routes>
        </main>
    </div>
  );
}

export default App;
