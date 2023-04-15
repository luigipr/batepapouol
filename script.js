let userName = '';
let messages = [];
let user ='';
let load;
let objName = {};
axios.defaults.headers.common['Authorization'] = '2GkGoRP9ETlDO5k8paZaQY5V';

pagestart();

function pagestart() {
const promisse = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
promisse.then(processMessages);

}
function processMessages(response){
    //console.log(response);
    
    messages = response.data;

    renderMessages(messages);
}

//setInterval(pagestart, 3000);


function chooseName() {
    let promptname = prompt('digite seu nome:');
    objName = {
        name: promptname
    }
    user = promptname;
    console.log(objName);
    const promisse = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', objName);

    promisse.then(pagestart);
    promisse.catch(failure);

}

chooseName()

setInterval( stillon, 5000 );

function stillon() {
    const promisse = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', objName);
    console.log(promisse)
     promisse.then();
    promisse.catch( logoff );
}


function logoff() {
    window.location.reload();
}


function renderMessages(messages) {
    const ulMessages = document.querySelector('.messages')
    ulMessages.innerHTML = '';

    for( let i = 0; i < messages.length; i++){
        // pergar mensagem por mensagem
        let message = messages[i];    
        // criar um elemento <li>] e adicionar no meu elemento <ul>
    //     from: "João",
	// 	to: "Todos",
	// 	text: "entra na sala...",
	// 	type: "status",
	// 	time: "08:01:17"
         if (message.type === 'status') {
         ulMessages.innerHTML += `
             <li class='status-message' data-test="message">
                 <i>(${message.time})</i>  <strong>${message.from}</strong> entra na sala...
             </li>`
            } else {
            ulMessages.innerHTML +=  
            `<li class='message' data-test="message">
                <i>(${message.time})</i>  <strong>${message.from}</strong> para <strong>${message.to}</strong>: ${message.text} 
            </li>`
        }
    }
   // console.log(ulMessages);
    setInterval(pagestart(), 3000);    
}

function sendMessage(){
    // pegar os dados que foram digitados pelo usuario nos inputs e textareas
    const messagefield = document.querySelector('.text');
    const text = messagefield.value
    console.log(text)
    const today = new Date()
    const now = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // criar um novo objeto com os dados da receita
    const newmessage = {
        from: user,
	 	to: "Todos",
	 	text: text,
	 	type: "message",
	 	time: now
    };
    //console.log(newmessage)
  
    console.log('vai enviar a rmensagem');

    const promisse = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', newmessage);    
    // sucesso!
    promisse.then( pagestart ); // agendando a execucao da funcao quando a resposta chegar no meu computador  
    messagefield.value ='';
    //promisse.catch(error);
        
}

function error(response) {
    console.log(response)
}

function failure(error) {
    if (error.error === 400) {
        console.log('nome ja existe')
    }
    console.log('ocorreu um erro')
    chooseName();
}

// function answer(response) {
//     messages = response.data;
//     //renderMessages();
// }

const input = document.querySelector(".text");
// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    document.querySelector('.plane').click();
  }
});
