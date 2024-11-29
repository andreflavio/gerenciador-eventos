"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./database")); // Arquivo responsável pela conexão com o MongoDB
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes")); // Rotas para gerenciar eventos
dotenv_1.default.config(); // Carrega as variáveis de ambiente do arquivo .env
const app = (0, express_1.default)();
// Conecta ao banco de dados MongoDB
(0, database_1.default)();
// Middleware para parse de JSON nas requisições
app.use(express_1.default.json());
// Usando as rotas de eventos
app.use('/api', eventRoutes_1.default);
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
