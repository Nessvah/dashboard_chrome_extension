import {getWeatherIcon} from "./api.js";

// function to extract the hours and minutes from a string
// this is the format string "2023-05-04T09:13:16.639036+01:00";

 export function extractHourAndMin(dateStr){
    const date = new Date(dateStr);

    // if the hour/minute has only one digit, add a zero in front
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return {
        hour,
        minute
    }
}

// function to render the quote and author html

export function renderQuote(quote, author) {
    document.getElementById('quote').textContent = quote;
    document.getElementById('author').textContent = author;
}

// function to render the time fields html
export function renderTimeFields(abbr, hour, min, dow, doy, timezone, weekNum){
     let greetingHtml = '';
    if (hour >= 0 || hour >= 12) {
        greetingHtml = "Good Morning, it's currently";
       document.getElementById('app').classList.add('morning');
    } else {
        greetingHtml = "Good evening, it's currently";
        document.getElementById('app').classList.add('evening');
    }

    // TODO: need to refactor this !!
    document.getElementById('clock').innerHTML = `<h1>${hour}:${min}</h1><span class="time-abbr"> ${abbr}</span>`
    document.getElementById('greeting').innerHTML += greetingHtml;
    document.getElementById('timezone').textContent = timezone;
    document.getElementById('day-of-year').textContent = doy;
    document.getElementById('day-of-week').textContent = dow;
    document.getElementById('week-number').textContent = weekNum;


}
