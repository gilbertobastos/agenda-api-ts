import { Sequelize, Model, DataTypes } from "sequelize";
import { now } from "sequelize/types/lib/utils";

export default (sequelize: Sequelize) => {
  class EventoAgenda extends Model {
    get id() {
      return this.getDataValue("id");
    }

    get dataCadastroEvento() {
      return this.getDataValue("dataCadastroEvento");
    }

    get dataAgendadaEvento() {
      return this.getDataValue("dataAgendadaEvento");
    }

    set dataAgendadaEvento(dataAgendadaEvento: Date) {
      this.setDataValue("dataAgendadaEvento", dataAgendadaEvento);
    }
  }

  EventoAgenda.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      dataCadastroEvento: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      dataAgendadaEvento: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isAfter: {
            msg: "A data do evento não poderá ser inferior à data de hoje.",
            args: Date().toString(),
          },
        },
      },
      descricaoEvento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "EventosAgenda",
    }
  );

  return EventoAgenda;
};
