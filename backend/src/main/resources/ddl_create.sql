-- Portfolio Application - Complete Database Schema
-- These tables are automatically created by Hibernate based on @Entity classes

-- Users table
CREATE TABLE users (
                       user_id BIGINT NOT NULL AUTO_INCREMENT,
                       full_name VARCHAR(255) NOT NULL,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       phone VARCHAR(20),
                       bio TEXT,
                       profile_image VARCHAR(255),
                       resume_url VARCHAR(255),
                       is_active BOOLEAN DEFAULT TRUE,
                       created_at DATETIME(6),
                       updated_at DATETIME(6),
                       PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Experience table
CREATE TABLE experience (
                            experience_id BIGINT NOT NULL AUTO_INCREMENT,
                            user_id BIGINT,
                            company VARCHAR(255) NOT NULL,
                            position VARCHAR(255) NOT NULL,
                            start_date DATE NOT NULL,
                            end_date DATE,
                            description TEXT,
                            technologies TEXT,
                            is_current BOOLEAN DEFAULT FALSE,
                            created_at DATETIME(6),
                            PRIMARY KEY (experience_id),
                            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Projects table
CREATE TABLE projects (
                          project_id BIGINT NOT NULL AUTO_INCREMENT,
                          user_id BIGINT,
                          project_name VARCHAR(255) NOT NULL,
                          description TEXT,
                          technologies TEXT,
                          github_url VARCHAR(255),
                          live_url VARCHAR(255),
                          image_url VARCHAR(255),
                          start_date DATE,
                          end_date DATE,
                          created_at DATETIME(6),
                          PRIMARY KEY (project_id),
                          FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Skills table
CREATE TABLE skills (
                        skill_id BIGINT NOT NULL AUTO_INCREMENT,
                        user_id BIGINT,
                        skill_name VARCHAR(255) NOT NULL,
                        skill_category VARCHAR(255),
                        proficiency_level VARCHAR(255),
                        years_experience INTEGER,
                        is_featured BOOLEAN DEFAULT FALSE,
                        created_at DATETIME(6),
                        PRIMARY KEY (skill_id),
                        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Education table
CREATE TABLE education (
                           education_id BIGINT NOT NULL AUTO_INCREMENT,
                           user_id BIGINT,
                           institution VARCHAR(255) NOT NULL,
                           degree VARCHAR(255) NOT NULL,
                           field_of_study VARCHAR(255),
                           start_date DATE,
                           end_date DATE,
                           gpa DECIMAL(3,2),
                           description TEXT,
                           created_at DATETIME(6),
                           PRIMARY KEY (education_id),
                           FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact Messages table
CREATE TABLE contact_messages (
                                  message_id BIGINT NOT NULL AUTO_INCREMENT,
                                  name VARCHAR(255) NOT NULL,
                                  email VARCHAR(255) NOT NULL,
                                  subject VARCHAR(255),
                                  message TEXT NOT NULL,
                                  sent_date DATETIME(6),
                                  is_read BOOLEAN DEFAULT FALSE,
                                  response TEXT,
                                  PRIMARY KEY (message_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);
CREATE INDEX idx_experience_user_id ON experience(user_id);
CREATE INDEX idx_experience_start_date ON experience(start_date);
CREATE INDEX idx_experience_current ON experience(is_current);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_start_date ON projects(start_date);
CREATE INDEX idx_skills_user_id ON skills(user_id);
CREATE INDEX idx_skills_category ON skills(skill_category);
CREATE INDEX idx_skills_featured ON skills(is_featured);
CREATE INDEX idx_education_user_id ON education(user_id);
CREATE INDEX idx_education_start_date ON education(start_date);
CREATE INDEX idx_contact_messages_read ON contact_messages(is_read);
CREATE INDEX idx_contact_messages_sent_date ON contact_messages(sent_date);
