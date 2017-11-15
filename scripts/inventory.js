// 
var Inventory = function () {
    this.itens = [];

    this.addItem = (item, amount) => {
        for (var i = 0; i < amount; i++) {
            this.itens.push(item);
        }
        this.drawItens();
    }

    this.removeItem = (item) => {
        var itemIndex = this.itens.indexOf(item);
        this.itens.splice(itemIndex, 1);
        this.drawItens();
    }

    this.drawItens = () => {
        $('#inventory').empty();
        var itensAmout = this.getItensAmount();
        // itemName representa cada chave do objeto
        for (var itemName in itensAmout) {
            var item = $(`<div class="inventoryItem item-${itemName}"></div>`);
            var itemAmount = itensAmout[itemName];
            if (itemAmount > 1) {
                item.append(`<p>${itemAmount}</p>`);
            }
            $('#inventory').append(item);
            console.log(`${itemName} adicionado`);
        }
    }

    this.getItensAmount = () => {
        var itensSet = new Set(this.itens);
        var resumedInventory = {};
        itensSet.forEach((setItem) => {
            this.itens.forEach((inventoryItem) => {
                if (setItem == inventoryItem) {
                    // relembrando que:
                    // acessando string a como chave do objeto
                    //dic.a
                    // acessando string a como chave do objeto
                    //dic['a']
                    // acessando o valor da variável a como chave do objeto
                    //dic[a]
                    if (!resumedInventory[setItem]) {
                        resumedInventory[setItem] = 1;
                    } else {
                        resumedInventory[setItem] += 1;
                    }
                }
            })
        })
        return resumedInventory;
    }

    this.hasItem = (itemName) => {
        return this.itens.find(function (item) {
            return item == itemName;
        });
    }
};