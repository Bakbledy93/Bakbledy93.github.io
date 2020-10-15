import moment from "moment";


const PageList = (argument = "") => {

  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument, platformValue = 0, quest = "no") => {
      console.log("A")
      let finalURL = url;
      let platformSelect;

      // console.log(platformValue);

      if (argument && quest === "no") {
        console.log(1)
        finalURL = url + "?search=" + argument + "&page_size=9";
        platformSelect = Number(platformValue,10);
      }
      else if (argument && quest === "yes"){
        console.log(2)
      finalURL = url + "?search=" + argument + "&page_size=27";
      platformSelect = Number(platformValue,10);
      }
      else if(quest === "no")
      {
        console.log(3)
        finalURL = url  + "?&page_size=9";
        platformSelect = Number(platformValue,10);
      }
      else if(quest==="yes"){
        console.log(4)
        finalURL = url  + "?&page_size=27"
        platformSelect = Number(platformValue,10);
      }
      // console.log(platformSelect);

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          articles = "";

          if (platformSelect == undefined){
            platformSelect = 0;
          }

          console.log(platformSelect);
          console.log(response.results);

          response.results.forEach((article) => {
            let platformID = article.platforms
            let index;
            // if (!platformID == false){ 
              index = platformID.map(function(x){
                return x.platform.id;
                }); 
              console.log(typeof(platformSelect));
              console.log(typeof(index[0]));
              console.log(index);
              console.log(platformSelect);
              console.log(index.includes(platformSelect));
              // return index;
          // };
          console.log(index);
            if (platformSelect == 0 ||index.includes(platformSelect)==true){
              console.log("hello")
              articles += `

              <div class="col-4 mt-4">
              <div class="card mr-3 mb-3" style="width: 18rem;">
                <img class="card-img-top" src="${article.background_image}" alt="Card image cap">
                <div class="card-body bg-dark">
                <h4 class="text-white">${article.name}</h4>
                <h5 class="text-white">${article.released}</h5>
                <a href = "#pagedetail/${article.id}">${article.id}</a>
                </div>
              </div>
            </div>

            `;
            }

          });
          document.querySelector(".page-list .row").innerHTML = articles;

          function nextMethod(e) {
            e.preventDefault();
                platform =selectValue();
                // argument = gameTitleValue();
                console.log(argument)
                console.log("ni hao");
                if (argument == ""){
                  console.log("to do bon");
                  fetchList(`https://api.rawg.io/api/games?page=2&dates=${dateToday},${date365}&ordering=-added`, argument, platform);
                }
                else{
                  argument =gameTitleValue();
                  fetchList(`https://api.rawg.io/api/games?page=2&`, argument, platform);
              }
            };

          function previousMethod(e) {
            e.preventDefault();
            platform =selectValue();
            // argument = gameTitleValue();
            console.log(argument)
            console.log("ni hao");
            if (argument == ""){
              console.log("to do bon");
              fetchList(`https://api.rawg.io/api/games?page=1&dates=${dateToday},${date365}&ordering=-added`, argument, platform);
            }
            else{
              argument =gameTitleValue();
              fetchList(`https://api.rawg.io/api/games?page=1&`, argument, platform);
            }            
          };
          
          function nextnextMethod(e) {
            e.preventDefault();
            platform =selectValue();
            console.log(argument)
            // argument = gameTitleValue();
            console.log("ni hao");
                articles = "";
                if (argument == ""){
                  console.log("to do bon");
                  fetchList(`https://api.rawg.io/api/games?page=1&dates=${dateToday},${date365}&ordering=-added`, argument, platform, "yes");
                }
                else{
                  argument =gameTitleValue();
                  fetchList(`https://api.rawg.io/api/games?page=1&`, argument, platform,"yes");
                }    
              };

            if (response.previous !== null && response.next !== null) {
                document.querySelector(".page-list .row").innerHTML += `
                <div class="row mx-auto mb-3">
                  <button class="btn btn-outline-danger mr-1"><-</button>
                  <button class="btn btn-outline-danger mr-1">-></button>
                </div>`;
                const previousButton = document.getElementsByClassName("btn btn-outline-danger mr-1")[0];
                previousButton.addEventListener('click', previousMethod);
                const nextButton = document.getElementsByClassName("btn btn-outline-danger mr-1")[1];
                nextButton.addEventListener('click', nextnextMethod);

              } else if (response.previous !== null ) {
                document.querySelector(".page-list .row").innerHTML += `
                <div class="row mx-auto mb-3">
                  <button class="btn btn-outline-danger mr-1"> <- </button>
                </div>`;
                const previousButton = document.getElementsByClassName("btn btn-outline-danger mr-1")[0];
                previousButton.addEventListener('click', nextMethod);
              } else if (response.next !== null && (/27$/).test(finalURL) === false ) {
                  document.querySelector(".page-list .row").innerHTML += `
                  <div class="row mx-auto mb-3">
                    <button class="btn btn-outline-danger mr-1"> -> </button>
                  </div>`;
                  const nextButton = document.getElementsByClassName("btn btn-outline-danger mr-1")[0];
                  nextButton.addEventListener('click', nextMethod);
              }

        });
    };


    function removeDefaultLink(e){
      e.preventDefault();
      let argument = gameTitleValue();
      let cleanedArgument = argument.replace(/\s+/g, "-");
      let newURL = `#pagelist/${cleanedArgument}`;
      document.location.href = newURL;
      document.querySelector(".row").innerHTML = '';
      console.log(argument.replace(/\s+/g, "-"));
      platform =selectValue();
      console.log(platform);
      fetchList(`https://api.rawg.io/api/games`,argument, platform);
    };

    function selectValue(){
      const Value = select.value;
      return Value
    };
    
    if (argument){   
      console.log("ola");
      fetchList(`https://api.rawg.io/api/games`, cleanedArgument, platform);
    }
    else {
      console.log("salute");
      fetchList(`https://api.rawg.io/api/games?dates=${dateToday},${date365}&ordering=-added`, cleanedArgument, platform);
    };
    searchButton.addEventListener('click', removeDefaultLink);
    select.addEventListener('change',selectValue)

  };

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
        <div class="row">...loading</div>
      </section>
    `;

    preparePage();
  };

  let platform; 
  const select = document.getElementById("inputGroupSelect01");
  const searchBar = document.getElementById("searchbar");
  const searchButton = document.querySelector("#searchbtn");
  const dateToday = moment(Date.now()).format("YYYY-MM-DD");
  const date365 = moment(Date.now() + 3.154e+10).format("YYYY-MM-DD");
  console.log(dateToday);
  console.log(date365);

  const gameTitleValue = () =>{
    let gameTitleValue = searchBar.value;
    return gameTitleValue;
  };

  render();
};

export {PageList};