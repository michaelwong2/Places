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

Location.prototype.isOpen = function(date) {
  curTime = date.getHours();
  // console.log(curTime);
  var times = null;
  for (var i = 0; i < this.attr.times.length; i++) {
    times = this.attr.times[i].getTimes(date);
    if (times != null) {
      break;
    }
  }
  // console.log(times);
  if (times === null)
    return false;

  if (curTime < times[0] || curTime >= times[1])
    return false;
  else
    return true;
};


Location.prototype.timeLeft = function(hour,minute,times){
  if (hour >= times[0] && hour < times[1]) {
    if (minute === 0)
      return {hours: times[1] - hour, minutes: 0};
    else
      return {hours: times[1] - hour - 1, minutes: 60 - minute};
  }
};

Location.prototype.nextOpen = function(today){
  var nextDay = this.nextDay(today);
  console.log(nextDay);
  curTime = nextDay.getHours();
  var times = null;
  for (var i = 0; i < this.attr.times.length; i++) {
    times = this.attr.times[i].getTimes(nextDay);
    if (times != null) {
      break;
    }
  }
  console.log(times);
  if (times === null)
    return this.nextOpen(nextDay);

  return times[0];
};

Location.prototype.nextDay = function(today) {
  var date = today.getDate();
  var month = today.getMonth()+1;
  var year = today.getFullYear();
}

Location.prototype.displayable = function(){

  var today = new Date();

  var open = this.isOpen(today);

  var div = '<div class="location-button" style="background-color:' + (open ? 'green' : 'red') + ';"><div ontouchstart="toggleDropdown(this.children[0].innerHTML)" style="width: 53%;"><div class="location-name locations-text">'+
        this.name().toUpperCase() + '</div><div class="location-time locations-text">' +
        10 + '</div><div class="location-events locations-text">' +
        'nothing' + '</div></div><div class="location-eventtrig" ontouchstart="togglePopout(Events.loadEvents(`' + this.name() + '`));">...</div>';

  if(!Storage.hasThisFavorite(this.name())){
      div += '<div class="location-favorite" id="' + this.name() + '" ontouchstart="getLocationById(this.id).addToFavorites()">[+]</div></div>';
  }else{
      div += '<div class="location-favorite" id="' + this.name() + '" ontouchstart="getLocationById(this.id).rmFromFavorites()">[x]</div></div>';
  }

  div += '<div id="dp-' + this.name().toLowerCase() + '" class="dropdown" style="display: none;"></div>';

  return div;
}

Location.prototype.addToFavorites = function(){
  console.log("Adding to favorites");
  Storage.addToFavorites(this.name());

  Main.loadPage();
}

Location.prototype.rmFromFavorites = function(){
  console.log("Removing from favorites");
  Storage.removeFromFavorites(this.name());
  Main.loadPage();
}

Location.prototype.timeLeft = function(timeNow,times){
/*
if (date <= 27) {
    console.log(date + month + year);
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
  return today;*/
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
