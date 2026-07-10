import Show from "../models/Show.js";

export const addShow = async (req, res) => {
      try {
        const newShow = await Show(req.body);
        await newShow.save();
        res.send({
            success: true,
            message: "New Show has been added",
            data: newShow
        })
      } catch (error) {
        res.status(500).json({
          success: false,
          message: `Adding Show Failed with error : ${error}`,
        });
      }
};

export const deleteShow = async (req, res) => {
      try {
        // id -> query, body, path
        const showId = req.params.showId;
        await Show.findByIdAndDelete(showId);
        res.send({
            success: true,
            message: "Show has been deleted",
        })
      } catch (error) {
        res.status(500).json({
          success: false,
          message: `Deleting a Show Failed with error: ${error}`,
        });
      }
};

export const updateShow = async (req, res) => {
      try {
        // update target 
        const showId = req.params.showId;
        await Show.findByIdAndUpdate(showId, req.body);
        res.status(200).json({
          success: true,
          message: "Show has been updated",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: `Fetching all movies failed with error ${error}`,
        });
      }
};

export const getAllShowByTheatre = async (req, res) => {
      try {
        const theatreId = req.params.theatreId;
        const shows = await Show.find({theatre: theatreId}).populate("movie").populate("theatre");
        res.status(200).json({
          success: true,
          message: "All shows are fetched by theatre",
          data: shows,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: `Fetching all shows failed with error ${error}`,
        });
      }
};

export const getAllTheatresAndShowsByMovie = async (req, res) => {
      try {
        const movieId = req.params.movieId;
        const {date} = req.query;

        const shows = await Show.find({movie: movieId, date: date}).populate("theatre");
        // group by theatre 
        const theatreMap = new Map();
        // {
        //   threatreId: {
        //     ...thetreInfo,
        //     shows: []
        //   }
        // }
        // each theatre will show for particular day number of show
        shows?.forEach((show) => {
          const theatreId = show.theatre._id.toString();
          if(!theatreMap.has(theatreId)) {
            theatreMap.set(theatreId, {
              ...show.theatre._doc,
              shows: []
            })
          }
          theatreMap.get(theatreId).shows.push(show);
        })
        const uniqueTheatre = Array.from(theatreMap.values());
        res.send({
          success: true,
          message: "All theatre fetched successfully",
          data: uniqueTheatre
        })
      } catch (error) {
        res.status(500).json({
          success: false,
          message: `Fetching all movies failed with error ${error}`,
        });
      }
};

export const getShowById = async (req, res) => {
      try {
        const showId = req.params.showId;
        const shows = await Show.findById(showId).populate("movie").populate("theatre");
        res.status(200).json({
          success: true,
          message: "All shows are fetched successfully",
          data: shows,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: `Fetching All Shows Failed with error : ${error}`,
        });
      }
};
