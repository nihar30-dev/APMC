package com.apmc.apmcSpringBoot.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.NoSuchElementException;

@ControllerAdvice
public class MyControllerResponse {

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<?> handleEmptyInput(NoSuchElementException noSuchElementException){

        Response errorResponse = new Response();
        errorResponse.setStatus(HttpStatus.NOT_FOUND.value());
        errorResponse.setMessage("Not Found");
        errorResponse.setTimestamp(System.currentTimeMillis());
        errorResponse.setSuccess(false);
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<Response> handleException(Exception exc){

        System.out.println(exc.getMessage());
        Response errorResponse = new Response();
        errorResponse.setStatus(HttpStatus.BAD_REQUEST.value());
        errorResponse.setMessage("Bad Request");
        errorResponse.setTimestamp(System.currentTimeMillis());
        errorResponse.setSuccess(false);

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);

    }


}
