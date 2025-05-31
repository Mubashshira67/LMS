from django.urls import path
from . import views

urlpatterns = [
    #teachers
    path('teacher/', views.TeacherList.as_view()),
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()),
    path('teacher-login',views.teacher_login), 
     path('teacher/dashboard/<int:pk>/', views.TeacherDashboardList.as_view()),  
     path('teacher/change-password/<int:teacher_id>/',views.teacher_change_password), 
    #category
    path('category/', views.CategoryList.as_view()),
    #course
    path('course/', views.CourseList.as_view()),
    path('add-course/', views.AddCourse.as_view()),
    #chapter
    path('chapter/', views.ChapterList.as_view()),
    #Specific Course Chapters
    path('course-chapters/<int:course_id>', views.CourseChapterList.as_view()),
    #specific chapter
    path('chapter/<int:pk>', views.ChapterDetailView.as_view()),
    #specific course
    path('course/<int:pk>', views.CourseDetailView.as_view()),
    #Teacher Courses
    path('teacher-courses/<int:teacher_id>', views.TeacherCourseList.as_view()),
     #Course Detail
    path('teacher-course-detail/<int:pk>', views.TeacherCourseDetail.as_view()),


    #student
    path('student/', views.StudentList.as_view()),
    path('student/<int:pk>/', views.StudentDetail.as_view()),
    path('student-login',views.student_login), 
    path('student-enroll-course/', views.StudentEnrollCourseList.as_view()),
    path('fetch-enroll-status/<int:student_id>/<int:course_id>',views.fetch_enroll_status),
    path('fetch-enrolled-students/<int:course_id>',views.EnrolledStudentList.as_view()), 
    path('fetch-all-enrolled-students/<int:teacher_id>',views.EnrolledStudentList.as_view()),  
    path('enrolled-courses/<int:student_id>',views.EnrolledStudentList.as_view()), 
    path('student/change-password/<int:student_id>/',views.student_change_password), 
      

]   