const questions = [
    {
        question:"He _____  playing.",
        answers:[
            { text: "is", correct: true},
            { text: "am", correct: false},
            { text: "have", correct: false},
            { text: "had", correct: false},
        ]
    },
    {
        question:"Yesterday, he _____ a meeting.",
        answers:[
            { text: "is", correct: false},
            { text: "am", correct: false},
            { text: "have", correct: false},
            { text: "had", correct: true},
        ]
    },
    {
        question:"I _____  happy to see you.",
        answers:[
            { text: "is", correct: false},
            { text: "am", correct: false},
            { text: "was", correct: true},
            { text: "had", correct: false},
        ]
    }
]

const questionElement = document.getElementById("question")
const ansBtns = document.getElementById("ans-btn")
const nxtBtn = document.getElementById("next-btn")

let currentQnIndex = 0
let score = 0

function startQuiz(){
    currentQnIndex = 0
    score = 0
    nxtBtn.innerHTML = "Next"
    showQn()
}

function showQn(){
    resetState()
    let currentQn = questions[currentQnIndex]
    let qnNo = currentQnIndex + 1
    questionElement.innerHTML = qnNo + ". " + currentQn.question

    currentQn.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        ansBtns.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAns)
    })
}

function resetState(){
    nxtBtn.style.display = "none"
    while(ansBtns.firstChild){
        ansBtns.removeChild(ansBtns.firstChild)
    }
}

function selectAns(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++ // Increment score if the answer is correct
    }else{
        selectedBtn.classList.add("incorrect")
    }

    Array.from(ansBtns.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    })
    // Show the "Next" button after an answer is selected
    nxtBtn.style.display = "block"
}

function showScore(){
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nxtBtn.innerHTML = "Play Again"
    nxtBtn.style.display = "block"
}

function handleNxtBtn(){
    currentQnIndex++
    if(currentQnIndex < questions.length){
        showQn()
    }else{
        showScore()
    }
}

nxtBtn.addEventListener("click", () =>{
    if(currentQnIndex < questions.length){
        handleNxtBtn()
    }else{-
        startQuiz()
    }
})


startQuiz()