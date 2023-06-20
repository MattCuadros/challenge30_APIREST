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

/* const addPost = async ({ titulo, img, descripcion }) => {
  const query =
    "INSERT INTO posts (titulo, img, descripcion) VALUES (%s,%s,%s) RETURNING *";
  const formatedQuery = format(query, [titulo, img, descripcion]);
  const { rows } = await pool.query(formatedQuery);
  console.log(rows[0]);
  return rows[0];
}; */

const getOneJewell = async (id) => {
  const { rows } = await pool.query("SELECT * FROM inventario WHERE id=$1", [
    id,
  ]);
  if (rows.length === 0) {
    throw { code: "404" };
  }
  return rows[0];
};

/* const putPost = async (id) => {
  const text =
    "UPDATE posts SET likes=COALESCE(likes,0)+1  WHERE id=$1 RETURNING *";
  const { rows } = await pool.query(text, [id]);
  if (rows.length === 0) {
    throw { code: "404" };
  }
  return rows[0];
};

const removePost = async (id) => {
  const text = "DELETE FROM posts WHERE id=$1 RETURNING *";
  const { rows } = await pool.query(text, [id]);
  if (rows.length === 0) {
    throw { code: "404" };
  }
  return rows[0];
}; */

export const indexModel = {
  getJewells,
/*   addPost, */
  getOneJewell,
/*   putPost,
  removePost, */
};
