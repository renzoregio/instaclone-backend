import { ApolloServer, gql } from "apollo-server"

let tempMovies = [
    {
        title: "First Movie",
        year: 1997
    },
    {
        title: "Second Movie",
        year: 2021
    },
    {
        title: "Third Movie",
        year: 2018
    }
]

const typeDefs = gql`

   type Movie {
    id: Int
    title: String
    year: Int
   } 

    type Query {
        movies : [Movie]
        movie: Movie
    }

    type Mutation {
        createMovie(title: String!): Boolean
        deleteMovie(title: String!): Boolean
    }
`

const resolvers = {
    Query: {
        movies: () => tempMovies,
        movie: () => ({ title: "Hello", year: 2021 })
    },
    Mutation: {
        createMovie: (_, { title }) => {
            const movie = { title: title, year: 2022 }
            tempMovies.push(movie)
            return true
        },
        deleteMovie: (_, { title }) => {
            const originalLength = tempMovies.length;
            tempMovies = tempMovies.filter((movie) => movie.title !== title)
            return tempMovies.length !== originalLength ? true : false;
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(() => console.log("Server is running on http://localhost:4000"))