const addMovieModal = document.getElementById('add-modal');
//const addMovieModal = document.querySelector('#add-modal')
//const addMovieModal = document.body.children[1];
const startAddMovieButton = document.querySelector('header button');
//const startAddMovieButton = document.querySelector('header').lastElementChild;
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');

const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
//const confirmAddMovieButton = addMovieModal.querySelector('.btn--success')
//const confitmAddMovieButton = document.querySelector('.modal__actions').lastElementChild

const userInputs = addMovieModal.querySelectorAll('input');
//const userInouts = addMovieModal.getElementByTagName('input');

const entryTextSection = document.getElementById('entry-text');

const deleteMovieModal = document.getElementById('delete-modal');
//const addMovieModal = document.querySelector('#delete-modal')
//const addMovieModal = document.body.children[2];

const cancelDeleteModalButton = deleteMovieModal.querySelector('.btn--passive');
const confirmDeleteModalButton = deleteMovieModal.querySelector('.btn--danger');


const movies = [];

const deleteMovie = (movieId) => {
  let movieIndex=0;
  for (const movie of movies) {
    if(movie.id === movieId){
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex,1);//to remove from array firstly by using splice method 
  const movieListonScreen = document.getElementById('movie-list');
  movieListonScreen.children[movieIndex].remove();
  //movieListonScreen.removeChild(movieListonScreen.children[movieIndex])
  deleteMovieModal.classList.remove('visible');
  // closeBackdrop();
  toggleBackdrop();
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  confirmDeleteModalButton.addEventListener('click' , deleteMovie.bind(null , movieId));
};

const renderNewMovieElement = (id ,title , imageUrl , rating) => {

  const listNewMovieElememt = document.createElement('li');
  listNewMovieElememt.className = 'movie-element';
  listNewMovieElememt.innerHTML = `
    <div class=".movie-element__image">
      <img src="${imageUrl} alt="${title}">
    </div>
    <div class=".movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div> `;
    
    listNewMovieElememt.addEventListener('click' , deleteMovieHandler.bind(null,id) )
    const movieListonScreen = document.getElementById('movie-list');
    movieListonScreen.append(listNewMovieElememt);
};

const updatesUI = () => {
  if(movies.length === 0){
    entryTextSection.style.display = 'block';
  }else {
    entryTextSection.style.display = 'none';
  }

};

const cleanMovie = () => {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};


const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const closeDeleteModal = () =>  {
  deleteMovieModal.classList.remove('visible');
};

const showMovieModalHandler = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};


const closeHandler = () => { 
  closeMovieModal();
  toggleBackdrop();
  closeDeleteModal();
  cleanMovie();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  if(titleValue.trim() === '' || imageUrlValue.trim() === '' || ratingValue.trim() === '' || +ratingValue < 1 || +ratingValue > 5){
    alert("You have entered incalid values.Plaese enter valid values.(Rating requried to be between 1 and 5.");
  }

  newMovie = {
    id : Math.random().toString(),
    title: titleValue ,
    imageUrl: imageUrlValue,
    rating : ratingValue
  };

  movies.push(newMovie);
  console.log(movies);
  cleanMovie();
  updatesUI();
  renderNewMovieElement(newMovie.id, newMovie.title , newMovie.imageUrl , newMovie.rating);
};

startAddMovieButton.addEventListener('click', showMovieModalHandler);
backdrop.addEventListener('click', closeHandler);
cancelAddMovieButton.addEventListener('click' , closeHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler );
cancelDeleteModalButton.addEventListener('click' , closeHandler);
