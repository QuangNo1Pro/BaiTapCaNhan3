require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs').promises;
const path = require('path');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function insertData() {
  try {
  } catch (error) {
    console.error("Error inserting data: ", error);
  } finally {
    // Đóng kết nối sau khi insert xong
    await client.end();
  }
}

module.exports = { insertData };
