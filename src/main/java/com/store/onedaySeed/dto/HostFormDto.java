package com.store.onedaySeed.dto;

import com.store.onedaySeed.constant.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class HostFormDto {

    private String hostNum;
    private String hostName;
    private String phoneNum;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;
}
