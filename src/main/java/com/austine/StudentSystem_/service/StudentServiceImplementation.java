package com.austine.StudentSystem_.service;

import com.austine.StudentSystem_.model.Student;
import com.austine.StudentSystem_.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImplementation implements StudentService {

    @Autowired
    private StudentRepository studentRepository;
    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudentS() {
        return studentRepository.findAll();
    }
}
