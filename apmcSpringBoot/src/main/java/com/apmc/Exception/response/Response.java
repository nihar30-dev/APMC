package com.apmc.Exception.response;



public class Response {

    private int status;
    private String message;
    private long timestamp;
    private boolean isSuccess;

    public Response() {
    }

    public Response(int status, String message, long timestamp, boolean isSuccess) {
        this.status = status;
        this.message = message;
        this.timestamp = timestamp;
        this.isSuccess = isSuccess;
    }

    public Response(int status, String message, long timestamp) {
        this.status = status;
        this.message = message;
        this.timestamp = timestamp;
        this.isSuccess = true;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isSuccess() {
        return isSuccess;
    }

    public void setSuccess(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

}
