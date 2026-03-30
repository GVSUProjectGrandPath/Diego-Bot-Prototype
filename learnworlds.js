<script>
   document.addEventListener("DOMContentLoaded", function () {
   const leftImages = document.querySelectorAll('.switch_leftImages img');
   const middleImages = document.querySelectorAll('.switch_middleImages img');
   const rightImages = document.querySelectorAll('.switch_rightImages img');
   let leftImageindex = 2;
   let middleImageindex = 2;
   let rightImageindex = 2;
     
   const polaCamera = document.querySelector('.polaroidCamera');
   const shopperOctop = document.querySelector('.shopperOctoCard');
   const cardGroup = document.querySelector('.cardGroup');
   const stratOctop = document.querySelector('.stratOctoCard');
   const shieldOctop = document.querySelector('.shieldOctoCard');
   const wrapper = document.querySelector('.imageWrapper');
   const certText = document.querySelector('#studentText');
   const certTextContainer = document.querySelector('#textBox');
   let notWrapped = true;
     
   function updateWindowSize() {
      const height = window.innerHeight;
      const width = window.innerWidth;
      console.log(height, width);
      if (width < 937) {
         certTextContainer.remove()
         notWrapped = false;
         wrapper.appendChild(certTextContainer)
      } else if (notWrapped === false) {
         certTextContainer.remove()
         notWrapped = true;
         cardGroup.appendChild(certTextContainer)
      } else {
         notWrapped = true;
      }
   }

   window.addEventListener('resize', updateWindowSize);
   updateWindowSize();
     
   function cycleImages(images, index) {
   	images[index].classList.remove('active');

  	// If at the last image, jump back to index 2 (skipping the first and second images, which we don't need anymore)
  	index = (index === images.length - 1) ? 2 : index + 1;

  	images[index].classList.add('active');
  	return index;
   }
      
   setInterval(() => {
      leftImageindex = cycleImages(leftImages, leftImageindex);
      middleImageindex = cycleImages(middleImages, middleImageindex);
  	  rightImageindex = cycleImages(rightImages, rightImageindex);
      }, 4250);
   });
</script>

