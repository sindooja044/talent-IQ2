{/*import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;

      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

      // find user in db by clerk ID
      let user = await User.findOne({ clerkId });
if (!user) return res.status(404).json({ message: "User not found" });

      // attach user to req
      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
]; */}




import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId)
        return res.status(401).json({ message: "Unauthorized - invalid token" });

      // Find or create user in MongoDB
      const user = await User.findOneAndUpdate(
        { clerkId },  // lookup by Clerk ID
        {
          $setOnInsert: {
            name: req.auth().firstName || "Unknown",
            email: req.auth().emailAddress || `user_${clerkId}@example.com`,
          },
        },
        { new: true, upsert: true } // create if not exists
      );

      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protectRoute middleware:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  },
];
