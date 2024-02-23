# Modulo 4 - Progetto di Fine Modulo

## Marketplace

### Consegne

- Creare un finto e-commerce con le funzionalità di gestione dei prodotti (nessuna funzionalità di pagamento)
- Frontpage dove si vedono tutti i prodotti
- Una pagina di back-office con cui modificare i prodotti
  - Implementare un form per aggiungere un nuovo prodotto al database
  - Implementare un bottone per eliminare i prodotti
  - Implementare un bottone per modificare un prodotto
    - Rimanda ad una pagina di modifica del post singolo
- Una pagina di descrizione del prodotto singolo
  - Cliccando su un prodotto l'utente deve essere reindirizzato ad una pagina specifica, passa l'ID come query string nell'URL.
      ...product/ID

### Funzioni

#### Funzioni di creazione

Home:

- funzione per la creazione delle card dei prodotti; FATTO

Back-Office:

- funzione per la creazione della tabella dei prodotti; FATTO
- funzione per la modifica del singolo prodotto; FATTO
- funzione per l'eliminazione del singolo prodotto; FATTO

#### Funzioni di filtraggio e ricerca

Home:

- funzione per cercare un prodotto tra quelli disponibili;
- funzione per filtrare, tra tutti i prodotti, quelli appartenenti a una specifica categoria, tramite bottoni;

Back-Office:

- funzione per filtrare i prodotti all'interno della tabella di prodotti;

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
    "createdAt": "data di creazione",        // GENERATO DAL SERVER
    "updatedAt": data di modifica",         // GENERATO DAL SERVER
    "__v": 0                                // GENERATO DAL SERVER
}
