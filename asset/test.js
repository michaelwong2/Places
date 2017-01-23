window.onload = function() {
  var loc = new Location();

  var fall = new Time(9,11);
  fall.setDays([12,22],[8,22],[8,22],[8,22],[8,22],[8,22],[10,17]);
  var spring = new Time(1,5);
  spring.setDays([12,23],[9,23],[9,23],[9,23],[9,23],[9,23],[11,20]);
  var summer = new Time(6,8);

  loc.update('Sawyer', [fall,spring,summer], 'studying', false);
  console.log(loc);
  console.log(new Date());
  console.log(loc.isOpen(new Date()));

  // Storage.addToFavorites(loc);
}
