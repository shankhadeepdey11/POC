const express = require("express");
const Joi = require("joi");

const app = express();

const users = [
  { id: 1, firstName: "Shankhadeep", lastName: "Dey" },
  { id: 2, firstName: "Sahana", lastName: "Roy" },
  { id: 3, firstName: "Sanat", lastName: "Dey" },
  { id: 4, firstName: "Ira", lastName: "Dey" },
  { id: 5, firstName: "Mali", lastName: "Das" },
];

const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
  });
  return schema.validate(user);
};

// Middleware
app.use(express.json());

// GET Request
app.get("/", (req, res) => {
  res.send("We are on home page");
});
app.get("/users", (req, res) => {
  res.send(users);
});
app.get("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.send(user);
  }
});

// POST Request
app.post("/users", (req, res) => {
  const user = {
    id: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  users.push(user);
  res.send(user);
});

// PUT Request
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  res.send(user);
});

//DELETE Request
app.delete("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not found");
  const uId = users.indexOf(user);
  users.splice(uId, 1);
  res.send(user);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Running at port: ${port}`));
