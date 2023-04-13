let userName = '';
let messages = [];
axios.defaults.headers.common['Authorization'] = '2GkGoRP9ETlDO5k8paZaQY5V';

const promisse = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
promisse.then(processMessages)

function processMessages(response){
    console.log(response);
    
    messages = response.data;

    renderMessages();
}

function chooseName() {
    let promptname = prompt('digite seu nome:');
    const objName = {
        name: promptname
    }
    console.log(objName);
    const promisse = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', objName);

    promisse.then(success);
    promisse.catch(failure);

}


chooseName();

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
             <li class='status-message'>
                 <i>(${message.time})</i>  <strong>${message.from}</strong> entra na sala...
             </li>`
            } else {
            ulMessages.innerHTML +=  
            `<li class='message'>
                <i>(${message.time})</i>  <strong>${message.from}</strong> para <strong>${message.to}</strong>: 
            </li>`
        }
    }
    console.log(ulMessages)
    
}

function adicionarReceita(){


    // pegar os dados que foram digitados pelo usuario nos inputs e textareas
    const campoTitulo = document.querySelector('.nome-receita');
    const campoIngredientes = document.querySelector('.ingredientes-receita');
    const campoPreparo = document.querySelector('.modo-preparo-receita');

    // criar um novo objeto com os dados da receita
    const novaReceita = {
        titulo: campoTitulo.value,
        ingredientes: campoIngredientes.value,
        preparo: campoPreparo.value
    };

    // adicionar uma nova receita no array de receitas
    // receitas.push( novaReceita );

    // enviar a nova receita para ser salva no servidor
    // 1 - preciso de uma ferramenta para fazer tudo funcionar => axios!!!!

    // 2 - enviar a nova receita para o servidor e pegar a resposta
    
    console.log('vai enviar a receita');

    const promessa = axios.post('https://mock-api.driven.com.br/api/v2/tastecamp/receitas', novaReceita);    
    // sucesso!
    promessa.then( receberResposta ); // agendando a execucao da funcao quando a resposta chegar no meu computador  
    promessa.catch( deuErro ); // executa uma função se ocorrer algum erro, falha, etc! 
    console.log('receita foi enviada ao servidor');    

    // axios.get();
    

    renderizarReceitas();

}


function success(response) {
    console.log(response);
    console.log(response.data);
    const promisse = axios.get('https://mock-api.driven.com.br/api/vm/uol/participants');
    promisse.then( answer );
}
function failure(error) {
    console.log('ocorreu um erro')
    chooseName();
}

function answer(response) {
    messages = response.data;
    //renderMessages();
}


