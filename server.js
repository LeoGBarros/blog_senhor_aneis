const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

const apiToken = 'XkBH9xRqvXkg7bFhHTWf';


app.get('/character/:race', async (req, res) => {
  const race = req.params.race;
  try {
      const response = await axios.get('https://the-one-api.dev/v2/character', {
          headers: {
              Authorization: `Bearer ${apiToken}` 
          },
          params: {
              race: race 
          }
      });

      if (response.data && response.data.docs) {
          const characters = response.data.docs.slice(0, 10);
          res.json(characters); 
      } else {
          res.status(404).json({ error: 'Nenhum personagem encontrado para esta raça' });
      }
  } catch (error) {
      console.error('Erro ao buscar personagens:', error);
      res.status(500).json({ error: 'Erro ao buscar personagens da API' });
  }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
