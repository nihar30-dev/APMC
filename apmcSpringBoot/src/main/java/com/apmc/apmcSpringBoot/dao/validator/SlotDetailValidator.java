package com.apmc.apmcSpringBoot.dao.validator;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.model.*;

public interface SlotDetailValidator {
    public ValidatorResponse checkSlotDetail(SlotDetail slotDetail);

    public ValidatorResponse checkQuantity(int quantity);

    public ValidatorResponse checkUserId(User user);

    public ValidatorResponse checkAgentId(Agent agent);

    public ValidatorResponse checkSlotId(Slot slot);
}
