import moment from "moment";
import { lightButton, gameCard } from "./components";

const PageList = (argument = "") => {
  let platform; 
  const select = document.getElementById("inputGroupSelect01");
  const searchBar = document.getElementById("searchbar");
  const searchButton = document.querySelector("#searchbtn");
  const dateToday = moment(Date.now()).format("YYYY-MM-DD");
  const date365 = moment(Date.now() + 3.154e+10).format("YYYY-MM-DD");
  let showMoreCount = 1
  let totalResults = 0;
  // console.log(dateToday);
  // console.log(date365);
  let articles = "";

  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");

    const fetchList = (url, argument, platformValue = 0) => {
      // console.log("A")
      let finalURL = url;
      let platformSelect;
      let message = document.querySelector("h1.message")
      message.innerHTML = "New and trending"
      platformSelect = Number(platformValue,10);

      if (platformSelect == undefined){
        platformSelect = 0;
      }

      // console.log(platformValue);

      if (argument && !platformSelect == 0) {
        console.log("A")
        console.log(platformSelect)
        finalURL = `${url}?search=${argument}&page_size=9&page=${showMoreCount}&platforms=${platformSelect}`;
        console.log(finalURL);
      }
      else if(argument && platformSelect == 0){
        console.log("B")
        console.log(platformSelect)
        finalURL = `${url}?search=${argument}&page_size=9&page=${showMoreCount}`;
      }
      else {
        console.log("C")
        finalURL = `${url}?&page_size=9&page=${showMoreCount}`;
      }
      console.log(platformSelect);

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          totalResults = response.count
          let searchModulo = totalResults / 9

          // console.log(platformSelect);
          console.log(response.results);

          response.results.forEach((article) => {
            let platformID = article.platforms
            let index;
              index = platformID.map(function(x){
                return x.platform.id;
                }); 
              // console.log(typeof(platformSelect));
              // console.log(typeof(index[0]));
              // console.log(index);
              // console.log(platformSelect);
              // console.log(index.includes(platformSelect));

            if (platformSelect == 0 ||index.includes(platformSelect)==true){
              console.log("hello")
              fetch(`https://api.rawg.io/api/games/${article.id}`)
              .then((response2) => response2.json())
              .then((response2) => {
                console.log("alo")
                articles += `${gameCard(
                                article.id,
                                article.background_image,
                                article.name,
                                article.released,
                                response2.developers[0].name,
                                article.genres.map(genre => genre.name).join(" • "),
                                response2.rating,
                                response2.ratings_count,
                                article.platforms.map(platform => platform.platform.name).join(" • ")
                )}`;
                if (argument) {
                  message.innerHTML = `Search: ${gameTitleValue()}`
                }
                document.querySelector(".page-list .row").innerHTML = articles;
                if (searchModulo > 0 && showMoreCount < 3) {
                  document.querySelector(".page-list .row").innerHTML += lightButton("showMoreBtn", "Show more");
                  showMoreBtn.addEventListener('click', showMore);
                }
              });
            }
          });
        });
    };

    if (argument){   
      console.log("ola");
      argument = gameTitleValue()
      platform = selectValue();
      console.log(argument);
      console.log(platform);
      fetchList(`https://api.rawg.io/api/games`, argument, platform);
    }
    else {
      console.log("salute");
      argument = gameTitleValue()
      platform = selectValue();
      console.log(argument);
      console.log(platform);
      fetchList(`https://api.rawg.io/api/games?dates=${dateToday},${date365}&ordering=-added`, argument, platform);
    };
    
    searchButton.addEventListener('click', removeDefaultLink);
    select.addEventListener('change',selectValue)

    function removeDefaultLink(e){
      e.preventDefault();
      articles = ""
      document.querySelector(".row").innerHTML = '';
      let argument = gameTitleValue().replace(/\s+/g, "-");
      let newURL = `#pagelist/${argument}`;
      document.location.href = newURL;
      platform = selectValue();
      console.log(gameTitleValue())
      fetchList(`https://api.rawg.io/api/games`, argument, platform);
    };

  };

  const showMore = () => {
    showMoreCount += 1
    preparePage()
  }


  const render = () => {
    pageContent.innerHTML = `
    <div class="jumbotron jumbotron-fluid bg-dark">
      <div class="container">
        <h1 class="display-4 text-white">Welcome,</h1>
        <p class="lead text-white">The Hyper Programe is the world's premier event for computer and video games
        and related products. At The Hyper Programe, the video game industry's top talent pack the Losa Angeles Convention Center,
        connecting tens of thousands of the best, brightest and most innovative in the interactive entertainment industry. For three
        exciting days, leading-edge companies, groundbreaking new technologies, and never-seen-before products will be showcased.
        The Hyper Programe connects you with both new and existing partners, industry executives, gamers, and social influencers providing
        unprecedented exposure</p>
      </div>
    </div>
      <section class="page-list mx-auto">
      <h1 class="display-3 font-weight-bold message mb-5"></h1>
        <div class="container">
        <div class="row">...loading</div>
        <div class="button"></div>
        </div>
      </section>
    `;

    preparePage();
  };

  const gameTitleValue = () =>{
    return searchBar.value;
  };

  const selectValue = () =>{
    return select.value; 
  };



  render();
};

export {PageList};