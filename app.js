const inputDate = document.querySelector("#input-date");
const checkBtn = document.querySelector("#check-btn");
const outputEl = document.querySelector("#showResult");
const outputE2 = document.querySelector("#nextDate");


var removeNotice = function(){
  document.getElementById('privacyNotice').style.display = "none"
}

function reverseStr(str) {
  let listOfChars = str.split("");
  let reverseListOfChars = listOfChars.reverse();
  let reversedStr = reverseListOfChars.join("");
  return reversedStr;
}

function isPalindrome(str) {
  let reverse = reverseStr(str);

  if (reverse === str) {
    return true;
  } else {
    return false;
  }
}

function convertDateToString(date) {
  let dateStr = {
    day: "",
    month: "",
    year: "",
  };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr;
}

function getAllDateFormats(date) {
  let dateStr = convertDateToString(date);

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  let listOfDateFormats = getAllDateFormats(date);

  let isDatePalindrome = false;

  for (let i = 0; i < listOfDateFormats.length; i++) {
    if (isPalindrome(listOfDateFormats[i])) {
      isDatePalindrome = true;
      break;
    }
  }
  return isDatePalindrome;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = month + 1;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = month + 1;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month = month + 1;
    }
  }
  if (month > 12) {
    month = 1;
    year = year + 1;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPlaindromeDate(date) {
  let counter = 0;
  let nextDate = getNextDate(date);

  while (1) {
    counter = counter + 1;
    let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }

    nextDate = getNextDate(nextDate);
  }

  return [counter, nextDate];
}

function clickHandler(e) {
  let bdayStr = inputDate.value;

  if (bdayStr !== "") {
    let listOfDate = bdayStr.split("-");
    let date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0]),
    };

    let isPalindrome = checkPalindromeForAllDateFormats(date);

    if (isPalindrome) {
      outputEl.innerText = " Voila, Your Birthday Is A Palindrome";
    } else {
      let [counter, nextDate] = getNextPlaindromeDate(date);
      outputEl.innerText = `Nay, Your Birthday Is Not A Palindrome.` 
      outputE2.innerHTML = `The next palindrome date Was ${nextDate.day}-${nextDate.month}-${nextDate.year}, You Missed It By ${counter} ${
        counter === 1 ? "day" : "days"}`;
    }
  } else {
    outputEl.innerText = "Man! How can I check without A Date";
  }
}

checkBtn.addEventListener("click", clickHandler);
