const { sequelize } = require("./src/sequelize/index");
const AgendaController = require('./src/controllers/AgendaController');

import express from "express";
import { AggregateError } from "sequelize/types";

const app = express();

app.use(express.json());

app.get('/eventos/', AgendaController.getConsultarEventos);
app.post('/eventos/', AgendaController.postAdicionarEvento);
app.delete('/eventos/', AgendaController.deleteDeletarEvento);

(async() => {
    await sequelize.sync();
    await app.listen(3333);
})();