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

@RestController
@RequestMapping("/task")
@CrossOrigin
public class TaskController {
    @Autowired
    private TaskService taskService;

    // Add task:
    @PostMapping("/add")
    public String add(@RequestBody Task task) {
        taskService.saveTask(task);
        return "New task added";
    }
    
    // Get all tasks:
    @GetMapping("/getAll")
    public List<Task> getAllTask() {
        return taskService.getAllTasks();
    }

    // Get task by id:
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

    // Update task by id:
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

    // Delete task by id:
    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) {
        taskService.delete(id);
        return "Deleted task with id " + id;
    }
}