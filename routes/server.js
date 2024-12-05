// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/colorPaletteDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Palette schema
const paletteSchema = new mongoose.Schema({
  name: String,
  colors: [String],
});

const Palette = mongoose.model('Palette', paletteSchema);

// Routes
app.post('/api/palettes', async (req, res) => {
  const { name, colors } = req.body;
  const palette = new Palette({ name, colors });
  await palette.save();
  res.json(palette);
});

app.get('/api/palettes', async (req, res) => {
  const palettes = await Palette.find();
  res.json(palettes);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
