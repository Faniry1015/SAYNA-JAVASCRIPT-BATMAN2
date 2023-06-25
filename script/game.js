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

        //Démarrer le QUIZZ
        function showQ() {
            const startGame = document.querySelector("#startGame")
            const questionSect = document.querySelector("#questionnaire")
            startGame.addEventListener("click", (e) => {
                e.preventDefault
                showQuestionnaire()

                const currentQId = document.querySelector("#currentQId")
                currentQId.innerText = curQId
                createCurrentQuestionnaire(QBase[0])

                const sec2 = document.querySelector("#sec2")
                sec2.style.display = "none"
            })

            function showQuestionnaire() {
                questionSect.style.display = "block"
            }

            const totQNbrSpan = document.querySelector("#totalQNbr")
            totQNbrSpan.innerText = totalQ
        }

        showQ()

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

        function nextQ(database) {
            const nextBtn = document.querySelector(".nextBtn")
            nextBtn.addEventListener("click", () => {
                checkAnswer()
                //Move to the next question
                document.querySelectorAll(".choicesDiv").forEach(div => div.remove())

                currentQ.innerText = ""
                createCurrentQuestionnaire(QBase[curQId])

                const totQNbrSpan = document.querySelector("#totalQNbr")
                totQNbrSpan.innerText = totalQ

                const currentQId = document.querySelector("#currentQId")
                currentQId.innerText = ++curQId
                console.log(curQId, totalQ)

                const setImg = document.querySelector("#imgQuizz")
                setImg.setAttribute("src", "./assets/Illustrations_game/Batgame_"+ (2 + curQId) + ".png")

                if (curQId === totalQ) {
                    const questions = document.querySelector(".questions")
                    questions.style.display = "none"
                    const showR = document.querySelector(".showDiv")
                    showR.style.display = "block"
                }
            })

        }
        nextQ(QBase)

        //Show Result
        const showResult = document.querySelector(".showResult")
        showResult.addEventListener("click", () => {
            checkAnswer()
        })

    } catch (e) {
        console.log("Erreur de chargement du questionnaire", e)
    }
}

main()