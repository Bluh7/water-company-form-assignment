const users = ["e40da6f4-4a5e-4a8f-8156-360393242a8e"];

const checkUser = async () => {
    const user = await cookieStore.get("user");
    const userToken = user?.value;
    
    if (!users.includes(userToken) || !(userToken)) {
        await cookieStore.delete("user");
        window.location.href = "login.html";
        return;
    }
}

checkUser();

const productCodeInput           = document.querySelector('[name="produto_codigo"]');
const productNameInput           = document.querySelector('[name="produto_nome"]');
const productPriceInput          = document.querySelector('[name="produto_preco"]');
const productQuantityInput       = document.querySelector('[name="produto_quantidade"]');
const productCategorySelect      = document.querySelector('[name="produto_categoria"]');
const productManufacturerSelect  = document.querySelector('[name="produto_fabricante"]');
const productDescriptionTextarea = document.querySelector('[name="produto_descricao"]');

const productForm  = document.getElementById("produto-form");

document.getElementById("logout-button").addEventListener("click", async () => { await cookieStore.delete("user"); });

const productCategories    = ["galao", "torneira_registro", "bomba_pressurizador", "filtro_purificador", "torre_bebedouro"];
const productManufacturers = ["brita", "electrolux", "tigre", "lorenzetti", "igua"];

productCodeInput.addEventListener("input", () => {
    productCodeInput.value = productCodeInput.value.replace(/[^0-9]/g, "");
});

productNameInput.addEventListener("input", () => {
    productNameInput.value = productNameInput.value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9 ]/g, "");
});

productPriceInput.addEventListener("input", () => {
  let v = productPriceInput.value;
  v = v.replace(/[^0-9.]/g, "");

  const parts = v.split(".");
  if (parts.length > 2) {
    v = parts.shift() + "." + parts.join("");
  }

  if (v.includes(".")) {
    const [inteiro, dec] = v.split(".");
    v = inteiro + "." + (dec ? dec.slice(0, 2) : "");
  }

  if (v.startsWith(".")) v = "0" + v;

  productPriceInput.value = v;
});

productQuantityInput.addEventListener("input", () => {
    productQuantityInput.value = productQuantityInput.value.replace(/[^0-9]/g, "")
    productQuantityInput.value = productQuantityInput.value.replace(/^0+(?!$)/, "")
});

productForm.addEventListener("submit", e => {
    checkUser();

    const productCode        = productCodeInput.value;
    const productName        = productNameInput.value.trim();
    const productPrice       = productPriceInput.value;
    const productQuantity    = productQuantityInput.value;
    const productDescription = productDescriptionTextarea.value.trim();

    if (!productCode || !productName || !productPrice || !productQuantity || !productDescription) {
        e.preventDefault();
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const productCategory     = productCategorySelect.value;
    const productManufacturer = productManufacturerSelect.value;

    if (!productCategory || !productManufacturer) {
        e.preventDefault();
        alert("Por favor, selecione uma categoria e fabricante.");
        return;
    }

    if (!productCategories.includes(productCategory) || !productManufacturers.includes(productManufacturer)) {
        e.preventDefault();
        alert("Por favor, selecione um fabricante e categoria válidos.");
        return;
    }
});
