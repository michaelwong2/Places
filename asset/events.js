Events = {
  _popout: false,
  loadEvents: function(id){
    return "DAD";
  }
}

function togglePopout(text){
  document.getElementById("popout").style.display = Events._popout ? "none" : "block";

  if(!Events._popout){
    document.getElementById("event-displayer").innerHTML = text;
  }

  Events._popout = !Events._popout;
}
