package com.store.onedaySeed.repository;

import com.store.onedaySeed.entity.Host;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HostRepository extends JpaRepository<Host, String> {
    Host findByHostNum(String hostNum);
}
