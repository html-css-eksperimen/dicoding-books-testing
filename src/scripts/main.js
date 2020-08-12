import {
    URL_BOOKDICO,
    URL_ADDBOOKDICO,
    getUpdateUrl,
    getDeleteUrl,
} from './config';

function main() {
    /*
        jangan ubah kode di bawah ini ya!
    */

    const showResponseMessage = (
        message = 'Check your internet connection',
    ) => {
        // eslint-disable-next-line no-alert
        alert(message);
    };

    const renderAllBooks = (books) => {
        const listBookElement = document.querySelector('#listBook');
        listBookElement.innerHTML = '';

        books.forEach((book) => {
            listBookElement.innerHTML += /* html */ `
            <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                <div class="card">
                    <div class="card-body">
                        <h5>(${book.id}) ${book.title}</h5>
                        <p>${book.author}</p>
                        <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
                    </div>
                </div>
            </div>
        `;
        });

        const buttons = document.querySelectorAll('.button-delete');
        buttons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const bookId = event.target.id;
                // eslint-disable-next-line no-use-before-define
                removeBook(bookId);
            });
        });
    };

    const getBook = () => {
        // tuliskan kode di sini!
        fetch(URL_BOOKDICO, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => {
                if (resp.status === 200) {
                    return resp.json();
                }
                throw new Error(`Error request ${resp.status}`);
            })
            .then((respJson) => {
                if (!respJson.error) {
                    renderAllBooks(respJson.books);
                } else {
                    console.log(
                        'Error ambil buku',
                        respJson.error,
                        respJson.message,
                    );
                    showResponseMessage(respJson.message);
                }
            })
            .catch((error) => {
                console.log(error);
                showResponseMessage(error);
            });
    };

    const getBookAsync = async () => {
        // tuliskan kode di sini!
        try {
            const responses = await fetch(URL_BOOKDICO, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (responses.status === 200) {
                const respJson = responses.json();

                if (!respJson.error) {
                    renderAllBooks(respJson.books);
                } else {
                    console.log(
                        'Error ambil buku',
                        respJson.error,
                        respJson.message,
                    );
                    showResponseMessage(respJson.message);
                }
            }
        } catch (err) {
            console.log(err);
            showResponseMessage(err);
        }
    };

    const insertBook = (book) => {
        // tuliskan kode di sini!
        const insertReq = new XMLHttpRequest();

        insertReq.addEventListener('load', (event) => {
            const { status, responseText } = event.target;
            const responseJson = JSON.parse(responseText);

            if (status === 200 && !responseJson.error) {
                getBook();
            }

            showResponseMessage(responseJson.message);
        });

        insertReq.addEventListener('error', (event) => {
            console.log(event.target);
            showResponseMessage('Gagal memasukkan data');
        });

        insertReq.addEventListener('abort', (event) => {
            console.log(event.target);
            showResponseMessage('Request dibatalkan');
        });

        insertReq.responseType = 'text';
        insertReq.open('POST', URL_ADDBOOKDICO);

        // Mementapkan properti Content-Type dan X-Auth-Token pada Header request
        insertReq.setRequestHeader('Content-Type', 'application/json');
        insertReq.setRequestHeader('X-Auth-Token', '12345');

        // Mengirimkan request dan menyisipkan JSON.stringify(book) pada body
        insertReq.send(JSON.stringify(book));
    };

    const updateBook = (book) => {
        // tuliskan kode di sini!
        const urlUpdate = getUpdateUrl(book);

        const reqUpdate = new XMLHttpRequest();
        reqUpdate.addEventListener('load', (event) => {
            console.log(event.target);

            const { status, responseText } = event.target;
            const responseJson = JSON.parse(responseText);

            if (status === 200 && !responseJson.error) {
                getBook();
            } else {
                console.log('Error ambil buku', status);
            }

            showResponseMessage(responseJson.message);
        });

        reqUpdate.addEventListener('error', (event) => {
            console.log(event.target, 'Gagal mengirim data');
            showResponseMessage('Gagal mengirim data');
        });

        reqUpdate.addEventListener('abort', (event) => {
            console.log(event.target);
            showResponseMessage('Request dibatalkan');
        });

        reqUpdate.responseType = 'text';
        reqUpdate.open('PUT', urlUpdate);

        // Mementapkan properti Content-Type dan X-Auth-Token pada Header request
        reqUpdate.setRequestHeader('Content-Type', 'application/json');
        reqUpdate.setRequestHeader('X-Auth-Token', '12345');

        // Mengirimkan request dan menyisipkan JSON.stringify(book) pada body
        reqUpdate.send(JSON.stringify(book));
    };

    const removeBook = (bookId) => {
        // tuliskan kode di sini!
        const reqXhr = new XMLHttpRequest();

        reqXhr.addEventListener('load', (event) => {
            const { status, responseText } = event.target;
            const responseJson = JSON.parse(responseText);

            if (status === 200 && !responseJson.error) {
                getBook();
            }

            showResponseMessage(responseJson.message);
        });

        reqXhr.addEventListener('error', (event) => {
            console.log(event.target);
            showResponseMessage('Gagal menghapus data');
        });

        reqXhr.addEventListener('abort', (event) => {
            console.log(event.target);
            showResponseMessage('Permintaan hapus dibatalkan');
        });

        reqXhr.responseType = 'text';
        reqXhr.open('DELETE', getDeleteUrl(bookId));
        reqXhr.setRequestHeader('Content-Type', 'application/json');
        reqXhr.setRequestHeader('X-Auth-Token', '12345');

        reqXhr.send();
    };

    document.addEventListener('DOMContentLoaded', () => {
        const inputBookId = document.querySelector('#inputBookId');
        const inputBookTitle = document.querySelector('#inputBookTitle');
        const inputBookAuthor = document.querySelector('#inputBookAuthor');
        const buttonSave = document.querySelector('#buttonSave');
        const buttonUpdate = document.querySelector('#buttonUpdate');

        buttonSave.addEventListener('click', function () {
            const book = {
                id: Number.parseInt(inputBookId.value, 10),
                title: inputBookTitle.value,
                author: inputBookAuthor.value,
            };
            insertBook(book);
        });

        buttonUpdate.addEventListener('click', function () {
            const book = {
                id: Number.parseInt(inputBookId.value, 10),
                title: inputBookTitle.value,
                author: inputBookAuthor.value,
            };

            updateBook(book);
        });

        // Ambil daftar buku
        getBook();
    });
}

export default main;
