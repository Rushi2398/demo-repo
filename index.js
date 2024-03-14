const express = require("express");
const app = express();

let users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  // logic for returning how many kidneys are there and how many are healthy
  const kidneys = users[0].kidneys;
  const numOfKidneys = kidneys.length;
  let numOfHealthyKidneys = 0;
  for (let i = 0; i < kidneys.length; i++) {
    if (kidneys[i].healthy) numOfHealthyKidneys += 1;
  }
  const numOfUnHealthyKidneys = numOfKidneys - numOfHealthyKidneys;
  res.json({
    numOfKidneys,
    numOfHealthyKidneys,
    numOfUnHealthyKidneys,
  });
});

app.post("/", (req, res) => {
  // add kidneys to the body
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "done!",
  });
});

app.put("/", (req, res) => {
  // replace all unhealthy kidneys
  for (let i = 0; i < users[0].kidneys.length; i++)
    users[0].kidneys[i].healthy = true;
  res.json({});
});

app.delete("/", (req, res) => {
  // remove all unhealthy kidneys
  const newKidneys = [];
  // return status code 411 if input is wrong or when there are no kidneys to delete
  if (isOneUnhealthyKidney()) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) {
        newKidneys.push(users[0].kidneys[i]);
      }
    }
    users[0].kidneys = newKidneys;
    res.json({});
  } else {
    res.status(411).json({
      msg: "You have no bad kidney",
    });
  }
});

function isOneUnhealthyKidney() {
  let atleastOneUnhealthy = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      atleastOneUnhealthy = true;
      break;
    }
  }
  return atleastOneUnhealthy;
}
app.listen(3001);
