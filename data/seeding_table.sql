-- Insertion dans la table "user"
INSERT INTO "user" (lastname, firstname, email, password, role) VALUES
('Dupont', 'Jean', 'jean.dupont@email.com', 'hashedpassword1', 'family'),
('Martin', 'Sophie', 'sophie.martin@email.com', 'hashedpassword2', 'family'),
('Durand', 'Hugo', 'hugo.durand@email.com', 'hashedpassword3', 'family'),
('Leroy', 'Léa', 'lea.leroy@email.com', 'hashedpassword4', 'family'),
('Moreau', 'Luc', 'luc.moreau@email.com', 'hashedpassword5', 'family'),
('Dubois', 'Pierre', 'pierre.dubois@email.com', 'hashedpassword6', 'association'),
('Lefebvre', 'Marie', 'marie.lefebvre@email.com', 'hashedpassword7', 'association'),
('Bernard', 'Alice', 'alice.bernard@email.com', 'hashedpassword8', 'association'),
('Thomas', 'Paul', 'paul.thomas@email.com', 'hashedpassword9', 'association'),
('Robert', 'Emma', 'emma.robert@email.com', 'hashedpassword10', 'association'),
('Giraud', 'Antoine', 'antoine.giraud@email.com', 'hashedpassword11', 'family'),
('Henry', 'Camille', 'camille.henry@email.com', 'hashedpassword12', 'family'),
('Simon', 'Nicolas', 'nicolas.simon@email.com', 'hashedpassword13', 'family'),
('Roussel', 'Julie', 'julie.roussel@email.com', 'hashedpassword14', 'family'),
('Bourgeois', 'Philippe', 'philippe.bourgeois@email.com', 'hashedpassword15', 'family'),
('Morin', 'Lucie', 'lucie.morin@email.com', 'hashedpassword16', 'association'),
('Vasseur', 'Julien', 'julien.vasseur@email.com', 'hashedpassword17', 'family'),
('Meyer', 'Clara', 'clara.meyer@email.com', 'hashedpassword18', 'family'),
('Collet', 'Maxime', 'maxime.collet@email.com', 'hashedpassword19', 'association'),
('Aubert', 'Cécile', 'cecile.aubert@email.com', 'hashedpassword20', 'association'),
('Pichon', 'Louis', 'louis.pichon@email.com', 'hashedpassword21', 'association'),
('Morel', 'Lucie', 'lucie.morel@email.com', 'hashedpassword22', 'family'),
('Garnier', 'Raphaël', 'raphael.garnier@email.com', 'hashedpassword23', 'association'),
('David', 'Alice', 'alice.david@email.com', 'hashedpassword24', 'family');

-- Insertion dans la table "family"
INSERT INTO family (address, postal_code, city, phone, number_of_children, number_of_animals, garden, description, profile_photo, id_user) VALUES
('123 Rue de la Paix', '75002', 'Paris', '0123456789', 2, 1, true, 'Famille Dupont avec un grand jardin.', 'images/users/Dupontjean-fa.webp', 1),
('456 Avenue des Champs-Élysées', '75008', 'Paris', '0987654321', 1, 0, false, 'Famille Martin vivant dans un petit appartement.', 'images/users/Martinsophie-fa.webp', 2),
('789 Boulevard Haussmann', '75008', 'Paris', '0123987456', 3, 2, true, 'Famille Durand avec une grande maison.', 'images/users/Durandhugo-fa.webp', 3),
('321 Rue de la Liberté', '69003', 'Lyon', '0147253689', 2, 1, true, 'Famille Leroy aimant les chiens.', 'images/users/Leroylea-fa.webp', 4),
('654 Avenue des Fleurs', '13001', 'Marseille', '0198765432', 1, 3, true, 'Famille Moreau avec plusieurs animaux.', 'images/users/Moreauluc-fa.webp', 5),
('12 Rue des Oliviers', '06000', 'Nice', '0678901234', 2, 2, false, 'Famille Giraud dans un appartement spacieux.', 'images/users/Giraudantoine-fa.webp', 11),
('14 Avenue des Arbres', '33000', 'Bordeaux', '0612345678', 3, 1, true, 'Famille Henry aimant la nature.', 'images/users/Henrycamille-fa.webp', 12),
('78 Rue du Soleil', '31000', 'Toulouse', '0556123456', 2, 0, true, 'Famille Simon proche de la campagne.', 'images/users/Simonnicolas-fa.webp', 13),
('90 Avenue des Étoiles', '13001', 'Marseille', '0543210987', 4, 1, false, 'Famille Roussel avec plusieurs enfants.', 'images/users/Rousseljulie-fa.webp', 14),
('23 Rue de la Mer', '59000', 'Lille', '0634567890', 1, 0, true, 'Famille Bourgeois vivant en bord de mer.', 'images/users/Bourgeoisphilippe-fa.webp', 15),
('45 Avenue du Lac', '34000', 'Montpellier', '0645123456', 3, 2, false, 'Famille Vasseur avec des enfants et des animaux.', 'images/users/Vasseurjulien-fa.webp', 17),
('67 Boulevard des Jardins', '75014', 'Paris', '0621345678', 2, 1, true, 'Famille Meyer passionnée de jardinage.', 'images/users/Meyerclara-fa.webp', 18),
('89 Rue des Champs', '69006', 'Lyon', '0656789123', 2, 0, true, 'Famille Aubert avec un grand jardin.', 'images/users/Aubertcecile-fa.webp', 20),
('101 Avenue de la Liberté', '44000', 'Nantes', '0678901235', 3, 2, false, 'Famille Morel avec des animaux exotiques.', 'images/users/Morellouis-fa.webp', 22),
('23 Rue des Belles Vues', '38000', 'Grenoble', '0689123456', 0, 0, true, 'Famille David accueillant des voyageurs.', 'images/users/Davidalice-fa.webp', 24);


