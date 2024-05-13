
let iscritti = [
    {
        'nomeBambino': 'Ciccio',
        'cognomeBambino': 'Pasticcio',
        'annoDiNascita': '12/05/2023',
        'codiceFiscale': 'aaaabb11221aa',
        'indirizzo': 'via Luglio 31',
        'patologie': 'allergico alle fave',
        'nota': '',
        'nomePadre': 'Luigi',
        'cognomePadre': 'Pasticcio',
        'nomeMadre': 'Luisa',
        'cognomeMadre': 'Bianchi',
        'numeroTelefono1': '555',
        'numeroTelefono2':'9899'
        
    },
     {
        'nomeBambino': 'Francesco',
        'cognomeBambino': 'Esposito',
        'annoDiNascita': '03/05/2023',
        'codiceFiscale': 'aaa111sss',
        'indirizzo': 'via Dei Matti 1',
        'patologie': 'allergico al polline',
        'nota': '',
        'nomePadre': 'Claudio',
        'cognomePadre': 'Pasticcio',
        'nomeMadre': 'Maria',
        'cognomeMadre': 'Bruni',
        'numeroTelefono1': '22',
        'numeroTelefono2':'9119'
        
    }
];// Creo un' array di oggetti che contiene le iscrizione di altri bambini .

let oggettoIscrizione={};// oggetto che conterrà i dati inseriti dall'utente nel form
let inputs = document.querySelectorAll('input');// prendo i riferimenti di tutti i tag <input.../> 
let note = document.getElementById('note'); // prendo il riferimento della textArea che non è un tag <input> ma <textarea></textarea> con id('note);

document.getElementById('invia').addEventListener('click', (e) => { //evento click associato all pulsante invia che si trova dentro al form
    
    e.preventDefault();// metodo che previene e intercetta il comportamento predefinito di un componente in questo caso form
   
    for (let i = 0; i < inputs.length; i++) {  // ciclo su tutti gli input
     if (inputs[i].value) {// controlla se l'input è valorizzato
         createObject(inputs[i].id, inputs[i].value);// chiamo questa funzione che prende come parametro id e valore che seriviranno a comporre l'oggetto oggettoIscrizione in maniera dinamica.
         aggiungiNota(note.value);// aggiunga la nota all'oggettoIscrizione
        }
     else {// altrimenti se un campo è vuoto
         alert("Verifica Campi");// invia una notifica
         
         
         checkCampoVuoto();// e chiama questa funzione che va a fare un check su tutti campi vuoti
        
        return; // Esci dal ciclo al primo input senza valore
        }
    }// fine for
    
    
    aggiungiIscrizione(oggettoIscrizione,document.getElementById('codiceFiscale'));// una volta che tutti i campi sono compilati correttamente chiamo questa funzione che si occupa di inserire l'oggettoIscrizione nell'array iscritti.
});





function aggiungiIscrizione(iscrizione,campo) {//funzione che si occupa nell'aggiungere l'iscrizione nell' array.
    
    if (verificaCodiceFiscale(iscrizione.codiceFiscale)) {// se trova il codice fiscale 
        alert('Esiste già un bambino con lo stesso codiceFiscale');// mostra il popup
        setBorderDanger(document.getElementById('codiceFiscale'));// Imposta il bordoRosso sul campo relativo al codice Fiscale
    }
    else {
        iscritti.push(iscrizione);// se non trova il codice fiscale allora  inserisci l'ggettoIscrizione nell'array iscritti
        alert('Congratulazioni ' + iscrizione.nomePadre + " e " + iscrizione.nomeMadre + " vostro figlio " + iscrizione.nomeBambino + " " + iscrizione.cognomeBambino + " è stato iscritto presso il nostro Asilo Nido");
        resettaCampi();// funzione che resetta i campi.
        
    }
   
}

function verificaCodiceFiscale(codiceFiscale) {// funzione che prende come parametro il codiceFiscole 
                                                //e controlla nell'arrayIscritti se esiste un bambino con quel codice fiscale e in quel caso esce dal ciclo e ritorna true
    for (let i = 0; i < iscritti.length; i++){
        if (iscritti[i].codiceFiscale === codiceFiscale) {
            return true;
        }
    }
}

function createObject(nomeProp, valueProperty) {// funzione crea l'oggettoIscrizione dinamicamente e prende 
                                                //come parametri il nome della proprietà e il valore delle proprietà

    oggettoIscrizione[nomeProp] = valueProperty; // creo l'oggettoIscrizione dinamicamente NOTA non posso usare la sintassi oggettoIscrizione.nome perchè darebbe errore in quanto non trova quella proprietà
}

function aggiungiNota(nota) {// aggiungi la nota all'oggettoIscrizione
    oggettoIscrizione[nota] = nota;
}


function resettaCampi() { // funzione che resetta tutti i campi input
    inputs.forEach((input) => {
        input.value = "";
    });

    note.value = "";// resetta la text area
    
}

function removeBorderDanger(campo) { // quando l'utente scrive su input che contiene il bordo rosso viene settato il bordo verde
    campo.addEventListener('input', () => {
        if (campo.value && campo.classList.contains('border-danger')) {
            campo.classList.remove('border-danger');
         } 

    });
}

function setBorderDanger(campo) {// imposta sul campo nel caso specifico sul tag<input> il bordo rosso
    campo.classList.add('border-danger');
}

function checkCampoVuoto() {// funzione che verifica quali sono tutti i campi (<input>) vuoti se sono vuoti imposta il bordo rosso
    inputs.forEach((input) => {
        if (!input.value) {
            setBorderDanger(input);
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {

    inputs.forEach(input => {
        removeBorderDanger(input);
    });
})







