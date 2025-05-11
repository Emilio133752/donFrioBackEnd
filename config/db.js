require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (err) {
    console.error("Erro de conexão com MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
