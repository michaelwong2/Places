var Time = function(f, t){
  this.from = f;
  this.to = t;

  this.days = [null,null,null,null,null,null,null];

  this.exceptions = null;
}

Time.prototype.setDay = function(day, times){
  this.days[day] = times;
}

Time.prototype.getDay = function(day){
  return this.days[day];
}

// pass in current date and it will give you the times of operation or null
Time.prototype.getTimes = function(date){
  var month = date.getMonth();

  if(month < this.from || month > this.to)
    return null;

  var exception = this.exceptions[date.getDate() + "," + date.getMonth() + "," + date.getFullYear()];

  if(exception != null)
    return exception;

  return this.getDay(date.getDay());
}

Time.prototype.setDays = function(m, t, w, th, f, sa, su){
    this.days.setDay(0,m);
    this.days.setDay(0,t);
    this.days.setDay(0,w);
    this.days.setDay(0,th);
    this.days.setDay(0,f);
    this.days.setDay(0,sa);
    this.days.setDay(0,su);
}
