import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { Route, Routes as Switch } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';


function EditCourse() {
  const [cats, setCats] = useState([]);
  const [courseData, setCourseData] = useState({
    category: '',
    title: '',
    description: '',
    prev_fimg: '',
    featured_img: '',
    techs: '',
  });
  const handleChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.value,
    });
  };
  const handleFileChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.files[0],
    });
  };
      const { course_id } = useParams();
  const teacherId = localStorage.getItem('teacherId');
  const submitForm = async (event) => {
    event.preventDefault();
    const _formData = new FormData();
    _formData.append('category', courseData.category);
    _formData.append('teacher', teacherId);
    _formData.append('title', courseData.title);
    _formData.append('description', courseData.description);
    if (courseData.featured_img !== '') {
      _formData.append('featured_img', courseData.featured_img, courseData.featured_img.name);
    }
    _formData.append('techs', courseData.techs);

    try {
      await axios
        .put(baseUrl + '/teacher-course-detail/'+course_id, _formData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
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
  useEffect(() => {
    document.title = 'Edit Course';
    try {
      axios.get(baseUrl + '/category').then((res) => {
        setCats(res.data);
      });
    } catch (error) {
      console.log(error);
    }

        try {
          axios.get(baseUrl + '/teacher-course-detail/' + course_id).then((res) => {
            setCourseData({
              category: res.data.category,
              title: res.data.title,
              description: res.data.description,
              prev_fimg: res.data.featured_img,
              featured_img:'',
              techs: res.data.techs,
             
            });
           
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
        <section className="col-md-9 ">
          <div className="card">
            <h5 className="card-header">Edit Course</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="title" className="form-label">
                    Category
                  </label>
                  <select
                    name="category"
                    value={courseData.category}
                    onChange={handleChange}
                    className="form-control"
                  >
                    {cats.map((category, index) => {
                      return (
                        <option key={index} value={category.id}>
                          {category.title}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    value={courseData.title}
                    name="title"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={courseData.description}
                    onChange={handleChange}
                    className="form-control"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="image" class="form-label">
                    Course Image
                  </label>
                  <input
                    name="featured_img"
                    onChange={handleFileChange}
                    className="form-control"
                    type="file"
                    id="formFile"
                  />
                  {courseData.prev_fimg !== '' && (
                    <img
                      src="/{courseData.prev_fimg}"
                      width="100%"
                      height="300"
                      alt={courseData.title}
                    />
                  )}
                </div>

                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Technologies
                  </label>
                  <textarea
                    name="techs"
                    value={courseData.techs}
                    onChange={handleChange}
                    className="form-control"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  onClick={(event) => submitForm(event)}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditCourse;
