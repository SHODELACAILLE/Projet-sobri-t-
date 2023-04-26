//selecting all required elements
const start_btn = document.querySelector(".start_btn");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(30); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue =  30;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let SCORECOLO = 0;
let SCORPROTECT = 0;
let SCORINDIFF = 0;
let SCORPOLLUEUR =0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 30; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Temp"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// creating the new div tags which for icons
let TagEcolo = '<div class="icon ecolo"><i class="fas fa-check"></i></div>';
let Tagprotecteur = '<div class="icon protect"><i class="fas fa-times"></i></div>';
let Tagindiff = '<div class="icon indiff"><i class="fas fa-check" ></i></div>';
let Tagpollueur = '<div class="icon pollueur"><i class="fas fa-times" ></i></div>';

//if user clicked on option
function optionSelected(ecolo){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = ecolo.textContent; //getting user selected option
    let correcAnsEcolo = questions[que_count].ecolo; 
    let correcAnsProtect = questions[que_count].Protect;
    let correcAnsIndif = questions[que_count].indif;
    let correcAnsToxic = questions[que_count].toxic;//getting correct ecolo from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAnsEcolo){ //if user selected option is equal to array's correct ecolo
        userScore += 1; //upgrading score value with 1
        SCORECOLO += 1 ;
        ecolo.classList.add("ecolo"); //adding green color to correct selected option
        ecolo.insertAdjacentHTML("beforeend", TagEcolo); //adding tick icon to correct selected option
        console.log("Correct ecolo");
        console.log("Your correct ecolos = " + userScore);
    }
    if(userAns == correcAnsProtect){ //if user selected option is equal to array's correct ecolo
        userScore += 0.75; //upgrading score value with 1
        SCORPROTECT += 1;
        ecolo.classList.add("protect"); //adding green color to correct selected option
        ecolo.insertAdjacentHTML("beforeend", Tagprotecteur); //adding tick icon to correct selected option
        console.log("Correct protect");
        console.log("Your correct protects = " + userScore);
    }
    if(userAns == correcAnsIndif){ //if user selected option is equal to array's correct ecolo
        userScore += .50; //upgrading score value with 1
        SCORINDIFF += 1;
        ecolo.classList.add("indif"); //adding green color to correct selected option
        ecolo.insertAdjacentHTML("beforeend", Tagindiff); //adding tick icon to correct selected option
        console.log("Correct indif");
        console.log("Your correct indifs = " + userScore);
    }
    if(userAns == correcAnsToxic){ //if user selected option is equal to array's correct ecolo
        userScore += 0.25; //upgrading score value with 1
        SCORPOLLUEUR += 1;
        ecolo.classList.add("toxic"); //adding green color to correct selected option
        ecolo.insertAdjacentHTML("beforeend", Tagpollueur); //adding tick icon to correct selected option
        console.log("Correct toxic");
        console.log("Your correct toxic = " + userScore);
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const personne = result_box.querySelector(".icon");
    const scoreText = result_box.querySelector(".score_text");
    let pourscor = ((userScore+SCORECOLO+SCORINDIFF+SCORPOLLUEUR+SCORPROTECT)/5)*10;
    let poureco = (SCORECOLO/10)*100;
    let pourprot = (SCORPROTECT/10)*100;
    let pourindiff = (SCORINDIFF/10)*100;
    let pourpollueur = (SCORPOLLUEUR/10)*100;
    if ((poureco > pourprot) && (poureco>pourpollueur)&&(poureco>pourindiff)){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<center>Tu es un ECOLO!! <div id="random-textg"></ul></center>';
        let personnes = '<img src="https://cdn.discordapp.com/attachments/731172156913746023/1100117456435023952/Fichier_4.png" alt="" width="250" height="350" >';
        personne.innerHTML = personnes;  //adding new span tag inside score_Text
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
        scoreText.style.display = "flex";
        scoreText.style.flexDirection = "column";
        scoreText.style.justifyContent = "center";
        var texts = [
            "Je suis tellement fier de toi pour tout ce que tu fais pour aider l'environnement.",
            "Tu es un vrai champion de l'environnement, continue comme ça !",
            "Tu as vraiment compris l'importance de prendre soin de notre planète, et ça fait une grande différence.",
            "Chaque geste compte, et grâce à tes efforts, nous sommes tous un peu plus près d'un avenir plus durable et respectueux de l'environnement."
            
          ];
          
          // Récupérer l'élément HTML pour afficher le texte aléatoire
          var randomTextElementg = document.getElementById("random-textg");
          
          // Générer un nombre aléatoire pour accéder au texte aléatoire dans le tableau
          var randomIndexg = Math.floor(Math.random() * texts.length);
          
          // Afficher le texte aléatoire sur la page HTML
          randomTextElementg.innerHTML = texts[randomIndexg];
          ;
    }
    else if((pourprot > poureco)&&(pourprot > pourpollueur)&&(pourprot > pourindiff)){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<center>Tu es un PROTECTEUR!! <div id="random-textv"></ul></center>';
        
        let personnes = '<img src="https://cdn.discordapp.com/attachments/731172156913746023/1100117308359331901/Fichier_8.png" alt="" width="250" height="350" >';
        personne.innerHTML = personnes;  //adding new span tag inside score_Text
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
        scoreText.style.display = "flex";
        scoreText.style.flexDirection = "column";
        scoreText.style.justifyContent = "center";
        var texts = [
            "Continuez à prendre soin de notre planète en faisant des choix respectueux de l'environnement tous les jours.",
            "N'oubliez pas que même les petites actions peuvent faire une grande différence. Chaque geste compte pour aider à protéger notre planète.",
            "Essayez de penser à des moyens créatifs pour réduire votre impact environnemental. Vous pourriez être surpris par toutes les choses que vous pouvez faire pour protéger la planète.",
            "Soyez curieux et posez des questions. Plus vous en apprenez sur l'environnement, plus vous serez équipés pour faire des choix éclairés et respectueux de la planète."
            
          ];
          
          // Récupérer l'élément HTML pour afficher le texte aléatoire
          var randomTextElementv = document.getElementById("random-textv");
          
          // Générer un nombre aléatoire pour accéder au texte aléatoire dans le tableau
          var randomIndexv = Math.floor(Math.random() * texts.length);
          
          // Afficher le texte aléatoire sur la page HTML
          randomTextElementv.innerHTML = texts[randomIndexv];
          ;
    }
    else if((pourindiff > poureco)&&(pourindiff > pourpollueur)&&(pourindiff > pourprot)){ // if user scored more than 1
        let scoreTag = '<center>Tu es un INDIFFÉRENT!! <div id="random-textt"></ul></center>';
        let personnes = '<img src="https://cdn.discordapp.com/attachments/731172156913746023/1100117416610103336/Fichier_2.png" alt="" width="250" height="350" >';
        personne.innerHTML = personnes;  //adding new span tag inside score_Text
        scoreText.innerHTML = scoreTag;
        scoreText.style.display = "flex";
        scoreText.style.flexDirection = "column";
        scoreText.style.justifyContent = "center";
        var texts = [
            "Sais-tu que la nature a besoin de notre aide pour rester en bonne santé ?",
            "Nous pouvons tous faire notre part pour protéger la planète et rendre notre monde meilleur.",
            "As-tu déjà pensé à l'impact que nous avons sur l'environnement ? Chaque petit geste compte.",
            "En prenant soin de notre planète, nous prenons soin de nous-mêmes et de notre avenir."
            
          ];
          
          // Récupérer l'élément HTML pour afficher le texte aléatoire
          var randomTextElementt = document.getElementById("random-textt");
          
          // Générer un nombre aléatoire pour accéder au texte aléatoire dans le tableau
          var randomIndexx = Math.floor(Math.random() * texts.length);
          
          // Afficher le texte aléatoire sur la page HTML
          randomTextElementt.innerHTML = texts[randomIndexx];
          ;
        
    }
    else{ // if user scored less than 1
    
        let scoreTag = '<center>Tu es un POLLUEUR EXTREME!! <div id="random-text"></ul></center>'; // Définir un tableau de textes
        let personnes = '<img src="https://cdn.discordapp.com/attachments/731172156913746023/1100117359118790789/Fichier_7.png" alt="" width="250" height="350">';
        personne.innerHTML = personnes;  //adding new span tag inside score_Text
        scoreText.innerHTML = scoreTag;
        
        // Appliquer le style CSS pour afficher en ligne verticale
        scoreText.style.display = "flex";
        scoreText.style.flexDirection = "column";
        scoreText.style.justifyContent = "center";
          
    var texts = [
        "Utilise un sac réutilisable en tissu pour faire tes courses. Les sacs en plastique peuvent prendre des centaines d'années pour se décomposer, alors que les sacs en tissu peuvent être utilisés à plusieurs reprises.",
        "Évite de gaspiller de l'eau. Ferme le robinet pendant que tu te brosses les dents ou te laves les mains. De petites actions comme celles-ci peuvent économiser de l'eau et réduire la quantité d'énergie nécessaire pour la traiter.",
        "Évite de gaspiller de la nourriture. Ne prends que ce dont tu as besoin et termine ton assiette. Cela peut aider à réduire la quantité de nourriture gaspillée et à économiser de l'énergie nécessaire pour produire de la nourriture.",
        "Plante des arbres. Les arbres absorbent le dioxyde de carbone et produisent de l'oxygène, aidant ainsi à réduire la pollution de l'air."
        
      ];
      
      // Récupérer l'élément HTML pour afficher le texte aléatoire
      var randomTextElement = document.getElementById("random-text");
      
      // Générer un nombre aléatoire pour accéder au texte aléatoire dans le tableau
      var randomIndex = Math.floor(Math.random() * texts.length);
      
      // Afficher le texte aléatoire sur la page HTML
      randomTextElement.innerHTML = texts[randomIndex];
      ;
    }
}   

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAnsEcolo = questions[que_count].ecolo; 
            let correcAnsProtect = questions[que_count].Protect;
            let correcAnsIndif = questions[que_count].indif;
            let correcAnsToxic = questions[que_count].toxic; //getting correct ecolo from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAnsEcolo){ //if there is an option which is matched to an array ecolo
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", TagEcolo); //adding tick icon to matched option
                    
                }
                if(option_list.children[i].textContent == correcAnsProtect){ //if there is an option which is matched to an array ecolo
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", Tagprotecteur); //adding tick icon to matched option
                    
                }
                if(option_list.children[i].textContent == correcAnsIndif){ //if there is an option which is matched to an array ecolo
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", Tagindiff); //adding tick icon to matched option
                    
                }
                if(option_list.children[i].textContent == correcAnsToxic){ //if there is an option which is matched to an array ecolo
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", Tagpollueur); //adding tick icon to matched option
                    
                }
                
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 58 );
    function timer(){
        time += 1.9; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 1000){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}