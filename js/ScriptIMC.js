// ===========================
// CALCULADORA DE IMC (simples)
// Altura diretamente em metros
// ===========================
document.addEventListener("DOMContentLoaded", function () {
  const calcularBtn = document.getElementById("calcular");
  const pesoInput = document.getElementById("peso");
  const alturaInput = document.getElementById("altura");
  const resultadoIMC = document.getElementById("resultadoIMC");
  const classificacaoIMC = document.getElementById("classificacaoIMC");

  if (!calcularBtn || !pesoInput || !alturaInput || !resultadoIMC || !classificacaoIMC) {
    return;
  }

  calcularBtn.addEventListener("click", function () {
    
    const peso = parseFloat(pesoInput.value.replace(",", "."));
    const altura = parseFloat(alturaInput.value.replace(",", "."));

    if (!peso || !altura || altura <= 0) {
      resultadoIMC.textContent = "-";
      classificacaoIMC.textContent = "Por favor, insira valores válidos.";
      return;
    }

    // IMC = peso / (altura²)
    const imc = (peso / (altura * altura)).toFixed(1);

    let classificacao = "";
    if (imc < 18.5) {
      classificacao = "Magreza";
    } else if (imc < 25) {
      classificacao = "Normal";
    } else if (imc < 30) {
      classificacao = "Sobrepeso";
    } else if (imc < 35) {
      classificacao = "Obesidade grau I";
    } else if (imc < 40) {
      classificacao = "Obesidade grau II";
    } else {
      classificacao = "Obesidade grau III";
    }

    resultadoIMC.textContent = imc;
    classificacaoIMC.textContent = `Classificação: ${classificacao}`;
  });
});
