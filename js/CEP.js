// Função para exibir mensagens de erro no modal
function showModalErro(msg) {
  const modal = document.getElementById("modal-erro");
  const msgSpan = document.getElementById("modal-erro-msg");

  if (modal && msgSpan) {
    msgSpan.textContent = msg;
    modal.style.display = "flex";

    // Fecha ao clicar fora do conteúdo
    modal.onclick = function (e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    };

    // Fecha automaticamente após 5 segundos
    setTimeout(() => {
      modal.style.display = "none";
    }, 5000);
  }
}

// Pega os elementos do DOM
const cepInput = document.getElementById("cep");
const logradouroInput = document.getElementById("logradouro");
const bairroInput = document.getElementById("bairro");
const cidadeInput = document.getElementById("cidade");
const ufInput = document.getElementById("uf");

// Máscara para o CEP (formato: 00000-000)
function mascaraCep(valor) {
  // Remove tudo que não é número
  valor = valor.replace(/\D/g, "");

  // Limita a 8 dígitos
  valor = valor.substring(0, 8);

  // Se tiver mais de 5 dígitos, aplica o formato 00000-000
  if (valor.length > 5) {
    valor = valor.replace(/^(\d{5})(\d{1,3})/, "$1-$2");
  }

  return valor;
}

// Aplica a máscara a cada digitação no campo CEP
if (cepInput) {
  cepInput.addEventListener("input", () => {
    cepInput.value = mascaraCep(cepInput.value);
  });
}

// Limpar campos de endereço
function limparFormulario() {
  if (logradouroInput) logradouroInput.value = "";
  if (bairroInput) bairroInput.value = "";
  if (cidadeInput) cidadeInput.value = "";
  if (ufInput) ufInput.value = "";
}

// Consulta o CEP na API ViaCEP
async function buscarCep(cep) {
  // Remove o traço e pega só números
  const cepLimpo = cep.replace(/\D/g, "");

  // Validação básica: CEP precisa ter 8 dígitos
  if (cepLimpo.length !== 8) {
    showModalErro("CEP inválido. Digite um CEP com 8 números.");
    limparFormulario();
    return;
  }

  const url = `https://viacep.com.br/ws/${cepLimpo}/json/`;

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Erro ao consultar o CEP.");
    }

    const dados = await resposta.json();

    if (dados.erro) {
      showModalErro("CEP não encontrado.");
      limparFormulario();
      return;
    }

    // Preenche os campos com os dados retornados e os torna readonly
    if (logradouroInput) {
      logradouroInput.value = dados.logradouro || "";
      logradouroInput.readOnly = true;
    }
    if (bairroInput) {
      bairroInput.value = dados.bairro || "";
      bairroInput.readOnly = true;
    }
    if (cidadeInput) {
      cidadeInput.value = dados.localidade || "";
      cidadeInput.readOnly = true;
    }
    if (ufInput) {
      ufInput.value = dados.uf || "";
      ufInput.readOnly = true;
    }
  } catch (erro) {
    console.error(erro);
    showModalErro("Ocorreu um erro ao buscar o CEP. Tente novamente.");
    limparFormulario();
  }
}

// Evento BLUR: ao perder o foco do campo CEP, consulta a API
if (cepInput) {
  cepInput.addEventListener("blur", () => {
    const cep = cepInput.value;

    if (cep.trim() !== "") {
      buscarCep(cep);
    } else {
      limparFormulario();
    }
  });
}
