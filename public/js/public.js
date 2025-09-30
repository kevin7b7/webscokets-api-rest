
function renderTickets( tickets = [] ){

    for(let i=0; i<tickets.length; i ++){
        
        if( i >= 4) break;


        const ticket = tickets[i];
        if( !ticket ) continue;

        let lblTicket = document.querySelector(`#lbl-ticket-0${i+1}`);
        let lblDesk = document.querySelector(`#lbl-desk-0${i+1}`);

        lblTicket.innerHTML = `Ticket ${tickets[i].number}`;
        lblDesk.innerHTML = tickets[i].handleAtDesk;

    }

}


const getLastTicketsWorkingOn = async() => {


    const tickets = await fetch('http://localhost:3000/api/ticket/working-on')
    .then( resp => resp.json());

    renderTickets( tickets );

}




function connectToWebSockets() {

  const socket = new WebSocket( 'ws://localhost:3000/ws' );

  socket.onmessage = ( event ) => {

    const { type, payload } = JSON.parse( event.data );
    if( type === 'on-working-changed'){
        console.log( "entro" + type);
        renderTickets(payload);
    }

   

  };

  socket.onclose = ( event ) => {
    console.log( 'Connection closed' );
    setTimeout( () => {
      console.log( 'retrying to connect' );
      connectToWebSockets();
    }, 1500 );

  };

  socket.onopen = ( event ) => {
    console.log( 'Connected' );
  };

}

getLastTicketsWorkingOn();
connectToWebSockets();



