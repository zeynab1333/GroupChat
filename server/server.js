require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});


// Socket.IO
require('./socket')(io);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

// DB & Start
connectDB();
const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server is running on http://localhost:${PORT}`))