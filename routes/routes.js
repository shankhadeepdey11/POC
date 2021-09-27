const express = require("express");
const Joi = require("joi");

const genres = require("../data");

const router = express.Router();

const validateGenre = (genre) => {
  const schema = Joi.object({
    movieName: Joi.string().min(3).required(),
    genre: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
};

//GET Request
router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === req.params.id);
  if (!genre) return res.status(404).send("Movie not found");
  res.send(genre);
});

//POST Request
router.post("/", (req, res) => {
  const genre = {
    id: genres.length + 1,
    movieName: req.body.movieName,
    genre: req.body.genre,
  };
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  genres.push(genre);
  res.send(genre);
});

//PUT Request
router.put("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Movie not found");
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  genre.movieName = req.body.movieName;
  genre.genre = req.body.genre;
  res.send(genre);
});

//DELETE Request
router.delete("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Movie not found");
  const gId = genres.indexOf(genre);
  genres.splice(gId, 1);
  res.send(genre);
});

module.exports = router;
