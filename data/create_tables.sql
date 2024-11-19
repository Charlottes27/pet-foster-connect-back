BEGIN;

-- Suppression des tables existantes si elles sont déjà présentes
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS family;
DROP TABLE IF EXISTS association;
DROP TABLE IF EXISTS animal;
DROP TABLE IF EXISTS ask;

-- Création de la table des utilisateurs
CREATE TABLE "user" (
  id          SERIAL PRIMARY KEY,
  lastname    VARCHAR(50) NOT NULL,
  firstname   VARCHAR(50) NOT NULL,
  email       VARCHAR(100) NOT NULL,
  password    VARCHAR(255) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  role        VARCHAR(50) CHECK (role IN ('family', 'association', 'admin')) 
);

-- Création de la table des familles
CREATE TABLE family (
  id                 SERIAL PRIMARY KEY,
  address            VARCHAR(255) NOT NULL,
  postal_code        CHAR(5) NOT NULL, 
  city               VARCHAR(50) NOT NULL, 
  phone              VARCHAR(15) NOT NULL,
  number_of_children INT,
  number_of_animals  INT,
  garden             BOOLEAN,
  description        TEXT,
  profile_photo      VARCHAR(255),
  id_user            INT NOT NULL UNIQUE REFERENCES "user"(id) ON DELETE CASCADE,
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Création de la table des associations
CREATE TABLE association (
  id                 SERIAL PRIMARY KEY,
  rna_number         VARCHAR(42) UNIQUE NOT NULL,
  representative     VARCHAR(100) NOT NULL,
  address            VARCHAR(255) NOT NULL,
  postal_code        CHAR(5) NOT NULL, 
  city               VARCHAR(50) NOT NULL, 
  phone              VARCHAR(15) NOT NULL,
  description        TEXT,
  status             VARCHAR(15) NOT NULL,
  profile_photo      VARCHAR(255),
  id_user            INT NOT NULL UNIQUE REFERENCES "user"(id) ON DELETE CASCADE,
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table des animaux
CREATE TABLE animal (
  id               SERIAL PRIMARY KEY,
  name             VARCHAR(50) NOT NULL,
  species          VARCHAR(30) NOT NULL,
  breed            VARCHAR(50) NOT NULL,
  gender           CHAR(1) NOT NULL,
  age              INT NOT NULL,
  size             VARCHAR(30) NOT NULL,
  description      TEXT,
  profile_photo    VARCHAR(255),
  photo1           VARCHAR(255),
  photo2           VARCHAR(255),
  photo3           VARCHAR(255),
  id_family        INT REFERENCES family(id),
  id_association   INT NOT NULL REFERENCES association(id) ON DELETE CASCADE,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table des demandes entre familles et animaux
CREATE TABLE ask (
  id         SERIAL PRIMARY KEY,
  status     VARCHAR(15) NOT NULL,
  id_family  INT NOT NULL REFERENCES family(id) ON DELETE CASCADE,
  id_animal  INT NOT NULL REFERENCES animal(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fonction pour mettre à jour le timestamp automatiquement lors des modifications
CREATE OR REPLACE FUNCTION update_timestamp() 
RETURNS TRIGGER AS $$ 
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END; 
$$ LANGUAGE plpgsql;

-- Triggers pour mettre à jour les timestamps lors des modifications
CREATE TRIGGER update_animal_timestamp
BEFORE UPDATE ON animal
FOR EACH ROW 
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_association_timestamp
BEFORE UPDATE ON association
FOR EACH ROW 
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_family_timestamp
BEFORE UPDATE ON family
FOR EACH ROW 
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_user_timestamp
BEFORE UPDATE ON "user"
FOR EACH ROW 
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_ask_timestamp
BEFORE UPDATE ON ask
FOR EACH ROW 
EXECUTE FUNCTION update_timestamp();

COMMIT;