<script>
  const lst_1 = document.querySelector('.col_1').children;
  let visible_1 = 0;
  const lst_2 = document.querySelector('.col_2').children;
  let visible_2 = 1;
  const lst_3 = document.querySelector('.col_3').children;
  let visible_3 = 2;

  const leftButton = document.querySelector('.left_arrow_button');
  const rightButton = document.querySelector('.right_arrow_button');

  let debounce = false;

  // Helper: resolve when an element's current animation finishes
  function waitAnimationEnd(el) {
    return new Promise((resolve) => {
      // If the element has no animation, resolve immediately
      const cs = getComputedStyle(el);
      if (!cs.animationName || cs.animationName === 'none') return resolve();
      el.addEventListener('animationend', resolve, { once: true });
    });
  }

  async function stepRight() {
    if (debounce) return;
    debounce = true;

    const a1 = lst_1.item(visible_1 % 8);
    const a2 = lst_2.item(visible_2 % 8);
    const a3 = lst_3.item(visible_3 % 8);
    const a3next = lst_3.item((visible_3 + 1) % 8);

    // kick off animations
    a1.style.animation = 'leaveLeft .25s ease-in-out';
    a2.style.animation = 'moveLeft .25s ease-in-out';
    a3.style.animation = 'moveLeft .25s ease-in-out';
    a3next.style.opacity = 1;
    a3next.style.animation = 'comeLeft .25s ease-in-out';

    // wait for them to finish instead of setTimeout
    await Promise.all([
      waitAnimationEnd(a1),
      waitAnimationEnd(a2),
      waitAnimationEnd(a3),
      waitAnimationEnd(a3next),
    ]);

    // swap visibility
    lst_1.item((visible_1 + 1) % 8).style.opacity = 1;
    lst_2.item((visible_2 + 1) % 8).style.opacity = 1;

    a1.style.opacity = 0;
    a2.style.opacity = 0;
    a3.style.opacity = 0;

    // reset animations so next run can re-apply them cleanly
    a1.style.animation = 'none';
    a2.style.animation = 'none';
    a3.style.animation = 'none';
    a3next.style.animation = 'none';

    // advance indices
    visible_1 = (visible_1 + 1) % 8;
    visible_2 = (visible_2 + 1) % 8;
    visible_3 = (visible_3 + 1) % 8;

    debounce = false;
  }

  async function stepLeft() {
    if (debounce) return;
    debounce = true;

    const a1 = lst_1.item(visible_1 % 8);
    const a2 = lst_2.item(visible_2 % 8);
    const a3 = lst_3.item(visible_3 % 8);
    const a1prev = lst_1.item((visible_1 + 7) % 8);

    a1.style.animation = 'moveRight .25s ease-in-out';
    a2.style.animation = 'moveRight .25s ease-in-out';
    a3.style.animation = 'leaveRight .25s ease-in-out';
    a1prev.style.opacity = 1;
    a1prev.style.animation = 'comeRight .25s ease-in-out';

    await Promise.all([
      waitAnimationEnd(a1),
      waitAnimationEnd(a2),
      waitAnimationEnd(a3),
      waitAnimationEnd(a1prev),
    ]);

    lst_3.item((visible_3 + 7) % 8).style.opacity = 1;
    lst_2.item((visible_2 + 7) % 8).style.opacity = 1;

    a1.style.opacity = 0;
    a2.style.opacity = 0;
    a3.style.opacity = 0;

    a1.style.animation = 'none';
    a2.style.animation = 'none';
    a3.style.animation = 'none';
    a1prev.style.animation = 'none';

    visible_1 = (visible_1 + 7) % 8;
    visible_2 = (visible_2 + 7) % 8;
    visible_3 = (visible_3 + 7) % 8;

    debounce = false;
  }

  rightButton.addEventListener('click', stepRight);
  leftButton.addEventListener('click', stepLeft);
</script>

<!-- CALEB'S CHATBOT GUI IMPLEMENTATION -->

<!-- text symbols/icons using phosphor -->
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css" />
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css" />
<script src="https://cdn.jsdelivr.net/npm/dompurify@3.2.4/dist/purify.min.js"></script> <!-- This calls a script to clean the LLM html formatted response of any harmful things such as a harmful <script> tag -->


<!-- unoopened chat -->
<button id="unopened-chat" class="hidden" onClick = "chatBot()">
	<div id="message-symbol" style="width: 60%; height: 40%; background-color: white; border-radius: 20%; font-size: 48px; padding: 0; margin: 0; display: flex; justify-content: center; align-items: center; gap: 2px;">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
  	</div>
    <div id="message-symbol-tail" style="position: absolute; height: 10px; width: 8px; border-bottom-right-radius: 100%; background-color: white; bottom: 20px; left: 25px;"></div>
</button>



