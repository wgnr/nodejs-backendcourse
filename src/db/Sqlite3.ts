import { v4 as uuid } from "uuid";
import { verbose, Database } from "sqlite3";

const TABLE_NAME = `mensajes`;
const QUERY_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
  id TEXT PRIMARY KEY,
  date TEXT,
  msg TEXT,
  fromUser TEXT)
  `;
const QUERY_GET_ALL = `select * from ${TABLE_NAME}`;
const QUERY_INSERT_MESSAGE = `INSERT INTO ${TABLE_NAME} 
  (id,date,msg,fromUser) 
  VALUES
  ($id,$date,$msg,$fromUser);  
`;

verbose();
const dbMessages = new Database("mensajesSQLite3.db");

// INIT
dbMessages.serialize(() => {
  dbMessages.run(QUERY_CREATE_TABLE);
});

const getAll = async () => {
  // TODO claramente no sé este tema completamente.
  const p = new Promise((res, rej) => {
    dbMessages.all(QUERY_GET_ALL, (e, r) => {
      if (e) rej(e);
      res(r);
    });
  });
  return await p;

  // TODO leer sobre async/await y los then.
  // await dbMessages.all(QUERY_GET_ALL, (e, r) => {
  //   return r;
  // });
};

const add = async (values: any) => {
  const { date, msg, fromUser } = values;
  const newMessage = {
    id: uuid(),
    date,
    msg,
    fromUser,
  };

  const p = new Promise((res, rej) => {
    dbMessages.run(
      QUERY_INSERT_MESSAGE,
      {
        $id: newMessage.id,
        $date: newMessage.date,
        $msg: newMessage.msg,
        $fromUser: newMessage.fromUser,
      },
      (e) => {
        if (e) rej(e);
        res(newMessage);
      }
    );
  });
  return await p;
};

const exit = () => dbMessages.close();

export default {
  getAll,
  add,
  exit,
};
