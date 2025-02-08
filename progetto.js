// Definizione delle interfacce
// Implementazione delle classi
var ProfessionistaMedia = /** @class */ (function () {
    function ProfessionistaMedia(nome, cognome, specializzazione, esperienza, interessi) {
        this.nome = nome;
        this.cognome = cognome;
        this.specializzazione = specializzazione;
        this.esperienza = esperienza;
        this.interessi = interessi;
    }
    ProfessionistaMedia.prototype.partecipaProgramma = function (programma) {
        programma.aggiungiPartecipante(this);
    };
    return ProfessionistaMedia;
}());
var ProgrammaFormazione = /** @class */ (function () {
    function ProgrammaFormazione(titolo, descrizione, ambitoSpecializzazione, durata) {
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.ambitoSpecializzazione = ambitoSpecializzazione;
        this.durata = durata;
        this.elencoPartecipanti = [];
    }
    ProgrammaFormazione.prototype.aggiungiPartecipante = function (professionista) {
        this.elencoPartecipanti.push(professionista);
    };
    return ProgrammaFormazione;
}());
var Piattaforma = /** @class */ (function () {
    function Piattaforma(nome, tipo, descrizione, categorieContenuto) {
        this.nome = nome;
        this.tipo = tipo;
        this.descrizione = descrizione;
        this.categorieContenuto = categorieContenuto;
    }
    Piattaforma.prototype.pubblicaContenuto = function (professionista, contenuto) {
        console.log("Pubblicato su ".concat(this.nome, " il contenuto \"").concat(contenuto, "\" di ").concat(professionista.nome, " ").concat(professionista.cognome));
    };
    return Piattaforma;
}());
// Istanza di professioniste dei media
var professionista1 = new ProfessionistaMedia('Alice', 'Rossi', 'Giornalismo', '5 anni di esperienza', ['parità di genere', 'social media', 'scrittura']);
var professionista2 = new ProfessionistaMedia('Laura', 'Bianchi', 'Regia', '3 anni di esperienza', ['cinema', 'documentari', 'storie femminili']);
// Istanza di programmi di formazione
var programma1 = new ProgrammaFormazione('Mentorship per Giornaliste', 'Un programma per formare giornaliste professioniste nel campo del giornalismo digitale.', 'Giornalismo', '6 mesi');
var programma2 = new ProgrammaFormazione('Regia Femminile', 'Programma di mentorship per donne registe emergenti.', 'Regia', '1 anno');
// Istanza di piattaforme di pubblicazione
var piattaforma1 = new Piattaforma('VociOnline', 'Online', 'Una piattaforma digitale che promuove contenuti sulla parità di genere.', ['notizie', 'video', 'interviste']);
var piattaforma2 = new Piattaforma('Magazine Femminile', 'Stampato', 'Un magazine che racconta storie di donne che cambiano il mondo.', ['articoli', 'interviste']);
// Test della logica di collegamento
professionista1.partecipaProgramma(programma1);
professionista2.partecipaProgramma(programma2);
programma1.aggiungiPartecipante(professionista2);
piattaforma1.pubblicaContenuto(professionista1, 'Articolo sulla parità di genere');
piattaforma2.pubblicaContenuto(professionista2, 'Intervista con una regista emergente');
