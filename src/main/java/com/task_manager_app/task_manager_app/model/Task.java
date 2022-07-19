package com.task_manager_app.task_manager_app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Task data values:
    private int id;
    private String task;
    private Integer checked;

    public Task() {}

    // Getter and setter methods:

    public int getId() { return id; }
    public void setId( int id ) { this.id = id; }

    public String getTask() { return task; }
    public void setTask( String task ) { this.task = task; }

    public Integer getChecked() { return checked; }
    public void setTask( Integer checked ) { this.checked = checked; }
}
