import { Model, Sequelize } from "sequelize";

import EventoAgendaModel from "./models/EventoAgenda.model";

const sequelize: Sequelize = new Sequelize("sqlite::memory");

const EventoAgenda = EventoAgendaModel(sequelize);

export { EventoAgenda, sequelize };
