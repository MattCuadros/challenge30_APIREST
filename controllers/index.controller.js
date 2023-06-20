import format from "pg-format";
import { handleErrors } from "../db/handleErrors.js";
import { pool } from "../db/query.js";
import { indexModel } from "../model/index.model.js";

const welcomeMessage = async (req, res) => {
  try {
    return res.json({
      ok: "true",
      message: "Welcome to the / main route",
    });
  } catch (error) {
    return res
      .status(code)
      .json({ ok: false, code: 500, message: "Error de Server" });
  }
};

const getAlljewells = async (req, res) => {
  try {
    let { limits = 5, sort, page = 1 } = req.query;
    const result = await indexModel.getJewells(limits, sort, page);
    const query = "SELECT * FROM inventario";
    const data = await pool.query(query);
    const total_pages = Math.ceil(data.rowCount / limits);
    return res.json({
      ok: true,
      message: "Lista de Joyas",
      total: result.length,
      result,
      page: parseInt(page),
      total_pages: total_pages,
      previous:
        page <= 1
          ? null
          : `http://localhost:3000/joyas?limits=${limits}&page=${page - 1}`,
      next:
        total_pages <= page
          ? null
          : `http://localhost:3000/joyas?limits=${limits}&page=${
              Number(page) + 1
            }`,
    });
  } catch (error) {
    console.log(error);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, message });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await indexModel.getOneJewell(id);
    return res.json({
      ok: true,
      message: "Joya encontrada",
      result,
    });
  } catch (error) {
    console.log(error.code);
    const { status, message } = handleErrors(error.code);
    return res.status(status).json({ ok: false, message });
  }
};

const filter = async (req, res) => {
  const { filtros } = req.query;
  console.log(req.query);
  const text = "SELECT * FROM inventario ";

  const operatorsQueryObject = {
    $eq: "=",
    $gt: ">",
    $gte: ">=",
    $lt: "<",
    $lte: "<=",
    $ne: "!=",
  };
  let arrayFormat = [];
  for (const key in filtros) {
    const name = key;
    const object = filtros[name];
    const operator = Object.keys(object)[0];
    const value = object[operator];
    text += "WHERE %s %s '%s'";
    arrayFormat.push(name, operatorsQueryObject[operator], value);
    console.log(arrayFormat);
    if (key !== properties[properties.length - 1]) {
      text += "AND ";
    }
  }
  try {
    const formatedQuery = format(text, ...arrayFormat);
    const { rows } = await pool.query(formatedQuery);
    console.log("Esta es la query de fila 144: " + text);
    console.log("Esta es la formatedQuery de la f148" + formatedQuery);
    return res.json({
      status: "success",
      data: {
        rows,
      },

      message: `${rows.length} registros encontrados`,
    });
  } catch (error) {
    console.log("Esta es la query de fila 144: " + query);
    console.log("Esta es la formatedQuery de la f148" + formatedQuery);
    console.log(req.query);
    console.log(error);
  }
  console.log("testing...");
};

const reportandoQuery = async (req, res, next) => {
  const query = req.query;
  res.json(query);
  console.log("Reportando el req.query", query);
  next();
};

export const indexController = {
  welcomeMessage,
  getAlljewells,
  getOne,
  filter,
  reportandoQuery,
};
