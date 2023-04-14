let userName = '';
let messages = [];
let user ='';
let load;
axios.defaults.headers.common['Authorization'] = '2GkGoRP9ETlDO5k8paZaQY5V';

chooseName();

function pagestart() {
const promisse = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
promisse.then(processMessages)

}
function processMessages(response){
    console.log(response);
    
    messages = response.data;

    renderMessages();
}
// setInterval(pagestart(), 3000);
// setInterval(online(), 5000);

function chooseName() {
    let promptname = prompt('digite seu nome:');
    const objName = {
        name: promptname
    }
    user = promptname;
    console.log(objName);
    const promisse = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', objName);

    promisse.then(pagestart());
    promisse.catch(failure);

}


// function logoff() {
//     load = window.location.reload();
// }

// function online() {
//     const stillon = {
//         name: user
//     }

//     const promisse = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', stillon);

//     promisse.then( continueon );
//     promisse.catch( logoff );
// }


function renderMessages() {
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
                <i>(${message.time})</i>  <strong>${message.from}</strong> para <strong>${message.to}</strong>: 
            </li>`
        }
    }
    console.log(ulMessages)
    
}

function sendMessage(){
    // pegar os dados que foram digitados pelo usuario nos inputs e textareas
    const messagefield = document.querySelector('.text');
    const text = messagefield.value
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
    console.log(newmessage)
  
    console.log('vai enviar a rmensagem');

    const promisse = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', newmessage);    
    // sucesso!
    promisse.then( renderMessages ); // agendando a execucao da funcao quando a resposta chegar no meu computador  
    messagefield.value ='';
    //promisse.catch(error);
        
}

function error(response) {
    console.log(response)
}

function success(response) {
    console.log(response);
    console.log(response.data);
}
function failure(error) {
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
