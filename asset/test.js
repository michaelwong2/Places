window.onload = function() {
  var loc = new Location();

  var fall = new Time(9,11);
  fall.setDays([12,22],[8,22],[8,22],[8,22],[8,22],[8,22],[10,17]);
  var spring = new Time(1,5);
  spring.setDays([12,20],[9,23],[9,23],[9,23],[9,23],[9,23],[11,20]);
  var summer = new Time(6,8);

  loc.update('Sawyer', [fall,spring,summer], 'studying', false);
  // console.log(loc);
  // console.log(new Date());
  // console.log(loc.isOpen(new Date()));

  var date = new Date();
  console.log(loc.weekSchedule(date));
  // date.setFullYear(2016);
  // date.setDate(29);
  // date.setMonth(1);
  // console.log(loc.nextOpen(date));

  var loc1 = new Location();

  var fall1 = new Time(9,11);
  fall1.setDays([12,22],[8,22],[8,22],[8,22],[8,22],[8,22],[10,17]);
  var spring1 = new Time(1,5);
  spring1.setDays([12,23],[9,23],[9,23],[9,23],[9,23],[9,23],[11,20]);
  var summer1 = new Time(6,8);

  loc1.update('Lasell', [fall1,spring1,summer1], 'studying', false);

  // Storage.addToFavorites(loc);
}
