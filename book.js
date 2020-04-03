const formContainer = document.getElementById("formContainer");
const submit = document.getElementById("submit");

var myLibrary = [];
var count = 0;
//defines the book object
function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,

    this.change = function(){
        if (this.read == "Yes"){
            this.read = "No";
        }
        else if (this.read == "No"){
            this.read = "Yes";
        }
    }
    this.info = function(){
        return `Title: ${title}, author: ${author}, page number: ${pages}, read status: ${this.read}`;
    }
}


const container = document.querySelector("#container");
//adds a button that brings up the forms to add books
const addBook = document.querySelector("#add");
addBook.addEventListener("click",  function() {
    formContainer.style.display = "inline";
});
const show = document.querySelector("#show");
show.addEventListener("click", function(){
    render(myLibrary);
});
function render(lib){
    container.innerHTML= "";
    lib.forEach((book, index) => {
        let content = document.createElement("p");
        content.id = index;
        content.textContent = `${index + 1}: ${book.info()} `;
        let remove = document.createElement("button");
        remove.textContent = "remove";
        let change = document.createElement("button");
        change.textContent = "Change read";
        change.id = index;
        container.appendChild(content);
        content.appendChild(remove);
        content.appendChild(change);
        remove.addEventListener("click", function(e){   
            console.log(e.id);
            console.log(e.target.id)
            myLibrary.splice(content.id, 1);         
            render(lib);
        });
        change.addEventListener("click", function(e){
            console.log(e)
            myLibrary[content.id].change();
            render(lib);
        });
    });

}
submit.addEventListener("click", (e)=> {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read");
    if(read.checked){
        read = "Yes";
    }
    else {
        read = "No";
    }
    if(name == "" || author == "" || pages == "") {
        alert("Fill out everything!");
        return false;
    }
    else {
        let thisBook = new Book(name, author, pages, read);
        myLibrary.push(thisBook);
        formContainer.style.display = "none";
        document.getElementById("name").value = "";
        document.getElementById("author").value = "";
        document.getElementById("pages").value = "";
    }
    
    render(myLibrary);
});
//sample books
var book1 = new Book ("Crime and punishment", "Fyodor Dostoyevksy", 671, "Yes");
var book2 = new Book ("A brief history of time", "Stephen Hawking", 212, "No");

myLibrary.push(book1);
myLibrary.push(book2);