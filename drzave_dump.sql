toc.dat                                                                                             0000600 0004000 0002000 00000006673 14140033255 0014450 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP           1            
    y            ORlab    14.0    14.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         �           1262    16394    ORlab    DATABASE     f   CREATE DATABASE "ORlab" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Croatian_Croatia.1252';
    DROP DATABASE "ORlab";
                postgres    false         �            1259    16420    city    TABLE     g   CREATE TABLE public.city (
    cityid integer NOT NULL,
    cityname character varying(15) NOT NULL
);
    DROP TABLE public.city;
       public         heap    postgres    false         �            1259    16430    country    TABLE     �  CREATE TABLE public.country (
    countryid integer NOT NULL,
    countryname character varying(50) NOT NULL,
    isocode character(3) NOT NULL,
    callingcode integer NOT NULL,
    currency character varying(10) NOT NULL,
    language character varying(10) NOT NULL,
    capitalcityid integer NOT NULL,
    biggestcityid integer NOT NULL,
    continent character varying(15) NOT NULL,
    area integer NOT NULL,
    population integer NOT NULL
);
    DROP TABLE public.country;
       public         heap    postgres    false         �          0    16420    city 
   TABLE DATA           0   COPY public.city (cityid, cityname) FROM stdin;
    public          postgres    false    209       3312.dat �          0    16430    country 
   TABLE DATA           �   COPY public.country (countryid, countryname, isocode, callingcode, currency, language, capitalcityid, biggestcityid, continent, area, population) FROM stdin;
    public          postgres    false    210       3313.dat `           2606    16424    city city_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_pkey PRIMARY KEY (cityid);
 8   ALTER TABLE ONLY public.city DROP CONSTRAINT city_pkey;
       public            postgres    false    209         b           2606    16434    country country_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (countryid);
 >   ALTER TABLE ONLY public.country DROP CONSTRAINT country_pkey;
       public            postgres    false    210         d           2606    16440 "   country country_biggestcityid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_biggestcityid_fkey FOREIGN KEY (biggestcityid) REFERENCES public.city(cityid);
 L   ALTER TABLE ONLY public.country DROP CONSTRAINT country_biggestcityid_fkey;
       public          postgres    false    3168    210    209         c           2606    16435 "   country country_capitalcityid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_capitalcityid_fkey FOREIGN KEY (capitalcityid) REFERENCES public.city(cityid);
 L   ALTER TABLE ONLY public.country DROP CONSTRAINT country_capitalcityid_fkey;
       public          postgres    false    3168    209    210                                                                             3312.dat                                                                                            0000600 0004000 0002000 00000000231 14140033255 0014233 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	Zagreb
2	London
3	Paris
4	Berlin
5	Brasilia
6	Sao Paulo
7	Beijing
8	Shanghai
9	Ottawa
10	Toronto
11	Cairo
12	Tokyo
13	Washington
14	New York City
\.


                                                                                                                                                                                                                                                                                                                                                                       3313.dat                                                                                            0000600 0004000 0002000 00000001156 14140033255 0014243 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	Croatia	HRV	385	kuna	Croatian	1	1	Europe	56594	4058165
2	United_Kingdom	GBR	44	pound	English	2	2	Europe	242495	67081000
3	France	FRA	33	euro	French	3	3	Europe	640679	67413000
4	Germany	GER	49	euro	German	4	4	Europe	357022	83190556
5	Brazil	BRA	55	real	Portugese	5	6	South America	8515767	210147125
6	China	CHN	86	renwinbi	Chinese	7	8	Asia	9596961	1411778724
7	Canada	CAN	1	dollar	English	9	10	North America	9984670	38246108
8	Egypt	EGY	20	pound	Arabic	11	11	Africa	1010408	101478581
9	Japan	JPN	81	yen	Japanese	12	12	Asia	377975	125360000
10	United_States	USA	1	dollar	English	13	14	North America	9833520	331449281
\.


                                                                                                                                                                                                                                                                                                                                                                                                                  restore.sql                                                                                         0000600 0004000 0002000 00000006726 14140033255 0015374 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "ORlab";
--
-- Name: ORlab; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "ORlab" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Croatian_Croatia.1252';


ALTER DATABASE "ORlab" OWNER TO postgres;

\connect "ORlab"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: city; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.city (
    cityid integer NOT NULL,
    cityname character varying(15) NOT NULL
);


ALTER TABLE public.city OWNER TO postgres;

--
-- Name: country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.country (
    countryid integer NOT NULL,
    countryname character varying(50) NOT NULL,
    isocode character(3) NOT NULL,
    callingcode integer NOT NULL,
    currency character varying(10) NOT NULL,
    language character varying(10) NOT NULL,
    capitalcityid integer NOT NULL,
    biggestcityid integer NOT NULL,
    continent character varying(15) NOT NULL,
    area integer NOT NULL,
    population integer NOT NULL
);


ALTER TABLE public.country OWNER TO postgres;

--
-- Data for Name: city; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.city (cityid, cityname) FROM stdin;
\.
COPY public.city (cityid, cityname) FROM '$$PATH$$/3312.dat';

--
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.country (countryid, countryname, isocode, callingcode, currency, language, capitalcityid, biggestcityid, continent, area, population) FROM stdin;
\.
COPY public.country (countryid, countryname, isocode, callingcode, currency, language, capitalcityid, biggestcityid, continent, area, population) FROM '$$PATH$$/3313.dat';

--
-- Name: city city_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_pkey PRIMARY KEY (cityid);


--
-- Name: country country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (countryid);


--
-- Name: country country_biggestcityid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_biggestcityid_fkey FOREIGN KEY (biggestcityid) REFERENCES public.city(cityid);


--
-- Name: country country_capitalcityid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_capitalcityid_fkey FOREIGN KEY (capitalcityid) REFERENCES public.city(cityid);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          