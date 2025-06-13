import Header from './Header';
import Home from './Home';
import About from './About';
import Footer from './Footer';
import CourseDetail from './CourseDetail';
import TeacherDetail from './TeacherDetail';
import { Route,Routes as Switch } from 'react-router-dom';


//for users
import Register from './User/Register';
import Login from './User/Login';
import Dashboard from './User/Dashboard';
import MyCourses from './User/MyCourses';
import FavouriteCourses from './User/FavouriteCourses';
import RecommendedCourses from './User/RecommendedCourses';
import ProfileSettings from './User/ProfileSettings';
import ChangePassword from './User/ChangePassword';

//for teachers

import TeacherLogin from './Teacher/TeacherLogin';
import TeacherRegister from './Teacher/TeacherRegister';
import TeacherDashboard from './Teacher/TeacherDashboard';
import TeacherCourses from './Teacher/TeacherCourses';
import AddCourse from './Teacher/AddCourse';
import AddChapter from './Teacher/AddChapter';
import AllChapters from './Teacher/CourseChapters';
import EditChapter from './Teacher/EditChapter';
import TeacherSkillCourses from './TeacherSkillCourses';
import MyStudents from './Teacher/MyStudents';
import TeacherProfileSettings from './Teacher/TeacherProfileSettings';
import TeacherChangePassword from './Teacher/TeacherChangePassword';
import TeacherLogout from './Teacher/TeacherLogout';

//list pages
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import PopularTeachers from './PopularTeachers';
import CategoryCourses from './CategoryCourses';
import EditCourse from './Teacher/EditCourse';
import StudentLogout from './User/StudentLogout';
import EnrolledStudents from './Teacher/EnrolledStudents';








function Main(){
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:course_id" element={<CourseDetail />} />
        <Route path="/user-login" element={<Login />} />
        <Route path="/user-logout" element={<StudentLogout />} />
        <Route path="/user-register" element={<Register />} />
        <Route path="/user-dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/favourite-courses" element={<FavouriteCourses />} />
        <Route path="/recommended-courses" element={<RecommendedCourses />} />
        <Route path="/teacher-profile-settings" element={<TeacherProfileSettings />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-logout" element={<TeacherLogout />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-courses" element={<TeacherCourses />} />
        <Route
          path="/enrolled-students/:course_id"
          element={<EnrolledStudents />}
        />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/add-chapter/:course_id" element={<AddChapter />} />
        <Route path="/my-students" element={<MyStudents />} />
        <Route
          path="/teacher-profile-settings"
          element={<TeacherProfileSettings />}
        />
        <Route
          path="/teacher-change-password"
          element={<TeacherChangePassword />}
        />
        <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/all-chapters/:course_id" element={<AllChapters />} />
        <Route path="/popular-courses" element={<PopularCourses />} />
        <Route path="/popular-teachers" element={<PopularTeachers />} />
        <Route path="/category/:category_slug" element={<CategoryCourses />} />
        <Route path="/edit-chapter/:chapter_id" element={<EditChapter />} />
        <Route path="/edit-course/:course_id" element={<EditCourse />} />
        <Route
          path="/teacher-skill-courses/:skill_name/:teacher_id"
          element={<TeacherSkillCourses />}
        />
      </Switch>
      <Footer />
    </div>
  );
}

export default Main;