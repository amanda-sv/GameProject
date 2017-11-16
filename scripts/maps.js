// Object maps{} containing a list of sprites to populate the map.
//      'O' = Obstacle, 'T' = Teleport, 'M' = Monster, 'E' = Event
var maps = {
    'mainCity': [
        // top right teleport
        { imageX: 0, imageY: 0, x: 24, y: 0, type: 'T', config: { toMap: 'forest1', toPosition: { x: 0, y: 6 } } },
        { x: 24, y: 1, type: 'T', config: { toMap: 'forest1', toPosition: { x: 0, y: 7 } } },
        // bottom left teleport
        { x: 0, y: 17, type: 'T', config: { toMap: 'cityCastle', toPosition: { x: 24, y: 17 } } },
        { x: 0, y: 18, type: 'T', config: { toMap: 'cityCastle', toPosition: { x: 24, y: 18 } } },
        { x: 0, y: 19, type: 'T', config: { toMap: 'cityCastle', toPosition: { x: 24, y: 19 } } },
        // sqm with event
        { // sqm that heals when clicked
            x: 3, y: 5, type: 'E', config: { class: 'healingSQM' },
            action: function (player) {
                player.healLife(10);
                Animations.receiveHeal(3);
            },
        },
        { // sqm with collectible item
            x: 6, y: 12, type: 'E', config: { class: 'honey' },
            action: function (player) {
                player.getItemInMap('mel');
            }
        },
        {
            x: 4, y: 12, type: 'E', config: { class: 'honey' },
            action: function (player) {
                player.getItemInMap('mel');
            }
        },
        // obstacles
        { x: 14, y: 2, type: 'O', config: { area: [1, 11] } },
        { x: 11, y: 14, type: 'O', config: { area: [1, 6] } },
        { x: 11, y: 13, type: 'O', config: { area: [4, 1] } },
        { x: 15, y: 2, type: 'O', config: { area: [7, 1] } },
        { x: 21, y: 3, type: 'O', config: { area: [1, 3] } },
        { x: 21, y: 6, type: 'O', config: { area: [4, 1] } },
        { x: 6, y: 0, type: 'O', config: { area: [1, 5] } },
        // enemies
        { x: 8, y: 2, type: 'M', config: { id: 1, monster: 'bee-front', type: 'bee', name: 'Bee' } },
        {
            x: 10, y: 2, type: 'M', config: { id: 2, monster: 'bee-front', type: 'bee', name: 'Bee' },
            contextActions: [
                Quests.questDoMel,
                Quests.entregarMel
            ]
        },
    ],
    'forest1': [
        // left teleport
        { x: 0, y: 6, type: 'T', config: { toMap: 'mainCity', toPosition: { x: 24, y: 0 } } },
        { x: 0, y: 7, type: 'T', config: { toMap: 'mainCity', toPosition: { x: 24, y: 0 } } },
        { x: 0, y: 8, type: 'T', config: { toMap: 'mainCity', toPosition: { x: 24, y: 1 } } },
        { x: 0, y: 9, type: 'T', config: { toMap: 'mainCity', toPosition: { x: 24, y: 1 } } },
    ],
    'cityCastle': [
        // right teleport
        { x: 24, y: 17, type: 'T', config: { toMap: 'mainCity', toPosition: { x: 0, y: 17 } } },
        { x: 24, y: 18, type: 'T', config: { toMap: 'mainCity', toPosition: { x: 0, y: 18 } } },
        { x: 24, y: 19, type: 'T', config: { toMap: 'mainCity', toPosition: { x: 0, y: 19 } } },
    ]
}