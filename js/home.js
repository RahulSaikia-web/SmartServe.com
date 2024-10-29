const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')

  closeAllSubMenus()
}

function toggleSubMenu(button){

  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
  }

  button.nextElementSibling.classList.toggle('show')
  button.classList.toggle('rotate')

  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
  }
}

function closeAllSubMenus(){
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}


//Fetch information from database ( Start)
let serviceProvider = [];
let toAppend = document.getElementById("dataContainer"); // Make sure this matches your HTML element ID


  // Initial display of all entries
  displayEntries();
function displayEntries() {
  fetch("") // Replace 'YOUR_API_URL_HERE' with your actual API endpoint
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((json) => {
        serviceProvider = json;

      // Clear previous content (if any)
      toAppend.innerHTML = "";

      // Append provider information
      for (let infos of serviceProvider) {
        toAppend.innerHTML += ` <div id="dataContainer" class="dataContainer">
          
          <img src="${infos.img}" alt="Uploaded Image" />
          <div class="data-info">
            <h1>${infos.role}</h1>
            <h4>By ${infos.name}</h4>
            <p style="color: black"><strong>E-mail:</strong>${infos.email}</p>
            <p style="color: black"><strong>PinCode:</strong> ${infos.pincode}</p>
            <p style="color: black"><strong>Availability:</strong>${infos.is_available}</p>
            <button onclick="handleBook()">Book</button>
          </div>
          <div class="btn"></div>
        </div>
`;

      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}


  // Search functionality
  searchInput.addEventListener('input', function() {
      const keyword = searchInput.value.trim().toLowerCase();

      // Get all data entries
      const entries = container.querySelectorAll('.data-entry');

      entries.forEach(entry => {
          const service = entry.querySelector('h1').textContent.toLowerCase();
          const username = entry.querySelector('h4').textContent.toLowerCase();
          const address = entry.querySelector('p').textContent.toLowerCase(); // Get the address from the first <p> tag

          // Check if any field contains the keyword
          if (
              service.includes(keyword) ||
              username.includes(keyword) ||
              address.includes(keyword) // Match keyword in address
          ) {
              entry.classList.remove('hidden'); // Show matching entry
          } else {
              entry.classList.add('hidden'); // Hide non-matching entry
          }
      });
  });
function handleBook(){
alert("Booking Success .");// Disable the button
const button = document.getElementById("bookButton");
button.disabled = true;

// Re-enable the button after 5 minutes (300,000 milliseconds)
setTimeout(() => {
    button.disabled = false;
}, 300000); // 5 minutes
}
 // Function to filter entries based on search and selected filters
 function filterEntries() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedFilter = filterOptions.value;
  const priceOption = nestedFilterPrice.value;
  const availabilityOption = nestedFilterAvailability.value;
  const ratingOption = nestedFilterRating.value;

  let filteredEntries = formDataArray;

  // Filter by search keyword
  filteredEntries = filteredEntries.filter(entry => {
    const service = entry.service.toLowerCase();
    const username = entry.username.toLowerCase();
    const address = entry.address.toLowerCase();

    return (
      service.includes(keyword) ||
      username.includes(keyword) ||
      address.includes(keyword
      ));
  });

  // Apply additional filters
  if (selectedFilter === 'price' && priceOption) {
    if (priceOption === 'lowToHighPrice') {
      filteredEntries.sort((a, b) => a.price - b.price);
    } else if (priceOption === 'highToLowPrice') {
      filteredEntries.sort((a, b) => b.price - a.price);
    }
  }

  if (selectedFilter === 'availability' && availabilityOption) {
    filteredEntries = filteredEntries.filter(entry => entry.availability === availabilityOption);
  }

  if (selectedFilter === 'rating' && ratingOption) {
    if (ratingOption === 'lowToHighRating') {
      filteredEntries.sort((a, b) => a.ratings - b.ratings);
    } else if (ratingOption === 'highToLowRating') {
      filteredEntries.sort((a, b) => b.ratings - a.ratings);
    }
  }

  displayEntries(filteredEntries); // Display filtered entries
}

// Initial display of all entries
displayEntries(formDataArray);

// Search functionality
searchInput.addEventListener('input', filterEntries);

// Dropdown filter logic
filterOptions.addEventListener('change', function () {
  // Hide all nested filters initially
  const nestedFilters = document.querySelectorAll('.nested-filter');
  nestedFilters.forEach(filter => filter.classList.add('hidden'));

  // Show the relevant nested filter based on the selected option
  if (this.value === 'price') {
    nestedFilterPrice.classList.remove('hidden');
  } else if (this.value === 'availability') {
    nestedFilterAvailability.classList.remove('hidden');
  } else if (this.value === 'rating') {
    nestedFilterRating.classList.remove('hidden');
  }

  // Call filterEntries when the filter is changed
  filterEntries()

// Nested filter options change events
nestedFilterPrice.addEventListener('change', filterEntries);
nestedFilterAvailability.addEventListener('change', filterEntries);
nestedFilterRating.addEventListener('change', filterEntries);
});
 // Function to filter entries based on search and selected filters
 function filterEntries() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedFilter = filterOptions.value;
  const priceOption = nestedFilterPrice.value;
  const availabilityOption = nestedFilterAvailability.value;
  const ratingOption = nestedFilterRating.value;

  let filteredEntries = formDataArray;

  // Filter by search keyword
  filteredEntries = filteredEntries.filter(entry => {
    const service = entry.service.toLowerCase();
    const username = entry.username.toLowerCase();
    const address = entry.address.toLowerCase();

    return (
      service.includes(keyword) ||
      username.includes(keyword) ||
      address.includes(keyword
      ));
  });

  // Apply additional filters
  if (selectedFilter === 'price' && priceOption) {
    if (priceOption === 'lowToHighPrice') {
      filteredEntries.sort((a, b) => a.price - b.price);
    } else if (priceOption === 'highToLowPrice') {
      filteredEntries.sort((a, b) => b.price - a.price);
    }
  }

  if (selectedFilter === 'availability' && availabilityOption) {
    filteredEntries = filteredEntries.filter(entry => entry.availability === availabilityOption);
  }

  if (selectedFilter === 'rating' && ratingOption) {
    if (ratingOption === 'lowToHighRating') {
      filteredEntries.sort((a, b) => a.ratings - b.ratings);
    } else if (ratingOption === 'highToLowRating') {
      filteredEntries.sort((a, b) => b.ratings - a.ratings);
    }
  }

  displayEntries(filteredEntries); // Display filtered entries
}

// Initial display of all entries
displayEntries(formDataArray);

// Search functionality
searchInput.addEventListener('input', filterEntries);

// Dropdown filter logic
filterOptions.addEventListener('change', function () {
  // Hide all nested filters initially
  const nestedFilters = document.querySelectorAll('.nested-filter');
  nestedFilters.forEach(filter => filter.classList.add('hidden'));

  // Show the relevant nested filter based on the selected option
  if (this.value === 'price') {
    nestedFilters.classList.remove('hidden');
  } else if (this.value === 'availability') {
    nestedFilterAvailability.classList.remove('hidden');
  } else if (this.value === 'rating') {
    nestedFilterRating.classList.remove('hidden');
  }

  // Call filterEntries when the filter is changed
  filterEntries();
});

// Nested filter options change events
nestedFilterPrice.addEventListener('change', filterEntries);
nestedFilterAvailability.addEventListener('change', filterEntries);
nestedFilterRating.addEventListener('change', filterEntries);