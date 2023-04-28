package com.apmc.apmcSpringBoot.notice.validation;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.notice.Notice;

public class NoticeValidatorImpl implements NoticeValidator{

    public NoticeValidatorImpl(){}
    @Override
    public ValidatorResponse checkNotice(Notice notice) {
        String msg = "";
        ValidatorResponse vr1 = checkHeading(notice);
        if(!vr1.isStatus()){
            msg += vr1.getMessage();
        }
        if(msg == ""){
            return new ValidatorResponse(true,"Ok");
        }else {
            msg += " required";
            return new ValidatorResponse(false, msg);
        }
    }

    public ValidatorResponse checkHeading(Notice notice){
        if(notice.getNoticeHeading() == null){
            return new ValidatorResponse(false, "Notice heading");
        } else {
            return new ValidatorResponse(true, "Ok");
        }
    }
}
