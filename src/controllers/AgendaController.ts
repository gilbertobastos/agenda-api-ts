import { Request, Response } from "express";
import { EventoAgenda } from "../sequelize/index";
import { Op } from "sequelize";

export async function getConsultarEventos(req: Request, res: Response) {
  let parametrosFiltro = { de: req.body.de, para: req.body.para };

  if (parametrosFiltro.de && parametrosFiltro.para) {
    try {
      let eventosFiltrados = await EventoAgenda.findAll({
        where: {
          dataAgendadaEvento: {
            [Op.between]: [
              new Date(parametrosFiltro.de),
              new Date(parametrosFiltro.para),
            ],
          },
        },
      });

      res.status(200).send(eventosFiltrados);
    } catch (e) {
      res.status(400).send({
        erro: e.name,
        mensagem: e.message,
      });
    }
  } else {
    res.status(200).send(await EventoAgenda.findAll());
  }
  res.end();
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

export async function deleteDeletarEvento(req: Request, res: Response) {
  let idEventoASerDeletado = req.body.id;

  if (!Number.isInteger(idEventoASerDeletado)) {
    res
      .status(400)
      .send({
        mensagem:
          "Id informado inválido. Por favor informar um id numérico e inteiro.",
      })
      .end();
    return;
  }

  try {
    let eventoAgenda = await EventoAgenda.findByPk(idEventoASerDeletado);

    if (!eventoAgenda) {
      res
        .status(400)
        .send({
          mensagem: "Não foi localizado nenhum evento com o id informado.",
        });
    } else {
      eventoAgenda.destroy();
      res.status(200);
    }
  } catch (e) {
    res.status(400).send({
      erro: e.name,
      mensagem: e.message,
    });
  } finally {
    res.end();
  }
}
