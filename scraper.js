var request = require('request-promise');
const cheerio = require('cheerio');
const mysql = require('mysql2/promise');
const moment = require('moment');

const list = {
  crd: 'Arizona Cardinals',
  atl: 'Atlanta Falcons',
  rav: 'Baltimore Ravens',
  buf: 'Buffalo Bills',
  car: 'Carolina Panthers',
  chi: 'Chicago Bears',
  cin: 'Cincinnati Bengals',
  cle: 'Cleveland Browns',
  dal: 'Dallas Cowboys',
  den: 'Denver Broncos',
  det: 'Detroit Lions',
  gnb: 'Green Bay Packers',
  htx: 'Houston Texans',
  clt: 'Indianapolis Colts',
  jax: 'Jacksonville Jaguars',
  kan: 'Kansas City Chiefs',
  sdg: 'Los Angeles Chargers',
  ram: 'Los Angeles Rams',
  mia: 'Miami Dolphins',
  min: 'Minnesota Vikings',
  nwe: 'New England Patriots',
  nor: 'New Orleans Saints',
  nyg: 'New York Giants',
  nyj: 'New York Jets',
  rai: 'Oakland Raiders',
  phi: 'Philadelphia Eagles',
  pit: 'Pittsburgh Steelers',
  sfo: 'San Francisco 49ers',
  sea: 'Seattle Seahawks',
  tam: 'Tampa Bay Bucaneers',
  oti: 'Tennessee Titans',
  was: 'Washington Redskins'
}

/**
 * Insert TEAMS
 */

// request('https://www.pro-football-reference.com/teams/')
//   .then(function (htmlString) {
//     const $ = cheerio.load(htmlString);
//     const teams = [];
//     $('th').attr('data-stat', 'team_name').find('a').each(function () {
//       teams.push({
//         name: $(this).text()
//       });
//     });

//     for (let i = 0; i < teams.length; i++) {
//       connection.query(`
//         INSERT INTO teams (name) VALUES ('${teams[i].name}');
//       `);
//     }

//     connection.end();
//   })
//   .catch(function (err) {
//     console.log(err);
//     // Crawling failed...
//   });


/**
 * INSERT GAMES
 * 
 */
request('https://www.pro-football-reference.com/teams/')
  .then(async function (htmlString) {

    const $ = cheerio.load(htmlString);
    const teams = [];
    $('th').attr('data-stat', 'team_name').find('a').each(function () {
      teams.push({
        url: `https://www.pro-football-reference.com${$(this).attr('href')}2018.htm`,
        teamName: list[$(this).attr('href').match(/\/teams\/([a-z]+)\//)[1]]
      });
    });

    for (let i = 0; i < 1; i++) {
      request(teams[i].url).then(async function (teamString) {
        var connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'password',
          database: 'nfl',
        });

        const $$ = cheerio.load(teamString);

        const [results] = await connection.execute(`
          SELECT * FROM teams WHERE name = '${teams[i].teamName}'
        `,);

        console.log(results);

        $$('#div_games').find('tr').each(function() {
          const outcome = $$(this).find('td[data-stat="game_outcome"]').text();
          const oppScore = $$(this).find('td[data-stat="pts_def"]').text();
          const teamScore = $$(this).find('td[data-stat="pts_off"]').text();
          const home = $$(this).find('td[data-stat="game_location"]').text().length === 0;
          const opponent = $$(this).find('td[data-stat="opp"]').text();
          const year = 2018;
          const playoffGame = false;
          const overtimeGame = $$(this).find('td[data-stat="overtime"]').text().length !== 0;
          const date = $$(this).find('td[data-stat="game_date"]').attr('csk');

          if (outcome.length === 0) {
            return;
          }

          // connection.query(`
          //   INSERT INTO games (year, homeTeam, awayTeam) VALUES ('${teams[i].name}');
          // `);

        // $$('td[data-stat="game_outcome"]').each(function() {
        //   if ($(this).text().length !== 1) {
        //     return;
        //   }

        //   console.log($(this).text());
        // });
      });
      connection.close();
    }
  )
  .catch(function (err) {
    console.log(err);
    // Crawling failed...
  });
}
  });



/**
 * INSERT PLAYERS
 * 
 */
// request('https://www.pro-football-reference.com/players/')
//   .then(function (htmlString) {
//     const $ = cheerio.load(htmlString);
//     const teams = [];
//     $('th').attr('data-stat', 'team_name').find('a').each(function () {
//       teams.push({
//         name: $(this).text()
//       });
//     });

//     for (let i = 0; i < teams.length; i++) {
//       connection.query(`
//         INSERT INTO teams (name) VALUES ('${teams[i].name}');
//       `);
//     }

//     connection.end();
//   })
//   .catch(function (err) {
//     console.log(err);
//     // Crawling failed...
//   });