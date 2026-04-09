require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cors = require("cors");
const http = require("http");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

const app = express();
const server = http.createServer(app);
initializeSocket(server);

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json())
app.use(cookieParser());


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
app.use("/",chatRouter)


const port = process.env.PORT || 3000;

connectDB().then(()=>{
    console.log("Database Connection Established....");
    server.listen(port,()=>{
        console.log(`Server running on port ${port}`);
    });
}).catch((err)=>{
    console.log(err);
    console.error("Database cannot be connected");
})
