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
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL,
  body VARCHAR(255) NOT NULL,
  date BIGINT,
  asker_name VARCHAR(100) NOT NULL,
  asker_email VARCHAR(100) NOT NULL,
  reported BOOLEAN,
  helpful INTEGER DEFAULT NULL
);

-- ---
-- Table 'answers'
--
-- ---

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  question_id INTEGER NOT NULL,
  body VARCHAR(255) NOT NULL,
  date BIGINT,
  answerer_name VARCHAR(100) NOT NULL,
  answerer_email VARCHAR(100) NOT NULL,
  reported BOOLEAN,
  helpful INTEGER
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL PRIMARY KEY NOT NULL,
  answer_id INTEGER NOT NULL,
  url VARCHAR(255) NOT NULL
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE answers ADD FOREIGN KEY (question_id) REFERENCES questions (id);
ALTER TABLE photos ADD FOREIGN KEY (answer_id) REFERENCES answers (id);

ALTER TABLE questions ALTER COLUMN date TYPE timestamp USING (to_timestamp(date::decimal/1000) AT TIME ZONE 'utc');
ALTER TABLE questions ALTER date SET DEFAULT now()::timestamp(3);

ALTER TABLE answers ALTER COLUMN date TYPE timestamp USING (to_timestamp(date::decimal/1000) AT TIME ZONE 'utc');
ALTER TABLE answers ALTER date SET DEFAULT now()::timestamp(3);


COPY questions from './data/questions.csv' delimiter ',' CSV HEADER;
COPY answers from './data/answers.csv' delimiter ',' CSV HEADER;
COPY photos from './data/answers_photos.csv' delimiter ',' CSV HEADER;
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