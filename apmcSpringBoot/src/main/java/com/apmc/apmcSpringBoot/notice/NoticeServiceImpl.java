package com.apmc.apmcSpringBoot.notice;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.notice.validation.NoticeValidatorImpl;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService{

    @Autowired
    private NoticeRepository noticeRepository;
    @Override
    @Transactional
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    @Override
    @Transactional
    public String deleteNotice(int noticeId) {

        Notice notice = noticeRepository.findById(noticeId).orElse(null);
        try{
            if(notice == null){
                return "Could not find notice";
            }
            noticeRepository.deleteById(noticeId);
        }catch(Exception e){
            System.out.println(e.getMessage());
            return "Could not find notice";
        }

        return "deleted";
    }

    @Override
    @Transactional
    public Response createNotice(Notice notice) throws ValidatorException{
        NoticeValidatorImpl noticeValidator = new NoticeValidatorImpl();
        ValidatorResponse validatorResponse = noticeValidator.checkNotice(notice);
        if(!validatorResponse.isStatus()){
//            throw new ValidatorException(validatorResponse.getMessage());
            return new Response(400, validatorResponse.getMessage() ,System.currentTimeMillis(), false);
        }
        try{
            noticeRepository.save(notice);
            return new Response(200,"Ok", System.currentTimeMillis(), true);
        }catch(Exception e){
            System.out.println(e.getMessage());
            return new Response(400,e.getMessage(),System.currentTimeMillis(), false);
        }
    }
}
