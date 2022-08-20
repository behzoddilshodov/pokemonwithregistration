if (!localStorage.getItem("token")) {
  window.location.href = "/registration.html"
}//signup
let elWrapper = document.querySelector(".movie__wrapper");
let elLogOut = document.querySelector(".logout")
let elForm = document.querySelector(".search__form");
let elInputHeight = document.querySelector(".form__height");
let elInputWeight = document.querySelector(".form__weight");
let elInputType= document.querySelector(".form__type");
let elInputSort = document.querySelector("#inputGroupSelect01");
let elRenderResult = document.querySelector("#results");
let elPokemonTemplate = document.querySelector("#movie_card").content;
let elInputName = document.querySelector(".name");
let elInputSpawnTime = document.querySelector(".form__spawn-time");
let elLike = document.querySelector(".btnlike");
let elSearch = document.querySelector(".search")
let elCardWrapper = document.querySelector("card__wrapper")
let elBookmarkedList = document.querySelector(".bookmark__list")
let elSecondTemplate = document.querySelector("#itemlol").content
let pokemonArray = pokemons.slice(0, 150);
let bookmarkedPokemon = []
elLogOut.addEventListener("click", function () {
  localStorage.removeItem("token")
  window.location.href = "/registration.html"
})

//gey types
function getType(array) {
  let newArray = []
  array.forEach(item => {
    let type = item.type;
    
    type.forEach(item1 => {
      if (!newArray.includes(item1)) {
        newArray.push(item1)
      }
    });
  })
  return newArray
  
};

getType(pokemonArray)
let types = (getType(pokemonArray));


//render types
function getTypes(array, wrapper) {
  let fragment = document.createDocumentFragment();
  
  for (const item of array) {
    let newOption = document.createElement("option");
    newOption.textContent = item;
    newOption.value = item;
    fragment.appendChild(newOption);
  }
  wrapper.appendChild(fragment)
}

getTypes(types, elInputType)


//render pokemon
function renderPokemon(array, wrapper) {
  wrapper.innerHTML = null;
  // elRenderResult.textContent = array.length
  
  let fragment = document.createDocumentFragment();
  
  for (const item of array) {
    
    
    let pokemonTemplate = elPokemonTemplate.cloneNode(true);
    pokemonTemplate.querySelector(".movie__img").src = item.img;
    pokemonTemplate.querySelector(".movie__title").textContent = item.name;
    pokemonTemplate.querySelector(".pokemon__height").textContent = item.height;
    pokemonTemplate.querySelector(".pokemon__weight").textContent = item.weight;
    pokemonTemplate.querySelector(".pokemon__type").textContent = item.type;
    pokemonTemplate.querySelector(".btn__bookmark").dataset.bookmarkId = item.id;
    
    console.log( pokemonTemplate.querySelector(".btn__bookmark").dataset.bookmarkId = item.id);
    
    
    
    fragment.appendChild(pokemonTemplate);
  }
  
  wrapper.appendChild(fragment)
}

renderPokemon(pokemonArray, elWrapper)


elForm.addEventListener("submit", function (evt) {
  evt.preventDefault()
  let inputSearch = elSearch.value.trim();
  let pattern = new RegExp(inputSearch, "gi")
  let inputHeight = elInputHeight.value.trim();
  let inputWeight = elInputWeight.value.trim();
  let inputSort = elInputSort.value.trim();
  let inputType = elInputType.value.trim();
  // le
  
  
  
  let filteredArray = pokemonArray.filter(function (item) {
    let isTrue = inputType == "all" ? true: item.type.includes(inputType);
    let searchByName = item.name.match(pattern)
    let validation = Number(item.height.split(" ")[0]) >= inputHeight && Number(item.weight.split(" ")[0]) >= inputWeight && isTrue && searchByName ;
    return validation;
  })
  
  if (inputSort == "weighthighlow") {
    filteredArray.sort((a, b) => {
      return Number(b.weight.split(" ")[0]) - Number(a.weight.split(" ")[0])
    }
    )}
    
    if (inputSort == "weightlowtohigh") {
      filteredArray.sort((a, b) => {
        return Number(a.weight.split(" ")[0]) - Number(b.weight.split(" ")[0])
      }
      )}
      
      if (inputSort == "heighthighlow") {
        filteredArray.sort((a, b) => {
          return Number(b.height.split(" ")[0]) - Number(a.height.split(" ")[0])
        }
        )}
        
        if (inputSort == "heightlowhigh") {
          filteredArray.sort((a, b) => {
            return Number(a.height.split(" ")[0]) - Number(b.height.split(" ")[0])
          }
          )}
          
          
          renderPokemon(filteredArray, elWrapper)
        })
        
        elWrapper.addEventListener("click", function (evt) {
          let currentBookmarkId = evt.target.dataset.bookmarkId; 
          
          if (currentBookmarkId) {
              let foundPokemon = pokemonArray.find(function(item) {
                  return item.id == currentBookmarkId
              })
              
              if (bookmarkedPokemon.length == 0) {
                bookmarkedPokemon.unshift(foundPokemon)
              }else{
                  let isPokemonInArray = bookmarkedPokemon.find(function(item) {
                      return item.name == foundPokemon.name
                  }) 
                  
                  if (!isPokemonInArray) {
                      bookmarkedPokemon.unshift(foundPokemon)
                  }
              }
              renderBookmarks(bookmarkedPokemon)
          }
          
          
      })
      
      
      function renderBookmarks(arrayOfMovies) {
          elBookmarkedList.innerHTML = null
          
          let fragment = document.createDocumentFragment();
          
          for (const item of arrayOfMovies) {
              let bookmarkItem = elSecondTemplate.cloneNode(true);
              bookmarkItem.querySelector(".bookmark__img").src = item.img;
              bookmarkItem.querySelector(".bookmark_name").textContent = item.name;
              bookmarkItem.querySelector(".bookmark__btn").dataset.bookmarkedId = item.id;
              bookmarkItem.querySelector(".bookmark__type").textContent = item.type
           
              fragment.appendChild(bookmarkItem);
          }
          
          elBookmarkedList.appendChild(fragment)
      }

      // enderBookmarks(JSON.parse(localStorage.getItem("bookmarkedPokemon")))
      
      
      elBookmarkedList.addEventListener("click", function (evt) {
          let bookmarkedPokemonId = evt.target.dataset.bookmarkedId
          
          if (bookmarkedPokemonId) {
              let foundBookmarkedPokemon = bookmarkedPokemon.findIndex(function(item) {
                  return item.id == bookmarkedPokemonId;
              })
              
              bookmarkedPokemon.splice(foundBookmarkedPokemon, 1);
          }
          renderBookmarks(bookmarkedPokemon);
      })
      
    
      
    
        
        
        
        
        
        
        
        
        
        