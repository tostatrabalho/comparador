// CONFIGURAÇÃO
const supabaseUrl = "https://hkqtbzydqcydyvtdgcph.supabase.co";
const supabaseKey = "sb_publishable_mKQCqS9aczIfZ7IU-zhDjQ_hUVJw80B";

// cria o client (APENAS UMA VEZ)
const client = window.supabase.createClient(supabaseUrl, supabaseKey);

let produtos = [];

// carregar produtos
async function carregarProdutos() {
  console.log("Buscando produtos...");

  const { data, error } = await client
    .from("produtos")
    .select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    alert("Erro ao buscar dados! Veja o console (F12).");
    return;
  }

  if (!data || data.length === 0) {
    alert("Nenhum produto encontrado!");
    return;
  }

  produtos = data;

  const select1 = document.getElementById("produto1");
  const select2 = document.getElementById("produto2");

  select1.innerHTML = "";
  select2.innerHTML = "";

  produtos.forEach(p => {
    select1.add(new Option(p.nome, p.id));
    select2.add(new Option(p.nome, p.id));
  });

  console.log("Produtos carregados!");
}

// comparar
function comparar() {
  const id1 = document.getElementById("produto1").value;
  const id2 = document.getElementById("produto2").value;

  const p1 = produtos.find(p => p.id == id1);
  const p2 = produtos.find(p => p.id == id2);

  if (!p1 || !p2) {
    alert("Selecione dois produtos!");
    return;
  }

  document.getElementById("resultado").innerHTML = `
    <table border="1">
      <tr>
        <th>Campo</th>
        <th>${p1.nome}</th>
        <th>${p2.nome}</th>
      </tr>
      <tr>
        <td>RAM</td>
        <td>${p1.ram}</td>
        <td>${p2.ram}</td>
      </tr>
      <tr>
        <td>CPU</td>
        <td>${p1.cpu}</td>
        <td>${p2.cpu}</td>
      </tr>
      <tr>
        <td>Preço</td>
        <td>${p1.preco}</td>
        <td>${p2.preco}</td>
      </tr>
    </table>
  `;
}

// iniciar
carregarProdutos();