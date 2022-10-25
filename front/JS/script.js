//On met les données sous forme d'un tableau à parcourir
let data = [];


//On récupère les données de l'API
const fetchKanap = async () => {
    await fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((promise) => {data = promise; 
                        console.log(data);
                    });
};

let productSection = document.getElementById("items");

//On effectue une boucle dans le tableau vue d'afficher l'ensemble des produits sur la page
const displayIndex = async () => {
    await fetchKanap();
    for(i = 0; i < data.length; i++) {
    const productCard = `<a href="./product.html?id=${data[i]._id}">
    <article>
      <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
      <h3 class="productName">${data[i].name}</h3>
      <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
    </article>
  </a>`;
  productSection.innerHTML += productCard;
};
};


displayIndex();