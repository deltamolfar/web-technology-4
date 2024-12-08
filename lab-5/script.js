document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const homeLink = document.getElementById("home-link");
    const catalogLink = document.getElementById("catalog-link");

    // Load Home
    homeLink.addEventListener("click", (e) => {
        e.preventDefault();
        content.innerHTML = `
            <h1>Welcome to the Catalog</h1>
            <p>Choose a category from the catalog above.</p>`;
    });

    // Load Catalog
    catalogLink.addEventListener("click", async (e) => {
        e.preventDefault();
        const categories = await fetchJSON("categories.json");
        content.innerHTML = "<h1>Catalog</h1>";
        categories.categories.forEach((category) => {
            const categoryDiv = document.createElement("div");
            categoryDiv.className = "category";
            categoryDiv.innerHTML = `
                <h2>${category.name}</h2>
                <p>${category.notes || ""}</p>
                <a href="#" data-category="${category.shortname}">View Items</a>`;
            content.appendChild(categoryDiv);
        });

        // Add "Specials" link
        const specialsDiv = document.createElement("div");
        specialsDiv.innerHTML = `
            <a href="#" id="specials-link">View Specials</a>`;
        content.appendChild(specialsDiv);

        // Add event listeners for categories
        document.querySelectorAll("[data-category]").forEach((link) =>
            link.addEventListener("click", (e) => {
                e.preventDefault();
                loadCategory(link.dataset.category);
            })
        );

        // Add event listener for "Specials" link
        document.getElementById("specials-link").addEventListener("click", (e) => {
            e.preventDefault();
            const randomCategory = categories.categories[Math.floor(Math.random() * categories.categories.length)];
            loadCategory(randomCategory.shortname);
        });
    });

    // Load Category Items
    async function loadCategory(categoryShortname) {
        const category = await fetchJSON(`${categoryShortname}.json`);
        content.innerHTML = `<h1>${category.categoryName}</h1>`;
        category.items.forEach((item) => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "item";
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Price: $${item.price}</p>
                <p>${item.notes}</p>`;
            content.appendChild(itemDiv);
        });
    }

    // Fetch JSON Utility
    async function fetchJSON(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}`);
        return await response.json();
    }
});