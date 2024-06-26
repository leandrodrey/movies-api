create table actor
(
    id   int auto_increment
        primary key,
    name varchar(255) not null,
    constraint name
        unique (name)
);

create table director
(
    id   int auto_increment
        primary key,
    name varchar(255) not null,
    constraint name
        unique (name)
);

create table genre
(
    id   int auto_increment
        primary key,
    name varchar(255) not null,
    constraint name
        unique (name)
);

create table movie
(
    id       binary(16)    not null
        primary key,
    title    varchar(255)  not null,
    year     int           not null,
    duration int           not null,
    poster   text          null,
    rate     decimal(2, 1) not null,
    trailer  text          null,
    status   varchar(255)  null,
    budget   decimal       null,
    revenue  decimal       null,
    constraint check_rate_positive
        check (`rate` >= 0)
);

create table movie_actor
(
    movie_id binary(16) not null,
    actor_id int        not null,
    primary key (movie_id, actor_id),
    constraint movie_actor_ibfk_1
        foreign key (movie_id) references movie (id),
    constraint movie_actor_ibfk_2
        foreign key (actor_id) references actor (id)
);

create index actor_id
    on movie_actor (actor_id);

create table movie_director
(
    movie_id    binary(16) not null,
    director_id int        not null,
    primary key (movie_id, director_id),
    constraint movie_director_ibfk_1
        foreign key (movie_id) references movie (id),
    constraint movie_director_ibfk_2
        foreign key (director_id) references director (id)
);

create index director_id
    on movie_director (director_id);

create table movie_genre
(
    movie_id binary(16) not null,
    genre_id int        not null,
    primary key (movie_id, genre_id),
    constraint movie_genre_ibfk_1
        foreign key (movie_id) references movie (id),
    constraint movie_genre_ibfk_2
        foreign key (genre_id) references genre (id)
);

create index genre_id
    on movie_genre (genre_id);

/* INFORMATION_SCHEMA */

-- Tabla Actor
INSERT IGNORE INTO actor (id, name) VALUES
    (1, 'Tom Hanks'),
    (2, 'Michael Clarke Duncan'),
    (3, 'Leonardo DiCaprio'),
    (4, 'Matt Damon'),
    (5, 'Jack Nicholson'),
    (6, 'Mark Ruffalo'),
    (7, 'Song Kang-ho'),
    (8, 'Lee Sun-kyun'),
    (9, 'Cho Yeo-jeong'),
    (10, 'Choi Woo-shik'),
    (11, 'Miles Teller'),
    (12, 'J.K. Simmons'),
    (13, 'Matthew McConaughey'),
    (14, 'Anne Hathaway'),
    (15, 'Jessica Chastain'),
    (16, 'Ralph Fiennes'),
    (17, 'Tony Revolori'),
    (18, 'Joaquin Phoenix'),
    (19, 'Robert De Niro'),
    (20, 'Zazie Beetz'),
    (21, 'Frances McDormand'),
    (22, 'Anthony Gonzalez'),
    (23, 'Gael García Bernal'),
    (24, 'Benjamin Clementine'),
    (25, 'George MacKay'),
    (26, 'Dean-Charles Chapman'),
    (27, 'Tom Hardy'),
    (28, 'Charlize Theron'),
    (29, 'Nicholas Hoult');


-- Tabla Director
INSERT IGNORE INTO director (id, name) VALUES
    (1, 'Frank Darabont'),
    (2, 'Martin Scorsese'),
    (3, 'Bong Joon-ho'),
    (4, 'Damien Chazelle'),
    (5, 'Christopher Nolan'),
    (6, 'Wes Anderson'),
    (7, 'Todd Phillips'),
    (8, 'Lee Unkrich'),
    (9, 'Sam Mendes'),
    (10, 'George Miller');


-- Tabla Genre
INSERT IGNORE INTO genre (id, name) VALUES
    (1, 'Drama'),
    (2, 'Crime'),
    (3, 'Thriller'),
    (4, 'Comedy'),
    (5, 'Sci-Fi'),
    (6, 'Mystery'),
    (7, 'Adventure'),
    (8, 'Family'),
    (9, 'Animation'),
    (10, 'War'),
    (11, 'Action');

