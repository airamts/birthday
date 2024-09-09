const canvas = document.getElementById('birthdayCanvas');
const context = canvas.getContext('2d');
const music = document.getElementById('birthdayMusic');

let nama, tanggalLahir, usia, today, birthDate;
let stars = [];
const maxStars = 100; // Jumlah maksimal bintang
let confetti = [];
const maxConfetti = 100; // Jumlah maksimal konfeti

// Atur ukuran canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function startAnimation() {
  nama = document.getElementById('nama').value;
  tanggalLahir = document.getElementById('tanggal-lahir').value;

  if (!nama || !tanggalLahir) {
    alert("Mohon masukkan nama dan tanggal lahir.");
    return;
  }

  today = new Date();
  birthDate = new Date(tanggalLahir);
  
  const todayMonthDay = `${today.getMonth() + 1}-${today.getDate()}`;
  const birthMonthDay = `${birthDate.getMonth() + 1}-${birthDate.getDate()}`;
  
  if (todayMonthDay === birthMonthDay) {
    // Ulang tahun hari ini
    usia = Math.floor((Date.now() - Date.parse(tanggalLahir)) / (1000 * 60 * 60 * 24 * 365));
    document.getElementById('input-container').classList.add('hide');
    canvas.classList.remove('hide');
    music.play();
    initStars();
    initConfetti();
    sketch(true); // Pass true to indicate birthday
  } else {
    // Bukan ulang tahun
    const years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    if (months < 0) {
      months += 12;
    }
    document.getElementById('input-container').classList.add('hide');
    canvas.classList.remove('hide');
    music.play();
    sketch(false, years, months);
  }
}

function initStars() {
  stars = [];
  for (let i = 0; i < maxStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      velocityX: Math.random() * 0.5,
      velocityY: Math.random() * 0.5
    });
  }
}

function initConfetti() {
  confetti = [];
  for (let i = 0; i < maxConfetti; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 5 + 2,
      velocityX: Math.random() * 2 - 1,
      velocityY: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }
}

function animateStars() {
  stars.forEach(star => {
    star.x += star.velocityX;
    star.y += star.velocityY;
    if (star.x > canvas.width) star.x = 0;
    if (star.y > canvas.height) star.y = 0;

    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    context.fillStyle = "white";
    context.fill();
  });
}

function animateConfetti() {
  confetti.forEach(piece => {
    piece.x += piece.velocityX;
    piece.y += piece.velocityY;
    if (piece.x > canvas.width) piece.x = 0;
    if (piece.y > canvas.height) piece.y = 0;

    context.beginPath();
    context.arc(piece.x, piece.y, piece.radius, 0, Math.PI * 2);
    context.fillStyle = piece.color;
    context.fill();
  });
}

function sketch(isBirthday, years = null, months = null) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Latar belakang bintang bergerak
  animateStars();
  
  // Dekorasi konfeti
  animateConfetti();

  if (isBirthday) {
    // Animasi ulang tahun
    const gradientText = context.createLinearGradient(0, 0, canvas.width, 0);
    gradientText.addColorStop(0, "#FF6F61");
    gradientText.addColorStop(0.5, "#FFDD00");
    gradientText.addColorStop(1, "#FF6F61");

    context.font = "bold 72px 'Poppins', sans-serif";
    context.fillStyle = gradientText;
    context.textAlign = "center";
    context.shadowColor = "rgba(0,0,0,0.5)";
    context.shadowBlur = 20;
    context.fillText(`Happy Birthday ${nama}!🎉✨`, canvas.width / 2, canvas.height / 2 - 60);

    context.font = "56px 'Poppins', sans-serif";
    context.fillStyle = gradientText;
    context.fillText(`Enjoy your ${usia} years! 🎂💖`, canvas.width / 2, canvas.height / 2 + 60);
  } else {
    // Tampilkan umur jika bukan ulang tahun
    const gradientText = context.createLinearGradient(0, 0, canvas.width, 0);
    gradientText.addColorStop(0, "#FF6F61");
    gradientText.addColorStop(0.5, "#FFD700");
    gradientText.addColorStop(1, "#FF6F61");

    context.font = "bold 56px 'Poppins', sans-serif";
    context.fillStyle = gradientText;
    context.textAlign = "center";
    context.shadowColor = "rgba(0,0,0,0.5)";
    context.shadowBlur = 20;
    context.fillText(`${nama}, you are ${years} years and ${months} months old!`, canvas.width / 2, canvas.height / 2);
  }

  requestAnimationFrame(() => sketch(isBirthday, years, months));
}
