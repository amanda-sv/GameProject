// Object maps{} containing a list of sprites to populate the map.
//      'O' = Obstacle, 'T' = Teleport, 'E' = Enemy
var maps = {
    'mainCity': [
        // top right teleport
        { imageX:0, imageY:0, x: 24, y: 0, type: 'T', config: { toMap: 'forest1', toPosition: { x: 0, y: 6 } } },
        { x: 24, y: 1, type: 'T', config: { toMap: 'forest1', toPosition: { x: 0, y: 7 } } },
        // bottom left teleport
        { x: 0, y: 17, type: 'T', config: { toMap: 'cityCastle', toPosition: { x: 24, y: 17 } } },
        { x: 0, y: 18, type: 'T', config: { toMap: 'cityCastle', toPosition: { x: 24, y: 18 } } },
        { x: 0, y: 19, type: 'T', config: { toMap: 'cityCastle', toPosition: { x: 24, y: 19 } } },
        // obstacles
        { x: 14, y: 2, type: 'O', config: { area: [1,11]}  },
        { x: 11, y: 14, type: 'O',  config: { area: [1,6]} },
        { x: 11, y: 13, type: 'O',  config: { area: [4,1]} },
        { x: 15, y: 2, type: 'O',  config: { area: [7,1]} },
        { x: 21, y: 3, type: 'O',  config: { area: [1,3]} },
        { x: 22, y: 5, type: 'O',  config: { area: [3,1]} },
    ],
    'forest1': [
        // left teleport
        { x: 0, y: 6, type: 'T', config: { toMap: 'mainCity', toPosition: { x: 0, y: 6 } } },
        { x: 0, y: 7, type: 'T', config: { toMap: 'mainCity', toPosition: { x: 0, y: 7 } } },
        { x: 0, y: 8, type: 'T', config: { toMap: 'mainCity', toPosition: { x: 0, y: 8 } } },
        { x: 0, y: 9, type: 'T', config: { toMap: 'mainCity', toPosition: { x: 0, y: 9 } } },
    ],
    'cityCastle': [
        // right teleport
        { x: 24, y: 17, type: 'T', config: { toMap: 'mainCity', toPosition: { x: 24, y: 17 } } },
        { x: 24, y: 18, type: 'T', config: { toMap: 'mainCity', toPosition: { x: 24, y: 18 } } },
        { x: 24, y: 19, type: 'T', config: { toMap: 'mainCity', toPosition: { x: 24, y: 19 } } },
    ]
}