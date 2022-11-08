const {
  createSkater,
  findAllSkaters,
  findSkaterByEmail,
  deleteSkater,
  editSkater,
} = require("./database");
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const secretKey = "Llave Secreta";

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(
  fileUpload({
    defCharset: "utf-8",
    defParamCharset: "utf-8",
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: "El tamaño es mayor que el máximo de 5MB",
  })
);
app.use(cors());

app.get("/skaters", async (req, res) => {
  try {
    findAllSkaters().then((data) => {
      res.json(data);
      res.statusCode = 200;
      res.end();
    });
  } catch (error) {
    res.statusCode = 500;
    (res.statusMessage = "Error al listar los skaters"), error;
    res.end();
  }
});
app.post("/skater", async (req, res) => {
  let sampleFile;
  let uploadPath;
  const skater = req.body;
  sampleFile = req.files.foto;
  uploadPath = __dirname + "/public/imgs/imagen-" + skater.email + ".jpg";
  await sampleFile.mv(uploadPath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  });
  skater.foto = "imgs/imagen-" + skater.email + ".jpg";

  createSkater(skater)
    .then(() => {
      res.redirect("http://localhost:3000/login");
      res.statusCode = 200;
      res.end();
    })
    .catch((err) => {
      res.json({ message: err.message });
      res.statusCode = 500;
      res.statusMessage = "Error al crear el skater";
      res.end();
    });
});
app.get("/skaters/:email", async (req, res) => {
  try {
    findSkaterByEmail(req.params.email).then((data) => {
      res.json(data);
      res.statusCode = 200;
      res.end();
    });
  } catch (error) {
    res.statusCode = 500;
    (res.statusMessage = "Error al buscar el skater"), error;
    res.end();
  }
});
app.put("/skater/:id", async (req, res) => {
  try {
    editSkater(req.params.id, req.body.skaterEdit)
      .then((data) => {
        res.json(data);
        res.statusCode = 200;
        res.end();
      })
      .catch((err) => {
        res.statusCode = 500;
        (res.statusMessage = "Error al editar el skater"), err;
        res.end();
      });
  } catch (error) {
    res.statusCode = 500;
    (res.statusMessage = "Error al editar el skater"), error;
    res.end();
  }
});
app.delete("/skater/:id", async (req, res) => {
  try {
    deleteSkater(req.params.id).then((data) => {
      res.json(data);
      res.statusCode = 200;
      res.end();
    });
  } catch (error) {
    res.statusCode = 500;
    (res.statusMessage = "Error al eliminar el skater"), error;
    res.end();
  }
});

app.post("/login", async (req, res) => {
  const skater = await findSkaterByEmail(req.body.skater.email);
  if (req.body.skater.password === skater.password) {
    const token = jwt.sign(
      {
        expiresIn: "120s",
        data: {
          email: req.body.skater.email,
          password: req.body.skater.password,
        },
      },
      secretKey
    );
    res.status(200).json({ token });
  } else {
    res.status(401).json({ mensaje: "Las credenciales no son validas" });
  }
});

app.listen("3000", () => {
  console.log("Servidor levantado en el puerto 3000");
});
