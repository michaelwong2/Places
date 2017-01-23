window.onload = function(){
  // sawyer
  var sawyer = new Location();
  var fall = new Time(9,11);
  fall.setDays([8,[2,30]],[8,[2,30]],[8,[2,30]],[8,[2,30]],[8,[2,30]],[8,[2,30]],[9,[22,00]]);
  var spring = new Time(1,5);
  spring.setDays([8,[2,30]],[8,[2,30]],[8,[2,30]],[8,[2,30]],[8,[2,30]],[8,[2,30]],[9,[22,00]]);
  var summer = new Time(6,8);
  sawyer.update('Sawyer', [fall,spring,summer], 'studying', false);

  // schow
  var schow = new Location();
  fall.setDays([11,[3,00]],[8,[3,00]],[8,[3,00]],[8,[3,00]],[8,[3,00]],[8,[20,00]],[11,[20,00]]);
  spring.setDays([11,[3,00]],[8,[3,00]],[8,[3,00]],[8,[3,00]],[8,[3,00]],[8,[20,00]],[11,[20,00]]);
  schow.update('Schow', [fall,spring,summer], 'studying', false);

  // bernhard
  var bernhard = new Location();
  fall.setDays([7,[24,00]],[7,[24,00]],[7,[24,00]],[7,[24,00]],[7,[24,00]],[7,[24,00]],[7,[24,00]]);
  spring.setDays([7,[24,00]],[7,[24,00]],[7,[24,00]],[7,[24,00]],[7,[24,00]],[7,[24,00]],[7,[24,00]]);
  bernhard.update('Bernhard', [fall,spring,summer], 'studying', false);

  // bronfman
  var bronfman = new Location();
  fall.setDays([0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]]);
  spring.setDays([0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]]);
  bronfman.update('Bronfman', [fall,spring,summer], '24 hour', true);

  // science center
  var science = new Location();
  fall.setDays([0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]]);
  spring.setDays([0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]]);
  science.update('Science Ctr', [fall,spring,summer], '24 hour', true);

  // clark
  var clark = new Location();
  fall.setDays([8,[24,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]]);
  spring.setDays([8,[24,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]]);
  clark.update('Clark', [fall,spring,summer], 'studying', false);

  // hollander
  var hollander = new Location();
  fall.setDays([19,[23,00]],[6,[23,00]],[6,[23,00]],[6,[23,00]],[6,[23,00]],[6,[19,00]],[0,[00,00]]);
  spring.setDays([19,[23,00]],[6,[23,00]],[6,[23,00]],[6,[23,00]],[6,[23,00]],[6,[19,00]],[0,[00,00]]);
  hollander.update('Hollander', [fall,spring,summer], 'studying', false);

  // schapiro
  var schapiro = new Location();
  fall.setDays([19,[23,00]],[6,[23,00]],[6,[23,00]],[6,[23,00]],[6,[23,00]],[6,[19,00]],[0,[00,00]]);
  spring.setDays([19,[23,00]],[6,[23,00]],[6,[23,00]],[6,[23,00]],[6,[23,00]],[6,[19,00]],[0,[00,00]]);
  schapiro.update('Schapiro', [fall,spring,summer], 'studying', false);

  // spencer
  var spencer = new Location();
  fall.setDays([0,[00,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[00,00]]);
  spring.setDays([0,[00,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[00,00]]);
  spencer.update('Spencer', [fall,spring,summer], 'studying', false);

  // hopkins
  var hopkins = new Location();
  fall.setDays([0,[00,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[0,[00,00]]);
  spring.setDays([0,[00,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[0,[00,00]]);
  hopkins.update('Hopkins', [fall,spring,summer], 'studying', false);

  // hopkins
  var hopkins = new Location();
  fall.setDays([0,[00,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[0,[00,00]]);
  spring.setDays([0,[00,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[8,[24,00]],[0,[00,00]]);
  hopkins.update('Hopkins', [fall,spring,summer], 'studying', false);

  // goodrich
  var goodrich = new Location();
  fall.setDays([0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]]);
  spring.setDays([0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]]);
  goodrich.update('Goodrich', [fall,spring,summer], '24 hour', true);

  // griffin
  var griffin = new Location();
  fall.setDays([19,[23,00]],[6,[23,00]],[6,[23,00]],[6,[23,00]],[6,[23,00]],[6,[19,00]],[0,[00,00]]);
  spring.setDays([19,[23,00]],[6,[23,00]],[6,[23,00]],[6,[23,00]],[6,[23,00]],[6,[19,00]],[0,[00,00]]);
  griffin.update('Griffin', [fall,spring,summer], 'studying', false);

  // hardy
  var hardy = new Location();
  fall.setDays([0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]]);
  spring.setDays([0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]],[0,[24,00]]);
  hardy.update('Hardy', [fall,spring,summer], '24 hour', true);
  // jenness
  var jenness = new Location();
  jenness.update('Jenness', [fall,spring,summer], '24 hour', true);
  // rice
  var rice = new Location();
  rice.update('Rice', [fall,spring,summer], '24 hour', true);

  // jesup
  var jesup = new Location();
  jesup.update('Jesup', [fall,spring,summer], '24 hour', true);

  // paresky
  var paresky = new Location();
  fall.setDays([6,[5,00]],[6,[5,00]],[6,[5,00]],[6,[5,00]],[6,[5,00]],[6,[5,00]],[6,[5,00]]);
  spring.setDays([6,[5,00]],[6,[5,00]],[6,[5,00]],[6,[5,00]],[6,[5,00]],[6,[5,00]],[6,[5,00]]);
  paresky.update('Paresky', [fall,spring,summer], 'studying', false);

  // lasell
  var lasell = new Location();
  fall.setDays([13,[22,00]],[6,[21,00]],[6,[22,00]],[6,[22,00]],[6,[22,00]],[6,[21,00]],[10,[21,00]]);
  spring.setDays([13,[22,00]],[6,[21,00]],[6,[22,00]],[6,[22,00]],[6,[22,00]],[6,[21,00]],[10,[21,00]]);
  lasell.update('Lasell', [fall,spring,summer], 'health & fitness', false);

  // Towne Field
  var towne = new Location();
  fall.setDays([0,[0,00]],[6,[21,00]],[6,[21,00]],[6,[21,00]],[6,[21,00]],[6,[21,00]],[0,[0,00]]);
  spring.setDays([0,[0,00]],[6,[21,00]],[6,[21,00]],[6,[21,00]],[6,[21,00]],[6,[21,00]],[0,[0,00]]);
  towne.update('Towne Field', [fall,spring,summer], 'health & fitness', false);

  /*'62 center
    Chapin
    Mailroom
  */
};
