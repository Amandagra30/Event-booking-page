document.addEventListener('DOMContentLoaded', function () {
  const body = document.querySelector("body");
  const hero = document.getElementById("headerText");
  const modal = document.getElementById("reservationModal");
  const closeModal = document.getElementById("closeModal");
  const selectedDateText = document.getElementById("selectedDate");
  const form = document.getElementById("contactForm");

  var uzimtosDatos = []; // Užimtos datos masyvas

  // Responsive dizaino pritaikymas
  window.addEventListener("resize", function () {
    if (window.innerWidth < 768) {
      body.style.width = "95%";
    } else {
      body.style.width = "80%";
    }
  });

  // Hero sekcijos animacija
  window.addEventListener("scroll", function () {
    if (window.scrollY > 150) {
      hero.classList.add("animate-up");
    } else {
      hero.classList.remove("animate-up");
    }
  });

  // FullCalendar inicializacija
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: 'lt',
    selectable: true,

    events: {
      url: 'nuskaitom_rezervacijas.php',
      success: function(events) {
        uzimtosDatos = events.map(event => event.start);
      }
    },

    selectAllow: function(selectInfo) {
      // Leisti pasirinkti tik laisvas datas
      return !uzimtosDatos.includes(selectInfo.startStr);
    },

    dateClick: function (info) {
      var selectedDate = info.dateStr;
      selectedDateText.textContent = selectedDate;
      document.getElementById("date").value = selectedDate;
      modal.style.display = "block";
    }
  });
  calendar.render();

  // Modal lango uždarymas
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  // Formos pateikimas (registracija)
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const vardas = document.getElementById("name").value;
    const el_pastas = document.getElementById("email").value;
    const data = document.getElementById("date").value;

    fetch('rezervuoti_diena.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vardas: vardas, el_pastas: el_pastas, data: data })
    })
    .then(response => response.text())
    .then(msg => {
      alert(msg);
      modal.style.display = "none";
      form.reset();
      calendar.refetchEvents(); // atnaujinam kalendorių
    });
  });
});