-- Insertion dans la table "association"
INSERT INTO association (rna_number, representative, address, postal_code, city, phone, description, status, profile_photo, id_user) VALUES
('W123456789', 'Pierre Dubois', '10 Rue des Associations', '69000', 'Lyon', '0654321987', 'Association de protection des chiens et chats', 'actif', 'images/users/Duboispierre-asso.webp', 6),
('W987654321', 'Marie Lefebvre', '20 Avenue des Bénévoles', '13000', 'Marseille', '0798765432', 'Refuge pour chiens et chats en détresse', 'actif', 'images/users/Lefebvremarie-asso.webp', 7),
('W234567890', 'Alice Bernard', '30 Rue du Secours', '31000', 'Toulouse', '0612345678', 'Refuge pour animaux abandonnés et maltraités', 'actif', 'images/users/Bernardalice-asso.webp', 8),
('W345678901', 'Paul Thomas', '40 Avenue des Animaux', '44000', 'Nantes', '0723456789', 'Association de défense des droits des chiens et chats', 'actif', 'images/users/Thomaspaul-asso.webp', 9),
('W456789012', 'Emma Robert', '50 Boulevard des Oiseaux', '67000', 'Strasbourg', '0834567890', 'Refuge pour animaux domestiques blessés', 'actif', 'images/users/Robertemma-asso.webp', 10),
('W567890123', 'Lucie Morin', '60 Rue des Chevaux', '59000', 'Lille', '0945678901', 'Sauvetage des chiens et chats en détresse', 'actif', 'images/users/Morinlucie-asso.webp', 16),
('W678901234', 'Maxime Collet', '70 Avenue des Rongeurs', '33000', 'Bordeaux', '0756789012', 'Refuge pour petits chiens et chats maltraités', 'actif', 'images/users/Colletmaxime-asso.webp', 19),
('W789012345', 'Louis Pichon', '80 Rue de la Protection', '06000', 'Nice', '0867890123', 'Protection des animaux domestiques', 'actif', 'images/users/Pichonlouis-asso.webp', 21),
('W890123456', 'Raphaël Garnier', '90 Boulevard des Exotiques', '35000', 'Rennes', '0978901234', 'Refuge pour animaux en danger', 'actif', 'images/users/Garnierraphael-asso.webp', 23),
('W901234567', 'Cécile Aubert', '100 Avenue de la Faune', '34000', 'Montpellier', '0856789012', 'Sauvegarde des animaux domestiques', 'actif', 'images/users/Aubertcecile-asso.webp', 20);


