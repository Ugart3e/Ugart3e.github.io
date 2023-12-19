// Obtener referencias a los elementos del DOM
const pokemonInput = document.getElementById('pokemon-name');
const pokemonList = document.getElementById('pokemon-list');

// Agregar un evento de escucha al cambio en el input para la funcionalidad de autocompletado
pokemonInput.addEventListener('input', function () {
  // Obtener el nombre parcial del Pokémon ingresado
  const partialName = this.value.toLowerCase();

  // Verificar si el nombre parcial tiene al menos 3 caracteres
  if (partialName.length >= 3) {
    // Actualizar la lista de autocompletado
    updateAutocompleteList(partialName);
  } else {
    // Limpiar la lista de autocompletado si el nombre parcial es corto
    clearAutocompleteList();
  }
});

// Función asincrónica para actualizar la lista de autocompletado
async function updateAutocompleteList(partialName) {
  // Limpiar la lista de autocompletado existente
  clearAutocompleteList();

  // Obtener datos de todos los Pokémon
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
  const data = await response.json();

  // Filtrar los Pokémon que coinciden con el nombre parcial
  const matchingPokemon = data.results.filter(pokemon => pokemon.name.includes(partialName));

  // Crear un fragmento de opciones para la lista de autocompletado
  const optionsFragment = document.createDocumentFragment();

  // Crear opciones para cada Pokémon coincidente y agregar eventos de clic
  matchingPokemon.forEach(pokemon => {
    const option = document.createElement('div');
    option.textContent = pokemon.name;

    // Agregar evento de clic para autocompletar el input
    option.addEventListener('click', function () {
      pokemonInput.value = pokemon.name;
      clearAutocompleteList();
    });

    optionsFragment.appendChild(option);
  });

  // Agregar las opciones al contenedor de la lista de autocompletado
  appendAutocompleteOptions(optionsFragment);
}

// Limpiar la lista de autocompletado
function clearAutocompleteList() {
  pokemonList.innerHTML = '';
}

// Agregar opciones de autocompletado al contenedor
function appendAutocompleteOptions(optionsFragment) {
  pokemonList.appendChild(optionsFragment);
}

