package com.austine.StudentSystem_.service;

import com.austine.StudentSystem_.model.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudentS();
}
