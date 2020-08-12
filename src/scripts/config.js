const URL_JSONPLACEHOLDER = 'https://jsonplaceholder.typicode.com/posts';

const BASE_URL = 'https://web-server-book-dicoding.appspot.com';
const URL_BOOKDICO = `${BASE_URL}/list`;
const URL_ADDBOOKDICO = `${BASE_URL}/add`;

const getUpdateUrl = (book) => {
    return `${BASE_URL}/edit/${book.id}`;
};

const getDeleteUrl = (bookId) => {
    return `${BASE_URL}/delete/${bookId}`;
};

export {
    URL_BOOKDICO,
    URL_JSONPLACEHOLDER,
    URL_ADDBOOKDICO,
    BASE_URL,
    getUpdateUrl,
    getDeleteUrl,
};
