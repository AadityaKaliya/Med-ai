const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

/* OLLAMA CHAT API */

app.post("/chat", async (req, res) => {

    try {

        const message =
        req.body.message;

        const ollamaResponse =
        await fetch(
          "http://localhost:11434/api/generate",
          {
            method: "POST",

            headers: {
              "Content-Type":
              "application/json"
            },

            body: JSON.stringify({

              model: "llama3",

              prompt:
              "You are MedAI medical assistant. "
              + message,

              stream: false

            })

          }
        );

        const data =
        await ollamaResponse.json();

        res.json({

            success: true,

            reply:
            data.response

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success: false,

            error:
            error.message

        });

    }

});

app.listen(3000, () => {

    console.log(
      "Server running at port 3000"
    );

});