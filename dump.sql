--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	NEW.updated_date = NOW();
	RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ads (
    id integer NOT NULL,
    owner_id integer NOT NULL,
    type character varying(20) NOT NULL,
    title character varying(100) NOT NULL,
    description character varying(1000) NOT NULL,
    price numeric NOT NULL,
    picture character varying(150) DEFAULT NULL::character varying,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.ads OWNER TO postgres;

--
-- Name: ads_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ads_id_seq OWNER TO postgres;

--
-- Name: ads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ads_id_seq OWNED BY public.ads.id;


--
-- Name: fav; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fav (
    id integer NOT NULL,
    user_id integer NOT NULL,
    ad_id integer NOT NULL
);


ALTER TABLE public.fav OWNER TO postgres;

--
-- Name: fav_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fav_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fav_id_seq OWNER TO postgres;

--
-- Name: fav_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fav_id_seq OWNED BY public.fav.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(100) NOT NULL,
    is_superuser boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: ads id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ads ALTER COLUMN id SET DEFAULT nextval('public.ads_id_seq'::regclass);


--
-- Name: fav id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fav ALTER COLUMN id SET DEFAULT nextval('public.fav_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: ads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ads (id, owner_id, type, title, description, price, picture, created_date, updated_date) FROM stdin;
1	2	motoryzacja	Volvos60 2004r	Sprzedam Volvo s60 z 2004 roku po wypadku, silnik i skrzynia biegów stan idealny możliwość odpalenia, możliwość sprzedania na części. Więcej informacji udzielę telefonicznie.	4500.00	https://ireland.apollo.olxcdn.com/v1/files/u89xbbmp5xa31-PL/image;s=1000x700	2024-06-09 12:54:34.041757	2024-06-09 12:54:34.041757
2	3	motoryzacja	brixton crossfire 500	W dokumentach niemieckich wpisane 35 KW. Posiada dwie wgniotki na baku od lusterka, 2 kluczyki, stan jak nowy, opony i łańcuch jak nowe. Kontakt tylko telefoniczny 62 725 77 09 lub 7-9-1-2-8-6-2-1-7	20000.00	https://ireland.apollo.olxcdn.com/v1/files/qvunma2wg7d1-PL/image;s=1000x700	2024-06-09 12:54:34.041757	2024-06-09 12:54:34.041757
3	5	motoryzacja	Peugeot 308 1.6 HDI 120 km BUSINESS line 2017	Witam zainteresowanych Peugeotem 308 z dynamicznym silnikiem 1.6 HDI 120km BUSINESS line spalanie 4,9l. Rok produkcji 2017. Auto na co dzień użytkowane przez kobietę, zadbane, bezawaryjne. Sprzedaje z powodów finansowych. Ubezpieczenie OC ważne do 30.09.2024 Przegląd 3.10.2024 Zapraszam do kontaktu pod numerem telefonu 72*******22	30900.00	https://ireland.apollo.olxcdn.com/v1/files/sdm488bffpo52-PL/image;s=1000x700	2024-06-09 12:54:34.041757	2024-06-09 12:54:34.041757
4	4	elektronika	Gamingowy HP Victus 15-FA0193NW 15.6 IPS i5 8GB Ram 512GB SSD Gtx1650	Gamingowy HP Victus 15-FA0193NW 15.6 IPS i5 8GB Ram 512GB SSD Gtx1650. Stan prawie nowy. Kupiony w Maju 2023. Praktycznie leżał nieużywanu w szufladzie. W komplecie pudełko, zasilacz i dowów zakupu. Zainstalowany Win 11. Na obudowieledwo widoczna rysa (widoczne na zjdęciach) widać ją tylko pod odpowiednim kątem.	1970.00	https://ireland.apollo.olxcdn.com/v1/files/d4bb94yoacv1-PL/image;s=1000x700	2024-06-09 12:54:34.041757	2024-06-09 12:58:25.184925
5	5	dla dzieci	Lego Minifigures Series 17 Battle Dwarf	Oryginalna Lego Minifigures Seria 17 - Battle Dwarf Stan bardzo dobry, figurka była elementem kolekcji. Zapraszam do obejrzenia innych figurek	64.80	https://ireland.apollo.olxcdn.com/v1/files/2tfukc1rv8jv3-PL/image;s=1000x700	2024-06-10 19:32:11.351547	2024-06-10 19:32:11.351547
6	4	sport	Rower LIV Tempt S 29" 260km przebiegu	Cześć! Sprzedaję sprzęt mojej Pani - jednak nie pokochała tego rodzaju aktywności. Damski Giant, czyli Liv model Tempt. Zakupiony pod koniec lipca 2023 roku. Nadal na gwarancji. Przejechał raptem 260km. Rozmiar S na kołach 29". Amortyzator SR Suntour X1 o skoku 100mm z blokadą na kierownicy. Przerzutka tył Shimano Deore 9 blatów, przód Shimano Alivio 2 blaty. Hamulce tarczowe hydrauliczne przód/tył. Doposażony w licznik Gianta, koszyk i bidon Gianta, lampkę przednią i tylną oraz dzwonek. Zapraszam do oglądania, jazdy próbnej i zakupu. Pozdrawiam. Tomek	2999.0	https://ireland.apollo.olxcdn.com/v1/files/uacaohiny7i51-PL/image;s=1000x700	2024-06-10 19:32:11.351547	2024-06-10 19:32:11.351547
7	3	antyki i kolekcje	Karta kolekcjonerska topps match attax UEFA champions league. 2018	Sprzedaję niepotrzebne karty piłkarskie.	50.0	https://ireland.apollo.olxcdn.com/v1/files/vvyrf9m40vq61-PL/image;s=1000x700	2024-06-10 19:32:11.351547	2024-06-10 19:32:11.351547
\.


--
-- Data for Name: fav; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fav (id, user_id, ad_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, email, is_superuser) FROM stdin;
1	Admin	$2a$10$LnYqbseAHChtyWP0xdG33OgdOBrYYC04LbHu4h79WCsSAqntkG5wS	admin@amw.pl	t
2	Adam	$2a$10$mlQKWvzFs8LMLjb.Uk6DvuETwzRHEOOPfOcSeiGH9GYjj0iyEB2AG	adam@amw.pl	f
3	Bartosz	$2a$10$go1a0JgHLHckOWEQwnJLeuqbw3V1U9CDja/JAPqyKlVC.L4ZjrJXm	bartosz@amw.pl	f
4	Darek	$2a$10$lFaEsCZs9xzlIhiEUPfaruKEp2d5FR/61KWsf29edEfHzjIURM6LS	darek@amw.pl	f
5	Grzegorz	$2a$10$MeFr4NZCcu65gKRnZO1rgugl8GjomHx7eNbaahkAjTzSt7Sii8Xsu	grzegorz@amw.pl	f
\.


--
-- Name: ads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ads_id_seq', 7, true);


--
-- Name: fav_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fav_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: ads ads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT ads_pkey PRIMARY KEY (id);


--
-- Name: fav fav_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fav
    ADD CONSTRAINT fav_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: ads update_example_table_update_date; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_example_table_update_date BEFORE UPDATE ON public.ads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: fav fk_ad_favs; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fav
    ADD CONSTRAINT fk_ad_favs FOREIGN KEY (ad_id) REFERENCES public.ads(id) ON DELETE CASCADE;


--
-- Name: ads fk_owner_ad; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT fk_owner_ad FOREIGN KEY (owner_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: fav fk_user_favs; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fav
    ADD CONSTRAINT fk_user_favs FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

