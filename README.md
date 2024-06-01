# Anthology Assets

This repository contains the styles and scripts for the CESTA Digital Anthology project.
The Anthology website and the quarto template uses the assets from this repository for styles and scripts. The assets are served using jsDelivr CDN.

## JS Deliver CDN Links

The links for the assets served by jsDelivr CDN are as follows:

- Main Stylesheet: `https://cdn.jsdelivr.net/gh/cesta-online/anthology-assets@latest/css/style.css`
- Quarto Stylesheet: `https://cdn.jsdelivr.net/gh/cesta-online/anthology-assets@latest/css/style-quarto.css`
- Scripts: `https://cdn.jsdelivr.net/gh/cesta-online/anthology-assets@latest/js/script.js`

## Updating JSDelivr CDN to serve the latest assets

- To update the assets served by jsDelivr CDN, push the changes to the `main` branch of this repository.
- Create a [new release](https://github.com/cesta-online/anthology-assets/releases) in the repository with the updated assets.
- Use the Purge CDN Cache Tool in jsDelivr to serve the latest assets. The link to purge cache is [https://www.jsdelivr.com/tools/purge](https://www.jsdelivr.com/tools/purge)
- Enter the following urls and purge the cache to deliver the latest assets.

  ```
  https://cdn.jsdelivr.net/gh/cesta-online/anthology-assets@latest/css/style.css
  https://cdn.jsdelivr.net/gh/cesta-online/anthology-assets@latest/css/style-quarto.css
  https://cdn.jsdelivr.net/gh/cesta-online/anthology-assets@latest/js/script.js
  ```
