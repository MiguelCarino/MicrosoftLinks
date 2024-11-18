fetch('assets/json/solutions.json')
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
            
            // Function to show a notification
            function showNotification(message) {
                const notification = document.createElement('div');
                notification.className = 'notification';
                notification.innerText = message;
                document.body.appendChild(notification);
                notification.style.display = 'block';
                setTimeout(() => {
                    notification.style.display = 'none';
                    document.body.removeChild(notification);
                }, 3000); // Display time of 3 seconds
            }

            // Function to copy text to clipboard
            function copyToClipboard(text) {
                navigator.clipboard.writeText(text).then(function() {
                    showNotification(`${text} has been copied to the clipboard!`);
                }, function(err) {
                    console.error('Could not copy text: ', err);
                });
            }
            category.services.forEach(function(service) {
                var subGridItem = document.createElement('div');
                subGridItem.classList.add('sub-grid-item');
            
                // Create a link for the service name
                var serviceLink = document.createElement('a');
                serviceLink.href = service.link; // Link to the service
                serviceLink.textContent = service.name; // Set the link text to the service name
            
                var serviceIcon = document.createElement('i');
                serviceIcon.className = service.icon;
            
                // Create a new div for the OS icons and apply the .sub-row class
                var osIconsContainer = document.createElement('div');
                osIconsContainer.classList.add('sub-row');
            
                // Create OS icons and add click event listeners
                var serviceWindows = document.createElement('i');
                serviceWindows.className = service.windows || 'fab fa-windows'; // Default to Windows icon if not provided
                serviceWindows.dataset.value = "winget install -e --id " + service.windowscmd; // Set the value to copy from JSON
                if (service.windowscmd) { // Only add click event if windowscmd is present
                    serviceWindows.addEventListener('click', function(event) {
                        event.stopPropagation(); // Prevent the click from bubbling up to the service link
                        copyToClipboard(serviceWindows.dataset.value);
                    });
                } else {
                    serviceWindows.style.display = 'none'; // Hide if no command is provided
                }
            
                var serviceMacos = document.createElement('i');
                serviceMacos.className = service.macos || 'fab fa-apple'; // Default to MacOS icon if not provided
                serviceMacos.dataset.value = "brew install " + service.macoscmd; // Set the value to copy from JSON
                if (service.macoscmd) { // Only add click event if macoscmd is present
                    serviceMacos.addEventListener('click', function(event) {
                        event.stopPropagation(); // Prevent the click from bubbling up to the service link
                        copyToClipboard(serviceMacos.dataset.value);
                    });
                } else {
                    serviceMacos.style.display = 'none'; // Hide if no command is provided
                }

                var serviceDebian = document.createElement('i');
                serviceDebian.className = service.linux || 'fab fa-debian'; // Default to Linux icon if not provided
                serviceDebian.dataset.value = "sudo apt install " + service.linuxapt; // Set the value to copy from JSON
                if (service.linuxapt) { // Only add click event if linuxapt is present
                    serviceDebian.addEventListener('click', function(event) {
                        event.stopPropagation(); // Prevent the click from bubbling up to the service link
                        copyToClipboard(serviceFedora.dataset.value);
                    });
                } else {
                    serviceDebian.style.display = 'none'; // Hide if no command is provided
                }

                var serviceFedora = document.createElement('i');
                serviceFedora.className = service.linux || 'fab fa-fedora'; // Default to Linux icon if not provided
                serviceFedora.dataset.value = "sudo dnf install " + service.linuxdnf; // Set the value to copy from JSON
                if (service.linuxdnf) { // Only add click event if linuxdnf is present
                    serviceFedora.addEventListener('click', function(event) {
                        event.stopPropagation(); // Prevent the click from bubbling up to the service link
                        copyToClipboard(serviceFedora.dataset.value);
                    });
                } else {
                    serviceFedora.style.display = 'none'; // Hide if no command is provided
                }

                var serviceSuse = document.createElement('i');
                serviceSuse.className = service.linux || 'fab fa-suse'; // Default to Linux icon if not provided
                serviceSuse.dataset.value = "sudo zypper install " + service.linuxzyp; // Set the value to copy from JSON
                if (service.linuxzyp) { // Only add click event if linuxzyp is present
                    serviceSuse.addEventListener('click', function(event) {
                        event.stopPropagation(); // Prevent the click from bubbling up to the service link
                        copyToClipboard(serviceSuse.dataset.value);
                    });
                } else {
                    serviceSuse.style.display = 'none'; // Hide if no command is provided
                }

                var serviceRedhat = document.createElement('i');
                serviceRedhat.className = service.linux || 'fab fa-redhat'; // Default to Linux icon if not provided
                serviceRedhat.dataset.value = "sudo dnf install " + service.linuxdnf; // Set the value to copy from JSON
                if (service.linuxdnf) { // Only add click event if linuxdnf is present
                    serviceRedhat.addEventListener('click', function(event) {
                        event.stopPropagation(); // Prevent the click from bubbling up to the service link
                        copyToClipboard(serviceRedhat.dataset.value);
                    });
                } else {
                    serviceRedhat.style.display = 'none'; // Hide if no command is provided
                }

                var serviceFlatpak = document.createElement('i');
                serviceFlatpak.className = service.linux || 'fab fa-linux'; // Default to Linux icon if not provided
                serviceFlatpak.dataset.value = "flatpak install flathub " + service.linuxflatpak; // Set the value to copy from JSON
                if (service.linuxflatpak) { // Only add click event if linuxflatpak is present
                    serviceFlatpak.addEventListener('click', function(event) {
                        event.stopPropagation(); // Prevent the click from bubbling up to the service link
                        copyToClipboard(serviceFlatpak.dataset.value);
                    });
                } else {
                    serviceFlatpak.style.display = 'none'; // Hide if no command is provided
                }
            
                // Append the OS icons to the osIconsContainer
                osIconsContainer.appendChild(serviceWindows);
                osIconsContainer.appendChild(serviceMacos);
                osIconsContainer.appendChild(serviceDebian);
                osIconsContainer.appendChild(serviceFedora);
                osIconsContainer.appendChild(serviceRedhat);
                osIconsContainer.appendChild(serviceSuse);
                osIconsContainer.appendChild(serviceFlatpak);
                
                // Append the service icon to the subGridItem (not part of the link)
                subGridItem.appendChild(serviceIcon);
                
                // Append the service link to the subGridItem
                subGridItem.appendChild(serviceLink);
                
                // Append the osIconsContainer to the subGridItem (not part of the link)
                subGridItem.appendChild(osIconsContainer);
            
                // Append the subGridItem to the subGrid
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
