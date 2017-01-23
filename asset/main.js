Main = {
  // favorites: 0, categories: 1, all: 2, food: 3
  _currentScreen: 0,
  init: function(){
    this._currentScreen = Storage.hasFavorites() ? 0 : 2;
    this.loadPage();
  },

  loadPage: function(){
    var page;

    switch(this._currentScreen){
      case 0:
        page = this.loadFavorites();
        break;
      case 1:
        page = this.loadCategories();
        break;
      case 2:
        page = this.loadAll();
        break;
      default: page = this.loadFavorites();
    }

    this.appendToMain(page);
  },
  switchScreen: function(s){
    this._currentScreen = s;
    this.toggleAllIconsOff();
    this.loadPage();
  },
  toggleAllIconsOff: function(){

  },
  loadFavorites: function(){
    var favorites = Storage.getObject(Storage._favoritesNameSpace);
    var locations = Storage.getObject(Storage._locationNameSpace);

    // console.log(favorites);

    if(favorites == null || favorites.favarray.length === 0){
      return "<div class='nothing-alerter'>You have no favorites</div>";
    }else{
      favorites = favorites.favarray;
    }

    var s = "";

    for(var i = 0; i < favorites.length; i++){

      if(locations[favorites[i]] == null)
        continue;

      var thisfav = new Location();
      thisfav.load(locations[favorites[i]].attr);

      s += thisfav.displayable();
    }

    return s;

  },
  loadCategories: function(){
    return Categories.load();
  },
  loadAll: function(){
    var locations = Storage.getObject(Storage._locationNameSpace);

    if(locations == null){
      Main.appendToMain("<div class='nothing-alerter'>No Locations</div>");
      return;
    }

    var s = "";

    for(var k in locations){
      thisloc = new Location();
      thisloc.load(locations[k].attr);
      s += thisloc.displayable();
    }

    return s;
  },
  appendToMain: function(text){
    document.getElementById("main").innerHTML = text + "<div style='height:10px;width:100vw;float:left;'></div>";
  }
};



/*
 * ===============================
 *            Category
 * ===============================
 */



Categories = {
  _categoryList: ["Dining", "Studying", "Health & Fitness" , "24 Hour"],
  load: function(){

    var s = "";

    for(var i = 0; i < this._categoryList.length; i++){
      s += '<div class="category-button" ontouchstart="Categories.loadCategory(' + i + ')">' + this._categoryList[i] + '</div>';
    }

    return s;
  },
  loadCategory: function(x){
    if(x > this._categoryList.length || x < 0)
      return;

    var locations = Storage.getObject(Storage._locationNameSpace);

    if(locations == null){
      Main.appendToMain("<div class='nothing-alerter'>No Locations</div>");
      return;
    }

    var s = "";
    var thiscat = this._categoryList[x].toLowerCase();

    for(var k in locations){
      if(locations[k].attr.category == thiscat){
        thisloc = new Location();
        thisloc.load(locations[k].attr);

        s += thisloc.displayable();
      }
    }

    if(s == ""){
      s = "<div class='nothing-alerter'>No Events in this Category</div>";
    }

    Main.appendToMain(s);

  }
}
