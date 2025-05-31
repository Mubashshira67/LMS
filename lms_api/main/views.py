from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from .serializers import TeacherSerializer ,CategorySerializer,CourseSerializer,ChapterSerializer,CreateCourseSerializer,StudentSerializer,StudentCourseEnrollSerializer,TeacherDashboardSerializer
 
from . import models


class TeacherList(generics.ListCreateAPIView):
    queryset=models.Teacher.objects.all()
    serializer_class=TeacherSerializer
    #permission_classes=[permissions.IsAuthenticated]

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Teacher.objects.all()
    serializer_class=TeacherSerializer
    #permission_classes=[permissions.IsAuthenticated]
class TeacherDashboardList(generics.RetrieveAPIView):
    queryset=models.Teacher.objects.all()
    serializer_class=TeacherDashboardSerializer    

class StudentList(generics.ListCreateAPIView):
    queryset=models.Student.objects.all()
    serializer_class=StudentSerializer
    #permission_classes=[permissions.IsAuthenticated]

class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Student.objects.all()
    serializer_class=StudentSerializer   

@csrf_exempt 
def teacher_login(request):
    email= request.POST['email']
    password=request.POST['password']
    try:
        teacherData = models.Teacher.objects.get(email=email,password=password)
    except models.Teacher.DoesNotExist:
        teacherData=None  
    if teacherData:
        return JsonResponse({'bool':True,'teacher_id':teacherData.id})
    else:
        return JsonResponse({'bool':False})
    
class CategoryList(generics.ListCreateAPIView):
    queryset=models.CourseCategory.objects.all()
    serializer_class=CategorySerializer

    #permission_classes=[permissions.IsAuthenticated]  

class CourseList(generics.ListCreateAPIView):
    queryset=models.Course.objects.all()
    # queryset=models.CourseCategory.objects.all()
    # queryset=models.Teacher.objects.all()
    serializer_class= CourseSerializer

    def get_queryset(self):
        qs=super().get_queryset()
        if 'result' in self.request.GET:
            limit=int(self.request.GET['result'])
            qs=models.Course.objects.all().order_by('-id')[:limit]
        if 'category' in self.request.GET:
            category=self.request.GET['category']
            qs=models.Course.objects.filter(techs__icontains=category)  
        
        if 'skill_name' in self.request.GET:
            skill_name=self.request.GET['skill_name']
            qs=models.Course.objects.filter(techs__icontains=skill_name)                        
        return qs  
        


class AddCourse(generics.ListCreateAPIView):
    queryset=models.Course.objects.all()
    # queryset=models.CourseCategory.objects.all()
    # queryset=models.Teacher.objects.all()
    serializer_class= CreateCourseSerializer

    def get_queryset(self):
        qs=super().get_queryset()
        if 'result' in self.request.GET:
            limit=int(self.request.GET['result'])
            qs=models.Course.objects.all().order_by('-id')[:limit]
        return qs    


class TeacherCourseList(generics.ListAPIView):
    serializer_class= CourseSerializer

    def get_queryset(self):
        teacher_id=self.kwargs['teacher_id']
        teacher=models.Teacher.objects.get(pk=teacher_id)
        return models.Course.objects.filter(teacher=teacher)

class ChapterList(generics.ListCreateAPIView):
    queryset=models.Chapter.objects.all()
    serializer_class=ChapterSerializer    

class CourseChapterList(generics.ListAPIView):
    serializer_class= ChapterSerializer

    def get_queryset(self):
        course_id=self.kwargs['course_id']
        course=models.Course.objects.get(pk=course_id)
        return models.Chapter.objects.filter(course=course)

class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView ):
    queryset=models.Chapter.objects.all()
    serializer_class=ChapterSerializer
    print(queryset)

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView ):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer    

class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Course.objects.all()
    serializer_class=CourseSerializer


@csrf_exempt 
def student_login(request):
    email= request.POST['email']
    password=request.POST['password']
    try:
        studentData = models.Student.objects.get(email=email,password=password)
    except models.Student.DoesNotExist:
        studentData=None  
    if studentData:
        return JsonResponse({'bool':True,'student_id':studentData.id})
    else:
        return JsonResponse({'bool':False})    
    


class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset=models.StudentCourseEnrollemnt.objects.all()
    serializer_class=StudentCourseEnrollSerializer    

def fetch_enroll_status(request,student_id,course_id):
    
    student=models.Student.objects.filter(id=student_id).first()
    course=models.Course.objects.filter(id=course_id).first()
    enrollStatus=models.StudentCourseEnrollemnt.objects.filter(course=course,student=student).count()

    if enrollStatus:
        return JsonResponse({'bool':True,})
    else:
        return JsonResponse({'bool':False})  
    


class EnrolledStudentList(generics.ListAPIView):
    queryset=models.StudentCourseEnrollemnt.objects.all()
    serializer_class=StudentCourseEnrollSerializer
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id=self.kwargs['course_id']
            course=models.Course.objects.get(pk=course_id)
            return models.StudentCourseEnrollemnt.objects.filter(course=course)
        elif 'teacher_id' in self.kwargs:
            teacher_id=self.kwargs['teacher_id']
            teacher=models.Teacher.objects.get(pk=teacher_id)
            return models.StudentCourseEnrollemnt.objects.filter(course__teacher=teacher).distinct()  
        elif 'student_id' in self.kwargs:
            student_id=self.kwargs['student_id']
            student=models.Student.objects.get(pk=student_id)
            return models.StudentCourseEnrollemnt.objects.filter(student=student).distinct()         

        
 
@csrf_exempt 
def teacher_change_password(request,teacher_id):
    password=request.POST['password']
    try:
        teacherData = models.Teacher.objects.get(id=teacher_id)
    except models.Teacher.DoesNotExist:
        teacherData=None  
    if teacherData:
        models.Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    



@csrf_exempt 
def student_change_password(request,student_id):
    password=request.POST['password']
    try:
        studentData = models.Student.objects.get(id=student_id)
    except models.Student.DoesNotExist:
       studentData=None  
    if studentData:
        models.Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})    