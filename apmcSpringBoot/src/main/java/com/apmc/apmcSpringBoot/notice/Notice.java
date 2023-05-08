package com.apmc.apmcSpringBoot.notice;

import com.apmc.apmcSpringBoot.slot.Slots;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Entity
@Table(name = "notification")
public class Notice {

    @Id
    @Column(name = "notification_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noticeId;

    @NotBlank(message = "heading should be filled")
    @Column(name = "notification_heading")
    private String noticeHeading;
    @Column(name = "notification_detail")
    private String noticeContent;

    @ManyToOne
    @JoinColumn(name = "slot_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "totalQuantity", "bookedQuantity"})
    private Slots slot;
    @JoinColumn(name = "created_at")
    private Date createdAt;

    @JoinColumn(name = "start_date")
    private Date startDate;

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    @JoinColumn(name = "end_date")
    private Date endDate;

    public Notice(String noticeHeading, String noticeContent, Slots slot, Date createdAt) {
        this.noticeHeading = noticeHeading;
        this.noticeContent = noticeContent;
        this.slot = slot;
        this.createdAt = createdAt;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }



    public Notice(){}




    public int getNoticeId() {
        return noticeId;
    }

    public void setNoticeId(int noticeId) {
        this.noticeId = noticeId;
    }

    public String getNoticeHeading() {
        return noticeHeading;
    }

    public void setNoticeHeading(String noticeHeading) {
        this.noticeHeading = noticeHeading;
    }

    public String getNoticeContent() {
        return noticeContent;
    }

    public void setNoticeContent(String noticeContent) {
        this.noticeContent = noticeContent;
    }

    public Slots getSlot() {
        return slot;
    }

    public void setSlot(Slots slot) {
        this.slot = slot;
    }
}

