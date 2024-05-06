const express = require('express');
const { supabase, pool } = require('./db'); // Import the connection

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello bro");
});

app.get('/users', async (req, res) => {
    // Check if database connection is successful
    try {
      await pool.connect();
      console.log('Connected to the database!');
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
    } 
    res.send('Checked database connection!');
});


app.get('/test1', async (req, res) => {
  try {
    // Execute a SQL query to select all rows from the "todos" table
    const result = await pool.query(`SELECT * FROM "todos"`);

    // Log the table name
    console.log('Table: todos');

    // Log the rows
    console.table(result.rows);

    // Log the number of rows
    console.log(`Total rows in "todos": ${result.rowCount}`);

    // Send a response indicating success
    res.send('todos table data displayed in console.');
  } catch (error) {
    // Log any errors that occur
    console.error('Error fetching data from table "todos":', error.message);
    // Send an error response
    res.status(500).send('Error fetching data. Please check the server logs.');
  }
});

app.get('/test2', async (req, res) => {
  try {
    // Execute a SQL query to select all rows from the "todos" table
    const result = await pool.query(`SELECT * FROM "todos"`);

    // Send the data as JSON response
    res.json(result.rows);
  } catch (error) {
    // Log any errors that occur
    console.error('Error fetching data from table "todos":', error.message);
    // Send an error response
    res.status(500).send('Error fetching data. Please check the server logs.');
  }
});

// Route to save a hardcoded string to the "todos" table
app.get('/add', async (req, res) => {
  const description = 'Do laundry'; // Hardcoded description string

  try {
    // Execute a SQL query to insert the hardcoded description into the "todos" table
    const result = await pool.query(`INSERT INTO "todos" (description) VALUES ($1)`, [description]);

    // Send a success response
    res.send('Task added successfully.');
  } catch (error) {
    // Log any errors that occur
    console.error('Error adding task to the database:', error.message);
    // Send an error response
    res.status(500).send('Error adding task. Please check the server logs.');
  }
});

// Route to delete the first row from the "todos" table
app.get('/del', async (req, res) => {
  try {
    // Execute a SQL query to delete the first row from the "todos" table
    const result = await pool.query(`DELETE FROM todos WHERE description = "Do laundry";`);
    
    // Check if a row was deleted
    if (result.rowCount === 0) {
      return res.status(404).send('No tasks found to delete.');
    }

    // Send a success response
    res.send('First task deleted successfully.');
  } catch (error) {
    // Log any errors that occur
    console.error('Error deleting task from the database:', error.message);
    // Send an error response
    res.status(500).send('Error deleting task. Please check the server logs.');
  }
});


app.get('/add/:myword', async (req, res) => {
  const { myword } = req.params; // Access the parameter from req.params
  const description = myword; 
  try {
    const result = await pool.query(`INSERT INTO "todos" (description) VALUES ($1)`, [description]);
    res.send('Task added successfully.');
  } catch (error) {
    console.error('Error adding task to the database:', error.message);
    res.status(500).send('Error adding task. Please check the server logs.');
  }
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
