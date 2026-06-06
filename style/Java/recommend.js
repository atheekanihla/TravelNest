const tripData = [
  {
    name: "Santorini",
    type: "relaxation",
    budget: "moderate",
    image: "./images/jordhan.webp",
    description: "Iconic white-washed cliffs, cerulean domes, and sunsets that paint the sky gold over the Aegean Sea."
  },
  {
    name: "Switzerland",
    type: "nature",
    budget: "luxury",
    image: "./images/swissslider_img.jpg",
    description: "Alpine peaks, pristine lakes, and chocolate-box villages nestled between world-famous ski resorts."
  },
  {
    name: "Australia",
    type: "adventure",
    budget: "luxury",
    image: "./images/dupkeyphu41gaskx13ff.webp",
    description: "Vast outback adventures, the Great Barrier Reef, and vibrant coastal cities full of life."
  },
  {
    name: "France",
    type: "cultural",
    budget: "luxury",
    image: "./images/france.webp",
    description: "From the Eiffel Tower to Provence lavender fields - art, cuisine, and romance at every turn."
  },
  {
    name: "Maldives",
    type: "relaxation",
    budget: "luxury",
    image: "./images/malslider_img.jpg",
    description: "Overwater bungalows, crystal-clear lagoons, and the most breathtaking ocean sunsets on Earth."
  },
  {
    name: "Germany",
    type: "cultural",
    budget: "low",
    image: "./images/uk.jpg",
    description: "Medieval castles, lively Christmas markets, world-class museums, and the legendary Autobahn."
  },
  {
    name: "Canada",
    type: "nature",
    budget: "moderate",
    image: "./images/canada.jpg",
    description: "Banff's turquoise lakes, Niagara's thunder, and endless wilderness that humbles every traveller."
  },
  {
    name: "Italy",
    type: "cultural",
    budget: "moderate",
    image: "./images/lake_img.jpg",
    description: "Ancient ruins, Renaissance art, Lake Como reflections, and pasta so good it changes your life."
  },
  {
    name: "Malaysia",
    type: "nature",
    budget: "low",
    image: "./images/malaysia.png",
    description: "Rainforests older than the Amazon, the iconic Petronas Towers, and a food scene that rivals any."
  },
  {
    name: "UAE",
    type: "adventure",
    budget: "low",
    image: "./images/uae2.webp",
    description: "Desert dune bashing, futuristic skylines, souks full of spice, and record-breaking architecture."
  }
];
 
// ── STATE ──
let currentTrip    = null;
let filteredTrips  = [];
let filteredIndex  = 0;
 
 
// ── HELPERS ──
 
function getFiltered() {
  const type   = document.getElementById("travelFilter").value;
  const budget = document.getElementById("budgetFilter").value;
  let results  = tripData;
  if (type   !== "any") results = results.filter(t => t.type   === type);
  if (budget !== "any") results = results.filter(t => t.budget === budget);
  return results;
}
 
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
 
function renderCard(trip) {
  const container = document.getElementById("destination-card-container");
  const noResult  = document.getElementById("no-result");
 
  noResult.style.display = "none";
 
  const old = container.querySelector(".destination-card");
  if (old) {
    old.style.transition = "opacity 0.15s, transform 0.15s";
    old.style.opacity    = "0";
    old.style.transform  = "translateY(10px)";
  }
 
  setTimeout(() => {
    const budgetClass = `tag-budget-${trip.budget}`;
    container.innerHTML = `
      <div class="destination-card">
        <img
          src="${trip.image}"
          alt="${trip.name}"
          onerror="this.src='./images/srilanka.webp'"
        >
        <div class="destination-card-body">
          <h3>${trip.name}</h3>
          <div class="destination-tags">
            <span class="tag tag-type">${trip.type}</span>
            <span class="tag ${budgetClass}">${trip.budget} budget</span>
          </div>
          <p class="card-desc">${trip.description}</p>
        </div>
      </div>
    `;
  }, old ? 150 : 0);
 
  const saveBtn = document.getElementById("saveBtn");
  if (saveBtn) saveBtn.classList.remove("saved");
}
 
