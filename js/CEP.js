


function showModalErro(msg) {
  const modal = document.getElementById("modal-erro");
  const msgSpan = document.getElementById("modal-erro-msg");
  msgSpan.textContent = msg;
  modal.style.display = "flex";
  // Fecha ao clicar fora do conteúdo
  modal.onclick = function(e) {
    if (e.target === modal) modal.style.display = "none";
  };
}












// API ViaCEP para consulta de CEP


const cepInput = document.getElementById("cep");
const logradouro = document.getElementById("logradouro");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const uf = document.getElementById("uf");
const erroMsg = document.getElementById("modal-erro");

cepInput.addEventListener("blur", consultarCEP);

function consultarCEP() {
    const cep = cepInput.value.trim();

    erroMsg.textContent = "";
    logradouro.value = "";
    bairro.value = "";
    cidade.value = "";
    uf.value = "";

    if (cep.length !== 8 || isNaN(cep)) {
        showModalErro("CEP inválido. Digite apenas 8 números.");
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                showModalErro("CEP não encontrado!");
                return;
            }

            logradouro.value = data.logradouro;
            bairro.value = data.bairro;
            cidade.value = data.localidade;
            uf.value = data.uf;
        })
        .catch(() => {
           showModalErro("Erro ao consultar o CEP.");
        });
}