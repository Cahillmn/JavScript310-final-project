const url = 'https://hp-api.herokuapp.com/api/characters';

const formEl = document.getElementById("findCharacters");
const selectEl = document.getElementById('specificName');

// retrieve favorite character from local storage

const favoriteCharacter = document.getElementById('favorite');
const no = document.getElementById('not-favorite');
const characterName = localStorage.getItem('favorite');

// if local storage favorite exists, use it as the selected character

if (characterName) { 
   selectEl.value = characterName;
} else {
  console.log('Favorite does not exist')
}

// run the fetch request when submit button is clicked

formEl.addEventListener('submit', function (e) {
  e.preventDefault();

  //clear prior results from page

  const container = document.getElementById('container');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  //moves the image to the right
  const movingImg = document.getElementById('animation');
  movingImg.style.position = 'relative';
  movingImg.style.left = '0px';

  const moveRight = () => {
    if (parseInt(movingImg.style.left) < 1150) {
      movingImg.style.left = parseInt(movingImg.style.left) + 10 + 'px';
      requestAnimationFrame(moveRight);
    }

  };

  moveRight();

  //create a favorite in local storage if yes is selected otherwise delete from local storage

  const nameSelected = selectEl.value;

  const setFavorite = () => {
    if ((document.getElementById('favorite').checked)) {
      localStorage.setItem('favorite', nameSelected);
    } else {
      localStorage.setItem('favorite', '')
    }
  };

  setFavorite();
  
  // fetching data from API
  const inputVal = selectEl.value;

  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (responseJson) {
      console.log(responseJson);

      let characters = responseJson;

      const result = characters.filter(function (character) {
        return character.name === inputVal;
      });
      
      //define values used from API

      const finalResult = result[0];

      this.name = finalResult.name;
      this.species = finalResult.species;
      this.gender = finalResult.gender;
      this.house = finalResult.house;
      this.dateOfBirth = finalResult.dateOfBirth;
      this.ancestry = finalResult.ancestry;
      this.eyeColour = finalResult.eyeColour;
      this.hairColour = finalResult.hairColour;
      this.wandWood = finalResult.wand.wood;
      this.wandCore = finalResult.wand.core;
      this.wandLength = finalResult.wand.length;
      this.wand = `Wood: ${wandWood} Core: ${wandCore} Length: ${wandLength} inches`;
      this.patronus = finalResult.patronus;
      this.actor = finalResult.actor;
      this.image = finalResult.image;


      // insert results into html
      const div = document.createElement('div');
      container.appendChild(div);
      div.innerHTML =
        `<img class="center" src= ${image} />
                <h2>${ name }</h2>
                <div class="characteristics">
                    <p><span>Species: </span>${ species }</p>
                    <p><span>Gender: </span>${ gender }</p>
                    <p><span>Date of Birth: </span>${ dateOfBirth }</p>
                    <p><span>Ancestry: </span>${ ancestry }</p>
                    <p><span>Eye Color: </span>${ eyeColour }</p>
                    <p><span>Hair Color: </span>${ hairColour }</p>
                    <p><span>Wand: </span>${ wand }</p>
                    <p><span>Patronus: </span>${ patronus }</p>
                    <p><span>Actor: </span>${ actor }</p>
                </div>`
    })

    .catch(function () {
      console.log(`No results found`);
    })

});