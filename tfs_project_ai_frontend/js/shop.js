class Shop {
  apiBaseUrl = "https://ai-project.technative.dev.f90.co.uk";
  apiTeam = "handyman";
  defaultSort = "title";
  searchDelayMs = 350;
  pageSize = 3;
  currentPage = 1;
  allProducts = [];

  constructor() {
    this.searchContainer = document.querySelector(".search");
    if (this.searchContainer) {
      this.searchInput = this.searchContainer.querySelector(".search__input");
      this.searchButton = this.searchContainer.querySelector(".search__submit");
      this.searchResultCount = this.searchContainer.querySelector(
        ".search__result-count"
      );
      this.loading = this.searchContainer.querySelector(".search__loading");
      this.searchTimeout = null;

      this.productsContainer = document.querySelector(".products");
      this.productsList =
        this.productsContainer.querySelector(".products__list");
      this.showMoreButton = this.productsContainer.querySelector(
        ".products__show-more .button"
      );
    }
  }

  init() {
    if (!this.searchContainer) return;
    this.searchInput.addEventListener("input", (e) => this.checkInput(e));
    this.searchInput.addEventListener("input", (e) => this.searchOnType(e));
    this.searchButton.addEventListener("click", (e) => this.search(e));
    this.showMoreButton.addEventListener("click", (e) => this.showMore(e));
    this.checkInput();
    this.search();
  }

  checkInput() {
    this.searchButton.disabled = this.searchInput.value.length === 0;
  }

  searchOnType(event) {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.search(event);
    }, this.searchDelayMs);
  }

  async search(e) {
    if (e) e.preventDefault();

    this.loading.classList.add("is-loading");
    this.productsContainer.classList.remove("is-shown");
    this.searchResultCount.textContent = "";
    this.currentPage = 1;
    this.allProducts = [];

    while (this.productsList.firstChild) {
      this.productsList.removeChild(this.productsList.lastChild);
    }

    try {
      // Real API call (replaces the previous mock JSON fetch)
      const searchTerm = this.searchInput.value.trim();
      const params = new URLSearchParams();
      if (searchTerm.length > 0) {
        params.set("query", searchTerm);
      }
      params.set("sort", this.defaultSort);
      // Builds: https://ai-project.technative.dev.f90.co.uk/products/{team}?query=...&sort=...
      const url = `${this.apiBaseUrl}/products/${this.apiTeam}?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      this.processProducts(json);
    } catch (error) {
      console.error(error.message);
    } finally {
      this.loading.classList.remove("is-loading");
    }
  }

  processProducts(data) {
    const products = Array.isArray(data?.products) ? data.products : [];
    this.allProducts = products;

    this.searchResultCount.textContent = `${products.length} products found`;

    if (products.length > 0) {
      this.productsContainer.classList.add("is-shown");
    } else {
      this.productsContainer.classList.remove("is-shown");
    }

    this.renderPage();
  }

  renderPage() {
    const visibleCount = this.currentPage * this.pageSize;
    const visibleProducts = this.allProducts.slice(0, visibleCount);

    this.productsList.innerHTML = "";
    visibleProducts.forEach((product) => {
      const productsItem = document.createElement("div");
      productsItem.classList.add("products__item");
      this.productsList.appendChild(productsItem);

      const productsItemImage = document.createElement("img");
      productsItemImage.classList.add("products__item-image");
      const imagePath = product.image || "";
      productsItemImage.src = imagePath.startsWith("http")
        ? imagePath
        : `${this.apiBaseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
      productsItem.appendChild(productsItemImage);

      const productsItemTitle = document.createElement("h3");
      productsItemTitle.classList.add("products__item-title");
      productsItemTitle.textContent = product.title;
      productsItem.appendChild(productsItemTitle);

      const productsItemDescription = document.createElement("p");
      productsItemDescription.classList.add("products__item-description");
      productsItemDescription.textContent = product.description;
      productsItem.appendChild(productsItemDescription);

      const productsItemStars = document.createElement("p");
      productsItemStars.classList.add("products__item-stars");
      productsItemStars.textContent = "⭐".repeat(product.stars);
      productsItem.appendChild(productsItemStars);

      const productsItemPrice = document.createElement("p");
      productsItemPrice.classList.add("products__item-price");
      productsItemPrice.textContent = product.price;
      productsItem.appendChild(productsItemPrice);
    });

    if (visibleCount >= this.allProducts.length) {
      this.showMoreButton.parentElement.classList.remove("is-shown");
    } else {
      this.showMoreButton.parentElement.classList.add("is-shown");
    }
  }

  showMore(event) {
    event.preventDefault();
    this.currentPage += 1;
    this.renderPage();
  }
}

// Expose an instance of the 'Shop' class
export default new Shop();
