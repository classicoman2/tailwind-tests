import { getCurrentHour, getCurrentDate } from "./dateFuncions.js";

// Variables de control - globals
let capsOnNext = false;
let capsOnAll = false;

window.addEventListener("load", (event) => {
  // prova overflow
  enviaMissatgesProva()

  // Set date
  setDate(getCurrentDate());

  scrollDownMessages()

  // Events per les tecles
  const lletres = document.getElementsByClassName("lletra")
  for (let i = 0; i < lletres.length; i++) {
    lletres[i].onclick = function () { insereix(this.id) }
  }


  // Events per les operacions
  const operacions = document.getElementsByClassName("operacio")
  for (let i = 0; i < operacions.length; i++) {
    operacions[i].onclick = function () { opera(this.id) }
  }


  // Event Botó enviar
  document.getElementById("buttonSend").onclick = () => {
    enviarTextEscrit()
  }


  // Event botó emoji
  document.getElementById("buttonGif").onclick = () => {
    // Mostra teclat o Gif alternativament
    toggleTeclatEmojis()
  }

  // Event Intro
  // https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
  document.getElementById("text").addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();

      enviarTextEscrit()
    }
  });


  // Events emojis
  document.querySelectorAll("#emojis span").forEach(emoji => {
    emoji.onclick = () => {
      // afegeix emoji
      const imatge = `<img src="assets/emojis/${emoji.id}.png" alt="${emoji.id}">`
      // envia emoji
      afegeixMissatge(imatge)
      // scroll missatges
      scrollDownMessages()
    }
  });

  // set Focus
  document.getElementById("text").focus()
});



/*
  Mostra i amaga alternativament teclat i Emojis
*/
function toggleTeclatEmojis () {
  const teclat = document.getElementById("teclat")
  const emojis = document.getElementById("emojis")

  if (teclat.style.display === "none") {
    // Mostra keyboard area
    teclat.style.display = "grid"
    emojis.style.display = "none"
    // Mostra botó GIF
    document.getElementById("buttonGif").src = "assets/gif.png"
  } else {
    // Mostra emoji area
    teclat.style.display = "none"
    emojis.style.display = "block"
    // Mostra botó Keyboard
    document.getElementById("buttonGif").src = "assets/keyboard.png"
  }
}

// Fa una operació
function opera (operacio) {
  switch (operacio) {
    case "espai":
      insereix("&nbsp;")
      break;
    case "coma":
      insereix(",")
      break;
    case "punt":
      insereix(".")
      break;

    case "cc":
      esborraText();
      break;
    case "ce":
      deleteLastWord();
      break;
    case "back":
      deleteLastLetter();
      break;
    case "pop":
      deleteFirstLetter();
      break;
    case "linebreak":
      insereix("<br>")
      break;
    case "majus":
      // Caps on All?
      if (capsOnAll) {
        capsOnAll = false;
        document.getElementById("majus").classList.remove("caps-on-all")
      } else {
        if (!capsOnNext) {
          capsOnNext = true;
          document.getElementById("majus").classList.add("caps-on-next")
          document.getElementById("majus").classList.remove("caps-on-all")
        } else {
          capsOnNext = false;
          capsOnAll = true;
          document.getElementById("majus").classList.add("caps-on-all")
          document.getElementById("majus").classList.remove("caps-on-next")
        }
      }
      break;
  }
}



/**
 * Insereix una lletra
 * @param {*} lletra
 */
function insereix (lletra) {
  // caps on?
  if (capsOnNext || capsOnAll) {
    document.getElementById("text").value += lletra.toUpperCase()
  } else {
    document.getElementById("text").value += lletra
  }
  if (capsOnNext) {
    capsOnNext = false;
    document.getElementById("majus").classList.remove("caps-on-next")
  }
}


// Esborra text
function esborraText () {
  document.getElementById("text").value = ""
}


// Esborra darrera paraula
function deleteLastWord () {
  const text = document.getElementById("text").value
  // detect last word
  let lastSpace = text.lastIndexOf(" ")

  // Si hi ha un espai al final de tot
  if (lastSpace === text.length - 1) {
    lastSpace = text.slice(0, text.length - 2).lastIndexOf(" ")
  }

  if (lastSpace >= 0) {
    // delete last word
    document.getElementById("text").value = text.slice(0, lastSpace + 1)
  } else {
    // No hi ha espais, esborra tot
    esborraText()
  }
}




function deleteLastLetter () {
  const text = document.getElementById("text").value
  document.getElementById("text").value = text.substring(0, text.length - 1)
}


function deleteFirstLetter () {
  const text = document.getElementById("text").value
  document.getElementById("text").value = text.slice(1)
}


function enviaMissatgesProva () {
  //  let textosDeProva = ["Hola", "Això és una prova", "Etc...", "Hola", "Això és una prova", "Etc...", "Hola", "Això és una prova", "Etc...", "Hola", "Això és una prova", "Etc...", "Hola", "Això és una prova", "Etc...", "Hola", "Això és una prova", "Etc...", "Hola", "Això és una prova", "Etc..."]
  const diariMissatges = [
    {
      date: "24 Maig",
      messages: ["Hola", "Com estàs?", "Has fet la pràctica?"]
    }
  ];

  setDate(diariMissatges[0].date)

  diariMissatges[0].messages.forEach(text => {
    afegeixMissatge(text)
  });
}

/**
 * Enviar missatge
 */
function enviarTextEscrit () {
  let text = document.getElementById("text").value;
  // Substitueix els espais en blanc  per &nbsp;
  text = text.replace(/\s/g, "&nbsp;")

  if (text.length > 0) {
    // Afegeix missatge amb HTML
    afegeixMissatge(text)

    // Esborra text
    document.getElementById("text").value = ""
  }
  // Scroll area missatges
  scrollDownMessages();
}



// https://stackoverflow.com/questions/270612/scroll-to-bottom-of-div
function scrollDownMessages () {
  document.getElementById("missatgesArea").scrollTop = document.getElementById("missatgesArea").scrollHeight + 1000;
}


function setDate (printableDate) {
  document.getElementById("missatgesArea").innerHTML += "<div class=\"date\">" + printableDate + "</div>"
}


function afegeixMissatge (text) {
  document.getElementById("missatgesArea").innerHTML += `<div class="missatge">${text}<span>${getCurrentHour()}</span></div>`
}
