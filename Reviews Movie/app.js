
//OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=82eb68c4

let movies = [];
let reviews = [];

function init() {
  document.getElementById("submitid").onclick = handlerClick;
  document.getElementById("submitreview").onclick = submitReview;
}

function handlerClick() {
  let movieImdbID = document.getElementById("movieid").value;
  //console.log(movieImdbID);
  if(movieImdbID.length == 0){
    alert("Invalid input. Please enter valid movie id. Such as tt0167260).");
  }else{
    const xhttp = new XMLHttpRequest();

    //This is only going to get called when ready state changes
    xhttp.onreadystatechange = function () {
      //If the response is available and was successful
      if (this.readyState == 4 && this.status == 200) {
        //Take the response text, parse it into JS object
        let responseMovie = JSON.parse(xhttp.responseText);
        //Push the response which is movie into array
        movies.push(responseMovie);
        //update the page
        render();
      }
    };
  
    //Specifies request
    xhttp.open(
      "GET",
      `http://www.omdbapi.com/?i=${movieImdbID}&apikey=82eb68c4`,
      true
    );
  
    //Send Request
    xhttp.send();
  }
}

//render process
function render() {
  let content = "";

  movies.forEach((movie) => {
    content += `
      <div id="movietitle">Movie Title: ${movie.Title}</div>
      <div id="moviereleasedate">Movie Released Date: ${movie.Released}</div>
      <div id="movieruntime">Movie Run Time: ${movie.Runtime}</div>
      <div id="listofactors">Movie Actors: ${movie.Actors}</div>
      <br>
    `;
  });
  document.getElementById("movieinfo").innerHTML = content;
  document.getElementById("containerMovie").style.display = "flex";
  document.getElementById("moviereview").style.display = "block";
}

//Submit process
function submitReview() {
  let content = "";

  let reviewerName = document.getElementById("reviewername");
  let reviewerScore = document.getElementById("reviewerscore"); //convert string to integer
  let review = document.getElementById("review");

  let data = {
    name: reviewerName.value,
    score: parseInt(reviewerScore.value),
    review: review.value,
  };
  if (validCheckProcess(data)) {
    alert("Invalid Input! Please check your input.");
  } else {
    reviews.push(data);

    reviewerName.value = "";
    reviewerScore.value = "";
    review.value = "";

    reviews.forEach((review) => {
      content += `
  
      <br>
      <br>
      <div id="reviwerByName">Review Name: ${review.name}</div>
      <div id="reviewerByScore">Score: ${review.score}</div>
      <div id="reviewByUser">Review: ${review.review}</div>
      <br>
      <br>
    `;
    });

    document.getElementById("moviereviews").innerHTML = content;
  }
}

//isValid input process
const validCheckProcess = (data) => {
  let deneme = data.name;
  if (
    typeof data.name !== "string" ||
    isNaN(data.score) ||
    typeof data.review !== "string"
  ) {
    return true;
  }
  return data.score < 0 || data.score > 10;
};
