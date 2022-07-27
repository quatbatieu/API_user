function findMay() {
  // console.log(idmay);
  apiGetProduct().then(function (result) {
    let products = result.data;
    // console.log(products);
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      products[i] = new Product(
        product.id,
        product.name,
        product.price,
        product.screen,
        product.backCamera,
        product.frontCamera,
        product.img,
        product.desc,
        product.type
      );
    }
    displays(products);
  });
}

function displays(products) {
  const idmay = document.getElementById("Find").value;
  let html = "";
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    if (product.type === idmay) {
      html += `
          <div class="col-3">
              <div class="styleImg" >
                <img src="${product.img}" alt="" />
              </div>
              <div class="text">
                <p>${product.name}</p>
                <h1>${product.desc}</h1>
                <div class="purchase">
                  <p>${product.price}</p>
                  <button onclick ="addCart('${product.id}')" >Add</button>
                </div>
                </div>  
          </div>
            `;
    } else if (idmay === "abc") {
      html += `
      <div class="col-3">
          <div class="styleImg" >
            <img src="${product.img}" alt="" />
          </div>
          <div class="text">
            <p>${product.name}</p>
            <h1>${product.desc}</h1>
            <div class="purchase">
              <p>${product.price}</p>
              <button onclick ="addCart('${product.id}')" >Add</button>
            </div>
            </div>  
      </div>
        `;
    }

    //   console.log(product);
  }
  // DOM tới thẻ div và innerHTML bằng biến html
  // console.log(html);
  document.getElementById("dsProduct").innerHTML = html;
}
function cart() {
  document.getElementById("access").style.display = "block";
}

function closecard() {
  document.getElementById("access").style.display = "none";
}
function closebuy() {
  if (Carts.length === 0) {
    return;
  }
  document.getElementById("access").style.display = "none";
}
function openid() {
  if (Carts.length === 0) {
    return;
  }
  document.getElementById("inclue").style.display = "block";
}
function closeid() {
  document.getElementById("inclue").style.display = "none";
}
