// A $( document ).ready() block. Code included inside $( document ).ready() will only 
// run once the page Document Object Model (DOM) is ready for JavaScript code to execute

// Encapsular uma função e retorna um objeto
var Game = function () {

    // Constants
    var SQM_SIZE = 32;
    var MAP_HEIGHT = 640;
    var MAP_WIDTH = 800;
    var obstaclesOnMap = [];
    var teleportsOnMap = []
    // Mapas: cityCastle mainCity forest1
    var currentMap = 'mainCity';
    var nextMap = [];

    // Variables
    var map = $('#map');
    var mapImg = $('<div id = "mapImg"/>');

    // Add sprites to map
    var addSpriteToMap = function (spriteName, xPos, yPos) {

        spriteName.css('position', 'absolute');
        spriteName.css('top', yPos * SQM_SIZE + 'px');
        spriteName.css('left', xPos * SQM_SIZE + 'px');
        spriteName.css('width', SQM_SIZE + 'px');
        spriteName.css('height', SQM_SIZE + 'px');
        map.append(spriteName);
    }

    /* // template string js example
    var changeHeroSprite = function(direction, name, id){
        var hero = $('#hero');
        hero.css('background', `url(hero-${direction}arara${name}etb${id + 1}.png)`);
        // without template string, would be like this:
        //'url(hero-' + direction + 'arara'+ name + 'etb' + (id + 1) + '.png)';
    } */

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

    // Create obstacles
    var createObstacle = function (xPos, yPos) {
        var obstacle = $('<div id="obstacle"/>');
        addSpriteToMap(obstacle, xPos, yPos);
    }

    // Check collision with obstacles
    var checkCollision = function (nextLeftPosition, nextTopPosition) {
        var playerCanWalk = true;
        for (var i = 0; i < obstaclesOnMap.length; i++) {
            var obstacleLeftPosition = obstaclesOnMap[i].x;
            var obstacleTopPosition = obstaclesOnMap[i].y;
            if (((nextLeftPosition / 32) == obstacleLeftPosition) && (nextTopPosition / 32) == obstacleTopPosition) {
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

    // When player touches the teleportation point, change map
    var checkTeleport = function (nextLeftPosition, nextTopPosition) {
        for (var i = 0; i < teleportsOnMap.length; i++) {
            var teleportLeftPosition = teleportsOnMap[i].x;
            var teleportTopPosition = teleportsOnMap[i].y;
            if (((nextLeftPosition / 32) == teleportLeftPosition) && (nextTopPosition / 32) == teleportTopPosition) {
                console.log(teleportsOnMap[i].toMap); // AQUI DEVE IR A FUNÇÃO QUE FAZ O MAPA MUDAR (O TELEPORT ACONTECER)
            }
        }
    }

    // create map with it's background and elements
    var createMap = function (mapName) {
        var mapObject = maps[mapName];
        map.append(mapImg);
        for (var i = 0; i < mapObject.length; i++) {
            var mapElement = mapObject[i];
            $('#mapImg').css('background', `url("images/${mapName}.png")`)
            if (mapElement.type == 'T') {
                createTeleport(mapElement.x, mapElement.y);
                configElement = mapElement.config;
                teleportsOnMap.push({ x: mapElement.x, y: mapElement.y, toMap: configElement.toMap })
                nextMap.push({ toMap: configElement.toMap, toPosX: configElement.toPosition.x, toPosY: configElement.toPosition.y })
            }
            if (mapElement.type == 'O') {
                createObstacle(mapElement.x, mapElement.y);
                obstaclesOnMap.push({ x: mapElement.x, y: mapElement.y });
            }
        }
    }
    // change map when player enters teleport sqm
    var changeMap = function (nextMapName, nextPlayerX, nextPlayerY) {
        createMap(nextMapName);
        createHero(nextPlayerX, nextPlayerY);
    }

    // draw map created and determines hero position
    var drawMap = function () {
        //map.empty();
        createMap(currentMap);
        createHero(1, 18);
    }

    drawMap();
    console.log(teleportsOnMap);

    // Function that allows moving hero using arrow keys
    //   It means something like 'when event keydown happens in document, do this { ... }'
    $(document).keydown(function (event) {
        var hero = $('#hero');
        var currentLeftPosition = Helpful.removePxTurnIntoNumber($('#hero').css('left'));
        var currentTopPosition = Helpful.removePxTurnIntoNumber($('#hero').css('top'));

        var addTop = function (positionChange) {
            hero.css('top', (hero.position().top + positionChange) + 'px');
        };

        var addLeft = function (positionChange) {
            hero.css('left', (hero.position().left + positionChange) + 'px');
        };

        switch (event.keyCode) {
            case 37: //left
                var nextLeftPosition = currentLeftPosition - SQM_SIZE;
                checkTeleport(nextLeftPosition, currentTopPosition);
                if (!(nextLeftPosition < 0) && checkCollision(nextLeftPosition, currentTopPosition)) {
                    addLeft(-SQM_SIZE);
                    Helpful.showPlayerPosition(nextLeftPosition, currentTopPosition);
                }
                break;
            case 38: //up
                var nextTopPosition = currentTopPosition - SQM_SIZE;
                checkTeleport(currentLeftPosition, nextTopPosition);
                if (!(nextTopPosition < 0) && checkCollision(currentLeftPosition, nextTopPosition)) {
                    addTop(-SQM_SIZE);
                    Helpful.showPlayerPosition(currentLeftPosition, nextTopPosition);
                }
                break;
            case 39: //right
                var nextRightPosition = currentLeftPosition + SQM_SIZE;
                checkTeleport(nextRightPosition, currentTopPosition);
                if (!(nextRightPosition >= MAP_WIDTH) && checkCollision(nextRightPosition, currentTopPosition)) {
                    addLeft(SQM_SIZE);
                    Helpful.showPlayerPosition(nextRightPosition, currentTopPosition);
                }
                break;
            case 40: //down
                var nextDownPosition = currentTopPosition + SQM_SIZE;
                checkTeleport(currentLeftPosition, nextDownPosition);
                if (!(nextDownPosition >= MAP_HEIGHT) && checkCollision(currentLeftPosition, nextDownPosition)) {
                    addTop(SQM_SIZE);
                    Helpful.showPlayerPosition(currentLeftPosition, nextDownPosition);
                }
                break;
        }
    });

    return {
        createMap: createMap
    }
}

// Encapsula uma função e retorna um objeto
// Object.freeze congela o estado nesse momento, ninguém mais pode mudar o valor
// de game
var game = Object.freeze(new Game());