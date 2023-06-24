async function quizz(questions) {
    //Déclaration de variables
    let totalPoint = 0
    let currentQuiz = 0  //index de la question courante
    let totQuiz = questions.lenght

    let totQ = document.querySelector("#totalQ")
    totQ.innerText = totQuiz

    function setForm(question, response, nbreQuiz) {
        const illustImg = document.querySelector("#img-illustrate")
        illustImg.setAttribute("src", "./assets/Illustrations_game/Batgame_" + (2 + nbreQuiz)+".png")

        const quizQ = document.querySelector(".currentQuestion")
        quizQ.innerText = ""
        quizQ.append("<p class='question' id = 'question')></p>")
        const questText = document.querySelector("#question")
        questText.innerText = question

        for (let i = 0 ; i < response.length ; i++) {
            quizQ.append("<label for='checkbox' + i + 'class")
        }
    }


}

<div class="qcm">
                            <input type="checkbox" name="quizz0" id="">
                            <label for="">Le Sphinx</label>
                        </div>
                        <div class="qcm">
                            <input type="checkbox" name="quizz0" id="">
                            <label for="">Saphir</label>
                        </div>
                        <div class="qcm">
                            <input type="checkbox" name="quizz0" id="">
                            <label for="">Le Joker</label>
                        </div>