import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { Route, Routes as Switch } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherCourses() {
  const [courseData, setCourseData] = useState([]);
    const [totalResult, settotalResult] = useState(0);
  const teacherId = localStorage.getItem('teacherId');
  console.log(teacherId);
  // fetch courses when page loads
  useEffect(() => {
    document.title = 'Teacher Courses';
    try {
      axios.get(baseUrl + '/teacher-courses/' + teacherId).then((res) => {
        settotalResult(res.data.length);
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(courseData);
    const Swal = require('sweetalert2');
    const confirmDelete = async (course_id) => {
      Swal.fire({
        title: 'Confirm',
        text: 'Are you sure you want to delete this data?',
        icon: 'info',
        confirmButtonText: 'Continue',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            axios.delete(baseUrl + '/course/' + course_id).then((res) => {
              Swal.fire('success', 'Data has been deleted.');
              try {
                axios
                  .get(baseUrl + '/teacher-courses/' + teacherId)
                  .then((res) => {
                    settotalResult(res.data.length);
                    setCourseData(res.data);
                  });
              } catch (error) {
                console.log(error);
              }
            });
          } catch (error) {
            Swal.fire('error', 'Data has not been deleted.');
          }
        } else {
          Swal.fire('error', 'Data has not been deleted.');
        }
      });
    };
  return (
    <div className="container mt-5">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9 ">
          <div className="card">
            <h5 className="card-header">My Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Total Enrolled</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courseData.map((course, index) => (
                    <tr>
                      <td>
                        <Link to={'/all-chapters/' + course.id}>
                          {course.title}
                        </Link>
                      </td>
                      <td>
                        <img
                          src={course.featured_img}
                          width="80"
                          height="80"
                          className="rounded"
                          alt={course.title}
                        />
                      </td>
                      <td>
                        <Link to={'/enrolled-students/' + course.id}>
                          {course.total_enrolled_students}
                        </Link>
                      </td>
                      <td>
                        <Link
                          className="btn btn-info btn-sm active text-white "
                          to={'/edit-course/' + course.id}
                        >
                          Edit
                        </Link>
                        <Link
                          className="btn btn-success btn-sm active mx-2 "
                          to={'/add-chapter/' + course.id}
                        >
                          Add Chapter
                        </Link>
                        <button
                          onClick={(event) => confirmDelete(course.id)}
                          className="btn btn-danger btn-sm active"
                        >
                          Delete
                        </button>
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

export default TeacherCourses;
