const express = require('express')
const app = express()
const port = 3000

app.get('/api/account', (req, res) => {
  res.send({
            memberId:3,
            memberName:"erlia",

  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})