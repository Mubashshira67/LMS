import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { Route, Routes as Switch } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
const baseUrl = 'http://127.0.0.1:8000/api';

function AddChapter() {
  const [chapterData, setchapterData] = useState({
    title: '',
    description: '',
    video: '',
    remarks: '',
  });
  const handleChange = (event) => {
    setchapterData({
      ...chapterData,
      [event.target.name]: event.target.value,
    });
  };
  const handleFileChange = (event) => {
    setchapterData({
      ...chapterData,
      [event.target.name]: event.target.files[0],
    });
  };
  const { course_id } = useParams();
  const submitForm = async (event) => {
    event.preventDefault();
    const _formData = new FormData(); 
    _formData.append('course', course_id);
    _formData.append('title', chapterData.title);
    _formData.append('description', chapterData.description);
    _formData.append('video', chapterData.video, chapterData.video.name);
    _formData.append('remarks', chapterData.remarks);

    try {
      await axios
        .post(baseUrl + '/chapter/', _formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data);
          if(res.status==200||res.status==201)
          {
            Swal.fire({
              title:'Data has been added',
              icon:'success',
              timer:2000,
              position:'tope-right',
              timerProgressBar:true,
              showConfirmButton: false

            });
            window.location.reload();
          }

          
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    document.title = 'Add Chapter';
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9 ">
          <div className="card">
            <h5 className="card-header">Add Chapter</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    onChange={handleChange}
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    onChange={handleChange}
                    className="form-control"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    Video
                  </label>
                  <input
                    name="video"
                    id="video"
                    onChange={handleFileChange}
                    class="form-control"
                    type="file"
                  />
                </div>

                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Remarks
                  </label>
                  <textarea
                    name="remarks"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="This video is based on basic introduction"
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

export default AddChapter;
