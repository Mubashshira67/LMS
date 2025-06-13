import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
const baseUrl = 'http://127.0.0.1:8000/api';
function CourseDetail(){
  const [courseData, setcourseData] = useState([]);
  const [chapterData, setchapterData] = useState([]);
   const [teacherData, setteacherData] = useState([]);
   const [techListData, settechListData] = useState([]);
  const [userLoginStatus, setuserLoginStatus] = useState([]);
  const [enrollStatus, setenrollStatus] = useState([]);
  let {course_id}=useParams();

    useEffect(() => {
      document.title = 'Details';
      try {
        axios.get(baseUrl + '/course/' + course_id).then((res) => {
          setcourseData(res.data);
          setchapterData(res.data.course_chapters);
          setteacherData(res.data.teacher);
          settechListData(res.data.tech_list);
        });
      } catch (error) {
        console.log(error);
      }
      //fetch enrolled status
            try {
              axios.get(baseUrl + '/fetch-enroll-status/' + studentId+'/'+ course_id ).then((res) => {
                console.log(res);
                if(res.data.bool ===true)
                setenrollStatus('success');
              });
            } catch (error) {
              console.log(error);
            }
      const studentLoginStatus=localStorage.getItem('studentLoginStatus');
      if(studentLoginStatus ==='true')
      {
        setuserLoginStatus('success');
      }
    }, []);
   const studentId = localStorage.getItem('studentId');

     const enrollCourse = async (event) => {
       event.preventDefault();
        
        console.log(studentId);
    const _formData = new FormData();
    _formData.append('course', course_id);
   
    _formData.append('student', studentId);
  
   
    try {
      await axios
        .post(baseUrl + '/student-enroll-course/', _formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                      Swal.fire({
                        title: 'You have successfully enrolled this course',
                        icon: 'success',
                        timer: 2000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: false,
                      });
                      setenrollStatus('success');
                      
                      
                    }

          
        });
    } catch (error) {
      console.log(error);
    }  
                                                    
       
     };
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img
            src={courseData.featured_img}
            className="img-thumbnail"
            alt={courseData.title}
          />
        </div>
        <div className="col-8">
          <h3>{courseData.title}</h3>
          <p class="fw-bold">Description: {courseData.description}</p>
          <p class="fw-bold">
            Techs:
            {techListData.map((tech, index) => (
              <Link
                to={`/category/${tech.trim()}`}
                className="badge badge-pill text-dark bg-warning mx-2"
              >
                {tech}
              </Link>
            ))}
          </p>
          <p class="fw-bold">
            Course By:{' '}
            <Link to={`/teacher-detail/${teacherData.id}`}>
              {teacherData.full_name}
            </Link>
          </p>
          <p class="fw-bold">Duration: 3 hours 30 minutes </p>
          <p class="fw-bold">
            Total Enrolled Students: {courseData.total_enrolled_students}{' '}
          </p>
          <p class="fw-bold">Rating: 4.5/5 </p>
          {userLoginStatus === 'success' && enrollStatus === 'success' && (
            <p>
              <span>You are enrolled</span>
            </p>
          )}
          {userLoginStatus === 'success' && enrollStatus !== 'success' && (
            <p>
              <button
                className="btn btn-success"
                type="button"
                onClick={(event) => enrollCourse(event)}
              >
                Enroll in the course to watch the video
              </button>
            </p>
          )}

          {userLoginStatus !== 'success' && (
            <p>
              <Link to="/user-login">Please login to enroll</Link>
            </p>
          )}
        </div>
      </div>
      {/*Course videos */}
      {userLoginStatus === 'success' && enrollStatus === 'success' && (
        <div className="card mt-5">
          <div className="card-header">
            <h5>In this Course</h5>
          </div>
          <ul className="list-group list-group-flush">
            {chapterData.map((chapter, index) => (
              <li className="list-group-item">
                {chapter.title}
                <span className="float-end">
                  <button
                    className="btn btn-sm btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#VideoModal1"
                  >
                    <i class="bi-youtube"></i>
                  </button>
                </span>
                {/*Video Modal*/}
                <div
                  className="modal fade"
                  id="VideoModal1"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          {chapter.title}
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <video controls width="1100" height="500">
                          <source src={chapter.video} type="video/webm" />
                          <source src={chapter.video} type="video/mp4" />\
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {userLoginStatus === 'success' && enrollStatus !== 'success' && (
        <div className="card mt-5">
          <div className="card-header">
            <h5>In this Course</h5>
          </div>
          <ul className="list-group list-group-flush">
            {chapterData.map((chapter, index) => (
              <li className="list-group-item">{chapter.title}</li>
            ))}
          </ul>
        </div>
      )}
      {userLoginStatus !== 'success' && (
        <div className="card mt-5">
          <div className="card-header">
            <h5>In this Course</h5>
          </div>
          <ul className="list-group list-group-flush">
            {chapterData.map((chapter, index) => (
              <li className="list-group-item">{chapter.title}</li>
            ))}
          </ul>
        </div>
      )}

      {/*end Video Modal*/}

      <div className="mt-5"></div>
    </div>
  );
}

export default CourseDetail;