import Sidebar from './Sidebar'
import { Link, useParams } from 'react-router-dom';
import { Route, Routes as Switch } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api';

function MyCourses(){
    const [courseData, setcourseData] = useState([]);
    const studentId = localStorage.getItem('studentId');
    const teacherId = localStorage.getItem('teacherId');

    // fetch courses when page loads
    useEffect(() => {
      document.title = 'Enrolled Courses';

      try {
        axios.get(baseUrl + '/enrolled-courses/' + studentId).then((res) => {
          setcourseData(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    }, []);
  return (
    <div className="container mt-5">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9 ">
          <div className="card">
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Created By</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((row, index) => (
                    <tr>
                      <td>
                        <Link to={`/detail/` + row.course.id}>
                          {row.course.title}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/teacher-detail/` + teacherId}>
                          {row.course.teacher.full_name}
                        </Link>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyCourses;