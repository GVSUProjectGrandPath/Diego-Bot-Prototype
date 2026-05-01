function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let threadId = sessionStorage.getItem("threadId");
if (!threadId) {
    threadId = crypto.randomUUID();
    sessionStorage.setItem("threadId", threadId);
}


// variables
let debounce = false;

const main = document.querySelector('main');

const botBtn = document.querySelector('.bot-btn');
const botBtnIcon = document.querySelector('.bot-img');
const botContainer = document.querySelector('.bot-container');
const botChat = document.querySelector('.bot-chat');
const input = document.querySelector(".myInput");
const input2 = document.querySelector(".bot-input");
const chatContainer = document.querySelector('.chats-container');
const faces = ['faces/f1.png', 'faces/f2.png', 'faces/f3.png', 'faces/f4.png'];
const mascot = document.querySelector('.mascot');

const budgetBtn = document.querySelector('.budget-btn');
const purchaseBtn = document.querySelector('.purchase-btn');
const loanBtn = document.querySelector('.loan-btn');
const creditBtn = document.querySelector('.credit-btn');
const funBtn = document.querySelector('.fun-btn');

const sideBarOpen = document.querySelector('.side-bar-open');
const sideBar = document.querySelector('.side-bar');
const sideBarCloseBtn = document.querySelector('.side-bar-close-btn');

const downBtn = document.querySelector('.down-btn');
const botDownBtn = document.querySelector('.bot-down-btn');

const bigRefreshScreen = document.querySelector('.big-bot-refresh-confirmation');
const bigBotRefreshBtn = document.querySelector('.big-bot-refresh-btn');
const bigConfirmRefreshBtn = document.querySelector('.big-confirm-refresh');
const bigCancelRefreshBtn = document.querySelector('.big-cancel-refresh');

const botRefreshBtn = document.querySelector('.bot-refresh-btn');
const refreshScreen = document.querySelector('.refresh-confirmation');
const confirmRefreshBtn = document.querySelector('.confirm-refresh');
const cancelRefreshBtn = document.querySelector('.cancel-refresh');

const pane = document.querySelector('.bot');
const corner = document.querySelector('.corner');
const minWidth = pane.style.minWidth ? parseInt(pane.style.minWidth) : 300;
const minHeight = pane.style.minHeight ? parseInt(pane.style.minHeight) : 410;
const maxWidth = pane.style.maxWidth ? parseInt(pane.style.maxWidth) : window.innerWidth * 0.8;
const maxHeight = pane.style.maxHeight ? parseInt(pane.style.maxHeight) : window.innerHeight * 0.8;

// CornerBot open and closing functions
const botTitle = document.querySelector('.bot-title');

async function openBotAnimation() {
    botBtn.classList.toggle('active');
    botBtnIcon.src = 'faces/f2.png';
    await sleep(250);
    botContainer.classList.toggle('active');
    input2.style.marginLeft = '0px';
    botTitle.style.marginLeft = '0px';
    corner.style.left = '0px';
    botChat.style.marginLeft = '4px';
    await sleep(250);
    botTitle.style.bottom = '90%';
    corner.style.bottom = '90%';
    botChat.style.height = 'calc(65% - 8px)';
    await sleep(250);
    botBtnIcon.src = 'future_panda_profile.png';
    debounce = false;
}

async function closeBotAnimation() {
    botBtnIcon.src = 'faces/f1.png';
    refreshScreen.style.display = 'none';
    botRefreshBtn.textContent = '⟳';
    botTitle.style.bottom = 'calc(30% + 8px)';
    corner.style.bottom = 'calc(30% + 8px)';
    botChat.style.height = '5%';
    await sleep(250);
    input2.style.marginLeft = '100%';
    botTitle.style.marginLeft = '100%';
    corner.style.left = '100%';
    botChat.style.marginLeft = '100%';
    pane.style.transition = 'width 0.25s ease-in-out, height 0.25s ease-in-out';
    botContainer.classList.remove('active');
    await sleep(250);
    pane.style.top = '';
    pane.style.left = '';
    pane.style.width = '25%';
    pane.style.height = '40%';
    await sleep(250);
    botBtn.classList.remove('active');
    pane.style.transition = '';
    botBtnIcon.src = 'future_panda_profile.png';
    debounce = false;
}

