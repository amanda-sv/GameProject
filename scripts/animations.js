var Animations = {
    receiveDamage: function (times, callBack) {
        var hero = $("#hero");
        hero.css("display", "none");
        setTimeout(() => {
            hero.css("display", "");
            if (times > 1) {
                setTimeout(() => this.receiveDamage(times - 1, callBack), 100);
            } else {
                callBack();
            }
        }, 100);
    },
    receiveHeal: function (times) {
        var hero = $("#hero");
        hero.css("background-color", "#90ee9054");
        setTimeout(() => {
            hero.css("background-color", "");
            if (times > 1) {
                setTimeout(() => this.receiveHeal(times - 1), 100);
            }
        }, 100);
    },
};