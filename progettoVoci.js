// Definizione delle interfacce
// Classe Competenze
var Competenze = /** @class */ (function () {
    function Competenze(nomeCompetenze, livello) {
        this.nomeCompetenze = nomeCompetenze;
        this.livello = livello;
    }
    return Competenze;
}());
// Implementazione delle classi
var ProfessionistaMedia = /** @class */ (function () {
    function ProfessionistaMedia(nome, cognome, specializzazione, esperienza, interessi, competenze) {
        if (competenze === void 0) { competenze = []; }
        this.nome = nome;
        this.cognome = cognome;
        this.specializzazione = specializzazione;
        this.esperienza = esperienza;
        this.interessi = interessi;
        this.competenze = competenze;
        this.notifiche = [];
        this.programmiPartecipati = [];
    }
    ProfessionistaMedia.prototype.partecipaProgramma = function (programma) {
        programma.aggiungiPartecipante(this);
        this.programmiPartecipati.push(programma);
    };
    ProfessionistaMedia.prototype.riceviNotifica = function (messaggio) {
        this.notifiche.push(messaggio);
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
        this.valutazioni = [];
    }
    ProgrammaFormazione.prototype.aggiungiPartecipante = function (professionista) {
        this.elencoPartecipanti.push(professionista);
    };
    ProgrammaFormazione.prototype.aggiungiValutazione = function (valutazione) {
        this.valutazioni.push(valutazione);
    };
    ProgrammaFormazione.prototype.calcolaMediaValutazioni = function () {
        return this.valutazioni.length > 0
            ? this.valutazioni.map(function (v) { return parseInt(v); }).reduce(function (a, b) { return a + b; }) / this.valutazioni.length
            : 0;
    };
    return ProgrammaFormazione;
}());
var Piattaforma = /** @class */ (function () {
    function Piattaforma(nome, tipo, descrizione, categorieContenuto) {
        this.nome = nome;
        this.tipo = tipo;
        this.descrizione = descrizione;
        this.categorieContenuto = categorieContenuto;
        this.pubblicazioni = [];
    }
    Piattaforma.prototype.pubblicaContenuto = function (professionista, contenuto) {
        console.log("Pubblicato su ".concat(this.nome, ": ").concat(contenuto));
        this.pubblicazioni.push({ contenuto: contenuto, professionista: professionista });
        professionista.riceviNotifica("Il contenuto \"".concat(contenuto, "\" \u00E8 stato pubblicato su ").concat(this.nome));
    };
    Piattaforma.prototype.raccogliFeedback = function (contenuto, feedback) {
        console.log("Feedback ricevuto per il contenuto \"".concat(contenuto, "\": ").concat(feedback));
    };
    return Piattaforma;
}());
// Classe Mentorship
var Mentorship = /** @class */ (function () {
    function Mentorship(mentore, mentee, durata) {
        this.mentore = mentore;
        this.mentee = mentee;
        this.inizioMentorship = new Date();
        this.durata = durata;
    }
    Mentorship.prototype.avviaMentorship = function () {
        console.log("".concat(this.mentore.nome, " sta iniziando un programma di mentoring con ").concat(this.mentee.nome));
    };
    return Mentorship;
}());
// Istanza di competenze
var competenzaAlice = new Competenze('Scrittura Creativa', 'Avanzato');
var competenzaLaura = new Competenze('Regia Cinematografica', 'Intermedio');
var competenzaMaria = new Competenze('Fotografia Giornalistica', 'Avanzato');
var competenzaElena = new Competenze('Scrittura per il Web', 'Esperto');
var competenzaSofia = new Competenze('Editing Video', 'Intermedio');
// Istanza di professioniste dei media
var professionista1 = new ProfessionistaMedia('Alice', 'Rossi', 'Giornalismo', '5 anni di esperienza', ['parità di genere', 'social media', 'scrittura'], [competenzaAlice]);
var professionista2 = new ProfessionistaMedia('Laura', 'Bianchi', 'Regia', '3 anni di esperienza', ['cinema', 'documentari', 'storie femminili'], [competenzaLaura]);
var professionista3 = new ProfessionistaMedia('Maria', 'Verdi', 'Fotografia', '8 anni di esperienza', ['reportage', 'fotogiornalismo', 'ritratti'], [competenzaMaria]);
var professionista4 = new ProfessionistaMedia('Elena', 'Neri', 'Montaggio Video', '4 anni di esperienza', ['documentari', 'spot pubblicitari', 'cinema'], [competenzaElena]);
var professionista5 = new ProfessionistaMedia('Sofia', 'Rossi', 'Giornalismo Investigativo', '6 anni di esperienza', ['diritti umani', 'inchieste', 'storie di donne'], [competenzaSofia]);
// Istanza di programmi di formazione
var programma1 = new ProgrammaFormazione('Mentorship per Giornaliste', 'Un programma per formare giornaliste professioniste nel campo del giornalismo digitale.', 'Giornalismo', '6 mesi');
var programma2 = new ProgrammaFormazione('Regia Femminile', 'Programma di mentorship per donne registe emergenti.', 'Regia', '1 anno');
var programma3 = new ProgrammaFormazione('Fotogiornalismo per la Parità', 'Un corso per formare fotografi specializzati in reportage di tematiche di genere.', 'Fotogiornalismo', '3 mesi');
var programma4 = new ProgrammaFormazione('Editing Video per Documentari', 'Programma di specializzazione nel montaggio di documentari a tema sociale.', 'Montaggio Video', '5 mesi');
var programma5 = new ProgrammaFormazione('Inchiesta e Giornalismo Investigativo', 'Un programma di approfondimento per giornalisti d’inchiesta.', 'Giornalismo', '9 mesi');
// Istanza di piattaforme di pubblicazione
var piattaforma1 = new Piattaforma('VociOnline', 'Online', 'Una piattaforma digitale che promuove contenuti sulla parità di genere.', ['notizie', 'video', 'interviste']);
var piattaforma2 = new Piattaforma('Magazine Femminile', 'Stampato', 'Un magazine che racconta storie di donne che cambiano il mondo.', ['articoli', 'interviste']);
var piattaforma3 = new Piattaforma('Fotografia al Femminile', 'Online', 'Un portale per fotografi e fotoreporter che raccontano storie di donne.', ['reportage', 'fotogiornalismo', 'storie visive']);
var piattaforma4 = new Piattaforma('Documentari e Società', 'Online', 'Una piattaforma che raccoglie documentari su tematiche sociali.', ['video', 'inchieste', 'storie di vita']);
var piattaforma5 = new Piattaforma('Inchiesta Magazine', 'Stampato', 'Una rivista dedicata alle inchieste giornalistiche su diritti umani e parità.', ['inchieste', 'giornalismo investigativo']);
// Test della logica di collegamento
professionista1.partecipaProgramma(programma1);
professionista2.partecipaProgramma(programma2);
professionista3.partecipaProgramma(programma3);
professionista4.partecipaProgramma(programma4);
professionista5.partecipaProgramma(programma5);
programma1.aggiungiPartecipante(professionista2);
programma2.aggiungiPartecipante(professionista3);
programma3.aggiungiPartecipante(professionista4);
var piattaforme = [piattaforma1, piattaforma2, piattaforma3, piattaforma4, piattaforma5];
piattaforma1.pubblicaContenuto(professionista1, 'Articolo sulla parità di genere');
piattaforma2.pubblicaContenuto(professionista2, 'Intervista con una regista emergente');
piattaforma3.pubblicaContenuto(professionista3, 'Fotoreportage sulla parità di genere');
piattaforma4.pubblicaContenuto(professionista4, 'Documentario sulla leadership femminile');
piattaforma5.pubblicaContenuto(professionista5, 'Inchiesta sui diritti delle donne nel lavoro');
// Feedback e valutazione
piattaforma1.raccogliFeedback('Articolo sulla parità di genere', 'Ottimo articolo!');
programma1.aggiungiValutazione('5');
programma1.aggiungiValutazione('4');
console.log('Media delle valutazioni: ', programma1.calcolaMediaValutazioni());
// Mentorship
var mentorship = new Mentorship(professionista1, professionista2, '6 mesi');
mentorship.avviaMentorship();
// Stampa i programmi a cui partecipano le professioniste
console.log("\nProgrammi a cui partecipano le professioniste:");
console.log("".concat(professionista1.nome, ":"), professionista1.programmiPartecipati.map(function (p) { return p.titolo; }));
console.log("".concat(professionista2.nome, ":"), professionista2.programmiPartecipati.map(function (p) { return p.titolo; }));
console.log("".concat(professionista3.nome, ":"), professionista3.programmiPartecipati.map(function (p) { return p.titolo; }));
console.log("".concat(professionista4.nome, ":"), professionista4.programmiPartecipati.map(function (p) { return p.titolo; }));
console.log("".concat(professionista5.nome, ":"), professionista5.programmiPartecipati.map(function (p) { return p.titolo; }));
// Stampa le notifiche ricevute
console.log("\nNotifiche ricevute da ".concat(professionista1.nome, ":"), professionista1.notifiche);
console.log("Notifiche ricevute da ".concat(professionista2.nome, ":"), professionista2.notifiche);
// Stampa le pubblicazioni su ogni piattaforma
console.log("\nPubblicazioni sulle nuove piattaforme:");
console.log("".concat(piattaforma1.nome, ":"), piattaforma1.pubblicazioni);
console.log("".concat(piattaforma2.nome, ":"), piattaforma2.pubblicazioni);
console.log("".concat(piattaforma3.nome, ":"), piattaforma3.pubblicazioni);
console.log("".concat(piattaforma4.nome, ":"), piattaforma4.pubblicazioni);
console.log("".concat(piattaforma5.nome, ":"), piattaforma5.pubblicazioni);
// Stampa il feedback ricevuto
console.log("\nFeedback ricevuto per 'Articolo sulla parit\u00E0 di genere':");
piattaforma1.raccogliFeedback('Articolo sulla parità di genere', 'Ottimo articolo!');
// Stampa la media delle valutazioni
console.log("\nMedia delle valutazioni per '".concat(programma1.titolo, "':"), programma1.calcolaMediaValutazioni());
// Stampa l'inizio della mentorship
mentorship.avviaMentorship();
// Stampa dettagliata delle piattaforme e delle pubblicazioni
console.log("\n Pubblicazioni sulle piattaforme:");
piattaforme.forEach(function (piattaforma) {
    console.log("\n ".concat(piattaforma.nome, ":"));
    piattaforma.pubblicazioni.forEach(function (pub) {
        console.log(" Contenuto: \"".concat(pub.contenuto, "\""));
        console.log(" Professionista: ".concat(pub.professionista.nome, " ").concat(pub.professionista.cognome));
        console.log(" Specializzazione: ".concat(pub.professionista.specializzazione));
        console.log(" Esperienza: ".concat(pub.professionista.esperienza));
        console.log(" Interessi: ".concat(pub.professionista.interessi.join(', ')));
        console.log(" Competenze: ".concat(pub.professionista.competenze.map(function (c) { return c.nomeCompetenze + ' (' + c.livello + ')'; }).join(', ')));
        console.log("  Notifiche: ".concat(pub.professionista.notifiche.length > 0 ? pub.professionista.notifiche.join(' | ') : 'Nessuna notifica'));
        console.log("  Programmi Partecipati:");
        if (pub.professionista.programmiPartecipati.length > 0) {
            pub.professionista.programmiPartecipati.forEach(function (prog) {
                console.log("".concat(prog.titolo, " (").concat(prog.durata, ") - ").concat(prog.ambitoSpecializzazione));
            });
        }
        else {
            console.log(" Nessun programma partecipato");
        }
        console.log('\n');
    });
});
