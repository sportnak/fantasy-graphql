import mysql from 'mysql';
import { ITeam } from '../../typings/ITeam';

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'me',
  password: 'secret',
  database: 'nfl'
});

connection.connect();

export function createTeam(team: Partial<ITeam>) {
  connection.query(`INSERT INTO teams (name) VALUES (${team.name});`);
}