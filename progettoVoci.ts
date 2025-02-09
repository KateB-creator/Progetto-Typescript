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
  const competenzaMaria = new Competenze('Fotografia Giornalistica', 'Avanzato');
  const competenzaElena = new Competenze('Scrittura per il Web', 'Esperto');
  const competenzaSofia = new Competenze('Editing Video', 'Intermedio');
  
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
  
  const professionista3 = new ProfessionistaMedia(
    'Maria',
    'Verdi',
    'Fotografia',
    '8 anni di esperienza',
    ['reportage', 'fotogiornalismo', 'ritratti'],
    [competenzaMaria]
  );
  
  const professionista4 = new ProfessionistaMedia(
    'Elena',
    'Neri',
    'Montaggio Video',
    '4 anni di esperienza',
    ['documentari', 'spot pubblicitari', 'cinema'],
    [competenzaElena]
  );
  
  const professionista5 = new ProfessionistaMedia(
    'Sofia',
    'Rossi',
    'Giornalismo Investigativo',
    '6 anni di esperienza',
    ['diritti umani', 'inchieste', 'storie di donne'],
    [competenzaSofia]
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
  
  const programma3 = new ProgrammaFormazione(
    'Fotogiornalismo per la Parità',
    'Un corso per formare fotografi specializzati in reportage di tematiche di genere.',
    'Fotogiornalismo',
    '3 mesi'
  );
  
  const programma4 = new ProgrammaFormazione(
    'Editing Video per Documentari',
    'Programma di specializzazione nel montaggio di documentari a tema sociale.',
    'Montaggio Video',
    '5 mesi'
  );
  
  const programma5 = new ProgrammaFormazione(
    'Inchiesta e Giornalismo Investigativo',
    'Un programma di approfondimento per giornalisti d’inchiesta.',
    'Giornalismo',
    '9 mesi'
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
  
  const piattaforma3 = new Piattaforma(
    'Fotografia al Femminile',
    'Online',
    'Un portale per fotografi e fotoreporter che raccontano storie di donne.',
    ['reportage', 'fotogiornalismo', 'storie visive']
  );
  
  const piattaforma4 = new Piattaforma(
    'Documentari e Società',
    'Online',
    'Una piattaforma che raccoglie documentari su tematiche sociali.',
    ['video', 'inchieste', 'storie di vita']
  );
  
  const piattaforma5 = new Piattaforma(
    'Inchiesta Magazine',
    'Stampato',
    'Una rivista dedicata alle inchieste giornalistiche su diritti umani e parità.',
    ['inchieste', 'giornalismo investigativo']
  );
  
  
  // Test della logica di collegamento
  
  professionista1.partecipaProgramma(programma1);
  professionista2.partecipaProgramma(programma2);
  professionista3.partecipaProgramma(programma3);
  professionista4.partecipaProgramma(programma4);
  professionista5.partecipaProgramma(programma5);
  
  programma1.aggiungiPartecipante(professionista2);
  programma2.aggiungiPartecipante(professionista3);
  programma3.aggiungiPartecipante(professionista4);

  const piattaforme: Piattaforma[] = [piattaforma1, piattaforma2, piattaforma3, piattaforma4, piattaforma5];
  
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
  const mentorship = new Mentorship(professionista1, professionista2, '6 mesi');
  mentorship.avviaMentorship();
  
  
  // Stampa i programmi a cui partecipano le professioniste
  
  console.log(`\nProgrammi a cui partecipano le professioniste:`);
  console.log(`${professionista1.nome}:`, professionista1.programmiPartecipati.map(p => p.titolo));
  console.log(`${professionista2.nome}:`, professionista2.programmiPartecipati.map(p => p.titolo));
  console.log(`${professionista3.nome}:`, professionista3.programmiPartecipati.map(p => p.titolo));
  console.log(`${professionista4.nome}:`, professionista4.programmiPartecipati.map(p => p.titolo));
  console.log(`${professionista5.nome}:`, professionista5.programmiPartecipati.map(p => p.titolo));
  
  // Stampa le notifiche ricevute
  console.log(`\nNotifiche ricevute da ${professionista1.nome}:`, professionista1.notifiche);
  console.log(`Notifiche ricevute da ${professionista2.nome}:`, professionista2.notifiche);
  
  // Stampa le pubblicazioni su ogni piattaforma
  console.log(`\nPubblicazioni sulle nuove piattaforme:`);
  console.log(`${piattaforma1.nome}:`, piattaforma1.pubblicazioni);
  console.log(`${piattaforma2.nome}:`, piattaforma2.pubblicazioni);
  console.log(`${piattaforma3.nome}:`, piattaforma3.pubblicazioni);
  console.log(`${piattaforma4.nome}:`, piattaforma4.pubblicazioni);
  console.log(`${piattaforma5.nome}:`, piattaforma5.pubblicazioni);
  
  
  // Stampa il feedback ricevuto
  console.log(`\nFeedback ricevuto per 'Articolo sulla parità di genere':`);
  piattaforma1.raccogliFeedback('Articolo sulla parità di genere', 'Ottimo articolo!');
  
  // Stampa la media delle valutazioni
  console.log(`\nMedia delle valutazioni per '${programma1.titolo}':`, programma1.calcolaMediaValutazioni());
  
  // Stampa l'inizio della mentorship
  mentorship.avviaMentorship();

  // Stampa dettagliata delle piattaforme e delle pubblicazioni

  console.log(`\n Pubblicazioni sulle piattaforme:`);
  piattaforme.forEach(piattaforma => {
    console.log(`\n ${piattaforma.nome}:`);
    piattaforma.pubblicazioni.forEach(pub => {
      console.log(` Contenuto: "${pub.contenuto}"`);
      console.log(` Professionista: ${pub.professionista.nome} ${pub.professionista.cognome}`);
      console.log(` Specializzazione: ${pub.professionista.specializzazione}`);
      console.log(` Esperienza: ${pub.professionista.esperienza}`);
      console.log(` Interessi: ${pub.professionista.interessi.join(', ')}`);
      console.log(` Competenze: ${pub.professionista.competenze.map(c => c.nomeCompetenze + ' (' + c.livello + ')').join(', ')}`);
      console.log(`  Notifiche: ${pub.professionista.notifiche.length > 0 ? pub.professionista.notifiche.join(' | ') : 'Nessuna notifica'}`);
      
      console.log(`  Programmi Partecipati:`);
      if (pub.professionista.programmiPartecipati.length > 0) {
        pub.professionista.programmiPartecipati.forEach(prog => {
          console.log(`${prog.titolo} (${prog.durata}) - ${prog.ambitoSpecializzazione}`);
        });
      } else {
        console.log(` Nessun programma partecipato`);
      }
      console.log('\n');
    });
  });
  

  