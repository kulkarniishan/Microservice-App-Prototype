const express = require("express")
const createError = require('http-errors')
const app = express()


app.get('/authenticated',(req, res,next) => {
  const auth = req.headers.authorization
  console.log(auth)
  //console.log('hi')
  if(auth == null){
    return next(createError(401,'Auth headers not present'))
  }
    if (auth === "letmeinpleasekthxbye") {
     
      res.json({
        Authenticated: true
      })
    } else {
      return next(createError.Unauthorized())
    }
  })


const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`auth_svc listening on ${port}`)
})