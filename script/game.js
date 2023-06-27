//Résumé et commentaires finales
const fShortComBad = "C'est pas tout à fait ça..."
const fLongComBad = "Oula ! Heureusement que le Riddler est sous les verrous... Il faut que vous vous repassiez les films, cette fois en enlevant peut-être le masque qui vous a bloqué la vue ! Aller, rien n'est perdu !"

const fShortComOk = "Pas mal !"
const fLongComOk = "Encore un peu d'entrainement avec le Chevalier Noir vous serait bénéfique, mais vous pouvez marcher la tête haute, vos connaissances sont là. A vous de les consolider, foncez Gotham est votre terrain de chasse !"

const fShortComPerfect = "Bravo !"
const fLongComPerfect = "Vous êtes véritablement un super fan de l'univers de Batman ! Comices, films, rien ne vous échappe. Bruce Wayne a de quoi être fier, Gotham est en paix et Batman peut prendre sa retraite, vous veillez aux grains"

// Scroll to Element
function myScrollFunc(element) {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop
    });
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
const currentQ = document.querySelector(".currentQuestion")

function createCurrentQuestionnaire(element) {
    currentQ.innerText = element.question
    for (let resp of element.response) {
        createResponse(resp)
    }
}

//Functions for quizz start
const startGame = document.querySelector("#startGame")
const questionSect = document.querySelector("#questionnaire")

function showQuestionnaire() {
    questionSect.style.display = "flex"
}

function hideQuestionnaire() {
    questionSect.style.display = "none"
}

//Bouton question suivante et voir le résultat
const questions = document.querySelector(".nextDiv")
const showR = document.querySelector(".showDiv")

async function main() {
    try {
        const r = await fetch("https://batman-api.sayna.space/questions", {
            headers: {
                Accept: "application/json"
            }
        })

        if (!r.ok) {
            throw new Error("Erreur de chargement du questionnaire depuis le serveur")
        }

        const QBase = await r.json()

        //Définition des variables
        const totalQ = QBase.length
        let curQId = 1
        let curScore = 0

        //Démarrer le Quizz
        function initQuestions(database) {
            startGame.addEventListener("click", () => {
                showQuestionnaire()

                const currentQId = document.querySelector("#currentQId")
                currentQId.innerText = curQId

                createCurrentQuestionnaire(database[0])

                const sec2 = document.querySelector("#sec2")
                sec2.style.display = "none"

                myScrollFunc(questionSect)

                const totQNbrSpan = document.querySelector("#totalQNbr")
                totQNbrSpan.innerText = totalQ
            })
        }
        initQuestions(QBase)

        //Check answer and add point (Règle: choix multiple ; Une faute = 0 point)
        function checkAnswer() {
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
        }

        const nextBtn = document.querySelector(".nextBtn")
        function nextQ(database) {
            nextBtn.addEventListener("click", () => {
                checkAnswer()

                //Move to the next question
                document.querySelectorAll(".choicesDiv").forEach(div => div.remove())

                currentQ.innerText = ""
                createCurrentQuestionnaire(database[curQId])

                const totQNbrSpan = document.querySelector("#totalQNbr")
                totQNbrSpan.innerText = totalQ

                const currentQId = document.querySelector("#currentQId")
                currentQId.innerText = ++curQId
                console.log(curQId, totalQ)

                const setImg = document.querySelector("#imgQuizz")
                setImg.setAttribute("src", "./assets/Illustrations_game/Batgame_" + (2 + curQId) + ".png")

                if (curQId === totalQ) {
                    questions.style.display = "none"
                    showR.style.display = "flex"
                    checkAnswer()
                }
            })
        }
        nextQ(QBase)

        //Show Result
        const showFinalResultContainer = document.querySelector("#quizzFinal")
        function showFinalResult(score, totalNbreQ) {
            const finalScore = document.querySelector("#finalScore")
            finalScore.innerText = score

            const totalQuestionNbr = document.querySelector("#totalQuestionNbr")
            totalQuestionNbr.innerText = totalNbreQ

            const finalShortComment = document.querySelector("#finalShortComment")
            const finalLongComment = document.querySelector("#finalLongComment")

            if ((score / totalNbreQ * 10) <= 4) {
                finalShortComment.innerText = fShortComBad
                finalLongComment.innerText = fLongComBad
            } else if ((score / totalNbreQ * 10) <= 7) {
                finalShortComment.innerText = fShortComOk
                finalLongComment.innerText = fLongComOk
            } else {
                finalShortComment.innerText = fShortComPerfect
                finalLongComment.innerText = fLongComPerfect
            }

            showFinalResultContainer.style.display = "flex"
        }

        const showResult = document.querySelector(".showResult")
        showResult.addEventListener("click", () => {
            checkAnswer()

            hideQuestionnaire()

            showFinalResult(curScore, totalQ)
        })

        //Restart Quizz
        function restartQuizz(database) {
            const restartQuizzBtn = document.querySelector(".restartQuizzLink")
            restartQuizzBtn.addEventListener("click", () => {
                curQId = 1
                curScore = 0

                showFinalResultContainer.style.display = "none"

                document.querySelectorAll(".choicesDiv").forEach(div => div.remove())

                questions.style.display = "flex"
                showR.style.display = "none"

                document.querySelector("#imgQuizz").setAttribute("src", "./assets/Illustrations_game/Batgame_3.png")

                startGame.click()
            })
        }
        restartQuizz(QBase)

    } catch (e) {
        console.log("Erreur de chargement du questionnaire", e)
    }
}

main()