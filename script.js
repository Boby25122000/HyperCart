let productssection = document.getElementById("productssection");

async function getProducts() {
    try {
        let response = await fetch("https://fakestoreapi.com/products");
        let data = await response.json();
        // console.log(data);
        displayAllProducts(data); // Sending the products array directly
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
        let productImage = document.createElement("img");
        let productTitle = document.createElement("h2");
        let productPrice = document.createElement("p");
        let productBrand = document.createElement("p");

        //! Setting attributes and styles
        cardContainer.classList.add("card-container");
        productImage.setAttribute("src", ele.image);
        productImage.setAttribute("alt", ele.title);

        //! Adding text content
        productTitle.textContent = ele.title;
        productPrice.textContent = `Price: $${ele.price}`;
        productBrand.textContent = `Category: ${ele.category}`;

        //! Appending elements
        cardContainer.append(productImage, productTitle, productPrice, productBrand);
        productssection.append(cardContainer);
    });
}
