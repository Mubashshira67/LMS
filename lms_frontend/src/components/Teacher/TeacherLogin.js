import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherLogin() {
  const [teacherLoginData, setTeacherLoginData] = useState({
    email: '',
    password: '',
  });


  const [errorMsg, setErrorMsg] =useState('');
  //change element value
  const handleChange = (event) => {
    setTeacherLoginData({
      ...teacherLoginData,
      [event.target.name]: event.target.value,
    });
  };
  const submitForm = async (event) => {
    event.preventDefault();
    const teacherFormData = new FormData();
    teacherFormData.append('email', teacherLoginData.email);
    teacherFormData.append('password', teacherLoginData.password);

    try {
      await axios
        .post(baseUrl + '/teacher-login', teacherFormData)
        .then((response) => {
          if (response.data.bool === true) {
            localStorage.setItem('teacherLoginStatus', true);
            localStorage.setItem('teacherId',response.data.teacher_id);
          }
        });
      const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
      if (teacherLoginStatus === 'true') {
        window.location.href = '/teacher-dashboard';
      }
      else 
      {
           setErrorMsg('Invalid Email or Password');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = 'Teacher Login';
  });
  return (
    <div className="container mt-5 ">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="card">
            <h5 className="card-header">Teacher Login</h5>
            <div className="card-body">
            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
              <form>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    value={teacherLoginData.email}
                    name="email"
                    onChange={handleChange}
                    type="email"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    value={teacherLoginData.password}
                    name="password"
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" for="exampleCheck1">
                    Remember Me
                  </label>
                </div>
                <button
                  type="submit"
                  onClick={(event) => submitForm(event)}
                  className="btn btn-primary"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherLogin;
