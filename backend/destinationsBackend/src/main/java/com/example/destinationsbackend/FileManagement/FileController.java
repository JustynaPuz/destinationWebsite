package com.example.destinationsbackend.FileManagement;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FileController {

    @Value("${upload.dir}")
    private String uploadDir;

    @PostMapping("/filePlaceUpload")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("fileName") String fileName) {
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();

        try {
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Use the provided file name
            Path filePath = uploadPath.resolve(fileName);
            file.transferTo(filePath.toFile());

            // Return only the file name
            return ResponseEntity.ok().body(Map.of("fileName", fileName));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload file");
        }
    }
}