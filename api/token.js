import { app } from "@azure/functions";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mySuperSecretKey";

app.http("generateToken", {
  route: "token",
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (req, context) => {
    // Create payload
    const payload = {
      user: "testUser",
      role: "admin"
    };

    // Generate JWT Token
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    return { body: { token } };
  }
});
