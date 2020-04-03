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
    //creating a table for better formatting
    let tableHeader = document.createElement("table");
    let th1 = document.createElement("th");
    th1.textContent = "Title";
    let th2 = document.createElement("th");
    th2.textContent = "Author";
    let th3 = document.createElement("th");
    th3.textContent = "Pages";
    let th4 = document.createElement("th");
    th4.textContent = "Read";
    container.appendChild(tableHeader);
    tableHeader.appendChild(th1);
    tableHeader.appendChild(th2);
    tableHeader.appendChild(th3);
    tableHeader.appendChild(th4);
    th1.style.width = "400px";
    th2.style.width = "200px";
    th3.style.width = "100px";
    th4.style.width = "75px";
    lib.forEach((book, index) => {
        let remove = document.createElement("button");
        remove.textContent = "Remove";
        let change = document.createElement("button");
        change.textContent = "Change read";
        let tr = document.createElement("tr");
        tr.id = index;
        for (let item in book){
            console.log(item);
            if (item != "change" && item != "info"){
                console.log(item);
                let content = document.createElement("td");
                content.textContent = myLibrary[index][item];
                tr.appendChild(content);
            }
        }
        tableHeader.appendChild(tr);
        remove.addEventListener("click", function(e){   
            myLibrary.splice(tr.id, 1);         
            render(lib);
        });
        change.addEventListener("click", function(e){
            myLibrary[tr.id].change();
            render(lib);
        });
        remove.className = "tableButtons";
        change.className = "tableButtons";
        tr.appendChild(remove);
        tr.appendChild(change);
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