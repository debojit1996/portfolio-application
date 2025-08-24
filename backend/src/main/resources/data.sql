-- Portfolio Application - Database Schema matching Entity Classes
-- This file creates tables and inserts sample data matching the exact entity structure

-- Drop tables before creating them so that re-deployment doesn't create duplicate data
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS experience;
DROP TABLE IF EXISTS users;

-- Users table (matching User.java entity)
CREATE TABLE IF NOT EXISTS users (
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
                                     PRIMARY KEY (user_id),
                                     INDEX idx_users_email (email),
                                     INDEX idx_users_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Experience table (matching Experience.java entity)
CREATE TABLE IF NOT EXISTS experience (
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
                                          FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                                          INDEX idx_experience_user_id (user_id),
                                          INDEX idx_experience_start_date (start_date),
                                          INDEX idx_experience_current (is_current)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Projects table (matching Project.java entity)
CREATE TABLE IF NOT EXISTS projects (
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
                                        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                                        INDEX idx_projects_user_id (user_id),
                                        INDEX idx_projects_start_date (start_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Skills table (matching Skill.java entity)
CREATE TABLE IF NOT EXISTS skills (
                                      skill_id BIGINT NOT NULL AUTO_INCREMENT,
                                      user_id BIGINT,
                                      skill_name VARCHAR(255) NOT NULL,
                                      skill_category VARCHAR(255),
                                      proficiency_level VARCHAR(255),
                                      years_experience INTEGER,
                                      is_featured BOOLEAN DEFAULT FALSE,
                                      created_at DATETIME(6),
                                      PRIMARY KEY (skill_id),
                                      FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                                      INDEX idx_skills_user_id (user_id),
                                      INDEX idx_skills_category (skill_category),
                                      INDEX idx_skills_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Education table (matching Education.java entity)
CREATE TABLE IF NOT EXISTS education (
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
                                         FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                                         INDEX idx_education_user_id (user_id),
                                         INDEX idx_education_start_date (start_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact Messages table (matching ContactMessage.java entity - NO created_at field!)
CREATE TABLE IF NOT EXISTS contact_messages (
                                                message_id BIGINT NOT NULL AUTO_INCREMENT,
                                                name VARCHAR(255) NOT NULL,
                                                email VARCHAR(255) NOT NULL,
                                                subject VARCHAR(255),
                                                message TEXT NOT NULL,
                                                sent_date DATETIME(6),
                                                is_read BOOLEAN DEFAULT FALSE,
                                                response TEXT,
                                                PRIMARY KEY (message_id),
                                                INDEX idx_contact_messages_read (is_read),
                                                INDEX idx_contact_messages_sent_date (sent_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample user (Debojit Chakraborty)
INSERT IGNORE INTO users (full_name, email, phone, bio, profile_image, resume_url, is_active, created_at, updated_at)
VALUES (
           'Debojit Chakraborty',
           'devchakraborty9914@gmail.com',
           '+91-9706712621',
           'I am a computer programming enthusiast who loves designing and developing products. I would love investing my time solving complex problems. I have always been a hardworking individual who loves collaborating and working as a team to deliver high quality software products.',
           'profile.jpg',
           '/Debojit_Chakraborty_Resume.pdf',
           true,
           NOW(),
           NOW()
       );

-- Get the user ID for foreign key references
SET @user_id = (SELECT user_id FROM users WHERE email = 'devchakraborty9914@gmail.com');

-- Insert education data
INSERT IGNORE INTO education (user_id, institution, degree, field_of_study, start_date, end_date, gpa, description, created_at)
VALUES
    (@user_id, 'NIT SILCHAR', 'Bachelor of Technology', 'Computer Science & Engineering', '2014-01-01', '2018-12-31', 8.99, 'Computer Science & Engineering with focus on software development and algorithms', NOW()),
    (@user_id, 'VKV DIBRUGARH, ASSAM', 'Higher Secondary', 'Science Stream', '2012-01-01', '2014-12-31', 9.46, 'Higher Secondary in Science stream with 94.6% marks', NOW()),
    (@user_id, 'VKV DIBRUGARH, ASSAM', 'H.S.L.C', 'General', '2010-01-01', '2012-12-31', 10.00, 'H.S.L.C with perfect GPA', NOW());

-- Insert experience data
INSERT IGNORE INTO experience (user_id, company, position, start_date, end_date, description, technologies, is_current, created_at)
VALUES
    (@user_id, 'Akamai Technologies', 'Senior Software Engineer', '2024-04-01', NULL,
     'Senior backend engineer of Akamai Test Center project. This application is used to test different CDN configurations that users will be applying for their products in different edge sites. Pivoting the migration of a critical micro-service currently running in AWS infra to Akamai''s Linode cloud infra.',
     'Java 21, Spring Boot, Spring Cloud, Microservices, AWS, Linode, Docker, Kubernetes', true, NOW()),

    (@user_id, 'Akamai Technologies', 'Software Engineer II', '2021-11-25', '2024-03-31',
     'Worked as a backend developer for the project Akamai Test Center. Responsible for HLD, LLD and development of multiple complex features for the project, mentored and guided juniors to deliver critical project features.',
     'Java 8/11, Spring Boot, Microservices, JPA, Hibernate, MySQL', false, NOW()),

    (@user_id, 'Philips India Ltd', 'Software Engineer II', '2020-10-01', '2021-11-18',
     'Worked as a backend engineer in a team named Population Connector to support data ingestion from EMR vendors which are in FHIR data format. Designed LLD for the parsers, wrote them using Java 8 leveraging the FHIR APIs.',
     'Java 8, Spring Boot, FHIR APIs, REST APIs, JPA, Hibernate, Oracle, Maven', false, NOW()),

    (@user_id, 'Philips India Ltd', 'Software Engineer I', '2018-09-01', '2020-09-30',
     'The project is named Wellcentive used for analyzing patient healthcare records. Worked on creating stateless, secure RESTful web services using Spring Boot for the applicable to ingest and transform healthcare records of patients.',
     'Java 8, Spring Boot, REST APIs, JPA, Hibernate, MySQL, JUnit, Mockito', false, NOW());

-- Insert skills data
INSERT IGNORE INTO skills (user_id, skill_name, skill_category, proficiency_level, years_experience, is_featured, created_at)
VALUES
    (@user_id, 'Java', 'Programming Language', 'Expert', 7, true, NOW()),
    (@user_id, 'Spring Boot', 'Framework', 'Expert', 6, true, NOW()),
    (@user_id, 'Spring Cloud', 'Framework', 'Advanced', 4, true, NOW()),
    (@user_id, 'Microservices', 'Architecture', 'Expert', 5, true, NOW()),
    (@user_id, 'REST API', 'API Design', 'Expert', 6, true, NOW()),
    (@user_id, 'JPA', 'ORM', 'Advanced', 5, false, NOW()),
    (@user_id, 'Hibernate', 'ORM', 'Advanced', 5, false, NOW()),
    (@user_id, 'MySQL', 'Database', 'Advanced', 5, false, NOW()),
    (@user_id, 'Oracle', 'Database', 'Intermediate', 3, false, NOW()),
    (@user_id, 'Maven', 'Build Tool', 'Advanced', 5, false, NOW()),
    (@user_id, 'Gradle', 'Build Tool', 'Beginner', 2, false, NOW()),
    (@user_id, 'Docker', 'DevOps', 'Intermediate', 3, false, NOW()),
    (@user_id, 'Kubernetes', 'DevOps', 'Beginner', 2, false, NOW()),
    (@user_id, 'AWS', 'Cloud', 'Intermediate', 4, false, NOW()),
    (@user_id, 'Linode', 'Cloud', 'Intermediate', 2, false, NOW()),
    (@user_id, 'JUnit', 'Testing', 'Advanced', 5, false, NOW()),
    (@user_id, 'Mockito', 'Testing', 'Advanced', 5, false, NOW());

-- Insert project data
INSERT IGNORE INTO projects (user_id, project_name, description, technologies, github_url, live_url, start_date, end_date, created_at)
VALUES
    (@user_id, 'Akamai Test Center',
     'A comprehensive testing platform for CDN configurations across different edge sites. Designed and delivered complex features like dynamic variables and variable group arrays.',
     'Java 11/17, Spring Boot, Spring Cloud, Microservices, AWS, Docker',
     NULL,
     NULL,
     '2021-12-01', NULL, NOW()),

    (@user_id, 'Healthcare Data Parser',
     'Complex parsers to extract patient details from different healthcare file formats (HL7, CCDA, Delimited files). Developed BDD based unit testing framework.',
     'Java 8, Spring Boot, FHIR APIs, JUnit, Mockito, BDD',
     NULL,
     NULL,
     '2018-09-01', '2020-09-30', NOW()),

    (@user_id, 'Portfolio Management System',
     'Full-stack portfolio management application with backend REST APIs and modern frontend. Features include user management, project showcase, and contact management.',
     'Java 21, Spring Boot 3, MySQL, Docker, React, TypeScript',
     'https://github.com/debojit1996/portfolio-application',
     'https://portfolio.debojit.dev',
     '2025-08-15', NULL, NOW());

-- FIXED: Insert contact message WITHOUT created_at (matching ContactMessage.java entity)
INSERT IGNORE INTO contact_messages (name, email, subject, message, sent_date, is_read, response)
VALUES
    ('John Doe', 'john.doe@example.com', 'Inquiry about your projects',
     'Hi Debojit, I came across your portfolio and I am impressed with your work. I would like to discuss a potential collaboration opportunity.',
     NOW(), false, NULL);
