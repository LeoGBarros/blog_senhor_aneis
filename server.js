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
      // Faz a requisição para a API
      const response = await axios.get('https://the-one-api.dev/v2/character', {
          headers: {
              Authorization: `Bearer ${apiToken}` // Inclui o token de autorização
          },
          params: {
              race: race // Envia o parâmetro de raça
          }
      });

      // Verifica se há personagens no retorno
      if (response.data && response.data.docs) {
          // Retorna apenas os primeiros 10 personagens
          const characters = response.data.docs.slice(0, 10);
          res.json(characters); // Retorna os personagens como JSON
      } else {
          // Caso não haja personagens
          res.status(404).json({ error: 'Nenhum personagem encontrado para esta raça' });
      }
  } catch (error) {
      // Tratamento de erro
      console.error('Erro ao buscar personagens:', error);
      res.status(500).json({ error: 'Erro ao buscar personagens da API' });
  }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
