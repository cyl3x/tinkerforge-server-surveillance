import { actors } from '../tinkerforge/index.js';

let currentTemp = getSensor('TEMPERATURE').getTemperature();

function splitNumberIntoDigits(number) {
    return number
        .toString()
        .split("")
        .map(Number);
}

const digits = splitNumberIntoDigits(currentTemp);


while(true){
    actors.seg_display.setNumericValue([digits[0], digits[1], 34, 12]);
}