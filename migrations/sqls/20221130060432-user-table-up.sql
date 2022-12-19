/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    name character varying,
    "userName" character varying,
    "password" text,
    "createdOn" timestamp without time zone DEFAULT now(),
    "updatedOn" timestamp without time zone DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

INSERT INTO public.users
            ("name", "userName", "password","createdOn", "updatedOn")
VALUES('Innovature', 'admin', '$2b$10$AuRVSvt1MwT06UyNJEN0aufEKVIW49PA3wjSInEsHLkHXOPwoE.vK',now(), now());


