import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database';  // Arquivo responsável pela conexão com o MongoDB
import eventRoutes from './routes/eventRoutes'; // Rotas para gerenciar eventos

dotenv.config();  // Carrega as variáveis de ambiente do arquivo .env

const app = express();

// Conecta ao banco de dados MongoDB
connectDB();

// Middleware para parse de JSON nas requisições
app.use(express.json());

// Usando as rotas de eventos
app.use('/api', eventRoutes);

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('Servidor Express está rodando!');
});

// Defina a porta para rodar o servidor
const PORT = process.env.PORT || 3000;

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
