import format from "pg-format";
import { pool } from "../db/query.js";

const getJewells = async (limits, sort, page) => {
  let text = "SELECT * FROM inventario";
  const values = [];
  if (sort) {
    const[campo, direccion]=sort.split("_");
    values.push(campo, direccion);
    text += " ORDER BY %s %s";
  }

  if (limits) {
    values.push(limits);
    text += " LIMIT %s";
  }

  if (page && limits) {
    values.push((page - 1) * limits);
    text += " OFFSET %s";
  }
  console.log(values);
  const query = format(text, ...values);
  console.log(query);
  const { rows } = await pool.query(query);
  const results = rows.map((row) => {
    return {
      name: row.nombre,
      href: `http://localhost:3000/joyas/${row.id}`,
    };
  });
  return results;
};



const getOneJewell = async (id) => {
  const { rows } = await pool.query("SELECT * FROM inventario WHERE id=$1", [
    id,
  ]);
  if (rows.length === 0) {
    throw { code: "404" };
  }
  return rows[0];
};


export const indexModel = {
  getJewells,
  getOneJewell,
};
