package com.appdevf2.bluehire.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class JobHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobID;

    private LocalDate completionDate;

    private double earnings;

    public JobHistory() {
        super();
    }

    public JobHistory(LocalDate completionDate, double earnings) {
        super();
        this.completionDate = completionDate;
        this.earnings = earnings;
    }

    public Long getJobID() {
        return jobID;
    }

    public LocalDate getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(LocalDate completionDate) {
        this.completionDate = completionDate;
    }

    public double getEarnings() {
        return earnings;
    }

    public void setEarnings(double earnings) {
        this.earnings = earnings;
    }
}
