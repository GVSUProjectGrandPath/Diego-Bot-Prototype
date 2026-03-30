function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const main = document.querySelector('main');

// CornerBot on/off btn
const botBtn = document.querySelector('.bot-btn');
const botContainer = document.querySelector('.bot-container');

botBtn.addEventListener('click', () => {
    botBtn.classList.toggle('active');
    botContainer.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!botContainer.contains(e.target) && !botBtn.contains(e.target)) {
    botBtn.classList.remove('active');
    botContainer.classList.remove('active');
  }
});

// Big Bot prompt and response function
const input = document.querySelector(".myInput");
const chatContainer = document.querySelector('.chats-container');
let active = false;

input.addEventListener("input", function () {
    const input = this;
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 100) + "px";
    input.style.overflowY = input.scrollHeight > 100 ? "auto" : "hidden";
});

input.addEventListener("keydown", async (e) => {
    // check if the key pressed is enter and shift is not pressed
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // prevent the default action of the Enter key
        const message = input.value.trim();
        if (!message) return; // if message is empty, do nothing
            input.value = "";
        //change the layout mode from default to active
        if (!active) { 
            active = true;
            chatContainer.classList.add('active');
            document.querySelector('.myInput').classList.add('active');
            document.querySelector('.askQuestion').remove();
        }

        const userChatDiv = document.createElement('div');
        userChatDiv.className = 'user-chat';
        userChatDiv.textContent = message;
        chatContainer.appendChild(userChatDiv);

        const responseDiv = document.createElement('div');
        responseDiv.className = 'bot-response';
        responseDiv.textContent = '...thinking...';
        chatContainer.appendChild(responseDiv);

        main.scrollTo({ top: main.scrollHeight, behavior: 'smooth' });

        fetch("https://test-render-1-hek9.onrender.com/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({message: message})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.message);
            responseDiv.innerHTML = DOMPurify.sanitize(data.message);
            //responseDiv.innerHTML = data.message;
            main.scrollTo({ top: main.scrollHeight, behavior: 'smooth' });
        })
        .catch(err => {
            responseDiv.textContent = 'Sorry, I am still learning and cannot answer that question yet.'; 
        })

    }
});

// Corner Bot prompt and response function
const input2 = document.querySelector(".bot-input");
const chatContainer2 = document.querySelector('.bot-chat');
const face = document.querySelector('.bot-btn');
const faces = ['faces/f2.png', 'faces/f3.png', 'faces/f4.png', 'faces/f5.png'];

input2.addEventListener("keydown", async (e) => {
    // check if the key pressed is enter and shift is not pressed
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // prevent the default action of the Enter key
        const message = input2.value.trim();
        if (!message) return; // if message is empty, do nothing
            input2.value = "";
        
        const userChatDiv = document.createElement('div');
        userChatDiv.className = 'user-chat';
        userChatDiv.textContent = message;
        chatContainer2.appendChild(userChatDiv);

        const responseDiv = document.createElement('div');
        responseDiv.className = 'bot-response';
        responseDiv.textContent = '...thinking...';
        chatContainer2.appendChild(responseDiv);
        
        document.querySelector('.bot-chat').scrollTo({ top: document.querySelector('.bot-chat').scrollHeight, behavior: 'smooth' });

        fetch("https://test-render-1-hek9.onrender.com/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({message: message})
        })
        .then(res => res.json())
        .then(async data => {
            console.log(data.message);
            responseDiv.innerHTML = DOMPurify.sanitize(data.message);
            //responseDiv.innerHTML = data.message;
            document.querySelector('.bot-chat').scrollTo({ top: document.querySelector('.bot-chat').scrollHeight, behavior: 'smooth' });
            face.src = faces[Math.floor(Math.random() * faces.length)];
            await sleep(2000);
            face.src = 'faces/f1.png';
        })
        .catch(err => {
            responseDiv.textContent = 'Sorry, I am still learning and cannot answer that question yet.'; 
        })
        
    }
});

//fun btns
const budgetBtn = document.querySelector('.budget-btn');
const purchaseBtn = document.querySelector('.purchase-btn');
const loanBtn = document.querySelector('.loan-btn');
const creditBtn = document.querySelector('.credit-btn');
const funBtn = document.querySelector('.fun-btn');

budgetBtn.addEventListener('click', () => {
    input.value = "What is the average cost of a car in the US?";
    input.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
});

purchaseBtn.addEventListener('click', () => {
    input.value = "What are some popular car models in the US?";
    input.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
});

loanBtn.addEventListener('click', () => {
    input.value = "What are the best car loan options available?";
    input.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
}); 

creditBtn.addEventListener('click', () => {
    input.value = "What are the best credit cards for car purchases?";
    input.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
});

funBtn.addEventListener('click', () => {
    input.value = "Give me a fun financial literacy fact!";
    input.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
});


//down btn
const downBtn = document.querySelector('.down-btn');

main.addEventListener('scroll', () => {
    if (main.scrollTop + main.clientHeight + 100< main.scrollHeight) {
        downBtn.style.display = 'flex';
    } else {        downBtn.style.display = 'none';
    }
});


downBtn.addEventListener('click', () => {
    main.scrollTo({ top: main.scrollHeight, behavior: 'smooth' });
});

// side bar portrait open
const sideBarOpen = document.querySelector('.side-bar-open');
const sideBar = document.querySelector('.side-bar')

sideBarOpen.addEventListener('click', () => {
    sideBar.style.marginLeft = '0vw';
    sideBarOpen.style.display = 'none';

});

// side bar portrait close
const sideBarCloseBtn = document.querySelector('.side-bar-close-btn');

sideBarCloseBtn.addEventListener('click', () => {
    sideBar.style.marginLeft = '-100vw';
    sideBarOpen.style.display = 'block';
});

// bot down btn
const botDownBtn = document.querySelector('.bot-down-btn');
const botChat = document.querySelector('.bot-chat');

botChat.addEventListener('scroll', () => {
    if (botChat.scrollTop + botChat.clientHeight + 100 < botChat.scrollHeight) {
        botDownBtn.style.display = 'flex';
    } else {        botDownBtn.style.display = 'none';
    }
});

botDownBtn.addEventListener('click', () => {
    botChat.scrollTo({ top: botChat.scrollHeight, behavior: 'smooth' });
});