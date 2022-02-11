const properties = require('./json/properties.json');
const users = require('./json/users.json');
const db = require('./db')
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'test_db'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  const queryString = `
    SELECT * FROM users
    WHERE email = $1;
  `;
  
  return db.query(queryString, [email], true);
    
}

// const getUserWithEmail = function(email) {

//   const queryString = `
//     SELECT * FROM users
//     WHERE email = $1;
//   `;
  
//   return pool
//     .query(queryString, [email])
//     .then(result => {
//       if (result.rows.length >=1) {
//         return result.rows[0];
//       }
//       return null;
//     })
//     .catch((err) => {
//       console.log(err.message);
//       return null;
//     });
// }

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  const queryString = `
  SELECT * FROM users
  WHERE id = $1;
  `;

  return db.query(queryString, [id], true);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {

  const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [user.name, user.email, user.password];

  return db.query(queryString, values, true);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  const queryString = `
  SELECT properties.*, reservations.start_date, reservations.end_date 
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  WHERE reservations.guest_id = $1
  LIMIT $2;
  `;

  return db.query(queryString, [guest_id, limit]);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  const queryParams = [];

  // WHERE clause here is dummy, to make sure all next "AND" clause work syntactically
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id 
    WHERE 1 = 1
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `AND owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);
    queryString += `AND cost_per_night >= 100 * $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night);
    queryString += `AND cost_per_night <= 100 * $${queryParams.length} `;
  }

  queryString += `
    GROUP BY properties.id
  `;

  if (options.minimum_rating ) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
    LIMIT $${queryParams.length};
  `;

  return db.query(queryString, queryParams);
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  
  const queryString = `
    INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, 
      cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street,
      city, province, post_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `;
  const queryParams = [
    property.owner_id, 
    property.title, 
    property.description, 
    property.thumbnail_photo_url, 
    property.cover_photo_url, 
    property.cost_per_night, 
    property.parking_spaces, 
    property.number_of_bathrooms, 
    property.number_of_bedrooms, 
    property.country, 
    property.street, 
    property.city, 
    property.province, 
    property.post_code
  ];

  return db.query(queryString, queryParams, true);
}
exports.addProperty = addProperty;

const addReservation = function(reservation) {
  
  const queryString = `
    INSERT INTO reservations (start_date, end_date, property_id, guest_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const queryParams = [
    reservation.start_date, 
    reservation.end_date, 
    reservation.property_id, 
    reservation.guest_id, 
  ];

  return db.query(queryString, queryParams, true);
}
exports.addReservation = addReservation;
