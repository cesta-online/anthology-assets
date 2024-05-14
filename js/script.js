document.addEventListener("DOMContentLoaded", (event) => {
  insertHeaderElement();
  setupMobileMenuToggle();
  insertFooterElement();
});

function setupMobileMenuToggle() {
  const menuButton = document.querySelector("#mobile-menu-btn button");
  const mobileMenu = document.querySelector("#mobile-menu");

  menuButton.addEventListener("click", () => {
    if (mobileMenu.style.maxHeight) {
      mobileMenu.style.maxHeight = null;
    } else {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
    }
  });
}

function insertHeaderElement() {
  const headerHTML = `
    <header class="header">
      <div id="stanford-band">
        <a href="https://www.stanford.edu" target="_blank">Stanford University</a>
      </div>
      <div id="cesta-band">
        <a href="https://cesta.stanford.edu" target="_blank"><span id="cesta-logo-container"><span id="stanford-type">Stanford</span><span id="cesta-expansion">Center for Spatial and Textual Analysis </span></span></a>
      </div>
      <nav>
        <div><a href="/">CESTA Research Anthology</a></div>
        <div>
          <div id="menu">
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/submit">Submit</a></li>
            </ul>
          </div>
          <div id="mobile-menu-btn">
            <button>
              <svg height="32px" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2 s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2 S29.104,22,28,22z"/></svg>
            </button>
          </div>
          
        </div>
      </nav>
      <div id="mobile-menu" class="hidden"></div>
    </header>
  `;

  const body = document.querySelector("body");
  body.insertAdjacentHTML("afterbegin", headerHTML);

  // Clone the menu items and append to mobile-menu
  const menuItems = document.querySelector("#menu ul").cloneNode(true);
  const mobileMenu = document.querySelector("#mobile-menu");
  mobileMenu.appendChild(menuItems);
}

function insertFooterElement() {
  const footerHTML = `
    <footer class="footer">
      <div class="cesta-footer">
        <div class="cesta-footer-img-container">
          <img src="assets/remote/imgs/cesta_logo.png" />
        </div>
        <div class="cesta-footer-text-container">
          <p>CESTA is committed to shaping future humanities research and teaching through openness to new digital technologies, scholarly questions and collaborative opportunities.</p>
        </div>
      </div>
      <div class="footer-container">
        <div class="footer-logo">
          <a href="https://www.stanford.edu">Stanford<br>University</a>
        </div>
        <div class="footer-links">
          <nav aria-label="global footer menu" class="footer-menu">
            <ul class="links-list">
              <li>
                <a href="https://www.stanford.edu">Stanford Home</a>
              </li>
              <li>
                <a href="https://visit.stanford.edu/plan/">Maps & Directions</a>
              </li>
              <li>
                <a href="https://www.stanford.edu/search/">Search Stanford</a>
              </li>
              <li>
                <a href="https://emergency.stanford.edu">Emergency Info</a>
              </li>
            </ul>
            <ul class="links-list-secondary">
              <li>
                <a href="https://www.stanford.edu/site/terms/" title="Terms of use for sites">Terms of Use</a>
              </li>
              <li>
                <a href="https://www.stanford.edu/site/privacy/" title="Privacy and cookie policy">Privacy</a>
              </li>
              <li>
                <a href="https://uit.stanford.edu/security/copyright-infringement" title="Report alleged copyright infringement">Copyright</a>
              </li>
              <li>
                <a href="https://adminguide.stanford.edu/chapter-1/subchapter-5/policy-1-5-4" title="Ownership and use of Stanford trademarks and images">Trademarks</a>
              </li>
              <li>
                <a href="https://studentservices.stanford.edu/more-resources/student-policies/non-academic/non-discrimination" title="Non-discrimination policy">Non-Discrimination</a>
              </li>
              <li>
                <a href="https://www.stanford.edu/site/accessibility" title="Report web accessibility issues">Accessibility</a>
              </li>
            </ul>
          </nav>
          <div class="footer-text">
            <span>© Stanford University. Stanford, California 94305.</span>
          </div>
        </div>
      </div>
    </footer>
  `;

  const body = document.querySelector("body");
  body.insertAdjacentHTML("beforeend", footerHTML);
}

function navigationListing(containerSelector, jsonFilePath) {
  fetch(jsonFilePath)
    .then((response) => response.json())
    .then((data) => {
      const containerElement = document.querySelector(containerSelector);
      data.forEach((item) => {
        const listItem = document.createElement("a");
        listItem.setAttribute("href", item.link);
        listItem.classList.add("list-item-link");
        listItem.innerHTML = `
        <div class="list-item-container">
          <div class="list-item-text-container">
            <h2 class="list-item-heading">${item.title}</h2>
            <p class="list-item-description">${item.description}</p>
          </div>
          ${
            item.img
              ? `<div class="list-item-img-container">
              <img src="${item.img}" alt="${item.title}"></img>
              </div>`
              : ""
          }
        </div>
        `;
        containerElement.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error:", error));
}
