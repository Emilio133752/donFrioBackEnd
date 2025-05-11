require('dotenv').config();
const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


// Conectar ao banco de dados
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);

// Inicializar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
