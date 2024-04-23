const listItem = document.getElementById("list");
let wishlistItems;
let cars;

if (localStorage.getItem("wishlist")) {
  wishlistItems = JSON.parse(localStorage.getItem("wishlist"));
} else {
  wishlistItems = [];
  localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
}
if (localStorage.getItem("cars")) {
  cars = JSON.parse(localStorage.getItem("cars"));
} else {
  cars = [];
  localStorage.setItem("cars", JSON.stringify(cars));
}
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
    renderUI(wishlistItems);
  } else {
    let indexOfTarget = wishlistItems.indexOf(wishlistTarget);
    wishlistItems.splice(indexOfTarget, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    renderUI(wishlistItems);
  }
};
const checkWishlistItem = (id) => {
  const target = wishlistItems.find((item) => item.id == id);
  if (target) {
    return true;
  } else {
    return false;
  }
};
function renderUI(list) {
  console.log(list.length);
  if (list.length < 1) {
    listItem.innerHTML = "<h1>Wishlistde item yoxdur</h1>";
  } else {
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
                    discount > 0
                      ? "text-danger text-decoration-line-through"
                      : ""
                  }">${price} AZN</span> <br/>
                  discount: ${discount} % <br/>
                 ${
                   discount > 0
                     ? `Discounted Price: ${
                         price - (price * discount) / 100
                       } AZN`
                     : "Endirim yoxdur"
                 }
                </p>
                <button class="btn btn-info" onclick="addToWishlist(${id})"><i class="fa-solid fa-heart ${
        checkWishlistItem(id) ? "wishlist-item" : ""
      }"></i></button>
               
              </div>
            </div>
          </div>`;
    }
    listItem.innerHTML = innerHTML;
  }
}
const removeFromWishlist = (id) => {
  const target = wishlistItems.find((car) => car.id == id);
  const indexOfTarget = wishlistItems.indexOf(target);
  wishlistItems.splice(indexOfTarget, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  renderUI(wishlistItems);
};
renderUI(wishlistItems);
