DELETE FROM book;
ALTER TABLE book AUTO_INCREMENT = 1001;

DELETE FROM category;
ALTER TABLE category AUTO_INCREMENT = 1001;

INSERT INTO `category` (`name`) VALUES ('Biography and Autobiography'),('Children''s Books'),('Spirituality'),('Crime'),('Adventure'),('Sci-fi');

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Kobe Bryant', 'Kobe Bryant', '', 14.0, 0, FALSE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('JFK and the Unspeakable', 'James W. Douglass', '', 10, 0, FALSE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Einstein His Life and Universe ', 'Walter Isaacson', '', 2, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Leonardo Da Vinci', 'Walter Isaacson', '', 4, 0, FALSE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Benjamin Franklin', 'Walter Isaacson', '', 2.7, 0, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('And There Was Light', 'Jon Meacham', '', 6, 0, TRUE, FALSE, 1001);



INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Roller Girl', 'Victoria Jamieson', '', 8.5, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Wings of Fire', 'Tui T Sutherland', '', 7.9, 0, FALSE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Lion vs Rabbit', 'Alex Latimer', '', 4.5, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Hobbit', 'J. R. R. Tolkien', '', 6, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Alphablock', ' Christopher Franceschelli', '', 2, 0, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Book of Animals', 'Oliver Jeffers', '', 9.8, 0, FALSE, FALSE, 1002);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Opening the Akashic Records', 'Maureen J St Germain', '', 12, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Journey Continues', 'Sri M', '', 20, 0, FALSE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Shunya', 'Sri M', '', 11, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Power of Now', 'Eckhart Tolle', '', 8, 0, FALSE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Soul Boom', 'Rainn Wilson', '', 4, 0, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Third Eye Awakening', 'Spiritual Awakening Academy', '', 22, 0, TRUE, FALSE, 1003);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Lock-Up', 'John Banville', '',12, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Fatal Isles', 'Maria Adolfsson', '', 2, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Hyde', 'Craig Russell', '', 13, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Girl in the Fog', 'Donato Carrisi', '',18, 0, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Eight Detectives', 'Alex Pavesi', '',17, 0, FALSE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Vine Street', 'Dominic Nolan', '',9, 0, FALSE, FALSE, 1004);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Running Home', 'Katie Arnold', '',10, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Beyond Possible', 'Nims Purja', '', 3, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Wild ', 'Cheryl Strayed', '', 5, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Full Tilt', 'Dervla Murphy', '',21, 0, FALSE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('She Explores', 'Gale Straub', '',13, 0, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Spirit Run', 'Noe Alvarez', '',11, 0, FALSE, FALSE, 1005);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Juniper Ash', 'A E Oglesby', '',13, 0, FALSE, FALSE, 1006);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Ordinary', 'Starr Z Davies', '', 16, 0, TRUE, FALSE, 1006);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Tell Me an Ending', 'Jo Harkin', '', 7, 0, FALSE, FALSE, 1006);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Self Aware', 'Matt Martinez', '',5, 0, TRUE, FALSE, 1006);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Managed Paranoia ', 'Finlay Beach', '',15, 0, TRUE, FALSE, 1006);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Proto Project', 'Bryan R Johnson', '',6, 0, FALSE, FALSE, 1006);