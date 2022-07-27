// tạo lớp đối tượng Product
class Product {
  constructor(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
  }
}

// Cần call API để lấy danh sách sản phẩm và hiển thị ra giao diện

mains();
function mains() {
  // B1: Gọi API lấy danh sách sản phẩm
  apiGetProduct().then(function (result) {
    // Tạo biến teachers nhận kết quả trả về từ API
    var products = result.data;
    // console.log(products);
    // duyệt mảng data và tìm danh sách sản phẩm
    for (var i = 0; i < products.length; i++) {
      var product = products[i];
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
    // console.log(products);
    // Gọi hàm display để hiển thị danh sách sản phẩm ra giao diện
    display(products);
  });
}
function display(products) {
  let html = "";
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    html += `
        <div class="col-3">
            <div class="styleImg" >
              <img src="${product.img}" alt="" />
            </div>
            <div class="text">
              <p>${product.name}</p>
              <h1>${product.desc}</h1>
              <div  class="purchase">
                <p>${product.price}</p>
                <button onclick ="addCart('${product.id}')" >Add</button>
              </div>
              </div>  
        </div>
          `;
    // console.log(product);
  }
  // DOM tới thẻ div và innerHTML bằng biến html
  // console.log(html);
  document.getElementById("dsProduct").innerHTML = html;
}

class Cart {
  constructor(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc,
    (this.type = type), (this.quatity = 1);
  }
  calcPrice() {
    return this.price * this.quatity;
  }
}
class Cartz {
  constructor(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
    quatity
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc,
    (this.type = type), (this.quatity = quatity);
  }
  calcPrice() {
    return this.price * this.quatity;
  }
}

let Carts = [];

init();
function init() {
  // Khi lấy data từ localStorage lên, nếu data là array/object (đã bị stringify) thì cần dùng hàm JSON.parse để chuyển data về lại array/object
  Carts = JSON.parse(localStorage.getItem("Carts")) || [];
  // totalQua = localStorage.getItem("totalQua")
  // localStorage.setItem("totalQua", JSON.stringify(totalQua));
  
  for (let i = 0; i < Carts.length; i++) {
    let cart = Carts[i];
    Carts[i] = new Cartz(
      cart.id,
      cart.name,
      cart.price,
      cart.screen,
      cart.backCamera,
      cart.frontCamera,
      cart.img,
      cart.desc,
      cart.type,
      cart.quatity
    );
  }
  disPlaycard(Carts)
  
}
function addCart(productId) {
  apiGetProductdetail(productId).then(function (result) {
    const proDuct = result.data;
    console.log( proDuct.name);
    const cardItem = new Cart(
     proDuct.id,
     proDuct.name,
     proDuct.price,
     proDuct.screen,
     proDuct.backCamera,
     proDuct.frontCamera,
     proDuct.img,
     proDuct.desc,
     proDuct.type
      );
      
      
    // console.log(typeof productId);
    // Carts.push(cardItem)
    for (var i = 0; i < Carts.length; i++) {
      if (productId === Carts[i].id) {
        Carts[i].quatity++;
        localStorage.setItem("Carts", JSON.stringify(Carts));
        disPlaycard(Carts);
        return;
      }
    }
    Carts.push(cardItem);

    // Lưu biến product xuống local storage
    localStorage.setItem("Carts", JSON.stringify(Carts));

    console.log(Carts);

    // console.log(typeof Carts[0].quatity);
    // console.log(Carts[0])
    disPlaycard(Carts);
  });
}

function disPlaycard(Carts) {
  console.log(Carts);
  let totalMoney = 0;
  let totalQua = 0;
  let html = "";
  for (var i = 0; i < Carts.length; i++) {
    const product = Carts[i];
    totalMoney += product.calcPrice();
    totalQua += product.quatity;
    html += ` <div >
    <div class="cart-item">
      <div class="cart-img">
        <img src="${product.img}" alt="" />
      </div>
      <strong class="name">${product.name}</strong>
      <span class="qty-change">
        <div class="qty">
          <button onclick="downQl('${product.id}')" class="btn-qty">
            <i class="fas fa-chevron-left"></i>
          </button>
          <p class="qti">${product.quatity}</p>
          <button onclick="upQl('${product.id}')" class="btn-qty">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </span>
      <p class="price">${product.calcPrice()}</p>
      <button onclick = "deleteProduct('${product.id}')" >
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>`;
  }
  
  // localStorage.setItem("totalQua", JSON.stringify(totalQua));
  document.getElementById("cart-itemzzz").innerHTML = html;
  
  document.getElementById("totalMoney").innerHTML = `Total: ${totalMoney}`;
  // var totAl = localStorage.getItem("totalQua")
  
  document.getElementById("total-qtys").innerHTML = totalQua;
  document.getElementById("totalMoneys").innerHTML = `$ ${totalMoney}`;
  // localStorage.setItem("totalQua", JSON.stringify(totalQua));
  
  // init(totalQua)
  // // Khi lấy data từ localStorage lên, nếu data là array/object (đã bị stringify) thì cần dùng hàm JSON.parse để chuyển data về lại array/object
  // students = JSON.parse(localStorage.getItem("Carts")) || [];
}

function upQl(productId) {
  for (let i = 0; i < Carts.length; i++) {
    if (productId === Carts[i].id) {
      Carts[i].quatity++;
      // var sOs= Carts[i].quatity
    }
  }
  localStorage.setItem("Carts", JSON.stringify(Carts));
  disPlaycard(Carts);
}
function downQl(productId) {
  for (let i = 0; i < Carts.length; i++) {
    if (productId === Carts[i].id) {
      Carts[i].quatity--;
    }
    if (Carts[i].quatity === 0) {
      var index = findIndex(productId);
      // console.log(index);
      if (index !== -1) {
        Carts.splice(index, 1);
      }
    }
  }
  localStorage.setItem("Carts", JSON.stringify(Carts));
  disPlaycard(Carts);
}

// tìm ra vị trí id của product trong mảng Carts
function findIndex(productId) {
  let index = -1;
  for (let i = 0; i < Carts.length; i++) {
    if (Carts[i].id === productId) {
      index = i;
      break;
    }
  }
  return index;
}

// xóa product trong giỏ hàng
function deleteProduct(productId) {
  let index = findIndex(productId);
  console.log(index);
  if (index !== -1) {
    Carts.splice(index, 1);
  }
  // Lưu biến students xuống local storage
  localStorage.setItem("Carts", JSON.stringify(Carts));
  disPlaycard(Carts);
}

// đưa giỏ hàng về mảng rỗng
function clearCart() {
  Carts = [];
  localStorage.setItem("Carts", JSON.stringify(Carts));
  disPlaycard(Carts);
}
