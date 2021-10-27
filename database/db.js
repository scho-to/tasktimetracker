import StormDB from 'stormdb';

export default function getDB(name = "db") {
  const engine = new StormDB.localFileEngine(`./database/${name}.stormdb`);
  const db = new StormDB(engine);

  db.default({
    bookings: []
  });

  return db;
}

export function getPages() {
  return Math.ceil(getDB().get("bookings").value().size() / 5);
}