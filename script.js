document.addEventListener('DOMContentLoaded', function () {
    var uzimtosDatos = [];
  
    var kalendorius = document.getElementById('kalendorius');
    var calendar = new FullCalendar.Calendar(kalendorius, {
      initialView: 'dayGridMonth',
      locale: 'lt',
      selectable: true,
  
      events: {
        url: 'nuskaitom_rezervacija.php',
        success: function(events) {
          uzimtosDatos = events.map(event => event.start);
        }
      },
  
      selectAllow: function(selectInfo) {
        return !uzimtosDatos.includes(selectInfo.startStr);
      },
  
      select: function (info) {
        const data = moment(info.startStr).format('YYYY-MM-DD');
        const dataGrazi = moment(info.startStr).format('YYYY [m.] MMMM D [d.]');
        const vardas = prompt("Įveskite savo vardą:");
        const el_pastas = prompt("Įveskite savo el. paštą:");
  
        if (vardas && el_pastas) {
          axios.post('rezervuoti.php', {
            data: data,
            vardas: vardas,
            el_pastas: el_pastas
          })
          .then(function (response) {
            Swal.fire({
                title: 'Sėkmingai!',
                text: `Rezervavote datą: ${dataGrazi}`,
                icon: 'success',
                confirmButtonText: 'Ačiū!'
              });
            calendar.refetchEvents();
          })
          .catch(function (error) {
            Swal.fire({
              title: 'Klaida!',
              text: 'Nepavyko išsaugoti rezervacijos.',
              icon: 'error',
              confirmButtonText: 'Gerai'
            });
          });
        }
      }
    });
  
    calendar.render();
  });
  const mysql = require("mysql");
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user:'root',
    password: '',
    database: 'mano_projektas'
});