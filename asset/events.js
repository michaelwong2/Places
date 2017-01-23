Events = {
  _popout: false,
  loadEvents: function(id){
    return "";
  }
}

function togglePopout(text){
  document.getElementById("popout").style.display = Events._popout ? "none" : "block";

  if(!Events._popout){
    if(text.length > 0){
      document.getElementById("event-displayer").innerHTML = "Events <br>" + text;
    }else{
      document.getElementById("event-displayer").innerHTML = "Events <br><br><span style='color: grey;'>There are no events</span>";
    }
  }

  Events._popout = !Events._popout;
}

Events.loadEventsFromXML = function() {
  function parseRSS(uri, callback) {
    $.ajax({
      type: "GET",
      url: uri,
      headers: {"Access-Control-Allow-Origin": "*"},
      xhrFields: {
        withCredentials: false
      },
      dataType: 'xml',
      success: function(data) {
        callback(data);
      }
    });
  }

  var handleXML = function(data) {
    $xmlDoc = $(data);
    $xmlDoc.find("item").each(function(index) {
      var title = $(this).find("title").text();
      var link = $(this).find("link").text();
      var pubDate = $(this).find("pubDate").text();
      var description = $(this).find("description").text();
      var content = $(this).find("content").text();
      if (content != description) {
        if (content.length < description.length) {
          content = description;
        }
      }
      if (index == 2) {
      console.log(content);
      var text = new Text(content);
      text.parseWords();
      text.setMonth();
      text.setDayFromWord();
      text.setDayFromNumber();
      text.setDateFromFormat();
      text.setDateFromRelative();
      text.setTime();
      console.log(text.getStartDate());}
    });
  }

  parseRSS("proxy.php", handleXML);
}

Text = function(text) {
  this._text = text;
  this._words = [];
  this._date = null;
  this._dateEnd = null;
  this._daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  this._months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december",
 "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec"];
  this._relative = ["today", "tommorow", "tonight"];
  if (this.isLeapYear()) {
    this._daysInMonth[1] = 29;
  }
};

Text.prototype.isLeapYear = function(year) {
  if (year = 'undefined') {
    var date = new Date();
    year = date.getFullYear();
  }
  if (year % 4 != 0) {
    return false;
  }
  if (year % 100 == 0 && year % 400 != 0) {
    return false;
  }
  return true;
};

