package com.apmc.apmcSpringBoot.slotDetail.validation;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.agent.Agent;
import com.apmc.apmcSpringBoot.slot.Slots;
import com.apmc.apmcSpringBoot.slotDetail.SlotDetail;
import com.apmc.apmcSpringBoot.user.User;

public interface SlotDetailValidator {
    public ValidatorResponse checkSlotDetail(SlotDetail slotDetail);

    public ValidatorResponse checkQuantity(int quantity);

    public ValidatorResponse checkUserId(User user);

    public ValidatorResponse checkAgentId(Agent agent);

    public ValidatorResponse checkSlotId(Slots slot);
}
