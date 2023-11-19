let arrItem = [];
let arrTabPane = [];
let arrNav = [];

function getDataJson() {
  axios({
    method: "GET",
    url: "../data/Data.json",
    responseType: "json",
  })
    .then((result) => {
      arrItem = result.data;
      arrTabPane = result.data.tabPanes;
      arrNav = result.data.navPills;
      renderDataNav(arrNav);
      renderDataItem(arrTabPane);
      renderDataItem(filterByType(arrTabPane, "topclothes"));
    })
    .catch((error) => console.log(error));
}

function renderDataNav(arr) {
  const tabWidth = 140; // Set your desired width for each tab
  const content = arr
    .map(
      (nav_item, index) => `
        <li onclick="renderFilter('${nav_item.type}')" class="nav_item col ${
        index === 0 ? "active" : ""
      }" style="border: 1px solid ${getBorderColor(
        nav_item.type
      )}; width: ${tabWidth}px;">
          <a class="nav-link" data-toggle="pill" href="#tabContentDenger" style="white-space: nowrap;">
            ${nav_item.showName}
          </a>
        </li>`
    )
    .join("");
  document.querySelector(".nav-pills").innerHTML = content;
}

function getBorderColor(type) {
  // Define border colors based on the tab type
  const borderColorMap = {
    topclothes: "red",
    botclothes: "green",
    shoes: "blue",
    handbags: "orange",
    necklaces: "purple",
    hairstyle: "pink",
    background: "gray",
  };

  return borderColorMap[type] || "black"; // Default to black if no match
}

function renderDataItem(arr) {
  const content = arr
    .map(
      (item_product) => `
        <div class="col-md-3 tab_detail">
          <div class="item" data-item-id="tab_item_1">
            <img src="${item_product.imgSrc_jpg}" alt="" />
            <h3>${item_product.name}</h3>
            <button onclick="renderBody('${item_product.type}','${item_product.imgSrc_png}')">Thử đồ</button>
          </div>
        </div>`
    )
    .join("");
  document.getElementById("topClothesItems").innerHTML = content;
}

function filterByType(arr, type) {
  return arr.filter((item) => item.type === type);
}

function renderFilter(type) {
  renderDataItem(filterByType(arrTabPane, type));
}

function renderBody(type, imgpng) {
  const elements = {
    topclothes: ".bikinitop",
    botclothes: ".bikinibottom",
    shoes: ".feet",
    handbags: ".handbag",
    necklaces: ".necklace",
    hairstyle: ".hairstyle",
    background: ".background",
  };

  const element = document
    .querySelector(".contain")
    .querySelector(elements[type]);

  // Remove existing content
  element.innerHTML = "";

  if (type === "background") {
    element.style.backgroundImage = `url(${imgpng})`;
    element.style.backgroundSize = "cover";
    element.style.backgroundPosition = "center";
  } else if (type === "hairstyle") {
    element.innerHTML = `<img style="width: 1500px; height: 1650px; padding-bottom: 150px; padding-right: 370px;" src="${imgpng}" alt="" />`;
  } else {
    const imgElement = document.createElement("img");
    imgElement.src = imgpng;

    const style = `width: ${type === "topclothes" ? 250 : 500}px; height: ${
      type === "topclothes" ? 500 : 1000
    }px;`;

    if (type === "botclothes") {
      // chỉnh position cho quần
      imgElement.style.cssText = `${style} backgroundSize: cover; backgroundPosition: center; width: 250px; height: 500px`;
    } else {
      // For other tabs, use the regular styling
      imgElement.style.cssText = style;
    }

    // Append the new img element
    element.appendChild(imgElement);
  }
}

getDataJson();
