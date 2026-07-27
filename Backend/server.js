const app=require('./src/app')
require('dotenv').config()
PORT=process.env.PORT||3000


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})