// Dessa forma Hud é estático, é um objeto
var Hud = {
    updateHud: function (player) {
        this.updatePlayer(player);
        //
    },

    updateLife: function (life) {
        var healthBar = $('#healthBar');
        healthBar.attr('value', life);
        var playerLife = $('#playerLife');
        playerLife.text(life);
    },

    updateLevel: function (level) {
        var levelText = $('#levelText');
        levelText.text(level);
    },

    addItemToInventory: (itemName) => {
        var item = $(`<div class="inventoryItem"></div>`);
        $('#inventory').append(item);
        console.log(`${itemName} adicionado`);
    },

    removeItemFromInventory: (itemName) => {
        
    },

    initialize: function (player) {
        // tem que usar this porque isso é um objeto, pra fazer menção a
        // uma chave de um objeto de dentro desse objeto, tem que usar this  
        this.updateLife(player.life);
        this.updateLevel(player.level);
    },

    insertText: function (textTitle, text) {
        var textBox = $('#textbox');
        textBox.empty();
        textBox.append($(`<h2>${textTitle}</h2>`));
        textBox.append($(`<p>${text}</p>`));
    },
} 