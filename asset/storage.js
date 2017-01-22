Storage = {
  _favoritesNameSpace: "favorites",

  saveObject: function(namespace, obj){
    var save = JSON.stringify(obj);
    window.localStorage.setItem(namespace, save);
  },
  getObject: function(namespace){
    return JSON.parse(window.localStorage.getItem(namespace));
  },
  addToFavorites: function(location){
    // get the object from local storage
    var favs = this.getObject(this._favoritesNameSpace);

    // if there is no data, create a new template
    if(favs == null){
      favs = {
        favarray: []
      }
    }else if(favs.favarray.indexOf(location) > -1){
      // if the location already exists in favorites return
      return;
    }

    // push the new location onto favorites
    favs.favarray.push(location);

    // save it to local storage
    this.saveObject(this._favoritesNameSpace, favs);
  },
  removeFromFavorites: function(location){
    // get the object from local storage
    var favs = this.getObject(this._favoritesNameSpace);

    // if there is nothing return
    if(favs == null){
      return;
    }

    // find the index of the location to remove in the favorites array
    var i = favs.favarray.indexOf(location);

    // splice it from the array
    favs.favarray.splice(i,1);

    // save the new array to local storage
    this.saveObject(this._favoritesNameSpace, favs);

  }
}
