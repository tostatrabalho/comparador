const supabaseUrl = "https://hkqtbzydqcydyvtdgcph.supabase.co";
const supabaseKey = "sb_publishable_mKQCqS9aczIfZ7IU-zhDjQ_hUVJw80B";

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);

let produtos = [];

// ======================
// CARREGAR PRODUTOS
// ======================
async function carregarProdutos() {
  try {
    const { data, error } = await client
      .from("produtos")
      .select("*");

    if (error) throw error;

    console.log("Produtos:", data);

    produtos = data;

    const select1 = document.getElementById("produto1");
    const select2 = document.getElementById("produto2");

    select1.innerHTML = "";
    select2.innerHTML = "";

    data.forEach(produto => {
      const option1 = document.createElement("option");
      option1.value = produto.id;
      option1.textContent = produto.nome;

      const option2 = document.createElement("option");
      option2.value = produto.id;
      option2.textContent = produto.nome;

      select1.appendChild(option1);
      select2.appendChild(option2);
    });

  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
  }
}

// ======================
// PONTUAÇÃO
// ======================
// ======================
// COMPARAR
// ======================
function comparar() {

  const id1 = document.getElementById("produto1").value;
  const id2 = document.getElementById("produto2").value;

  const p1 = produtos.find(p => p.id == id1);
  const p2 = produtos.find(p => p.id == id2);

  if (!p1 || !p2) {
    alert("Selecione dois produtos.");
    return;
  }

  const score1 = calcularPontuacao(p1);
  const score2 = calcularPontuacao(p2);

  let vencedor = "Empate";

  if (score1 > score2) vencedor = p1.nome;
  if (score2 > score1) vencedor = p2.nome;

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
        <td>Preço</td>
        <td>R$ ${p1.preco}</td>
        <td>R$ ${p2.preco}</td>
      </tr>

      <tr>
        <td>⭐ Nota</td>
        <td>${score1}</td>
        <td>${score2}</td>
      </tr>
    </table>
  `;
}

// ======================
// INICIAR
// ======================
window.onload = carregarProdutos;

// TORNA GLOBAL PARA O BOTÃO HTML
window.comparar = comparar;
