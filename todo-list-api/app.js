const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;

// Conectar ao banco de dados
connectDB();

// Middleware
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('API is running...');
// });


// Rotas
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