// Función asincrónica para buscar y mostrar información sobre un Pokémon
async function searchPokemon() {
  // Obtener el nombre del Pokémon ingresado
  const pokemonName = pokemonInput.value.toLowerCase();

  // Obtener datos del Pokémon
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const data = await response.json();

  // Verificar si se encontraron datos del Pokémon
  if (data.sprites) {
    // Obtener datos adicionales sobre la especie del Pokémon
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`);
    const speciesData = await speciesResponse.json();

    // Obtener la descripción y la cadena de evolución del Pokémon
    const description = getDescription(speciesData);
    const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionChainData = await evolutionChainResponse.json();
    const evolutionStage = getEvolutionStage(evolutionChainData, pokemonName);

    // Obtener datos de Pokémon anterior y siguiente
    const prevPokemonData = await fetchPokemon(data.id - 1);
    const nextPokemonData = await fetchPokemon(data.id + 1);

    // Mostrar las tarjetas de Pokémon
    displayPokemonCards([prevPokemonData, data, nextPokemonData], [description, description, description], [evolutionStage, evolutionStage, evolutionStage]);
  } else {
    // Alerta si el Pokémon no se encuentra
    alert('Pokémon no encontrado');
  }

  // Limpiar el contenido del input después de la búsqueda
  pokemonInput.value = '';

  // Limpiar la lista de autocompletado
  clearAutocompleteList();
}

// Agregar evento de clic para limpiar la lista cuando se hace clic fuera del input y la lista
document.addEventListener('click', function (event) {
  if (!event.target.closest('#pokemon-search')) {
    clearAutocompleteList();
  }
});

// Función asincrónica para obtener datos de un Pokémon por su ID
async function fetchPokemon(pokemonId) {
  // Verificar si el ID del Pokémon está dentro del rango válido
  if (pokemonId < 1 || pokemonId > 1000) {
    return null;
  }

  // Obtener datos del Pokémon por su ID
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const pokemonData = await response.json();
  return pokemonData;
}

// Función para mostrar las tarjetas de Pokémon
function displayPokemonCards(pokemonDataArray, descriptions, evolutionStages) {
  // Obtener el contenedor de tarjetas de Pokémon
  const pokemonCardsContainer = document.getElementById('pokemon-cards');
  // Limpiar el contenido existente en el contenedor
  pokemonCardsContainer.innerHTML = '';

  // Iterar sobre los datos de los Pokémon y crear las tarjetas correspondientes
  for (let i = 0; i < 3; i++) {
    const pokemonCard = document.createElement('div');
    // Establecer clases y ID según la posición en el array
    pokemonCard.className = (i === 1) ? 'pokemon-card main-card' : 'pokemon-card small-card';
    pokemonCard.id = (i === 0) ? 'previous-pokemon' : (i === 1) ? 'current-pokemon' : 'next-pokemon';

    // Verificar si existen datos del Pokémon en la posición actual
    if (pokemonDataArray[i]) {
          // Obtener el tipo del Pokémon
          const type = pokemonDataArray[i].types.length > 0 ? pokemonDataArray[i].types[0].type.name : '';

          // Agregar la clase del tipo a la tarjeta
          pokemonCard.className += ` ${type}`;
    
          // Construir el enlace a la página de la wiki del Pokémon
          const wikiLink = `https://pokemon.fandom.com/wiki/${pokemonDataArray[i].name}`;
    
          // Obtener las imágenes normales y brillantes del Pokémon
          const normalImage = pokemonDataArray[i].sprites.front_default;
          const shinyImage = pokemonDataArray[i].sprites.front_shiny;
    
          // Construir el contenido HTML de la tarjeta
          pokemonCard.innerHTML = `
            <h2>${pokemonDataArray[i].name} (#${pokemonDataArray[i].id})</h2>
            <a href="${wikiLink}" target="_blank">
              <img class="pokemon-image" src="${normalImage}" alt="${pokemonDataArray[i].name}"
                onmouseover="handleImageHover(this, '${shinyImage}')" onmouseout="handleImageHover(this, '${normalImage}')">
            </a>
            <p><strong>Tipo:</strong> ${pokemonDataArray[i].types.map(type => type.type.name).join(', ')}</p>
            <p><strong>Altura:</strong> ${pokemonDataArray[i].height / 10} m</p>
            <p><strong>Peso:</strong> ${pokemonDataArray[i].weight / 10} kg</p>
            <p><strong>Número de la Pokédex:</strong> ${pokemonDataArray[i].id}</p>
            <p><strong>Descripción:</strong> ${descriptions[i]}</p>
            <p><strong>Evolución:</strong> ${evolutionStages[i]}</p>
          `;
        }
    
        // Agregar la tarjeta al contenedor de tarjetas
        pokemonCardsContainer.appendChild(pokemonCard);
      }
    }
    
    // Función para manejar el evento de pasar el ratón sobre la imagen
    function handleImageHover(element, newSrc) {
      element.src = newSrc;
      element.classList.toggle('enlarged-image');
    }
    
    // Función para obtener la descripción de un Pokémon
    function getDescription(speciesData) {
      // Código para obtener la descripción de un Pokémon
      const languageCode = 'es';
      const description = speciesData.flavor_text_entries.find(entry => entry.language.name === languageCode).flavor_text;
      return description;
    }
    
    // Función para obtener la etapa de evolución de un Pokémon
    function getEvolutionStage(evolutionChainData, pokemonName) {
      // Código para obtener la etapa de evolución de un Pokémon
      if (evolutionChainData.chain.species.name === pokemonName) {
        return 'Primera Evolución';
      } else if (evolutionChainData.chain.evolves_to.some(evolution => evolution.species.name === pokemonName)) {
        return 'Segunda Evolución';
      } else if (evolutionChainData.chain.evolves_to.some(evolution => evolution.evolves_to.some(subEvolution => subEvolution.species.name === pokemonName))) {
        return 'Tercera Evolución';
      } else {
        return 'No especificado';
      }
    }
    
    // Función asincrónica para obtener el Pokémon anterior
    async function prevPokemon() {
      // Código para obtener el Pokémon anterior
      const currentPokemonId = parseInt(document.getElementById('current-pokemon').querySelector('h2').innerText.match(/\d+/)[0]);
      await fetchAndDisplayPokemon(currentPokemonId - 1);
    }
    
    // Función asincrónica para obtener el Pokémon siguiente
    async function nextPokemon() {
      // Código para obtener el Pokémon siguiente
      const currentPokemonId = parseInt(document.getElementById('current-pokemon').querySelector('h2').innerText.match(/\d+/)[0]);
      await fetchAndDisplayPokemon(currentPokemonId + 1);
    }
    
    // Función asincrónica para obtener y mostrar un Pokémon por su ID
    async function fetchAndDisplayPokemon(pokemonId) {
      // Código para obtener y mostrar un Pokémon por su ID
      const pokemonData = await fetchPokemon(pokemonId);
      if (pokemonData) {
        // Obtener datos adicionales sobre la especie del Pokémon
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}`);
        const speciesData = await speciesResponse.json();
    
        // Obtener la descripción y la cadena de evolución del Pokémon
        const description = getDescription(speciesData);
        const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionChainData = await evolutionChainResponse.json();
        const evolutionStage = getEvolutionStage(evolutionChainData, pokemonData.name);
    
        // Obtener datos de Pokémon anterior y siguiente
        const prevPokemonData = await fetchPokemon(pokemonId - 1);
        const nextPokemonData = await fetchPokemon(pokemonId + 1);
    
        // Mostrar las tarjetas de Pokémon
        displayPokemonCards([prevPokemonData, pokemonData, nextPokemonData], [description, description, description], [evolutionStage, evolutionStage, evolutionStage]);
      } else {
        // Alerta si no hay información disponible para ese Pokémon
        alert('No hay información disponible para ese Pokémon');
      }
    }