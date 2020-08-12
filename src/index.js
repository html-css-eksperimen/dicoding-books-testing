/* jangan ubah kode di bawah ini ya! */
import 'regenerator-runtime';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import main from './scripts/main';
import { URL_BOOKDICO, URL_ADDBOOKDICO } from './scripts/config';

main();

const getDataBookList = () => {
    // Ambil daftar buku
    const xhrReq = new XMLHttpRequest();

    xhrReq.addEventListener('load', (event) => {
        console.log('response request', event.target);
        console.log(JSON.parse(event.target.responseText));
    });

    xhrReq.addEventListener('error', (event) => {
        console.log(event);
    });

    xhrReq.addEventListener('abort', (event) => {
        console.log(event);
    });

    xhrReq.responseType = 'text';
    xhrReq.open('GET', URL_BOOKDICO);
    xhrReq.send();
};

// getDataBookList();

const addDataBookList = () => {
    const xhrReq = new XMLHttpRequest();

    xhrReq.addEventListener('load', (event) => {
        const { status, responseText } = event.target;

        if (status === 200) {
            console.log('response POST', responseText);
            console.log(JSON.parse(responseText));
        } else {
            console.log('Error response POST', status);
        }
    });

    xhrReq.addEventListener('error', (event) => {
        console.log(event);
    });

    xhrReq.addEventListener('abort', (event) => {
        console.log(event);
    });

    const book = {
        id: 13,
        title: 'Ekspektasi',
        author: 'Ocan',
    };

    xhrReq.responseType = 'text';
    xhrReq.open('POST', URL_ADDBOOKDICO);
    xhrReq.setRequestHeader('Content-Type', 'application/json');
    xhrReq.setRequestHeader('X-Auth-Token', '12345');
    xhrReq.send(JSON.stringify(book));
};

setTimeout(() => {
    // addDataBookList();
}, 3000);
