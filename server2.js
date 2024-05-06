const express = require("express");
require('dotenv').config(); // Load environment variables

const { Pool } = require("pg");
const app = express();

const { createClient } = require('@supabase/supabase-js');
// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Accessing connection string from environment variable
});
app.get("/data", async (req, res) => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database!');
    client.release();
    res.send('Connected to PostgreSQL database!');
  } catch (error) {
    console.log("query error", error);
    res.status(500).send("Error");
  }
})

app.post("/add", async (req, res) => {
  // Insert the description into the 'todos' table
  await supabase.from('todos').insert({ description: "gwgwegwefwefw" });
  // Return success message
  res.status(201).json({ message: 'Todo added successfully' });
});

app.post("/add2", async (req, res) => {
  try {
    
  } catch (error) {
    console.log("Error with app.post route: ", error.message);
    res.status(500).send("Error");
  }
});


app.get("/", async (req, res) => {
    try {
      res.send("Hello bro");
    } catch (error) {
      console.log("query error", error);
      res.status(500).send("Error");
    }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Port is running on: ", PORT);
})