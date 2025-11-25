package com.appdevf2.bluehire.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "worker")
public class Worker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int workerID;

    // Reference to the User table
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ElementCollection
    @CollectionTable(name = "worker_skills", joinColumns = @JoinColumn(name = "worker_id"))
    @Column(name = "skill")
    private List<String> skills;

    // ---------------- Added Attribute ----------------
    @ElementCollection
    @CollectionTable(name = "worker_coverage_areas", joinColumns = @JoinColumn(name = "worker_id"))
    @Column(name = "coverage_area")
    private List<String> coverage_areas;
    // --------------------------------------------------

    private double hourlyRate;
    private int completedJobCount;
    private double dailyRate;
    private boolean availabilityStatus;
    private double averageRating;
    private double totalEarnings;

    public Worker() {}

    public Worker(User user, List<String> skills, double hourlyRate) {
        this.user = user;
        this.skills = skills;
        this.hourlyRate = hourlyRate;
        this.completedJobCount = 0;
        this.dailyRate = 0;
        this.availabilityStatus = false;
        this.averageRating = 0;
        this.totalEarnings = 0;
    }

    // Getters and setters
    public int getWorkerID() {
        return workerID;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    // ----- Getter & Setter for coverage_areas -----
    public List<String> getCoverage_areas() {
        return coverage_areas;
    }

    public void setCoverage_areas(List<String> coverage_areas) {
        this.coverage_areas = coverage_areas;
    }
    // ----------------------------------------------

    public double getHourlyRate() {
        return hourlyRate;
    }

    public void setHourlyRate(double hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public int getCompletedJobCount() {
        return completedJobCount;
    }

    public void setCompletedJobCount(int completedJobCount) {
        this.completedJobCount = completedJobCount;
    }

    public double getDailyRate() {
        return dailyRate;
    }

    public void setDailyRate(double dailyRate) {
        this.dailyRate = dailyRate;
    }

    public boolean isAvailabilityStatus() {
        return availabilityStatus;
    }

    public void setAvailabilityStatus(boolean availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public double getTotalEarnings() {
        return totalEarnings;
    }

    public void setTotalEarnings(double totalEarnings) {
        this.totalEarnings = totalEarnings;
    }
}
