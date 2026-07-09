function showSpeaker(name, portrait){

  document.getElementById("portraitBox").classList.remove("hidden");

  document.getElementById("speakerName").innerHTML = name;

  document.getElementById("portrait").innerHTML = portrait;

  const title = document.getElementById("speakerTitle");

  if(name === "Lucas"){
    title.innerHTML = "The Loyal Swimmer";
  }
  else if(name === "Maya"){
    title.innerHTML = "The Explorer";
  }
  else if(name === "Host"){
    title.innerHTML = "Keeper of the Crystal Flame";
  }
  else if(name === "Narrator"){
    title.innerHTML = "The Story Begins";
  }
  else{
    title.innerHTML = "";
  }

}