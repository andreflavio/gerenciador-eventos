"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Event_1 = __importDefault(require("../models/Event"));
const router = (0, express_1.Router)();
/**
 * Middleware para lidar com erros assíncronos.
 * Este middleware evita que erros de funções assíncronas causem problemas no Express.
 */
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
/**
 * Rota: Criar um novo evento
 */
router.post("/events", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, date, location, value } = req.body;
    // Validações básicas no backend
    if (!title || !date || !location || value === undefined) {
        res
            .status(400)
            .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
        return;
    }
    const event = new Event_1.default({ title, description, date, location, value });
    yield event.save();
    res.status(201).json({ message: "Evento criado com sucesso!", event });
})));
/**
 * Rota: Listar todos os eventos ou buscar por título
 */
router.get("/events", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.query;
    const events = title
        ? yield Event_1.default.find({ title: new RegExp(title, "i") }) // Busca por título (case-insensitive)
        : yield Event_1.default.find();
    res.status(200).json(events);
})));
/**
 * Rota: Atualizar informações de um evento
 */
router.put("/events/:id", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const event = yield Event_1.default.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
    });
    if (!event) {
        res.status(404).json({ error: "Evento não encontrado." });
        return;
    }
    res.status(200).json({ message: "Evento atualizado com sucesso!", event });
})));
/**
 * Rota: Excluir um evento
 */
router.delete("/events/:id", asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const event = yield Event_1.default.findByIdAndDelete(id);
    if (!event) {
        res.status(404).json({ error: "Evento não encontrado." });
        return;
    }
    res.status(200).json({ message: "Evento removido com sucesso!" });
})));
exports.default = router;
