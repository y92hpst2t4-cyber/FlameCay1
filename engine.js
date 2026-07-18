function resumeSavedProgress(){
['choices','islandMap','walkingScreen','dialogueCard','portraitBox'].forEach(id=>{
q(id).classList.add('hidden');
});

if(finaleComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nSeason 1 is complete.'
});
choices('<button onclick="showVersionComplete()">🏆 View Grand Finale Ending</button>');
return;
}

if(finalDateComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe Final Date is complete.'
});
choices('<button onclick="startGrandFinale()">🏆 Continue to Grand Finale</button>');
return;
}

if(finalWeekComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nFinal Week has begun.'
});
choices('<button onclick="startFinalDates()">🌅 Continue to Final Dates</button>');
return;
}

if(secondEliminationComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe Second Elimination is complete.'
});
choices('<button onclick="startFinalWeek()">🌅 Continue to Final Week</button>');
return;
}

if(secretVoteComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe Secret Vote is complete.'
});
choices('<button onclick="startSecondElimination()">🔥 Continue to Second Elimination</button>');
return;
}

if(luxuryDateComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe Luxury Date is complete.'
});
choices('<button onclick="startSecretVote()">🗳️ Continue to Secret Vote</button>');
return;
}

if(compatibilityComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe Compatibility Challenge is complete.'
});
choices('<button onclick="startLuxuryDate()">🌅 Continue to Luxury Date</button>');
return;
}

if(falloutComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nFallout Day is complete.'
});
choices('<button onclick="startCompatibilityChallenge()">🏆 Continue to Compatibility Challenge</button>');
return;
}

if(recouplingComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe Casa Recoupling Ceremony is complete.'
});
choices('<button onclick="startFalloutDay()">☀️ Continue to Fallout Day</button>');
return;
}

if(casaComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe Casa-style loyalty test is complete.'
});
choices('<button onclick="startCasaRecoupling()">🔥 Continue to Casa Recoupling</button>');
return;
}

if(dateComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nValentina’s first date is complete.'
});
choices('<button onclick="startCasaDrama()">🏝️ Continue to the Casa Twist</button>');
return;
}

if(currentDay===5&&currentTime==='Evening'){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nDay 5 Evening has been restored.\n\nValentina’s first date is ready to continue.'
});
choices('<button onclick="startValentinaDate()">💖 Continue Valentina’s Date</button>');
return;
}

if(currentDay>=5&&eliminationComplete){
showScene({
speaker:'narrator',
background:currentTime==='Evening'?'night':currentTime==='Afternoon'?'afternoon':'arrival',
text:'💾 SAVE LOADED\n\nDay '+currentDay+' — '+currentTime+'\n\nYour progress has been restored.'
});
choices('<button onclick="openIslandMap()">🗺️ Continue Day '+currentDay+'</button>');
return;
}

if(eliminationComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe first elimination is complete.'
});
choices('<button onclick="beginDayFive()">☀️ Continue to Day 5</button>');
return;
}

if(bombshellComplete){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nValentina has arrived on Flame Cay.'
});
choices('<button onclick="startFirstElimination()">🔥 Continue to the Elimination</button>');
return;
}

if(challengeComplete){
showScene({
speaker:'narrator',
background:'afternoon',
text:'💾 SAVE LOADED\n\nThe First Challenge is complete.'
});
choices('<button onclick="startBombshellArrival()">💥 Continue to the Bombshell Arrival</button>');
return;
}

if(currentDay===4){
showScene({
speaker:'narrator',
background:currentTime==='Evening'?'night':currentTime==='Afternoon'?'afternoon':'arrival',
text:'💾 SAVE LOADED\n\nDay 4 — '+currentTime+'\n\nYou are officially coupled with '+characters[coupledWith].name+'.'
});

if(currentTime==='Morning'){
choices('<button onclick="openIslandMap()">🗺️ Continue Day 4 Morning</button>');
}else if(currentTime==='Afternoon'){
choices('<button onclick="startFirstChallenge()">🏆 Continue the First Challenge</button>');
}else{
choices('<button onclick="startBombshellArrival()">💥 Continue the Evening Event</button>');
}

return;
}

if(ceremonyComplete&&currentDay===3){
showScene({
speaker:'narrator',
background:'night',
text:'💾 SAVE LOADED\n\nThe first coupling ceremony has been completed.\n\nYou chose '+characters[coupledWith].name+'.'
});
choices('<button onclick="beginDayFour()">☀️ Continue to Day 4</button>');
return;
}

if(currentDay===3){
showScene({
speaker:'narrator',
background:'arrival',
text:'💾 SAVE LOADED\n\nDay 3 — '+currentTime+' has been restored.'
});
choices('<button onclick="openIslandMap()">🗺️ Continue Day 3</button>');
return;
}

showScene({
speaker:'narrator',
background:currentTime==='Evening'?'night':currentTime==='Afternoon'?'afternoon':'arrival',
text:'💾 SAVE LOADED\n\nDay '+currentDay+' — '+currentTime+' has been restored.'
});

choices('<button onclick="openIslandMap()">🗺️ Continue Game</button>');
}