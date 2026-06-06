  /******************************************
       MOOD DATA
    *****************************************/
    const MOODS = {
      rain: {
        label: 'Rain',
        video: "videos/rainVideo.mp4",
        audio:"sounds/rain.sound.mp3",
        audioFallback: null
      },
      beach: {
        label: 'Beach',
        video: "videos/beach2Video.mp4",
        audio: "sounds/beach.sound.mp3",
      },
      forest: {
        label: 'Forest',
        video: "videos/forest1Video.mp4",
        audio: "sounds/forest.mp3",
      },
      city: {
        label: 'City',
        video:"videos/cityVideo.mp4",
        audio:"sounds/city.sound.mp3",
      },
      night: {
        label: 'Night',
        video: "videos/nightVideo.mp4",
        audio: "sounds/night.sound.mp3",
      }
    };

    /* *****************
       STATE
    ********************/
    let currentMood = 'forest';
    let isPlaying = true;
    let volume = 0.70;

    const video   = document.getElementById('bg-video');
    const audio   = new Audio();
    audio.loop    = true;
    audio.volume  = volume;

    const playBtn   = document.getElementById('play-btn');
    const playIcon  = document.getElementById('play-icon');
    const moodTitle = document.getElementById('mood-title');
    const statusMood  = document.getElementById('status-mood');
    const statusState = document.getElementById('status-state');

    /***********************************
       ICONS (inline SVG paths)
    ************************************/
    const ICON_PLAY  = 'M8 5v14l11-7z';
    const ICON_PAUSE = 'M6 19h4V5H6v14zm8-14v14h4V5h-4z';

    function setPlayIcon(playing) {
      playIcon.innerHTML = `<path d="${playing ? ICON_PAUSE : ICON_PLAY}"/>`;
      playBtn.classList.toggle('playing', playing);
    }

    /***********************************
       LOAD A MOOD
    ************************************/
    function loadMood(mood) {
      const data = MOODS[mood];

      /* Video */
      video.style.opacity = '0';
      setTimeout(() => {
        video.src = data.video;
        video.load();
        video.play().catch(() => {});
        video.style.opacity = '1';
      }, 400);

      
      audio.src = data.audio;
      audio.load();
      if (isPlaying) {
        audio.play().catch(() => {
         
        });
      }

      /* UI */
      moodTitle.style.opacity = '0';
      setTimeout(() => {
        moodTitle.textContent = data.label;
        moodTitle.style.opacity = '1';
      }, 200);
      statusMood.textContent = data.label;
    }

    /**************************************** 
       SELECT MOOD (pill click)
    ***************************************/
    function selectMood(btn) {
      document.querySelectorAll('.sound-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      currentMood = btn.dataset.mood;
      isPlaying = true;
      setPlayIcon(true);
      statusState.textContent = 'Playing';
      loadMood(currentMood);
    }

    /************************************
       PLAY / PAUSE TOGGLE
    ******************************************/
    function togglePlay() {
      isPlaying = !isPlaying;
      if (isPlaying) {
        video.play();
        audio.play().catch(() => {});
        statusState.textContent = 'Playing';
      } else {
        video.pause();
        audio.pause();
        statusState.textContent = 'Paused';
      }
      setPlayIcon(isPlaying);
    }

    /****************************************
       VOLUME
    ******************************************/
    function setVolume(val) {
      volume = parseInt(val) / 100;
      audio.volume = volume;
      document.getElementById('vol-val').textContent = val + '%';
    }

    /*************************************
       DESTINATION TRACKER
    ***************************************/
   const visited = (JSON.parse(localStorage.getItem("moodVisited")) || []).map(t => t.name);
const planned = (JSON.parse(localStorage.getItem("moodPlanned")) || []).map(t => t.name);

function saveLists() {
  localStorage.setItem("moodPlanned", JSON.stringify(
    planned.map(name => ({ name }))
  ));
  localStorage.setItem("moodVisited", JSON.stringify(
    visited.map(name => ({ name }))
  ));
}






    function addDest(type) {
      const sel = document.getElementById('dest-select');
      const dest = sel.value.trim();
      if (!dest) { showToast('Please choose a destination first.'); return; }

      const list = type === 'visited' ? visited : planned;
      const other = type === 'visited' ? planned : visited;
      const otherId = type === 'visited' ? 'planned' : 'visited';

      if (list.includes(dest)) {
        showToast(`"${dest}" is already in your ${type} list.`);
        return;
      }

      /* Move from other list if present */
      const otherIdx = other.indexOf(dest);
      if (otherIdx !== -1) {
        other.splice(otherIdx, 1);
        renderList(otherId, other);
        showToast(`Moved "${dest}" to ${type === 'visited' ? 'Visited' : 'Planned'}.`);
      } else {
        showToast(`"${dest}" added to ${type === 'visited' ? 'Visited ✓' : 'Planned 📅'}`);
      }

      list.push(dest);
      renderList(type, list);
      sel.value = '';
    }

    function removeTag(dest, type) {
      const list = type === 'visited' ? visited : planned;
      const idx = list.indexOf(dest);
      if (idx !== -1) list.splice(idx, 1);
      renderList(type, list);
      showToast(`"${dest}" removed.`);

      saveLists();
    }

    function renderList(type, list) {
      const container = document.getElementById(type + '-list');
      const countEl   = document.getElementById(type + '-count');
      countEl.textContent = list.length;

      saveLists();

      if (list.length === 0) {
        container.innerHTML = '<span class="empty-hint">No destinations yet</span>';
        return;
      }

      container.innerHTML = list.map(d => `
        <span class="dest-tag ${type === 'visited' ? 'v-tag' : 'p-tag'}">
          ${d}
          <svg viewBox="0 0 24 24" onclick="removeTag('${d.replace(/'/g,"\\'")}','${type}')" title="Remove" style="cursor:pointer">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </span>
      `).join('');
    }

    /************************************* 
       TOAST
    ***************************************/
    let toastTimer;
    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
    }

    /**********************************
      SIDE NAV
    ***********************************/

function openNav() {
  document.getElementById("sidenav").classList.add("active");
}

function closeNav() {
  document.getElementById("sidenav").classList.remove("active");
}


    /***********************************
       INIT — Forest plays by default
    ************************************/
renderList('visited', visited);
renderList('planned', planned);

    loadMood('forest');
    setPlayIcon(true);
    statusState.textContent = 'Playing';

    /* Allow audio after first user gesture (browser autoplay policy) */
    document.addEventListener('click', function startAudio() {
      if (isPlaying && audio.paused) {
        audio.play().catch(() => {});
      }
      document.removeEventListener('click', startAudio);
    }, { once: true });




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
