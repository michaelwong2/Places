window.onload = function() {
  var loc = new Location();

  var fall = new Time(9,11);
  fall.setDays([8,22],[8,22],[8,22],[8,22],[8,22],[10,17],[12,22]);
  var spring = new Time(1,5);
  spring.setDays([9,23],[9,23],[9,23],[9,23],[9,23],[11,17],[12,23]);
  var summer = new Time(6,8);

  loc.update('Sawyer', [fall,spring,summer], 'studying');
  console.log(loc);
}
