import { Link, useParams } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { Route, Routes as Switch } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherDashboard() {
  const [dashboardData, setdashboardData] = useState([]);
  const teacherId=localStorage.getItem('teacherId');

  
  useEffect(() => {
    document.title = 'Teacher Dashboard';
    try {
      axios
        .get(baseUrl + '/teacher/dashboard/' + teacherId)
        .then((res) => {
          console.log(res);
          setdashboardData(res.data);
          
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="container mt-5">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>

        <div className="card" style={{ width: '18rem' }}>
          <img
            src="/courses.jpg"
            className="card-img-top"
            height="200"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Courses</h5>
            <p className="card-text"></p>
            <h1>
              {dashboardData.total_teacher_courses}
            </h1>
          </div>
        </div>
        <div className="card mx-4" style={{ width: '18rem' }}>
          <img
            src="/images.jpg"
            className="card-img-top"
            height="200"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Students</h5>
            <p className="card-text"></p>
            <h1>
              {dashboardData.total_teacher_students}
            </h1>
          </div>
        </div>
        <div className="card " style={{ width: '18rem' }}>
          <img
            src="/book.jpg"
            className="card-img-top"
            height="200"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Chapters:</h5>
            <p className="card-text"></p>
            <h1>
              {dashboardData.total_teacher_chapters}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
