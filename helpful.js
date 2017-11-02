var Helpful = {

    // Remove 'px' from sizes
    removePxTurnIntoNumber: function (valueWithPx) {
        return Number(valueWithPx.replace('px', ''));
    },

    showPlayerPosition: function (xPos, yPos) {
        console.log(`x: ${Math.floor((xPos / 32))}, y: ${Math.floor(yPos / 32)}`)
    }


}
