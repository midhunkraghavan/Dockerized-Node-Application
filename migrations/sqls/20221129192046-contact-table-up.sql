/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public.contacts
(
    id serial NOT NULL,
    "firstName" character varying,
    "lastName" character varying,
    email character varying,
    phone character varying,
    address text,
    city character varying,
    state character varying,
    country character varying,
    "zipCode" character varying,
    "createdOn" timestamp without time zone DEFAULT now(),
    "updatedOn" timestamp without time zone DEFAULT now(),
    CONSTRAINT contact_pkey PRIMARY KEY (id)

);
