### 와우



```java
package com.example.myweb.controller;

import com.example.myweb.dto.ProjectPostReq;
import com.example.myweb.entity.Environment;
import com.example.myweb.entity.Project;
import com.example.myweb.repository.EnvironmentRepository;
import com.example.myweb.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ProjectController {
    private final ProjectRepository projectRepository;
    private final EnvironmentRepository environmentRepository;

    @Autowired
    public ProjectController(ProjectRepository projectRepository, EnvironmentRepository environmentRepository) {
        this.projectRepository = projectRepository;
        this.environmentRepository = environmentRepository;
    }


    @PostMapping("/project")
    public void regProject(@RequestBody ProjectPostReq projectPostReq) {
        Project project = new Project(projectPostReq.getTitle(),projectPostReq.getPeriod(),
                projectPostReq.getPersonnel(),projectPostReq.getIntroduce(),projectPostReq.getRole(),
                projectPostReq.getProcess(),projectPostReq.getMainFunction(),projectPostReq.getLearned()
        );
        projectRepository.save(project);
        projectPostReq.getEnvironment().stream().map(environment -> {
            return new Environment(environment, project);
        }).forEach(environmentRepository::save);
    }

    @GetMapping("/api/project/{id}")
    public Project getProject(@PathVariable("id") Long id) {
        return projectRepository.findById(id).orElseThrow(() -> {return new IllegalArgumentException("wow");});
    }
```

#### test 입니다.

![230217_3.png](C:\Users\tnrms\ssafy7\texteditor\230217_3.png)
