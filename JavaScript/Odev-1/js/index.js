const DAYS_OF_WEEK = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
];

function getTime() {
    const DATE = new Date();
    var day = DATE.getDate();
    var dayIndex = DATE.getDay();
    var month = DATE.getMonth() + 1;
    var year = DATE.getFullYear();
    var hour = DATE.getHours();
    var minute = DATE.getMinutes();
    var second = DATE.getSeconds();
    hour = fixNumbers(hour);
    minute = fixNumbers(minute);
    second = fixNumbers(second);
    day = fixNumbers(day);
    month = fixNumbers(month);
    var date = `${day}.${month}.${year} ${DAYS_OF_WEEK[dayIndex]}`;
    var time = `${hour}:${minute}:${second}`;

    return { date, time };
}

function showTime() {
    let timeValues = getTime();

    setInnerTextById("date", timeValues.date);
    setInnerTextById("clock", timeValues.time);
    setTimeout(showTime, 1000);
}

function getUserName() {
    let username = prompt("Lütfen isminizi giriniz", "");
    setInnerTextById("user", username);
}
function setInnerTextById(id, text) {
    document.getElementById(id).innerText = text;
}
function fixNumbers(timeVal) {
    return timeVal = timeVal < 10 ? "0" + timeVal : timeVal;
}

//IIFE
(() => {
    getUserName();
    showTime();
})();
