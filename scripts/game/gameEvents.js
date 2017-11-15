var GameEvents = function (game, player) {
    $("#hud").contextmenu(function (event) {
        event.preventDefault();
    })

    $(".sprite").click(function (event) {
        if (event.target !== event.currentTarget) return;
        var target = $(event.target);
        var targetOffset = target.offset();
        var spritePosition = Helpful.getPosition(targetOffset.left, targetOffset.top);
        var sprite = Helpful.findSpriteOnMap(targetOffset.left, targetOffset.top, maps[game.currentMap]);
        if (!sprite) {
            return;
        }
        var spriteConfig = sprite.config;
        if (sprite.type == 'M') {
            if (!spriteConfig) {
                return;
            }
            $('.monsterSelected').removeClass('monsterSelected');
            // classe é adicionada quando seleciona o monstro
            if (Helpful.isNearBy(player.position, spritePosition)) {
                $(event.target).addClass('monsterSelected');
                var monsterId = spriteConfig.type + '-' + spriteConfig.id;
                //alert(monsterId + " said: olá")
                Hud.insertText(`${monsterId}: `, 'olá bzz bzz!');
            }
        }
        else if (sprite.type == 'E') {
            if (Helpful.isNearBy(player.position, spritePosition)) {
                sprite.action(player);
            }
        }
    });

    $(".sprite").contextmenu(function (event) {
        // evita acontecer evento nos filhos
        console.log(event);
        if (event.target !== event.currentTarget) return;
        // target identifica o elemento do html, em qual elemento dentro de .sprite o evento ocorreu
        var target = $(event.target);
        // offset é a posicao do elemento
        var targetOffset = target.offset();
        // pega a posicao em coordenadas de matriz
        var spritePosition = Helpful.getPosition(targetOffset.left, targetOffset.top);
        // procuro a sprite nessa posicao em pixels
        var sprite = Helpful.findSpriteOnMap(targetOffset.left, targetOffset.top, maps[game.currentMap]);
        // se nao houver sprite nao faz nada
        if (!sprite) {
            return;
        }
        var contextActions = sprite.contextActions;
        // so abre o contexto em quem tiver a chave contextActions e config
        if (!contextActions) {
            return;
        }
        // remove contexto ja aberto
        $("#context").remove();


        if (sprite.type == 'M') {
            // cria um contexto novo
            var context = $('<div id="context"/>');
            // cria um contador so para nao exibir o contexto se nao houver acoes
            var actionCount = 0;
            // percorre contextAction
            // for each percorre cada elemento da lista e executa a funcao (primeiro parametro)
            // passando o elemento
            // action é um elemento da lista

            contextActions.forEach((action) => {
                // verifica se a condicao da acao esta verdadeira
                // passando o player como parametro
                if (action.condition(player)) {
                    // se for verdadeira cria um p com o texto
                    var actionHtmlElement = $(`<p>${action.text}</p>`);
                    // tb adiciona o evento de click no p
                    actionHtmlElement.click(() => {

                        console.log(`Ação inciada: ${action.text}`);
                        // quando clicar, ele chama a funcao de resultado passando o player como parametro
                        var resultError = action.result(player);
                        if (resultError) {
                            console.log(resultError);
                            console.log(player.life);
                        }
                        // tb remove o contexto
                        $("#context").remove();
                    });
                    // adiciona o elemento de html (que eh o p) no contexto
                    context.append(actionHtmlElement);
                    actionCount++;
                }
            });
            //so exibe o contexto se houver alguma ação
            if (actionCount != 0) {
                target.append(context);
            }
        }
    });
}