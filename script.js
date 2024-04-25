document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start-btn");
    const gameContainer = document.getElementById("game-container");
    const startContainer = document.getElementById("start-container");
    const rankingContainer = document.getElementById("ranking-container");
    const playerNameInput = document.getElementById("player-name");
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const scoreElement = document.getElementById("score-value");
    const thermometerElement = document.getElementById("thermometer");
    const negativeBarElement = document.getElementById("negative-bar");
    const resetButton = document.getElementById("reset-btn");
    const rankingButton = document.getElementById("ranking-btn");

    let playerName = "";
    let currentQuestionIndex = 0;
    let score = 0;
    let temperature = 50;

    const questions = [
        {
            question: "contesta las preguntas siguientes correctamente para ganar puntos, al responder correctamente obtendras 10 puntos por lo contrario al responder mal se te restaran 10 puntos al final el equivo que aga mas puntos ganara un premio los puntos se mostraran y guardaran al final de contestar las preguntas en el ranking mucha suerte, disfruta el juego ",
            answers: [
                { text: "muy bien", correct: true },
                { text: "no entendi", correct: true },
                { text: "no quiero jugar", correct: false },
                { text: "ya dame el premio y ya", correct: true },
            ],
        },
        {
            question: "¿Cuál es unidad SI de temperatura?",
            answers: [
                { text: "celsius", correct: false },
                { text: "kelvin", correct: true },
                { text: "fahrenheit", correct: false },
                { text: "rankine", correct: false },
            ],
            question: "¿Que tipo de energia se transfiere entre dos objetos a diferentes temperaturas cuando estar en contacto termico?",
            answers: [
                { text: "energia termica", correct: true },
                { text: "energia mecanica", correct: false },
                { text: "energia cinetica", correct: false },
                { text: "energia potencial", correct: false },
            ],
        },
        {
            question: "¿cuantos grandos fahrenheit son 60 grados celcius?",
            answers: [
                { text: "158 grados", correct: true },
                { text: "159 grados", correct: false },
                { text: "160 grados", correct: false },
                { text: "120 grados", correct: false },
            ],
        },
        {
            question: "¿cuantos grados kelvin son 1 grado celcius?",
            answers: [
                { text: "275.15", correct: false },
                { text: "276.15", correct: false },
                { text: "274.15", correct: true },
                { text: "277.15", correct: false },
            ],
        },
        {
            question: "¿cual de las siguentes opciones define mejor la dilatacion lineal?",
            answers: [
                { text: "aumento en la longitud de un objeto cuando se calienta", correct: true },
                { text: "aumento en el area de una superficie cuando se calienta", correct: false },
                { text: "aumento en el volumen de un objeto cuando se calienta", correct: false },
                { text: "todas las anteriores", correct: false },
            ],
        },
        {
            question: "¿Que sucede durante la dilatacion superficial?",
            answers: [
                { text: "aumento en la longitud de un objeto cuando se calienta", correct: false },
                { text: "aumento en el area de una superficie cuando se calienta", correct: true },
                { text: "aumento en el volumen de un objeto cuando se calienta", correct: false },
                { text: "todas las anteriores", correct: false },
            ],
        },
        {
            question: "¿cual de las siguentes opciones define mejor la dilatacion volumetrica?",
            answers: [
                { text: "aumento en la longitud de un objeto cuando se calienta", correct: false },
                { text: "aumento en el area de una superficie cuando se calienta", correct: false },
                { text: "aumento en el volumen de un objeto cuando se calienta", correct: true },
                { text: "todas las anteriores", correct: false },
            ],
        },
        {
            question: "¿porque el agua se expande al congelarce a diferencia de las mayorias de las sustancias?",
            answers: [
                { text: "debido a que sus moleculas se alinean de manera irregular en la face solida", correct: true },
                { text: "porque sus moleculas se hacen mas densas al enfriarse", correct: false },
                { text: "porque su estructura molecular se contrae al alcansar el punto de congelacion", correct: false },
                { text: "debido a que la energia termica reduce la distancia de sus moleculas", correct: false },
            ],
        },
        {
            question: "selecciona los efectos de calor y temperatura por cambio climatico",
            answers: [
                { text: "los peces tienen calor", correct: false },
                { text: "la nieve y las paletas de hielo se derriten", correct: false },
                { text: "taylor swift saca mas musica por el calor", correct: false },
                { text: "aumento de la temperatura global, derritiendo los polos", correct: true },
            ],
        },
        {
            question: "¿que es calor latente de fusion?",
            answers: [
                { text: "es la cantidad necesaria para cambiar la fase de una sustancia de estado solido a liquido sin cambio de temperatura", correct: true },
                { text: "cantidad de calor que una sustancia libera por unidad de masa cuando cambia de estado liquido a estado solido a una temperatura constante", correct: false },
            ],
        },
        {
            question: "¿Que es calor latente de solidificacion ?",
            answers: [
                { text: "es la cantidad necesaria para cambiar la fase de una sustancia de estado solido a liquido sin cambio de temperatura", correct: false },
                { text: "cantidad de calor que una sustancia libera por unidad de masa cuando cambia de estado liquido a estado solido a una temperatura constante", correct: true },
            ],
        },
        {
            question: "¿selecciona lo que hace el calorimetro?",
            answers: [
                { text: "mide los decibeles", correct: false },
                { text: "mide la cantidad de calor suministrada", correct: true },
                { text: "mide la radiacion", correct: false },
                { text: "mide la luz ", correct: false },
            ],
        },
        {
            question: "¿cual es la funcion del calorimetro?",
            answers: [
                { text: "medidor de calorias presente", correct: false },
                { text: "usado para medir cantidad de calor liberado", correct: true },
                { text: "para calentar alimentos y bebidas de manera rapida", correct: false },
                { text: "utilizada para enfriar sustancias calientes rapidamente", correct: false },
            ],
        },
        {
            question: "¿en que ejemplo se cede el calor?",
            answers: [
                { text: "el hielo se derrite en una habitacion caliente", correct: false },
                { text: "una tasa de cafe caliente enfria al transferir calor a la mesa donde se ubica", correct: true },
                { text: "un objeto se calienta por recibir calor directamente del sol", correct: false },
                { text: "una linterna encendida", correct: false },
            ],
        },
        {
            question: "¿en que ejemplo absorbe el calor?",
            answers: [
                { text: "un hielo absorve calor y se derrite", correct: true },
                { text: "un calentador electrico absorve calor del ambiente para generar mas calor", correct: false },
                { text: "un ventilador absorbe calor del aire para enfriar una habitacion", correct: false },
                { text: "un calentador electrico absorve mas calor para generar mas calor", correct: false },
            ],
        },
        {
            question: "convierte 85 grados fahrenhait a rankine",
            answers: [
                { text: "545", correct: true },
                { text: "170", correct: false },
                { text: "256", correct: false },
                { text: "666", correct: false },
            ],
        },
        {
            question: "calcula el volumen final de 5.5 litros de glicerina si se calienta de 4 grados celcius a 25 grados celcius",
            answers: [
                { text: "55.5x10-03", correct: false },
                { text: ".55x10-3", correct: false },
                { text: "5.5x10-3", correct: false },
                { text: "5.5x10-03", correct: true },
            ],
        },
        {
            question: "¿Qué instrumento se utiliza para medir la temperatura?",
            answers: [
                { text: "Termómetro", correct: true },
                { text: "Barómetro", correct: false },
                { text: "Higrómetro", correct: false },
                { text: "Anemómetro", correct: false },
            ],
        },
        {
            question: "¿como mides tu temperatura corporal?",
            answers: [
                { text: "Termómetro", correct: true },
                { text: "Barómetro", correct: false },
                { text: "Higrómetro", correct: false },
                { text: "Anemómetro", correct: false },
            ],
        },
        {
            question: "¿cuantos grados farenheit son 320 grados rankine?",
            answers: [
                { text: "-140", correct: true },
                { text: "640", correct: false },
                { text: "280", correct: false },
                { text: "140", correct: false },
            ],
        },
        {


            question: "determina el calor especifico de una muestra metalica de 400g y si al suministrarle 620 calorias aumento su temperatura de 15 grados a 65 grados,¿cual es el calor especifico? ",
            answers: [
                { text: "0.31cal/g", correct: false },
                { text: "0.031cal/g", correct: true },
                { text: "1.5cal/g", correct: false },
                { text: "75.031cal/g", correct: false },
            ],
        },
    ];

    startButton.addEventListener("click", startGame);
    resetButton.addEventListener("click", resetGame);
    rankingButton.addEventListener("click", showRanking);

    function startGame() {
        playerName = playerNameInput.value.trim();
        if (playerName === "") {
            alert("Por favor ingresa tu nombre");
            return;
        }
        startContainer.style.display = "none";
        gameContainer.style.display = "block";
        currentQuestionIndex = 0;
        score = 0;
        temperature = 50;
        updateScore();
        showQuestion();
        updateThermometer();
    }

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionElement.innerHTML = `<div style="background-color: ${currentQuestionIndex % 2 == 0 ? '#f00' : '#ff6600'}; padding: 10px; border-radius: 10px; margin-bottom: 10px;">${question.question}</div>`;
        optionsContainer.innerHTML = "";
        question.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.textContent = answer.text;
            button.classList.add("btn");
            button.style.backgroundColor = currentQuestionIndex % 2 == 0 ? '#3366ff' : '#33cc33';
            button.addEventListener("click", () => selectAnswer(answer.correct));
            optionsContainer.appendChild(button);
        });
    }

    function selectAnswer(correct) {
        if (correct) {
            score += 10;
        } else {
            score -= 10;
        }
        updateScore();
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endGame();
        }
        updateThermometer();
    }

    function endGame() {
        gameContainer.style.display = "none";
        rankingContainer.style.display = "block";
        saveScore();
        showRanking();
    }

    function resetGame() {
        rankingContainer.style.display = "none";
        startContainer.style.display = "block";
        playerNameInput.value = "";
    }

    function updateScore() {
        scoreElement.textContent = score;
    }

    function saveScore() {
        const scores = JSON.parse(localStorage.getItem("scores")) || [];
        scores.push({ name: playerName, score: score });
        localStorage.setItem("scores", JSON.stringify(scores));
    }

    function showRanking() {
        const scores = JSON.parse(localStorage.getItem("scores")) || [];
        scores.sort((a, b) => b.score - a.score);
        const rankingList = document.getElementById("ranking-list");
        rankingList.innerHTML = "";
        scores.forEach((player, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${player.name}: ${player.score}`;
            rankingList.appendChild(listItem);
        });
    }

    function updateThermometer() {
        if (score >= 0) {
            thermometerElement.style.height = `${temperature - score}%`;
            negativeBarElement.style.height = `${0}%`;
        } else {
            thermometerElement.style.height = `${temperature}%`;
            negativeBarElement.style.height = `${Math.abs(score) * 5}%`;
        }
    }
});
