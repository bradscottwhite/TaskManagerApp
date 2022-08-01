package com.task_manager_app.task_manager_app.controller;

import java.util.List;
import java.util.NoSuchElementException;

import com.task_manager_app.task_manager_app.model.Task;
import com.task_manager_app.task_manager_app.service.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

/**
 * Contains all of the rest routes to call the methods that access and manipulate tasks in the db
 * @author Brad White
 * @date 7-2022
 */
@RestController
@RequestMapping("/task")
@CrossOrigin
public class TaskController {
    @Autowired
    private TaskService taskService;

    /**
     * Adds a task to the db
     * @param {Task} task to add
     * @return id of new task
     * @example
     * User calls `.../task/add` with PUT method and json in body
     */
    @PostMapping("/add")
    public int add(
        @RequestBody Task task
    ) {
        taskService.saveTask(task);
        return task.getId();
        //return "New task added";
    }
    
    /**
     * Gets and returns all tasks from db
     * @return all tasks from db
     * @example
     * User calls `.../task/getAll` with GET method
     */
    @GetMapping("/getAll")
    public List<Task> getAllTask() {
        return taskService.getAllTasks();
    }

    /**
     * Gets task by id from db if found
     * @param {int} id
     * @return task data
     * @example
     * User calls `.../task/5` with GET method to retrive task with id 5
     */
    @GetMapping("/{id}")
    public ResponseEntity<Task> get(
        @PathVariable int id
    ) {
        try {
            Task task = taskService.get(id);
            return new ResponseEntity<Task>(task, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Updates task in db by id
     * @param {Task} task - data to update existing task
     * @param {int} id - id of task to update
     * @return successful or unsuccessful Http response
     * @example
     * User calls `.../task/4` with PUT method and json in body to update task number 4
     */
    @PutMapping("/{id}")
    public ResponseEntity<Task> update(
        @RequestBody Task task,
        @PathVariable int id
    ) {
        try {
            taskService.get(id);
            task.setId(id);
            taskService.saveTask(task);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Deletes task in db by id
     * @param {int} id - id of task to delete
     * @return comfirmation string
     * @example
     * User calls `.../task/7` with DELETE method to delete task number 7
     */
    @DeleteMapping("/{id}")
    public String delete(
        @PathVariable int id
    ) {
        taskService.delete(id);
        return "Deleted task with id " + id;
    }
}