const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookMarkForm = document.getElementById("bookmark-form");
const websiteNameEL = document.getElementById("website-name");
const websiteNameURLEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");
const addBookmark = document.getElementById("add-bookmark");

let bookmarks = {};

//open modal
addBookmark.addEventListener("click", () => {
  modal.classList.add("show-modal");
  websiteNameEL.focus();
});
//close modal
modalClose.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});
//removes modal when clicked outside
window.addEventListener("click", (e) => {
  e.target === modal ? modal.classList.remove("show-modal") : false;
});

//check if data is valid
function validate(nameValue, urlValue) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert("Please submit values for both fields");
    return false;
  }
  if (!urlValue.match(regex)) {
    alert("Please provide a valid web address");
    return false;
  }
  //valid submit
  return true;
}

//building bookmarks in dom
function buildBookmarks() {
  bookmarksContainer.textContent = "";

  Object.keys(bookmarks).forEach((id) => {
    //remove all bookmarks elements
    const { name, url } = bookmarks[id];
    //item
    const item = document.createElement("div");
    item.classList.add("item");
    //close icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times-circle");
    // closeIcon.innerHTML = `Remove`;
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark ("${url}")`);
    //favicon/link container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    //favicon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "favicon");
    //Link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    //append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

//retrieve bookmarks
function fetchBookmarks() {
  //get bookmarks from local storage if available
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    const id = "MDN Docs";
    bookmarks[id] = [
      {
        name: "MDN Docs",
        url: "https://developer.mozilla.org/en-US/docs/Learn",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

//Delete BookMark
function deleteBookmark(id) {
  if (bookmarks[id]) {
    delete bookmarks[id];
  }
  //update bookmarks array in local storage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

//handle data from forum
function storeBookMark(e) {
  e.preventDefault();
  const nameValue = websiteNameEL.value;
  let urlValue = websiteNameURLEl.value;
  if (!urlValue.includes("http://", "https://")) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  //   Object.entries(obj).forEach;

  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks[urlValue] = bookmark;

  //   console.log(bookmarks[urlValue].url);

  //   if (localStorage.getItem("name") === websiteNameEL.value) {
  //     console.log("new item added");
  //   }

  //   if (localStorage.getItem("bookmarks") === null) {
  //     console.log(``);
  //   }

  if (localStorage.getItem("bookmarks") !== null) {
    console.log(`name exists`);
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookMarkForm.reset();
  websiteNameEL.focus();
}

bookMarkForm.addEventListener("submit", storeBookMark);

//on load, fetch bookmarks
fetchBookmarks();

// 888888888
// console.log(bookmarks[urlValue].name);

//   if (localStorage.getItem("name") === null) {
//     localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
//     console.log("new item added");
//     if (!localStorage.getItem("name") !== null) {
//       console.log("item available");
//     }
//   }
// 888888888
