///<refrence types="../@types/jquery" />

var allData = document.getElementById("allData");
var details = document.getElementById("details");
var games = [];
var gameDetails = [];

async function getGames(x) {
  showLoading();
  const options = {
    headers: {
      "x-rapidapi-key": "90a3c94329msheae9e5349ceb691p14d971jsn3e6ccc3383fb",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  var result = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${x}`,
    options
  );
  games = await result.json();
  display();
  hideLoading();
}

getGames("mmorpg");

async function getGameDetails(y) {
  showLoading();
  const options = {
    headers: {
      "x-rapidapi-key": "90a3c94329msheae9e5349ceb691p14d971jsn3e6ccc3383fb",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  var result = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${y}`,
    options
  );
  gameDetails = await result.json();
  displayDetails();
  hideLoading();
}

function display() {
  var box = "";
  for (var i = 0; i < games.length; i++) {
    box += `
    <div class="col-md-6 col-lg-4 col-xl-3">
                    <div>
                        <div class="card border border-dark border-2">
                            <img src="${
                              games[i].thumbnail
                            }" class="card-img-top" alt="">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-baseline">
                                    <h5 class="card-title text-white">${
                                      games[i].title
                                    }</h5>
                                    <h5><span class="badge text-bg-primary fw-light">free</span></h5>
                                </div>
                                <p class="card-text text-center text-secondary">${games[
                                  i
                                ].short_description.slice(0, 40)} ...</p>
                            </div>
                            <div class="card-footer">
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <h6><span class="badge text-bg-secondary fw-light">${
                                      games[i].genre
                                    }</span></h6>
                                    <h6><span class="badge text-bg-secondary fw-light">${
                                      games[i].platform
                                    }</span></h6>
                                    <p class="game-id d-none">${games[i].id}</p>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
    `;
  }
  allData.innerHTML = box;
}

function displayDetails() {
  var box = "";
  box = `
      <div>
            <div class="container py-4 d-flex justify-content-between">
                <h2>Game Details</h2>
                <div><i class="fa-solid fa-xmark fa-2x"></i></div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <div>
                            <img src="${gameDetails.thumbnail}" alt="">
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div>
                            <h3>Title: ${gameDetails.title}</h3>
                            <p>Category: <span class="badge text-bg-info fw-light">${gameDetails.genre}</span></p>
                            <p>Platform: <span class="badge text-bg-info fw-light">${gameDetails.platform}</span></p>
                            <p>Status: <span class="badge text-bg-info fw-light">${gameDetails.status}</span></p>
                            <p>${gameDetails.description}</p>
                            <a class="my-exit" href="${gameDetails.game_url}" target="_blank"><button type="button" class="btn btn-outline-warning text-white">Show Game</button></a>
                        </div>
                    </div>
                </div>
            </div>
      </div>

  `;
  details.innerHTML = box;
}

$("nav #navbarNavAltMarkup a").on("click", function () {
  let genre = $(this).attr("id");
  $(".nav-link").removeClass("active");
  $(this).addClass("active");
  getGames(genre);
});

$(document).on("click", ".card", function () {
  let gameId = $(this).find(".game-id").html();
  getGameDetails(gameId);
  $('.details').css("display", "block");
});

$('.fa-xmark').on('click', function(){
  $('.details').css("display", "none");
})

$(document).on("click", ".fa-xmark", function () {
  $('.details').css("display", "none");
});

function showLoading() {
  $(".loading").css("display", "flex");
}

function hideLoading() {
  $(".loading").css("display", "none");
}
