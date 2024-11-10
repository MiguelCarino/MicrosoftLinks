fetch('assets/json/main.json')
    .then(response => response.json())
    .then(data => {
        const categories = data; // Assign the parsed JSON data to the `categories` variable

        var allServices = categories.reduce((acc, category) => acc.concat(category.services), []);
        var mainGrid = document.getElementById('main-grid');
        var buttonRow = document.getElementById('button-row');
        var categoryTitle = document.getElementById('category-title');
        var searchInput = document.getElementById('search-input');
        var activeButton = null;

        function createButton(category, index) {
            var button = document.createElement('button');
            button.textContent = category.title;
            button.addEventListener('click', function() {
                showCategory(index);
                highlightButton(button);
                // Clear search when a category is clicked
                searchInput.value = '';
                updateURL(null);
            });
            return button;
        }

        function highlightButton(button) {
            if (activeButton) {
                activeButton.classList.remove('active');
            }
            button.classList.add('active');
            activeButton = button;
        }

        function showCategory(index, services = null) {
            mainGrid.innerHTML = '';
            var category = index === -1 ? { title: 'All Links', services: services || allServices } : categories[index];
            categoryTitle.textContent = category.title;
            var subGrid = document.createElement('div');
            subGrid.classList.add('sub-grid');

            category.services.forEach(function(service) {
                var subGridItem = document.createElement('div');
                subGridItem.classList.add('sub-grid-item');

                var serviceLink = document.createElement('a');
                serviceLink.href = service.link;

                var serviceIcon = document.createElement('i');
                serviceIcon.className = service.icon;

                var serviceName = document.createElement('p');
                serviceName.textContent = service.name;

                serviceLink.appendChild(serviceIcon);
                serviceLink.appendChild(serviceName);
                subGridItem.appendChild(serviceLink);
                subGrid.appendChild(subGridItem);
            });

            mainGrid.appendChild(subGrid);
        }

        function filterLinks(query) {
            var seen = new Set();
            var filteredServices = allServices.filter(function(service) {
                if (seen.has(service.link)) return false;
                seen.add(service.link);
                return service.value.toLowerCase().includes(query.toLowerCase());
            });
            showCategory(-1, filteredServices);
            updateURL(query);
        }

        function updateURL(query) {
            const url = new URL(window.location);
            if (query) {
                url.searchParams.set('search', query);
            } else {
                url.searchParams.delete('search');
            }
            window.history.replaceState({}, '', url);
        }

        function loadInitialSearch() {
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('search');
            if (searchQuery) {
                searchInput.value = searchQuery;
                filterLinks(searchQuery);
            }
        }

        // Show the Basic category by default
        categories.forEach(function(category, index) {
            var button = createButton(category, index);
            buttonRow.appendChild(button);
            if (index === 0) {
                highlightButton(button);
            }
        });

        searchInput.addEventListener('input', function() {
            filterLinks(searchInput.value);
        });

        // Ensure the grid is displayed first, then apply the search if needed
        showCategory(0);
        loadInitialSearch();
    })
    .catch(error => console.error('Error loading or parsing main.json:', error));
