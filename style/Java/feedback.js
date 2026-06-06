let selectedRating = 0;

// ⭐ STAR CLICK
document.querySelectorAll(".stars span").forEach(star => {
  star.addEventListener("click", function () {
    selectedRating = this.dataset.value;

    document.querySelectorAll(".stars span").forEach(s => {
      s.classList.remove("active");
    });

    for (let i = 0; i < selectedRating; i++) {
      document.querySelectorAll(".stars span")[i].classList.add("active");
    }
  });
});

// FORM SUBMIT
document.getElementById("feedbackForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    type: document.getElementById("travelType").value,
    country: document.getElementById("destination").value,
    rating: selectedRating,
    comment: document.getElementById("comment").value
  };

  // SAVE TO LOCAL STORAGE
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.push(data);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  // CLEAR FORM
  this.reset();
  selectedRating = 0;
  document.querySelectorAll(".stars span").forEach(s => s.classList.remove("active"));

  // SHOW SUCCESS MESSAGE
  const successMsg = document.getElementById("submitSuccessMsg");
  successMsg.style.display = "block";

  setTimeout(() => {
    successMsg.style.display = "none";
  }, 4000);
});






//side nav js

function openNav() {
  document.getElementById("sidenav").classList.add("active");
}

function closeNav() {
  document.getElementById("sidenav").classList.remove("active");
}




//FAQ

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        // close other opened faq
        faqItems.forEach(faq => {
            if(faq !== item){
                faq.classList.remove("active");
            }
        });

        // open current faq
        item.classList.toggle("active");

    });

});






/***************************************************
                    Subscription -Footer
     ***************************************************/



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
