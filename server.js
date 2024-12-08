const express = require('express')
const {  insertData } = require('./models/db')
const app = express()
const PORT = process.env.DB_PORT

insertData(); // Kết nối đến cơ sở dữ liệu

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`)
})
