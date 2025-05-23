
import express from "express";
import User from "../models/user.js";
import protect from "../middleware/AuthMiddleware.js"

const router = express.Router();


router.put("/update-address/:id",protect, async (req, res) => {
  try {

    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ 
        message: "Not authorized to update this address" 
      });
    }


    const { address } = req.body;


    
    // Validate input
    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    // Log for debugging
    console.log('Updating address for user:', req.params.id);
    console.log('New address:', address);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { address },
      { 
        new: true,
        runValidators: true // Enable validation
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log success
    console.log('Update successful:', updatedUser);
    res.status(200).json(updatedUser);

  } catch (err) {
    // Detailed error logging
    console.error("Error details:", {
      message: err.message,
      stack: err.stack,
      userId: req.params.id
    });
    
    // Send more specific error message
    res.status(500).json({ 
      message: "Failed to update address",
      error: err.message 
    });
  }
});

export default router;