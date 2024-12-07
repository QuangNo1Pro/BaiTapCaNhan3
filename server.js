const express = require('express');
const { connectToDatabase, closeConnection } = require('./models/db');  // Import kết nối từ model

const app = express();
const PORT = process.env.DB_PORT;

// Khởi động kết nối tới cơ sở dữ liệu
connectToDatabase();


app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
