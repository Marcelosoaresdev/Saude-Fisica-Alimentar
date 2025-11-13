// ===========================
// CALCULADORA DE IMC
// ===========================
document.addEventListener("DOMContentLoaded", function () {
  const calcularBtn = document.getElementById("calcular");
  const pesoInput = document.getElementById("peso");
  const alturaInput = document.getElementById("altura");
  const resultadoIMC = document.getElementById("resultadoIMC");
  const classificacaoIMC = document.getElementById("classificacaoIMC");

  if (
    !calcularBtn ||
    !pesoInput ||
    !alturaInput ||
    !resultadoIMC ||
    !classificacaoIMC
  ) {
    return;
  }

  calcularBtn.addEventListener("click", function () {
    const peso = parseFloat(pesoInput.value);
    const alturaCm = parseFloat(alturaInput.value);

    if (!peso || !alturaCm || alturaCm <= 0) {
      classificacaoIMC.textContent = "Por favor, insira valores válidos.";
      return;
    }

    // Convertendo cm para metros
    const altura = alturaCm / 100;

    // Cálculo do IMC
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
