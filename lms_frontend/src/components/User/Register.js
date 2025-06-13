import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8000/api';

function Register() {
  const [studentData, setstudentData] = useState({
    full_name: '',
    email: '',
    password: '',
    username: '',
    interests: '',
    status: '',
  });
  //change element value
  const handleChange = (event) => {
    setstudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };
  //submit form
  const submitForm = async (event) => {
    event.preventDefault();
    const studentFormData = new FormData();
    studentFormData.append('full_name', studentData.full_name);
    studentFormData.append('email', studentData.email);
    studentFormData.append('password', studentData.password);
    studentFormData.append('username', studentData.username);
    studentFormData.append('interests', studentData.interests);

    try {
      const res = await axios.post(baseUrl + '/student/', studentFormData);
      console.log(res.data);

      setstudentData({
        full_name: '',
        email: '',
        password: '',
        username: '',
        interests: '',
        status: 'success',
      });
    } catch (error) {
      setstudentData({ status: 'error' });
    }
  };

  const studentLoginStatus = localStorage.getItem('studentLoginStatus');
  if (studentLoginStatus === 'true') {
    window.location.href = '/user-dashboard';
  }
  useEffect(() => {
    document.title = 'Student Register';
  });
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 offset-3">
          {studentData.status === 'success' && (
            <p className="text-success">Thanks for registration</p>
          )}
          {studentData.status === 'error' && (
            <p className="text-danger">Something went wrong</p>
          )}
          <div className="card">
            <h5 className="card-header">User Register</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Full Name
                  </label>
                  <input
                    name="full_name"
                    value={studentData.full_name}
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    name="email"
                    value={studentData.email}
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
                    name="password"
                    value={studentData.password}
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Username
                  </label>
                  <input
                    name="username"
                    value={studentData.username}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Interests
                  </label>
                  <textarea
                    name="interests"
                    value={studentData.interests}
                    onChange={handleChange}
                    className="form-control"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(event) => submitForm(event)}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
