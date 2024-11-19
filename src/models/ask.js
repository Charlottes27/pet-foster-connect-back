import { Model, DataTypes } from "sequelize";
import sequelize from "./client.js";
import Animal from "./animal.js";
import Family from "./family.js";

export default class Ask extends Model {
  static associate(models) {
    // Associations définies ici
    Ask.belongsTo(models.Animal, { foreignKey: "id_animal", as: "animal" });
    Ask.belongsTo(models.Family, { foreignKey: "id_family", as: "family" });
  }
}


Ask.init(
  {
    // !Statut de la demande
    status: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: "en attente",
    },
  },
  {
    sequelize: sequelize,
    tableName: "ask",
  }
);

