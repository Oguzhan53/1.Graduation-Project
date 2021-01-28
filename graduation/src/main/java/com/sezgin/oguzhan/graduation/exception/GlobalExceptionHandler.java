package com.sezgin.oguzhan.graduation.exception;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler  extends ResponseEntityExceptionHandler{

//    @ExceptionHandler(value
//                              = { IllegalArgumentException.class, IllegalStateException.class })
//    protected ResponseEntity<Object> handleConflict(
//            RuntimeException ex, WebRequest request) {
//        String bodyOfResponse = "This should be application specific";
//        return handleExceptionInternal(ex, bodyOfResponse,
//                new HttpHeaders(), HttpStatus.CONFLICT, request);
//    }
//
//    @ExceptionHandler(value = { IllegalAccessException.class, IllegalAccessException.class })
//    public ResponseEntity<?> handleRunTimeException(HttpServletRequest request, IllegalArgumentException t){
//        Map<String, String> map = new HashMap<String, String>();
//        map.put("error", t.getMessage());
//        return new ResponseEntity<>(map,HttpStatus.INTERNAL_SERVER_ERROR);
//
//    }
////
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<?> handleRunTimeException2(HttpServletRequest request, NoSuchElementException t){
        Map<String, String> map = new HashMap<String, String>();
        map.put("error", t.getMessage());
        return new ResponseEntity<>(map,HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @ExceptionHandler(IllegalAccessException.class)
    public ResponseEntity<?> handleRunTimeException3 (HttpServletRequest request, IllegalAccessException t){
        Map<String, String> map = new HashMap<String, String>();
        map.put("error", t.getMessage());
        return new ResponseEntity<>(map,HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @ExceptionHandler(IndexOutOfBoundsException.class)
    public ResponseEntity<?> handleRunTimeException4 (HttpServletRequest request, IndexOutOfBoundsException t){
        Map<String, String> map = new HashMap<String, String>();
        map.put("error", t.getMessage());
        return new ResponseEntity<>(map,HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<?> handleRunTimeException5 (HttpServletRequest request, SQLIntegrityConstraintViolationException t){
        Map<String, String> map = new HashMap<String, String>();
        map.put("error", "Duplicate Entry.Plese change username or number");
        return new ResponseEntity<>(map,HttpStatus.INTERNAL_SERVER_ERROR);

    }


}
