// Endpoint API lista prodotti
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

// Box dei risultati:
const resultsBox = document.getElementById("card-container");

// Input di ricerca prodotto
const searchProdInput = document.getElementById("search-prod-input");

// Funzioni di filtraggio
window.onload = createFilterBtns();

// Funzione per creare i bottoni delle categorie in base a quelle presenti
async function createFilterBtns () {

    const divider = "-";
    let categories = [];

    try {
        const res = await fetch(endpoint, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZTljMjljNDM3MDAwMTkzYzM3MTciLCJpYXQiOjE3MDg0NTIyOTAsImV4cCI6MTcwOTY2MTg5MH0.YXeB9lmn-AGHu-2ecBBH9Gc7mLil69yE2l0g1f1Yd7A'
            }
        });
        const json = await res.json();
        // Creo un array con le categorie presenti tra i prodotti
        json.forEach((product) => {
            const dividerIndex = product.description.indexOf(divider);
            const prodSubstr = product.description.substring(0, dividerIndex)
            if (!(categories.includes(prodSubstr.trim()))) {
                categories.push(prodSubstr.trim());
            }
        });
        // Creo un bottone per ogni categoria presente nell'array
        categories.forEach((category) =>{
            let catBtn = document.createElement("button");
                catBtn.classList.add("filter-btn", "btn", "btn-outline-primary", "mx-2");
                catBtn.value = category;
                catBtn.innerText = category;
            let btnParent = document.getElementById("filter-buttons");
                btnParent.appendChild(catBtn);
        });
    } catch (err) {
        console.log(err);
    }

    const buttons = document.querySelectorAll(".filter-btn");
    // Assegnazione dell'evento ai bottoni delle categorie
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            filterResults(button.value);
        })
    })
}

// Recupero i dati dall'endpoint
window.onload = getProducts();

async function getProducts() {
    resultsBox.innerHTML = "";
    try {
        const res = await fetch(endpoint, {
                headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZTljMjljNDM3MDAwMTkzYzM3MTciLCJpYXQiOjE3MDg0NTIyOTAsImV4cCI6MTcwOTY2MTg5MH0.YXeB9lmn-AGHu-2ecBBH9Gc7mLil69yE2l0g1f1Yd7A'
            }});
        const json = await res.json();
        json.forEach((product) => {
            createCardTemplate(product);
        });
    } catch (error) {
        console.log(error)
    }
}

