const brandInp = document.getElementById("brand");
const modelInp = document.getElementById("model");
const banInp = document.getElementById("ban");
const imageInp = document.getElementById("image");
const fuelCapacityInp = document.getElementById("fuelCapacity");
const gearBoxInp = document.getElementById("gearBox");
const priceInp = document.getElementById("price");
const discountInp = document.getElementById("discount");
const submitBtn = document.getElementById("submitBtn");
const addForm = document.getElementById("add-form");
let cars;
let id;
if (localStorage.getItem("cars")) {
  cars = JSON.parse(localStorage.getItem("cars"));
} else {
  cars = [];
  localStorage.setItem("cars", JSON.stringify(cars));
}
if (localStorage.getItem("id")) {
  id = parseInt(localStorage.getItem("id"));
} else {
  id = 0;
  localStorage.setItem("id", JSON.stringify(id));
}
class Cars {
  constructor(
    brand,
    model,
    ban,
    image,
    fuelCapacity,
    gearBox,
    price,
    discount
  ) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.ban = ban;
    this.image = image;
    this.fuelCapacity = fuelCapacity;
    this.gearBox = gearBox;
    this.discount = discount;
    this.price = price;
    id++;
    localStorage.setItem("id", id);
  }
}
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const {
    brandVal,
    modelVal,
    banVal,
    imageVal,
    fuelCapacityVal,
    gearBoxVal,
    discountVal,
    priceVal,
  } = getDataFromForm();
  let newCar = new Cars(
    brandVal,
    modelVal,
    banVal,
    imageVal,
    fuelCapacityVal,
    gearBoxVal,
    priceVal,
    discountVal
  );
  cars.push(newCar);
  localStorage.setItem("cars", JSON.stringify(cars));
  resetForm();
});

function getDataFromForm() {
  let brandVal = brandInp.value;
  let modelVal = modelInp.value;
  let banVal = banInp.value;
  let imageVal = imageInp.value;
  let fuelCapacityVal = fuelCapacityInp.value;
  let gearBoxVal = gearBoxInp.value;
  let discountVal = discountInp.value;
  let priceVal = priceInp.value;
  return {
    brandVal,
    modelVal,
    banVal,
    imageVal,
    fuelCapacityVal,
    gearBoxVal,
    discountVal,
    priceVal,
  };
}
function resetForm() {
  brandInp.value = "";
  modelInp.value = "";
  banInp.value = "";
  imageInp.value = "";
  fuelCapacityInp.value = "";
  gearBoxInp.value = "";
  (discountInp.value = ""), (priceInp.value = "");
}
