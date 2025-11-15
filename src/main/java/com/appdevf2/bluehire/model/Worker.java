package com.appdevf2.bluehire.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@DiscriminatorValue("WORKER")
public class Worker extends User {
 
    @ElementCollection
    @CollectionTable(name = "worker_skills", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "skill")
    private List<String> skills;

    private double hourlyRate;
    private int completedJobCount;
    private double dailyRate;
    private boolean availabilityStatus;
    private double averageRating;
    private double totalEarnings;

    public Worker() {
        super();
    }

    public Worker(List<String> skills, double hourlyRate) {
        super();
        this.skills = skills;
        this.hourlyRate = hourlyRate;
        this.completedJobCount = 0;
        this.dailyRate = 0;
        this.availabilityStatus = false;
        this.averageRating = 0;
        this.totalEarnings = 0;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public void setHourlyRate(double hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public void setCompletedJobCount(int completedJobCount) {
        this.completedJobCount = completedJobCount;
    }

    public void setDailyRate(double dailyRate) {
        this.dailyRate = dailyRate;
    }

    public void setAvailabilityStatus(boolean availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public void setTotalEarnings(double totalEarnings) {
        this.totalEarnings = totalEarnings;
    }

    public List<String> getSkills() {
        return skills;
    }

    public double getHourlyRate() {
        return hourlyRate;
    }

    public int getCompletedJobCount() {
        return completedJobCount;
    }

    public double getDailyRate() {
        return dailyRate;
    }

    public boolean isAvailabilityStatus() {
        return availabilityStatus;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public double getTotalEarnings() {
        return totalEarnings;
    }
}
