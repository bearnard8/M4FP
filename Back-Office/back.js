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

// Alert per dati incompleti:
const createInputAlert = document.getElementById("create-alert-msg");

// Alert per eliminazione prodotto:
const deleteInputAlert = document.getElementById("delete-alert-msg");

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
    // Template tipo:
    // --------------
    // <tr>
    //     <th>Name</th>
    //     <td>Description</td>
    //     <td>Price</td>
    //     <td>
    //         <a class="btn btn-primary btn-sm">
    //             <i class="fa-solid fa-pencil" aria-hidden="true"></i>
    //             <span class="ms-1">Edit</span>
    //         </a>
    //         <a class="btn btn-danger btn-sm ms-1">
    //             <i class="fa-solid fa-trash" aria-hidden="true"></i>
    //             <span class="ms-1">Delete</span>
    //         </a>
    //     </td>
    // </tr>

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
        rowPrice.innerText = price;
    let rowOps = document.createElement("td");

    // Tasto di modifica:
    let editBtn = document.createElement("a");
        editBtn.classList.add("btn", "btn-primary", "btn-sm");
        editBtn.href = `/Details/details.html?pid=${_id}`;
        editBtn.target = "_blank";
    let editImg = document.createElement("i");
        editImg.classList.add("fa-solid", "fa-pencil");
    let editText = document.createElement("span");
        editText.classList.add("ms-1");
        //editText.innerText = "Edit";

        
    // Tasto di cancellazione:
    let delBtn = document.createElement("a");
        delBtn.classList.add("btn", "btn-danger", "btn-sm", "ms-1");
        delBtn.addEventListener("click", () => {
            deleteProduct(_id);
        });
    let delImg = document.createElement("i");
        delImg.classList.add("fa-solid", "fa-trash");
    let delText = document.createElement("span");
        delText.classList.add("ms-1");
        //delText.innerText = "Delete";
        
    editBtn.appendChild(editImg);
    editBtn.appendChild(editText);

    delBtn.appendChild(delImg);
    delBtn.appendChild(delText);

    rowOps.appendChild(editBtn);
    rowOps.appendChild(delBtn);

    tableRow.appendChild(rowName);
    tableRow.appendChild(rowDesc);
    tableRow.appendChild(rowBrand);
    tableRow.appendChild(rowImgUrl);
    tableRow.appendChild(rowPrice);
    tableRow.appendChild(rowOps);

    resultsBox.appendChild(tableRow);
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
}

//Funzione per la modifica di un prodotto

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