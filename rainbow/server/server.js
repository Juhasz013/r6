require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const app = express();
const sanitizeHtml = require("sanitize-html");

const pool = require("./config/database.js");
const {
  sendingGet,
  sendingGetError,
  sendingGetById,
  sendingPost,
  sendingPut,
  sendingDelete,
  sendingInfo,
} = require("./config/sending.js");

//#region middlewares
app.use(express.json());
//#endregion middlewares

//#region palyers
app.get("/players", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = "SELECT * FROM players";
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});

app.get("/palyers/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    //   const sql = `
    //   SELECT * FROM players
    // WHERE id = ${id}
    //   `;
    const sql = `
    SELECT * FROM players
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingGetById(res, error, results, id)
    });
    connection.release();
  });
});

app.post("/players", (req, res) => {
  console.log(req.body);
  const newR = {
    name: mySanitizeHtml(req.body.name),
    licenceNumber: mySanitizeHtml(req.body.licenceNumber),
    hourlyRate: +mySanitizeHtml(req.body.hourlyRate),
  };

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }
    const sql = `
    INSERT INTO players
      (name, licenceNumber, hourlyRate)
      VALUES
      (?, ?, ?)
    `;
    connection.query(
      sql,
      [newR.name, newR.licenceNumber, newR.hourlyRate],
      (error, results, fields) => {
        sendingPost(res, error, results, newR);
      }
    );
    connection.release();
  });
});

//update
app.put("/players/:id", (req, res) => {
  const id = req.params.id;
  const newR = {
    name: mySanitizeHtml(req.body.name),
    licenceNumber: mySanitizeHtml(req.body.licenceNumber),
    hourlyRate: +mySanitizeHtml(req.body.hourlyRate),
  };
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    UPDATE players SET
    name = ?,
    licenceNumber = ?,
    hourlyRate = ?
    WHERE id = ?
  `;
    connection.query(
      sql,
      [newR.name, newR.licenceNumber, newR.hourlyRate, id],
      (error, results, fields) => {
        sendingPut(res, error, results, id, newR)
      }
    );
    connection.release();
  });
});

app.delete("/players/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    DELETE from players
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingDelete(res, error, results, id)
    });
    connection.release();
  });
});

//#endregion players

//#region ranks
app.get("/ranks", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = "SELECT * FROM ranks";
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});

app.get("/ranks/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    //   const sql = `
    //   SELECT * FROM ranks
    // WHERE id = ${id}
    //   `;
    const sql = `
    SELECT * FROM ranks
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingGetById(res, error, results, id)
    });
    connection.release();
  });
});

app.post("/ranks", (req, res) => {
  console.log(req.body);
  const newR = {
    name: mySanitizeHtml(req.body.name),
    licenceNumber: mySanitizeHtml(req.body.licenceNumber),
    hourlyRate: +mySanitizeHtml(req.body.hourlyRate),
  };

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }
    const sql = `
    INSERT INTO ranks
      (name, licenceNumber, hourlyRate)
      VALUES
      (?, ?, ?)
    `;
    connection.query(
      sql,
      [newR.name, newR.licenceNumber, newR.hourlyRate],
      (error, results, fields) => {
        sendingPost(res, error, results, newR);
      }
    );
    connection.release();
  });
});

//update
app.put("/ranks/:id", (req, res) => {
  const id = req.params.id;
  const newR = {
    name: mySanitizeHtml(req.body.name),
    licenceNumber: mySanitizeHtml(req.body.licenceNumber),
    hourlyRate: +mySanitizeHtml(req.body.hourlyRate),
  };
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    UPDATE ranks SET
    name = ?,
    licenceNumber = ?,
    hourlyRate = ?
    WHERE id = ?
  `;
    connection.query(
      sql,
      [newR.name, newR.licenceNumber, newR.hourlyRate, id],
      (error, results, fields) => {
        sendingPut(res, error, results, id, newR)
      }
    );
    connection.release();
  });
});

app.delete("/ranks/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    DELETE from cars
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingDelete(res, error, results, id)
    });
    connection.release();
  });
});

//#endregion ranks

function mySanitizeHtml(data) {
  return sanitizeHtml(data, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

app.listen(process.env.APP_PORT, () => {
  console.log(`Data server, listen port: ${process.env.APP_PORT}`);
});
