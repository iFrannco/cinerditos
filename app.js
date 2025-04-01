document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'https://movieproject-lzn0.onrender.com/movies';
    const moviesList = document.getElementById('movies-list');
    const newMovieInput = document.getElementById('new-movie');
    const addMovieBtn = document.getElementById('add-movie-btn');
    const btnGenerar = document.getElementById('btn-generar');
    const btnAgregar = document.getElementById('btn-agregar');
    const movieTitle = document.getElementById('movie-title');

    // Cargar películas al iniciar
    loadMovies();

    // Función para cargar todas las películas
    async function loadMovies() {
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error('Error al cargar películas');
            
            const movies = await response.json();
            renderMovies(movies);
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cargar películas');
        }
    }

    // Función para renderizar las películas en la tabla
    function renderMovies(movies) {
        moviesList.innerHTML = ''; // Limpiar lista
        
        if (movies.length === 0) {
            const noMoviesRow = document.createElement('tr');
            noMoviesRow.className = 'no-movies-row';
            noMoviesRow.innerHTML = `
                <td colspan="2" class="no-movies">No hay películas agregadas</td>
            `;
            moviesList.appendChild(noMoviesRow);
            return;
        }
        
        movies.forEach(movie => {
            const row = document.createElement('tr');
            row.dataset.id = movie.id;
            row.innerHTML = `
                <td>${movie.title}</td>
                <td class="action-cell"><button class="btn-delete">Eliminar</button></td>
            `;
            
            // Evento para eliminar película
            row.querySelector('.btn-delete').addEventListener('click', () => deleteMovie(movie.id));
            
            moviesList.appendChild(row);
        });
    }

    // Función para agregar una nueva película
    async function addMovie(title) {
        if (!title) return;
        
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title })
            });
            
            if (!response.ok) throw new Error('Error al agregar película');
            
            const newMovie = await response.json();
            loadMovies(); // Recargar lista
            newMovieInput.value = ''; // Limpiar input
        } catch (error) {
            console.error('Error:', error);
            alert('Error al agregar película');
        }
    }

    // Función para eliminar una película
    async function deleteMovie(id) {
        if (!confirm('¿Estás seguro de que quieres eliminar esta película?')) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Error al eliminar película');
            
            loadMovies(); // Recargar lista
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar película');
        }
    }

    // Función para obtener una película aleatoria
    async function getRandomMovie() {
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error('Error al cargar películas');
            
            const movies = await response.json();
            if (movies.length === 0) {
                movieTitle.textContent = 'No hay películas en la lista';
                movieTitle.classList.remove('hidden');
                return;
            }
            
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            // movieTitle.textContent = randomMovie.title;
            console.log(randomMovie.title);
            
            movieTitle.textContent = randomMovie.title;
            movieTitle.classList.add('visible');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al generar película aleatoria');
        }
    }

    // Event Listeners
    addMovieBtn.addEventListener('click', () => {
        const title = newMovieInput.value.trim();
        addMovie(title);
    });
    
    newMovieInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const title = newMovieInput.value.trim();
            addMovie(title);
        }
    });
    
    btnGenerar.addEventListener('click', getRandomMovie);
    
    btnAgregar.addEventListener('click', () => {
        document.querySelector('.second-section').scrollIntoView({ behavior: 'smooth' });
    });
});