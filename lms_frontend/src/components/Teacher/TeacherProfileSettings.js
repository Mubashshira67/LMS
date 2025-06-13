import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { Route, Routes as Switch } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';

function TeacherProfileSettings() {
 
  const [teacherData, setteacherData] = useState({
    full_name: '',
    email: '', 
    qualification: '',
    mobile_no: '',
    skills: '',
    prev_img:'',
    profile_img: '',
    status: '',
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
    teacherFormData.append('full_name', teacherData.full_name);
    teacherFormData.append('email', teacherData.email);
    teacherFormData.append('qualification', teacherData.qualification);
    teacherFormData.append('mobile_no', teacherData.mobile_no);
    teacherFormData.append('skills', teacherData.skills);
        if (teacherData.profile_img !== '') {
          teacherFormData.append(
            'profile_img',
            teacherData.profile_img,
            teacherData.profile_img.name
          );
        }


    try {
      await axios
        .put(baseUrl + '/teacher/' + teacherId + '/', teacherFormData, {
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
      setteacherData({
        ...teacherData,
        [event.target.name]: event.target.files[0],
      });
    };
useEffect(() => {
    document.title = 'Edit Profile';


        try {
          axios.get(baseUrl + '/teacher/' + teacherId + '/').then((res) => {
            setteacherData({
              full_name: res.data.full_name,
              email: res.data.email,
              qualification: res.data.qualification,
              mobile_no: res.data.mobile_no,
              skills: res.data.skills,
              prev_img: res.data.profile_img,
              profile_image: '',
            });
          });
        } catch (error) {
          console.log(error);
        }
  }, []);

 
    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
    if (teacherLoginStatus !== 'true') {
      window.location.href = '/teacher-login';
    }

  return (
    <div className="container mt-5 y-10 ">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
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
                    value={teacherData.full_name}
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
                    value={teacherData.email}
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
                  {teacherData.prev_img !== '' && (
                    <img
                      src={teacherData.prev_img}
                      width="250"
                      height="250"
                      alt={teacherData.full_name}
                    />
                  )}
                </div>
              </div>
              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  Qualification
                </label>
                <div className="col-sm-10">
                  <input
                    name="qualification"
                    onChange={handleChange}
                    value={teacherData.qualification}
                    type="text"
                    className="form-control"
                    id="inputPassword"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-2 col-form-label">
                  Skills
                </label>
                <div className="col-sm-10">
                  <textarea
                    name="skills"
                    onChange={handleChange}
                    value={teacherData.skills}
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

export default TeacherProfileSettings;
