import{Button} from"./index";
import moment from "moment";


const PageList = (argument = "") => {

  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "?search=" + argument;
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            articles += `
                  <div class="cardGame">
                    <h1>${article.name}</h1>
                    <h2>${article.released}</h2>
                    <a href = "#pagedetail/${article.id}">${article.id}</a>
                  </div>
                `;
          });
          document.querySelector(".page-list .articles").innerHTML = articles;
        });
    };

    fetchList(`https://api.rawg.io/api/games?dates=${dateToday},${date365}&ordering=-added`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <div class="multiple-button">
        ${Button("Click here")}
        ${Button("Read more")}
        ${Button("One more !")}
      </div>
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  const dateToday = moment(Date.now()).format("YYYY-MM-DD");
  const date365 = moment(Date.now() + 3.154e+10).format("YYYY-MM-DD");

  render();
};

export {PageList};