package com.portfolio.repository;

import com.portfolio.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for ContactMessage entity operations
 *
 * @author Debojit Chakraborty
 */
@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

    List<ContactMessage> findAllByOrderBySentDateDesc();

    @Query("SELECT c FROM ContactMessage c WHERE c.isRead = false ORDER BY c.sentDate DESC")
    List<ContactMessage> findUnreadMessages();

    @Query("SELECT c FROM ContactMessage c WHERE c.isRead = true ORDER BY c.sentDate DESC")
    List<ContactMessage> findReadMessages();

    long countByIsReadFalse();
}
