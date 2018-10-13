import { ApolloServer, gql } from 'apollo-server';
import { IPlayer } from '../typings/IPlayer';
import { ITeam } from '../typings/ITeam';

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const teams: ITeam[] = [
  {
    id: 0,
    name: 'Browns',
    location: 'Cleveland',
  },
  {
    id: 1,
    name: 'Patriots',
    location: 'New England'
  }
]

const players: IPlayer[] = [
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
]

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Team {
    id: Int
    name: String
    location: String
  }

  type Player {
    id: Int
    teamId: Int
    position: String
    name: String
    birthdate: String
    height: String
    weight: String
    team: Team
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    players: [Player]
    teams: [Team]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    players: () => players,
    teams: () => teams,
  },
  Player: {
    team: ({ teamId }: any) => {
      return teams.filter(x => x.id === teamId)[0]
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
