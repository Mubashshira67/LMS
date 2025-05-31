from rest_framework import serializers
from . import models

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Teacher
        fields=['id','full_name','email','password','qualification','mobile_no','skills','profile_img','teacher_courses','skill_list']
        depth=1

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Student
        fields=['id','full_name','email','password','username','interests','profile_img']
class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Teacher
        fields=['total_teacher_courses','total_teacher_students','total_teacher_chapters']               

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=models.CourseCategory
        fields=['id','title','description']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Course
        fields=['id','category','teacher','title','description','featured_img','techs','course_chapters','tech_list','total_enrolled_students']
        depth=1

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Chapter
        fields=['id','course','title','description','video','remarks']        

class CreateCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Course
        fields=['id','category','teacher','title','description','featured_img','techs']
        
class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.StudentCourseEnrollemnt
        fields=['id','course','student','enrolled_time']  
    
    def __init__(self,*args,**kwargs):
        super(StudentCourseEnrollSerializer, self).__init__(*args,**kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2