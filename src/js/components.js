const lightButton = (id, text) => {
  return `<button "type="button" class="btn btn-light mt-5 mb-5" id="${id}">${text}</button>`;
};

const gameCard = (id, image, name, released, developers, genres, rate, votes, platforms) => {
  return `
    <div class="mx-auto card bg-dark the-cards show games mb-5" style="width: 18rem" id="card-${id}">
      <img class="card-img-top card-image" src="${image}" alt="Card image cap">
      <div class="card-body mb-3">
        <h4 class="card-title">${name}</h1>
        <small class="card-text">${platforms}</small>
      </div>
      <div class="cards-overlay text-left rounded" id="overlay-${id}" style="word-break: break-word;">
        <div class="m-3">
          <h4>${name}</h4>
          <h5><span class="badge badge-secondary mr-1">${rate} / 5</span><small class="ratings-count text-muted">${votes} ratings</small></h5>
          <small>${platforms}</small>
          <h5>${released}</h5>
          <h6>${developers}</h6>
          <p>${genres}</p>
          <button id="detailsBtn" type="button" class="btn btn-light btn-sm" onclick="location.href='#pagedetail/${id}'">En savoir plus</button>
        </div>
      </div>
    </div>`
}

const screenshotCard = (src) => {
  return `
  <img class="main-image img-fluid w-25 mr-2 ml-2 mb-3" src="${src}" alt="Card image cap">`
}

const youtubeCard = (src) => {
  return `
  <div class="embed-responsive embed-responsive-16by9 main-image img-fluid w-25 mr-2 ml-2 mb-3" >
    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>`
}

const suggestionsCard = (id, image, name, released, genres) => {
  return `
    <div class="card bg-dark mb-5" style="width: 18rem" id="suggestion-${id}">
      <img class="card-img-top card-image" src="${image}" alt="Card image cap">
      <div class="card-body">
        <h4 class="card-title">${name}</h1>
        <p class="card-text">${released}</p>
        <p>${genres}</p>
        <button id="detailsBtn" type="button" class="btn btn-light btn-sm card-text" onclick="location.href='#pagedetail/${id}'">En savoir plus</button>
      </div>
    </div>`
}

const buyLink = (link, name) => {
  return `<a class="dropdown-item text-light bg-dark" href="${link}" target="_blank">${name}</a>`
}

export { lightButton, gameCard, screenshotCard, suggestionsCard, youtubeCard, buyLink }