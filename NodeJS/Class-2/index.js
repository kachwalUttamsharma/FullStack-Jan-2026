const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // middleware to parse JSON request body

// DB
let movies = [
    {
        id: 1,
        title: 'Inception',
        language: 'English',
        rating: 8.8
    },
    {
        id: 2,
        title: 'Parasite',
        language: 'Korean',
        rating: 8.6
    },
    {
        id: 3,
        title: 'The Dark Knight',
        language: 'English',
        rating: 9.0
    },
    {
        id: 4,
        title: 'Dangal',
        language: 'Hindi',
        rating: 8.4
    }
]
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// API to get all movies
app.get('/api/v1/movies/getAllMovies', (req, res) => {

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

    res.status(200).json({
        success: true,
        message: 'Movies fetched successfully',
        data: result
    })
})

// get me single movie /api/v1/movies/getSingleMovie/{id}
app.get('/api/v1/movies/getSingleMovie/:id', (req, res) => {

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
})


// create a new movie
// POST /api/v1/movies/createMovie
// data -> in request body
app.post('/api/v1/movies/createMovie', (req, res) => {
    const { title, language, rating } = req.body;

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
})

// update 
// PUT vs Patch
// PUT - update the entire resource
// PATCH - update a part of the resource

// while updating do we target specific resource or all resources
// Put/patch - /api/v1/movies/updateMovie/{id} - specific resource
app.put('/api/v1/movies/updateMovie/:id', (req, res) => {
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
});

app.patch('/api/v1/movies/updateMovieByPatch/:id', (req, res) => {
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
});


app.delete('/api/v1/movies/deleteMovie/:id', (req, res) => {
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
});

// Headers

app.get("/api/v1/movies/profile", (req, res) => {
    const token = req.headers.authorization;
    console.log("token from headers : ", token);
    res.status(200).send({
        success: true,
        message: "Profile fetched successfully",
        data: token  
    })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});