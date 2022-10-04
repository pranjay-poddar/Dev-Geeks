const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const searchTerm = form.elements.query.value;
    const config = { params: {q: searchTerm}}
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config)
    makeImages(res.data);
    // addName(res.data);
    form.elements.query.value = ''; 
})

const makeImages = (shows) => {
    const TV_Shows_lists = document.querySelector('.shows-list');
    TV_Shows_lists.innerHTML = "";

    for(let result of shows){
        if(result.show.image && result.show.name && result.show.language && result.show.premiered){

            const Shows_container = document.createElement('div');
            Shows_container.classList.add('shows-container');

            const Image_container = document.createElement('div');
            Image_container.classList.add('show-poster');

            const Img = document.createElement('img')
            Img.src = result.show.image.medium;


            const other_details= document.createElement('div');
            other_details.classList.add('other-details');

            const show_name= document.createElement('div');
            show_name.classList.add('name');
            show_name.innerText = result.show.name;

            const show_language= document.createElement('div');
            show_language.classList.add('language');
            show_language.innerText = result.show.language;

            const show_premiered= document.createElement('div');
            show_premiered.classList.add('premiered');
            show_premiered.innerText= result.show.premiered;

            Image_container.appendChild(Img);
            other_details.appendChild(show_name);
            other_details.appendChild(show_language);
            other_details.appendChild(show_premiered);
            Shows_container.appendChild(Image_container);
            Shows_container.appendChild(other_details);
            TV_Shows_lists.appendChild(Shows_container);

              
        }
    }
}
// const addName = (shows) => {
//     const TV_Shows_lists = document.querySelector('.shows-list');

//     for(let result of shows){
//         if(result.show.name){

//             const show_name = document.createElement('div');
//             show_name.classList.add('show-name');
//             show_name.innerText = result.show.name;
            
//         }
//     }
// }