<!-- opened chat -->
<div id="chat-container" class="hidden">
  	<div id="animal-choice">
      	<h1>Which Money Personality Animal are You? </h1>
     	<div class="animal-row">
          <img id="squirrel" class="animal" onClick="animalChoice(this)" src="https://lwfiles.mycourse.app/6759d5489b4fa1f235381f70-public/fc03ee57461416c10e083865fcc3e6f4.png">
          <img id="rabbit" class="animal" onClick="animalChoice(this)" src="https://lwfiles.mycourse.app/6759d5489b4fa1f235381f70-public/0e085720420940b17bffd4a3f0419cc1.png">
        </div>
      	<div class="animal-row">
          <img id="octopus" class="animal" onClick="animalChoice(this)" src="https://lwfiles.mycourse.app/6759d5489b4fa1f235381f70-public/5c0a7d7bd7e10ebd31492c6c00119505.png">
          <img id="panda" class="animal" onClick="animalChoice(this)" src="https://lwfiles.mycourse.app/6759d5489b4fa1f235381f70-public/28913e2dcb49252975a6f20c76341ed9.png">
        </div>
      	<div class="animal-row">
          <img id="armadilo" class="animal" onClick="animalChoice(this)" src="https://lwfiles.mycourse.app/6759d5489b4fa1f235381f70-public/19a8fc0ed47d8d7f7043f4000ed0e3b5.png">
          <img id="poodle" class="animal" onClick="animalChoice(this)" src="https://lwfiles.mycourse.app/6759d5489b4fa1f235381f70-public/f3f3b8d63ca3eee73c0782abbe2f25c0.png">
        </div>
      	<div class="animal-row">
          <img id="owl" class="animal" onClick="animalChoice(this)" src="https://lwfiles.mycourse.app/6759d5489b4fa1f235381f70-public/469b5dcb8fc92cf35422bb36ab843b3e.png">
          <img id="bee" class="animal" onClick="animalChoice(this)" src="https://lwfiles.mycourse.app/6759d5489b4fa1f235381f70-public/5dcd3605e0edd7bf81cc0c85278560d3.png">
        </div>
  	</div>
  
	<div id="chat-content" class="hidden">
      
      
     <!-- top bar -->
  		<div id="top-bar">
          	<div style="display: flex; flex-direction: column; justify-content: center;">
            	<p style="color: var(--brown-color); font-family: sans-serif; font-size: 18px; font-weight: bold;">FinLit Rep4® Bot</p>
              	<p style="color: var(--purple-color); font-family: sans-serif; font-size: 14px;">Your Financial Assistant</p>
          	</div>
          
       	<!-- tool menu -->
          	<div id="tools-menu" class="hidden">
          		<div id="current-tool"> <!-- just displays current tool at top -->
                  	<p>Current tool:</p>
                  	<div id="current-tool-symbol"><i class="ph ph-gear" style="text-align: center;"></i></div>
              		<button id="close-tools" onClick ="tools()">×</button>
              	</div> 
              
              	<!-- tools -->
                <div id="none" class="tool" onClick="tool=selectTool(this)"><p>None</p>
                	<div class="symbol" style="background-color: var(--purple-color);">
                      	<i class="ph ph-gear" style="text-align: center;"></i>
                  	</div>
              	</div>
              	<div id="build-a-budget" class="tool" onClick="tool=selectTool(this)"><p>Build a Budget</p>
                	<div class="symbol" style="background-color: var(--blue-color);">
                      	<i class="ph ph-article" style="text-align: center;"></i>
                  	</div>
              	</div>
              	<div id="plan-for-a-purchase" class="tool" style="font-size: 13px;" onClick="tool=selectTool(this)"><p>Plan for a Purchase</p>
                	<div class="symbol" style="background-color: var(--salmon-color);">
                      	<i class="ph ph-shopping-cart-simple" style="text-align: center; font-size: 16px;"></i>
                  	</div>
              	</div>
              	<div id="check-credit-score" class="tool" style="font-size: 13px;" onClick="tool=selectTool(this)"><p>Check Credit Score</p>
                	<div class="symbol" style="background-color: var(--teal-color);">
                      	<i class="ph ph-credit-card" style="text-align: center; font-size: 16px;"></i>
                  	</div>
              	</div>
              	<div id="calculate-loan" class="tool" onClick="tool=selectTool(this)"><p>Calculate Loan</p>
                	<div class="symbol" style="background-color: var(--brown-color);">
                      	<i class="ph ph-calculator" style="text-align: center;"></i>
                  	</div>
              	</div>
              	<div id="manage-debt" class="tool" style="border-radius: 0 0 8px 8px;" onClick="tool=selectTool(this)"><p>Manage Debt</p>
                	<div class="symbol" style="background-color: grey;">
                      	<i class="ph ph-trend-up" style="text-align: center;"></i>
                  	</div>
              	</div>
              	<!-- END tools -->
              
          	</div>
          	<div class="button-row" style="flex: 1; justify-content: flex-end">
              <div id="tools-button" onClick="tools()">
                <i class="ph ph-gear" style="text-align: center;"></i>
              </div>
              <!-- END tool menu -->
              <button id="close-chat" onClick ="chatBot()">×</button>
            </div>
    	</div>
      <!-- END top bar -->
      
      
      <!-- messages -->
      	<div id="messages">
        	<div id="starting-message" class="message bot">Hi! I'm Rep4®FinLit Bot, your financial literacy assistant. You can chat with me about anything financial related and I will respond with trusted information from our learning modules.</div>
        </div>
      	<!-- END messages -->
      	<button id="scroll-to-bottom-button" onClick="scrollToBottom()" class="">↓</button>
        
      
      	<!-- input menu -->
    	<div id="input-container">
      		<textarea id="chat-input" placeholder="Ask anything..."></textarea>
          	<button id="send-button" onClick="sendMessage(event)">Send ➤</button>
    	</div>
      	<!-- END input menu -->
  	</div>
