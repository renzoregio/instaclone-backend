import { client } from "../client"

export default {
    Mutation: {
        createMovie: (_, { title, year, genre }) => {
            return client.movie.create({
                data: {
                    title,
                    genre,
                    year
                }
            })
        },
        deleteMovie: (_, { id }) => {
            return client.movie.delete({ where: { id } })
        },
        updateMovie: (_, { id, year }) => client.movie.update({ where: { id }, data: { year } })
    }
}