function showNoResult() {
  const container = document.getElementById("destination-card-container");
  const noResult  = document.getElementById("no-result");
  container.innerHTML = "";
  noResult.style.display  = "block";
  noResult.textContent    = "No destinations match your filters. Try a different combination!";
}
 
 
// ── GENERATE TRIP (first click) ──
function generateTrip() {
  filteredTrips = shuffle(getFiltered());
  filteredIndex = 0;
 
  if (filteredTrips.length === 0) {
    showNoResult();
    currentTrip = null;
    return;
  }
 
  currentTrip = filteredTrips[filteredIndex];
  renderCard(currentTrip);
}
 
 
// ── SURPRISE ME AGAIN (cycles through filtered list) ──
function surpriseAgain() {
  // If no filter run yet, run one first
  if (filteredTrips.length === 0) {
    filteredTrips = shuffle(getFiltered());
    filteredIndex = 0;
  }
 
  if (filteredTrips.length === 0) {
    showNoResult();
    currentTrip = null;
    return;
  }
 
  // Move to next, wrap around; re-shuffle on full cycle
  filteredIndex++;
  if (filteredIndex >= filteredTrips.length) {
    filteredTrips = shuffle(filteredTrips);
    filteredIndex = 0;
  }
 
  currentTrip = filteredTrips[filteredIndex];
  renderCard(currentTrip);
}
 
 
// ── SAVE TO WISHLIST (also pushes to Mood → Planned tab) ──
function saveTrip() {
  if (!currentTrip) {
    showToast("Generate a destination first!", true);
    return;
  }
 
  // ── 1. Recommender wishlist ──
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
 
  const alreadySaved = wishlist.some(t => t.name === currentTrip.name);
  if (!alreadySaved) {
    wishlist.push(currentTrip);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
 
  // ── 2. Mood page → Planned tab  ──
  //    The Mood page reads "moodPlanned" from localStorage.
  //    Each entry: { name, type, budget, image, description, savedAt }
  let moodPlanned = JSON.parse(localStorage.getItem("moodPlanned")) || [];
 
  const alreadyInMood = moodPlanned.some(t => t.name === currentTrip.name);
  if (!alreadyInMood) {
    moodPlanned.push({
      ...currentTrip,
      savedAt: new Date().toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric"
      })
    });
    localStorage.setItem("moodPlanned", JSON.stringify(moodPlanned));
  }
 
  // ── 3. UI feedback ──
  const saveBtn = document.getElementById("saveBtn");
  if (saveBtn) saveBtn.classList.add("saved");
 
  showToast(alreadySaved ? `${currentTrip.name} is already in your wishlist!` : `${currentTrip.name} saved to Wishlist & Mood Planner ✓`);
 
  displayWishlist();
}
 
 
// ── DISPLAY WISHLIST (inline on page) ──
function displayWishlist() {
  const container = document.getElementById("wishlist");
  if (!container) return;
 
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
 
  if (wishlist.length === 0) {
    container.innerHTML = `<p style="color:#555; font-size:0.9rem;">No saved destinations yet.</p>`;
    return;
  }
 
  container.innerHTML = wishlist.map(trip => `
    <div class="wishlist-card">
      <div><strong>${trip.name}</strong> &nbsp;·&nbsp; ${trip.type} &nbsp;·&nbsp; ${trip.budget}</div>
      <button class="wishlist-remove" onclick="removeFromWishlist('${trip.name}')" title="Remove">✕</button>
    </div>
  `).join("");
}
 
 
// ── REMOVE FROM WISHLIST ──
function removeFromWishlist(name) {
  let wishlist    = JSON.parse(localStorage.getItem("wishlist"))    || [];
  let moodPlanned = JSON.parse(localStorage.getItem("moodPlanned")) || [];
 
  wishlist    = wishlist.filter(t    => t.name !== name);
  moodPlanned = moodPlanned.filter(t => t.name !== name);
 
  localStorage.setItem("wishlist",    JSON.stringify(wishlist));
  localStorage.setItem("moodPlanned", JSON.stringify(moodPlanned));
 
  displayWishlist();
}
 
 
// ── TOAST NOTIFICATION ──
function showToast(message, isError = false) {
  const toast = document.getElementById("save-toast");
  if (!toast) return;
  toast.textContent      = message;
  toast.style.background = isError ? "#c0392b" : "#4caf82";
  toast.style.color      = "#000";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}
 
 
// ── SIDE NAV ──
function openNav()  { document.getElementById("sidenav").classList.add("active"); }
function closeNav() { document.getElementById("sidenav").classList.remove("active"); }
 
 
// ── NEWSLETTER ──
function subscribeNewsletter() {
  const emailInput = document.getElementById("newsletterEmail");
  const messageBox = document.getElementById("messageBox");
  const email      = emailInput.value.trim();
 
  if (email === "") {
    messageBox.style.display = "flex";
    messageBox.className     = "message-error";
    messageBox.innerHTML     = `<span class="message-icon">!</span> Please fill out this field.`;
    return;
  }
 
  if (!email.includes("@") || !email.includes(".")) {
    messageBox.style.display = "flex";
    messageBox.className     = "message-error";
    messageBox.innerHTML     = `<span class="message-icon">!</span> Please enter a valid email address.`;
    return;
  }
 
  let currentPage = window.location.pathname.split("/").pop() || "index.html";
 
  const subscriberData = {
    email,
    subscribedPage: currentPage,
    subscribedTime: new Date().toLocaleString()
  };
 
  let subscribers = JSON.parse(localStorage.getItem("newsletterSubscribers")) || [];
  subscribers.push(subscriberData);
  localStorage.setItem("newsletterSubscribers", JSON.stringify(subscribers));
 
  messageBox.style.display = "flex";
  messageBox.className     = "message-success";
  messageBox.innerHTML     = `<span class="message-icon">✓</span> Successfully subscribed!
       Thank you for subscribing to our newsletter `;
 
  emailInput.value = "";
  setTimeout(() => { messageBox.style.display = "none"; }, 4000);
}
 
 
// ── INIT ──
document.addEventListener("DOMContentLoaded", displayWishlist);
 


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
