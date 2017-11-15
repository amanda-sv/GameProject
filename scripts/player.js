var Player = function (game) {
    this.position = { x: 0, y: 0 };
    this.experience = 0;
    this.expToLvlUp = 100;
    this.level = 0;
    this.canWalk = true;
    this.quests = [];
    this.inventory = new Inventory();
    this.life = 100;

    // determines the speed of the player walking
    // () => {} igual a function() {}
    var walkAnimation = () => {
        this.canWalk = false;
        setTimeout(() => {
            this.canWalk = true;
        }, PLAYER_SPEED);
    }

    this.upLevel = (expGained) => {
        this.experience += expGained;
        if (this.experience >= this.expToLvlUp) {
            this.level += 1;
            Hud.updateLevel(this.level);
            this.expToLvlUp = Math.floor(this.expToLvlUp * 2);
        }
    }

    this.takeDamage = (damage) => {
        if (this.life - damage > 0) {
            this.life -= damage;
        } else {
            this.life = 0;
            PLAYER_SPEED = 1000;
        }
        this.canWalk = false;
        Animations.receiveDamage(3, () => this.canWalk = true);
        Hud.updateLife(this.life);
        this.changeImage();
    }

    this.healLife = (healAmount) => {
        PLAYER_SPEED = 60;
        if (this.life + healAmount < 100) {
            this.life += healAmount;
        } else {
            this.life = 100;
        }
        Hud.updateLife(this.life);
        this.changeImage();
    }

    this.changeImage = () => {
        var image = $('#playerImage');
        if (this.life == 0) {
            image.attr('src', 'images/princesaCarocoMota.jpg');
            this.changeSprite('princessDead.png');
        }
        else if (this.life <= 50) {
            image.attr('src', 'images/princesaCarocoChorando.gif');
            this.changeSprite('princessFront.png');
        }
        else if (this.life > 50) {
            image.attr('src', 'images/princesaCaroco.png');
            this.changeSprite('princessFront.png');
        }
    }
    // Pegar item no mapa ao clicar nele
    this.getItemInMap = (itemName) => {
        this.inventory.addItem(itemName, 1);
    }
    // Tirar item do inventário
    this.removeItemFromInventory = (itemName) => {
        this.inventory.removeItem(itemName);
    }
    this.changeSprite = (spriteName) => {
        $('#hero').css('background-image', `url('images/${spriteName}')`);
    }

    // Function that allows moving hero using arrow keys
    //   It means something like 'when event keydown happens in document, do this { ... }'
    $(document).keydown((event) => {
        if (!this.canWalk) { return; }
        $("#context").remove();
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
                game.checkTeleport(nextLeftPosition, currentTopPosition);
                if (!(nextLeftPosition < 0) && game.checkCollision(nextLeftPosition, currentTopPosition)) {
                    addLeft(-SQM_SIZE);
                    this.position = Helpful.getPosition(nextLeftPosition, currentTopPosition);
                    Helpful.showPlayerPosition(this.position);
                    walkAnimation();
                }
                break;
            case 38: //up
                var nextTopPosition = currentTopPosition - SQM_SIZE;
                game.checkTeleport(currentLeftPosition, nextTopPosition);
                if (!(nextTopPosition < 0) && game.checkCollision(currentLeftPosition, nextTopPosition)) {
                    addTop(-SQM_SIZE);
                    this.position = Helpful.getPosition(currentLeftPosition, nextTopPosition);
                    Helpful.showPlayerPosition(this.position);
                    walkAnimation();
                }
                break;
            case 39: //right
                var nextRightPosition = currentLeftPosition + SQM_SIZE;
                game.checkTeleport(nextRightPosition, currentTopPosition);
                if (!(nextRightPosition >= MAP_WIDTH) && game.checkCollision(nextRightPosition, currentTopPosition)) {
                    addLeft(SQM_SIZE);
                    this.position = Helpful.getPosition(nextRightPosition, currentTopPosition);
                    Helpful.showPlayerPosition(this.position);
                    walkAnimation();
                }
                break;
            case 40: //down
                var nextDownPosition = currentTopPosition + SQM_SIZE;
                game.checkTeleport(currentLeftPosition, nextDownPosition);
                if (!(nextDownPosition >= MAP_HEIGHT) && game.checkCollision(currentLeftPosition, nextDownPosition)) {
                    addTop(SQM_SIZE);
                    this.position = Helpful.getPosition(currentLeftPosition, nextDownPosition);
                    Helpful.showPlayerPosition(this.position);
                    walkAnimation();
                }
                break;
        }
    });

};