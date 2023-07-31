// Book Class
class Book {
    constructor(title, author, pages, status){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

// Local Storage Class
class Store {

    static getBooks() {
        let books;
        localStorage.getItem('books') === null ? books = [] : books = JSON.parse(localStorage.getItem('books'));
        
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);

        console.log(book)

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(bookTitle) {
        const books = Store.getBooks();

        books.forEach((book, index) => { book.title === bookTitle ? books.splice(index, 1) : books});
        localStorage.setItem('books', JSON.stringify(books));
    }

    static updateBookStatus(bookTitle, status) {
        const books = Store.getBooks();

        books.forEach((book) => { 
            if(book.title !== bookTitle) return;
            book.status = status;
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

}

// Library UI Class : Handles UI 
class UI {

    static displayBooks() {

        const books = Store.getBooks()
        UI.usageTip();
        books.forEach((book)=> UI.addBookToLibrary(book));
    }

    static activateBtn(){
        function removeTransition(e){   // Function with (e)event info as argument.
            if(e.propertyName !== 'transform') return; // if
            e.target.classList.remove('clicked');      // else
        }

        const actionBtns = document.querySelectorAll('button');
        actionBtns.forEach(btn => btn.addEventListener('transitionend', removeTransition));
    }

    static usageTip(){
        const main = document.querySelector('main');
        const usageTipPrompt = document.querySelector('.usage-tip');

        if(main.children.length !== 0) {
            main.classList.add('usage-tip-active');
            usageTipPrompt.classList.add('animated', 'spaceInLeft');
            usageTipPrompt.classList.remove('disabled');

        } if(main.children.length > 1 ) {
            main.classList.remove('usage-tip-active');
            usageTipPrompt.classList.remove('spaceInLeft');
            usageTipPrompt.classList.add('disabled');
        }
    }

    static tryBooks(){
        const sampleBooks = [
            {
                title: 'Intelligent Design',
                author: 'William Dembski',
                pages: 312,
                status: false
            },
            {
                title: 'Atomic Habits',
                author: 'James Clear',
                pages: 288,
                status: false
            },
            {
                title: 'The Alchemist',
                author: 'Paulo Coelho',
                pages: 208,
                status: false
            },
            {
                title: 'Eat That Frog',
                author: 'Brian Tracy',
                pages: 144,
                status: false
            }
        ]
        const books = sampleBooks; 

        setTimeout(()=>{books.forEach((book)=> {
            UI.addBookToLibrary(book); 
            Store.addBook(book)});
        }, 200);
    }

    static addBookToLibrary(book){
        const librarySection = document.querySelector('main');
             
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card', 'animated', 'vanishIn');

        if(book.status === true){ 
            book.status = 'Read'; 
            book.process = 'success';
            book.summary = 'Completed';
        }
        else { 
            book.status = 'Not read'; 
            book.process = 'failure'; 
            book.summary = 'On progress';
        };

        bookCard.innerHTML =  `
        <div class="description">
            <h2>${book.title}</h2>
            <h3>by ${book.author}</h3>
            <p>Pages: ${book.pages}</p>
        </div>
        <div class="action-btns">
            <button class="read read-status ${book.process}">${book.status}</button>
            <button class="delete">Delete</button>
        </div>
        <div class="status">${book.summary}</div>`;

        librarySection.appendChild(bookCard);

        UI.activateBtn();
        UI.usageTip();

        setTimeout(()=>{bookCard.classList.remove('vanishIn');}, 2000);
    }

    static removeBook(element){
       if(!element.classList.contains('delete')) return;
       element.classList.add('clicked');
       setTimeout(()=>{element.parentElement.parentElement.classList.add('vanishOut');}, 500)
       setTimeout(()=>{element.parentElement.parentElement.remove(); UI.usageTip();}, 1000);
       const bookTitle = element.parentElement.parentElement.children[0].children[0].textContent;

       Store.removeBook(bookTitle);
    }

    static clearFields(){
        const form = document.querySelectorAll('input');
        form.forEach(el => el.type != 'checkbox' ? el.value = '' : el.checked = false);
    }

    static updateBook(element) {
        const bookTitle = element.parentElement.parentElement.children[0].children[0].textContent;

        if(!element.classList.contains('read-status')) return;
        element.classList.add('clicked');

        if(element.classList.contains('read-status') && element.textContent == 'Not read'){
            element.textContent = 'Read'; 
            element.parentElement.parentElement.children[2].textContent = 'Completed';
            element.classList.add('success')
            element.classList.remove('failure');

            Store.updateBookStatus(bookTitle, true);
    
        }
        else if (element.classList.contains('read-status') &&  element.textContent == 'Read'){
            element.textContent = 'Not read';
            element.parentElement.parentElement.children[2].textContent = 'On progress';
            element.classList.add('failure')
            element.classList.remove('success');

            Store.updateBookStatus(bookTitle, false);
        }
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add Books to Library
document.querySelector('#book-form').addEventListener('submit', (e)=>{
    e.preventDefault();

    // Get form values 
    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          pages = document.querySelector('#pages').value,
          submitBtn = document.querySelector('.submit-btn'),
          status = document.querySelector('.read-status-determiner').checked;

    submitBtn.classList.add('clicked');

    // Unchecks the checkbox for close the add-book panel
     document.querySelector("#togglerCheckbox").checked = false; 

    setTimeout(()=>{
        const book = new Book(title, author, pages, status);
        UI.addBookToLibrary(book);
        Store.addBook(book);
    }, 200)

    UI.clearFields();
});

// Event: Updating Book's status
document.querySelector('main').addEventListener('click', (e)=>{UI.removeBook(e.target); UI.updateBook(e.target)});

document.querySelector('.try-books').addEventListener('click', (e)=>{UI.tryBooks();});