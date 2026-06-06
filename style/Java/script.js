
/**************************************Subscription*****************************/

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

// QUOTE ANIMATION
document.addEventListener("DOMContentLoaded", function () {
  const quotes = document.querySelectorAll(".quote");
  let current = 0;

  if (quotes.length === 0) return;

  setInterval(() => {
    quotes[current].classList.remove("active");
    current = (current + 1) % quotes.length;
    quotes[current].classList.add("active");
  }, 4000);
});


// DESTINATION OF THE DAY
const dotdDestinations = [
  { name:"UAE",         continent:"ASIA",          description:"Luxury cities, desert adventures and iconic skyscrapers that define the modern world.",      type:"Adventure",   budget:"From $700",  season:"Nov - Mar" },
  { name:"France",      continent:"EUROPE",         description:"From the Eiffel Tower to Provence lavender fields — art, cuisine and romance at every turn.", type:"Cultural",    budget:"From $900",  season:"Apr - Jun" },
  { name:"Malaysia",    continent:"ASIA",          description:"Vibrant cities, lush rainforests and beautiful beaches blended into one diverse destination.", type:"Nature",      budget:"From $500",  season:"Mar -Oct" },
  { name:"Maldives",    continent:"ASIA",          description:"Crystal-clear waters and luxury island resorts for the ultimate tropical escape.",             type:"Relaxation",  budget:"From $1000", season:"Nov - Apr" },
  { name:"Switzerland", continent:"EUROPE",         description:"Snowy alps, serene lakes and peaceful villages offering breathtaking scenic beauty.",          type:"Nature",      budget:"From $1000", season:"Jun - Sep" },
  { name:"Germany",     continent:"EUROPE",         description:"Rich heritage, modern cities and iconic landmarks combining history with innovation.",          type:"Cultural",    budget:"From $1000", season:"May - Sep" },
  { name:"Italy",       continent:"EUROPE",         description:"World-class art, stunning architecture and delicious cuisine across historic cities.",          type:"Cultural",    budget:"From $1000", season:"Apr - Jun" },
  { name:"Santorini",   continent:"EUROPE",         description:"White-washed buildings and stunning sunsets over the Aegean Sea on a dreamy volcanic island.",  type:"Relaxation",  budget:"From $2000", season:"Apr - Oct" },
  { name:"Australia",   continent:"AUSTRALIA",      description:"Vast beaches, unique wildlife and vibrant cities spread across a breathtaking continent.",      type:"Adventure",   budget:"From $2500", season:"Sep - Nov" },
  { name:"Canada",      continent:"NORTH AMERICA",  description:"Vast landscapes, towering mountains and friendly cities surrounded by untouched nature.",       type:"Nature",      budget:"From $2000", season:"Jun - Sep" }
];

const dotdImages = {
  "UAE":         "./images/uaedessert.webp",
  "France":      "./images/france2.jpg",
  "Malaysia":    "./images/malaysia2.webp",
  "Maldives":    "./images/mald2.jpg",
  "Switzerland": "./images/swizz2.webp",
  "Germany":     "./images/germany2.webp",
  "Italy":       "./images/italy2.jpg",
  "Santorini":   "./images/santor2.webp",
  "Australia":   "./images/dupkeyphu41gaskx13ff.webp",
  "Canada":      "./images/canada2.avif"
};

const todayIndex = new Date().getDate() % dotdDestinations.length;
const dotd = dotdDestinations[todayIndex];

if (document.getElementById("dotd-name")) {
  document.getElementById("dotd-name").textContent          = dotd.name;
  document.getElementById("dotd-continent").textContent     = dotd.continent;
  document.getElementById("dotd-description").textContent   = dotd.description;
  document.getElementById("dotd-type-tag").textContent      = dotd.type;
  document.getElementById("dotd-budget-tag").textContent    = dotd.budget;
  document.getElementById("dotd-season-tag").textContent    = dotd.season;
  document.getElementById("dotd-continent-tag").textContent = dotd.continent;

  const panel = document.getElementById("dotd-image-panel");
  panel.style.backgroundImage    = "url('" + (dotdImages[dotd.name] || "") + "')";
  panel.style.backgroundSize     = "cover";
  panel.style.backgroundPosition = "center";
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





// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./sw.js")
      .then(() => console.log("Service Worker registered"))
      .catch(err => console.log("SW registration failed:", err));
  });
}




/***********************************sidenavbar************************/



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
