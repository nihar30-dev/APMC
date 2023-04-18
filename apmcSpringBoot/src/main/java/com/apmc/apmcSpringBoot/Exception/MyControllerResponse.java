package com.apmc.apmcSpringBoot.Exception;


import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class MyControllerResponse{

//    @ExceptionHandler(NoSuchElementException.class)
//    public ResponseEntity<?> handleEmptyInput(NoSuchElementException noSuchElementException){
//
//        Response errorResponse = new Response();
//        errorResponse.setStatus(HttpStatus.NOT_FOUND.value());
//        errorResponse.setMessage("Not Found");
//        errorResponse.setTimestamp(System.currentTimeMillis());
//        errorResponse.setSuccess(false);
//        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
//    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {

            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName, message);
        });
        return new ResponseEntity<Object>(errors, HttpStatus.BAD_REQUEST);
    }
//    @ExceptionHandler
//    public ResponseEntity<Response> handleException(Exception exc){
//
//        System.out.println(exc.getMessage());
//        Response errorResponse = new Response();
//        errorResponse.setStatus(HttpStatus.BAD_REQUEST.value());
//        errorResponse.setMessage("Bad Request");
//        errorResponse.setTimestamp(System.currentTimeMillis());
//        errorResponse.setSuccess(false);
//
//        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
//
//    }


}
