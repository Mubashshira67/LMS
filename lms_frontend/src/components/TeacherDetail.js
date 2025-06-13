import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api';
function TeacherDetail() {
    const [courseData, setcourseData] = useState([]);
    const [teacherData, setteacherData] = useState([]);
    const [skillList, setskillList] = useState([]);
    let { teacher_id } = useParams();
        useEffect(() => {
          document.title = 'Teacher-Details';
          try {
            axios.get(baseUrl + '/teacher/' + teacher_id).then((res) => {
              setcourseData(res.data.teacher_courses);
              
              setteacherData(res.data);
              setskillList(res.data.skill_list);
            });
          } catch (error) {
            console.log(error);
          }
        }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <img src="/dp.jpg" className="img-thumbnail" alt="Teacher Image" />
        </div>
        <div className="col-8">
          <h3>{teacherData.full_name}</h3>
          <p>{teacherData.detail}</p>
          <p class="fw-bold">
            Skills:{' '}
            {skillList.map((skill, index) => (
              <Link
                to={`/teacher-skill-courses/${skill.trim()}/${teacherData.id}`}
                className="badge badge-pill text-dark bg-warning mx-2"
              >
                {skill}
              </Link>
            ))}
          </p>
          <p class="fw-bold">
            Recent Course: <Link to="/category/php">php</Link>
          </p>
          <p class="fw-bold">Rating: 4.5/5 </p>
        </div>
      </div>
      {/*Course videos */}
      <div className="card mt-5">
        <div className="card-header">
          <h5>Course List</h5>
        </div>
        <div className="list-group list-group-flush">
          {courseData.map((course, index) => (
            <Link
              to={`/detail/${course.id}`}
              className="list-group-item list-group-item-action"
            >
              {course.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherDetail;
