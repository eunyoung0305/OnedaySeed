package com.store.onedaySeed.dto;

import com.store.onedaySeed.entity.Host;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HostDto {
    private String hostNum;

    @NotNull(message = "이름을 입력해주세요")
    private String hostName;

    @NotNull(message = "핸드폰번호를 입력해주세요")
    private String phoneNum;

    @NotNull(message = "비밀번호를 입력해주세요")
    private String password;

    public HostDto(Host host) {
        this.hostNum = host.getHostNum();
        this.hostName = host.getHostName();
        this.phoneNum = host.getPhoneNum();
        this.password = host.getPassword();
    }

}
