package com.store.onedaySeed.entity;

import com.store.onedaySeed.constant.Role;
import com.store.onedaySeed.dto.HostMemberFormDto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import jakarta.persistence.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Table(name="host")
@Getter
@Setter
@ToString
public class Host extends BaseEntity{

    @Id
    @Column(name = "host_num", unique = true)
    private String hostNum;

    @Column(nullable = false, name="host_name")
    private String hostName;

    @Column(nullable = false, name="phone_num")
    private String phoneNum;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public static Host createHost(HostMemberFormDto hostMemberFormDto, PasswordEncoder passwordEncoder){

        Host host = new Host();

        host.setHostNum(hostMemberFormDto.getHostNum());
        host.setHostName(hostMemberFormDto.getHostName());
        host.setPhoneNum(hostMemberFormDto.getPhoneNum());
        String password = passwordEncoder.encode(hostMemberFormDto.getPassword());
        host.setPassword(password);
        host.setRole(Role.HOST);

        return host;
    }




}
