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

        if (books && books.length > 0) {
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
        } else {
            listBookElement.innerHTML = '';
        }
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
            } else {
                throw new Error(`Error request ${responses}`);
            }
        } catch (err) {
            console.log(err);
            showResponseMessage(err);
        }
    };

    const insertBook = (book) => {
        // tuliskan kode di sini!
        fetch(URL_ADDBOOKDICO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': '12345',
            },
            body: JSON.stringify(book),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error('Gagal insert data', response.status);
            })
            .then((responseJson) => {
                if (responseJson.error) {
                    throw new Error(
                        'Gagal memasukkan data JSON',
                        responseJson.message,
                    );
                } else {
                    showResponseMessage(responseJson.message);
                    getBook();
                }
            })
            .catch((error) => {
                console.log(error);
                showResponseMessage(error.message);
            });
    };

    const updateBook = async (book) => {
        // tuliskan kode di sini!
        const urlUpdate = getUpdateUrl(book);
        const optionsFetch = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': '12345',
            },
            body: JSON.stringify(book),
        };

        try {
            const response = await fetch(urlUpdate, optionsFetch);
            let responseJson = {};
            if (response.status === 200) {
                responseJson = await response.json();
                if (!responseJson.error) {
                    showResponseMessage(responseJson.message);
                    getBook();
                } else {
                    throw new Error('Gagal memperbarui buku', response.status);
                }
            } else {
                throw new Error('Gagal memperbarui buku', response.status);
            }
        } catch (err) {
            console.log(err);
            showResponseMessage(err.message);
        }
    };

    const removeBook = async (bookId) => {
        // tuliskan kode di sini!
        const urlDelete = getDeleteUrl(bookId);
        const optionReq = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': '12345',
            },
        };

        try {
            const response = await fetch(urlDelete, optionReq);

            if (response.status === 200) {
                const responseJson = await response.json();

                if (!responseJson.error) {
                    showResponseMessage(responseJson.message);
                    getBookAsync();
                } else {
                    throw new Error('Gagal menghapus buku');
                }
            } else {
                throw new Error('Gagal menghapus buku');
            }
        } catch (err) {
            console.log(err);
            showResponseMessage(err.message);
        }
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
