-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'questions'
--
-- ---

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  body VARCHAR(255) NOT NULL,
  date BIGINT NOT NULL,
  asker_name VARCHAR(100) NOT NULL,
  asker_email VARCHAR(100) NOT NULL,
  reported BOOLEAN,
  helpful INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'answers'
--
-- ---

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,
  body VARCHAR(255) NOT NULL,
  date BIGINT NOT NULL,
  answerer_name VARCHAR(100) NOT NULL,
  answerer_email VARCHAR(100) NOT NULL,
  reported BOOLEAN,
  helpful INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id INTEGER NOT NULL,
  answer_id INTEGER NOT NULL,
  url VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE answers ADD FOREIGN KEY (question_id) REFERENCES questions (id);
ALTER TABLE photos ADD FOREIGN KEY (answer_id) REFERENCES answers (id);


COPY questions from '/Users/jonathanoh/Documents/code/Hack Reactor Precourse/qna/data/questions.csv' delimiter ',' CSV HEADER;
COPY answers from '/Users/jonathanoh/Documents/code/Hack Reactor Precourse/qna/data/answers.csv' delimiter ',' CSV HEADER;
COPY photos from '/Users/jonathanoh/Documents/code/Hack Reactor Precourse/qna/data/answers_photos.csv' delimiter ',' CSV HEADER;
-- ---
-- Table Properties
-- ---

-- ALTER TABLE questions ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE answers ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE photos ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO questions (id,product_id,body,date,asker_name,helpfulness,reported) VALUES
-- ('','','','','','','');
-- INSERT INTO answers (id,body,date,answerer_name,helpfulness,questions_id) VALUES
-- ('','','','','','');
-- INSERT INTO photos (id,url,answers_id) VALUES
-- ('','','');