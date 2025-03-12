document.addEventListener("DOMContentLoaded", () => {
    displayCartItems(); // Load cart data on page load
});

// Function to update cart count dynamically
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").innerText = totalItems;
}

// Handle Cart Toggle Like Flipkart
document.getElementById("myCartBtn").addEventListener("click", () => {
    let cartSection = document.getElementById("cartSection");
    cartSection.classList.toggle("show-cart"); // Toggle class for visibility
});



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

let productssection = document.getElementById("productssection");
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
    // console.log("added to cart");
    // console.log(product);

    // initializing cart variable
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // finding index pf existing product
    let existingProductIndex = cart.findIndex((ele) => ele.id === product.id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity  += 1;        // cart[existingProductIndex].quantity+1
    } else {
        cart.push({ ...product, quantity: 1})
    }

    // store cart in localStorage
    localStorage.setItem("cart",JSON.stringify(cart));

    // alert msg
    alert(`${product.title} added to cart`);

    displayCartItems()
}

function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // console.log(cart);

    let cartsection = document.getElementById("cartSection");
    // cartsection.innerHTML = "<h1>My Cart</h1>";
    cartSection.innerHTML = `
    <button id="myCartBtn">
        <i class="bi bi-cart4"></i> My Cart <span id="cartCount">${cart.length}</span>
    </button>
`;

    if (cart.length === 0) {
        cartsection.innerHTML += "<h1>Cart is Empty</h1>";
    } else {
        cart.map((item,index) => {
            let div =document.createElement("div");
            div.innerHTML = `
            <img src='${item.image}'>
            <h2>${item.title}</h2> 
            <p>Quantity ${item.quantity}</p>
            <p>Price ${item.quantity * item.price}</p>
            <button onclick='removeCartItem(${index})'>remove</button>
            `;
            cartsection.appendChild(div);
        }); 
    }
    updateCartCount();

}

function removeCartItem(index) {
    // console.log("remove", index);
    
    let cart = JSON.parse(localStorage.getItem("cart")) || []

    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1
    } else {
        cart.splice(index,1)
    }

    localStorage.setItem("cart", JSON.stringify(cart))

    displayCartItems()
}

// window.addEventListener("load" ,() => {
//     displayCartItems()
// })
window.addEventListener("load", displayCartItems);




//! humburger
function toggleMenu() {
    const menu = document.getElementById("dropdownMenu");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}