-- Insertion dans la table animal
INSERT INTO animal (name, species, breed, gender, age, size, description, profile_photo, photo1, photo2, photo3, id_association) VALUES
('Rex', 'Chien', 'Labrador', 'M', 3, 'Grand', 'Chien joueur et affectueux', 'images/animals_profile/1.webp', 'images/animals_photo1/1.webp', 'images/animals_photo2/1.webp', 'images/animals_photo3/1.webp', 1),
('Buddy', 'Chien', 'Golden Retriever', 'M', 5, 'Grand', 'Chien bien dressé et amical', 'images/animals_profile/2.webp', 'images/animals_photo1/2.webp', 'images/animals_photo2/2.webp', 'images/animals_photo3/2.webp', 1),
('Max', 'Chien', 'Beagle', 'M', 4, 'Moyen', 'Chien curieux et affectueux', 'images/animals_profile/3.webp', 'images/animals_photo1/3.webp', 'images/animals_photo2/3.webp', 'images/animals_photo3/3.webp', 1),
('Bella', 'Chien', 'Berger Allemand', 'F', 2, 'Grand', 'Chienne protectrice et loyale', 'images/animals_profile/4.webp', 'images/animals_photo1/4.webp', 'images/animals_photo2/4.webp', 'images/animals_photo3/4.webp', 1),
('Charlie', 'Chien', 'Boxer', 'M', 6, 'Grand', 'Chien énergique et joueur', 'images/animals_profile/5.webp', 'images/animals_photo1/5.webp', 'images/animals_photo2/5.webp', 'images/animals_photo3/5.webp', 1),
('Daisy', 'Chien', 'Poodle', 'F', 3, 'Moyen', 'Chienne douce et intelligente', 'images/animals_profile/6.webp', 'images/animals_photo1/6.webp', 'images/animals_photo2/6.webp', 'images/animals_photo3/6.webp', 1),
('Rocky', 'Chien', 'Chihuahua', 'M', 2, 'Petit', 'Chien courageux et loyal', 'images/animals_profile/7.webp', 'images/animals_photo1/7.webp', 'images/animals_photo2/7.webp', 'images/animals_photo3/7.webp', 1),
('Lucy', 'Chien', 'Yorkshire Terrier', 'F', 1, 'Petit', 'Chienne affectueuse et énergique', 'images/animals_profile/8.webp', 'images/animals_photo1/8.webp', 'images/animals_photo2/8.webp', 'images/animals_photo3/8.webp', 1),
('Bailey', 'Chien', 'French Bulldog', 'M', 3, 'Moyen', 'Chien sociable et joueur', 'images/animals_profile/9.webp', 'images/animals_photo1/9.webp', 'images/animals_photo2/9.webp', 'images/animals_photo3/9.webp', 1),
('Coco', 'Chien', 'Shih Tzu', 'F', 5, 'Petit', 'Chienne joyeuse et amicale', 'images/animals_profile/10.webp', 'images/animals_photo1/10.webp', 'images/animals_photo2/10.webp', 'images/animals_photo3/10.webp', 1),
('Luna', 'Chien', 'Dachshund', 'F', 4, 'Petit', 'Chienne espiègle et curieuse', 'images/animals_profile/11.webp', 'images/animals_photo1/11.webp', 'images/animals_photo2/11.webp', 'images/animals_photo3/11.webp', 1),
('Molly', 'Chien', 'Siberian Husky', 'F', 3, 'Grand', 'Chienne énergique et aventureuse', 'images/animals_profile/12.webp', 'images/animals_photo1/12.webp', 'images/animals_photo2/12.webp', 'images/animals_photo3/12.webp', 2),
('Oreo', 'Chien', 'Maltese', 'M', 5, 'Petit', 'Chien affectueux et joueur', 'images/animals_profile/13.webp', 'images/animals_photo1/13.webp', 'images/animals_photo2/13.webp', 'images/animals_photo3/13.webp', 2),
('Roxy', 'Chien', 'Bull Terrier', 'F', 2, 'Moyen', 'Chienne amicale et joyeuse', 'images/animals_profile/14.webp', 'images/animals_photo1/14.webp', 'images/animals_photo2/14.webp', 'images/animals_photo3/14.webp', 2),
('Shadow', 'Chien', 'Doberman', 'M', 4, 'Grand', 'Chien protecteur et intelligent', 'images/animals_profile/15.webp', 'images/animals_photo1/15.webp', 'images/animals_photo2/15.webp', 'images/animals_photo3/15.webp', 2),
('Sasha', 'Chien', 'Pug', 'F', 3, 'Petit', 'Chienne amusante et pleine de vie', 'images/animals_profile/16.webp', 'images/animals_photo1/16.webp', 'images/animals_photo2/16.webp', 'images/animals_photo3/16.webp', 2),
('Simba', 'Chat', 'Siamese', 'M', 2, 'Moyen', 'Chat affectueux et sociable', 'images/animals_profile/17.webp', 'images/animals_photo1/17.webp', 'images/animals_photo2/17.webp', 'images/animals_photo3/17.webp', 2),
('Mittens', 'Chat', 'Persian', 'F', 4, 'Moyen', 'Chat doux et calme', 'images/animals_profile/18.webp', 'images/animals_photo1/18.webp', 'images/animals_photo2/18.webp', 'images/animals_photo3/18.webp', 2),
('Oliver', 'Chat', 'Bengal', 'M', 1, 'Petit', 'Chat curieux et énergique', 'images/animals_profile/19.webp', 'images/animals_photo1/19.webp', 'images/animals_photo2/19.webp', 'images/animals_photo3/19.webp', 2),
('Lily', 'Chat', 'Maine Coon', 'F', 5, 'Grand', 'Chat joueur et affectueux', 'images/animals_profile/20.webp', 'images/animals_photo1/20.webp', 'images/animals_photo2/20.webp', 'images/animals_photo3/20.webp', 2),
('Chester', 'Chat', 'British Shorthair', 'M', 3, 'Moyen', 'Chat tranquille et amical', 'images/animals_profile/21.webp', 'images/animals_photo1/21.webp', 'images/animals_photo2/21.webp', 'images/animals_photo3/21.webp', 3),
('Sophie', 'Chat', 'Ragdoll', 'F', 4, 'Grand', 'Chat doux et affectueux', 'images/animals_profile/22.webp', 'images/animals_photo1/22.webp', 'images/animals_photo2/22.webp', 'images/animals_photo3/22.webp', 3),
('Nala', 'Chat', 'Sphynx', 'F', 2, 'Petit', 'Chat curieux et plein de vie', 'images/animals_profile/23.webp', 'images/animals_photo1/23.webp', 'images/animals_photo2/23.webp', 'images/animals_photo3/23.webp', 3),
('Tigger', 'Chat', 'Tabby', 'M', 3, 'Moyen', 'Chat joueur et espiègle', 'images/animals_profile/24.webp', 'images/animals_photo1/24.webp', 'images/animals_photo2/24.webp', 'images/animals_photo3/24.webp', 3),
('Milo', 'Chat', 'Siamese', 'M', 1, 'Petit', 'Chat affectueux et joueur', 'images/animals_profile/25.webp', 'images/animals_photo1/25.webp', 'images/animals_photo2/25.webp', 'images/animals_photo3/25.webp', 3),
('Leo', 'Chien', 'Rottweiler', 'M', 6, 'Grand', 'Chien loyal et protecteur', 'images/animals_profile/26.webp', 'images/animals_photo1/26.webp', 'images/animals_photo2/26.webp', 'images/animals_photo3/26.webp', 3),
('Coco', 'Chien', 'Cocker Spaniel', 'F', 5, 'Moyen', 'Chienne amicale et douce', 'images/animals_profile/27.webp', 'images/animals_photo1/27.webp', 'images/animals_photo2/27.webp', 'images/animals_photo3/27.webp', 3),
('Rocky', 'Chien', 'Rottweiler', 'M', 6, 'Grand', 'Chien protecteur et fidèle', 'images/animals_profile/28.webp', 'images/animals_photo1/28.webp', 'images/animals_photo2/28.webp', 'images/animals_photo3/28.webp', 3),
('Toby', 'Chien', 'Shih Tzu', 'M', 4, 'Petit', 'Chien câlin et joyeux', 'images/animals_profile/29.webp', 'images/animals_photo1/29.webp', 'images/animals_photo2/29.webp', 'images/animals_photo3/29.webp', 3),
('Ziggy', 'Chien', 'Pitbull', 'F', 2, 'Moyen', 'Chienne espiègle et affectueuse', 'images/animals_profile/30.webp', 'images/animals_photo1/30.webp', 'images/animals_photo2/30.webp', 'images/animals_photo3/30.webp', 3),
('Bella', 'Chien', 'Chihuahua', 'F', 3, 'Petit', 'Chienne protectrice et mignonne', 'images/animals_profile/31.webp', 'images/animals_photo1/31.webp', 'images/animals_photo2/31.webp', 'images/animals_photo3/31.webp', 4),
('Gizmo', 'Chien', 'Maltese', 'M', 1, 'Petit', 'Chien joueur et curieux', 'images/animals_profile/32.webp', 'images/animals_photo1/32.webp', 'images/animals_photo2/32.webp', 'images/animals_photo3/32.webp', 4),
('Penny', 'Chien', 'Dachshund', 'F', 4, 'Petit', 'Chienne douce et affectueuse', 'images/animals_profile/33.webp', 'images/animals_photo1/33.webp', 'images/animals_photo2/33.webp', 'images/animals_photo3/33.webp', 4),
('Daisy', 'Chien', 'Poodle', 'F', 4, 'Moyen', 'Chienne douce et intelligente', 'images/animals_profile/34.webp', 'images/animals_photo1/34.webp', 'images/animals_photo2/34.webp', 'images/animals_photo3/34.webp', 4),
('Luna', 'Chien', 'Boxer', 'F', 3, 'Grand', 'Chienne protectrice et aimante', 'images/animals_profile/35.webp', 'images/animals_photo1/35.webp', 'images/animals_photo2/35.webp', 'images/animals_photo3/35.webp', 4),
('Rusty', 'Chien', 'Australian Shepherd', 'M', 5, 'Grand', 'Chien intelligent et actif', 'images/animals_profile/36.webp', 'images/animals_photo1/36.webp', 'images/animals_photo2/36.webp', 'images/animals_photo3/36.webp', 4),
('Annie', 'Chien', 'Terrier', 'F', 2, 'Moyen', 'Chienne espiègle et curieuse', 'images/animals_profile/37.webp', 'images/animals_photo1/37.webp', 'images/animals_photo2/37.webp', 'images/animals_photo3/37.webp', 4),
('Zara', 'Chien', 'Husky', 'F', 3, 'Grand', 'Chienne aventureuse et pleine de vie', 'images/animals_profile/38.webp', 'images/animals_photo1/38.webp', 'images/animals_photo2/38.webp', 'images/animals_photo3/38.webp', 4),
('Pepper', 'Chat', 'American Shorthair', 'M', 2, 'Moyen', 'Chat énergique et curieux', 'images/animals_profile/39.webp', 'images/animals_photo1/39.webp', 'images/animals_photo2/39.webp', 'images/animals_photo3/39.webp', 4),
('Cleo', 'Chat', 'Sphynx', 'F', 4, 'Petit', 'Chat affectueux et joueur', 'images/animals_profile/40.webp', 'images/animals_photo1/40.webp', 'images/animals_photo2/40.webp', 'images/animals_photo3/40.webp', 4),
('Rocky', 'Chat', 'Scottish Fold', 'M', 3, 'Moyen', 'Chat calme et amical', 'images/animals_profile/41.webp', 'images/animals_photo1/41.webp', 'images/animals_photo2/41.webp', 'images/animals_photo3/41.webp', 5),
('Chloe', 'Chat', 'Bengal', 'F', 2, 'Moyen', 'Chat intelligent et joueur', 'images/animals_profile/42.webp', 'images/animals_photo1/42.webp', 'images/animals_photo2/42.webp', 'images/animals_photo3/42.webp', 5),
('Frankie', 'Chien', 'Husky', 'M', 5, 'Grand', 'Chien fort et protecteur', 'images/animals_profile/43.webp', 'images/animals_photo1/43.webp', 'images/animals_photo2/43.webp', 'images/animals_photo3/43.webp', 5),
('Misty', 'Chien', 'Australian Shepherd', 'F', 3, 'Grand', 'Chienne amicale et énergique', 'images/animals_profile/44.webp', 'images/animals_photo1/44.webp', 'images/animals_photo2/44.webp', 'images/animals_photo3/44.webp', 5),
('Sammy', 'Chien', 'Dachshund', 'M', 1, 'Petit', 'Chien curieux et joueur', 'images/animals_profile/45.webp', 'images/animals_photo1/45.webp', 'images/animals_photo2/45.webp', 'images/animals_photo3/45.webp', 5),
('Peanut', 'Chien', 'Chihuahua', 'F', 2, 'Petit', 'Chienne espiègle et mignonne', 'images/animals_profile/46.webp', 'images/animals_photo1/46.webp', 'images/animals_photo2/46.webp', 'images/animals_photo3/46.webp', 5),
('Willow', 'Chat', 'Maine Coon', 'F', 6, 'Grand', 'Chat doux et affectueux', 'images/animals_profile/47.webp', 'images/animals_photo1/47.webp', 'images/animals_photo2/47.webp', 'images/animals_photo3/47.webp', 5),
('Jasper', 'Chat', 'Siamese', 'M', 4, 'Moyen', 'Chat joueur et sociable', 'images/animals_profile/48.webp', 'images/animals_photo1/48.webp', 'images/animals_photo2/48.webp', 'images/animals_photo3/48.webp', 5),
('Nemo', 'Chien', 'Golden Retriever', 'M', 2, 'Grand', 'Chien joyeux et amical', 'images/animals_profile/49.webp', 'images/animals_photo1/49.webp', 'images/animals_photo2/49.webp', 'images/animals_photo3/49.webp', 5),
('Bella', 'Chat', 'Ragdoll', 'F', 5, 'Grand', 'Chat affectueux et doux', 'images/animals_profile/50.webp', 'images/animals_photo1/50.webp', 'images/animals_photo2/50.webp', 'images/animals_photo3/50.webp', 5),
('Jack', 'Chien', 'Border Collie', 'M', 3, 'Grand', 'Chien intelligent et agile', 'images/animals_profile/51.webp', 'images/animals_photo1/51.webp', 'images/animals_photo2/51.webp', 'images/animals_photo3/51.webp', 6),
('Duke', 'Chien', 'Saint Bernard', 'M', 5, 'Très Grand', 'Chien amical et protecteur', 'images/animals_profile/52.webp', 'images/animals_photo1/52.webp', 'images/animals_photo2/52.webp', 'images/animals_photo3/52.webp', 6),
('Riley', 'Chien', 'Cocker Spaniel', 'F', 4, 'Moyen', 'Chienne douce et affectueuse', 'images/animals_profile/53.webp', 'images/animals_photo1/53.webp', 'images/animals_photo2/53.webp', 'images/animals_photo3/53.webp', 6),
('Zoe', 'Chien', 'Australian Shepherd', 'F', 2, 'Moyen', 'Chienne énergique et joueuse', 'images/animals_profile/54.webp', 'images/animals_photo1/54.webp', 'images/animals_photo2/54.webp', 'images/animals_photo3/54.webp', 6),
('Finn', 'Chien', 'Papillon', 'M', 3, 'Petit', 'Chien intelligent et amical', 'images/animals_profile/55.webp', 'images/animals_photo1/55.webp', 'images/animals_photo2/55.webp', 'images/animals_photo3/55.webp', 6),
('Ruby', 'Chien', 'Shiba Inu', 'F', 4, 'Moyen', 'Chienne indépendante et loyale', 'images/animals_profile/56.webp', 'images/animals_photo1/56.webp', 'images/animals_photo2/56.webp', 'images/animals_photo3/56.webp', 6),
('Teddy', 'Chien', 'Newfoundland', 'M', 6, 'Très Grand', 'Chien protecteur et doux', 'images/animals_profile/57.webp', 'images/animals_photo1/57.webp', 'images/animals_photo2/57.webp', 'images/animals_photo3/57.webp', 6),
('Nina', 'Chien', 'Greyhound', 'F', 3, 'Grand', 'Chienne rapide et affectueuse', 'images/animals_profile/58.webp', 'images/animals_photo1/58.webp', 'images/animals_photo2/58.webp', 'images/animals_photo3/58.webp', 6),
('Yuki', 'Chien', 'Akita', 'M', 5, 'Grand', 'Chien courageux et fidèle', 'images/animals_profile/59.webp', 'images/animals_photo1/59.webp', 'images/animals_photo2/59.webp', 'images/animals_photo3/59.webp', 6),
('Ginger', 'Chien', 'Bichon Frise', 'F', 2, 'Petit', 'Chienne joyeuse et affectueuse', 'images/animals_profile/60.webp', 'images/animals_photo1/60.webp', 'images/animals_photo2/60.webp', 'images/animals_photo3/60.webp', 6),
('Scout', 'Chien', 'Bloodhound', 'M', 4, 'Grand', 'Chien très affectueux et curieux', 'images/animals_profile/61.webp', 'images/animals_photo1/61.webp', 'images/animals_photo2/61.webp', 'images/animals_photo3/61.webp', 7),
('Harley', 'Chien', 'Hound', 'M', 3, 'Moyen', 'Chien amical et protecteur', 'images/animals_profile/62.webp', 'images/animals_photo1/62.webp', 'images/animals_photo2/62.webp', 'images/animals_photo3/62.webp', 7),
('Piper', 'Chien', 'Shetland Sheepdog', 'F', 2, 'Moyen', 'Chienne vive et amicale', 'images/animals_profile/63.webp', 'images/animals_photo1/63.webp', 'images/animals_photo2/63.webp', 'images/animals_photo3/63.webp', 7),
('Juno', 'Chien', 'Boston Terrier', 'F', 3, 'Petit', 'Chienne sociable et vive', 'images/animals_profile/64.webp', 'images/animals_photo1/64.webp', 'images/animals_photo2/64.webp', 'images/animals_photo3/64.webp', 7),
('Murphy', 'Chien', 'Chesapeake Bay Retriever', 'M', 5, 'Grand', 'Chien loyal et protecteur', 'images/animals_profile/65.webp', 'images/animals_photo1/65.webp', 'images/animals_photo2/65.webp', 'images/animals_photo3/65.webp', 7),
('Maggie', 'Chien', 'Labradoodle', 'F', 4, 'Moyen', 'Chienne amicale et affectueuse', 'images/animals_profile/66.webp', 'images/animals_photo1/66.webp', 'images/animals_photo2/66.webp', 'images/animals_photo3/66.webp', 7),
('Ranger', 'Chien', 'American Bulldog', 'M', 6, 'Grand', 'Chien puissant et protecteur', 'images/animals_profile/67.webp', 'images/animals_photo1/67.webp', 'images/animals_photo2/67.webp', 'images/animals_photo3/67.webp', 7),
('Tina', 'Chien', 'Catahoula Leopard Dog', 'F', 3, 'Moyen', 'Chienne énergique et indépendante', 'images/animals_profile/68.webp', 'images/animals_photo1/68.webp', 'images/animals_photo2/68.webp', 'images/animals_photo3/68.webp', 7),
('Oliver', 'Chat', 'Norwegian Forest Cat', 'M', 4, 'Grand', 'Chat doux et joueur', 'images/animals_profile/69.webp', 'images/animals_photo1/69.webp', 'images/animals_photo2/69.webp', 'images/animals_photo3/69.webp', 7),
('Sasha', 'Chat', 'Abyssinian', 'F', 2, 'Moyen', 'Chat curieux et énergique', 'images/animals_profile/70.webp', 'images/animals_photo1/70.webp', 'images/animals_photo2/70.webp', 'images/animals_photo3/70.webp', 7),

