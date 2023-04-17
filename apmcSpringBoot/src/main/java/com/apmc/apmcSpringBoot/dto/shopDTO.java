package com.apmc.apmcSpringBoot.dto;


import com.apmc.apmcSpringBoot.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.springframework.lang.NonNull;


public class shopDTO {



    private int shopId;

    @NotNull(message = "shop Number should ")
    private String shopNo;


    @NotNull
    private User owner ;

}
