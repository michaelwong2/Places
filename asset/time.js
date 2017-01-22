var Time = function(f, t){
  this.from = f;
  this.to = t;

  this.days = [null,null,null,null,null,null,null];

  this.exceptions = {};
}

Time.prototype.setDay = function(day, times){
  this.days[day] = times;
}

Time.prototype.getDay = function(day){
  return this.days[day];
}

Time.prototype.setException = function(date, times){
  this.exceptions[date] = times;
}

// pass in current date and it will give you the [start,end] times of operation or null
Time.prototype.getTimes = function(date){
  var month = date.getMonth()+1;

  if(month < this.from || month > this.to)
    return null;

  var exception = this.exceptions[date.getDate() + "," + date.getMonth() + "," + date.getFullYear()];

  if(exception != null)
    return exception;

  return this.getDay(date.getDay());
}

Time.prototype.load = function(attr){
  for(var k in attr){
    this[k] = attr[k];
  }
}

Time.prototype.setDays = function(su, m, t, w, th, f, sa){
    this.setDay(0,su);
    this.setDay(1,m);
    this.setDay(2,t);
    this.setDay(3,w);
    this.setDay(4,th);
    this.setDay(5,f);
    this.setDay(6,sa);
}
