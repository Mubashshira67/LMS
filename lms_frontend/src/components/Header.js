import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
const baseUrl = 'http://127.0.0.1:8000/api';
function Header() {
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
  const studentLoginStatus = localStorage.getItem('studentLoginStatus');
  const [studentData, setstudentData] = useState({
    full_name: '',
  });
  const [teacherData, setteacherData] = useState({
    full_name: '',
  });
  const studentId = localStorage.getItem('studentId');
  const teacherId = localStorage.getItem('teacherId');
  useEffect(() => {
    try {
      axios.get(baseUrl + '/student/' + studentId + '/').then((res) => {
        setstudentData({
          full_name: res.data.full_name,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
    useEffect(() => {
      try {
        axios.get(baseUrl + '/teacher/' + teacherId + '/').then((res) => {
          setteacherData({
            full_name: res.data.full_name,
          });
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          CSacademy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/all-courses">
              Courses
            </Link>
            {teacherLoginStatus !== 'true' ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="teacherDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Teacher
                </a>
                <ul className="dropdown-menu" aria-labelledby="teacherDropdown">
                  <Link className="dropdown-item" to="/teacher-login">
                    Login
                  </Link>
                  <Link className="dropdown-item" to="/teacher-register">
                    Register
                  </Link>
                </ul>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="teacherDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {teacherData.full_name}
                </a>
                <ul className="dropdown-menu" aria-labelledby="teacherDropdown">
                  <Link className="dropdown-item" to="/teacher-dashboard">
                    Dashboard
                  </Link>
                  <Link className="dropdown-item" to="/teacher-logout">
                    Logout
                  </Link>
                </ul>
              </li>
            )}

            {studentLoginStatus !== 'true' ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  User
                </a>
                <ul className="dropdown-menu" aria-labelledby="userDropdown">
                  <Link className="dropdown-item" to="/user-login">
                    Login
                  </Link>
                  <Link className="dropdown-item" to="/user-register">
                    Register
                  </Link>
                </ul>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {studentData.full_name}
                </a>
                <ul className="dropdown-menu" aria-labelledby="userDropdown">
                  <Link className="dropdown-item" to="/user-dashboard">
                    Dashboard
                  </Link>
                  <Link className="dropdown-item" to="/user-logout">
                    Logout
                  </Link>
                </ul>
              </li>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
