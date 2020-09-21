const firebaseConfig = {
    apiKey: "AIzaSyBKruvlRxsBarH69hSWr-HBp3MdcuNXQLM",
    authDomain: "library-65349.firebaseapp.com",
    databaseURL: "https://library-65349.firebaseio.com",
    projectId: "library-65349",
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
const titleInput = document.getElementById('book-title');
const authorInput = document.getElementById('book-author');
const pagesNumber = document.getElementById('book-pages');
const bookSubmit = document.getElementById('book-submit');
const readCheck = document.getElementById('yes');
const newBtn = document.getElementById('new-btn');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function getNewBook(){
    if(titleInput.value  == '' || authorInput.value == '' || pagesNumber.value == '' ) {
        alert('Please fill the required info before submitting your book.');
        return;
    }
}

function addBookToLib(){
    
    booksStorage.once('value', snap => {
        if(snap.exists() == false){
            booksStorage.set(defaultLibrary);
            fullLibrary = defaultLibrary;
        }else{
            fullLibrary = snap.val();
            let libUpdate = fullLibrary.push(newBook);
            booksStorage.set(fullLibrary);
        }
    })
}








newBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

document.addEventListener('click', (e)=>{
    if(e.target == modal){
        modal.style.display = 'none';
    }
})