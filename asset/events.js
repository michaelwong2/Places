Events = {
  _popout: false,
  loadEvents: function(id){
    return "";
  }
}

function togglePopout(text){
  document.getElementById("popout").style.display = Events._popout ? "none" : "block";

  if(!Events._popout){
    if(text.length > 0){
      document.getElementById("event-displayer").innerHTML = "Events <br>" + text;
    }else{
      document.getElementById("event-displayer").innerHTML = "Events <br><br><span style='color: grey;'>There are no events</span>";
    }
  }

  Events._popout = !Events._popout;
}
