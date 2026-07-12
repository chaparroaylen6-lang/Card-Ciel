let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.play-btn-circle');
let vinyl_record = document.querySelector('.vinyl-record'); 

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');

let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let updateTimer;

const music_list = [
    {
        
        name : 'Cant Take My Eyes Off You',
        artist : 'Frankie Valli',
        music : 'music/eyes-off-you.mp3'
    },
    {
        
        name : 'Enamorada',
        artist : 'Miranda!',
        music : 'music/enamorada.mp3'
    },
    {
        
        name : 'Suffering',
        artist : 'Epic: The Musical',
        music : 'music/suffering.mp3'
    },
    {
        
        name : 'Killing Me Softly',
        artist : 'Fugees',
        music : 'music/killing-me-softly.mp3'
    },
    {
        name: 'Me gustas tanto',
        artist: 'Miranda!',
        music: 'music/me-gustas-tanto.mp3'
    },
    {
        
        name : 'Fancy you',
        artist : 'TWICE',
        music : 'music/fancy-you.mp3'
    },
    {
        
        name : 'Tell Me',
        artist : 'Wonder Girls',
        music : 'music/tell-me.mp3'
    },
    {
        
        name : 'Cant Sleep Love',
        artist : 'Pentatonix',
        music : 'music/cant-sleep-love.mp3'
    },
    {
        name: 'Hell in heaven',
        artist: 'TWICE',
        music: 'music/hell-in-heaven.mp3'
    },
    {
        name: 'Noels lament',
        artist: 'Kholby Wardell',
        music: 'music/noels-lament.mp3'
    },
    {
        name : 'From The Start',
        artist : 'Good Kid (Laufey Cover)',
        music : 'music/from-the-start.mp3'
    },
    {

        name : 'One Way Or Another',
        artist : 'Blondie', 
        music : 'music/one-way.mp3'
    },
    {

        name : 'Killin Me Good',
        artist : 'JIHYO',
        music : 'music/killin-me-good.mp3'
    },
    {
        name: 'Dead girl walking',
        artist: 'Barrett Wilbert Weed & Ryan McCartan',
        music: 'music/dead-girl-walking.mp3'
    },
    {
        name: 'The zombie song',
        artist: 'Stephanie Mabey',
        music: 'music/the-zombie-song.mp3'
    },
    {
        name : 'Teeth',
        artist : '5 Seconds of Summer',
        music : 'music/teeth.mp3'
    }
];
function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

loadTrack(track_index);
function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();

    // Cargar nueva pista
    curr_track.src = music_list[track_index].music;
    curr_track.load();


    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;

    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
    
    // Cambiar color de fondo (Tu función pastel)
    random_bg_color();
}

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    
    // GIRAR EL DISCO
    vinyl_record.classList.add('rotate');
    
    // Cambiar icono a PAUSA
    playpause_btn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    
    // DETENER EL DISCO
    vinyl_record.classList.remove('rotate');
    
    // Cambiar icono a PLAY
    playpause_btn.innerHTML = '<i class="fas fa-play"></i>';
}

function nextTrack() {
    if (track_index < music_list.length - 1)
        track_index += 1;
    else track_index = 0;
    
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = music_list.length - 1;
    
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// --- TU FUNCIÓN DE COLORES PASTEL ---
function random_bg_color() {
    const colors = ['#9381ff', '#b8b8ff', '#f8f7ff', '#ffeedd', '#ffd8be'];
    let color1 = colors[Math.floor(Math.random() * colors.length)];
    let color2 = colors[Math.floor(Math.random() * colors.length)];
    
    if (color1 === color2) color2 = '#f8f7ff'; 

    let gradient = `linear-gradient(to bottom right, ${color1}, ${color2})`;
    document.body.style.background = gradient;
}

// --- NAVEGACIÓN DE PESTAÑAS ---
function showSection(sectionId) {
    document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Iniciar reproductor
loadTrack(track_index);

// Función para cambiar de pestaña (mantenla para que los botones de arriba funcionen)
function showSection(sectionId) {
    document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

loadTrack(track_index);
// --- FUNCIONES DE NAVEGACIÓN (PESTAÑAS) ---
function showSection(sectionId) {
    // Ocultar todas
    document.querySelectorAll('.tab-content').forEach(sec => {
        sec.classList.remove('active');
    });
    // Mostrar la seleccionada
    document.getElementById(sectionId).classList.add('active');
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}

/* --- 1. RELOJ ARGENTINA --- */
function updateClock() {
    const timeEl = document.getElementById('arg-time');
    const dateEl = document.getElementById('arg-date');
    
    // Si no existen los elementos (por si cambias de página), no hace nada
    if (!timeEl) return;

    // Obtener hora de Argentina
    const optionsTime = { 
        timeZone: 'America/Argentina/Buenos_Aires', 
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false 
    };
    const optionsDate = { 
        timeZone: 'America/Argentina/Buenos_Aires', 
        weekday: 'short', day: 'numeric', month: 'short'
    };

    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString('es-AR', optionsTime);
    dateEl.textContent = now.toLocaleDateString('es-AR', optionsDate);
}
// Actualizar cada segundo
setInterval(updateClock, 1000);
updateClock(); // Llamada inicial


/* --- 2. MINIJUEGO: GALLETA --- */
const fortunes = [
    "La mejor forma de predecir el futuro es creándolo – Peter Drucker",
    "No tienes que ser grande para empezar, pero tienes que empezar para ser grande. – Zig Ziglar",
    "El éxito no es el final, el fracaso no es fatal: lo que cuenta es el valor para continuar. – Winston Churchill",
    "La disciplina es hacer lo que hay que hacer, incluso cuando no tienes ganas de hacerlo. – Anónimo",
    "Los obstáculos son esas cosas espantosas que ves cuando apartas los ojos de tu meta. – Henry Ford",
    "No cuentes los días, haz que los días cuenten. – Muhammad Ali",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario. – Vidal Sassoon",
    "La motivación es lo que te pone en marcha, el hábito es lo que hace que sigas adelante. – Jim Ryun",
    "No se trata de tener tiempo, se trata de hacer tiempo. – Anónimo",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día. – Robert Collier"
];

const cookies = ["🍪", "🥠", "🍩", "🧁", "🥐"];

function openCookie() {
    const display = document.querySelector('.cookie-emoji');
    const msgBox = document.getElementById('cookie-message');
    
    // Efecto de agitar
    display.style.animation = 'none'; // Resetea
    setTimeout(() => { display.style.animation = 'float 0.5s infinite'; }, 10);

    // Resultado random
    setTimeout(() => {
        const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];
        const randomMsg = fortunes[Math.floor(Math.random() * fortunes.length)];
        
        display.textContent = randomCookie;
        msgBox.textContent = randomMsg;
        display.style.animation = 'float 3s infinite ease-in-out'; // Vuelve a flotar suave
    }, 500);
}


