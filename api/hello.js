import { app } from "@azure/functions";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mySuperSecretKey";

app.http("helloWorldFunction", {
  route: "hello",
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (req, context) => {
    try {
      // Extract token from Authorization header
      const authHeader = req.headers["authorization"];
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return { status: 401, body: "Unauthorized: No token provided" };
      }

      const token = authHeader.split(" ")[1];

      // Verify the token
      jwt.verify(token, SECRET_KEY);

      return { body: "Hello, World!" };
    } catch (error) {
      return { status: 403, body: "Forbidden: Invalid token" };
    }
  }
});
