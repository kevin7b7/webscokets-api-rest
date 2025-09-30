


const baseUrl = 'http://localhost:3000/api/ticket'



const createTicket = async() => {
    const url = baseUrl;
    await fetch(url, { method: 'post'})
    .then( res => res.json())
    .then( response => console.table( response ) )
    .then( lastTicket() )

}

const lastTicket = async() => {

    const url = `${ baseUrl }/last`;
    const lasTicketElem = document.querySelector('#lbl-new-ticket');
    console.log( lasTicketElem );

    await fetch(url, { method: 'get'})
    .then( res => res.json())
    .then( response => lasTicketElem.innerHTML = response);

}

lastTicket();