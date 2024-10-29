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
        toAppend.innerHTML += `
        <div class="dataContainer">
      <img src="1.jpg" alt="Uploaded Image"/>
              <div class="data-info">
                  <h1 style="color: white;">${infos.service_type} <br></h1> <h4>by ${infos.username}</h4>
                  <h3 style="color: white;">₹ ${infos.price}</h3>
                  <p style="color: white;"><strong>Address:</strong> ${infos.city}</p>
                  <p style="color: white;"><strong>Contact No:</strong> ${infos.contact_phone}</p>
                  <p style="color: white;"><strong>Description:</strong> ${infos.bio}</p>
                    <h2 style="color: white;"><br></h2>
        <div class="btn">  <button onclick="handleBook()">Book</button></div>
              </div>
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
alert("Booking Success .");

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