const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "cricketTeam.db");
const app = express();
let db = null;
const initializedbandserver = async () => {
  try {
    db = await open({
      fileName: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error:${e.message}`);
  }
};
initializedbandserver();
app.get("/players/", async (request, response) => {
  const playersQuery = SELECT * FROM;
  cricket_team;
  const playersArray = await db.all(playersQuery);
  const ans = (playersList) => {
    return {
      playerId: playersList.player_id,
      playerName: playerList.player_name,
      jerseyNumber: playersList.jersey_number,
      role: playersList.role,
    };
  };
  response.send(playerList.map((eachPlayer) => ans(eachPlayer)));
});
