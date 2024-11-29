async function fetchTasks() {
    const response = await fetch("https://habitica.com/api/v3/tasks/user", {
        method: "GET",
        headers: {
            "x-client": "0c2d98cb-2fbe-4c3c-8a1a-a962424e4a41-MyApp",
            "x-api-user": "0c2d98cb-2fbe-4c3c-8a1a-a962424e4a41",
            "x-api-key": "ee6c348f-bcc5-4cb4-889f-30a05a6f2c7f"
        }
    });

    const data = await response.json();
    return data;
}

const levels = {
    1: {
        exp: 50,
        meaning: 'A personagem está apenas começando a entender suas responsabilidades na cidade. Ela ainda está explorando seu papel, cometendo erros, mas mostrando potencial.'
    },
    2: {
        exp: 150,
        meaning: 'Adaptando-se e ganhando confiança.'
    },
    3: {
        exp: 350,
        meaning: 'Começa a contribuir de forma consistente.'
    },
    4: {
        exp: 750,
        meaning: 'Desenvolve habilidades avançadas.'
    },
    5: {
        exp: 1550,
        meaning: 'Líder confiável em sua área.'
    },
    6: {
        exp: 3150,
        meaning: 'Inspira outros e melhora a comunidade.'
    },
    7: {
        exp: 6350,
        meaning: 'Assume um papel de liderança maior.'
    },
    8: {
        exp: 12750,
        meaning: 'Traz inovações e transforma a cidade.'
    },
    9: {
        exp: 25550,
        meaning: 'Redefine sua área de atuação.'
    },
    10: {
        exp: 51150,
        meaning: 'Se torna um ícone da cidade.'
    }
}

async function init() {
    const dataFetched = await fetchTasks();

    const task01 = dataFetched.data[0].history.reduce((sum, entry) => sum + entry.scoredUp, 0);

    let characters = {
        "01": {
            name: 'Emma Anderson',
            job: 'Task Notation',
            exp: task01,
        },
        "02": {
            name: 'Sophia Thompson',
            job: 'Water Drinking'
        },
        "03": {
            name: 'Olivia Parker',
            job: 'Focus Supervision'
        },
        "04": {
            name: 'Ava Mitchell',
            job: 'Work Microtasking'
        },
        "05": {
            name: 'Isabella Reynolds',
            job: 'Programming Microtasking'
        },
        "06": {
            name: 'Mia Collins',
            job: 'Programming Student'
        },
        "07": {
            name: 'Emily Evans',
            job: 'Design Student'
        },
        "08": {
            name: 'Abigail Murphy',
            job: 'Domestic Microtasking'
        },
        "09": {
            name: 'Madison Morris',
            job: 'Selfcare Microtasking'
        },
        "10": {
            name: 'Charlotte Rogers',
            job: 'Child Care'
        },
        "11": {
            name: 'Amelia Reed',
            job: 'Celebration Agent'
        },
        "12": {
            name: 'Harper Bell',
            job: 'TRPG Planner'
        },
        "13": {
            name: 'Ella Murray',
            job: 'TRPG Storyteller'
        }
    }

    const mayor = characters["01"].name;
    const mayorCitations = document.querySelectorAll('.c__tasknotation');
    const mayorCitationsExp = document.querySelectorAll('.c__tasknotation__exp');
    mayorCitations.forEach(citation => {
        citation.textContent = mayor;
    });
    mayorCitationsExp.forEach(citation => {
        citation.textContent = characters["01"].exp;
    });

    const water = characters["02"].name;
    const waterCitations = document.querySelectorAll('.c__waterdrink');
    waterCitations.forEach(citation => {
        citation.textContent = water;
    });
}

init();
