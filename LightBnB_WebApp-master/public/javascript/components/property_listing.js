$(() => {
  window.propertyListing = {};

  function createListing(property, isReservation) {
    return `
    <article class="property-listing">
        <section class="property-listing__preview-image">
          <img src="${property.thumbnail_photo_url}" alt="house">
        </section>
        <section class="property-listing__details">
          <h3 class="property-listing__title">${property.title}</h3>
          <ul class="property-listing__details">
            <li>number_of_bedrooms: ${property.number_of_bedrooms}</li>
            <li>number_of_bathrooms: ${property.number_of_bathrooms}</li>
            <li>parking_spaces: ${property.parking_spaces}</li>
          </ul>
          ${isReservation ? 
            `<p>${moment(property.start_date).format('ll')} - ${moment(property.end_date).format('ll')}</p>` 
            : ``}
          <footer class="property-listing__footer">
            <div class="property-listing__rating">${Math.round(property.average_rating * 100) / 100}/5 stars</div>
            <div class="property-listing__price">$${property.cost_per_night/100.0}/night</div>
          </footer>
        </section>
      </article>
      ${!isReservation ? 
        `<form id="reserve" method="POST">
            <input type="hidden" name="propertyId" value=${property.id}>
            <div class="start-date"><input type="date" name="start"></div>
            <div class="end-date"><input type="date" name="end"></div>
            <div><button type="submit">Reserve</button></div>
        </form>` 
        : ``}
    `
  }

  window.propertyListing.createListing = createListing;

  // window.$signUpForm = $signUpForm;

  // $signUpForm.on('submit', function(event) {
  //   event.preventDefault();

  //   const data = $(this).serialize();
  //   signUp(data)
  //     .then(getMyDetails)
  //     .then((json) => {
  //       header.update(json.user);
  //       views_manager.show('listings');
  //     });
  // });


  $('body').on('submit', '#reserve', function(evt) {
    evt.preventDefault();
    const data = $(this).serialize();
    makeReservation(data)
      .then(json => {
        alert("Property is reserved from " + json.start_date + " to " + json.end_date);
    });
  });
});

