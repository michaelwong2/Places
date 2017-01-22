Main = {
  // favorites: 0, categories: 1, all: 2
  _currentScreen: 0,
  init: function(){
    this._currentScreen = 0;
    this.loadPage();
  },

  loadPage: function(){
    var page;

    switch(this._currentScreen){
      case 0:
        page = this.loadFavorites();
        break;
      case 1:
        // page = this.loadCategories();
        break;
      case 2:
        // page = this.loadAll();
        break;
      default: page = this.loadFavorites();
    }

    this.appendToMain(page);
  },
  switchScreen: function(s){
    this._currentScreen = s;
    this.loadPage();
  },
  loadFavorites: function(){
    var favorites = Storage.getObject(Storage._favoritesNameSpace);

    if(favorites == null || favorites.length === 0){
      return "<div class='nothing-alerter'>You have no favorites</div>";
    }else{
      favorites = favorites.favarray;
    }

    var s = "";

    for(var i = 0; i < favorites.length; i++){
      var thisfav = new Location();
      thisfav.load(favorites[i].attr);

      s += thisfav.displayable();
    }

    return s;

  },
  appendToMain: function(text){
    document.getElementById("main").innerHTML = text + "<div style='height:10px;width:100vw;float:left;'></div>";
  }
}

Categories = {
  _categoryList: ["Dining", "Studying", "Health & Fitness" , "24 Hour"],

}
