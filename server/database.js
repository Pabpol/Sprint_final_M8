const { Sequelize } = require("sequelize");

const db = new Sequelize("skatepark", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres"
});

const Skater = db.define(
  "skaters",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    anos_experiencia: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    especialidad: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    foto: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    estado: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const createSkater = async (skater) => {
    try {
        skater.estado = false;
        await Skater.create(skater);
    } catch (error) {
        throw error
    }
  
};

const findAllSkaters = async () => {
  return Skater.findAll();
};
const findSkaterByEmail = async (email) => {
  return Skater.findOne({ where: { email: email } });
};
const editSkater = async (id, skater) => {
  return Skater.update(
    { 
        nombre: skater.nombre,
        password: skater.password,
        anos_experiencia: skater.anos_experiencia,
        especialidad: skater.especialidad,
        foto: skater.foto,
        estado: skater.estado
    },

    { where: { id: id } }
  );
};
const deleteSkater = async (id) => {
  return Skater.destroy({ where: { id: id } });
};

module.exports = {
  createSkater,
  findAllSkaters,
  findSkaterByEmail,
  editSkater,
  deleteSkater,
};
