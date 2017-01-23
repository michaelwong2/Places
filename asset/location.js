var Location = function() {
  this.attr = {
    name: null,
    times: [],
    category: null,
    open: true,
    allthetime: false
  };
};

//create a new location
Location.prototype.update = function(name, times, category, all) {
  // console.log(this);
  this.attr.name = name;
  this.attr.times = times;
  this.attr.category = category;
  this.attr.allthetime = all;

  Storage.addToLocations(this);
  // console.log(Storage.getObject(Storage._locationNameSpace));
};

Location.prototype.load = function(attr){
  this.attr = attr;

  for(var i = 0; i < this.attr.times.length; i++){
    var ntime = new Time(0,12);
    ntime.load(this.attr.times[i]);
    this.attr.times[i] = ntime;
  }


}

Location.prototype.name = function(){
  return this.attr.name;
}

Location.prototype.getTimes = function(date){
  var times = null;

  for (var i = 0; i < this.attr.times.length; i++) {
    times = this.attr.times[i].getTimes(date);
    if (times != null) {
      break;
    }
  }

  return times;
}

Location.prototype.isOpen = function(date) {
  curTime = date.getHours();
  // console.log(this.attr.times);
  var times = null;
  for (var i = 0; i < this.attr.times.length; i++) {
    // console.log(this.attr.times[i]);
    times = this.attr.times[i].getTimes(date);
    if (times != null) {
      break;
    }
  }
  console.log(times);
  if (times === null)
    return false;

  // if the current time is less than the start time, it must be the morning
  if (curTime < times[0]){
    if(curTime > 12){
      return true;
    }else{
      return curTime <= times[1][0];
    }
  }else{
    // if the current time is greater than the stop time and the stop time is in the evening, false
    if(curTime >= times[1][0] && times[1][0] > 12){
      return false;
    }

    return true;

  }
};

Location.prototype.weekSchedule = function(date) {
  var schedule = [];
  var nextDay = date;
  var day = null;
  var dayName = null;
  for (var k = 0; k < 5; k++) {
    nextDay = this.nextDay(nextDay);
    // console.log(nextDay);

    day = nextDay.getDay();
    // console.log(day);
    switch(day) {
      case 0: dayName = 'Sunday'; break;
      case 1: dayName = 'Monday'; break;
      case 2: dayName = 'Tuesday'; break;
      case 3: dayName = 'Wednesday'; break;
      case 4: dayName = 'Thursday'; break;
      case 5: dayName = 'Friday'; break;
      case 6: dayName = 'Saturday';
    }

    var times = [];
    for (var i = 0; i < this.attr.times.length; i++) {
      times = this.attr.times[i].getTimes(nextDay);
      if (times != null) {
        break;
      }
    }
    schedule[k] = {day: dayName, t: times};
  }
  return schedule;
};

Location.prototype.timeLeft = function(hour,minute,times){
  // console.log(hour + minute + times);
  if (hour >= times[0] && hour < times[1][0]) {
    if (minute === 0)
      return {hours: times[1][0] - hour, minutes: times[1][1] - minute};
    else
      return {hours: times[1][0] - hour - 1, minutes: times[1][1] - minute};
  }else if(hour >= times[0] && hour < times[1][0] + 24){
    return {hours: times[1][0] + 24 - hour, minutes: times[1][1] - minute};
  }else if(hour < times[1][0] && hour < 12 && times[1][0] < 12){
    return {hours: times[1][0] + 24 - hour, minutes: times[1][1] - minute};
  }else if(hour == times[1][0] && minute < times[1][1]){
    return {hours: 0, minutes: times[1][1] - minute}
  }
};

Location.prototype.nextOpen = function(today){
  var nextDay = this.nextDay(today);
  // console.log(nextDay);
  curTime = nextDay.getHours();
  var times = null;
  for (var i = 0; i < this.attr.times.length; i++) {
    times = this.attr.times[i].getTimes(nextDay);
    if (times != null) {
      break;
    }
  }
  // console.log(times);
  if (times === null)
    return this.nextOpen(nextDay);

  return times[0];
};

Location.prototype.nextDay = function(today) {
  var date = today.getDate();
  var month = today.getMonth()+1;
  var year = today.getFullYear();

  if (date <= 27) {
      today.setDate(date+1);
    }else{
      switch(date) {
        case 28:
          if (month === 2) {
            if (year % 4 != 0) {
              today.setDate(1);
              today.setMonth(2);
            } else if (year % 100 != 0)
              today.setDate(date+1);
            else if (year % 400 != 0) {
              today.setDate(1);
              today.setMonth(2);
            } else
              today.setDate(date+1);
          } else
            today.setDate(date+1);
        break;

        case 29:
          if (month === 2) {
            today.setDate(1);
            today.setMonth(2);
          } else
            today.setDate(date+1);
          break;

        case 30:
          switch (month) {
            case 4: case 6: case 9: case 11:
              today.setDate(1);
              today.setMonth(month+1);
              break;
            default:
              today.setDate(date+1);
          }
        default:
          if (month === 12) {
            today.setDate(1);
            today.setMonth(0);
            today.setFullYear(year+1);
          } else {
            today.setDate(1);
            today.setMonth(month+1);
          }
      }
    }
    return today;
};

