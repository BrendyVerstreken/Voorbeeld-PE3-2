"use strict";

window.addEventListener("load", Initialise);

// Globale variabelen
var selectChampionClass;
var leagueChampionsJson;
var shopingCart = [];

function Initialise() {
  // Inlezen DOM elementen

  // Toevoegen Eventlisteners


  // Functies
  makeSelectionPage();
}

// Globale functies

function makeSelectionPage() {
  let body = document.querySelector("body");
  body.innerHTML = "";
  makeHeader();
  selectCards();
}

function makeHeader() {
  let body = document.querySelector("body");
  let header = document.createElement("header");
  let title = document.createElement("h1");

  title.innerHTML = "Champion Shop";

  let shoppingcontainer = document.createElement("div");
  shoppingcontainer.id = "shoppingcart";

  makeShoppingCart(shoppingcontainer)

  header.appendChild(shoppingcontainer)
  header.appendChild(title);
  header.appendChild(makeForm());
  body.appendChild(header);
  addEventListenerFilter();

}

function makeForm() {
  let form = document.createElement("form");
  form.innerHTML = "Category";

  let select = document.createElement("select");


  let optionAny = document.createElement("option");
  optionAny.value = "Any";
  optionAny.innerHTML = "Any";
  let optionBattlemage = document.createElement("option");
  optionBattlemage.value = "Battlemage";
  optionBattlemage.innerHTML = "Battlemage";
  let optionMarksman = document.createElement("option");
  optionMarksman.value = "Marksman";
  optionMarksman.innerHTML = "Marksman";
  let optionVanguard = document.createElement("option");
  optionVanguard.value = "Vanguard";
  optionVanguard.innerHTML = "Vanguard";
  select.name = "Category";
  select.id = "Category";


  select.appendChild(optionAny);
  select.appendChild(optionBattlemage);
  select.appendChild(optionMarksman);
  select.appendChild(optionVanguard);
  form.appendChild(select);

  return form;
}


function makeShoppingCart(shoppingcontainer) {
  let shoppingicon = document.createElement("img");
  shoppingcontainer.innerHTML = "";
  shoppingicon.src = "../img/Shoppingcart.png";
  shoppingicon.alt = "shoppingcart";
  shoppingcontainer.addEventListener("click", completeOrder);
  shoppingcontainer.appendChild(shoppingicon);
}

function completeOrder() {
  if (document.getElementById("shoppingcart").querySelector("p") !== null) {
    let body = document.querySelector("body");
    body.innerHTML = "";
    showOrder();
  }
}

function showOrder() {


  createOrderPage();
}

function createOrderPage() {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = "";

  let goBack = document.createElement("button");
  goBack.innerHTML = "Back"
  goBack.addEventListener("click", makeSelectionPage);


  body.appendChild(goBack);

  let tbl = document.createElement('table');
  let tr = document.createElement("tr");
  let totalpriceP = document.createElement("strong");
  tbl.style.width = '100%';
  tbl.setAttribute('border', '1');
  let thName = document.createElement("th");
  let thDescription = document.createElement("th");
  let thAmount = document.createElement("th");
  let thPrice = document.createElement("th");
  thName.innerHTML = "Product";
  thDescription.innerHTML = "Description";
  thAmount.innerHTML = "Amount";
  thPrice.innerHTML = "Price";

  tr.appendChild(thName);
  tr.appendChild(thDescription);
  tr.appendChild(thAmount);
  tr.appendChild(thPrice);
  tbl.appendChild(tr);
  let totalPrice = 0;
  for (let i = 0; i < shopingCart.length; i++) {
    tr = document.createElement("tr");
    let tdName = document.createElement("td");
    let tdDescription = document.createElement("td");
    tdDescription.id = "Description";
    let tdAmount = document.createElement("td");
    let tdPrice = document.createElement("td");
    let tdButtons = document.createElement("td")
    let buyOne = document.createElement("button");
    let deleteOne = document.createElement("button");
    let deleteAll = document.createElement("button");

    buyOne.innerHTML = "Buy One";
    deleteOne.innerHTML = "Delete One";
    deleteAll.innerHTML = "Delete All";
    tdName.innerHTML = shopingCart[i].name;
    tdDescription.innerHTML = shopingCart[i].description;
    tdAmount.innerHTML = shopingCart[i].amount;
    tdPrice.innerHTML = "€ " + Math.round((shopingCart[i].price * shopingCart[i].amount) * 100) / 100;
    totalPrice += shopingCart[i].price * shopingCart[i].amount;

    buyOne.addEventListener("click", function () { deleteOrder(shopingCart[i].name, -1) });
    deleteOne.addEventListener("click", function () { deleteOrder(shopingCart[i].name, 1) });
    deleteAll.addEventListener("click", function () { deleteOrder(shopingCart[i].name, shopingCart[i].amount) });

    tr.appendChild(tdName);
    tr.appendChild(tdDescription);
    tr.appendChild(tdAmount);
    tr.appendChild(tdPrice);
    tdButtons.appendChild(buyOne);
    tdButtons.appendChild(deleteOne);
    tdButtons.appendChild(deleteAll);
    tr.appendChild(tdButtons);
    tbl.appendChild(tr);
  }

  body.appendChild(tbl);
  totalpriceP.innerHTML = "Total price: € " + Math.round(totalPrice * 100) / 100;
  body.appendChild(totalpriceP)
}

