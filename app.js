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
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error:${e.message}`);
    process.exit(1);
  }
};
initializedbandserver();
app.get("/players/", async (request, response) => {
  const getplayersquery = `SELECT * FROM cricket_team;`;
  const convertDbobjtoResponseobj = (dbObj) => {
    return {
      playerId: dbObj.player_id,
      playerName: dbObj.player_name,
      jerseyNumber: dbObj.jersey_number,
      playerRole: dbObj.player_role,
    };
  };
  const playersList = await db.all(getplayersquery);

  response.send(
    playersList.map((eachPlayer) => convertDbobjtoResponseobj(eachPlayer))
  );
});