function floatBotButton() {
    if (debounce) return;
    debounce = true;
    if (!botContainer.classList.contains('active')) {
        openBotAnimation();
    } else {
        closeBotAnimation();
    }
}
botBtn.addEventListener('click', floatBotButton);

function floatBotClose(e) {
    if (debounce) return;
    if (!botContainer.contains(e.target) && !botBtn.contains(e.target)) {
        debounce = true;
        closeBotAnimation();
    }
}
document.addEventListener('click', floatBotClose);


// Auto-resize textarea for input
input.addEventListener("input", function () {
    const input = this;
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 100) + "px";
    input.style.overflowY = input.scrollHeight > 100 ? "auto" : "hidden";
});


// Response function for both bots
async function botResponseMessage(message) {
    return fetch("https://test-render-1-hek9.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({message: message, threadId: threadId})
    })
    .then(res => res.json())
    .then(data => {
        return DOMPurify.sanitize(data.message);
    })
    .catch(err => {
        return null;
    })
}


// Big Bot prompt and response function
let active = false;

async function bigBotPrompt(e) {
    // check if the key pressed is enter and shift is not pressed
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // prevent the default action of the Enter key
        
        const message = input.value.trim();
        if (!message) return; // if message is empty, do nothing
            input.value = "";
        // change the layout mode from default to active
        if (!active) { 
            active = true;
            chatContainer.classList.add('active');
            document.querySelector('.myInput').classList.add('active');
            document.querySelector('.askQuestion').remove();
            mascot.classList.add('active');
        }

        // create chats
        const userChatDiv = document.createElement('div');
        userChatDiv.className = 'user-chat';
        userChatDiv.textContent = message;
        chatContainer.appendChild(userChatDiv);

        const responseDiv = document.createElement('div');
        responseDiv.className = 'bot-response';
        responseDiv.textContent = '...thinking...';
        chatContainer.appendChild(responseDiv);

        main.scrollTo({ top: main.scrollHeight, behavior: 'smooth' });

        botResponseMessage(message).then(async sanitizedMessage => {
            if (sanitizedMessage) {
                responseDiv.innerHTML = sanitizedMessage;
                main.scrollTo({ top: main.scrollHeight, behavior: 'smooth' });
                mascot.src = faces[Math.floor(Math.random() * faces.length)];
                await sleep(2000);
                mascot.src = 'future_panda_profile.png';
            } else {
                responseDiv.textContent = 'Sorry, I am still learning and cannot answer that question yet.';
            }
        }).catch(error => {
            console.error('botResponseMessage failed:', error);
            responseDiv.textContent = 'Something went wrong. Please try again.';
        });

    }
}
input.addEventListener("keydown", bigBotPrompt);


// Corner Bot prompt and response function
async function floatBotPrompt(e) {
    // check if the key pressed is enter and shift is not pressed
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault(); // prevent the default action of the Enter key
        const message = input2.value.trim();
        if (!message) return; // if message is empty, do nothing
            input2.value = "";
        
        const userChatDiv = document.createElement('div');
        userChatDiv.className = 'user-chat';
        userChatDiv.textContent = message;
        botChat.appendChild(userChatDiv);

        const responseDiv = document.createElement('div');
        responseDiv.className = 'bot-response';
        responseDiv.textContent = '...thinking...';
        botChat.appendChild(responseDiv);
        
        botChat.scrollTo({ top: botChat.scrollHeight, behavior: 'smooth' });

        botResponseMessage(message).then(async sanitizedMessage => {
            if (sanitizedMessage) {
                responseDiv.innerHTML = sanitizedMessage;
                botChat.scrollTo({ top: botChat.scrollHeight, behavior: 'smooth' });
                botBtnIcon.src = faces[Math.floor(Math.random() * faces.length)];
                await sleep(2000);
                botBtnIcon.src = 'future_panda_profile.png';
            } else {
                responseDiv.textContent = 'Sorry, I am still learning and cannot answer that question yet.';
            }
        }).catch(error => {
            console.error('botResponseMessage failed:', error);
            responseDiv.textContent = 'Something went wrong. Please try again.';
        });
        
    }
}
input2.addEventListener("keydown", floatBotPrompt);


