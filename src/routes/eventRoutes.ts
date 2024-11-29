/*import { Router, Request, Response, NextFunction } from "express";
import Event from "../models/Event";

const router = Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

router.post(
  "/events",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { title, description, date, location, value } = req.body;

    // Validações básicas no backend
    if (!title || !date || !location || value === undefined) {
      res
        .status(400)
        .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
      return;
    }

    const event = new Event({ title, description, date, location, value });
    await event.save();
    res.status(201).json({ message: "Evento criado com sucesso!", event });
  })
);

router.get(
  "/events",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { title } = req.query;

    const events = title
      ? await Event.find({ title: new RegExp(title as string, "i") }) // Busca por título (case-insensitive)
      : await Event.find();

    res.status(200).json(events);
  })
);

router.put(
  "/events/:id",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = req.body;

    const event = await Event.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      res.status(404).json({ error: "Evento não encontrado." });
      return;
    }

    res.status(200).json({ message: "Evento atualizado com sucesso!", event });
  })
);


router.delete(
  "/events/:id",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      res.status(404).json({ error: "Evento não encontrado." });
      return;
    }

    res.status(200).json({ message: "Evento removido com sucesso!" });
  })
);

export default router;
*/

import { Router, Request, Response, NextFunction } from "express";
import Event from "../models/Event";

const router = Router();

/**
 * Middleware para lidar com erros assíncronos.
 * Este middleware evita que erros de funções assíncronas causem problemas no Express.
 */
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Rota: Criar um novo evento
 */
router.post(
  "/events",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { title, description, date, location, value } = req.body;

    // Validações básicas no backend
    if (!title || !date || !location || value === undefined) {
      res
        .status(400)
        .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
      return;
    }

    const event = new Event({ title, description, date, location, value });
    await event.save();
    res.status(201).json({ message: "Evento criado com sucesso!", event });
  })
);

/**
 * Rota: Listar todos os eventos ou buscar por título
 */
router.get(
  "/events",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { title } = req.query;

    const events = title
      ? await Event.find({ title: new RegExp(title as string, "i") }) // Busca por título (case-insensitive)
      : await Event.find();

    res.status(200).json(events);
  })
);

/**
 * Rota: Buscar eventos por JSON
 * Agora você pode enviar uma busca personalizada através de JSON.
 */
router.post(
  "/events/search",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { title, description, location, value } = req.body;

    // Cria um objeto de consulta com base nos parâmetros passados
    const query: any = {};

    if (title) query.title = { $regex: new RegExp(title, "i") }; // Busca case-insensitive por título
    if (description) query.description = { $regex: new RegExp(description, "i") }; // Filtro por descrição
    if (location) query.location = { $regex: new RegExp(location, "i") }; // Filtro por localização
    if (value !== undefined) query.value = value; // Filtro por valor exato

    // Realiza a busca no banco de dados
    const events = await Event.find(query);

    if (events.length === 0) {
      res.status(404).json({ message: "Nenhum evento encontrado." });
      return;
    }

    res.status(200).json(events); // Retorna os eventos encontrados
  })
);

/**
 * Rota: Atualizar informações de um evento
 */
router.put(
  "/events/:id",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedData = req.body;

    const event = await Event.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      res.status(404).json({ error: "Evento não encontrado." });
      return;
    }

    res.status(200).json({ message: "Evento atualizado com sucesso!", event });
  })
);

/**
 * Rota: Excluir um evento
 */
router.delete(
  "/events/:id",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      res.status(404).json({ error: "Evento não encontrado." });
      return;
    }

    res.status(200).json({ message: "Evento removido com sucesso!" });
  })
);

export default router;
