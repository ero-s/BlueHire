package com.appdevf2.bluehire.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.appdevf2.bluehire.model.Student;

@Service
public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudentS();
}
