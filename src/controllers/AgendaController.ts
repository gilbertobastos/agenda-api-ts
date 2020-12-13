import { Request, Response } from "express";
import { EventoAgenda } from "../sequelize/index";
import { Error } from "sequelize";

export async function getConsultarEventos(req: Request, res: Response) {
  const eventosAgenda = await EventoAgenda.findAll();
  res.status(200).send(eventosAgenda).end();
}

export async function postAdicionarEvento(req: Request, res: Response) {
  let parametrosEvento = req.body;

  let eventoAgenda = await EventoAgenda.build({
    dataAgendadaEvento: new Date(parametrosEvento.dataAgendadaEvento),
    descricaoEvento: parametrosEvento.descricaoEvento,
  });

  try {
    await eventoAgenda.save();
    res.status(201);
  } catch (e) {
    res.status(400).send({
      erro: e.name,
      mensagem: e.message,
    });
  } finally {
    res.end();
  }
}
