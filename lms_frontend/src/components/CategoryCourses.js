import {Link} from 'react-router-dom'
import { Route, Routes as Switch } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const baseUrl = 'http://127.0.0.1:8000/api';
function CategoryCourses(){
   const {category_slug}=useParams();
    const [courseData, setCourseData] = useState([]);
      useEffect(() => {
     try {
       axios.get(baseUrl + '/course/?category='+category_slug).then((res) => {
         setCourseData(res.data);
       });
     } catch (error) {
       console.log(error);
     }
   }, []);

  return (
    <div className="container mt-5">
      {/*All courses */}
      <h3 className="pb-1 mb-4">{category_slug} courses</h3>
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

      {/*End All courses */}

      {/*course pagination */}
      {/* <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
</nav> */}
      {/*end course pagination */}
    </div>
  );
}

export default CategoryCourses;