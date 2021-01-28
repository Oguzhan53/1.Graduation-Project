package com.sezgin.oguzhan.graduation.controller;

import com.sezgin.oguzhan.graduation.entity.Student;

import com.sezgin.oguzhan.graduation.entity.StudentLecture;
import com.sezgin.oguzhan.graduation.model.StudentDTO;
import com.sezgin.oguzhan.graduation.model.StudentUpdateDTO;
import com.sezgin.oguzhan.graduation.service.LectureService;
import com.sezgin.oguzhan.graduation.service.StudentService;
import javassist.bytecode.DuplicateMemberException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

@RestController
@RequestMapping("api/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private LectureService lectureService;

    //    @GetMapping("/lectures")
    //    @ResponseBody
    //    public ResponseEntity<?> getLectures(Principal p) throws NoSuchElementException {
    //
    //        return ResponseEntity.ok(studentService.getLectures(p.getName()));
    //    }




    @GetMapping("/me")
    @ResponseBody
    public ResponseEntity<?> getStu( Principal p) {

        Student student = studentService.getMe( p.getName());
        return ResponseEntity.ok(student);
    }

    @PutMapping("/student")
    @ResponseBody
    public ResponseEntity<?> saveStu(@RequestBody StudentUpdateDTO studentDTO, Principal p) {

        Student student = studentService.updateInfo(studentDTO, p.getName());
        return ResponseEntity.ok(student);
    }


    @GetMapping("/lectures")
    @ResponseBody
    public ResponseEntity<?> getLectures(Principal p) throws NoSuchElementException {

        return ResponseEntity.ok(studentService.getLectures(p.getName()));
    }


    @GetMapping("/waiting/lectures")
    @ResponseBody
    public ResponseEntity<?> getWaitingLectures(Principal p) throws NoSuchElementException {

        return ResponseEntity.ok(studentService.getWaitingLectures(p.getName()));
    }


    @GetMapping("/all/lecture")
    @ResponseBody
    public ResponseEntity<?> getLecture(@RequestParam(name = "pageSize", defaultValue = "4") int pageSize,
                                        @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber) {

        return ResponseEntity.ok(lectureService.findActive(pageSize, pageNumber));
    }


    @PostMapping("/lecture/{lectureCode}")
    @ResponseBody
    public ResponseEntity<?> addLecture(@PathVariable String lectureCode, Principal p)
            throws NoSuchElementException {

        return ResponseEntity.ok(studentService.addLecture(p.getName(), lectureCode));
    }


    @GetMapping("/announcement")
    @ResponseBody
    public ResponseEntity<?> seeAnnouncement(Principal p)
            throws NoSuchElementException {

        return ResponseEntity.ok(studentService.seeAnnoucement(p.getName()));
    }


    @DeleteMapping("/lecture/{lectureCode}")
    @ResponseBody
    public ResponseEntity<?> deleteLecture(@PathVariable String lectureCode, Principal p)
            throws DuplicateMemberException, NoSuchElementException {

        return ResponseEntity.ok(studentService.removeLecture(p.getName(), lectureCode));
    }


    @GetMapping("/lecture/page/code/{code}")
    @ResponseBody
    public ResponseEntity<?> getLectureCodePage(@PathVariable String code) throws IllegalAccessException {

        return ResponseEntity.ok(lectureService.findByCodePage(code));
    }

    //    @DeleteMapping("/lecture/{studentId}/{lectureId}")
    //    @ResponseBody
    //    public ResponseEntity<?> deleteLecture(@PathVariable long studentId, @PathVariable String lectureId)
    //            throws NoSuchElementException {
    //
    //        return ResponseEntity.ok(studentService.removeLecture(studentId, lectureId));
    //    }
}
