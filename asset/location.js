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
  console.log(this);
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
  console.log(curTime);
  var times = null;
  for (var i = 0; i < this.attr.times.length; i++) {
    times = this.attr.times[i].getTimes(date);
    if (times != null) {
      break;
    }
  }
  console.log(times);
  if (times === null)
    return false;

  if (curTime < times[0] || curTime >= times[1])
    return false;
  else
    return true;
};

Location.prototype.displayable = function(){
  console.log(this);

  var today = new Date();

  var div = '<div class="location-button" style="background-color:' + (this.isOpen(today) ? 'green' : 'red') + ';"><div class="location-name locations-text">'+
        this.name().toUpperCase() + '</div><div class="location-time locations-text">' +
        10 + '</div><div class="location-events locations-text">' +
        'nothing' + '</div><div class="location-favorite">[]</div></div>';

  return div;
}

Location.prototype.timeLeft = function(timeNow,times){

};
