// Definizione delle interfacce

interface IProfessionistaMedia {
  nome: string;
  cognome: string;
  specializzazione: string;
  esperienza: string;
  interessi: string[];
  competenze: Competenze[];
  programmiPartecipati: IProgrammaFormazione[];
  notifiche: string[];
  partecipaProgramma(programma: IProgrammaFormazione): void;
  riceviNotifica(messaggio: string): void;
}

interface IProgrammaFormazione {
  titolo: string;
  descrizione: string;
  ambitoSpecializzazione: string;
  durata: string;
  elencoPartecipanti: IProfessionistaMedia[];
  valutazioni: string[];
  aggiungiPartecipante(professionista: IProfessionistaMedia): void;
  aggiungiValutazione(valutazione: string): void;
  calcolaMediaValutazioni(): number;
}

interface IPiattaforma {
  nome: string;
  tipo: string;
  descrizione: string;
  categorieContenuto: string[];
  pubblicazioni: { contenuto: string; professionista: IProfessionistaMedia }[];
  pubblicaContenuto(professionista: IProfessionistaMedia, contenuto: string): void;
  raccogliFeedback(contenuto: string, feedback: string): void;
}

// Classe Competenze

class Competenze {
  constructor(public nomeCompetenze: string, public livello: string) {}
}

// Implementazione delle classi

class ProfessionistaMedia implements IProfessionistaMedia {
  notifiche: string[] = [];
  programmiPartecipati: IProgrammaFormazione[] = [];

  constructor(
    public nome: string,
    public cognome: string,
    public specializzazione: string,
    public esperienza: string,
    public interessi: string[],
    public competenze: Competenze[] = []
  ) {}

  partecipaProgramma(programma: IProgrammaFormazione): void {
    programma.aggiungiPartecipante(this);
    this.programmiPartecipati.push(programma);
  }

  riceviNotifica(messaggio: string): void {
    this.notifiche.push(messaggio);
  }
}

class ProgrammaFormazione implements IProgrammaFormazione {
  elencoPartecipanti: IProfessionistaMedia[] = [];
  valutazioni: string[] = [];

  constructor(
    public titolo: string,
    public descrizione: string,
    public ambitoSpecializzazione: string,
    public durata: string
  ) {}

  aggiungiPartecipante(professionista: IProfessionistaMedia): void {
    this.elencoPartecipanti.push(professionista);
  }

  aggiungiValutazione(valutazione: string): void {
    this.valutazioni.push(valutazione);
  }

  calcolaMediaValutazioni(): number {
    return this.valutazioni.length > 0
      ? this.valutazioni.map(v => parseInt(v)).reduce((a, b) => a + b) / this.valutazioni.length
      : 0;
  }
}

class Piattaforma implements IPiattaforma {
  pubblicazioni: { contenuto: string; professionista: IProfessionistaMedia }[] = [];

  constructor(
    public nome: string,
    public tipo: string,
    public descrizione: string,
    public categorieContenuto: string[]
  ) {}

  pubblicaContenuto(professionista: IProfessionistaMedia, contenuto: string): void {
    console.log(`Pubblicato su ${this.nome}: ${contenuto}`);
    this.pubblicazioni.push({ contenuto, professionista });
    professionista.riceviNotifica(`Il contenuto "${contenuto}" è stato pubblicato su ${this.nome}`);
  }

  raccogliFeedback(contenuto: string, feedback: string): void {
    console.log(`Feedback ricevuto per il contenuto "${contenuto}": ${feedback}`);
  }
}

// Classe Mentorship

class Mentorship {
  mentore: IProfessionistaMedia;
  mentee: IProfessionistaMedia;
  inizioMentorship: Date;
  durata: string;

  constructor(mentore: IProfessionistaMedia, mentee: IProfessionistaMedia, durata: string) {
    this.mentore = mentore;
    this.mentee = mentee;
    this.inizioMentorship = new Date();
    this.durata = durata;
  }

  avviaMentorship(): void {
    console.log(`${this.mentore.nome} sta iniziando un programma di mentoring con ${this.mentee.nome}`);
  }
}

// Istanza di competenze

const competenzaAlice = new Competenze('Scrittura Creativa', 'Avanzato');
const competenzaLaura = new Competenze('Regia Cinematografica', 'Intermedio');

// Istanza di professioniste dei media
const professionista1 = new ProfessionistaMedia(
  'Alice',
  'Rossi',
  'Giornalismo',
  '5 anni di esperienza',
  ['parità di genere', 'social media', 'scrittura'],
  [competenzaAlice]
);

const professionista2 = new ProfessionistaMedia(
  'Laura',
  'Bianchi',
  'Regia',
  '3 anni di esperienza',
  ['cinema', 'documentari', 'storie femminili'],
  [competenzaLaura]
);

// Istanza di programmi di formazione
const programma1 = new ProgrammaFormazione(
  'Mentorship per Giornaliste',
  'Un programma per formare giornaliste professioniste nel campo del giornalismo digitale.',
  'Giornalismo',
  '6 mesi'
);

const programma2 = new ProgrammaFormazione(
  'Regia Femminile',
  'Programma di mentorship per donne registe emergenti.',
  'Regia',
  '1 anno'
);

// Istanza di piattaforme di pubblicazione
const piattaforma1 = new Piattaforma(
  'VociOnline',
  'Online',
  'Una piattaforma digitale che promuove contenuti sulla parità di genere.',
  ['notizie', 'video', 'interviste']
);

const piattaforma2 = new Piattaforma(
  'Magazine Femminile',
  'Stampato',
  'Un magazine che racconta storie di donne che cambiano il mondo.',
  ['articoli', 'interviste']
);

// Test della logica di collegamento

professionista1.partecipaProgramma(programma1);
professionista2.partecipaProgramma(programma2);

programma1.aggiungiPartecipante(professionista2);

piattaforma1.pubblicaContenuto(professionista1, 'Articolo sulla parità di genere');
piattaforma2.pubblicaContenuto(professionista2, 'Intervista con una regista emergente');

// Feedback e valutazione
piattaforma1.raccogliFeedback('Articolo sulla parità di genere', 'Ottimo articolo!');
programma1.aggiungiValutazione('5');
programma1.aggiungiValutazione('4');
console.log('Media delle valutazioni: ', programma1.calcolaMediaValutazioni());

// Notifiche
console.log('Notifiche Alice: ', professionista1.notifiche);
console.log('Notifiche Laura: ', professionista2.notifiche);

// Mentorship
const mentorship = new Mentorship(professionista1, professionista2, '6 mesi');
mentorship.avviaMentorship();
