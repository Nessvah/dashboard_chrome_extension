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


