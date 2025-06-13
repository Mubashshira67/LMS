import { Link, useParams } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { Route, Routes as Switch } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
const baseUrl = 'http://127.0.0.1:8000/api';

function EditChapter() {
  const [chapterData, setchapterData] = useState({
    course: '',
    title: '',
    description: '',
    prev_video: '',
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
  const { chapter_id } = useParams();
  const submitForm = async (event) => {
    event.preventDefault();
    const _formData = new FormData();
    _formData.append('course', chapterData.course);
    _formData.append('title', chapterData.title);
    _formData.append('description', chapterData.description);
    if (chapterData.video !== '') {
      _formData.append('video', chapterData.video, chapterData.video.name);
    }
    _formData.append('remarks', chapterData.remarks);

    try {
      await axios
        .put(baseUrl + '/chapter/' + chapter_id, _formData, {
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

  useEffect(() => {
    document.title = 'Edit Chapter';
    try {
      axios.get(baseUrl + '/chapter/' + chapter_id).then((res) => {
        console.log(res);
        setchapterData({
          course: res.data.course,
          title: res.data.title,
          description: res.data.description,
          prev_video: res.data.video,
          remarks: res.data.remarks,
          video: '',
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log(chapterData);
  }, [chapterData]);

  return (
    <div className="container mt-5">
      <div className="row">
        <aside className="col-md-3">
          <TeacherSidebar />
        </aside>
        <section className="col-md-9 ">
          <div className="card">
            <h5 className="card-header">Update Chapter</h5>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    value={chapterData.title}
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
                    value={chapterData.description}
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
                  {chapterData.prev_video !== '' && (
                    <video controls width="100%" height="250" className="mt-2">
                      <source src={chapterData.prev_video} type="video/webm" />
                      <source src={chapterData.prev_video} type="video/mp4" />
                      Sorry, your browser doesn't support embedded videos.
                    </video>
                  )}
                </div>

                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Remarks
                  </label>
                  <textarea
                    name="remarks"
                    value={chapterData.remarks}
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

export default EditChapter;
