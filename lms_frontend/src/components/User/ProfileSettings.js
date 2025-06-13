import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Route, Routes as Switch } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function ProfileSettings() {
  const [studentData, setstudentData] = useState({
    full_name: '',
    email: '',
    username: '',
    interests: '',
    prev_img: '',
    profile_img: '',
    status: '',
  });
  const handleChange = (event) => {
    setstudentData({
      ...studentData,
      [event.target.name]: event.target.value,
    });
  };

  const studentId = localStorage.getItem('studentId');
  const submitForm = async (event) => {
    event.preventDefault();
    const studentFormData = new FormData();
    studentFormData.append('full_name', studentData.full_name);
    studentFormData.append('email', studentData.email);
    studentFormData.append('username', studentData.username);
    studentFormData.append('interests', studentData.interests);

    if (studentData.profile_img !== '') {
      studentFormData.append(
        'profile_img',
        studentData.profile_img,
        studentData.profile_img.name
      );
    }

    try {
      await axios
        .put(baseUrl + '/student/' + studentId + '/', studentFormData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: 'Data has been updated!!',

              icon: 'success',
              toast: true,
              timer: 3000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false,
            });
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (event) => {
    setstudentData({
      ...studentData,
      [event.target.name]: event.target.files[0],
    });
  };
  useEffect(() => {
    document.title = 'Edit Profile';

    try {
      axios.get(baseUrl + '/student/' + studentId + '/').then((res) => {
        setstudentData({
          full_name: res.data.full_name,
          email: res.data.email,
          username: res.data.username,
          interests: res.data.interests,
          prev_img: res.data.profile_img,
          profile_image: '',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const studentLoginStatus = localStorage.getItem('studentLoginStatus');
  if (studentLoginStatus !== 'true') {
    window.location.href = '/user-login';
  }

  return (
    <div className="container mt-5 y-10 ">
      <div className="row">
        <aside className="col-md-3">
          <Sidebar />
        </aside>
        <section className="col-md-9 ">
          <div className="card">
            <h3 className="card-header">Profile-Settings</h3>
            <div className="card-body">
              <div className="mb-3 row">
                <label for="inputName" className="col-sm-2 col-form-label">
                  Fullname
                </label>
                <div className="col-sm-10">
                  <input
                    name="full_name"
                    value={studentData.full_name}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label for="staticEmail" className="col-sm-2 col-form-label">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    name="email"
                    value={studentData.email}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="staticEmail"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  Profile Photo
                </label>
                <div className="col-sm-10">
                  <input
                    name="profile_img"
                    onChange={handleFileChange}
                    type="file"
                    className="form-control"
                    id="inputPassword"
                  />
                  {studentData.prev_img !== '' && (
                    <img
                      src={studentData.prev_img}
                      width="250"
                      height="250"
                      alt={studentData.full_name}
                    />
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  Username
                </label>
                <div className="col-sm-10">
                  <input
                    name="username"
                    onChange={handleChange}
                    value={studentData.username}
                    type="text"
                    className="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  Interests
                </label>
                <div className="col-sm-10">
                  <textarea
                    name="interests"
                    onChange={handleChange}
                    value={studentData.interests}
                    type="text"
                    className="form-control"
                  ></textarea>
                </div>
              </div>

              <hr />

              <button
                type="submit"
                onClick={(event) => submitForm(event)}
                className="btn btn-primary"
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

export default ProfileSettings;
