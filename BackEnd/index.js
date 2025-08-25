const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const chatRoutes = require('./routes/chatRoutes');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));  // For larger payloads if needed
app.use('/api/chat', chatRoutes);

connectDB();
app.listen(process.env.PORT, () => console.log(`Backend running on port ${process.env.PORT}`));