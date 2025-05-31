from django.db import models
from django.core import serializers

# Teacher Model
class Teacher(models.Model):
    full_name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    password=models.CharField(max_length=100,blank=True,null=True)
    qualification=models.CharField(max_length=200)
    mobile_no=models.CharField(max_length=20)
    skills=models.TextField()
    profile_img=models.ImageField(upload_to='teacher-profile_imgs/',null=True)
    class Meta:
        verbose_name_plural="1.Teachers"    
    def skill_list(self):
        skill_list=self.skills.split(',')
        return skill_list
    def total_teacher_courses(self):
        total_courses=Course.objects.filter(teacher=self).count()
        return total_courses
    
    def total_teacher_chapters(self):
        total_chapters=Chapter.objects.filter(course__teacher=self).count()
        return total_chapters
    
    def total_teacher_students(self):
        total_students=StudentCourseEnrollemnt.objects.filter(course__teacher=self).count()
        return total_students    
# Course Model
class CourseCategory(models.Model):
    title=models.CharField(max_length=150)
    description=models.TextField()
    class Meta:
        verbose_name_plural="2.CourseCategories"    
    def __str__(self):
        return self.title
class Course(models.Model):
    category=models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,related_name='teacher_courses')
    title=models.CharField(max_length=150)
    description=models.TextField()
    featured_img=models.ImageField(upload_to='course_imgs/',null=True)
    techs=models.TextField(null=True)
    class Meta:
        verbose_name_plural="3.Courses"
    
    def __str__(self):
        return self.title        

    # def related_videos(self):
    #     related_videos=Course.objects.filter(techs__icontains=self.techs)
    #     return serializers.serialize('json',related_videos)    
    
    def tech_list(self):
        tech_list=self.techs.split(',')
        return tech_list
    
    def total_enrolled_students(self):
        total_enrolled_students=StudentCourseEnrollemnt.objects.filter(course=self).count()
        return total_enrolled_students
    

class Chapter(models.Model):
    course=models.ForeignKey(Course,on_delete=models.CASCADE,related_name='course_chapters')
    title=models.CharField(max_length=150)
    description=models.TextField()
    video=models.FileField(upload_to="chapter_videos/",null= True)
    remarks=models.TextField(null=True)
    class Meta:
        verbose_name_plural="4.Chapters"       

class Student(models.Model):
    full_name=models.CharField(max_length=100)
    email=models.CharField(max_length=100)
    password=models.CharField(max_length=100,blank=True,null=True)
    username=models.CharField(max_length=200)
    profile_img=models.ImageField(upload_to='student-profile_imgs/',null=True)
    interests=models.TextField()
    class Meta:
        verbose_name_plural="5.Students"

    def __str__(self):
        return self.full_name        


#student course enrollment

class StudentCourseEnrollemnt(models.Model):
    course=models.ForeignKey(Course,on_delete=models.CASCADE,related_name='enrolled_courses')
    student=models.ForeignKey(Student,on_delete=models.CASCADE,related_name='enrolled_student')
    enrolled_time=models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural="6.Enrolled Courses"

    def __str__(self):
        return f"{self.course}-{self.student}"