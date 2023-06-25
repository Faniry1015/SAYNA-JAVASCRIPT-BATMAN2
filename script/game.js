async function main() {
    const r = await fetch("")
}

const Q = [
    {
        question: "Quel est l’autre nom de l’Homme-Mystère ?",
        response: [
            {
                text: "Le Saphinx",
                isGood: true
            },
            {
                text: "Le Saphir",
                isGood: false
            },gi
            {
                text: "Le Joker",
                isGood: true
            }
        ]
    },
    {
        question: "Test 2 ?",
        response: [
            {
                text: "Le Bobody",
                isGood: false
            },
            {
                text: "Le Bisou",
                isGood: false
            },
            {
                text: "Le Calin",
                isGood: true
            }
        ]
    },
]

//current questionnaire point(score)
function score() {
    const allCheckbox = document.querySelectorAll(".true")
    allCheckbox.forEach((element) => {
        if (element.className === "true") {
            console.log("true")
        }
    })
}

//Choix pour chaque questionnaire courante
function createResponse(choice) {
    const createDivChoice = document.createElement("div")
    createDivChoice.className = "choicesDiv"
    createDivChoice.innerHTML =
        `<input type="checkbox" class="checkB ${choice.isGood}">
        <label for="">${choice.text}</label>`
    document.querySelector(".choisirReponse").append(createDivChoice)
}

//Current Questionnaire
function createCurrentQuestionnaire(element) {
    const currentQ = document.querySelector(".currentQuestion")
    currentQ.innerText = element.question

    for (let resp of element.response) {
        createResponse(resp)
    }

}

const totalQ = Q.length
let curQId = 1
let curScore = 0
let questionIndex = 1

function nextQ(database) {
    const nextBtn = document.querySelector(".nextBtn")
    nextBtn.addEventListener("click", () => {
        //Check answer and add point
        let answer = false
        const allCheckbox = document.querySelectorAll(".checkB")
        let allCheckboxTab = []
        console.log(allCheckbox)
        allCheckbox.forEach((element => {
            if ((element.checked && element.classList.contains("true")) || (!element.checked && element.classList.contains("false"))) {
                allCheckboxTab.push(true)
            } else {
                allCheckboxTab.push(false)
            }
        }))
        console.log(allCheckboxTab)
        answer = allCheckboxTab.every(element => element)
        if (answer) {
            ++curScore
        }
        console.log(curScore)

        //Move to the next question
        document.querySelectorAll(".choicesDiv").forEach(div => div.remove())
        const currentChoice = document.querySelector(".choisirReponse div")
        createCurrentQuestionnaire(Q[questionIndex])
        questionIndex++

        const totQNbrSpan = document.querySelector("#totalQNbr")
        totQNbrSpan.innerText = totalQ

        const currentQId = document.querySelector("#currentQId")
        currentQId.innerText = ++curQId
    })

}

nextQ(Q)

//Démarrer le QUIZZ
function showQ() {
    const startGame = document.querySelector("#startGame")
    const questionSect = document.querySelector("#questionnaire")
    startGame.addEventListener("click", (e) => {
        e.preventDefault
        showQuestionnaire()

        const currentQId = document.querySelector("#currentQId")
        currentQId.innerText = curQId
        createCurrentQuestionnaire(Q[0])
    })

    function showQuestionnaire() {
        questionSect.style.display = "block"
    }

    const totQNbrSpan = document.querySelector("#totalQNbr")
    totQNbrSpan.innerText = totalQ
}

showQ()