function deleteOrder(championName, amountToDelete) {

  switch (amountToDelete) {
    case -1:
      for (let item in shopingCart) {
        if (shopingCart[item].name == championName) {
          shopingCart[item].amount += 1;
          createOrderPage();
        }
      }
      break;

    case 1:


      for (let item in shopingCart) {
        if (shopingCart[item].amount != 1) {
          if (shopingCart[item].name == championName) {
            shopingCart[item].amount -= 1;
            createOrderPage();
          }
        } else {
          if (shopingCart[item].name == championName) {
            shopingCart.splice(item, 1);
            createOrderPage();

          }
        }
      }

      break;

    default:
      for (let item in shopingCart) {
        if (shopingCart[item].name == championName) {
          shopingCart.splice(item, 1);
          createOrderPage();
        }
      }
      break;
  }


}


// function addEventListenerFilter() {
//   let selectChampionClass = document.getElementById("Category");
//   selectChampionClass.addEventListener("change", function () 
//   { fetchJson("https://howest-gp-wfa.github.io/st-2021-1-S2-a-wfa-pe03-NajiseyedhosseinzadehShahin/api/leagueChampions.json"
//   , selectChampionClass.value) });
// }
// function fetchJson(json, filter) {
//   fetch(json).then(function (resp) {
//     return resp.json();
//   }).then(function (data) {
//     selectCards(data, filter);
//   });
// }


function selectCards(leagueChampionsJson, filter) {

  if (leagueChampionsJson == undefined) {
    fetchJson("https://howest-gp-wfa.github.io/st-2021-1-S2-a-wfa-pe03-NajiseyedhosseinzadehShahin/api/leagueChampions.json");
  }
  deleteContainer();
  let container = document.createElement("main");

  if (filter === "Any" || filter === undefined) {
    for (let championClass in leagueChampionsJson) {
      for (let champion of leagueChampionsJson[championClass]) {
        makeCard(championClass, champion, container)
      }
    }
  } else {


    for (let championClass in leagueChampionsJson) {
      for (let champion of leagueChampionsJson[championClass].filter(function () {
        return championClass === filter
      })) {
        makeCard(championClass, champion, container)
      }
    }

  }
}

function deleteContainer() {
  if (document.querySelector("main") != null) {
    let container = document.querySelector("main");
    container.remove();
  }

}

function makeCard(championClass, champion, container) {
  let body = document.querySelector("body");

  let card = document.createElement("div");
  let cardImage = document.createElement("img");
  let cardTitle = document.createElement("h3");
  let cardCategory = document.createElement("h4");
  let cardPrice = document.createElement("h4");
  let cardButton = document.createElement("button");
  let amountInput = document.createElement("input");
  let amountLabel = document.createElement("label");
  let amountBought = document.createElement("h4");

  card.className = "card " + championClass;


  cardTitle.innerHTML = champion.name;
  cardCategory.innerHTML = championClass;
  cardImage.src = champion.Images[0];
  cardPrice.innerHTML = "€ " + champion.price;
  cardButton.innerHTML = "In Shopingcart";
  cardButton.className = "float-right";
  cardButton.addEventListener("click", function () { buyChampion(amountBought, champion, amountInput.value) });
  cardImage.addEventListener("click", function () { changeChampionPicture(champion, cardImage) });


  amountInput.type = "number";
  amountInput.name = "amount";
  amountInput.className = "amount";
  amountLabel.setAttribute("for", "amount")
  amountLabel.innerHTML = "Amount";

  checkIfBought(amountBought, champion);

  card.appendChild(amountBought);
  card.appendChild(cardImage);
  card.appendChild(cardTitle);
  card.appendChild(cardButton);
  card.appendChild(cardCategory);
  card.appendChild(cardPrice);
  card.appendChild(amountInput);
  card.appendChild(amountLabel);
  container.appendChild(card);
  body.appendChild(container);
}

function changeChampionPicture(champion, image) {
  if (image.src == champion.Images[0]) {
    image.src = champion.Images[1];
  } else {
    image.src = champion.Images[0];
  }
}

function checkIfBought(boughtElement, champion) {
  for (let item in shopingCart) {
    if (champion.name == shopingCart[item].name) {
      boughtElement.className = "amountBought";
      boughtElement.innerHTML = shopingCart[item].amount;
    }
  }
  changeAmountInShoppingcart();
}

function buyChampion(boughtElement, champion, amountBought) {
  if (isNaN(amountBought) == false && amountBought >= 1) {
    shopingCart.push(
      {
        name: champion.name,
        description: champion.description,
        amount: parseInt(amountBought),
        price: Math.round(parseFloat(champion.price) * 100) / 100
      }
    )
    for (let item in shopingCart) {
      if (getOccurrenceChampion(shopingCart[item].name) >= 2) {
        shopingCart.pop();
        shopingCart[item].amount += parseInt(amountBought);
      }
    }
    checkIfBought(boughtElement, champion);
  } else {
    buyChampion(boughtElement, champion, 1);
  }
  changeAmountInShoppingcart();
}

function changeAmountInShoppingcart() {
  let amountShoppingcart = 0;

  for (let item in shopingCart) {
    amountShoppingcart += shopingCart[item].amount;
  }
  if (amountShoppingcart >= 1) {
    makeShoppingCart(document.getElementById("shoppingcart"));
    let cartAmount = document.createElement("p");

    cartAmount.innerHTML = amountShoppingcart;

    document.getElementById("shoppingcart").prepend(cartAmount);
  }
}

//Gets occurrence of a champion in array shoppingcart
function getOccurrenceChampion(name) {
  let occurrence = 0;
  for (let item in shopingCart) {
    if (shopingCart[item].name == name) {
      occurrence++;
    }
  }
  return occurrence;
}