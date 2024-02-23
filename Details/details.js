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

// Alert di avvenuta modifica:
const editedAlert = document.getElementById("edit-alert-msg");

// Alert per dati incompleti:
const errorInputAlert = document.getElementById("error-alert-msg");

// Ricerca dei parametri
const paramObj = new URLSearchParams(window.location.search);
const productID = paramObj.get("pid");
console.log(productID);

window.onload = showProduct();

async function showProduct () {
    try {
        const res= await fetch(endpoint + productID, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZTljMjljNDM3MDAwMTkzYzM3MTciLCJpYXQiOjE3MDg0NTIyOTAsImV4cCI6MTcwOTY2MTg5MH0.YXeB9lmn-AGHu-2ecBBH9Gc7mLil69yE2l0g1f1Yd7A'
            }
        });
        const json = await res.json();

        productNameInput.value = json.name;
        productDescriptionInput.value = json.description;
        productBrandInput.value = json.brand;
        productImgURLInput.value = json.imageUrl;
        productPriceInput.value = json.price;
    } catch (err) {
        console.log(err)
    }
}

async function editProduct () {
    if (productNameInput.value && productDescriptionInput.value && productBrandInput.value && productImgURLInput.value && productPriceInput.value) {
        try {
            let newProduct = {
                "name": productNameInput.value, 
                "description": productDescriptionInput.value, 
                "brand": productBrandInput.value, 
                "imageUrl":  productImgURLInput.value, 
                "price": productPriceInput.value
            };
            const res = await fetch(endpoint + productID, {
                method: "PUT",
                "body": JSON.stringify(newProduct),
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZTljMjljNDM3MDAwMTkzYzM3MTciLCJpYXQiOjE3MDg0NTIyOTAsImV4cCI6MTcwOTY2MTg5MH0.YXeB9lmn-AGHu-2ecBBH9Gc7mLil69yE2l0g1f1Yd7A',
                    "Content-type": "application/json"
                }
            });
            //Avviso di avvenuta modifica
            editedAlert.classList.toggle("d-none");
            setTimeout(() => {
                editedAlert.classList.toggle("d-none");
            }, 5000);
        } catch(err) {
            console.log(err);
        }
    } else {
        //Avviso di mancanza dati negli input
        errorInputAlert.classList.toggle("d-none");
        setTimeout(() => {
            errorInputAlert.classList.toggle("d-none");
        }, 5000);
    }
}