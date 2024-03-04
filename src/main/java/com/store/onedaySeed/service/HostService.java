package com.store.onedaySeed.service;

import com.store.onedaySeed.dto.HostDto;
import com.store.onedaySeed.entity.Host;
import com.store.onedaySeed.repository.HostRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HostService {

    private final HostRepository hostRepository;
    
    // 프로필 조회
    public Host findOne(String hostNum) {
        return hostRepository.findById(hostNum).orElseThrow(NullPointerException::new);
    }
    
    // 프로필 수정
    @Transactional
    public void updateHost(HostDto hostDto) throws EntityNotFoundException  {
        Optional<Host> optionalHost = hostRepository.findById(hostDto.getHostNum());

        if(optionalHost.isPresent()) {
            Host host = optionalHost.get();
            host.setHostName(hostDto.getHostName());
            host.setPhoneNum(hostDto.getPhoneNum());
            host.setPassword(hostDto.getPassword());

            hostRepository.save(host);

        } else {
            throw new EntityNotFoundException("Host not found");
        }
    }

}
