document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");
  const selectedDateText = document.getElementById("selectedDate");
  const reserveButton = document.getElementById("reserveButton");
  const form = document.getElementById("contactForm");
});

// Užtikriname, kad lango dydis keičiasi
window.addEventListener("resize", function () {
  if (window.innerWidth < 768) {
    body.style.width = "95%";
  } else {
    body.style.width = "80%";
  }
});

// Scroll efekto funkcija
window.addEventListener("scroll", function () {
  const hero = document.getElementById("headerText");
  if (window.scrollY > 150) {
    hero.classList.add("animate-up");
  } else {
    hero.classList.remove("animate-up");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    events: [
      {
        title: "Paslaugos rezervacija",
        start: "2025-05-05",
        description: "Pasirinkta data rezervacijai",
      },
      // Čia galime įtraukti dinamiškai iš duomenų bazės įkeltus renginius.
    ],
    dateClick: function (info) {
      let dateStr = info.dateStr;
      alert("Pasirinkta data: " + dateStr);

      // Užrašom pasirinktas datos reikšmes į formą
      document.getElementById("rezervacijos_data").value = dateStr;
    },
  });

  calendar.render();
});
// Inicializacija FullCalendar
document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    selectable: true, // leidžia pasirinkti datas
    dateClick: function (info) {
      // Parodome iššokantį langą su pasirinkta data
      var selectedDate = info.dateStr; // Gauname pasirinktos datos reikšmę
      document.getElementById("selectedDate").textContent = selectedDate; // Rodome datą
      document.getElementById("date").value = selectedDate; // Įrašome datą į slaptažodį
      document.getElementById("reservationModal").style.display = "block"; // Parodome modalą
    },
  });
  calendar.render();
});

// Uždaryti iššokantį langą, kai paspaudžiama ant X
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("reservationModal").style.display = "none";
});

// Uždaryti iššokantį langą, kai paspaudžiama už jo ribų
window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("reservationModal")) {
    document.getElementById("reservationModal").style.display = "none";
  }
});
