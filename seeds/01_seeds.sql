INSERT INTO users(name, email, password)
VALUES ('John', 'john@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Anna', 'anna@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Minh', 'minh@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, 
cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street,
city, province, post_code, active)
VALUES (1, 'Charming beach villa', 'Beachside villa', 'http://thumpnail', 'http://cover', 100, 2, 2, 2, 
  'Canada', 'Bay St', 'Toronto', 'Ontario', 'B3B 2B3', true), 
  (1, 'Ugliest villa', 'On mountain', 'http://thumpnail2', 'http://cover2', 300, 2, 2, 2, 
  'Canada', 'Main St', 'Halifax', 'NS', 'N1N N1N', true),
  (1, 'Couple apartment', 'In the forest', 'http://thumpnail3', 'http://cover3', 50, 1, 1, 1, 
  'Canada', 'There St', 'Vancouver', 'BC', 'C1C C1C', true);

INSERT INTO reservations (start_date, end_date,property_id, guest_id)
VALUES ('2022-03-03', '2022-03-05', 1, 1), 
  ('2022-04-03', '2022-04-05', 2, 2), 
  ('2022-05-03', '2022-05-05', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 5, 'Perfect stay'),
  (2, 2, 2, 3, 'Reasonable stay'),
  (3, 3, 3, 4, 'Will come back');


