package com.appdevf2.bluehire.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appdevf2.bluehire.model.SystemLog;

@Repository
public interface SystemLogRepository extends JpaRepository<SystemLog, Long> {

}

