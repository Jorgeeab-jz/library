/////////////////////////////////////////////////////////////////////
const firebaseConfig = {
    apiKey: "AIzaSyBKruvlRxsBarH69hSWr-HBp3MdcuNXQLM",
    authDomain: "library-65349.firebaseapp.com",
    databaseURL: "https://library-65349.firebaseio.com",
    projectId: "library-65349",                                      //Firebase 
    storageBucket: "library-65349.appspot.com",
    messagingSenderId: "601379055694",
    appId: "1:601379055694:web:488e24f4d2f1ee3d0e7b1f",
    measurementId: "G-NT1Z1MYNN3"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const dbLibrary = firebase.database();
const booksStorage = dbLibrary.ref().child('books');
/////////////////////////////////////////////////////////////////////
let fullLibrary = [];
let newBook;
const defaultLibrary = [
    {
        title: 'Eloquent JavaScript: A Modern Introduction to Programming',
        author: 'Marijn Haverbeke',
        pages: 227,
        read: false
    },
    {
        title: 'JavaScript: The Good Parts',
        author: 'Douglas Crockford',
        pages: 174,
        read: false
    },
    {
        title: "You Don't Know JS: Scope & Closures",
        author: 'Kyle Simpson',
        pages: 105,
        read: false
    }
];
const modal = document.getElementById('modal');
const container = document.querySelector('.book-container');
const sumbitBtn = document.getElementById('book-submit');
const titleInput = document.getElementById('book-title');
const authorInput = document.getElementById('book-author');
const pagesNumber = document.getElementById('book-pages');
const bookSubmit = document.getElementById('book-submit');
const readCheck = document.getElementById('yes');
const newBtn = document.getElementById('new-btn');

class Book { //Books constructor
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function clearInput(){
    titleInput.value = '';
    authorInput.value = '';
    pagesNumber.value = '';
}


function getNewBook(){
    if(titleInput.value  == '' || authorInput.value == '' || pagesNumber.value == '' ) {
        alert('Please fill the required info before submitting your book.');
        return false;
    }else{
        let title = titleInput.value;
        let author = authorInput.value;
        let pages = pagesNumber.value;
        let read = readCheck.checked;
        newBook = new Book(title,author,pages,read);
        return true;
    }
}

function addBookToLib(){
    getNewBook();
    
    if(getNewBook){
        let libUpdate = fullLibrary.push(newBook);
        booksStorage.set(fullLibrary);
    }
    clearInput();
    drawBooks();
    modal.style.display = 'none';
}

function syncLibrary(){
    booksStorage.once('value', snap => {
        if(snap.exists() == false){
            booksStorage.set(defaultLibrary);
            fullLibrary = defaultLibrary;
        }else{
            fullLibrary = snap.val();
        }
    })
}

function drawBooks(){
    container.innerHTML = '';
    for(i=0;i<fullLibrary.length;i++){
        
        if(fullLibrary[i] !== undefined){
            let cover = document.createElement('div');
            cover.classList.add('book');
            
            let title = document.createElement('h2');
            title.innerText = fullLibrary[i].title;
            
            let separator = document.createElement('h3');
            separator.textContent = 'by'

            let author = document.createElement('h3');
            author.textContent = fullLibrary[i].author;

            let pages = document.createElement('h4');
            pages.textContent = `${fullLibrary[i].pages} pages`;

            let readBtn = document.createElement('button');
            fullLibrary[i].read ? readBtn.textContent = 'Already read' : readBtn.textContent = 'Not read yet';
            readBtn.classList.add('read-btn');
            readBtn.setAttribute('id', `${i}`)

            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.setAttribute('id', `${i}`)

            cover.append(title,separator,author,pages,readBtn,deleteBtn);
            container.appendChild(cover);

            title.addEventListener('click', () => {
                let query = title.textContent.split(' ');
                let queryJoin = query.join('+');
                window.open(`http://www.google.com/search?q=${queryJoin}`);
            })

            readBtn.addEventListener('click', (e) => {
                let id = Number(e.target.getAttribute('id'));
                if(fullLibrary[id].read){
                    fullLibrary[id].read = false;
                    readBtn.textContent = 'Not read yet';
                }else{
                    fullLibrary[id].read = true;
                    readBtn.textContent = 'Already read'
                }
                booksStorage.set(fullLibrary);
            })
            deleteBtn.addEventListener('click', (e) => {
                let id = Number(e.target.getAttribute('id'));
                fullLibrary.splice(id,1);
                booksStorage.set(fullLibrary);
                drawBooks()
            })
        }
    }
}

/////////////////////////////////////////////////////////////////////
newBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

document.addEventListener('click', (e) => {                //Buttons functionality
    if(e.target == modal){
        modal.style.display = 'none';
    }
})

sumbitBtn.addEventListener('click', addBookToLib);

/////////////////////////////////////////////////////////////////////

syncLibrary()

setTimeout(function(){                                   //Called functions at start
drawBooks();
},2000);