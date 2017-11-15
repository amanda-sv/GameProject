// A $( document ).ready() block. Code included inside $( document ).ready() will only 
// run once the page Document Object Model (DOM) is ready for JavaScript code to execute
(function () {
    // Encapsular uma função e retorna um objeto
    var Game = function () {
        // Mapas: cityCastle mainCity forest1
        var currentMap = 'mainCity';
        // Variables
        var map = $('#map');
        // Lists
        var obstaclesOnMap = [];
        var teleportsOnMap = [];
        var monstersOnMap = [];
        var player;

        var addPlayer = function (_player) {
            player = _player;
        }
        // Add sprites to map
        var addSpriteToMap = function (spriteName, xPos, yPos) {
            spriteName.addClass('sprite');
            spriteName.css('position', 'absolute');
            spriteName.css('top', yPos * SQM_SIZE + 'px');
            spriteName.css('left', xPos * SQM_SIZE + 'px');
            spriteName.css('width', SQM_SIZE + 'px');
            spriteName.css('height', SQM_SIZE + 'px');
            map.append(spriteName);
        }

        // pegou a função do helpful.js e usou pra fazer outra com mesmo nome
        var removePxTurnIntoNumber = function (valueWithPx) {
            valueWithPx = valueWithPx.replace(";", "");
            return Helpful.removePxTurnIntoNumber(valueWithPx);
        }

        // Create hero
        var createHero = function (xPos, yPos) {
            var hero = $('<div id="hero"/>');
            addSpriteToMap(hero, xPos, yPos);
        }

        // Create monster
        var createMonster = function (monsterConfig, xPos, yPos) {
            var monsterId = monsterConfig.type + '-' + monsterConfig.id;
            var monster = $('<div class="monster" id="' + monsterId + '"/>');
            monster.css('background-image', `url(images/monster/${monsterConfig.type}1.png)`);
            var monsterAnimation = setInterval(function () {
                var monsterBackground = monster.css('background-image');
                var monsterImageIndex = Number(monsterBackground.split(monsterConfig.type)[1].replace('.png")', ''));

                var nextMonsterImgIndex = monsterImageIndex + 1;
                if (monsterImageIndex == 3) {
                    nextMonsterImgIndex = 1;
                }
                monster.css('background-image', `url(images/monster/${monsterConfig.type + nextMonsterImgIndex}.png)`);
            }, 100);
            // // Limpar animação quando monstro morrer     
            clearInterval(monsterAnimation);
            addSpriteToMap(monster, xPos, yPos);
            monstersOnMap.push({ x: xPos, y: yPos, id: monsterId, animation: monsterAnimation });
        }

        // Create collectible items
        var createCollectibleItem = function (eventClass, xPos, yPos) {
            var eventItem = $(`<div class="${eventClass}"/>`);
            eventItem.css('border', '1px dotted rgba(255, 235, 59, 0.62)');
            addSpriteToMap(eventItem, xPos, yPos);
        }

        // Create obstacles
        var createObstacle = function (xPos, yPos) {
            var obstacle = $('<div class="obstacle"/>');
            addSpriteToMap(obstacle, xPos, yPos);
        }

        // Check collision with obstacles or monsters
        var checkCollision = function (nextLeftPosition, nextTopPosition) {
            var playerCanWalk = true;
            for (var i = 0; i < obstaclesOnMap.length; i++) {
                var obstacleLeftPosition = obstaclesOnMap[i].x;
                var obstacleTopPosition = obstaclesOnMap[i].y;
                if (((nextLeftPosition / SQM_SIZE) == obstacleLeftPosition) && (nextTopPosition / SQM_SIZE) == obstacleTopPosition) {
                    playerCanWalk = false;
                }
            }
            for (var j = 0; j < monstersOnMap.length; j++) {
                var monsterTopPosition = monstersOnMap[j].y;
                var monsterLeftPosition = monstersOnMap[j].x;
                if (((nextLeftPosition / SQM_SIZE) == monsterLeftPosition) && (nextTopPosition / SQM_SIZE) == monsterTopPosition) {
                    playerCanWalk = false;
                }
            }
            return playerCanWalk;
        }

        // Create teleportation point
        var createTeleport = function (xPos, yPos) {
            var teleport = $('<div id="teleport"/>');
            addSpriteToMap(teleport, xPos, yPos);
        }

        // renderiza um obstaculo
        var renderObstacle = function (mapElement) {
            var config = mapElement.config;
            if (config && config.area) {
                var areaI = Number(config.area[0]);
                var areaJ = Number(config.area[1]);
                for (var i = 0; i < areaI; i++) {
                    for (var j = 0; j < areaJ; j++) {
                        createObstacle(mapElement.x + i, mapElement.y + j);
                        obstaclesOnMap.push({ x: mapElement.x + i, y: mapElement.y + j });
                    }
                }
            } else {
                createObstacle(mapElement.x, mapElement.y);
                obstaclesOnMap.push({ x: mapElement.x, y: mapElement.y });
            }
        }
        // create map with it's background and elements
        var renderMap = function (mapName) {
            currentMap = mapName;
            var mapObject = maps[mapName];
            map.append($('<div id="mapImg"/>'));
            for (var i = 0; i < mapObject.length; i++) {
                var mapElement = mapObject[i];
                var config = mapElement.config || {};
                $('#mapImg').css('background-image', `url("images/${mapName}.png")`)
                if (mapElement.type == 'T') {
                    createTeleport(mapElement.x, mapElement.y);
                    teleportsOnMap.push({ x: mapElement.x, y: mapElement.y, toMap: config.toMap, toPos: config.toPosition })
                }
                if (mapElement.type == 'O') {
                    renderObstacle(mapElement);
                }
                if (mapElement.type == 'E') {
                    createCollectibleItem(config.class, mapElement.x, mapElement.y );
                }
                if (mapElement.type == 'M') {
                    createMonster(config, mapElement.x, mapElement.y);
                }
            }
        }

        // change monster's sprite from time to time
        var changeMonsterSprite = function () {
            setTimeout()
        }
        // change map when player enters teleport sqm
        var changeMap = function (nextMapName, newPlayerX, newPlayerY) {
            obstaclesOnMap = [];
            teleportsOnMap = [];
            map.empty();
            renderMap(nextMapName);
            createHero(newPlayerX, newPlayerY);
            $('#currentCityName').text(nextMapName);
        }

        // When player touches the teleportation point, change map
        var checkTeleport = function (nextLeftPosition, nextTopPosition) {
            for (var i = 0; i < teleportsOnMap.length; i++) {
                var teleportLeftPosition = teleportsOnMap[i].x;
                var teleportTopPosition = teleportsOnMap[i].y;
                if (((nextLeftPosition / SQM_SIZE) == teleportLeftPosition) && (nextTopPosition / SQM_SIZE) == teleportTopPosition) {
                    // Remove mensagens antigas do textbox e substitui por um welcome da cidade
                    Hud.insertText('Welcome to: ', teleportsOnMap[i].toMap + '!');
                    // AQUI DEVE IR A FUNÇÃO QUE FAZ O MAPA MUDAR (O TELEPORT ACONTECER)
                    changeMap(teleportsOnMap[i].toMap, teleportsOnMap[i].toPos.x, teleportsOnMap[i].toPos.y);
                    var gameEvents = new GameEvents(game, player);
                    Hud.initialize(player);
                }
            }
        }

        // draw map created and determines hero position
        var startGame = function () {
            renderMap(currentMap);
            createHero(11, 6);
            Hud.initialize(player);
        }



        return {
            currentMap: currentMap,
            addPlayer: addPlayer,
            startGame: startGame,
            checkTeleport: checkTeleport,
            checkCollision: checkCollision
        }
    }

    // Encapsula uma função e retorna um objeto
    // Object.freeze congela o estado nesse momento, ninguém mais pode mudar o valor
    // de game
    var game = new Game();
    var player = new Player(game);
    game.addPlayer(player);
    game.startGame();
    var gameEvents = new GameEvents(game, player);

})();
