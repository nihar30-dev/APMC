package com.apmc.apmcSpringBoot.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class MyControllerResponse {

    @ExceptionHandler
    public ResponseEntity<Response> handleException(ValidatorException validatorException){

        Response errorResponse = new Response();
        errorResponse.setStatus(HttpStatus.BAD_REQUEST.value());
        errorResponse.setMessage(validatorException.getMessage());
        errorResponse.setTimestamp(System.currentTimeMillis());
        errorResponse.setSuccess(false);

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<Response> handleException(ResponseException responseException){

        Response errorResponse = new Response();
        errorResponse.setStatus(HttpStatus.NOT_FOUND.value());
        errorResponse.setMessage(responseException.getMessage());
        errorResponse.setTimestamp(System.currentTimeMillis());
        errorResponse.setSuccess(false);


        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
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