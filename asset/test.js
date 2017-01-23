window.onload = function() {
  var loc = new Location();

  var fall = new Time(9,11);
  fall.setDays([12,22],[8,22],[8,22],[8,22],[8,22],[8,22],[10,17]);
  var spring = new Time(1,5);
  spring.setDays([12,20],[9,23],[9,23],[9,23],[9,23],[9,23],[11,20]);
  var summer = new Time(6,8);

  loc.update('Sawyer', [fall,spring,summer], 'studying');
  console.log(loc);
  var date = new Date();
  date.setFullYear(2016);
  date.setDate(29);
  date.setMonth(1);
  console.log(date);
  console.log(loc.isOpen(date));
  console.log(loc.nextOpen(date));
}
