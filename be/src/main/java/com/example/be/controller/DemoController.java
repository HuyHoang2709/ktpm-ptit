package com.example.be.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DemoController {

    @GetMapping(value = "/test")
    public ResponseEntity<Map<String, Object>> test() {
        Map<String, Object> map = new HashMap<>();
        map.put("message", "Server is running at port 8080");
        return ResponseEntity.ok(map);
    }
}
