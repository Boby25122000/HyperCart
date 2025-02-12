let productssection = document.getElementById("productssection");

async function getProducts() {
    try {
        let response = await fetch("https://fakestoreapi.in/api/products");
        let data = await response.json();
        // console.log(data);
        displayAllProducts(data.products); // Sending the products array directly
    } catch (error) {
        console.log("Error while fetching products", error);
    }
}

getProducts();

function displayAllProducts(allProducts) {
    // console.log(allProducts);

    allProducts.forEach((ele) => {
        // console.log(ele);

        //! Creating elements
        let cardContainer = document.createElement("article");
        // let productImage = document.createElement("img");
        // let productTitle = document.createElement("h2");
        // let productPrice = document.createElement("p");
        // let productBrand = document.createElement("p");

        //! Setting attributes and styles
        cardContainer.setAttribute("class", "card-container");

        cardContainer.innerHTML = `
        <div>
        <img src= '${ele.image}'>
        <h2>${ele.title.slice(0,30)}....</h2>
        </div>

        <h4>Rs.${ele.price}</h4>
        <button onclick = 'handleAddToCart(${JSON.stringify(ele)})'>Add to cart</button>
        `;

        // productImage.setAttribute("src", ele.image);
        // productImage.setAttribute("alt", ele.title);

        // //! Adding text content
        // productTitle.textContent = `${ele.title.slice(0,30)}....`;
        // productPrice.textContent = `Price: Rs.${ele.price}`;
        // productBrand.textContent = `Category: ${ele.category}`;

        // //! Appending elements
        // cardContainer.append(productImage, productTitle, productPrice, productBrand);
        productssection.append(cardContainer);
    });
}

function handleAddToCart(product) { 
    console.log("added to cart");
    console.log(product);
}