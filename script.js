// Endpoint API lista prodotti
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

//Box dei risultati:
const resultsBox = document.getElementById("card-container");

// Recupero i dati dall'endpoint
const productsData = async () => {
    try {
        const response = await fetch(endpoint, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZTljMjljNDM3MDAwMTkzYzM3MTciLCJpYXQiOjE3MDg0NTIyOTAsImV4cCI6MTcwOTY2MTg5MH0.YXeB9lmn-AGHu-2ecBBH9Gc7mLil69yE2l0g1f1Yd7A'
            }
        });
        const products = await response.json();
        createCard(products);
    } catch (error) {
        console.log(error);
    }
}

window.onload = productsData;

function createCard (products) {
    products.forEach(product => {
        let card = document.createElement("div");
            card.classList.add("card", "mb-5", "ms-1", "border-0", "col-lg-2", "col-md-4", "col-sm-6");
        let imgBox = document.createElement("div");
            imgBox.classList.add("card-img");
        let productImg = document.createElement("img");
            productImg.src = product.imageUrl;
            productImg.classList.add("img-fluid");
        let textBox = document.createElement("div");
            textBox.classList.add("card-text");
        let productName = document.createElement("p");
            productName.classList.add("mb-0");
            productName.innerText = product.name;
        let priceBox = document.createElement("div");
            priceBox.classList.add("d-flex", "align-items-center", "mt-1", "fst-italic");
        let priceBoxInner = document.createElement("span");
            priceBoxInner.classList.add("d-flex", "align-items-center");
            priceBoxInner.innerText = "€";
        let dynPrice = document.createElement("span");
            dynPrice.classList.add("mx-1");
            dynPrice.innerText = product.price;
        
        /*
        let buttonBox = document.createElement("div");
        buttonBox.classList.add("row")
        let cartButton = document.createElement("button");
        cartButton.classList.add("btn", "btn-success", "mb-1", "col-6");
        cartButton.type = "button";
        cartButton.addEventListener("click", () => {
            addToCart(book);
        });
        cartButton.innerText = "Add to Cart";
        let skipButton = document.createElement("button");
        skipButton.classList.add("btn", "btn-danger", "mb-1", "col-6");
        skipButton.type = "button";
        skipButton.innerText = "Skip";
        skipButton.addEventListener("click", () => {
            skipBook(card);
        });
        */


        resultsBox.appendChild(card);
            card.appendChild(imgBox);
                imgBox.appendChild(productImg);
            card.appendChild(textBox);
                textBox.appendChild(productName);
                textBox.appendChild(priceBox);
                    priceBox.appendChild(priceBoxInner);
                        priceBoxInner.appendChild(dynPrice);
            /*card.appendChild(buttonBox);
                buttonBox.appendChild(cartButton);
                buttonBox.appendChild(skipButton);*/
    });
}