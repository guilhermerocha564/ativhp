const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 9898;

app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "backativhp",
  password: "ds564",
  port: 7007,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("A Rota esta funcionando!");
});

app.get("/bruxos", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM backhp");
    res.json({
      total: resultado.rowCount,
      bruxos: resultado.rows,
    });
  } catch (error) {
    console.error("Erro ao exibir todos bruxos", error);
    res.status(500).json({ message: "Erro ao exibir todos de backhp" });
  }
});

app.post("/bruxos", async (req, res) => {
  const { nome, idade, casa, habilidade, sangue, patrono } = req.body;

  let casas = ["Grifinória", "Sonserina", "Corvinal", "Lufa-Lufa"];
  let habilidades = ["Feitiços", "Raciocínio", "Duelos", "Poções"];
  let sangues = ["Puro", "Mestiço", "Trouxa"];

  if (!casas.includes(req.body.casa)) {
    return res.status(400).send({ message: "Casa não encontrada!" });
  }

  if (!habilidades.includes(req.body.habilidade)) {
    return res.status(400).send({ message: "Habilidade não encontrada!" });
  }

  if (!sangues.includes(req.body.sangue)) {
    return res
      .status(400)
      .send({ message: "Sangue deve ser Puro, Mestiço ou Trouxa." });
  }

  if (!nome || !idade || !casa || !habilidade || !sangue) {
    return res
      .status(400)
      .send({ message: "Campos obrigatórios não preenchidos!" });
  }

  if (idade < 9 || idade > 100) {
    return res
      .status(400)
      .send({ message: "Idade deve ser entre 9 e 100 anos." });
  }

  try {
    await pool.query(
      "INSERT INTO backhp (nome, idade, casa, habilidade, sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)",
      [nome, idade, casa, habilidade, sangue, patrono]
    );

    res.status(201).send({ message: "Bruxo inserido com sucesso!" });
  } catch (error) {
    console.error("Erro ao inserir Bruxo", error);
    res.status(500).json({ message: "Erro ao inserir Bruxo" });
  }
});

app.delete("/bruxos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM backhp WHERE id = $1", [id]);
    res.status(200).send({ message: "Bruxo deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar Bruxo", error);
    res.status(500).json({ message: "Erro ao deletar Bruxo" });
  }
});

app.put("/bruxos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, idade, casa, habilidade, sangue, patrono } = req.body;

  let casas = ["Grifinória", "Sonserina", "Corvinal", "Lufa-Lufa"];
  let habilidades = ["Feitiços", "Raciocínio", "Duelos", "Poções"];
  let sangues = ["Puro", "Mestiço", "Trouxa"];

  if (!nome || !idade || !casa || !habilidade || !sangue) {
    return res
      .status(400)
      .send({ message: "Campos obrigatórios não preenchidos!" });
  }

  if (idade < 9 || idade > 100) {
    return res
      .status(400)
      .send({ message: "Idade deve ser entre 9 e 100 anos." });
  }

  if (!casas.includes(req.body.casa)) {
    return res.status(400).send({
      message:
        "Sua casa não existe, sua casa deve ser Grifinória, Sonserina, Corvinal ou Lufa-Lufa.",
    });
  }

  if (!habilidades.includes(req.body.habilidade)) {
    return res.status(400).send({
      message:
        "Sua habilidade não existe, sua habilidade deve ser Feitiços, Raciocínio, Duelos ou Poções.",
    });
  }

  if (!sangues.includes(req.body.sangue)) {
    return res
      .status(400)
      .send({ message: "Sangue deve ser Puro, Mestiço ou Trouxa." });
  }

  try {
    await pool.query(
      "UPDATE backhp SET nome = $1, idade = $2, casa = $3, habilidade = $4, sangue = $5, patrono = $6  WHERE id = $7",
      [nome, idade, casa, habilidade, sangue, patrono, id]
    );

    res.status(200).send({ message: "Bruxo atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar Bruxo", error);
    res.status(500).json({ message: "Erro ao atualizar Bruxo" });
  }
});

app.get("/bruxos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query("SELECT * FROM backhp WHERE id = $1", [
      id,
    ]);
    if (resultado.rowCount === 0) {
      return res.status(404).send({ message: "Id não encontrado!" });
    } else {
      res.json({
        usuario: resultado.rows[0],
      });
    }
  } catch (error) {
    console.error("Erro ao exibir bruxo pelo id", error);
    res.status(500).json({ message: "Erro ao exibir bruxo pelo id" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}🚀`);
});

app.get("/varinhas/", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM varinhahp");
    res.json({
      total: resultado.rowCount,
      varinhas: resultado.rows,
    });
  } catch (error) {
    console.error("Erro ao exibir todas varinhas", error);
    res.status(500).json({ message: "Erro ao exibir todas varinhas" });
  }
});

app.post("/varinhas", async (req, res) => {
  const { material, comprimento, nucleo, datafabri } = req.body;

  let materiais = ["Carvalho", "Cedro", "Faia", "Nogueira"];
  let nucleos = [
    "Pena de Fênix",
    "Pelo de Unicórnio",
    "Pelo de Veela",
    "Dente de Basilisco",
  ];

  if (!materiais.includes(req.body.material)) {
    return res.status(400).send({ message: "Material não encontrado!" });
  }

  if (!nucleos.includes(req.body.nucleo)) {
    return res.status(400).send({ message: "Núcleo não encontrado!" });
  }

  if (comprimento < 20 || comprimento > 40) {
    return res
      .status(400)
      .send({ message: "Comprimento deve ser entre 20 e 40 cm." });
  }

  if (!material || !comprimento || !nucleo || !datafabri) {
    return res
      .status(400)
      .send({ message: "Campos obrigatórios não preenchidos!" });
  }

  try {
    await pool.query(
      "INSERT INTO varinhahp (material, comprimento, nucleo, datafabri) VALUES ($1, $2, $3, $4)",
      [material, comprimento, nucleo, datafabri]
    );

    res.status(201).send({ message: "Varinha inserida com sucesso!" });
  } catch (error) {
    console.error("Erro ao inserir Varinha", error);
    res.status(500).json({ message: "Erro ao inserir Varinha" });
  }
});

app.delete("/varinhas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM varinhahp WHERE id = $1", [id]);
    res.status(200).send({ message: "Varinha deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar Varinha", error);
    res.status(500).json({ message: "Erro ao deletar Varinha" });
  }
});

app.put("/varinhas/:id", async (req, res) => {
  let materiais = ["Carvalho", "Cedro", "Faia", "Nogueira"];
  let nucleos = [
    "Pena de Fênix",
    "Pelo de Unicórnio",
    "Pelo de Veela",
    "Dente de Basilisco",
  ];

  const { id } = req.params;
  const { material, comprimento, nucleo, datafabri } = req.body;

  try {
    await pool.query(
      "UPDATE varinhahp SET material = $1, comprimento = $2, nucleo = $3, datafabri = $4 WHERE id = $5",
      [material, comprimento, nucleo, datafabri, id]
    );

    res.status(200).send({ message: "Varinha atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar Varinha", error);
    res.status(500).json({ message: "Erro ao atualizar Varinha" });
  }
});

app.get("/varinhas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query(
      "SELECT * FROM varinhahp WHERE id = $1",
      [id]
    );
    if (resultado.rowCount === 0) {
      return res.status(404).send({ message: "Id não encontrado!" });
    } else {
      res.json({
        usuario: resultado.rows[0],
      });
    }
  } catch (error) {
    console.error("Erro ao exibir varinha pelo id", error);
    res.status(500).json({ message: "Erro ao exibir varinha pelo id" });
  }
});
