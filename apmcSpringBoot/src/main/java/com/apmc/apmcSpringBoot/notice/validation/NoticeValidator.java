package com.apmc.apmcSpringBoot.notice.validation;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.notice.Notice;

public interface NoticeValidator {
    public ValidatorResponse checkNotice(Notice notice);
}
