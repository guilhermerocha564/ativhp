CREATE TABLE backhp (
    ID SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    casa VARCHAR(100) NOT NULL,
    habilidade VARCHAR(100) NOT NULL,
    sangue VARCHAR(100) NOT NULL,
    patrono VARCHAR(100)
);

CREATE TABLE varinhahp (
    ID SERIAL PRIMARY KEY,
    madeira VARCHAR(100) NOT NULL,
    comprimento VARCHAR(100) NOT NULL,
    nucleo VARCHAR(100) NOT NULL,
    datafabri VARCHAR(100) NOT NULL
);