//fun btns
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


//big bot down btn
function bigBotDownBtn() {
    if (main.scrollTop + main.clientHeight + 100 < main.scrollHeight) {
        downBtn.style.display = 'flex';
    } else {        
        downBtn.style.display = 'none';
    }
};
main.addEventListener('scroll', bigBotDownBtn);

downBtn.addEventListener('click', () => {
    main.scrollTo({ top: main.scrollHeight, behavior: 'smooth' });
});


// float bot down btn
function floatbotDownBtn() {
    if (botChat.scrollTop + botChat.clientHeight + 100 < botChat.scrollHeight) {
        botDownBtn.style.display = 'flex';
    } else {        
        botDownBtn.style.display = 'none';
    }
};
botChat.addEventListener('scroll', floatbotDownBtn);

botDownBtn.addEventListener('click', () => {
    botChat.scrollTo({ top: botChat.scrollHeight, behavior: 'smooth' });
});


// side bar portrait open/close
function openSideBar() {
    sideBar.classList.add('active');
    sideBarOpen.classList.add('active');
}
sideBarOpen.addEventListener('click', openSideBar);

function closeSideBar() {
    sideBar.classList.remove('active');
    sideBarOpen.classList.remove('active');
}
sideBarCloseBtn.addEventListener('click', closeSideBar);


// big bot refresh buttons
bigBotRefreshBtn.addEventListener('click', () => {
    if (bigRefreshScreen.style.display === 'flex') {
        bigRefreshScreen.style.display = 'none';
        bigBotRefreshBtn.textContent = '⟳';
    } else {
        bigRefreshScreen.style.display = 'flex';
        bigBotRefreshBtn.textContent = 'X';
    }
});
bigConfirmRefreshBtn.addEventListener('click', () => {
    bigRefreshScreen.style.display = 'none';
    chatContainer.innerHTML = '';
    bigBotRefreshBtn.textContent = '⟳';
    downBtn.style.display = 'none';
});
bigCancelRefreshBtn.addEventListener('click', () => {
    bigRefreshScreen.style.display = 'none';
    bigBotRefreshBtn.textContent = '⟳';
});

// float bot refresh buttons
botRefreshBtn.addEventListener('click', () => {
    if (refreshScreen.style.display === 'flex') {
        refreshScreen.style.display = 'none';
        botRefreshBtn.textContent = '⟳';
    } else {
        refreshScreen.style.display = 'flex';
        botRefreshBtn.textContent = 'X';
    }
});
confirmRefreshBtn.addEventListener('click', () => {
    refreshScreen.style.display = 'none';
    botChat.innerHTML = '';
    botRefreshBtn.textContent = '⟳';
    botDownBtn.style.display = 'none';
});
cancelRefreshBtn.addEventListener('click', () => {
    refreshScreen.style.display = 'none';
    botRefreshBtn.textContent = '⟳';
});


// drag and resize bot
corner.addEventListener('mousedown', (e) => {
    e.preventDefault();

    const startX = e.pageX;
    const startY = e.pageY;

    const startWidth = pane.offsetWidth;
    const startHeight = pane.offsetHeight;
    const startTop = pane.offsetTop;
    const startLeft = pane.offsetLeft;

    const drag = (e) => {
        const dx = e.pageX - startX;
        const dy = e.pageY - startY;

        // Resize (inverse direction since it's top-left)
        pane.style.width = (startWidth - dx) + 'px';
        pane.style.height = (startHeight - dy) + 'px';

        // Move position to follow the corner
        if (startWidth - dx > minWidth && startWidth - dx < maxWidth) {
            pane.style.left = (startLeft + dx) + 'px';
        } else {
            pane.style.left = '';
        }
        if (startHeight - dy > minHeight && startHeight - dy < maxHeight) {
            pane.style.top = (startTop + dy) + 'px';
        } else {
            pane.style.top = '';
        }
    };

    const stopDrag = () => {
        window.removeEventListener('mousemove', drag);
        window.removeEventListener('mouseup', stopDrag);
    };

    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', stopDrag);
});