var Location = function() {
  this.attr = {
    name: null,
    times: [],
    category: null,
    open: true
  };
};

//create a new location
Location.prototype.update = function(name, times, category) {
  console.log(this);
  this.attr.name = name;
  this.attr.times = times;
  this.attr.category = category;
};

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

Location.prototype.timeLeft = function(timeNow,times){

};
