import Theatre from "../models/Theatre.js";

export const addTheatre = async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.status(201).json({
      success: true,
      message: "Theatre added successfully",
      data: newTheatre,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Adding theatre failed with error ${error}`,
    });
  }
};

export const getTheatres = async (req, res) => {
    try {
        const theatres = await Theatre.find().populate("owner").sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "All theatres fetched successfully",
            data: theatres,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Fetching theatres failed with error ${error}`,
        })
    }
};

export const updateTheatre = async (req, res) => {
    try {
        const theatreId = req?.params?.id;
        const theatre = await Theatre.findByIdAndUpdate(theatreId, req?.body, { new: true });
        if(!theatre) {
            return res.status(404).json({
                success: false,
                message: `Theatre not found with id ${theatreId}`,
            })
        }
        res.status(200).json({
            success: true,
            message: "Theatre updated successfully",
            data: theatre,
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: `Updating theatre failed with error ${error}`,
        })
    }
};

export const deleteTheatre = async (req, res) => {
    try {
        const theatreId = req?.params?.id;
        const theatre = await Theatre.findByIdAndDelete(theatreId);
        if(!theatre) {
            return res.status(404).json({
                success: false,
                message: `Theatre not found with id ${theatreId}`,
            })
        }
        res.status(200).json({
            success: true,
            message: "Theatre deleted successfully",
            data: theatre,
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: `Deleting theatre failed with error ${error}`,
        })
    }
};
