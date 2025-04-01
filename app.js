document.addEventListener('DOMContentLoaded', function() {
    const btnGenerar = document.getElementById('btn-generar');
    const movieTitle = document.getElementById('movie-title');
    
    // Lista de películas ejemplo (puedes ampliarla o cambiarla)
    const peliculas = [
        "Interestelar", 
        "El Padrino", 
        "Pulp Fiction", 
        "El Señor de los Anillos", 
        "Matrix", 
        "La La Land",
        "Parasite",
        "Inception",
        "Avatar",
        "Titanic"
    ];
    
    btnGenerar.addEventListener('click', function() {
        // Generar película aleatoria
        const peliculaAleatoria = peliculas[Math.floor(Math.random() * peliculas.length)];
        
        // Actualizar el título y hacerlo visible
        movieTitle.textContent = peliculaAleatoria;
        movieTitle.classList.add('visible');
        
        // Efecto de animación al generar una nueva película
        movieTitle.style.opacity = "0";
        movieTitle.style.transform = "translateY(-20px)";
        
        setTimeout(() => {
            movieTitle.style.opacity = "1";
            movieTitle.style.transform = "translateY(0)";
        }, 50);
    });
});