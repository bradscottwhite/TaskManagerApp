package com.task_manager_app.task_manager_app.service;

import com.task_manager_app.task_manager_app.model.Task;
import com.task_manager_app.task_manager_app.repo.TaskRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * These are the service methods used to access and manipulate tasks in the db
 * @author Brad White
 * @date 7-2022
 */
@Service
public class TaskService {
    @Autowired
    TaskRepo taskRepo;

    /**
     * Saves/creates a task
     * @param {Task} task - task to create/save
     * @return this task
     */
    public Task saveTask(Task task) {
        return taskRepo.save(task);
    }
    
    /**
     * Gets and returns all tasks
     * @return all tasks from db
     */
    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    /**
     * Gets and returns a task by id
     * @param {int} id - id of task to return
     * @return all tasks from db
     */
    public Task get(int id) {
        return taskRepo.findById(id).get();
    }

    /**
     * Deletes task from db by id
     * @param {int} id - id of task to delete
     * @return nothing
     */
    public void delete(int id) {
        taskRepo.deleteById(id);
    }
}