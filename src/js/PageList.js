import moment from "moment";


const PageList = (argument = "") => {

  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument, platformValue = 0) => {
      let finalURL = url;
      let platformSelect;
      console.log(platformValue);
      if (argument) {
        finalURL = url + "?search=" + argument;
        platformSelect = Number(platformValue,10);
      }
      else {
        finalURL = `https://api.rawg.io/api/games?dates=${dateToday},${date365}&ordering=-added`;
        platformSelect = Number(platformValue,10);
      }
      console.log(platformSelect);
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
          //     return index;
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
            </div>`;
            }

          });
          document.querySelector(".page-list .articles").innerHTML = articles;
        });
    };


    function removeDefaultLink(e){
      e.preventDefault();
      let argument = gameTitleValue();
      let cleanedArgument = argument.replace(/\s+/g, "-");
      let newURL = `#pagelist/${cleanedArgument}`;
      document.location.href = newURL;
      document.querySelector(".articles").innerHTML = '';
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
      <section class="page-list">
        <div class="articles">...loading</div>
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