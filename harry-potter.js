const url = 'https://hp-api.herokuapp.com/api/characters';

const formEl = document.getElementById("findCharacters");
const selectEl = document.getElementById('specificName');


console.log(formEl);
console.log(selectEl);


formEl.addEventListener('submit', function (e) {
  e.preventDefault();
  const container = document.getElementById('container');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  const inputVal = selectEl.value;
  console.log(inputVal);
  console.log(url);
  //   // Fetch data from API
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
      // if(characters.name = inputVal) {
      console.log(result);

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
        `<img src= ${image} />
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