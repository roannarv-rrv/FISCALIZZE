var denuncias = JSON.parse(localStorage.getItem("fiscalizze_denuncias") || "[]");
var filtroAtual = "Todas";

function salvar() {
  localStorage.setItem("fiscalizze_denuncias", JSON.stringify(denuncias));
}

function abrirPagina(nome) {
  var paginas = document.querySelectorAll(".pagina");
  for (var i = 0; i < paginas.length; i++) {
    paginas[i].classList.add("escondido");
  }

  document.getElementById(nome).classList.remove("escondido");
  document.getElementById("menu-superior").classList.toggle("escondido", nome != "inicio");
  document.getElementById("menu-lateral").classList.toggle("escondido", nome == "inicio");

  var links = document.querySelectorAll("#menu-lateral > button");
  for (var j = 0; j < links.length; j++) {
    links[j].classList.remove("ativo");
  }
  var link = document.getElementById("link-" + nome);
  if (link) link.classList.add("ativo");

  atualizarEstatisticas();
  if (nome == "denuncias") mostrarDenuncias();
  window.scrollTo(0, 0);
}

function atualizarEstatisticas() {
  var resolvidas = 0;
  var semana = 0;
  var urgentes = 0;
  var analise = 0;
  var pendentes = 0;
  var hoje = new Date();
  var inicioSemana = new Date();
  var dia = hoje.getDay();
  inicioSemana.setDate(hoje.getDate() - (dia == 0 ? 6 : dia - 1));
  inicioSemana.setHours(0, 0, 0, 0);

  for (var i = 0; i < denuncias.length; i++) {
    var item = denuncias[i];
    if (item.status == "Resolvido") resolvidas++;
    if (item.status == "Urgente") urgentes++;
    if (item.status == "Em análise") analise++;
    if (item.status == "Pendente") pendentes++;
    if (new Date(item.data) >= inicioSemana) semana++;
  }

  document.getElementById("numero-total").textContent = denuncias.length;
  document.getElementById("numero-resolvidas").textContent = resolvidas;
  document.getElementById("numero-semana").textContent = semana;
  document.getElementById("quantidade").textContent = denuncias.length;
  document.getElementById("q-todas").textContent = denuncias.length;
  document.getElementById("q-urgente").textContent = urgentes;
  document.getElementById("q-analise").textContent = analise;
  document.getElementById("q-pendente").textContent = pendentes;
  document.getElementById("q-resolvido").textContent = resolvidas;
}

document.getElementById("form-denuncia").addEventListener("submit", function(evento) {
  evento.preventDefault();

  var item = {
    id: Date.now(),
    tipo: document.getElementById("tipo").value,
    severidade: document.getElementById("severidade").value,
    descricao: document.getElementById("descricao").value.trim(),
    endereco: document.getElementById("endereco").value.trim(),
    bairro: document.getElementById("bairro").value.trim(),
    referencia: document.getElementById("referencia").value.trim(),
    data: new Date().toISOString(),
    status: "Pendente"
  };

  if (item.descricao.length < 10) {
    alert("Escreva uma descrição com pelo menos 10 caracteres.");
    return;
  }

  if (item.severidade == "Urgente") item.status = "Urgente";

  denuncias.push(item);
  salvar();
  document.getElementById("form-denuncia").reset();
  document.getElementById("previas").innerHTML = "";
  alert("Denúncia registrada! Protocolo: FZ-" + item.id);
  filtroAtual = "Todas";
  var botoes = document.querySelectorAll(".filtros button");
  for (var i = 0; i < botoes.length; i++) botoes[i].classList.remove("selecionado");
  botoes[0].classList.add("selecionado");
  abrirPagina("denuncias");
});

function cancelarCadastro() {
  document.getElementById("form-denuncia").reset();
  document.getElementById("previas").innerHTML = "";
  abrirPagina("inicio");
}

document.getElementById("fotos").addEventListener("change", function() {
  var arquivos = this.files;
  var area = document.getElementById("previas");
  area.innerHTML = "";

  if (arquivos.length > 4) {
    alert("Selecione no máximo quatro fotos.");
    this.value = "";
    return;
  }

  for (var i = 0; i < arquivos.length; i++) {
    var foto = document.createElement("img");
    foto.src = URL.createObjectURL(arquivos[i]);
    foto.alt = "Foto selecionada";
    area.appendChild(foto);
  }
});

function filtrar(status, botao) {
  filtroAtual = status;
  var botoes = document.querySelectorAll(".filtros button");
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].classList.remove("selecionado");
  }
  botao.classList.add("selecionado");
  mostrarDenuncias();
}

function mostrarDenuncias() {
  atualizarEstatisticas();
  var area = document.getElementById("cards");
  area.innerHTML = "";
  var quantidade = 0;

  for (var i = denuncias.length - 1; i >= 0; i--) {
    var item = denuncias[i];
    if (filtroAtual != "Todas" && item.status != filtroAtual) continue;
    quantidade++;

    var card = document.createElement("article");
    card.className = "card";

    var imagem = document.createElement("div");
    imagem.className = "card-imagem";
    var icone = "🗑️";
    if (item.tipo.indexOf("Entulho") >= 0) icone = "🏗️";
    if (item.tipo.indexOf("reciclável") >= 0) icone = "♻️";
    if (item.tipo.indexOf("industrial") >= 0) icone = "🛢️";
    imagem.textContent = icone;

    var texto = document.createElement("div");
    texto.className = "card-texto";

    var titulo = document.createElement("h3");
    titulo.textContent = item.tipo;

    var endereco = document.createElement("p");
    endereco.textContent = item.endereco + " - " + item.bairro;

    var protocolo = document.createElement("p");
    protocolo.textContent = "Protocolo: FZ-" + item.id;

    var status = document.createElement("p");
    status.className = "status";
    status.textContent = item.status;

    var botao = document.createElement("button");
    botao.textContent = "Alterar status";
    botao.onclick = (function(id) {
      return function() { alterarStatus(id); };
    })(item.id);

    texto.appendChild(titulo);
    texto.appendChild(endereco);
    texto.appendChild(protocolo);
    texto.appendChild(status);
    texto.appendChild(botao);
    card.appendChild(imagem);
    card.appendChild(texto);
    area.appendChild(card);
  }

  document.getElementById("sem-denuncias").style.display = quantidade == 0 ? "block" : "none";
}

function alterarStatus(id) {
  var novo = prompt("Digite o novo status exatamente assim: Pendente, Em análise ou Resolvido");
  if (novo == null) return;

  if (novo != "Pendente" && novo != "Em análise" && novo != "Resolvido") {
    alert("Status inválido.");
    return;
  }

  for (var i = 0; i < denuncias.length; i++) {
    if (denuncias[i].id == id) {
      denuncias[i].status = novo;
      break;
    }
  }
  salvar();
  mostrarDenuncias();
}

atualizarEstatisticas();
