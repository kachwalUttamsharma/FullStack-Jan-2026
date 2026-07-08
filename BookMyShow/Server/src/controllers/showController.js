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

export const getAllShowByMovie = async (req, res) => {
      try {
        //  discuss this later
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
        const shows = await Show.findById(showId);
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
