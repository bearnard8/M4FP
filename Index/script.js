// Endpoint API lista prodotti
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

//Box dei risultati:
const resultsBox = document.getElementById("card-container");

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
        card.classList.add("card", "border-0");

    /* Bottone per il modale del prodotto
    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <img src="https://m.media-amazon.com/images/I/61UQCijyvrL._AC_SX522_.jpg" alt="">
    </button>
    */

    let imgBox = document.createElement("button");
        imgBox.classList.add("card-img", "border-0", "btn");
        imgBox.setAttribute("type", "button");
        imgBox.setAttribute("data-bs-toggle", "modal");
        imgBox.setAttribute("data-bs-target", `#modal${_id}`);
    let productImg = document.createElement("img");
        productImg.src = imageUrl;
        productImg.classList.add("img-fluid");
    let textBox = document.createElement("div");
        textBox.classList.add("card-text");
    let productName = document.createElement("p");
        productName.classList.add("mb-0", "fw-bold");
        productName.innerText = name;
    /*let productDescription = document.createElement("p");
        productDescription.classList.add("mb-0", "product-desc");
        productDescription.innerText = description;*/
    let productBrand = document.createElement("p");
        productBrand.classList.add("mb-0");
        productBrand.innerText = brand;
    let priceBox = document.createElement("div");
        priceBox.classList.add("d-flex", "align-items-center", "mt-1", "fst-italic");
    let priceBoxInner = document.createElement("span");
        priceBoxInner.classList.add("d-flex", "align-items-center");
        priceBoxInner.innerText = "€";
    let dynPrice = document.createElement("span");
        dynPrice.classList.add("mx-1");
        dynPrice.innerText = price;
    
    //Product modal
    /*
    <div class="modal fade" id="ciao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex p-4">
                    <span class="product-img me-2">
                        <img src="https://m.media-amazon.com/images/I/61UQCijyvrL._AC_SX522_.jpg" alt="" class="img-fluid">
                    </span>
                    <span class="text ms-2 d-flex flex-column align-items-start justify-content-center">
                        <div class="modal-product-name fw-bold mb-1">
                            iPhone bla bla
                        </div>
                        <div class="modal-product-desc mb-1">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi temporibus iusto fuga error quia deserunt ad eveniet autem aut corrupti. Est aut exercitationem molestiae doloremque unde eveniet nihil aliquam odit.
                        </div>
                        <div class="modal-product-price">
                            15482
                        </div>
                    </span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ciao</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    */ 
    let modalContainer = document.createElement("div");
        modalContainer.classList.add("modal", "fade");
        modalContainer.setAttribute("id", `modal${_id}`);
        modalContainer.setAttribute("tabindex", "-1");
        modalContainer.setAttribute("aria-labelledby", "exampleModalLabel"); //da capire
        modalContainer.setAttribute("aria-hidden", "true");
    let modalDialog = document.createElement("div");
        modalDialog.classList.add("modal-dialog");
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
    /*
    <span class="product-img me-2">
        <img src="https://m.media-amazon.com/images/I/61UQCijyvrL._AC_SX522_.jpg" alt="" class="img-fluid">
    </span>
    <span class="text ms-2 d-flex flex-column align-items-start justify-content-center">
        <div class="modal-product-name fw-bold mb-1">
            iPhone bla bla
        </div>
        <div class="modal-product-desc mb-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi temporibus iusto fuga error quia deserunt ad eveniet autem aut corrupti. Est aut exercitationem molestiae doloremque unde eveniet nihil aliquam odit.
        </div>
        <div class="modal-product-price">
            15482
        </div>
    </span>
    */
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
    let confirmBtn = document.createElement("button");
        confirmBtn.classList.add("btn", "btn-primary");
        confirmBtn.setAttribute("type", "button");
        confirmBtn.innerText = "Confirm";

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
                    modalFooter.appendChild(confirmBtn);



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


    resultsBox.appendChild(cardBox);
        cardBox.appendChild(card);
            card.appendChild(imgBox);
                imgBox.appendChild(productImg);
            card.appendChild(textBox);
                textBox.appendChild(productName);
                //textBox.appendChild(productDescription);
                textBox.appendChild(productBrand);
                textBox.appendChild(priceBox);
                    priceBox.appendChild(priceBoxInner);
                        priceBoxInner.appendChild(dynPrice);
            /*card.appendChild(buttonBox);
                buttonBox.appendChild(cartButton);
                buttonBox.appendChild(skipButton);*/

}

