import express from "express";
import path from "node:path";

const app = express();
const port = Number(process.env.PORT ?? 3000);

const publicDirectory = path.join(__dirname, "public");

app.use(express.static(publicDirectory));

app.get("/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "commerce-qa-lab",
  });
});


app.listen(port, () => {
  console.log(`commerce-qa-lab listening on http://localhost:${port}`);
});