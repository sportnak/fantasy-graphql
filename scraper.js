var request = require('request-promise');
const cheerio = require('cheerio');

request('https://www.pro-football-reference.com/teams/')
  .then(function (htmlString) {
    const $ = cheerio.load(htmlString);
    const teams = [];
    $('th').attr('data-stat', 'team_name').find('a').each(function () {
      teams.push({
        name: $(this).text()
      });
    });

    console.log(teams);
  })
  .catch(function (err) {
    console.log(err);
    // Crawling failed...
  });