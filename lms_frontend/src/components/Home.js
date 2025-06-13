import {Link} from 'react-router-dom'
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import PopularTeachers from './PopularTeachers';
import axios from 'axios';
import { useState, useEffect } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api';
function Home(){

 const [courseData, setCourseData] = useState([]);

 // fetch courses when page loads
 useEffect(() => {
   document.title = 'CSacademy';
   try {
     axios.get(baseUrl + '/course/?result=4').then((res) => {
       setCourseData(res.data);
     });
   } catch (error) {
     console.log(error);
   }
 }, []);
 console.log(courseData);
  return (
    <div className="container mt-4">
      {/*latest courses*/}
      <h3 className="pb-1 mb-4">
        Latest Courses
        <Link to="all-courses" class="float-end">
          See All
        </Link>
      </h3>
      <div className="row mb-4">
        {courseData &&
          courseData.map((course, index) => (
            <div className="col-md-3 mb-4">
              <div className="card">
                <Link to={`/detail/${course.id}`}>
                  <img
                    src={course.featured_img}
                    className="card-img-top"
                    height="250"
                    alt="{course.title}"
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/detail/${course.id}`}>{course.title}</Link>
                  </h5>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* end latest courses*/}
      {/*popular courses*/}
      <h3 className="pb-1 mb-4 mt-5">Popular Courses</h3>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img
                src="cpp.png"
                height="250"
                className="card-img-top"
                alt="..."
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Cpp</a>
              </h5>
            </div>
            <div className="card-footer">
              <div className="card-title">
                Rating: 4.5/5
                <div className="float-end">Views: 1234</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img
                src="django.png"
                height="250"
                className="card-img-top"
                alt="..."
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Django</a>
              </h5>
            </div>
            <div className="card-footer">
              <div className="card-title">
                Rating: 4.5/5
                <div className="float-end">Views: 1234</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img
                src="java.png"
                height="250"
                className="card-img-top"
                alt="..."
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">Java</a>
              </h5>
            </div>
            <div className="card-footer">
              <div className="card-title">
                Rating: 4.5/5
                <div className="float-end">Views: 1234</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <a href="#">
              <img
                src="logo192.png"
                height="250"
                className="card-img-top"
                alt="..."
              />
            </a>
            <div className="card-body">
              <h5 className="card-title">
                <a href="#">React</a>
              </h5>
            </div>
            <div className="card-footer">
              <div className="card-title">
                Rating: 4.5/5
                <div className="float-end">Views: 1234</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end popular courses*/}
      {/*popular teachers*/}
      <h3 className="pb-1 mb-4 mt-5">Popular Teachers</h3>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <Link to="/teacher-detail/1">
              <img
                src="a.jpg"
                height="250"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1">teacher1</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <Link to="/teacher-detail/1">
              <img
                src="b.jpg"
                height="250"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1">teacher2</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <Link to="/teacher-detail/1">
              <img
                src="c.png"
                height="250"
                className="card-img-top"
                alt="..."
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">
                <Link to="/teacher-detail/1">teacher3</Link>
              </h5>
            </div>
            <div className="card-footer">
              <div className="title">
                <span>Rating: 4.5/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end popular teachers*/}
      {/*student testimonial*/}
      <h3 className="pb-1 mb-4 mt-5">Student Testimonial</h3>
      <div
        id="carouselExampleIndicators"
        class="carousel slide bg-dark text-white py-5"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <figure class="text-center">
              <blockquote class="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption class="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
          <div className="carousel-item">
            <figure class="text-center">
              <blockquote class="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption class="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
          <div className="carousel-item">
            <figure class="text-center">
              <blockquote class="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption class="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* end student testimonial*/}
    </div>
  );
}

export default Home;