</div>
<!-- END opened chat -->


<style>
  	/* color variables */
  	:root {
    	--blue-color: #5ac2e7;
      	--purple-color: #a52c86;
      	--salmon-color: #ff8674;
      	--yellow-color: #fedb01;
      	--teal-color: #44b59d;
      	--brown-color: #603d20;
  	}
  
  	/* ################ */
	/* unopened chatbot */
  	/* ################ */
    #unopened-chat {
		position: fixed;
      	width: 80px; height: 80px; bottom: 20px; right: 20px; z-index: 20;
      
      	border-radius: 50%;
        background-color: var(--blue-color);
        display: flex;
        align-items: center;
        justify-content: center;
      
        transition: opacity 350ms ease, background-color 0.5s ease;
    }
  
  	#unopened-chat:hover {
  		cursor: pointer;
      	background-color: var(--purple-color);
  	}
  
  	.circle {
  		height: 6px;
      	width: 6px;
      	border-radius: 50%;
      	background-color: var(--blue-color);
      	transition: background-color 0.5s ease;
  	}
  
  	#unopened-chat:hover .circle{
		background-color: var(--purple-color);
      	animation: moveUpDown 0.65s ease-in-out;
    }
  
  	/* First circle bounce, then middle, then last one */
  	#unopened-chat:hover .circle:nth-child(1) {
      animation-delay: 0s; 
  	}
	#unopened-chat:hover .circle:nth-child(2) {
      animation-delay: 0.2s; 
  	}
	#unopened-chat:hover .circle:nth-child(3) {
      animation-delay: 0.4s;
  	}
  
    @keyframes moveUpDown { /* for 3 dots animation on hover of closed chatbot */
      0% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
      100% { transform: translateY(0); }
  	}
  	/* END OF unopened chatbot */	
  
  
  	/* ############## */ 
	/* opened chatbot */  
  	/* ############## */ 
  	#chat-container {
  		bottom: 20px; right: 20px; width: 400px; height: 600px;
      	display: flex;
      	flex-direction: column;
      	
      	z-index: 20;
      	border-radius: 20px;
      	border: 3px solid var(--blue-color);
      
      	transition: opacity 350ms ease;
      	position: fixed;
      	overflow: visible;
  	}
  
    #animal-choice {
      	justify-content: center;
      	align-items: center;
		display: flex;
      	flex-direction: column;
      	height: 100%;
      
      	background-color: white;
      	border: 3px solid var(--yellow-color);
      	border-radius: 15px; 
      
      	font-family: sans-serif;
      	text-align: center;
      	font-size: 16px;
      
      	transition: opacity 350ms ease;
    }
  
    .animal-row {
		display: flex;
      	flex-direction: row;
      	gap: 32px;
    }
  
  	.animal {
    	height: 108px; width: 108px;
      	transition: transform 0.5s ease;
  	}
  
    .animal:hover {
		cursor: pointer;
      	transform: scale(1.1);
    }

    #chat-content {
      	width: 100%;
      	flex: 1;
      	min-height: 0;
      	
      	border-radius: 16px;
      	background-color: white;
      	border: 3px solid var(--yellow-color);
      	
    	display: flex;
      	flex-direction: column;
      	align-items: center;
      
      	transition: opacity 350ms ease;
      
      	position: absolute;
    	top: 0; left: 0; right: 0; bottom: 0;
    }
  
  
  	/* START OF top bar  */	
	#top-bar {
    	width: 100%; height: 60px;
      	background-color: var(--yellow-color);
        display: flex;
      	padding: 10px 16px;
      	border-bottom: 1px solid var(--brown-color);
          
        border-top-right-radius: 12px;
        border-top-left-radius: 12px;
      
      	position: relative;
  	}
  	
  	#tools-button {
      	width: 35px; height: 35px;
      
  		background-color: var(--purple-color);
      	font-size: 30px;
      	color: var(--yellow-color);
      	
        display: flex;
      	justify-content: center;
      	align-items: center;
      
      	border-radius: 50%;
      
      	transition: background-color 0.5s ease, opacity 0.5s, transform 0.5s ease;
  	}
  
  	#tools-button:hover {
		cursor: pointer;
      	transform: scale(1.1);
    }
  
  
  	/* START OF tools menu  */
    #tools-menu {
		background-color: white;
      	width: 160px;
      
      	transition: opacity 0.5s;
      
      	position: absolute;
      	top: 16%;
      	right: 60px;
      
      	border: grey solid 2px;
      	border-radius: 10px;
      
      	display: flex;
      	flex-direction: column;
    }

    #current-tool {
		display: flex;
      	flex-direction: row;
      	align-items: center;
      	text-align: center;
      	gap: 5px;
      	padding: 0 5px;
      
      	font-size: 16px;
      	font-family: sans-serif;
      	width: 100%;
    }
  
    #current-tool-symbol {
		width: 22px; height: 22px;
      
  		background-color: var(--purple-color);
      	font-size: 18px;
      	color: white;

      	
        display: flex;
      	justify-content: center;
      	align-items: center;
      	margin-left: auto;
      
      	border-radius: 50%;
    }
  
  	#close-tools {
      	padding: 0;
      	margin: 0;

      	color: Dimgrey;
      	font-family: Arial;
      	font-size: 32px;
      
      	transition: color 0.5s ease, transform 0.5s ease;
    }
  
    #close-tools:hover {
		cursor: pointer;
    	color: black;
      
      	transform: scale(1.1);
    }
  
  	.tool {
      	display: flex;
      	flex-direction: row;
      	align-items: center;
        text-align: center;
      	gap: 5px;
      	padding: 5px;
      	
      	font-size: 16px;
      	font-family: sans-serif;
      	border-top: 1px solid rgb(0, 0, 0, 0.2);
      	width: 100%;
  	}

  	.tool:hover {
  		cursor: pointer;
        background-color: rgb(0, 0, 0, 0.2);
  	}
  
  	#manage-debt:hover .symbol{
  		border: 1px solid white;
  	}
  
  	.symbol {
		width: 22px; height: 22px;
      
      	font-size: 18px;
      	color: white;

        display: flex;
      	justify-content: center;
      	align-items: center;
      	margin-left: auto;
      	/*margin-right: 5px;*/
      
      	border-radius: 50%;
  	}
	/* END OF tools menu */
  
  
    #close-chat {
      	width: 35px; height: 35px;
      
      	color: var(--brown-color);
      	transition: color 0.5s ease, transform 0.5s ease;
      	font-size: 40px;
      	text-align: center;
      
      	display: flex;
      	justify-content: center;
      	align-items: center;
      	font-family: Arial;
      
      	background-color: rgba(0, 0, 0, 0.2);
      	border-radius: 50%;
    }
  	
  	#close-chat:hover {
    	cursor: pointer;
      	color: var(--purple-color);
      	transform: scale(1.1);
  	}
  
  	.button-row {
      	display: flex;
      	align-items: center;
      	gap: 10px;
    	padding: 0;
      	margin: 0;
    }
  	/* END OF top bar */
  	
  
  	/* START OF messages */	
    #messages {
      	flex: 1;
      	width: 95%;
      	overflow-y: auto;
      	min-height: 0;
      
      	display: flex;
      	flex-direction: column;
    }
  
 	.message {
  		max-width: 80%;
      	padding: 10px 14px;
        border-radius: 10px;
        margin: 0px 10px;
      	margin-top: 6px;
      
        font-family: sans-serif;
        font-size: 16px;
        word-wrap: break-word;
      
      	border: 2px solid var(--brown-color);
        color: var(--brown-color);
      
      	line-height: 1.25;
      	animation: messageFadeIn 0.5s ease;
  	}
  
  	@keyframes messageFadeIn {
      	from { opacity: 0; }
      	to { opacity: 1; }
  	}
  
  	.user {
      	background-color: white;
      	margin-left: auto;  /* pushes to the right */
      	border-bottom-right-radius: 1px;
	}

	.bot {
      	background-color: var(--blue-color);
      	margin-right: auto;  /* stays on the left */
      	border-bottom-left-radius: 1px;
  	}  
  	/* END OF messages */
  
  	#scroll-to-bottom-button {
      	width: 40px; height: 40px;
  		background-color: var(--yellow-color);
        color: var(--brown-color);
      	font-size: 18px;
      	border-radius: 50%;
      	border: 2px solid var(--brown-color);
      	opacity: 0;
        
        position: absolute;
        bottom: 80px;
      	
      	transition: opacity 0.35s ease, filter 0.35s;
  	}
  
    #scroll-to-bottom-button:hover {
		cursor: pointer;
      	filter: brightness(0.95);
    }
  
  	/* START OF input menu */
  	#input-container {
  		margin: 0px 0px;
      	margin-bottom: 10px;
      	width: 90%;
      	align-content: flex-start;
      	justify-content: center;
      
      	display: flex;
      	align-items: center;
      	gap: 8px;
      
      	padding-top: 1px;
  	}
  
  	#chat-input {
       	padding: 8px 12px;
       	flex: 1;
       	outline: none;
       	border: 2px solid var(--blue-color);
       	border-radius: 20px;
       	box-sizing: border-box;
       	min-height: 38px;
       	max-height: 110px;
       	height: auto;
       	line-height: 20px;
       	resize: none;
       	overflow-y: auto;
       	display: block;
       	margin: 0;
      
      	transition: border-color 0.5s ease;
   }

   #chat-input::placeholder {
       color: rgba(96, 61, 32, 0.6);
       line-height: 20px;
   }

   #chat-input:focus {
       outline: none;
       border-color: var(--purple-color);
   }

    #send-button {
      	background-color: var(--yellow-color);
  		color: var(--brown-color);
      	font-family: sans-serif;
      	font-weight: bold;
      	border: 2px solid var(--brown-color);
      	border-radius: 20px;
      	padding: 0 10px;
      	height: 35px;
      
      	transition: transform 0.5s ease;
    }
  
    #send-button:hover {
		cursor: pointer;
      	transform: scale(1.1);
    }
  	/* END OF input */
  
