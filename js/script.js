document.addEventListener("DOMContentLoaded", (event) => {
  insertHeaderElement();
  insertTOCElement().then(() => {
    generateTOC(), makeTOCSticky();
  });
  insertFooterElement();
  createBreadcrumb();
});

function insertTOCElement() {
  return new Promise((resolve, reject) => {
    try {
      // Create a new table-of-contents element
      var toc = document.createElement("table-of-contents");
      toc.innerHTML = `
      <h5>Contents</h5>
      <div class="toc-contents"></div>
      `;

      // Get the main element and the first article element
      var main = document.querySelector("main");
      var article = document.querySelector("article");

      // Insert the table-of-contents before the first article
      if (article) {
        article.prepend(toc);
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function generateTOC() {
  const toc = document.querySelector(".toc-contents");
  const article = document.querySelector("article");
  const tags = ["sub-article-title", "h1", "h2", "h3"];
  const selectors = tags.join(", ");
  let headings = Array.from(article.querySelectorAll(selectors));
  let activeId = null;

  const addActiveClass = (id) => {
    if (activeId) {
      const activeTocLink = toc.querySelector(`[href="#${activeId}"]`);
      if (activeTocLink) {
        activeTocLink.classList.remove("active-toc-item");
      }
    }

    const tocLink = toc.querySelector(`[href="#${id}"]`);
    if (tocLink) {
      tocLink.classList.add("active-toc-item");
    }

    activeId = id;
  };

  const ul = document.createElement("ul"); // Single ul for all li
  toc.appendChild(ul);

  headings.forEach((heading, index) => {
    const id = `heading-${index}`;
    heading.setAttribute("id", id);

    const li = document.createElement("li");
    const tocLink = document.createElement("a");
    tocLink.setAttribute("href", `#${id}`);
    tocLink.textContent = heading.textContent;
    li.appendChild(tocLink);

    const tagIndex = tags.indexOf(heading.tagName.toLowerCase());

    // Add a class to the li to indicate its level
    li.className = `level-${tagIndex + 1}`;

    ul.appendChild(li); // Append all li to the single ul
  });

  // Add active class to the first heading initially
  addActiveClass("heading-0");

  window.addEventListener("scroll", () => {
    let topHeading = null;

    headings.forEach((heading, index) => {
      const bounding = heading.getBoundingClientRect();

      if (
        bounding.top >= 0 &&
        (topHeading === null ||
          bounding.top < topHeading.getBoundingClientRect().top)
      ) {
        topHeading = heading;
      }
    });

    if (topHeading) {
      addActiveClass(topHeading.getAttribute("id"));
    }
  });
}

function makeTOCSticky() {
  window.onscroll = function () {
    var toc = document.querySelector("table-of-contents");
    if (window.scrollY > 100) {
      // change 100 to the point you want it to stick
      toc.classList.add("sticky");
    } else {
      toc.classList.remove("sticky");
    }
  };
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

function createBreadcrumb() {
  const article = document.querySelector("article");
  if (!article) return;

  const pageTitle = document.querySelector("article-title").textContent;
  const urlParts = window.location.pathname.split("/").filter((part) => part);
  let breadcrumb = '<a href="/" class="breadcrumb-home">Home</a>';

  let currentPath = "";
  urlParts.forEach((part, index) => {
    currentPath += "/" + part;
    if (index < urlParts.length - 1) {
      const words = part.split(/[^a-zA-Z0-9]/g);
      const branch = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      breadcrumb += ` <span class="breadcrumb-separator">></span> <a href="${currentPath}" class="breadcrumb-link">${branch}</a>`;
    }
  });

  breadcrumb += ` <span class="breadcrumb-separator">></span> <span class="breadcrumb-title">${pageTitle}</span>`;

  const breadcrumbElement = document.createElement("div");
  breadcrumbElement.className = "breadcrumb";
  breadcrumbElement.innerHTML = breadcrumb;
  article.parentNode.insertBefore(breadcrumbElement, article);
}