// Funzione per creare le card con i prodotti
function createCardTemplate ({_id, name, description, brand, imageUrl, price}) {

    let cardBox = document.createElement("div");
        cardBox.classList.add("mb-4", "col-lg-2", "col-md-3", "col-sm-6");
    let card = document.createElement("div");
        card.classList.add("card", "border-0", "p-2", "d-flex", "flex-column", "justify-content-between", "h-100");
    let imgBox = document.createElement("button");
        imgBox.classList.add("card-img", "border-0", "btn");
        imgBox.setAttribute("type", "button");
        imgBox.setAttribute("data-bs-toggle", "modal");
        imgBox.setAttribute("data-bs-target", `#modal${_id}`);
    let productImg = document.createElement("img");
        productImg.src = imageUrl;
        productImg.classList.add("img-fluid", "mh-100");
    let textBox = document.createElement("div");
        textBox.classList.add("card-text", "d-flex", "flex-column", "justify-content-between");
    let productInfo = document.createElement("div");
        productInfo.classList.add("card-text");
    let productName = document.createElement("p");
        productName.classList.add("mb-0", "fw-bold");
        productName.innerText = name;
    let productBrand = document.createElement("p");
        productBrand.classList.add("mb-0");
        productBrand.innerText = brand;
    let priceBox = document.createElement("div");
        priceBox.classList.add("d-flex", "align-items-center", "justify-content-between", "m-0", "fst-italic");
    let priceBoxInner = document.createElement("span");
        priceBoxInner.classList.add("d-flex", "align-items-center", "ms-3");
    let dynPrice = document.createElement("span");
        dynPrice.classList.add("mx-1");
        dynPrice.innerText = price;
    let priceCurr = document.createElement("span");
        priceCurr.innerText = "€";
    let cartButton = document.createElement("button");
        cartButton.classList.add("btn", "btn-success", "mb-1", "me-3", "px-2", "py-1", "text-center");
        cartButton.type = "button";
        cartButton.addEventListener("click", () => {
            addToCart(product);
        });
    let cartIcon = document.createElement("i");
        cartIcon.classList.add("fa-solid", "fa-cart-plus")
        
    resultsBox.appendChild(cardBox);
        cardBox.appendChild(card);
            card.appendChild(imgBox);
                imgBox.appendChild(productImg);
            card.appendChild(textBox);
                textBox.appendChild(productInfo)
                    productInfo.appendChild(productName);
                    productInfo.appendChild(productBrand);
                textBox.appendChild(priceBox);
                    priceBox.appendChild(priceBoxInner);
                        priceBoxInner.appendChild(dynPrice);
                        priceBoxInner.appendChild(priceCurr);
                    priceBox.appendChild(cartButton);        
                        cartButton.appendChild(cartIcon);

    // Modale con i dettagli del prodotto
    let modalContainer = document.createElement("div");
        modalContainer.classList.add("modal", "fade");
        modalContainer.setAttribute("id", `modal${_id}`);
        modalContainer.setAttribute("tabindex", "-1");
        modalContainer.setAttribute("aria-labelledby", "exampleModalLabel"); //da capire
        modalContainer.setAttribute("aria-hidden", "true");
    let modalDialog = document.createElement("div");
        modalDialog.classList.add("modal-dialog", "modal-dialog-centered", "modal-dialog-scrollable");
    let modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        modalContent.setAttribute("id", _id);
    let modalHeader = document.createElement("div");
        modalHeader.classList.add("modal-header");
    let xBtn = document.createElement("button");
        xBtn.classList.add("btn-close");
        xBtn.setAttribute("type", "button");
        xBtn.setAttribute("data-bs-dismiss", "modal");
        xBtn.setAttribute("aria-label", "Close");
    let modalBody = document.createElement("div");
        modalBody.classList.add("modal-body", "d-flex", "p-4");
    let modalImgBox = document.createElement("span");
        modalImgBox.classList.add("product-img", "me-2");
    let modalImg = document.createElement("img");
        modalImg.classList.add("img-fluid");
        modalImg.src = imageUrl;
    let modalText = document.createElement("span");
        modalText.classList.add("text", "ms-2", "d-flex", "flex-column", "align-items-start", "justify-content-center");
    let modalProdName = document.createElement("div");
        modalProdName.classList.add("modal-product-name", "fw-bold", "mb-1");
        modalProdName.innerText = name;
    let modalProdDesc = document.createElement("div");
        modalProdDesc.classList.add("modal-prod-desc", "mb-1");
        modalProdDesc.innerText = description;
    let modalProdPrice = document.createElement("div");
        modalProdPrice.classList.add("modal-product-price");
        modalProdPrice.innerText = price;
    let modalFooter = document.createElement("div");
        modalFooter.classList.add("modal-footer");
    let closeBtn = document.createElement("button");
        closeBtn.classList.add("btn", "btn-secondary");
        closeBtn.setAttribute("type", "button");
        closeBtn.setAttribute("data-bs-dismiss", "modal");
        closeBtn.innerText = "Close";
    let modalCartButton = document.createElement("button");
        modalCartButton.classList.add("btn", "btn-success", "mb-1", "me-3", "px-2", "py-1", "text-center");
        modalCartButton.type = "button";
        modalCartButton.addEventListener("click", () => {
            addToCart(product);
        });
        modalCartButton.innerText = "Add to Cart";
    let modalCartIcon = document.createElement("i");
        modalCartIcon.classList.add("fa-solid", "fa-cart-plus", "ms-1")

    resultsBox.appendChild(modalContainer);
        modalContainer.appendChild(modalDialog);
            modalDialog.appendChild(modalContent);
                modalContent.appendChild(modalHeader);
                    modalHeader.appendChild(xBtn);
                modalContent.appendChild(modalBody);
                    modalBody.appendChild(modalImgBox);
                        modalImgBox.appendChild(modalImg);
                    modalBody.appendChild(modalText);
                        modalText.appendChild(modalProdName);
                        modalText.appendChild(modalProdDesc);
                        modalText.appendChild(modalProdPrice);
                modalContent.appendChild(modalFooter)
                    modalFooter.appendChild(closeBtn);
                    modalFooter.appendChild(modalCartButton);
                        modalCartButton.appendChild(modalCartIcon);
}

// Funzione per filtrare i prodotti rispetto alle categorie

async function filterResults (category) {

    const divider = "-";
    const filteredResults = [];

    try {
        const res = await fetch(endpoint, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZTljMjljNDM3MDAwMTkzYzM3MTciLCJpYXQiOjE3MDg0NTIyOTAsImV4cCI6MTcwOTY2MTg5MH0.YXeB9lmn-AGHu-2ecBBH9Gc7mLil69yE2l0g1f1Yd7A'
            }
        });
        const json = await res.json();
            json.filter((product) => {
                const dividerIndex = product.description.indexOf(divider);
                const prodSubstr = product.description.substring(0, dividerIndex)
                if (prodSubstr.trim() === category) {
                    filteredResults.push(product);
                }
                return filteredResults;
            });
        resultsBox.innerHTML = "";
        filteredResults.forEach((product) =>{
            createCardTemplate(product);
        });
    } catch (err) {
        console.log(err);
    }
}

// Funzione per ricercare un prodotto in base a una stringa di ricerca
async function searchProduct () {

    const searchKey = searchProdInput.value;
    let searchResults = [];

    try {
        const res = await fetch(endpoint, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZTljMjljNDM3MDAwMTkzYzM3MTciLCJpYXQiOjE3MDg0NTIyOTAsImV4cCI6MTcwOTY2MTg5MH0.YXeB9lmn-AGHu-2ecBBH9Gc7mLil69yE2l0g1f1Yd7A'
            }
        });
        const json = await res.json();
        json.forEach((product) => {
            if(product.name.toLowerCase().trim().includes(searchKey.toLowerCase().trim()) || product.description.toLowerCase().trim().includes(searchKey.toLowerCase().trim()) || product.brand.toLowerCase().trim().includes(searchKey.toLowerCase().trim())){
                searchResults.push(product)
            }
        });
        resultsBox.innerHTML = "";
        searchResults.forEach((product) =>{
            createCardTemplate(product);
        });
    } catch (err) {
        console.log(err);
    }
}