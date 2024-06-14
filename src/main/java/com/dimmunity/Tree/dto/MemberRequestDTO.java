package com.dimmunity.Tree.dto;

import com.dimmunity.Tree.entity.MemberEntity;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class MemberRequestDTO {
    private String MemberEmail;
    private String memberPassword;

    public static MemberRequestDTO
     toMemberRequestDTO(MemberEntity memberEntity) {
        MemberRequestDTO memberRequestDTO = new MemberRequestDTO();
        memberRequestDTO.setMemberEmail(memberEntity.getMemberEmail());
        memberRequestDTO.setMemberPassword(memberEntity.getMemberPassword());
        return memberRequestDTO;
        
    }
    
}