-- Tabla movie_actor (Relaciones Película-Actor)
INSERT IGNORE INTO movie_actor (movie_id, actor_id) VALUES
    (UNHEX(REPLACE('e9284288-3331-11ef-8fb0-50e0859c1e71', '-', '')), 1), -- The Green Mile - Tom Hanks
    (UNHEX(REPLACE('e9284288-3331-11ef-8fb0-50e0859c1e71', '-', '')), 2), -- The Green Mile - Michael Clarke Duncan
    (UNHEX(REPLACE('e92845f9-3331-11ef-8fb0-50e0859c1e71', '-', '')), 3), -- The Departed - Leonardo DiCaprio
    (UNHEX(REPLACE('e92845f9-3331-11ef-8fb0-50e0859c1e71', '-', '')), 4), -- The Departed - Matt Damon
    (UNHEX(REPLACE('e92845f9-3331-11ef-8fb0-50e0859c1e71', '-', '')), 5), -- The Departed - Jack Nicholson
    (UNHEX(REPLACE('e92845f9-3331-11ef-8fb0-50e0859c1e71', '-', '')), 6), -- The Departed - Mark Ruffalo
    (UNHEX(REPLACE('e9284665-3331-11ef-8fb0-50e0859c1e71', '-', '')), 7), -- Parasite - Song Kang-ho
    (UNHEX(REPLACE('e9284665-3331-11ef-8fb0-50e0859c1e71', '-', '')), 8), -- Parasite - Lee Sun-kyun
    (UNHEX(REPLACE('e9284665-3331-11ef-8fb0-50e0859c1e71', '-', '')), 9), -- Parasite - Cho Yeo-jeong
    (UNHEX(REPLACE('e9284665-3331-11ef-8fb0-50e0859c1e71', '-', '')), 10), -- Parasite - Choi Woo-shik
    (UNHEX(REPLACE('e928468e-3331-11ef-8fb0-50e0859c1e71', '-', '')), 11), -- Whiplash - Miles Teller
    (UNHEX(REPLACE('e928468e-3331-11ef-8fb0-50e0859c1e71', '-', '')), 12), -- Whiplash - J.K. Simmons
    (UNHEX(REPLACE('e92846ac-3331-11ef-8fb0-50e0859c1e71', '-', '')), 13), -- Interstellar - Matthew McConaughey
    (UNHEX(REPLACE('e92846ac-3331-11ef-8fb0-50e0859c1e71', '-', '')), 14), -- Interstellar - Anne Hathaway
    (UNHEX(REPLACE('e92846ac-3331-11ef-8fb0-50e0859c1e71', '-', '')), 15), -- Interstellar - Jessica Chastain
    (UNHEX(REPLACE('e92846c8-3331-11ef-8fb0-50e0859c1e71', '-', '')), 16), -- The Grand Budapest Hotel - Ralph Fiennes
    (UNHEX(REPLACE('e92846c8-3331-11ef-8fb0-50e0859c1e71', '-', '')), 17), -- The Grand Budapest Hotel - Tony Revolori
    (UNHEX(REPLACE('e92846e9-3331-11ef-8fb0-50e0859c1e71', '-', '')), 18), -- Joker - Joaquin Phoenix
    (UNHEX(REPLACE('e92846e9-3331-11ef-8fb0-50e0859c1e71', '-', '')), 19), -- Joker - Robert De Niro
    (UNHEX(REPLACE('e92846e9-3331-11ef-8fb0-50e0859c1e71', '-', '')), 20), -- Joker - Zazie Beetz
    (UNHEX(REPLACE('e9284703-3331-11ef-8fb0-50e0859c1e71', '-', '')), 21), -- Coco - Frances McDormand
    (UNHEX(REPLACE('e9284703-3331-11ef-8fb0-50e0859c1e71', '-', '')), 22), -- Coco - Anthony Gonzalez
    (UNHEX(REPLACE('e9284703-3331-11ef-8fb0-50e0859c1e71', '-', '')), 23), -- Coco - Gael García Bernal
    (UNHEX(REPLACE('e9284703-3331-11ef-8fb0-50e0859c1e71', '-', '')), 24), -- Coco - Benjamin Clementine
    (UNHEX(REPLACE('e9284721-3331-11ef-8fb0-50e0859c1e71', '-', '')), 25), -- 1917 - George MacKay
    (UNHEX(REPLACE('e9284721-3331-11ef-8fb0-50e0859c1e71', '-', '')), 26), -- 1917 - Dean-Charles Chapman
    (UNHEX(REPLACE('e928473a-3331-11ef-8fb0-50e0859c1e71', '-', '')), 27), -- Mad Max - Tom Hardy
    (UNHEX(REPLACE('e928473a-3331-11ef-8fb0-50e0859c1e71', '-', '')), 28), -- Mad Max - Charlize Theron
    (UNHEX(REPLACE('e928473a-3331-11ef-8fb0-50e0859c1e71', '-', '')), 29); -- Mad Max - Nicholas Hoult

