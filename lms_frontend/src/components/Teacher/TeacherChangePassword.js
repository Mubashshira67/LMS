import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { Route, Routes as Switch } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherChangePassword() {
  const [teacherData, setteacherData] = useState({
    password: '',
  });
  const handleChange = (event) => {
    setteacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };
  const teacherId = localStorage.getItem('teacherId');
  const submitForm = async (event) => {
    event.preventDefault();
    const teacherFormData = new FormData();
    teacherFormData.append('password', teacherData.password);

    try {
      await axios
        .post(baseUrl + '/teacher/change-password/' + teacherId + '/', teacherFormData,)
        .then((res) => {
          if (res.status === 200) {

            window.location.href='/teacher-logout'
          }
          else{
            alert("Oops.. Some Error happened");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = 'Change Password';

  }, []);

  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
  if (teacherLoginStatus !== 'true') {
    window.location.href = '/teacher-login';
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9 ">
          <div className="card">
            <h3 className="card-header">Change Password</h3>
            <div className="card-body">
              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  New Password
                </label>
                <div className="col-sm-10">
                  <input
                    name="password"
                    value={teacherData.password}
                    onChange={(event) => handleChange(event)}
                    type="text"
                    className="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>

              <hr />

              <button
                className="btn btn-primary"
                onClick={(event) => submitForm(event)}
              >
                Update
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherChangePassword;
