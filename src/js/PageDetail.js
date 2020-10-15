
import { screenshotCard, suggestionsCard, youtubeCard, buyLink } from "./components"

const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");


    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let { name, released, description, background_image, developers, tags, genres, publishers, platforms, website, clip, rating, ratings_count,stores } = response;

          let articleDOM = document.querySelector(".page-detail .article");

          articleDOM.querySelector("h1.title").innerHTML = name;
          articleDOM.querySelector("h4.release-date span").innerHTML = released;
          articleDOM.querySelector("p.description").innerHTML = description;
          articleDOM.querySelector("img").src = background_image;
          articleDOM.querySelector("h6.developers span").innerHTML = developers.map(dev => dev.name).join(" • ")
          articleDOM.querySelector("small.tags").innerHTML = tags.map(tag => tag.name).join(" • ")
          articleDOM.querySelector("small.genres").innerHTML = genres.map(genre => genre.name).join(" • ")
          articleDOM.querySelector("small.publishers span").innerHTML = publishers.map(publisher => publisher.name).join(" • ")
          articleDOM.querySelector("small.platforms").innerHTML = platforms.map(platform => platform.platform.name).join(" • ")
          articleDOM.querySelector("a.website").href = website;
          if (clip !== null) {
            articleDOM.querySelector("video").src = clip.clips.full;
          } else {
            articleDOM.querySelector("video").remove()
          }
          articleDOM.querySelector("h4 span").innerHTML = `${rating} / 5`;
          articleDOM.querySelector("small.ratings-count").innerHTML = `${ratings_count} ratings`;
          articleDOM.querySelector(".dropdown-menu").innerHTML = stores.map(store => buyLink(store.url, store.store.name)).join("")
        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const getScreenshots = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    const fetchGame = (url, argument) => {
      let finalURL = url + argument + "/screenshots";

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let { results } = response;

          let articleDOM = document.querySelector(".page-detail .article");
          articleDOM.querySelector(".screenshots-container").innerHTML = results.map(screenshot => screenshotCard(screenshot.image)).join("");
          
        });
    };
  
    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const getSimilarGames = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    const fetchGame = (url, argument) => {
      let finalURL = url + argument + "/suggested";

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let { results } = response;

          let articleDOM = document.querySelector(".page-detail .article");
          articleDOM.querySelector(".suggestions-container").innerHTML = results.map(game => suggestionsCard(game.id, game.background_image, game.name, game.released, game.genres.map(genre => genre.name).join(" • "))).join("");
          console.log(results)
          
        });
    };
  
    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const getYoutubeVideos = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    const fetchGame = (url, argument) => {
      let finalURL = url + argument + "/youtube";

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let { results } = response;

          let articleDOM = document.querySelector(".page-detail .article");
          if (results.length < 1) {
            articleDOM.querySelector(".youtube-title").remove()
            articleDOM.querySelector(".youtube-container").remove()
          } else {
            articleDOM.querySelector(".youtube-container").innerHTML = results.map(video => youtubeCard(video.external_id)).join("");
          }
        });
    };
  
    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail mb-5 pb-5">
        <div class="article container pt-5 mt-5">
          <div class="row">
            <div class="col-md-6 col-sm-12 mb-5">
              
              <img class="card-img-top card-image main-image" src="" alt="Card image cap">
              <hr>
              <h3 class="mb-3">Screenshots</h3>
              <div class="card-deck screenshots-container">
              </div>
              <hr>
              <h3 class="mb-3 youtube-title">Youtube videos</h3>
              <div class="card-deck youtube-container">
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <small class="genres"></small>
              <h1 class="title display-4 text-bold"></h1>
              <small class="platforms mb-5 text-muted"></small><br>
              <hr>
              <h4><span class="badge badge-secondary mr-3"></span><small class="ratings-count text-muted"></small></h4>
              <h4 class="release-date"><span></span></h4>
              <h6 class="developers"><span></span></h6>
              <small class="publishers mb-5"><strong>Publishers:</strong>  <span></span></small><br>
              <a class="website ilink text-decoration-none text-info" href="" target="_blank">Visit website</a>
              <hr>
              <div class="dropdown">
                <button class="btn btn-dark dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Buy
                </button>
                <div class="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton">
                </div>
              </div>
              <hr>
              <p class="description"></p>
              <hr>
              <video class="video card-img-top card-image" playsinline="" loop="" src="" controls style="outline: none;"></video>
              <hr>
              
              <small class="tags mb-5"></small><br>
              <hr>
              
            </div>
            
          </div>
          <div class="row">
          <h2>Similar games</h2>
            <div class="card-columns suggestions-container mt-3">
            </div>
          </div>
        </div>
      </section>
    `;

    preparePage();
    getScreenshots();
    getSimilarGames();
    getYoutubeVideos();
  };

  render();
};

export {PageDetail}