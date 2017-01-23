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

  if (date <= 27) {
      console.log(date + month + year);
      today.setDate(date+1);

  }else {
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
