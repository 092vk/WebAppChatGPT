import bot from './assets/bot.svg';
import user from './assets/user.svg'

//so lets get our elements form the HTML

const form =document.querySelector("form");
//since we have only one form in our html , we dont have to mention class or id 
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

//we are writing a function that will create a effect of loading , we will create a empty string , and then dots to it , once the dots hit certain number we will agian empty it , creating a effect of loading 
function loader(element){
  element.textContent="";

  loadInterval = setInterval( () => {
    element.textContent +='.';

    if(element.textContent === "....."){
      element.textContent="";
    }
  },300)
}


//chatgpt can and usually generates the whole text in one go , but to ensure theat the users who are using the chatGPT , think that the ai is also thinking we give its response a effect where each letter is typed one by one 
//function for typing letter effect

function typeText (element, text){
  let index =0;

  let interval = setInterval(()=>{
    if(index < text.length){
      element.innerHTML += text.charAt(index);
      index++;
    }    
    else{
      clearInterval(interval);
    }
  },20)
}

//we have to generate a unique id for each answer , to generate unique id in any programming language we use the time stamp
function generateUniqueId() {
  const timeStamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimal = randomNumber.toString(16);

  return `id-${timeStamp}-${hexadecimal}`;
}


//now we want the question and answer to be in different strips , so that we can gain experience of real gept , dark stripe for question and light stripe for answer and it all should happen one below the other 

function chatStripe (isAi,value,uniqueId){
  return(
    `
    <div class="wrapper" ${isAi && 'ai'}>
      <div class="chat">
        <div className ="profile">
          <img
            src="${isAi ? bot : user}"
            alt="${isAi ? 'bot' : "user"}" 
          />
        </div>
        <div class="message" id=${uniqueId}>${value}</div>
      </div>
    </div>
    `
  )
}

const handleSubmit = async (e) =>{
  e.preventDefault();

  const data = new FormData(form);

  //user's chatstripe
  chatContainer.innerHTML += chatStripe(false ,data.get("prompt"));

  form.reset();

  //bot's chatstripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true , " ",uniqueId);

  //this has been done so that we our scroll move with the answers 
  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);

}

form.addEventListener('submit',handleSubmit);

//as developers and as a default also we have been accustomed to take the enter key as a key which submits the form , this code is for that , so originally we wrote code for clicking of submit button which would submit the code and perform functions when submited but now we are writing code for if enter key is pressed we will also submit the form , the enter key is 13 in ASCII
form.addEventListener('keyup',(e)=>{
  //13 is ASCII value of enter key
  if(e.keyCode === 13) {
    handleSubmit(e);
  }
})


