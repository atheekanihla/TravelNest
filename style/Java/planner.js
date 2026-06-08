/*budget planner*/


const destinationImages = {
  "uae":         "./images/uae2.webp",
  "france":      "./images/france.webp",
  "malaysia":    "./images/malaysia.png",
  "maldives":    "./images/malslider_img.jpg",
  "switzerland": "./images/swissslider_img.jpg",
  "germany":     "./images/uk.jpg",
  "italy":       "./images/lake_img.jpg",
  "santorini":   "./images/jordhan.webp",
  "australia":   "./images/dupkeyphu41gaskx13ff.webp",
  "canada":      "./images/canada.jpg"
};

function getDestinationImage(name) {
  const key = name.trim().toLowerCase();
  return destinationImages[key] || "./images/default.jpg";
}

function calculateBudget() {

  const destination = document.getElementById("destination").value.trim();
  const days        = parseInt(document.getElementById("days").value);
  const daily       = parseInt(document.getElementById("dailyBudget").value);

 // clear previous errors
  document.getElementById("days-error").textContent = "";
  document.getElementById("daily-error").textContent = "";
  document.getElementById("days").style.border = "";
  document.getElementById("dailyBudget").style.border = "";

  if (!destination) {
    document.getElementById("destination").focus();
    return;
  }

  if (!days || days <= 0) {
    document.getElementById("days").style.border = "1px solid #e24b4a";
    document.getElementById("days-error").textContent = "Please enter a valid number of days (greater than 0)";
    return;
  }

  if (!daily || daily < 0) {
    document.getElementById("dailyBudget").style.border = "1px solid #e24b4a";
    document.getElementById("daily-error").textContent = "Daily budget cannot be negative";
    return;
  }

  if (daily === 0) {
    document.getElementById("dailyBudget").style.border = "1px solid #e24b4a";
    document.getElementById("daily-error").textContent = "Please enter a valid daily budget (greater than 0)";
    return;
  }

  const total = days * daily;

  let status, barColor, barPercent;

  if (daily < 50) {
    status     = "Low";
    barColor   = "#22c55e";
    barPercent = 25;
  } else if (daily < 150) {
    status     = "Moderate";
    barColor   = "#facc15";
    barPercent = 60;
  } else {
    status     = "Luxury";
    barColor   = "#ef4444";
    barPercent = 100;
  }

document.getElementById("tripResult").innerHTML = `
    <div style="width:100%; padding: 20px 0;">
      <p style="margin-bottom:8px; font-size:16px; font-weight:700; color:#002f36;">Budget Level — ${status}</p>
      <div style="background:#e5e7eb; border-radius:50px; height:18px; width:100%; overflow:hidden;">
        <div id="budgetBar" style="height:100%; width:0%; background:${barColor}; border-radius:50px; transition: width 0.8s ease;"></div>
      </div>
      <p style="font-size:13px; color:#888; margin-top:6px;">${barPercent}% of max budget range</p>
    </div>
  `;

  setTimeout(() => {
    const bar = document.getElementById("budgetBar");
    if (bar) bar.style.width = barPercent + "%";
  }, 50);

  let plannedTrips = JSON.parse(localStorage.getItem("trips")) || [];

plannedTrips.push({
    destination : destination.charAt(0).toUpperCase() + destination.slice(1),
    days        : days,
    daily       : daily,
    total       : total,
    status      : status,
    image       : getDestinationImage(destination)
  });

  localStorage.setItem("trips", JSON.stringify(plannedTrips));

  renderSavedTrips();

  // CLEAR INPUT FIELDS
  document.getElementById("destination").value = "";
  document.getElementById("days").value = "";
  document.getElementById("dailyBudget").value = "";

 
}

function renderSavedTrips() {

  const wishlist = document.querySelectorAll("#wishlist")[0];
  const trips    = JSON.parse(localStorage.getItem("trips")) || [];

  if (trips.length === 0) {
    wishlist.innerHTML = "<p style='color:#888; padding:10px;'>No saved trips yet.</p>";
    return;
  }

wishlist.innerHTML = trips
    .filter(trip => trip && trip.destination && trip.status)
    .map((trip, index) => `
    <div class="saved-trip-card">
      <img src="${trip.image || './images/default.jpg'}" alt="${trip.destination}" onerror="this.src='./images/default.jpg'">
      <div class="saved-trip-info">
        <h3>${trip.destination}</h3>
        <p>📅 <strong>Days:</strong> ${trip.days}</p>
        <p>💵 <strong>Daily Budget:</strong> $${trip.daily}</p>
        <p>💰 <strong>Total Cost:</strong> $${trip.total}</p>
        <p>✈️ <strong>Type:</strong>
          <span class="${trip.status.toLowerCase()}">${trip.status}</span>
        </p>
        <button class="remove-btn" onclick="removeTrip(${index})">Remove</button>
      </div>
    </div>
  `).join("");

 
}

function removeTrip(index) {
  let trips = JSON.parse(localStorage.getItem("trips")) || [];
  trips.splice(index, 1);
  localStorage.setItem("trips", JSON.stringify(trips));
  renderSavedTrips();
}



window.onload = function () {
  const wishlist = document.getElementById("wishlist");
  if (wishlist) {
    renderSavedTrips();
  }
};




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



//side nav js

function openNav() {
  document.getElementById("sidenav").classList.add("active");
}

function closeNav() {
  document.getElementById("sidenav").classList.remove("active");
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
