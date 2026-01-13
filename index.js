const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/support", async (req, res) => {
  try {
    const relayWebhookURL = "https://hook.relay.app/api/v1/playbook/cmkatyq5r147u0pm93ri1d08i/trigger/6md02erTqLa6Mv9Pn33rAw";

    const relayResponse = await axios.post(relayWebhookURL, {
      customer_name: req.body.name,
      customer_email: req.body.email,
      department: req.body.department,
      issue: req.body.issue
    });

    res.json(relayResponse.data);
  } catch (error) {
    res.status(500).json({ error: "Relay failed" });
  }
});

app.listen(5000, () =>
  console.log("Backend running on http://localhost:5000")
);








// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post("/api/support", async (req, res) => {
//   try {
//     const relayWebhookURL = "https://hook.relay.app/api/v1/playbook/cmkatyq5r147u0pm93ri1d08i/trigger/6md02erTqLa6Mv9Pn33rAw";

//     const relayResponse = await axios.post(relayWebhookURL, {
//       customer_name: req.body.name,
//       customer_email: req.body.email,
//       department: req.body.department,
//       issue: req.body.issue
//     });

//     res.json(relayResponse.data);
//   } catch (error) {
//     res.status(500).json({ error: "Relay failed" });
//   }
// });

// app.listen(5000, () =>
//   console.log("Backend running on http://localhost:5000")
// );



