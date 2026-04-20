const supabaseUrl = "https://hkqtbzydqcydyvtdgcph.supabase.co"; 
const supabaseKey = "sb_publishable_mKQCqS9aczIfZ7IU-zhDjQ_hUVJw80B";

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);

let produtos = [];

// carregar produtos
async function carregarProdutos() {
  const { data, error } = await client
    .from("produtos")
    .select("*");

  if (error) {
    console.error(error);
    alert("Erro ao buscar produtos");
    return;
  }

  produtos = data;

  const s1 = document.getElementById("produto1");
  const s2 = document.getElementById("produto2");

  s1.innerHTML = "";
  s2.innerHTML = "";

  produtos.forEach(p => {
    s1.add(new Option(p.nome, p.id));
    s2.add(new Option(p.nome, p.id));
  });
}

// sistema de pontuação
function calcularPontuacao(p){
  let score = 0;

  if(p.gpu.includes("12")) score += 3;
  if(p.gpu.includes("10.3")) score += 2;

  if(p.velocidade_ssd.includes("5.5")) score += 3;
  if(p.velocidade_ssd.includes("2.4")) score += 2;

  if(p.armazenamento.includes("1TB")) score += 2;
  if(p.armazenamento.includes("825")) score += 1;

  if(p.ray_tracing === "Sim") score += 1;

  return score;
}

// comparar
function comparar(){

  const id1 = document.getElementById("produto1").value;
  const id2 = document.getElementById("produto2").value;

  const p1 = produtos.find(p => p.id == id1);
  const p2 = produtos.find(p => p.id == id2);

  if(!p1 || !p2){
    alert("Escolha dois produtos");
    return;
  }

  const score1 = calcularPontuacao(p1);
  const score2 = calcularPontuacao(p2);

  const vencedor =
    score1 > score2 ? p1.nome :
    score2 > score1 ? p2.nome :
    "Empate";

  document.getElementById("resultado").innerHTML = `
    <div class="card-vencedor">
      🏆 ${vencedor}
    </div>

    <table>
      <tr>
        <th>Campo</th>
        <th>${p1.nome}</th>
        <th>${p2.nome}</th>
      </tr>

      <tr>
        <td>CPU</td>
        <td>${p1.cpu}</td>
        <td>${p2.cpu}</td>
      </tr>

      <tr>
        <td>GPU</td>
        <td>${p1.gpu}</td>
        <td>${p2.gpu}</td>
      </tr>

      <tr>
        <td>RAM</td>
        <td>${p1.ram}</td>
        <td>${p2.ram}</td>
      </tr>

      <tr>
        <td>Armazenamento</td>
        <td>${p1.armazenamento}</td>
        <td>${p2.armazenamento}</td>
      </tr>

      <tr>
        <td>SSD</td>
        <td>${p1.velocidade_ssd}</td>
        <td>${p2.velocidade_ssd}</td>
      </tr>

      <tr>
        <td>Ray Tracing</td>
        <td>${p1.ray_tracing}</td>
        <td>${p2.ray_tracing}</td>
      </tr>

      <tr>
        <td>Preço</td>
        <td>R$ ${p1.preco}</td>
        <td>R$ ${p2.preco}</td>
      </tr>

      <tr>
        <td>Pontuação</td>
        <td class="${score1 > score2 ? 'highlight' : ''}">
          ${score1}
        </td>
        <td class="${score2 > score1 ? 'highlight' : ''}">
          ${score2}
        </td>
      </tr>
    </table>
  `;
}

carregarProdutos();
