function goBeach(){
  relationships.kai++;

  showScene({
    speaker:"kai",
    background:"beach",
    text:"You walk down to the beach.\n\nKai is standing near the shoreline, watching the waves.\n\n\"Good choice,\" he says with a grin.\n\n\"The ocean always tells the truth.\""
  });

  updateRelationships();
}

function goVilla(){
  relationships.lucas++;

  showScene({
    speaker:"lucas",
    background:"villa",
    text:"You step into the villa lounge.\n\nLucas looks up and smiles.\n\n\"I was hoping you'd come in here,\" he says.\n\nThe villa suddenly feels a little warmer."
  });

  updateRelationships();
}

function goShrine(){
  relationships.maya++;

  showScene({
    speaker:"maya",
    background:"crystal",
    text:"You follow Maya toward the Crystal Shrine.\n\nShe studies the glowing symbols carefully.\n\n\"These markings are older than the villa,\" she whispers.\n\n\"And I think they were waiting for you.\""
  });

  updateRelationships();
}