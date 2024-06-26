document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const bookList = document.getElementById('bookList');
    const bookDetail = document.getElementById('bookDetail');
    const favoriteList = document.getElementById('favoriteList');

    let books = [];
    let favoriteBooks = JSON.parse(localStorage.getItem('favoriteBooks')) || [];

    fetch('all.json')
        .then(response => response.json())
        .then(data => {
            books = data;
        })
        .catch(error => console.error('Error fetching book data:', error));

    const categoryButtons = document.querySelectorAll('.category_pic button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.id;
            if (category === 'All') {
                displayBooks(books);
            } else {
                displayBooksByCategory(category);
            }
        });
    });

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book => book.name.toLowerCase().includes(query) || book.author.toLowerCase().includes(query));
        displayBooks(filteredBooks);
    });

    function displayBooks(bookArray) {
        bookList.innerHTML = '';
        bookArray.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <img src="${book.image}" alt="${book.name}">
                <div>
                    <h4>${book.name}</h4>
                    <p>${book.author}</p>
                </div>
                <button onclick="viewDetails(${book.id})">View Details</button>
                <button onclick="toggleFavorite(${book.id})">${favoriteBooks.includes(book.id) ? 'Remove from Favorites' : 'Add to Favorites'}</button>
            `;
            bookList.appendChild(bookItem);
        });
    }

    function displayBooksByCategory(category) {
        const filteredBooks = books.filter(book => book.type.toLowerCase() === category.toLowerCase());
        displayBooks(filteredBooks);
    }

    window.viewDetails = (bookId) => {
        const book = books.find(b => b.id === bookId);
        bookDetail.innerHTML = `
            <img src="${book.image}" alt="${book.name}">
            <h2>${book.name}</h2>
            <h3>by ${book.author}</h3>
            <p><strong>Publisher:</strong> ${book.publish_details.publisher}</p>
            <p><strong>Year:</strong> ${book.publish_details.year}</p>
            <p><a href="${book.pdf_link}" target="_blank">Read PDF</a></p>
        `;
    };

    window.toggleFavorite = (bookId) => {
        if (favoriteBooks.includes(bookId)) {
            favoriteBooks = favoriteBooks.filter(id => id !== bookId);
        } else {
            favoriteBooks.push(bookId);
        }
        localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
        displayFavorites();
        displayBooks(books);
    };

    function displayFavorites() {
        favoriteList.innerHTML = '';
        const favoriteBookItems = books.filter(book => favoriteBooks.includes(book.id));
        favoriteBookItems.forEach(book => {
            const listItem = document.createElement('li');
            listItem.textContent = book.name;
            favoriteList.appendChild(listItem);
        });
    }

    displayFavorites();
});
