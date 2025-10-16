package com.austine.StudentSystem_.repository;

import com.austine.StudentSystem_.model.JobHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobHistoryRepository extends JpaRepository<JobHistory, Long> {

}

