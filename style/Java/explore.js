/*explore page popup window*/
const destinations = {
  uae: {
    name: "UAE",
    continent:"ASIA",
    description: "Looking for a modern destination? United Arab Emirates offers luxury cities,desert adventures,and iconic skycrapers",
    attractions: ["Dubai Mall", "Burj Khalifa", "Palm Jumeirah","Sheik Zayed Grand Mosque"],
    cost: { budget: "$700", standard: "$1500", luxury: "$3000" }
  },

  france: {
    name: "France",
    continent:"EUROPE",
    description: "Looking for romance and culture? France is Famous for art, fashion, and landmarks like the Eiffel Tower.",
    attractions: ["Eiffel Tower", "Louvre Museum", "Nice Beach","Palace of versailles"],
    cost: { budget: "$900", standard: "$1800", luxury: "$3500" }
  },

  malaysia: {
    name: "Malaysia",
    continent:"ASIA",
    description: "Looking for diversity? Malaysia blends with vibrant cities,rainforests and beautiful beaches",
    attractions: ["Petronas Towers", "Langkawi", "Penang","Batu Caves"],
    cost: { budget: "$500", standard: "$1000", luxury: "$2000" }
  },

  maldives: {
    name: "Maldives",
    continent:"ASIA",
    description: "looking for tropical escape? Maldives is known for crystal-clear water and luxury island resorts.",
    attractions: ["Resorts", "Snorkeling", "Beaches","Banana reef","Maafushi"],
    cost: { budget: "$1000", standard: "$2000", luxury: "$5000" }
  },


switzerland: {
    name: "Switzerland",
    continent:"EUROPE",
    description: "Looking for scenic beauty? Switzerland offers snowy alps,lakes and peaceful villages.",
    attractions: ["Matterhorn", "lake geneva", "jungfraujoch"],
    cost: { budget: "$1000", standard: "$2000", luxury: "$5000" }
  },



germany: {
    name: "Germany",
    continent:"EUROPE",
    description: "Looking for histroy and innovation? Germany combines rich heritage with modern cities.",
    attractions: ["Bandenburg gate", "Neuschwanstein Castle", "Cologne cathedral"],
    cost: { budget: "$1000", standard: "$2000", luxury: "$5000" }
  },


italy: {
    name: "Italy",
    continent:"EUROPE",
    description: "Looking for art and cuisine? Italy is famous for for its history,architecture and delicious food.",
    attractions: ["colosseum", "leaning tower of pisa", "venice Canals"],
    cost: { budget: "$1000", standard: "$3000", luxury: "$4000" }
  },


santorini: {
    name: "Santorini",
    continent:"EUROPE",
    description: "Looking for a dreamy island? Santorini is known for white buildings and stunning sunsets.",
    attractions: ["Oia village", "Fira", "Red beach"],
    cost: { budget: "$2000", standard: "$3000", luxury: "$4000" }
  },


australia: {
    name: "Australia",
    continent:"AUSTRALIA",
    description: "Looking for adventure? Australia offers beaches,wildlife and vibrant cities.",
    attractions: ["Sydney opera house", "Great barrier reef", "uluru","Bondi beach"],
    cost: { budget: "$2500", standard: "$3000", luxury: "$5200" }
  },


canada: {
    name: "Canada",
    continent:"NORTH AMERICA",
    description: "Looking for nature and space? Canada is known for vast landscapes,mountains and friendly cities.",
    attractions: ["Niagra Falls", "banff National park", "CN tower"],
    cost: { budget: "$2000", standard: "$4000", luxury: "$5000" }
  }




};

 function openModal(key) {
  const data = destinations[key];

  if (!data) return; // prevents error

  document.getElementById("modal-title").textContent = data.name;
  document.getElementById("modal-description").textContent = data.description;

  const list = document.getElementById("modal-attractions");
list.innerHTML = "";
data.attractions.forEach(item => {
  const li = document.createElement("li");
  li.textContent = item;
  list.appendChild(li);
});

const costTable = document.getElementById("modal-cost");
costTable.innerHTML = "";
for (let type in data.cost) {
  costTable.innerHTML += `<tr><td>${type}</td><td>${data.cost[type]}</td></tr>`;
}

document.getElementById("modal-continent").textContent = data.continent || "";

  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}








 /*************************EXPLORE PAGE PLACEHOLDERS******************************/