Text.prototype.parseWords = function() {
  var text = this._text;
  var indexToDelete = [];
  var words = text.split(" ");
  for (var i = 0; i < words.length; i++) {
    if (words[i].length < 1) {
      indexToDelete.push(i);
    } else {
      words[i] = words[i].toLowerCase();
      while (true) {
        if (words[i].length < 1) {
          break;
        }
        var code = words[i].charCodeAt(0);
        var isAlpha = (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
        var isNumeric = (code >= 48 && code <= 57);
        if (!isAlpha && !isNumeric) {
          words[i] = words[i].substring(1, words[i].length);
        } else {
          break;
        }
      }
      while (true) {
        if (words[i].length < 1) {
          break;
        }
        var code = words[i].charCodeAt(words[i].length - 1);
        var isAlpha = (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
        var isNumeric = (code >= 48 && code <= 57);
        if (!isAlpha && !isNumeric) {
          words[i] = words[i].substring(0, words[i].length - 1);
        } else {
          break;
        }
      }
    }
  }
  while (indexToDelete.length > 0) {
    words.splice(indexToDelete.pop(), 1);
  }
  this._words = words;
};

Text.prototype.setMonth = function() {
  for (var i = 0; i < 12; i++) {
    if (this._words.includes(this._months[i]) || this._words.includes(this._months[i + 12])) {
      this._date = new Date();
      this._date.setMonth(i);
      break;
    }
  }
};

Text.prototype.setDayFromWord = function() {
  var date = new Date();
  var today = date.getDay();
  var setDate = null;
  words = this._words;
  if (words.includes("mon") || words.includes("monday")) {
    setDate = (1 - today + 7) % 7;
  } else if (words.includes("tue") || words.includes("tuesday")) {
    setDate = (2 - today + 7) % 7;
  } else if (words.includes("wed") || words.includes("wednesday")) {
    setDate = (3 - today + 7) % 7;
  } else if (words.includes("thur") || words.includes("thursday") || words.includes("thurs")) {
    setDate = (4 - today + 7) % 7;
  } else if (words.includes("fri") || words.includes("friday")) {
    setDate = (5 - today + 7) % 7;
  } else if (words.includes("sat") || words.includes("saturday")) {
    setDate = (6 - today + 7) % 7;
  } else if (words.includes("sun") || words.includes("sunday")) {
    setDate = (7 - today + 7) % 7;
  }
  if (setDate) {
    date.setDate(date.getDate() + setDate);
  }
  if (date.getDate() > this._daysInMonth[date.getMonth()]) {
    date.setDate(date.getDate() % daysInMonth[date.getMonth()]);
    date.setMonth(((date.getMonth() + 2) % 12 - 1));
  }

  if (setDate != null) {
    this._date = date;
  }
};

Text.prototype.setDayFromNumber = function() {
  var indexOfMonth = -1;
  var flag = false;
  for (var i = 0; i < this._words.length; i++) {
    for (var j = 0; j < this._months.length; j++) {
      if (this._words[i] == this._months[j]) {
        indexOfMonth = i;
        flag = true;
        break;
      }
    }
    if (flag) {
      break;
    }
  }
  if (indexOfMonth >= 2 && indexOfMonth <= this._words.length - 3) {
    var date = null;
    console.log(indexOfMonth);
    for (var i = -2; i <= 2; i++) {
      var currStr = this._words[indexOfMonth + i];
      if (this.isNumericDate(currStr)) {
        if (!isNaN(currStr.substring(1, 2))) {
          date = parseInt(currStr.substring(0, 2));
        } else {
          date = parseInt(currStr.substring(0, 1));
        }
        console.dir(currStr);
        console.dir(date);
        if (date) {
          this._date.setDate(date);
        }
        break;
      }
    }
  }
};

Text.prototype.setDateFromFormat = function() {
  words = this._words;
  for (var i = 0; i < words.length; i++) {
    if (words[i].includes("/")) {
      var date = words[i].split("/");
      var flag = true;
      for (var j = 0; j < date.length; j++) {
        if (isNaN(date[j])) {
          flag = false;
          break;
        }
      }
      if (flag) {
        if (!(date[0] >= 1 && date[0] <= 12 && date[1] >= 1 && date[1] <= this._months[date[0] - 1])) {
          flag = false;
        }
      }
      if (flag) {
        if (this._date == null) {
          this._date = new Date();
        }
        this._date.setMonth(date[0]);
        this._date.setDate(date[1]);
        break;
      }
    }
  }
};

Text.prototype.setDateFromRelative = function() {
  var relative = ["today", "tonight", "this morning", "this afternoon", "this evening"];
  for (var i = 0; i < this._words.length; i++) {
    for (var j = 0; j < relative.length; j++) {
      if (this._words[i] == relative[j]) {
        this._date = new Date();
        break;
      }
    }
  }
};

Text.prototype.isNumericDate = function(str) {
  var orderNumber;
  var naturalNumber = (str.length == 1 || str.length == 2) && !isNaN(str);
  if (str.length == 3) {
    orderNumber = (str.includes("st") || str.includes("nd") || str.includes("rd") || str.includes("th"))
    && (!isNaN(str[str.length - 3]));
  } else if (str.length == 4) {
    orderNumber = (str.includes("st") || str.includes("nd") || str.includes("rd") || str.includes("th"))
    && (!isNaN(str[str.length - 3]) && !isNaN(str[str.length - 4]));
  } else {
    orderNumber = false;
  }
  return orderNumber || naturalNumber;
};

// Text.prototype.isNaturalNumber = function(s) {
//   if (isNaN(s)) {
//     return false;
//   }
//   return true;
// };

Text.prototype.getDate = function() {
  if (this._date) {
    return this._date;
  } else {
    return false;
  }
};

Text.prototype.parseTime = function(str, end) {
  var date = this._date;
  if (end) {
    if (this._dateEnd == null) {
      this._dateEnd = this._date;
    }
    date = this._dateEnd;
  }
  if (date != null) {
    var hours = "";
    var minutes = "";
    if (!isNaN(str)) {
        hours = str;
        minutes = "0";
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
    } else if (!str.includes("-")) {
      if (str.includes(":")) {
        var s = str.split(":");
        hours = s[0];
        minutes = s[1];
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
      }
    } else {
      s = str.split("-");
      this.parseTime(s[0]);
      this.parseTime(s[1], true)
    }
  }
}

    // for the case with spaces between the time and am/pm
Text.prototype.isAM = function(str, index) {
  var prev = this._words[index - 1];
  if ((str.toLowerCase() == "a.m") || (str.toLowerCase() == "am" &&
  !isNaN(prev.substring(prev.length - 1, prev.length)))) {
      return true;
  }
  return false;
}

Text.prototype.isPM = function(str) {
  if (str.toLowerCase() == "p.m" || str.toLowerCase() == "pm") {
      return true;
  }
  return false;
}

// for the case with no space between time and am/pm
Text.prototype.isAMNoSpace = function(str, index) {
  if (str.length >= 3 && this.isAM(str.substring(str.length - 2, str.length), index)) {
      return true;
  }
  return false;
}

    // for the case with no space between time and am/pm
Text.prototype.isPMNoSpace = function(str) {
  if (str.length >= 3 && this.isPM(str.substring(str.length - 2, str.length))) {
      return true;
  }
  return false;
}

Text.prototype.isTimeNoAMPM = function(str) {
    if (!str.includes(":")) {
      return false;
    }
    s = str.split(":");
    return !isNaN(s[0].trim()) && !isNaN(s[1]);
}

Text.prototype.setTime = function() {
  if (this._date != null) {
    for (var i = 2; i < this._words.length; i++) {
        if (this.isAM(this._words[i], i)) {
            this.parseTime(this._words[i - 1]);
            this._words.splice(i, 1);
            this._words.splice(i - 1, 1);
            break;
        } else if (this.isPM(this._words[i])) {
            this.parseTime(this._words[i - 1]);
            this._date.setHours(this._date.getHours() + 12);
            this._words.splice(i, 1);
            this._words.splice(i - 1, 1);
            break;
        } else if (this.isAMNoSpace(this._words[i], i)) {
            this.parseTime(this._words[i].substring(0, this._words[i].length - 2));
            this._words.splice(i, 1);
            break;
        } else if (this.isPMNoSpace(this._words[i])) {
            this.parseTime(this._words[i].substring(0, this._words[i].length - 2));
            this._date.setHours(this._date.getHours() + 12);
            this._words.splice(i, 1);
            break;
        } else if (this.isTimeNoAMPM(this._words[i])) {
            this.parseTime(this._words[i]);
            this._date.setHours(this._date.getHours() + 12);
            this._words.splice(i, 1);
            break;
        }
    }
  }
}

Text.prototype.setEndTime = function() {
    this_dateEnd = this._date;
    for (var i = 2; i < this._words.length; i++) {
        if (this.isAM(this._words[i], i)) {
            this.parseTime(this._words[i - 1]);
            this._words.splice(i, 1);
            this._words.splice(i - 1, 1);
            break;
        } else if (this.isPM(this._words[i])) {
            this.parseTime(this._words[i - 1]);
            this._dateEnd.setHours(this._dateEnd.getHours() + 12);
            this._words.splice(i, 1);
            this._words.splice(i - 1, 1);
            break;
        } else if (this.isAMNoSpace(this._words[i],i)) {
            this.parseTime(this._words[i].substring(0, this._words[i].length - 2));
            this._words.splice(i, 1);
            break;
        } else if (this.isPMNoSpace(this._words[i])) {
            this.parseTime(this._words[i].substring(0, this._words[i].length - 2));
            this._dateEnd.setHours(this._dateEnd.getHours() + 12);
            this._words.splice(i, 1);
            break;
        } else if (this.isTimeNoAMPM(this._words[i])) {
            this.parseTime(this._words[i]);
            this._dateEnd.setHours(this._dateEnd.getHours() + 12);
            this._words.splice(i, 1);
            break;
        }
    }
}

Text.prototype.getStartDate = function() {
    return this._date;
}

Text.prototype.getEndDate = function() {
    return this._dateEnd;
}

Text.prototype.getWords = function(){
    return this._words;
}