-- Tabla movie_director (Relaciones Película-Director)
INSERT IGNORE INTO movie_director (movie_id, director_id) VALUES
    (UNHEX(REPLACE('e9284288-3331-11ef-8fb0-50e0859c1e71', '-', '')), 1), -- The Green Mile - Frank Darabont
    (UNHEX(REPLACE('e92845f9-3331-11ef-8fb0-50e0859c1e71', '-', '')), 2), -- The Departed - Martin Scorsese
    (UNHEX(REPLACE('e9284665-3331-11ef-8fb0-50e0859c1e71', '-', '')), 3), -- Parasite - Bong Joon-ho
    (UNHEX(REPLACE('e928468e-3331-11ef-8fb0-50e0859c1e71', '-', '')), 4), -- Whiplash - Damien Chazelle
    (UNHEX(REPLACE('e92846ac-3331-11ef-8fb0-50e0859c1e71', '-', '')), 5), -- Interstellar - Christopher Nolan
    (UNHEX(REPLACE('e92846c8-3331-11ef-8fb0-50e0859c1e71', '-', '')), 6), -- The Grand Budapest Hotel - Wes Anderson
    (UNHEX(REPLACE('e92846e9-3331-11ef-8fb0-50e0859c1e71', '-', '')), 7), -- Joker - Todd Phillips
    (UNHEX(REPLACE('e9284703-3331-11ef-8fb0-50e0859c1e71', '-', '')), 8), -- Coco - Lee Unkrich
    (UNHEX(REPLACE('e9284721-3331-11ef-8fb0-50e0859c1e71', '-', '')), 9), -- 1917 - Sam Mendes
    (UNHEX(REPLACE('e928473a-3331-11ef-8fb0-50e0859c1e71', '-', '')), 10); -- Mad Max: Fury Road - George Miller

-- Tabla movie_genre (Relaciones Película-Género)
INSERT IGNORE INTO movie_genre (movie_id, genre_id) VALUES
    (UNHEX(REPLACE('e9284288-3331-11ef-8fb0-50e0859c1e71', '-', '')), 1),  -- The Green Mile - Drama
    (UNHEX(REPLACE('e9284288-3331-11ef-8fb0-50e0859c1e71', '-', '')), 6),  -- The Green Mile - Mystery
    (UNHEX(REPLACE('e92845f9-3331-11ef-8fb0-50e0859c1e71', '-', '')), 2),  -- The Departed - Crime
    (UNHEX(REPLACE('e92845f9-3331-11ef-8fb0-50e0859c1e71', '-', '')), 3),  -- The Departed - Thriller
    (UNHEX(REPLACE('e92845f9-3331-11ef-8fb0-50e0859c1e71', '-', '')), 1),  -- The Departed - Drama
    (UNHEX(REPLACE('e9284665-3331-11ef-8fb0-50e0859c1e71', '-', '')), 3),  -- Parasite - Thriller
    (UNHEX(REPLACE('e9284665-3331-11ef-8fb0-50e0859c1e71', '-', '')), 1),  -- Parasite - Drama
    (UNHEX(REPLACE('e9284665-3331-11ef-8fb0-50e0859c1e71', '-', '')), 4),  -- Parasite - Comedy
    (UNHEX(REPLACE('e928468e-3331-11ef-8fb0-50e0859c1e71', '-', '')), 1),  -- Whiplash - Drama
    (UNHEX(REPLACE('e92846ac-3331-11ef-8fb0-50e0859c1e71', '-', '')), 7),  -- Interstellar - Adventure
    (UNHEX(REPLACE('e92846ac-3331-11ef-8fb0-50e0859c1e71', '-', '')), 1),  -- Interstellar - Drama
    (UNHEX(REPLACE('e92846ac-3331-11ef-8fb0-50e0859c1e71', '-', '')), 5),  -- Interstellar - Sci-Fi
    (UNHEX(REPLACE('e92846c8-3331-11ef-8fb0-50e0859c1e71', '-', '')), 4),  -- The Grand Budapest Hotel - Comedy
    (UNHEX(REPLACE('e92846c8-3331-11ef-8fb0-50e0859c1e71', '-', '')), 1),  -- The Grand Budapest Hotel - Drama
    (UNHEX(REPLACE('e92846c8-3331-11ef-8fb0-50e0859c1e71', '-', '')), 7),  -- The Grand Budapest Hotel - Adventure
    (UNHEX(REPLACE('e92846e9-3331-11ef-8fb0-50e0859c1e71', '-', '')), 3),  -- Joker - Thriller
    (UNHEX(REPLACE('e92846e9-3331-11ef-8fb0-50e0859c1e71', '-', '')), 2),  -- Joker - Crime
    (UNHEX(REPLACE('e92846e9-3331-11ef-8fb0-50e0859c1e71', '-', '')), 1),  -- Joker - Drama
    (UNHEX(REPLACE('e9284703-3331-11ef-8fb0-50e0859c1e71', '-', '')), 8),  -- Coco - Family
    (UNHEX(REPLACE('e9284703-3331-11ef-8fb0-50e0859c1e71', '-', '')), 9),  -- Coco - Animation
    (UNHEX(REPLACE('e9284703-3331-11ef-8fb0-50e0859c1e71', '-', '')), 7),  -- Coco - Adventure
    (UNHEX(REPLACE('e9284721-3331-11ef-8fb0-50e0859c1e71', '-', '')), 1),  -- 1917 - Drama
    (UNHEX(REPLACE('e9284721-3331-11ef-8fb0-50e0859c1e71', '-', '')), 10), -- 1917 - War
    (UNHEX(REPLACE('e928473a-3331-11ef-8fb0-50e0859c1e71', '-', '')), 11), -- Mad Max - Action
    (UNHEX(REPLACE('e928473a-3331-11ef-8fb0-50e0859c1e71', '-', '')), 5);  -- Mad Max - Sci-Fi
