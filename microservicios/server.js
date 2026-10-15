import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

function buildResponse(dateString) {
  let date;

  if (dateString === undefined) {
    date = new Date();
  } else if (/^-?\d+$/.test(dateString)) {
    date = new Date(Number(dateString));
  } else {
    date = new Date(dateString);
  }

  if (isNaN(date.getTime())) {
    return { error: "Invalid Date" };
  }

  return {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };
}

app.get("/api", (_req, res) => {
  res.json(buildResponse());
});

app.get("/api/:date", (req, res) => {
  res.json(buildResponse(req.params.date));
});

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
