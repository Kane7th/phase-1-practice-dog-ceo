window.addEventListener("load", () => {
    // Fetching and displaying random dog images
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl)
      .then(response => response.json())  // Parse the response as JSON
      .then(data => {
        const images = data.message;
        const container = document.getElementById("dog-image-container");
  
        images.forEach(imgUrl => {
          const imgElement = document.createElement("img");
          imgElement.src = imgUrl;
          imgElement.alt = "Random Dog Image";
          imgElement.style.width = "200px";
          imgElement.style.margin = "10px";
  
          container.appendChild(imgElement);
        });
      })
      .catch(error => {
        console.error("Error fetching images:", error);
      });
  
    // Fetching and displaying all dog breeds
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const breedList = document.getElementById("dog-breeds");
    const dropdown = document.getElementById("breed-dropdown");
  
    fetch(breedUrl)
      .then(response => response.json())  // Parse the response as JSON
      .then(data => {
        const breeds = data.message;
  
        // Function to render the breeds on the page
        function renderBreeds(filteredBreeds) {
          breedList.innerHTML = "";  // Clear existing list
  
          filteredBreeds.forEach(breed => {
            const breedItem = document.createElement("li");
            breedItem.textContent = breed;
  
            // Add click event to change color of the breed item when clicked
            breedItem.addEventListener("click", () => {
              breedItem.style.color = "blue";  // Change the font color to blue
            });
  
            breedList.appendChild(breedItem);
          });
        }
  
        // Render all breeds initially
        renderBreeds(Object.keys(breeds));
  
        // Filter breeds when a letter is selected from the dropdown
        dropdown.addEventListener("change", () => {
          const selectedLetter = dropdown.value;
          const filteredBreeds = Object.keys(breeds).filter(breed => breed.startsWith(selectedLetter));
          renderBreeds(filteredBreeds);
        });
      })
      .catch(error => {
        console.error("Error fetching breeds:", error);
      });
  });
  