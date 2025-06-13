import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { Route, Routes as Switch } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/api';


function AddCourse() {
  const [cats, setCats] = useState([]);
  const [courseData, setCourseData] = useState({
    category: '',    
    title: '',
    description: '',
    f_img: '',
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

  const teacherId = localStorage.getItem('teacherId');
  const submitForm = async (event) => {
    event.preventDefault();
    const _formData = new FormData();
    _formData.append('category', courseData.category);
    _formData.append('teacher', teacherId);
    _formData.append('title', courseData.title);
    _formData.append('description', courseData.description);
    _formData.append('featured_img', courseData.f_img, courseData.f_img.name);
    _formData.append('techs', courseData.techs);

    try {
      await axios
        .post(baseUrl + '/add-course/', _formData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then((res) => {
          console.log(res.data);
          
        window.location.href = '/add-course';
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    document.title = 'Add Course';
    try {
      axios.get(baseUrl + '/category').then((res) => {
        setCats(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(cats);
  return (
    <div className="container mt-5">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9 ">
          <div className="card">
            <h5 className="card-header">Add Course</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="title" className="form-label">
                    Category
                  </label>
                  <select
                    name="category"
                    onChange={handleChange}
                    className="form-control"
                  >
                    {cats.map((category, index) => {
                      return <option key={index} value={category.id}>{category.title}</option>;
                    })}
                  </select>
                </div>

                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
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
                    onChange={handleChange}
                    className="form-control"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    Course Image
                  </label>
                  <input
                    name="f_img"
                    onChange={handleFileChange}
                    class="form-control"
                    type="file"
                    id="formFile"
                  />
                </div>

                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Technologies
                  </label>
                  <textarea
                    name="techs"
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

export default AddCourse;
