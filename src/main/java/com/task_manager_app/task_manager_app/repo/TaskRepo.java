package com.task_manager_app.task_manager_app.repo;

import com.task_manager_app.task_manager_app.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepo extends JpaRepository<Task, Integer> {}