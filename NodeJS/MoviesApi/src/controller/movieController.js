const movies = require("../data/movies");
const sendResponse = require("../utils/resposneHandler");

const getAllMovies = (req, res) => {

      // query paramters - optional
    const {language, minRatings } = req.query;

    let result = movies;

    // filter by language
    if(language){
        result = result.filter((movie) => movie.language.toLowerCase() === language.toLowerCase());
    }

    // filter by minRatings
    if(minRatings){
        result = result.filter((movie) => movie.rating >= parseFloat(minRatings));
    }

    sendResponse(res, 200, true, 'Movies fetched successfully', result);
};


const getSingleMovie = (req, res) => {

      // path parameters
    const movieId = req.params.id;

    const movie = movies.find((movie) => movie.id === parseInt(movieId));
    
    if(!movie){
        return res.status(404).json({
            success: false,
            message: 'Movie not found'
        })
    }   

    res.status(200).json({
        success: true,
        message: 'Movie fetched successfully',
        data: movie
    })
};
const createMovie = (req, res) => {

      const { title, language, rating } = req.body;
      const user = req?.user;
      console.log(`user : ${JSON.stringify(user)}`);

    if(!title || !language || !rating){
        return res.status(400).json({
            success: false,
            message: 'Title, language and rating are required'
        })
    }

    const newMovie = {
        id: movies.length + 1,
        title,
        language,
        rating
    }

    movies.push(newMovie);

    res.status(201).json({
        success: true,
        message: 'Movie created successfully',
        data: newMovie
    })

};
const updateMovieByIdPut = (req, res) => {

      const movieId = req.params.id;
    const { title, language, rating } = req.body;

    const movieIndex = movies.findIndex((movie) => movie.id === parseInt(movieId));

    if(movieIndex === -1){
        return res.status(404).json({
            success: false,
            message: 'Movie not found'
        })
    }

    if(!title || !language || !rating){
        return res.status(400).json({
            success: false,
            message: 'Title, language and rating are required'
        })
    }

    // update the movie
    movies[movieIndex] = {
        id: parseInt(movieId),
        title,
        language,
        rating
    }

    res.status(200).json({
        success: true,
        message: 'Movie updated successfully',
        data: movies[movieIndex]
    })

};
const updateMovieByIdPatch = (req, res) => {
    const movieId = req.params.id;
    const { title, language, rating } = req.body;

    const movieIndex = movies.findIndex((movie) => movie.id === parseInt(movieId));

    if(movieIndex === -1){
        return res.status(404).json({
            success: false,
            message: 'Movie not found'
        })
    }

    // update the movie
    if(title) movies[movieIndex].title = title;
    if(language) movies[movieIndex].language = language;
    if(rating) movies[movieIndex].rating = rating;

    res.status(200).json({
        success: true,
        message: 'Movie updated successfully',
        data: movies[movieIndex]
    })
};
const deleteMovie = (req, res) => {
    const movieId = req.params.id;

    const movieIndex = movies.findIndex((movie) => movie.id === parseInt(movieId));

    if(movieIndex === -1){
        return res.status(404).json({
            success: false,
            message: 'Movie not found'
        })
    }

    // delete the movie
    movies.splice(movieIndex, 1);

    res.status(200).json({
        success: true,
        message: 'Movie deleted successfully'
    })
};


module.exports = {
    getAllMovies,
    getSingleMovie,
    createMovie,
    updateMovieByIdPatch,
    updateMovieByIdPut,
    deleteMovie
}