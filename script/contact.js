function goToSchedule() {
  document.getElementById('time').style.display = 'flex';
  document.getElementById('calendar').style.display = 'none';
}

function goBackCalendar() {
  document.getElementById('time').style.display = 'none';
  document.getElementById('calendar').style.display = 'flex';
}

function selectNumber(selectedId) {
    const numbers = document.querySelectorAll('.number');

    numbers.forEach(number => {
        number.style.backgroundColor = "white";
        number.style.transform = "scale(1)";
        number.style.color = "black";
    });

    const selected = document.getElementById(selectedId);
    selected.style.backgroundColor = "#BD8C7D";
    selected.style.transform = "scale(1.1)";
    selected.style.color = "white";
}

function bookNow(event) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    event.preventDefault(); 

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const staff = document.getElementById('staff').value;
    const service = document.getElementById('service').value;

    if(userData == null) {
      alert('Please login your account first.')
    } else if (name && email && phone && staff && service) {
        alert('Thank you for booking an appointment, ' + userData.username);
    } else {
        alert('Please fill out all fields.');
    }

    
}