const express = require('express');
const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


// Rota para carregar a página HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


// Rota para processar os dados do formulário
app.post('/calcularimc', (req, res) => {
  const nome = req.body.nome;
  const altura = parseFloat(req.body.altura);
  const peso = parseFloat(req.body.peso);


  const imc = peso / (altura * altura);
  let classificacao = '';


  if (imc < 16) classificacao = 'Baixo peso (grau I)';
  else if (imc >= 16 && imc <= 16.99) classificacao = 'Baixo peso (grau II)';
  else if (imc >= 17 && imc <= 18.49) classificacao = 'Baixo peso (grau III)';
  else if (imc >= 18.5 && imc <= 24.99) classificacao = 'Peso adequado';
  else if (imc >= 25 && imc <= 29.99) classificacao = 'Sobrepeso';
  else if (imc >= 30 && imc <= 34.99) classificacao = 'Obesidade (grau I)';
  else if (imc >= 35 && imc <= 39.99) classificacao = 'Obesidade (grau II)';
  else if (imc >= 40) classificacao = 'Obesidade (grau III)';


  res.send(`<h2>${nome}, sua classificação de IMC é: ${classificacao} (IMC: ${imc.toFixed(2)})</h2>`);
});


app.listen(3012, () => {
  console.log(`Servidor rodando em http://localhost:3012`);
});


