# Modulo 4 - Progetto di Fine Modulo
## Marketplace

### Consegne

- Creare un finto e-commerce con le funzionalità di gestione dei prodotti (nessuna funzionalità di pagamento)
- Frontpage dove si vedono tutti i prodotti
- Una pagina di back-office con cui modificare i prodotti
    - Implementare un form per aggiungere un nuovo prodotto al database
    - Implementare un bottone per eliminare i prodotti
- Una pagina di descrizione del prodotto singolo
    - Cliccando su un prodotto l'utente deve essere reindirizzato ad una pagina specifica, passa l'ID come query string nell'URL.
      ...product/ID

### Specifiche

Oggetto del prodotto:

{
    "_id": "stringaID",                     // GENERATO DAL SERVER
    "name": "3310 cellphone",               // OBBLIGATORIO
    "description": "descrizione",           // OBBLIGATORIO
    "brand": "Nokia",                       // OBBLIGATORIO
    "imageUrl": "url foto",                 // OBBLIGATORIO
    "price": "xxxxx€",                      // OBBLIGATORIO
    "userId": "admin",                      // GENERATO DAL SERVER 
    "createdAt": "data di crezione",        // GENERATO DAL SERVER
    "updatedAt": data di modifica",         // GENERATO DAL SERVER
    "__v": 0                                // GENERATO DAL SERVER
}