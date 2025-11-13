let angkaBenar;
let batas = 10;
let kesempatan = 5;
let riwayat = [];
let skor = 0;

function setLevel() {
  const select = document.getElementById("level");
  batas = parseInt(select.value);
  resetGame();
}

function acakAngka() {
  angkaBenar = Math.floor(Math.random() * batas) + 1;
}

function cekTebakan() {
  const input = document.getElementById("tebakan");
  const hasil = document.getElementById("hasil");
  const riwayatEl = document.getElementById("riwayat");
  const kesempatanEl = document.getElementById("kesempatan");
  const skorEl = document.getElementById("skor");
  const click = document.getElementById("soundClick");
  const win = document.getElementById("soundWin");
  const lose = document.getElementById("soundLose");

  click.play();

  let tebakan = parseInt(input.value);
  if (isNaN(tebakan) || tebakan < 1 || tebakan > batas) {
    hasil.innerHTML = "⚠️ Masukkan angka antara 1–" + batas;
    hasil.style.color = "yellow";
    return;
  }

  riwayat.push(tebakan);
  riwayatEl.innerHTML = "Riwayat tebakan: " + riwayat.join(", ");

  if (tebakan === angkaBenar) {
    hasil.innerHTML = `🎉 Benar! Angkanya ${angkaBenar}`;
    hasil.style.color = "#10b981";
    hasil.classList.add("glow");
    skor += 10;
    skorEl.textContent = skor;
    win.play();
    disableInput();
  } else {
    kesempatan--;
    kesempatanEl.textContent = kesempatan;
    hasil.classList.remove("glow");

    if (kesempatan === 0) {
      hasil.innerHTML = `💀 Game Over! Angka yang benar adalah ${angkaBenar}.`;
      hasil.style.color = "#ef4444";
      lose.play();
      disableInput();
    } else if (tebakan < angkaBenar) {
      hasil.innerHTML = "📉 Terlalu kecil! Coba lebih besar.";
      hasil.style.color = "#facc15";
      lose.play();
    } else {
      hasil.innerHTML = "📈 Terlalu besar! Coba lebih kecil.";
      hasil.style.color = "#facc15";
      lose.play();
    }
  }

  input.value = "";
}

function disableInput() {
  document.getElementById("tebakan").disabled = true;
}

function resetGame() {
  acakAngka();
  kesempatan = 5;
  riwayat = [];
  document.getElementById("hasil").innerHTML = "";
  document.getElementById("riwayat").innerHTML = "";
  document.getElementById("kesempatan").textContent = kesempatan;
  document.getElementById("tebakan").disabled = false;
  document.getElementById("tebakan").value = "";
}

acakAngka();
