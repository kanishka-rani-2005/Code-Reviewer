const express=require('express')
const aiRoutes=require('./routes/ai.routes')
const cors=require("cors")
const app=express()

app.use(express.json())

const ORIGIN=process.env.CORS_ORIGIN||"http://localhost:5173";

app.use(cors({
    origin: ORIGIN,
    credentials: true
}));

app.get('/',(req,res)=>{
    res.send("Running Properly")   
})


const rateLimit = require('express-rate-limit');

// Define rate limiter for AI routes
const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        status: 429,
        error: 'Too many requests, please try again later.'
    }
});

// Apply specifically to AI routes
app.use('/ai', aiLimiter, aiRoutes);

module.exports=app