('Toby', 'Chat', 'Himalayan', 'M', 5, 'Grand', 'Chat calme et doux', 'images/animals_profile/71.webp', 'images/animals_photo1/71.webp', 'images/animals_photo2/71.webp', 'images/animals_photo3/71.webp', 7),
('Misty', 'Chat', 'Oriental Shorthair', 'F', 3, 'Moyen', 'Chat sociable et affectueux', 'images/animals_profile/72.webp', 'images/animals_photo1/72.webp', 'images/animals_photo2/72.webp', 'images/animals_photo3/72.webp', 7),
('Rusty', 'Chat', 'Egyptian Mau', 'M', 5, 'Moyen', 'Chat énergique et curieux', 'images/animals_profile/85.webp', 'images/animals_photo1/85.webp', 'images/animals_photo2/85.webp', 'images/animals_photo3/85.webp', 9),
('Pip', 'Chat', 'Khao Manee', 'F', 2, 'Petit', 'Chat joyeux et joueur', 'images/animals_profile/86.webp', 'images/animals_photo1/86.webp', 'images/animals_photo2/86.webp', 'images/animals_photo3/86.webp', 9),
('Bailey', 'Chien', 'Beagle', 'M', 3, 'Moyen', 'Chien curieux et plein d’énergie', 'images/animals_profile/87.webp', 'images/animals_photo1/87.webp', 'images/animals_photo2/87.webp', 'images/animals_photo3/87.webp', 10),
('Daisy', 'Chien', 'Golden Retriever', 'F', 4, 'Grand', 'Chienne douce et amicale', 'images/animals_profile/88.webp', 'images/animals_photo1/88.webp', 'images/animals_photo2/88.webp', 'images/animals_photo3/88.webp', 10),
('Milo', 'Chat', 'Ragdoll', 'M', 2, 'Grand', 'Chat affectueux et câlin', 'images/animals_profile/89.webp', 'images/animals_photo1/89.webp', 'images/animals_photo2/89.webp', 'images/animals_photo3/89.webp', 10),
('Ruby', 'Chat', 'Bengal', 'F', 5, 'Moyen', 'Chat actif et joueur', 'images/animals_profile/90.webp', 'images/animals_photo1/90.webp', 'images/animals_photo2/90.webp', 'images/animals_photo3/90.webp', 10),
('Rocky', 'Chien', 'Siberian Husky', 'M', 6, 'Grand', 'Chien énergique et aventurier', 'images/animals_profile/91.webp', 'images/animals_photo1/91.webp', 'images/animals_photo2/91.webp', 'images/animals_photo3/91.webp', 10),
('Chloe', 'Chien', 'Cavalier King Charles Spaniel', 'F', 2, 'Petit', 'Chienne affectueuse et douce', 'images/animals_profile/92.webp', 'images/animals_photo1/92.webp', 'images/animals_photo2/92.webp', 'images/animals_photo3/92.webp', 10),
('Jasper', 'Chat', 'Siamese', 'M', 3, 'Moyen', 'Chat vocal et social', 'images/animals_profile/93.webp', 'images/animals_photo1/93.webp', 'images/animals_photo2/93.webp', 'images/animals_photo3/93.webp', 10),
('Trixie', 'Chat', 'Maine Coon', 'F', 4, 'Grand', 'Chat joueur et curieux', 'images/animals_profile/94.webp', 'images/animals_photo1/94.webp', 'images/animals_photo2/94.webp', 'images/animals_photo3/94.webp', 10),
('Shadow', 'Chien', 'Labrador', 'M', 5, 'Grand', 'Chien loyal et protecteur', 'images/animals_profile/95.webp', 'images/animals_photo1/95.webp', 'images/animals_photo2/95.webp', 'images/animals_photo3/95.webp', 10),
('Bella', 'Chien', 'Pomeranian', 'F', 1, 'Petit', 'Chienne vive et espiègle', 'images/animals_profile/96.webp', 'images/animals_photo1/96.webp', 'images/animals_photo2/96.webp', 'images/animals_photo3/96.webp', 10),
('Rusty', 'Chat', 'Egyptian Mau', 'M', 5, 'Moyen', 'Chat énergique et curieux', 'images/animals_profile/85.webp', 'images/animals_photo1/85.webp', 'images/animals_photo2/85.webp', 'images/animals_photo3/85.webp', 9),
('Pip', 'Chat', 'Khao Manee', 'F', 2, 'Petit', 'Chat joyeux et joueur', 'images/animals_profile/86.webp', 'images/animals_photo1/86.webp', 'images/animals_photo2/86.webp', 'images/animals_photo3/86.webp', 9),
('Bailey', 'Chien', 'Beagle', 'M', 3, 'Moyen', 'Chien curieux et plein d’énergie', 'images/animals_profile/87.webp', 'images/animals_photo1/87.webp', 'images/animals_photo2/87.webp', 'images/animals_photo3/87.webp', 10),
('Daisy', 'Chien', 'Golden Retriever', 'F', 4, 'Grand', 'Chienne douce et amicale', 'images/animals_profile/88.webp', 'images/animals_photo1/88.webp', 'images/animals_photo2/88.webp', 'images/animals_photo3/88.webp', 10),
('Milo', 'Chat', 'Ragdoll', 'M', 2, 'Grand', 'Chat affectueux et câlin', 'images/animals_profile/89.webp', 'images/animals_photo1/89.webp', 'images/animals_photo2/89.webp', 'images/animals_photo3/89.webp', 10),
('Ruby', 'Chat', 'Bengal', 'F', 5, 'Moyen', 'Chat actif et joueur', 'images/animals_profile/90.webp', 'images/animals_photo1/90.webp', 'images/animals_photo2/90.webp', 'images/animals_photo3/90.webp', 10),
('Rocky', 'Chien', 'Siberian Husky', 'M', 6, 'Grand', 'Chien énergique et aventurier', 'images/animals_profile/91.webp', 'images/animals_photo1/91.webp', 'images/animals_photo2/91.webp', 'images/animals_photo3/91.webp', 10),
('Chloe', 'Chien', 'Cavalier King Charles Spaniel', 'F', 2, 'Petit', 'Chienne affectueuse et douce', 'images/animals_profile/92.webp', 'images/animals_photo1/92.webp', 'images/animals_photo2/92.webp', 'images/animals_photo3/92.webp', 10),
('Jasper', 'Chat', 'Siamese', 'M', 3, 'Moyen', 'Chat vocal et social', 'images/animals_profile/93.webp', 'images/animals_photo1/93.webp', 'images/animals_photo2/93.webp', 'images/animals_photo3/93.webp', 10),
('Trixie', 'Chat', 'Maine Coon', 'F', 4, 'Grand', 'Chat joueur et curieux', 'images/animals_profile/94.webp', 'images/animals_photo1/94.webp', 'images/animals_photo2/94.webp', 'images/animals_photo3/94.webp', 10),
('Shadow', 'Chien', 'Labrador', 'M', 5, 'Grand', 'Chien loyal et protecteur', 'images/animals_profile/95.webp', 'images/animals_photo1/95.webp', 'images/animals_photo2/95.webp', 'images/animals_photo3/95.webp', 10),
('Bella', 'Chien', 'Pomeranian', 'F', 1, 'Petit', 'Chienne vive et espiègle', 'images/animals_profile/96.webp', 'images/animals_photo1/96.webp', 'images/animals_photo2/96.webp', 'images/animals_photo3/96.webp', 10);