</style>

<style>
  	.hidden {
      	pointer-events: none;
  		opacity: 0;
  	}  
  	
  	.module-link {
  		color: var(--brown-color);
      	padding: 2px 6px;
      	background: color-mix(in srgb, var(--blue-color) 85%, black);
      	border-radius: 25px; 
      	white-space: nowrap; 
      	font-size: 12px;
  	}
  
  	.module-link:hover {
    	text-decoration: none;
      	background: color-mix(in srgb, var(--blue-color) 80%, black);
  	}
</style>

<script>
  	// MAKES CHATBOT ONLY APPEAR ON SPECIFIC PAGES (using "hidden" class as defined above^)
  
  	if (window == window.top) { // Prevents previous issue of 2 chatbots appearing in modules
      
      const url = window.location.href
      if (url.startsWith("https://www.rep4finlit.org")) { // change if statements to prevent chatbot on specific URLs in rep4FinLit

        function checkQuizState() {
          try {
            const iframe = document.getElementById('playerFrame')
            if (!iframe) { // if there is no iframe we are not in the courses so there is no reason to hide the bot in the first place
              document.getElementById("unopened-chat").classList.remove("hidden");
              return;
            }

            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const quizActive = iframeDoc.querySelector('.slug-assessmentplayer-new'); // the .slug is a class that is on a quiz element whenever a quiz comes up

            const unopenedChat = document.getElementById("unopened-chat");
            const openedChat = document.getElementById("chat-container");

            if (quizActive == null) { // quiz is not active show chatbot
              console.log("\n\nbot should be shown\n\n")
              if (openedChat.classList.contains("hidden")) {
                unopenedChat.classList.remove("hidden");
              }
            } else { // quiz is active hide chatbot
              console.log("\n\nbot should be hidden\n\n")
              unopenedChat.classList.add("hidden");
              openedChat.classList.add("hidden");
            }
          } catch (e) {
            console.log("\nError occured when checking whether to hide or show bot (shows if not in quiz doesn't show in quiz)\n")
          }
        }

        checkQuizState();
        setInterval(checkQuizState, 1000); //check periodically because the url does not change in the course when user enters the quiz
      }
    }
  
  	// FUNCTIONS
	function chatBot() { // open/close chatbot
      	const unopened = document.getElementById("unopened-chat");
      	const opened = document.getElementById("chat-container");
      	
      	if (opened.classList.contains("hidden")) { // open chat
    		unopened.classList.add('hidden');
			opened.classList.remove('hidden');
        } else { // close chat
          	opened.classList.add('hidden');
        	unopened.classList.remove('hidden');
        }
    }
  	
  	function animalChoice (element) {
      	const animalChoice = document.getElementById("animal-choice");
      	const chatContent = document.getElementById("chat-content");
      
    	const animal = element.id;
      	
      	animalChoice.classList.add('hidden')
      	chatContent.classList.remove('hidden')
    }
  
  	function tools() { // open/close tools menu
    	const unopened = document.getElementById("tools-button");
      	const opened = document.getElementById("tools-menu");
      	
      	if (opened.classList.contains("hidden")) { // open tools
    		unopened.classList.add('hidden');
			opened.classList.remove('hidden');
        } else { // close tools
          	opened.classList.add('hidden');
        	unopened.classList.remove('hidden');
    	}
    }
  	
  	let tool = ""
  	function selectTool(element) { //changes current-tool and tool-button to match clicked tool
  		const symbol = element.querySelector('.symbol');
    	const icon = element.querySelector('.symbol i');
    	const toolsButton = document.getElementById('tools-button');
    	const toolsButtonIcon = toolsButton.querySelector('i');
      	const currentTool = document.getElementById('current-tool-symbol')
        const currentToolIcon = currentTool.querySelector('i');

    	// change tool-button
    	toolsButton.style.backgroundColor = symbol.style.backgroundColor;
    	toolsButtonIcon.className = icon.className;
      	
      	//change current-tool
    	currentTool.style.backgroundColor = symbol.style.backgroundColor;
    	currentToolIcon.className = icon.className;
      
      	if (icon.className == "ph ph-shopping-cart-simple") {
        	toolsButtonIcon.style.fontSize = "28px"
          	currentToolIcon.style.fontSize = "16px"
        } else {
        	toolsButtonIcon.style.fontSize = "30px"
          	currentToolIcon.style.fontSize = "18px"
        }
      
    	tools(); // close the menu
      	
      	if (element.id == "none") {
      		return ""
        }
      	return element.id
    }
  
  	function createMessage(text, sender) {
    	const message = document.getElementById("messages")
        const bubble = document.createElement("div")
        
        bubble.classList.add("message", sender)
      	if (sender == "bot") {
          	let i = 0;
          	text = text.split(' ')
        	let interval = setInterval(() => { i=typeWriter(text, bubble, i, interval);}, 50);//adjust number for speed at which text appears
        } else {
      		bubble.textContent = text
        }
      
      	messages.appendChild(bubble)
    	messages.scrollTop = messages.scrollHeight
    }
  
  	function typeWriter(text, bubble, index, interval) {
      	if (index > text.length) {
          	bubble.innerHTML = text.join(' ')  // set final HTML cleanly (no cursor)
        	clearInterval(interval)
          	return
        }
      
        if (text[index] == "<a"){ // module reference link
        	while (!text[index].endsWith("</a>")) { 
            	index++; //makes a full reference link appears in the normal 50ms interval
            }
        }
      	index++;
      
        let string = text.slice(0, index).join(' ')
      	bubble.innerHTML = string + ' █' // innerHTML renders HTML tags as text builds up
      	showScrollBottomButton()
      	return index
    }
  

	document.getElementById("chat-input").addEventListener("keydown", sendMessage) //triggers function below
    document.getElementById("chat-input").addEventListener("input", function () {
        const input = this;
        input.style.height = "auto";
        input.style.height = Math.min(input.scrollHeight, 110) + "px";
        input.style.overflowY = input.scrollHeight > 110 ? "auto" : "hidden";
    });

    function sendMessage (event) {
        if (event.key === "Enter" || event.type == "click") {
          	if (event.key === "Enter" && event.shiftKey) return; // allows user to type a newline
          
          	const input = document.getElementById("chat-input")
            const text = input.value.trim()
            
            if (text) {
                createMessage(text, "user") // creates user bubble
				
				//Reset input box sizes and text
                input.value = "";
				input.style.height = "auto";
				if (event.key === "Enter") event.preventDefault();

                // trigger bot response
              	// COULD CHANGE BASED ON IMPLEMENTATION OF BOT
              
              	/*
              	fetch("https://test-render-1-hek9.onrender.com/chat", {
    				method: "POST",
    				headers: { "Content-Type": "application/json" },
    				body: JSON.stringify({ message: text, tool: tool })
				})
              	.then(res => res.json())
                .then(data => {createMessage(DOMPurify.sanitize(data.message), "bot")})
              	.catch(err => { createMessage("Error: " + err.message, "bot") })
				console.log(`\nHERE IS THE TOOL: ${ tool}\n`)
              	*/
              	// mock bot response for local development
              	createMessage(`Bot is currently not hooked up to an LLM this message is for testing without using tokens. You are currently using the ${tool} tool <a href="https://www.rep4finlit.org/path-player?courseid=explore-your-money-mindset&unit=696149580fc4ba162c0d436dUnit&learningProgramId=68bb450695387cdca40c473c" class="module-link" title="Module 1: Explore Your Money Mindset">Module 1</a>`, "bot")
              	//const bubble = document.createElement("a")
                //bubble.classList.add("test")
              	//bubble.textContent = "Module 1"
              	//bubble.href = "https://www.rep4finlit.org/path-player?courseid=explore-your-money-mindset&unit=696149580fc4ba162c0d436dUnit&learningProgramId=68bb450695387cdca40c473c"
        		//messages.appendChild(bubble)
            }
    	}
	}
  
  	const scrollToBottomButton = document.getElementById('scroll-to-bottom-button');
  	const messages = document.getElementById('messages')
	messages.addEventListener('scroll', showScrollBottomButton)
  
  	let isHidden = true;
  	function showScrollBottomButton() {
  		const atBottom = messages.scrollTop + messages.clientHeight >= messages.scrollHeight - 200;
        	if (atBottom && !isHidden) {
              	scrollToBottomButton.style.opacity = "0";
              	isHidden = true
              	scrollToBottomButton.style.pointerEvents = "none";
				//scrollToBottomButton.classList.add("hidden")
          	} else if (!atBottom && isHidden){
              	scrollToBottomButton.style.opacity = "1";
              	isHidden = false
              	scrollToBottomButton.style.pointerEvents = "auto";
              	//scrollToBottomButton.classList.remove("hidden")
          	}
	}
  
  
  	function scrollToBottom () {
    	messages.scrollTo({ top: messages.scrollHeight, behavior: "smooth" })
    }
  
  	function addReferenceModule (module) {
    	
    }
  
</script>
