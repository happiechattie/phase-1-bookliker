document.addEventListener("DOMContentLoaded", function(e) {

    let currentUser =         {
        "id": 10,
        "username": "macejkovic"
      }

    function listBooks(){
        fetch('http://localhost:3000/books')
        .then(r => r.json())
        .then(data => {
            for (let book of data) {
                const bookE = document.createElement('li');
                bookE.innerText = book.title;
                document.getElementById('list').append(bookE);
                addDetailFunc(book, bookE);
            }
        })
    }

    listBooks();

    function addDetailFunc(book, bookE){
        bookE.addEventListener('click', e => {
            document.getElementById('show-panel').innerText = '';
            const thumbnailE = document.createElement('img');
            thumbnailE.src = book.img_url;
            const descriptionE = document.createElement('p');
            descriptionE.innerText = book.description;
            const userListE = document.createElement('ul');
            userListE.id = 'user-list';
            for (let user of book.users){
                const userE = document.createElement('li');
                userE.innerText = user.username;
                userListE.append(userE);
            }
            document.getElementById('show-panel').append(thumbnailE, descriptionE, userListE);
            addLikeBookButton(book, bookE);
        })
    }

    function addLikeBookButton(book, bookE){

        const likeBtn = document.createElement('button');
        likeBtn.innerText = 'LIKE';

        const id = book.id;

        document.getElementById('show-panel').append(likeBtn);

        let userL = [];

        likeBtn.addEventListener('click', e => {
            fetch('http://localhost:3000/books/' + id)
            .then(r => r.json())
            .then(data => {
                userL = data.users;
                userL.push(currentUser);
            }
                )
            .then(() => {
                fetch('http://localhost:3000/books/' + id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        "users":
                            userL
                    }),
                })
                .then(r => r.json())
                .then(data => {
                    const userElement = document.createElement('li');
                    userElement.innerText = currentUser.username;
                    likeBtn.parentNode.querySelector('ul').append(userElement);
                })
            })
        })
    }
})