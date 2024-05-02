document.addEventListener("DOMContentLoaded", (event) => {
  insertHeaderElement();

  insertFooterElement();
});

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
        <div id="menu"><a href="/about">About</a><a href="/submit">Submit</a></div>
      </nav>
    </header>
  `;

  const body = document.querySelector("body");
  body.insertAdjacentHTML("afterbegin", headerHTML);
}

function insertFooterElement() {
  const footerHTML = `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-logo">
          <a href="https://www.stanford.edu">Stanford<br>University</a>
        </div>
        <div class="footer-links">
          <nav aria-label="global footer menu">
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
