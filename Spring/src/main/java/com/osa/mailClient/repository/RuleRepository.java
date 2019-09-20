package com.osa.mailClient.repository;

import com.osa.mailClient.entity.Folder;
import com.osa.mailClient.entity.Rule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RuleRepository extends JpaRepository<Rule, Long> {
    List<Rule> findByDestination(Folder destination);
}
