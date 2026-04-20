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
function calcularPontuacao(p) {
  let gpu = 0;
  let cpu = 0;
  let ssd = 0;
  let armazenamento = 0;
  let recursos = 0;
  let preco = 8;

  // GPU
  if (p.gpu.includes("12")) gpu = 10;
  else if (p.gpu.includes("10.3")) gpu = 8.5;

  // CPU
  if (p.cpu.includes("3.8")) cpu = 9.5;
  else cpu = 9.0;

  // SSD
  if (p.velocidade_ssd.includes("5.5")) ssd = 10;
  else ssd = 8;

  // Armazenamento
  if (p.armazenamento.includes("1TB")) armazenamento = 10;
  else armazenamento = 8;

  // Recursos
  if (p.ray_tracing === "Sim") recursos += 5;
  if (p.drive.includes("Blu")) recursos += 4;
  recursos += 1;

  let nota =
    (gpu * 0.35) +
    (cpu * 0.20) +
    (ssd * 0.15) +
    (armazenamento * 0.10) +
    (recursos * 0.10) +
    (preco * 0.10);

  return nota.toFixed(2);
}

// ======================
// INICIAR
// ======================
window.onload = carregarProdutos;

// TORNA GLOBAL PARA O BOTÃO HTML
window.comparar = comparar;
