"use strict";

export function formatCurrency(number) {
	return "$" + number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

export function formatTime(timeString) {
	let timeArr = timeString.split(":").map((element) => { return parseInt(element, 10) });
	if(timeArr[0] > 12) {
		return `${timeArr[0] - 12}:${timeArr[1] !== 0 ? timeArr[1]: "00" } pm`;
	}
	return `${timeArr[0]}:${timeArr[1] !== 0 ? timeArr[1]: "00" } am`;
}

export function camelize(string, spliter=' ') {
  return string.split(spliter).map((word) => {
  	return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}