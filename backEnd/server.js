require("dotenv").config()
const express = require("express")
const cors=require("cors")
const path=require("path")
const connectDB =require('./config/db')
const authRoutes=require("./routes/authRoutes")
const incomeRoutes=require("./routes/incomeRoutes")
const expenseRoutes=require("./routes/expenseRoutes")
const dashboardRoutes=require("./routes/dashboardRoutes")


const app=express()

const mongoose = require('mongoose')

//middlewares
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET" , "POST", "PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
    })
)

app.use(express.json());

connectDB();

// Health check endpoint — returns server + DB connection status
app.get('/health', (req, res) => {
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting']
    const dbState = mongoose.connection.readyState
    res.json({
        status: 'ok',
        server: 'running',
        db: states[dbState] || 'unknown',
        dbState
    })
})

app.use("/api/v1/auth",authRoutes)     //path ek baar dekhna padega
app.use("/api/v1/income",incomeRoutes)
app.use("/api/v1/expense",expenseRoutes)
app.use("/api/v1/dashboard",dashboardRoutes)


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server is ruuning on ${PORT}`))