package com.sezgin.oguzhan.graduation.controller;

import com.sezgin.oguzhan.graduation.entity.Admin;
import com.sezgin.oguzhan.graduation.entity.Lecture;
import com.sezgin.oguzhan.graduation.entity.Lecturer;
import com.sezgin.oguzhan.graduation.entity.Student;
import com.sezgin.oguzhan.graduation.model.*;
import com.sezgin.oguzhan.graduation.service.AdminService;
import com.sezgin.oguzhan.graduation.service.LectureService;
import com.sezgin.oguzhan.graduation.service.LecturerService;
import com.sezgin.oguzhan.graduation.service.StudentService;
import javassist.bytecode.DuplicateMemberException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("api/admin")
public class AdminController {

    private LecturerService lecturerService;

    private StudentService studentService;

    private AdminService adminService;

    private LectureService lectureService;


    @Autowired
    public AdminController(AdminService adminService, LecturerService lecturerService,
                           StudentService studentService, LectureService lectureService) {

        this.lecturerService = lecturerService;
        this.studentService = studentService;
        this.lectureService = lectureService;
        this.adminService = adminService;
    }


    @PostMapping("/announcement/{id}")
    @ResponseBody
    public ResponseEntity<?> addannouncement(@PathVariable long id,
                                             @RequestBody @Valid AnnouncementDTO announcementDTO) {

        return ResponseEntity.ok(adminService.addAnnouncement(announcementDTO, id));
    }


    @PostMapping("/announcement")
    @ResponseBody
    public ResponseEntity<?> addAnnouncementtoAll(@RequestBody @Valid AnnouncementDTO announcementDTO) {

        return ResponseEntity.ok(adminService.addAnnouncementToAll(announcementDTO));
    }


    @PostMapping("")
    @ResponseBody
    public ResponseEntity<?> save(@RequestBody @Valid UserDTO adminDTO) {

        Admin admin = adminService.saveAdmin(adminDTO);
        return ResponseEntity.ok(admin);
    }


    @PostMapping("/lecturer")
    @ResponseBody
    public ResponseEntity<?> saveLec(@RequestBody @Valid LecturerDTO lecturerDTO) {

        Lecturer lecturer = lecturerService.save(lecturerDTO);
        return ResponseEntity.ok(lecturer);
    }


    @GetMapping("/lecturer")
    @ResponseBody
    public ResponseEntity<?> getLec(@RequestParam(name = "pageSize", defaultValue = "6") int pageSize,
                                    @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber) {

        return ResponseEntity.ok(lecturerService.findActive(pageSize, pageNumber));
    }


    @GetMapping("/lecturer/{id}")
    @ResponseBody
    public ResponseEntity<?> getLec(@PathVariable long id) throws IllegalAccessException {

        Optional<Lecturer> optionalLecturer = lecturerService.findById(id);
        return ResponseEntity.ok(optionalLecturer);
    }


    @GetMapping("/lecturer/page/{id}")
    @ResponseBody
    public ResponseEntity<?> getLecPage(@PathVariable long id) throws IllegalAccessException {

        return ResponseEntity.ok(lecturerService.findByIdPage(id));
    }


    @GetMapping("/lecturer/name/{name}")
    @ResponseBody
    public ResponseEntity<?> getLecPage(@PathVariable String name,
                                        @RequestParam(name = "pageSize", defaultValue = "6") int pageSize,
                                        @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber)
            throws IllegalAccessException {

        return ResponseEntity.ok(lecturerService.findByNamePage(name, pageSize, pageNumber));
    }


    @GetMapping("/lecturer/department/{department}")
    @ResponseBody
    public ResponseEntity<?> getLecDepartment(@PathVariable String department,
                                              @RequestParam(name = "pageSize", defaultValue = "6") int pageSize,
                                              @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber)
            throws IllegalAccessException {

        return ResponseEntity.ok(lecturerService.getByDepartment(department, pageSize, pageNumber));
    }


    @DeleteMapping("/lecturer/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteLec(@PathVariable long id) throws IllegalAccessException {

        Lecturer lecturer = lecturerService.delete(id);
        return ResponseEntity.ok(lecturerService.findActive(4, 0));
    }


    @PostMapping("/assign/lecturer/{id}/{lecCode}")
    @ResponseBody
    public ResponseEntity<?> assignLecturer(@PathVariable Long id, @PathVariable String lecCode)
            throws DuplicateMemberException, IllegalAccessException {

        return ResponseEntity.ok(lectureService.assignLecturer(id, lecCode));
    }


    @DeleteMapping("/assign/lecturer/{id}/{lecCode}")
    @ResponseBody
    public ResponseEntity<?> removeAssignment(@PathVariable Long id, @PathVariable String lecCode)
            throws DuplicateMemberException, IllegalAccessException {

        return ResponseEntity.ok(lectureService.removeLecturer(id, lecCode));
    }


