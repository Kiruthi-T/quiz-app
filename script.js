let start = () => {
    let quiz = [
        {
            que: "1.Html Stands for?",
            ans: ["Hyper text language", "hyper tend programing language", "Hyper text markup language", "hyper tech mark language"],
            rightans: "Hyper text markup language"
        },
        {
            que: "2. What does CSS stand for?",
            ans: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "None of these"],
            rightans: "Cascading Style Sheets"

        },
        {
            que: "3.Who was the primary Author of Html?",
            ans: ["Brendan Erich", "Sabeer Bhatiya", "Google Inc", "Tim Berners-Lee"],
            rightans: "Tim Berners-Lee"

        },
        {
            que: "4. What is the correct HTML element for inserting a line break?",
            ans: ["br", "break", "lb", "line"],
            rightans: "br"

        },
        {
            que: "5.The href atribute in the link tag specifies the:",
            ans: ["Destination of a link", "link", "Hypertext", "none of the above"],
            rightans: "Destination of a link"

        }
    ];

    let stbtn = document.getElementById("stbtn");
    stbtn.style.display = "none";

    let stpara = document.getElementById("stpara");
    stpara.style.display = "none";

    let stpara2 = document.getElementById("stpara2");
    stpara2.style.display = "none";


    let maindiv = document.getElementById("content");       //whole div
    console.log(maindiv);


    let timer = document.createElement("p");               //creating a p for timer
    maindiv.appendChild(timer);
    timer.className = "timer ";

    let colordiv = document.createElement("div");           //Q and A div
    colordiv.className = "colorcontainer";
    maindiv.appendChild(colordiv);


    let btndiv = document.createElement("div");               //btn div
    btndiv.className = "btndiv";
    maindiv.appendChild(btndiv);

    let Nbtn = document.createElement("button");
    btndiv.appendChild(Nbtn);                                 //next btn
    Nbtn.id = "btn";

    let currentIndex = 0;                   // intial index value
    let mark = 0;                           //initial mark
    let interval;                           // for show timer intervel 
    let questioninterval;                   //for question interval
    let myans;

    let display = (indexval) => {
        colordiv.innerHTML = "";

        if (indexval < quiz.length) {

            let timeleft = 10;                       // for timer number
            timer.innerHTML=`Time left: ${timeleft}`;
            clearInterval(interval);

            interval=setInterval(()=>{
                timeleft--;
                timer.innerHTML=`Time left: ${timeleft}`;
                // if (timeleft<=1){
                //     clearInterval(interval);
                // }
            },1000);

            let question = document.createElement("h2");
            colordiv.appendChild(question);
            question.innerHTML = quiz[indexval].que

            quiz[indexval].ans.forEach((ans) => {

                let btn = document.createElement("button");
                btn.innerHTML = ans;
                btn.className = "ans";
                colordiv.appendChild(btn);

                btn.addEventListener("click", () => {
                    myans = btn.innerHTML;

                    if (myans == quiz[indexval].rightans) {
                        mark += 1;
                    };
                    next();

                })
            });

        }
        else {
            clearInterval(questioninterval); 
            timer.style.display="none"

            Nbtn.style.display = "none";
            colordiv.innerHTML = `your mark is ${mark}/5`;

            allans = document.createElement("button");          //to chrate butten for all answers
            allans.innerHTML = "SHOW ANSWERS";
            maindiv.appendChild(allans);
            allans.className = "allans";

            allans.addEventListener("click", () => {
                clearInterval(questioninterval); 

                let body=document.getElementById("body")
                body.style.height="auto";

                colordiv.innerHTML="";
                maindiv.removeChild(allans);
                maindiv.removeChild(timer);

                quiz.forEach((last) => {
                    let question = document.createElement("h2");
                    colordiv.appendChild(question);
                    question.innerHTML = last.que;
                
                    last.ans.forEach((ans) => {
                        let btn = document.createElement("button");
                        btn.innerHTML = ans;
                        btn.className = "ans";
                        colordiv.appendChild(btn);

                        if(btn.innerHTML==last.rightans){
                            btn.style.backgroundColor="rgb(67, 231, 67)";
                        }
                    });

                });
                
            });
        }

        (indexval == quiz.length - 1) ? Nbtn.innerHTML = "SUBMIT" : Nbtn.innerHTML = "NEXT";    //change the name of the next btn to submit in last question
    };

    display(currentIndex);

    let next = () => {
        currentIndex++;
        clearInterval(questioninterval); 
        display(currentIndex);

        questioninterval=setInterval(()=>{
            currentIndex++;
            if (currentIndex >= quiz.length) {
                clearInterval(questioninterval);            // Ensure to clear the interval after the last question
            }
            display(currentIndex);
        },10000)
    }
    Nbtn.addEventListener("click", next);

    questioninterval=setInterval(()=>{
        currentIndex++;
        if (currentIndex >= quiz.length) {
            clearInterval(questioninterval);            // Ensure to clear the interval after the last question
        }
        display(currentIndex);
    },10000);
};
