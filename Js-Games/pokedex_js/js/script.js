const PokemonName= document.querySelector('.pokemon_name');
const PokemonNumber= document.querySelector('.pokemon_number');
const PokemonImage= document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon=1;

const fetchPokemon = async (pokemon) => {
    const APIresponse =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIresponse.status ===200){
    const data= await APIresponse.json();
    return data;}
}

const renderPokemon = async (pokemon)=>{

    PokemonName.innerHTML = 'carregando...';
    PokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
    PokemonName.innerHTML = data.name;
    PokemonNumber.innerHTML = data.id;
    PokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value='';
    } else{
        // PokemonImage.style.display='none';
        PokemonName.innerHTML = 'não encontrado :c';
        PokemonNumber='';
    }
}

form.addEventListener('submit',(event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click',(event) =>{
   alert('prev clicked')
});

buttonNext.addEventListener('click',(event) =>{
    alert('next clicked')
 });

renderPokemon(searchPokemon);


