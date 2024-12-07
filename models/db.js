// models/db.js
require('dotenv').config();  
const { Client } = require('pg');  

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Kết nối thành công đến PostgreSQL!');
  } catch (error) {
    console.error('Lỗi khi kết nối đến cơ sở dữ liệu:', error);
  }
}
async function closeConnection() {
  await client.end();
  console.log('Đóng kết nối đến PostgreSQL');
}

module.exports = {           
  connectToDatabase,     
  closeConnection,     
};
