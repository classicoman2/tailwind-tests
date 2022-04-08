export function getCurrentDate() {
  //Todo - que funcioni 
  return "25 Maig"
}


export function getCurrentHour() {
  //Todo - que funcioni
  let today = new Date()
  let hour = today.getHours()
  let minutes = today.getMinutes().toString()
  // Afegeix 0 if needed
  minutes = minutes.length == 2 ? minutes : `0${minutes}`

  return `${hour}:${minutes}`;
}