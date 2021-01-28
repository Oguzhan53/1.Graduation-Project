package com.sezgin.oguzhan.graduation.controller;

import com.sezgin.oguzhan.graduation.model.LectureResultDTO;
import com.sezgin.oguzhan.graduation.repository.LectureRepository;
import com.sezgin.oguzhan.graduation.service.LectureService;
import com.sezgin.oguzhan.graduation.service.LecturerService;
import com.sezgin.oguzhan.graduation.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("api/lecturer")
public class LecturerController {

    @Autowired
    private LecturerService lecturerService;

    @Autowired
    private LectureService lectureService;

    @Autowired
    private StudentService studentService;


    @GetMapping("/students")
    @ResponseBody
    public ResponseEntity<?> getStudent(Principal p) throws IllegalAccessException {

        return ResponseEntity.ok(lecturerService.getStudens(p.getName()));
    }

    @GetMapping("/students/lectures/{username}")
    @ResponseBody
    public ResponseEntity<?> getStudentLectures(@PathVariable String username) throws IllegalAccessException {

        return ResponseEntity.ok(studentService.getLectures(username));
    }






    @GetMapping("/students-by-id/{id}")
    @ResponseBody
    public ResponseEntity<?> getStudentById(@PathVariable long id) throws IllegalAccessException {

        return ResponseEntity.ok(lecturerService.getStudensById(id));
    }


    @PostMapping("/confirm/{stuId}/{code}/{decide}")
    @ResponseBody
    public ResponseEntity<?> getStudent(@PathVariable long stuId, @PathVariable String code, @PathVariable int decide)
            throws NoSuchElementException {

        return ResponseEntity.ok(studentService.getWaitingLectures(studentService.setConfirm(stuId, code, decide)));
    }


    @PostMapping("/student/lecture/{username}/{code}")
    @ResponseBody
    public ResponseEntity<?> addLectureToStudent(@PathVariable String username, @PathVariable String code)
            throws NoSuchElementException {

        return ResponseEntity.ok(studentService.addLecture(username, code));
    }


    @PutMapping("/grade/{code}/{grade1}/{grade2}/{grade3}/{number}")
    @ResponseBody
    public ResponseEntity<?> setGrade(@PathVariable String code, @PathVariable int grade1, @PathVariable int grade2,
                                      @PathVariable int grade3, @PathVariable long number)
            throws NoSuchElementException {

        return ResponseEntity.ok(lectureService.setGrades(code, grade1, grade2, grade3, (int) number));
    }

    @PostMapping("/calculate/{code}")
    @ResponseBody
    public ResponseEntity<?> calculate(@PathVariable String code, @RequestBody LectureResultDTO lectureResultDTO)
            throws NoSuchElementException {

        return ResponseEntity.ok(lectureService.calculateResults(lectureResultDTO,code));
    }




    @GetMapping("/waiting/students")
    @ResponseBody
    public ResponseEntity<?> getWaitingStudents(Principal p) throws IllegalAccessException {

        return ResponseEntity.ok(lecturerService.getWaiting(p.getName()));
    }


    @GetMapping("/waiting/lectures/{username}")
    @ResponseBody
    public ResponseEntity<?> getWaitingLecture(@PathVariable String username) throws IllegalAccessException {

        return ResponseEntity.ok(studentService.getWaitingLectures(username));
    }
    @GetMapping("/lecture/page/code/{code}")
    @ResponseBody
    public ResponseEntity<?> getLectureCodePage(@PathVariable String code) throws IllegalAccessException {

        return ResponseEntity.ok(lectureService.findByCodePage(code));
    }


    @GetMapping("/lectures")
    @ResponseBody
    public ResponseEntity<?> getLecture(Principal p) throws IllegalAccessException {

        return ResponseEntity.ok(lecturerService.getLecture(p.getName()));
    }



    @GetMapping("/all/lecture")
    @ResponseBody
    public ResponseEntity<?> getAllLecture(@RequestParam(name = "pageSize", defaultValue = "4") int pageSize,
                                        @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber) {

        return ResponseEntity.ok(lectureService.findActive(pageSize, pageNumber));
    }

    @GetMapping("/lecture/students/{code}")
    @ResponseBody
    public ResponseEntity<?> getLectureStudent(@PathVariable String code) throws IllegalAccessException {

        return ResponseEntity.ok(lectureService.getStudents(code));
    }
}
