const userId = 'SEU_USER_ID';
const apiToken = 'SEU_API_TOKEN';

let completedQuests = [];
const holderCompletedQuests = document.getElementById('completed-quests-holder');

let houseIcon = '<i class="ph-fill ph-user-circle"></i>';

async function getData() {
    try {
        const response = await fetch('https://habitica.com/api/v3/user', {
            method: 'GET',
            headers: {
                'x-api-user': '0c2d98cb-2fbe-4c3c-8a1a-a962424e4a41',
                'x-api-key': 'ee6c348f-bcc5-4cb4-889f-30a05a6f2c7f',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }

        const data = await response.json();

        const dataAll = data.data;

        // Quests completadas geralmente estão em data.data.achievements.quests
        const completedQuestsData = data.data.achievements.quests;

        completedQuests = completedQuestsData;

        console.log('Dados:', dataAll);
        console.log('Quests Completadas:', completedQuests, completedQuestsData);

        Object.keys(completedQuests).forEach((key) => {
            holderCompletedQuests.innerHTML += `<span>${houseIcon}</span>`;
        });

        return dataAll;
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Chamar a função
getData();
