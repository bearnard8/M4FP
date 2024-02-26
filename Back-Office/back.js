// Endpoint API lista prodotti
const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

//Box dei risultati:
const resultsBox = document.getElementById("results-area");

//Box creazione prodotto: nome
const productNameInput = document.getElementById("product-name");

//Box creazione prodotto: descrizione
const productDescriptionInput = document.getElementById("product-description");

//Box creazione prodotto: brand
const productBrandInput = document.getElementById("product-brand");

//Box creazione prodotto: imageUrl
const productImgURLInput = document.getElementById("product-imgurl");

//Box creazione prodotto: price
const productPriceInput = document.getElementById("product-price");

// Tutti gli input
const inputs = [productNameInput, productDescriptionInput, productBrandInput, productImgURLInput, productPriceInput];

// Alert per dati incompleti:
const createInputAlert = document.getElementById("create-alert-msg");

// Alert per eliminazione prodotto:
const deleteInputAlert = document.getElementById("delete-alert-msg");

// Bottone di conferma dell'eliminazione
const confDelBtn = document.getElementById("del-conf-btn");

// Funzioni di filtraggio
// Bottoni per il filtraggio dei risultati
const buttons = document.querySelectorAll(".filter-btn");

// Assegnazione dell'evento ai bottoni delle categorie
buttons.forEach(button => {
    button.addEventListener("click", () => {
        filterResults(button.value);
    })
})

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
            createProductRow(product);
        });
    } catch (error) {
        console.log(error)
    }
}

//Funzione per compilare la lista dei prodotti
function createProductRow({ _id, name, description, brand, imageUrl, price }) {

    // Istruzioni per costruire il template tramite JS:
    let tableRow = document.createElement("tr");
    let rowName = document.createElement("th");
        rowName.innerText = name;
    let rowDesc = document.createElement("td");
        rowDesc.innerText = description;
        rowDesc.classList.add("text-break");
    let rowBrand = document.createElement("td");
        rowBrand.innerText = brand;
    let rowImgUrl = document.createElement("td");
        rowImgUrl.innerText = imageUrl;
        rowImgUrl.classList.add("text-break");
    let rowPrice = document.createElement("td");
        rowPrice.innerText = `${price}€`;
    let rowOps = document.createElement("td");

    // Tasto di modifica:
    let editBtn = document.createElement("a");
        editBtn.classList.add("btn", "btn-primary", "btn-sm");
        editBtn.href = `/Details/details.html?pid=${_id}`;
        editBtn.target = "_blank";
    let editImg = document.createElement("i");
        editImg.classList.add("fa-solid", "fa-pencil");

    // Tasto di cancellazione:
    let delBtn = document.createElement("a");
        delBtn.classList.add("btn", "btn-danger", "btn-sm", "ms-1");
        delBtn.setAttribute("type", "button");
        delBtn.setAttribute("data-bs-toggle", "modal");
        delBtn.setAttribute("data-bs-target", `#modal${_id}`);
    let delImg = document.createElement("i");
        delImg.classList.add("fa-solid", "fa-trash");

    // Modale per la conferma della cancellazione
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
    let modalHeader = document.createElement("div");
        modalHeader.classList.add("modal-header");
    let xBtn = document.createElement("button");
        xBtn.classList.add("btn-close");
        xBtn.setAttribute("type", "button");
        xBtn.setAttribute("data-bs-dismiss", "modal");
        xBtn.setAttribute("aria-label", "Close");
    let modalBody = document.createElement("div");
        modalBody.classList.add("modal-body");
    let modalText = document.createElement("span");
        modalText.classList.add("text");
        modalText.innerText = "Sei sicuro di voler eliminare questo prodotto?"
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
        confirmBtn.addEventListener("click", () => {
            deleteProduct(_id);
        });
        
    resultsBox.appendChild(tableRow);
        tableRow.appendChild(rowName);
        tableRow.appendChild(rowDesc);
        tableRow.appendChild(rowBrand);
        tableRow.appendChild(rowImgUrl);
        tableRow.appendChild(rowPrice);
        tableRow.appendChild(rowOps);
            rowOps.appendChild(editBtn);
                editBtn.appendChild(editImg);
            rowOps.appendChild(delBtn);
                delBtn.appendChild(delImg);
    resultsBox.appendChild(modalContainer);
        modalContainer.appendChild(modalDialog);
            modalDialog.appendChild(modalContent);
                modalContent.appendChild(modalHeader);
                    modalHeader.appendChild(xBtn);
                modalContent.appendChild(modalBody);
                    modalBody.appendChild(modalText);
                modalContent.appendChild(modalFooter)
                    modalFooter.appendChild(closeBtn);
                    modalFooter.appendChild(confirmBtn);


    

}

//Funzione per l'inserimento di un nuovo prodotto
async function createProduct() {
    // verifico che tutti i campi siano stati valorizzati
    if ( productNameInput.value && productDescriptionInput.value && productBrandInput.value && productImgURLInput.value && productPriceInput.value ) {
        //definisco l'oggetto con i valori del nuovo prodotto
        let newProduct = {"name": productNameInput.value, "description": productDescriptionInput.value, "brand": productBrandInput.value, "imageUrl": productImgURLInput.value, "price": productPriceInput.value};
        //chiamo la fetch POST per inserire il nuovo oggetto
        try {
            const res = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZTljMjljNDM3MDAwMTkzYzM3MTciLCJpYXQiOjE3MDg0NTIyOTAsImV4cCI6MTcwOTY2MTg5MH0.YXeB9lmn-AGHu-2ecBBH9Gc7mLil69yE2l0g1f1Yd7A',
                "Content-type": "application/json;charset=UTF-8"
            }});
            getProducts();
        } catch (error) {
            console.log(error);
        }
    } else {
        createInputAlert.classList.toggle("d-none");
        setTimeout(() => {
            createInputAlert.classList.toggle(d-none);
        }, 5000);    
    }
    inputs.forEach((input) => {
        input.value = "";
    })
}

//Funzione per la rimozione di un prodotto
async function deleteProduct (pid) {
    const res = await fetch(endpoint + pid, { method: "DELETE", 
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZTljMjljNDM3MDAwMTkzYzM3MTciLCJpYXQiOjE3MDg0NTIyOTAsImV4cCI6MTcwOTY2MTg5MH0.YXeB9lmn-AGHu-2ecBBH9Gc7mLil69yE2l0g1f1Yd7A'
    }});
    deleteInputAlert.classList.toggle("d-none");
    setTimeout(() => {
        deleteInputAlert.classList.toggle(d-none);
    }, 5000);   
    getProducts();
}

// Funzione per il filtraggio della tabella

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
                if (prodSubstr.toLowerCase().trim() === category) {
                    filteredResults.push(product);
                }
                return filteredResults;
            });
        resultsBox.innerHTML = "";
        filteredResults.forEach((product) =>{
            createProductRow(product);
        })
    } catch (err) {
        console.log(err);
    }
}