const listItem = document.getElementById("list");
let cars;
let basketItems;
let wishlistItems;
if (localStorage.getItem("cars")) {
  cars = JSON.parse(localStorage.getItem("cars"));
} else {
  cars = [];
  localStorage.setItem("cars", JSON.stringify(cars));
}
if (localStorage.getItem("basketItems")) {
  basketItems = JSON.parse(localStorage.getItem("basketItems"));
} else {
  basketItems = [];
  localStorage.setItem("basketItems", JSON.stringify(basketItems));
}
if (localStorage.getItem("wishlist")) {
  wishlistItems = JSON.parse(localStorage.getItem("wishlist"));
} else {
  wishlistItems = [];
  localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
}
function renderUI(list) {
  let innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    const {
      id,
      brand,
      model,
      ban,
      image,
      fuelCapacity,
      gearBox,
      price,
      discount,
    } = list[i];
    innerHTML += `
        <div class="col-3 mb-5 mt-5">
        <div class="card" style="width: 18rem">
          <img class="card-img-top" height="200px" src="${image}" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">${brand} ${model}</h5>
            <p class="card-text">
              ban: ${ban} <br/>
              fuel Capacity:${fuelCapacity}L <br/>
              gear box: ${gearBox} <br/>
              price: <span class="${
                discount > 0 ? "text-danger text-decoration-line-through" : ""
              }">${price} AZN</span> <br/>
              discount: ${discount} % <br/>
             ${
               discount > 0
                 ? `Discounted Price: ${price - (price * discount) / 100} AZN`
                 : "Endirim yoxdur"
             }
            </p>
            <button class="btn btn-danger" onclick="deleteHandler(${id})">Delete</button>
            <button class="btn btn-info" onclick="addToWishlist(${id})"><i class="fa-solid fa-heart ${
      checkWishlistItem(id) ? "wishlist-item" : ""
    }"></i></button>
            <button class="btn btn-secondary" onclick="addToBasket(${id})">Add To Basket</button>
          </div>
        </div>
      </div>`;
  }
  listItem.innerHTML = innerHTML;
}

const checkWishlistItem = (id) => {
  const target = wishlistItems.find((item) => item.id == id);
  if (target) {
    return true;
  } else {
    return false;
  }
};
const deleteHandler = (id) => {
  const target = cars.find((car) => car.id == id);
  const indexOfTarget = cars.indexOf(target);
  cars.splice(indexOfTarget, 1);
  localStorage.setItem("cars", JSON.stringify(cars));
  renderUI(cars);
};
const addToWishlist = (id) => {
  const target = cars.find((car) => car.id == id);
  const wishlistTarget = wishlistItems.find((item) => item.id == id);
  if (!wishlistTarget) {
    Toastify({
      text: "Item Wishliste elave olundu",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
    wishlistItems.push(target);
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    checkWishlistItem(id);
    renderUI(cars);
  } else {
    Toastify({
      text: "Item wishlistden silindi",
      className: "danger",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
    let indexOfTarget = wishlistItems.indexOf(wishlistTarget);
    wishlistItems.splice(indexOfTarget, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    renderUI(cars);
  }
};
function addToBasket(id) {
  let basketItem = basketItems.find((x) => x.item.id == id);
  if (!basketItem) {
    Toastify({
        text: "Item baskete add olundu",
        className: "danger",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    let target = cars.find((car) => car.id == id);
    let newBasketItem = {
      item: target,
      count: 1,
      totalPrice: target.price - (target.price * target.discount) / 100,
    };
    basketItems.push(newBasketItem);
    localStorage.setItem("basketItems", JSON.stringify(basketItems));
  } else {
    Toastify({
        text: "Item baskete add olundu",
        className: "danger",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    basketItem.count++;
    basketItem.totalPrice = basketItem.count * (basketItem.item.price -(basketItem.item.price * basketItem.item.discount) / 100);
    localStorage.setItem("basketItems", JSON.stringify(basketItems));
  }
}
renderUI(cars);
console.log(cars);
