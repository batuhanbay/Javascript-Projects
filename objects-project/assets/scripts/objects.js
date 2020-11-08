const addMovieButton = document.getElementById('add-movie-btn');
const searchMovieButton = document.getElementById('search-btn');

//creating arrays for movies to struct
const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');//connect unordered list from html  to js 

  if(movies.length === 0){//check process for if there is movie or not movie in the array
    movieList.classList.remove('visible');//to toggle css property
  }else{
    movieList.classList.add('visible');
  }
  
  movieList.innerHTML = ' ';

  const filteredMovies = !filter 
      ? movies
      : movies.filter( movie => movie.info.title.includes(filter));//filter return the elements of an array that meet the condition specified in a callback function.

  filteredMovies.forEach((movie) => {//forEach Calls a defined callback function on each element of an array, and returns an array that contains the results.
                                    //get a movie(object => newMovie) or movies inside of movies element one by one and render them 
    const movieEl = document.createElement('li');//Creates an list (instance of the element) for the unorder list 
    let text = movie.info.title ;//this concept which is calling chaning in Js.Look at for reearch 
    for (const key in movie.info) {
      if (key !== 'title') {
        text = text + ' - ' + `${key} : ${movie.info[key]}`;// ${[extraNAme]} : ${newMovie.info[[extraName]]}
                                                                        // ------>[extraName] : extraValue 
                                                                        //access value of the key dynamiclly
      }
    }
    movieEl.textContent = text; //put the content to list element
    movieList.append(movieEl);//put list element into unorder list by using append.Append: Inserts nodes after the last child of node.
  });
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value;//cause to use value is fetch to input data
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if(title.trim() === ' ' || extraName.trim() === ' ' || extraValue.trim() === ' ' ){
    return;
  }

  const newMovie = {
    info: {
      title:title,
      [extraName] : extraValue
    },
    id:Math.random().toString()
  };

  movies.push(newMovie);
  console.log(movies);
  renderMovies();
};

const searchMovieHandler = () => {

  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);

};



addMovieButton.addEventListener('click', addMovieHandler);
searchMovieButton.addEventListener('click', searchMovieHandler);