Location.prototype.displayable = function(){

  var today = new Date();

  var open = this.isOpen(today);

  console.log(open);

  var div = '<div class="location-button" style="background-color:' + (open ? '#03a678' : '#c8626a') + ';"><div ontouchstart="toggleDropdown(this.children[0].innerHTML)" style="width: 53%;"><div class="location-name locations-text">'+
        this.name().toUpperCase() + '</div><div class="location-time locations-text">';

  var todaytimes = this.getTimes(today);
  var timeUntil = this.timeLeft(today.getHours(), today.getMinutes(), todaytimes);
  // var timeUntil = this.timeLeft(9, 20, todaytimes);


  if(timeUntil == null){
    div += "Closed";
  }else if(timeUntil.hours > 2){
    div += "Open until " + (todaytimes[1][0] > 12 ? todaytimes[1][0] - 12 : todaytimes[1][0]) + ":" + ((todaytimes[1][1] + "").length == 1 ? "0" : "") + todaytimes[1][1] +
     " " + (todaytimes[1][0] > 12 ? "PM" : "AM");
  }else if(timeUntil.hours == 0){
    div += "Closes in " + timeUntil.minutes + " minutes";
  }else if(timeUntil.minutes == 0){
    div += "Closes in " + timeUntil.hours + " hours";
  }else{
    div += "Closes in " + timeUntil.hours + " hours";
  }

  div += '</div><div class="location-events locations-text">' + 'nothing' +
  '</div></div><div class="location-eventtrig" ontouchstart="togglePopout(Events.loadEvents(`' + this.name() +
  '`));"></div>';

  if(!Storage.hasThisFavorite(this.name())){
      div += '<div class="location-favorite" id="' + this.name() + '" ontouchstart="getLocationById(this.id).addToFavorites()"><img src="res/Star_inactive.png" height="20" width="20" style="z-index:9; margin-top: 30px;"></div></div>';
  }else{
      div += '<div class="location-favorite" id="' + this.name() + '" ontouchstart="getLocationById(this.id).rmFromFavorites()"><img src="res/Star.png" height="20" width="20" style="z-index:9; margin-top: 30px;"></div></div>';
  }

  div += '<div id="dp-' + this.name().toLowerCase() + '" class="dropdown" style="display: none;">';

  var schedule = this.weekSchedule(today);

  for(var i = 0; i < schedule.length; i++){
    div += '<div class="upcoming-schedule-row">' + schedule[i].day + '<div class="schedule-times">' + schedule[i].t[0] + " to " + (schedule[i].t[1][0] > 12 ? schedule[i].t[1][0] - 12 : schedule[i].t[1][0] ) + '</div></div>';
  }

  div += '</div>';

  return div;
}

Location.prototype.addToFavorites = function(){
  // console.log("Adding to favorites");
  Storage.addToFavorites(this.name());




  if(Main._currentScreen == 1)
      Categories.loadCategory(Categories._currCategory);
  else
      Main.loadPage();

}

Location.prototype.rmFromFavorites = function(){
  // console.log("Removing from favorites");
  Storage.removeFromFavorites(this.name());




  if(Main._currentScreen == 1)
      Categories.loadCategory(Categories._currCategory);
  else
      Main.loadPage();

}





function getLocationById(id){
  var locations = Storage.getObject(Storage._locationNameSpace);

  if(locations != null){
    id = id.toLowerCase();

    for(var k in locations){
      thisloc = new Location();
      thisloc.load(locations[k].attr);

      if(thisloc.name().toLowerCase() == id){
        return thisloc;
      }

    }
  }

  return null;
}

function toggleDropdown(id){
    id = "dp-" + id.toLowerCase();

    if(!document.getElementById(id))
      return;

    x = document.getElementById(id).style.display == "block";

    document.getElementById(id).style.display = !x ? "block" : "none";

    if(!x){

      var elements = document.getElementsByClassName('animateDrop');

      for(var i = 0; i < elements.length; i++){
        elements[i].style.display = "none";
        elements[i].className = "dropdown";
      }

      document.getElementById(id).className += " animateDrop";
    }else{
      document.getElementById(id).className = "dropdown";
    }
}
