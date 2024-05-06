require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Route to fetch all todos
app.get('/todos', async (req, res) => {
  const { data } = await supabase.from('todos').select('*');
  res.json(data); // Array of todo objects with "description" field
});

// Route to add a new todo (with hardcoded description)
app.post('/todos', async (req, res) => {
  const description = 'This is a hardcoded description'; // Replace with logic to capture user input later
  const { data } = await supabase.from('todos').insert([{ description }]);
  res.json(data[0]); // Inserted todo object
});

const saveData = async () => {
  await supabase.from('todos').insert([{ description: "fwefwefwefwef" }]);
}
//saveData();

const saveData2 = async () => {
  await supabase.from('todos').insert([{ description: "dqwdqwdqwdqwdqwd" }]);
}
app.post("/good", async (req, res) => {
  try {
    await saveData2();
    res.json({ message: "Data saved successfully" }); // Or send a success message
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving data" });
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
