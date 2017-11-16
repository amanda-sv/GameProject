var Quests = {
    'questDoMel': {
        text: 'Quest do mel',
        condition: function (player) {
            // percorrer as quests do player e procura (find) uma quest
            // com o nome igual a pegarMel
            var questPegarMel = player.quests.find(function (quest) {
                return quest == 'pegarMel';
            })
            return !questPegarMel;
        },
        result: function (player) {
            player.quests.push('pegarMel');
        }
    },
    'entregarMel': {
        text: 'Entregar mel',
        condition: function (player) {
            var questPegarMel = player.quests.find(function (quest) {
                return quest == 'pegarMel';
            })
            return questPegarMel;
        },
        result: function (player) {
            if (!player.inventory.hasItem('mel')) {
                player.takeDamage(40);
                return 'Você não tem mel! >< Toma essa picada!';
            }
            player.removeItemFromInventory('mel');
            console.log("Quest concluida");
            var questIndex = -1;
            var questPegarMel = player.quests.forEach(function (quest, index) {
                if (quest == 'pegarMel') {
                    questIndex = index;
                }
            })
            player.quests.splice(questIndex, 1);
            //player.experience += 50;
            player.upLevel(50);
            console.log(player.experience, player.level);
        }
    }
}