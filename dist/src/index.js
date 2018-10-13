"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var teams = [
    {
        id: 0,
        name: 'Browns',
        location: 'Cleveland'
    },
    {
        id: 1,
        name: 'Patriots',
        location: 'New England'
    }
];
var players = [
    {
        id: 0,
        teamId: 1,
        position: 'qb',
        name: 'Tom Brady',
        birthdate: '08/03/1977',
        height: '6-4',
        weight: '225'
    },
    {
        id: 0,
        teamId: 0,
        position: 'qb',
        name: 'Baker Mayfield',
        birthdate: '04/14/1995',
        height: '6-1',
        weight: '215'
    },
];
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  # Comments in GraphQL are defined with the hash (#) symbol.\n\n  # This \"Book\" type can be used in other type declarations.\n  type Team {\n    id: Int\n    name: String\n    location: String\n  }\n\n  type Player {\n    id: Int\n    teamId: Int\n    position: String\n    name: String\n    birthdate: String\n    height: String\n    weight: String\n    team: Team\n  }\n\n  # The \"Query\" type is the root of all GraphQL queries.\n  # (A \"Mutation\" type will be covered later on.)\n  type Query {\n    players: [Player]\n    teams: [Team]\n  }\n"], ["\n  # Comments in GraphQL are defined with the hash (#) symbol.\n\n  # This \"Book\" type can be used in other type declarations.\n  type Team {\n    id: Int\n    name: String\n    location: String\n  }\n\n  type Player {\n    id: Int\n    teamId: Int\n    position: String\n    name: String\n    birthdate: String\n    height: String\n    weight: String\n    team: Team\n  }\n\n  # The \"Query\" type is the root of all GraphQL queries.\n  # (A \"Mutation\" type will be covered later on.)\n  type Query {\n    players: [Player]\n    teams: [Team]\n  }\n"])));
var resolvers = {
    Query: {
        players: function () { return players; },
        teams: function () { return teams; }
    },
    Player: {
        team: function (_a) {
            var teamId = _a.teamId;
            return teams.filter(function (x) { return x.id === teamId; })[0];
        }
    }
};
var server = new apollo_server_1.ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
var templateObject_1;
//# sourceMappingURL=index.js.map