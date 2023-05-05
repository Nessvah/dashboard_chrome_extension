

// function to set the background image depending on the hour

import {getWorldTime} from "./api.js";

function setBgImage(hour){

    const bgImage = hour <= 12 ? 'assets/desktop/bg-image-daytime.jpg' : 'assets/desktop/bg-image-nighttime.jpg'
    const icon = hour <= 12 ? 'assets/desktop/icon-sun.svg' : 'assets/desktop/icon-moon.svg'

    document.getElementById('icon').innerHTML = `<img src='${icon}' width="25px" height="25px" alt=""/>`
    document.getElementById('app').style.backgroundImage = `url(${bgImage})`;

}


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
    document.getElementById('quote').textContent = `"${quote}"`;
    document.getElementById('author').textContent = author;
}

// function to render the time fields html
export function renderTimeFields(abbr, hour, min, dow, doy, timezone, weekNum){

    setBgImage(hour);
    //   - "Good morning" between 5am and 12pm
    //   - "Good afternoon" between 12pm and 6pm
    //   - "Good evening" between 6pm and 5am
    let greetingHtml = '';

     if (hour >= 5 && hour < 12 ){
         greetingHtml = '<h4>Good morning, it\'s currently</h4>';
     } else if (hour >= 12 && hour < 18) {
         greetingHtml = '<h4>Good afternoon, it\'s currently</h4>';
     } else {
         greetingHtml = '<h4>Good evening, it\'s currently</h4>';
     }
     const timeHtml = `<h1>${hour}:${min}</h1><span class="time-abbr"> ${abbr}</span>`;
     // grab the dom element to modify
    const appEl = document.getElementById('app');
    appEl.classList.add(hour >= 12 ? 'morning' : 'evening')


    document.getElementById('clock').innerHTML = timeHtml;
    document.getElementById('greeting').innerHTML = greetingHtml;
    document.getElementById('timezone').textContent = timezone;
    document.getElementById('day-of-year').textContent = doy;
    document.getElementById('day-of-week').textContent = dow;
    document.getElementById('week-number').textContent = weekNum;


}

export function renderPlaceField(city, country){
     document.getElementById('location').textContent = `in ${city}, ${country}`
}



// TODO: implement functionality to update the clock every minute


// function to update the time info the hour and minute every minute
// can't do this

/*
export function reRenderTimeFieldsEveryMin(){
    setTimeout(() => {
    awaitTimePromise(renderTimeFields).catch((e)=> console.error('Error on import file: ', e));
    reRenderTimeFieldsEveryMin(renderTimeFields);
    }, 60000)
}
*/
