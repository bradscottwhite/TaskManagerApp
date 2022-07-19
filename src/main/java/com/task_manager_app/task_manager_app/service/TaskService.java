package com.task_manager_app.task_manager_app.service;

import com.task_manager_app.task_manager_app.model.Task;
import com.task_manager_app.task_manager_app.repo.TaskRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    TaskRepo taskRepo;

    // Create a task:
    public Task saveTask(Task task) {
        return taskRepo.save(task);
    }
    
    // Read a task:
    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    // Get task by id:
    public Task get(int id) {
        return taskRepo.findById(id).get();
    }

    // Delete task:
    public void delete(int id) {
        taskRepo.deleteById(id);
    }
}