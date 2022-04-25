const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// const typeDefs = gql`
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//   }
// `;

// const books = [
//     {
//         title: 'The Awakening',
//         author: 'Kate Chopin',
//     },
//     {
//         title: 'City of Glass',
//         author: 'Paul Auster',
//     },
// ];

// // Resolvers define the technique for fetching the types defined in the
// // schema. This resolver retrieves books from the "books" array above.
// const resolvers = {
//     Query: {
//         books: () => books,
//     },
// };

// // The ApolloServer constructor requires two parameters: your schema
// // definition and your set of resolvers.
// const server = new ApolloServer({ typeDefs, resolvers });

// // The `listen` method launches a web server.
// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

// const typeDefs = `
//   type Query {
//     info: String!
//     feed: [Link!]!
//   }

//   type Link {
//     id: ID!
//     description: String!
//     url: String!
//   }
// `;

// let links = [{
//     id: 'link-0',
//     url: 'www.howtographql.com',
//     description: 'Fullstack tutorial for GraphQL'
//   }]

//   const resolvers = {
//     Query: {
//       info: () => `This is the API of a Hackernews Clone`,
//       // 2
//       feed: () => links,
//     },
//     // 3
//     Link: {
//       id: (parent) => parent.id,
//       description: (parent) => parent.description,
//       url: (parent) => parent.url,
//     }
//   }

const tweets = [
  {
    id: "tweet1",
    body: "Example Tweet-1",
    date: "19-04-2022",
  },
  {
    id: "tweet2",
    body: "Example Tweet-2",
    date: "20-04-2022",
  },
];

const users = [
  {
    id: "user1",
    username: "akhil_bommu",
    first_name: "Akhil",
    last_name: "Bommu",
    full_name: "Akhil Bommu",
    avatar_url:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fhe-s3.s3.amazonaws.com%2Fmedia%2Favatars%2Fakhilbommu14399%2Fresized%2F200%2Fphoto.jpg&imgrefurl=https%3A%2F%2Fwww.hackerearth.com%2F%40akhilbommu14399&tbnid=bTZUgEHbaowT4M&vet=12ahUKEwiL_Zfvx6T3AhXjk9gFHcpRDEIQMygAegQIARAo..i&docid=3lC1LqSpawel0M&w=200&h=200&itg=1&q=akhil%20bommu&ved=2ahUKEwiL_Zfvx6T3AhXjk9gFHcpRDEIQMygAegQIARAo",
  },
  {
    id: "user2",
    username: "nikhil_bommu",
    first_name: "Nikhil",
    last_name: "Bommu",
    full_name: "Nikhil Bommu",
    avatar_url:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fhe-s3.s3.amazonaws.com%2Fmedia%2Favatars%2Fakhilbommu14399%2Fresized%2F200%2Fphoto.jpg&imgrefurl=https%3A%2F%2Fwww.hackerearth.com%2F%40akhilbommu14399&tbnid=bTZUgEHbaowT4M&vet=12ahUKEwiL_Zfvx6T3AhXjk9gFHcpRDEIQMygAegQIARAo..i&docid=3lC1LqSpawel0M&w=200&h=200&itg=1&q=akhil%20bommu&ved=2ahUKEwiL_Zfvx6T3AhXjk9gFHcpRDEIQMygAegQIARAo",
  },
];

const stats = [
  {
    views: 123,
    likes: 98,
    retweets: 15,
    respones: 12,
    tweetId: "tweet1",
  },
  {
    views: 212,
    likes: 187,
    retweets: 36,
    responses: 21,
    tweetId: "tweet2",
  },
];

const notifications = [
  {
    id: "noti1",
    date: "20-04-2022",
    type: "sports",
  },
  {
    id: "noti2",
    date: "19-04-2022",
    type: "politics",
  },
];

const metas = {
  count: 10,
};

const typeDefs = gql`
  type Query {
    Tweet(id: ID!): Tweet
    Tweets(
      limit: Int
      skip: Int
      sort_field: String
      sort_order: String
    ): [Tweet]
    TweetsMeta: Meta
    User(id: ID!): User
    Notifications(limit: Int): [Notification]
    NotificationsMeta: Meta
  }

  type Tweet {
    id: ID!
    # The tweet text. No more than 140 characters!
    body: String
    # When the tweet was published
    date: Date
    # Who published the tweet
    Author: User
    # Views, retweets, likes, etc
    Stats: Stat
  }

  type User {
    id: ID!
    username: String
    first_name: String
    last_name: String
    full_name: String
    name: String @deprecated
    avatar_url: Url
  }

  type Stat {
    views: Int
    likes: Int
    retweets: Int
    responses: Int
    tweetId: ID
  }
  type Notification {
    id: ID
    date: Date
    type: String
  }

  type Meta {
    count: Int
  }

  scalar Url
  scalar Date

  type Mutation {
    createTweet(body: String): Tweet!
    deleteTweet(id: ID!): Tweet
  }
`;

const {v4} = require("uuid");

const resolvers = {
  Query: {
    Tweet: (parent, args, context) => {
      const { id } = args;
      return tweets.find((Tweet) => Tweet.id === id);
    },
    Tweets: () => tweets,
    TweetsMeta: () => metas,
    User: (parent, args, context) => {
      const { id } = args;
      return users.find((user) => user.id === id);
    },
    Notifications: (parent, args, context) => {
      const { limit } = args;
      return notifications.slice(0, limit);
    },
    NotificationsMeta: () => {
      return metas;
    },
  },
  Tweet: {
    Stats: (parent, args) => {
      const { id } = parent;
      return stats.find((stat) => stat.tweetId === id);
    },
  },

  Mutation: {
    createTweet: (parent, args) => {
      const { body } = args;
      const newTweet = {
        id: v4(),
        body,
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet: (parent, { id }) => {
      const deletedTweet = tweets.find((tweet) => tweet.id === id);
      tweets = tweets.filter((tweet) => tweet.id === id);
      return deletedTweet;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
