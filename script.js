const supabaseUrl = "https://hkqtbzydqcydyvtdgcph.supabase.co"; 
const supabaseKey = "sb_publishable_mKQCqS9aczIfZ7IU-zhDjQ_hUVJw80B";

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);

let produtos = [];

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

    if (!select1 || !select2) {
      console.error("Selects não encontrados");
      return;
    }

    select1.innerHTML = "";
    select2.innerHTML = "";

    data.forEach(produto => {
      let option1 = document.createElement("option");
      option1.value = produto.id;
      option1.textContent = produto.nome;

      let option2 = document.createElement("option");
      option2.value = produto.id;
      option2.textContent = produto.nome;

      select1.appendChild(option1);
      select2.appendChild(option2);
    });

  } catch (erro) {
    console.error("Erro real:", erro);
  }
}

window.onload = carregarProdutos;
