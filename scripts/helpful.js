var Helpful = {

    // Remove 'px' from sizes
    removePxTurnIntoNumber: function (valueWithPx) {
        return Number(valueWithPx.replace('px', ''));
    },

    getPosition: function (xPos, yPos) {
        return { x: Math.floor(xPos / 32), y: Math.floor(yPos / 32) };
    },

    showPlayerPosition: function (playerPosition) {
        console.log(`x: ${playerPosition.x}, y: ${playerPosition.y}`)
    },

    isNearBy: function (sourcePosition, targetPosition) {
        if (sourcePosition.x == targetPosition.x && sourcePosition.y + 1 == targetPosition.y) {
            return true;
        }
        else if (sourcePosition.x == targetPosition.x && sourcePosition.y - 1 == targetPosition.y) {
            return true;
        }
        else if (sourcePosition.x + 1 == targetPosition.x && sourcePosition.y == targetPosition.y) {
            return true;
        }
        else if (sourcePosition.x - 1 == targetPosition.x && sourcePosition.y == targetPosition.y) {
            return true;
        }
        else if (sourcePosition.x - 1 == targetPosition.x && sourcePosition.y - 1 == targetPosition.y) {
            return true;
        }
        else if (sourcePosition.x - 1 == targetPosition.x && sourcePosition.y + 1 == targetPosition.y) {
            return true;
        }
        else if (sourcePosition.x + 1 == targetPosition.x && sourcePosition.y - 1 == targetPosition.y) {
            return true;
        }
        else if (sourcePosition.x + 1 == targetPosition.x && sourcePosition.y + 1 == targetPosition.y) {
            return true;
        }
        return false;
    },

    findSpriteOnMap: function (xPos, yPos, map) {
        var position = this.getPosition(xPos, yPos);

        for (var i = 0; i < map.length; i++) {
            var mapSprite = map[i];
            if (mapSprite.x == position.x && mapSprite.y == position.y) {
                return mapSprite;
            }
        }
        // return map.find(function(mapSprite){
        //     if(mapSprite.x == position.x && mapSprite.y == position.y) {
        //         return mapSprite;
        //     }
        // });
    }


}