    @PostMapping("/advisor/{lectId}/{stuId}")
    @ResponseBody
    public ResponseEntity<?> addAdvisor(@PathVariable long lectId,
                                        @PathVariable long stuId) throws IllegalAccessException {

        return ResponseEntity.ok(studentService.setAdvisor(lectId, stuId));
    }


    @DeleteMapping("/advisor/{id}")
    @ResponseBody
    public ResponseEntity<?> removeAdvisor(@PathVariable long id) throws IllegalAccessException {

        return ResponseEntity.ok(studentService.removeAdvisor(id));
    }


    @PostMapping("/student")
    @ResponseBody
    public ResponseEntity<?> saveStu(@RequestBody @Valid StudentDTO studentDTO) {

        Student student = studentService.save(studentDTO);
        return ResponseEntity.ok(student);
    }


    @PostMapping("/student/boot/{id}")
    @ResponseBody
    public ResponseEntity<?> saveStuWithBoot(@PathVariable long id) {

        studentService.saveBoot(id);
        return ResponseEntity.ok(null);
    }


    @GetMapping("/student")
    @ResponseBody
    public ResponseEntity<?> getStu(@RequestParam(name = "pageSize", defaultValue = "6") int pageSize,
                                    @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber) {

        return ResponseEntity.ok(studentService.findAll(pageSize, pageNumber));
    }


    @GetMapping("/null-advisor-student")
    @ResponseBody
    public ResponseEntity<?> getNullAddStu(@RequestParam(name = "pageSize", defaultValue = "6") int pageSize,
                                           @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber) {

        return ResponseEntity.ok(studentService.getNullAdvisor(pageSize, pageNumber));
    }


    @GetMapping("/student/{id}")
    @ResponseBody
    public ResponseEntity<?> getStu(@PathVariable long id) throws IllegalAccessException {

        Optional<Student> optionalStudent = studentService.findById(id);
        return ResponseEntity.ok(optionalStudent);
    }


    @GetMapping("/student/page/{id}")
    @ResponseBody
    public ResponseEntity<?> getStuPage(@PathVariable long id) throws IllegalAccessException {

        return ResponseEntity.ok(studentService.findByIdPageable(id));
    }


    @GetMapping("/student/number/{number}")
    @ResponseBody
    public ResponseEntity<?> getStuNum(@PathVariable long number) throws IllegalAccessException {

        return ResponseEntity.ok(studentService.findByNumber(number));
    }


    @DeleteMapping("/student/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteStu(@PathVariable long id) throws IllegalAccessException {

        studentService.delete(id);
        return ResponseEntity.ok(studentService.findAll(4, 0));
    }


    @GetMapping("/lecture")
    @ResponseBody
    public ResponseEntity<?> getLecture(@RequestParam(name = "pageSize", defaultValue = "6") int pageSize,
                                        @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber) {

        return ResponseEntity.ok(lectureService.findActive(pageSize, pageNumber));
    }


    @GetMapping("/lecture/{id}")
    @ResponseBody
    public ResponseEntity<?> getLecture(@PathVariable long id) throws IllegalAccessException {

        Optional<Lecture> optionalLecture = lectureService.findById(id);
        return ResponseEntity.ok(optionalLecture);
    }


    @GetMapping("/lecture/page/{id}")
    @ResponseBody
    public ResponseEntity<?> getLecturePage(@PathVariable long id) throws IllegalAccessException {

        return ResponseEntity.ok(lectureService.findByIdPage(id));
    }


    @GetMapping("/lecture/lecturer/null")
    @ResponseBody
    public ResponseEntity<?> getLectureByLecture(@RequestParam(name = "pageSize", defaultValue = "6") int pageSize,
                                                 @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber)
            throws IllegalAccessException {

        return ResponseEntity.ok(lectureService.getByLecNull(pageSize, pageNumber));
    }


    @GetMapping("/lecture/page/code/{code}")
    @ResponseBody
    public ResponseEntity<?> getLectureCodePage(@PathVariable String code) throws IllegalAccessException {

        return ResponseEntity.ok(lectureService.findByCodePage(code));
    }


    @DeleteMapping("/lecture/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteLecture(@PathVariable long id) throws IllegalAccessException {

        Lecture lecture = lectureService.delete(id);
        return ResponseEntity.ok(lectureService.findActive(4, 0));
    }


    @PostMapping("/lecture")
    @ResponseBody
    public ResponseEntity<?> saveLecture(@RequestBody @Valid LectureDTO lectureDTO) {

        Lecture lecture = lectureService.save(lectureDTO);
        return ResponseEntity.ok(lecture);
    }
}
