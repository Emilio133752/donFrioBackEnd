require('dotenv').config();
const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const produtosRoute = require('./routes/produtos')

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));


// Conectar ao banco de dados
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/produtos', produtosRoute);

// Inicializar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
