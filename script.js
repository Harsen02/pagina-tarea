const accessKey = "Hj8oKf_W8GWzvSE7vU2b4VM-0a5chlGqlR-z8A-EdaE"; // Reemplaza con tu clave de API de Unsplash

function fetchRandomImage() {
    const imageElement = document.getElementById("random-image");
    const loadingImage = document.getElementById("loading-image");

    // Endpoint de la API de Unsplash para obtener una imagen aleatoria
    const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.urls.full;
            const imageDescription = data.description || "Imagen aleatoria de Unsplash";
            
            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = imageDescription;
            img.title = imageDescription;
            
            imageElement.innerHTML = ''; // Eliminar la imagen de carga
            imageElement.appendChild(img);
        })
        .catch(error => {
            console.error("Error al obtener la imagen:", error);
            loadingImage.style.display = "none"; // Ocultar la imagen de carga
            imageElement.textContent = "No se pudo cargar la imagen.";
        });
}

function updateTimeAndDateFromServer() {
    const timeElement = document.getElementById("time");
    const dateElement = document.getElementById("date");

    fetch("https://worldtimeapi.org/api/ip")
        .then(response => response.json())
        .then(data => {
            const datetime = new Date(data.utc_datetime);
            const optionsTime = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
            const optionsDate = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
            timeElement.textContent = datetime.toLocaleTimeString("es-ES", optionsTime);
            dateElement.textContent = datetime.toLocaleDateString("es-ES", optionsDate);
        })
        .catch(error => {
            console.error("Error al obtener la hora y fecha:", error);
            timeElement.textContent = "No se pudo obtener la hora";
            dateElement.textContent = "No se pudo obtener la fecha";
        });
}

function updateUserLocation() {
    const userLocationElement = document.getElementById("user-location");

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            userLocationElement.textContent = `Latitud: ${latitude}, Longitud: ${longitude}`;
        }, function (error) {
            console.error("Error al obtener la ubicación:", error);
            userLocationElement.textContent = "No se pudo obtener la ubicación.";
        });
    } else {
        userLocationElement.textContent = "Geolocalización no está disponible en este navegador.";
    }
}

updateTimeAndDateFromServer(); // Llamar a la función para obtener la hora y fecha
updateUserLocation(); // Llamar a la función para obtener y mostrar la ubicación
fetchRandomImage(); // Llamar a la función para obtener una imagen aleatoria de Unsplash