document.addEventListener("DOMContentLoaded", function () {

  const continentFilter = document.getElementById("continentFilter");
  const destinationFilter = document.getElementById("destinationFilter");
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".card");

  if (!continentFilter || !destinationFilter || !searchInput) return;

  const countryData = {
    asia: ["UAE", "Malaysia", "Maldives"],
    europe: ["France", "Switzerland", "Germany", "Italy", "Santorini"],
    australia: ["Australia"],
    north_america: ["Canada"]
  };


destinationFilter.innerHTML = '<option value="">Select Destination</option>';

Object.values(countryData).flat().forEach(place => {
  const option = document.createElement("option");
  option.value = place.toLowerCase();
  option.textContent = place;
  destinationFilter.appendChild(option);
});


  // Populate destination dropdown when continent changes
  continentFilter.addEventListener("change", function () {
    const selected = this.value;
    destinationFilter.innerHTML = '<option value="">Select Destination</option>';

    if (selected === "all") {
  Object.values(countryData).flat().forEach(place => {
    const option = document.createElement("option");
    option.value = place.toLowerCase();
    option.textContent = place;
    destinationFilter.appendChild(option);
  });
}
else if (countryData[selected]) {
      countryData[selected].forEach(place => {
        const option = document.createElement("option");
        option.value = place.toLowerCase();
        option.textContent = place;
        destinationFilter.appendChild(option);
      });
    }

    destinationFilter.value = "";
    filterCards();
  });

  // Filter when destination is picked
  destinationFilter.addEventListener("change", filterCards);

  // Filter when search is typed
  searchInput.addEventListener("input", filterCards);

  function filterCards() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedContinent = continentFilter.value;
    const selectedDestination = destinationFilter.value;

    cards.forEach(card => {
      const cardName = card.dataset.name.toLowerCase();
      const cardContinent = card.dataset.continent.toLowerCase();

      const matchContinent = selectedContinent === "all" || cardContinent === selectedContinent;
      const matchDestination = selectedDestination === "" || cardName === selectedDestination;
      const matchSearch = searchValue === "" || cardName.includes(searchValue);

      card.style.display = (matchContinent && matchDestination && matchSearch) ? "block" : "none";
    });
  }

}); 



 



//side nav js

function openNav() {
  document.getElementById("sidenav").classList.add("active");
}

function closeNav() {
  document.getElementById("sidenav").classList.remove("active");
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".sidenav a").forEach(link => {
    link.addEventListener("click", function () {
      document.getElementById("sidenav").classList.remove("active");
    });
  });
});



/*************************subscription***************/
function subscribeNewsletter(){

    const emailInput =
        document.getElementById("newsletterEmail");

    const messageBox =
        document.getElementById("messageBox");

    const email =
        emailInput.value.trim();

    // EMPTY FIELD
    if(email === ""){

        messageBox.style.display = "flex";

        messageBox.className =
            "message-error";

        messageBox.innerHTML = `
            <span class="message-icon">!</span>
            Please fill out this field.
        `;

        return;
    }

    // INVALID EMAIL
    if(
        !email.includes("@") ||
        !email.includes(".")
    ){

        messageBox.style.display = "flex";

        messageBox.className =
            "message-error";

        messageBox.innerHTML = `
            <span class="message-icon">!</span>
            Please enter a valid email address.
        `;

        return;
    }

    // CURRENT PAGE
    let currentPage =
        window.location.pathname
        .split("/")
        .pop();

    if(currentPage === ""){
        currentPage = "index.html";
    }

    // OBJECT
    const subscriberData = {

        email : email,

        subscribedPage : currentPage,

        subscribedTime :
            new Date().toLocaleString()

    };

    // GET OLD DATA
    let subscribers =
        JSON.parse(
            localStorage.getItem("newsletterSubscribers")
        ) || [];

    // ADD NEW
    subscribers.push(subscriberData);

    // SAVE
    localStorage.setItem(
        "newsletterSubscribers",
        JSON.stringify(subscribers)
    );

    // SUCCESS MESSAGE
    messageBox.style.display = "flex";

    messageBox.className =
        "message-success";

    messageBox.innerHTML = `
        <span class="message-icon">✓</span>
        Successfully subscribed!
       Thank you for subscribing to our newsletter
    `;

    // CLEAR FIELD
    emailInput.value = "";

    // AUTO HIDE
    setTimeout(() => {

        messageBox.style.display = "none";

    }, 4000);

}





// NAVBAR ACTIVE HIGHLIGHT
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  
  document.querySelectorAll(".navbar .menu_item").forEach(link => {
    const linkPage = link.getAttribute("href").split("/").pop();
    
    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html") ||
      (currentPage === "index.html" && linkPage === "#" && link.textContent.trim() === "Home") ||
      (currentPage === "explorer.html" && linkPage === "#" && link.textContent.trim() === "Explorer") ||
      (currentPage === "budgetPlanner.html" && linkPage === "#" && link.textContent.trim() === "Travel Planner") ||
      (currentPage === "TravelMood.html" && linkPage === "#" && link.textContent.trim() === "Mood") ||
      (currentPage === "recommender.html" && linkPage === "#" && link.textContent.trim() === "Recommender") ||
      (currentPage === "feedback.html" && linkPage === "#" && link.textContent.trim() === "Feedback")
    ) {
      link.classList.add("current");
    }
  });
});
