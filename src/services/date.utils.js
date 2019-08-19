

/**
 * Got from https://stackoverflow.com/questions/26311489/obtain-difference-between-two-dates-in-years-months-days-in-javascript/26311490#26311490
 * @param {Date} initalDate 
 * @param {Date} finalDate 
 */
export function dateDiference(initalDate, finalDate) {
  let dAux, years, months, days;
  // final date always greater than the initial
  if (initalDate > finalDate) {
    dAux = initalDate;
    initalDate = finalDate;
    finalDate = dAux;
  }
  // calculate years
  years = finalDate.getFullYear() - initalDate.getFullYear();
  // translate the initial date to the same year that the final
  dAux = new Date(initalDate.getFullYear() + years, initalDate.getMonth(), initalDate.getDate());
  // Check if we have to take a year off because it is not full
  if (dAux > finalDate) {
    --years;
  }
  // calculate months
  months = finalDate.getMonth() - initalDate.getMonth();
  // We add in months the part of the incomplete Year
  if (months < 0) {
    months = months + 12;
  }
  // Calculate days
  days = finalDate.getDate() - initalDate.getDate();
  // We add in days the part of the incomplete month
  if (days < 0) {
    days = days + this.DiasDelMes(initalDate);
  }
  // if the day is greater, we quit the month
  if (finalDate.getDate() < initalDate.getDate()) {
    if (months == 0) {
      months = 11;
    }
    else {
      --months;
    }
  }
  return { years, months, days };
}
