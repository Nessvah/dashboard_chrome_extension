
// function to set the ui
function updateUiDayNight(icon, bgImage, currentHour, startDayTime, endDayTime){
    const timeContainer = document.getElementById('time-container');

    document.getElementById('icon').innerHTML = `<img src='${icon}' width="25px" height="25px" alt=""/>`
    document.getElementById('app').style.backgroundImage = `url(${bgImage})`;

    if (currentHour >= startDayTime && currentHour < endDayTime){
        timeContainer.classList.add('vb-dark')
        timeContainer.classList.remove('vb-light')
    } else {
        timeContainer.classList.remove('vb-dark')
        timeContainer.classList.add('vb-light')
    }

}

// function to set the background image depending on the hour

function setBgImage(hour, deviceWidth){
    const moreInfoSection = document.getElementById('more__info');
    const starDayTime = 5;
    const endDayTime = 18;

    let bgImage, icon;

    //  The sun icon and the daytime background image between 5am and 6pm - 5-18
    //   - The moon icon and the nighttime background image between 6pm and 5am 18-5

    if (hour >= starDayTime && hour < endDayTime){
        icon = '/desktop/icon-sun.svg'
        moreInfoSection.classList.add('daytime');

        // set different imgs resolution depending on the size of screen
        if (deviceWidth > 768 ){
            bgImage = '/desktop/bg-image-daytime.jpg';
        } else if (deviceWidth > 450){
            bgImage = '/tablet/bg-image-daytime.jpg'
        } else {
            bgImage = '/mobile/bg-image-daytime.jpg'
        }

    } else {
        icon = '/desktop/icon-moon.svg'
        moreInfoSection.classList.add('nighttime');

        if (deviceWidth > 800) {
            bgImage = '/desktop/bg-image-nighttime.jpg';
        } else if (deviceWidth > 450){
            bgImage = '/tablet/bg-image-nighttime.jpg'
        } else {
            bgImage = '/mobile/bg-image-nighttime.jpg'
        }
    }

    updateUiDayNight(icon, bgImage, hour, starDayTime, endDayTime);
}


// function to extract the hours and minutes from a string
// this is the format string "2023-05-04T09:13:16.639036+01:00";

 export function extractHourAndMin(dateStr){

    let splitTime = dateStr.split('T')
    let time = splitTime[1]
     let hour = time.split(':')[0]
    let minutes = time.split(':')[1]

    return {
        hour,
        minutes
    }
}

// function to render the quote and author html

export function renderQuote(quote, author) {
    document.getElementById('quote').textContent = `"${quote}"`;
    document.getElementById('author').textContent = author;
}

// function to render the time fields html
export function renderTimeFields(abbr, hour, min, dow, doy, timezone, weekNum){

    // get width of the browser
    let browserWidth = window.innerWidth;

    setBgImage(hour, browserWidth);
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

export function renderPlaceField(country, city){
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
