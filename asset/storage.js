Storage = {
  _favoritesNameSpace: "favorites",
  _locationNameSpace: "locations",
  saveObject: function(namespace, obj){
    var save = JSON.stringify(obj);
    window.localStorage.setItem(namespace, save);
  },
  getObject: function(namespace){
    return JSON.parse(window.localStorage.getItem(namespace));
  },
  findMatch: function(array, match){
    for(var i = 0; i < array.length; i++){
      if(array[i] == match)
        return true;
    }

    return false;
  },
  hasFavorites: function(){
    var l = this.getObject(this._favoritesNameSpace);
    return l != null && l.favarray.length > 0;
  },
  hasThisFavorite: function(x){
    var fs = this.getObject(this._favoritesNameSpace);
    return fs != null && this.findMatch(fs.favarray, x);
  },
  addToFavorites: function(location){
    // get the object from local storage
    var favs = this.getObject(this._favoritesNameSpace);

    // if there is no data, create a new template
    if(favs == null){
      favs = {
        favarray: []
      }
    }else if(this.findMatch(favs.favarray, location)){
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

  },
  addToLocations: function(locations){
      var locs = this.getObject(this._locationNameSpace);

      if(locs == null){
        locs = {}
      }else if(locs[locations.name()] != null){
        return;
      }

      locs[locations.name()] = locations;

      this.saveObject(this._locationNameSpace, locs);
  }
}
