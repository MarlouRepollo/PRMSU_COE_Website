document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("nav-toggle");
    const navigation = document.querySelector(".navigation");
    const navClose = document.querySelector(".nav_close");

    // Check if the window is in mobile view
    function openMenu() {
        navigation.classList.add("active"); // Show navigation
        navToggle.classList.add("show-icon"); // Show close icon
    }

    function closeMenu() {
        navigation.classList.remove("active"); // Hide navigation
        navToggle.classList.remove("show-icon"); // Show burger icon
    }

    // Toggle the menu on burger click
    navToggle.addEventListener("click", function () {
        if (navigation.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Handle dropdown toggle in mobile view
    const navLinks = document.querySelectorAll(".navigation ul li > a");
    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            const dropdown = this.nextElementSibling;
            if (dropdown && isMobileView()) {
                event.preventDefault();
                dropdown.classList.toggle("active");
            }
        });
    });

    // Close menu when a dropdown link is clicked
    const dropdownLinks = document.querySelectorAll(".navigation ul li .dropdown li a");
    dropdownLinks.forEach((link) => {
        link.addEventListener("click", function () {
            if (isMobileView()) {
                closeMenu();
            }
        });
    });

    // Reset menu state on window resize
    window.addEventListener("resize", function () {
        if (!isMobileView()) {
            closeMenu(); // Ensure menu is closed in desktop view
        }
    });

    // Optional: Add a resize event listener to handle window resizing
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Remove active class if window is resized above mobile view
            navigation.classList.remove("active");
            navToggle.classList.remove("show-icon");
        }
    });

    // Toggle search bar visibility when the search icon is clicked
    document.querySelector(".search-container i").addEventListener("click", function() {
        const searchBar = document.getElementById("search-bar");
        searchBar.classList.toggle("active");
        searchBar.focus(); // Automatically focus on the input when it is shown
    });

    // --- New Search Logic ---
    const searchBar = document.getElementById("search-bar");
    const searchOutput = document.createElement("div");
    searchOutput.classList.add("search-output");
    document.querySelector(".search-container").appendChild(searchOutput);

    // Handle search bar visibility and focusing
    searchBar.addEventListener("input", function() {
        const query = searchBar.value.toLowerCase();
        if (query.length > 0) {
            searchOutput.style.display = "block"; // Show the output box
            searchResults(query);  // Filter and display the results
        } else {
            searchOutput.style.display = "none"; // Hide the output box when the input is empty
        }
    });

    // Get all visible text content on the website
    function getAllVisibleText() {
        const elementsToSearch = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, span, li');
        let allText = [];
        elementsToSearch.forEach((element) => {
            if (element.innerText.trim() !== '') {
                allText.push({
                    text: element.innerText.trim(),
                    link: element.closest('a') ? element.closest('a').href : null
                });
            }
        });
        return allText;
    }

    // Function to search for matching words and show them
    function searchResults(query) {
        const resultItems = [];
        const allText = getAllVisibleText();

        allText.forEach((item) => {
            if (item.text.toLowerCase().includes(query)) {
                resultItems.push(item);
            }
        });

        // Clear previous results
        searchOutput.innerHTML = "";

        // If no results found, show a message
        if (resultItems.length === 0) {
            const noResult = document.createElement("div");
            noResult.classList.add("result-item");
            noResult.textContent = "No results found.";
            searchOutput.appendChild(noResult);
        }

        // Display the result items
        resultItems.forEach((resultItem) => {
            const resultDiv = document.createElement("div");
            resultDiv.classList.add("result-item");
            resultDiv.textContent = resultItem.text;

            // Add a click listener to navigate to the link if available
            resultDiv.addEventListener("click", function() {
                if (resultItem.link) {
                    window.location.href = resultItem.link; // Navigate to the found link
                }
            });

            searchOutput.appendChild(resultDiv);
        });
    }
});
