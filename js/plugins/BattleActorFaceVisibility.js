//=============================================================================
// BattleActorFaceVisibility.js
//=============================================================================

/*:
 * @plugindesc 戦闘中顔グラフィック表示プラグイン
 * @author トリアコンタン
 * @version 1.00 2015/11/13 初版
 * 
 * @help 戦闘中、コマンド選択ウィンドウの上に
 * 顔グラフィックが表示されるようになります。
 * サイドビューの場合は何も表示されません。
 * このプラグインにはプラグインコマンドはありません。
 *
 * 利用規約：このプラグインはもうあなたのものです。
 * 作者連絡先：https://twitter.com/triacontane
 */
(function () {

    //=============================================================================
    // Scene_Battle
    //  顔グラフィックを表示するウィンドウを追加します。
    //=============================================================================
    var _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);
        this.createFaceWindow();
    };

    Scene_Battle.prototype.createFaceWindow = function() {
        this._faceWindow = new Window_Face(this._partyCommandWindow);
        this.addWindow(this._faceWindow);
        // 表示順入れ替え
        this._windowLayer.removeChild(this._skillWindow);
        this.addWindow(this._skillWindow);
        this._windowLayer.removeChild(this._itemWindow);
        this.addWindow(this._itemWindow);
    };

    //=============================================================================
    // Window_Face
    //  顔グラフィックを表示するだけのウィンドウです。
    //=============================================================================
    function Window_Face() {
        this.initialize.apply(this, arguments);
    }

    Window_Face.prototype = Object.create(Window_Base.prototype);
    Window_Face.prototype.constructor = Window_Face;

    Window_Face.prototype.initialize = function() {
        var width  = 192;
        var height = Window_Base._faceHeight + this.standardPadding() * 2;
        var x = 0;
        var y = Graphics.boxHeight - this.fittingHeight(4) - height;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.hide();
        this.loadImages();  // 非同期処理のため先読み
        this._actorId = 0;
    };

    Window_Face.prototype.loadImages = function() {
        $gameParty.members().forEach(function(actor) {
            ImageManager.loadFace(actor.faceName());
        }, this);
    };

    Window_Face.prototype.update = function() {
        if ($gameSystem.isSideView()) return;
        Window_Base.prototype.update.call(this);
        var actor = BattleManager.actor();
        if (actor && this._actorId != actor.actorId()) {
            this.contents.clear();
            var x = (this.contentsWidth() - Window_Base._faceWidth) / 2;
            var y = 0;
            this.drawActorFace(actor, x, y);
            this._actorId = actor.actorId();
            this.show();
        }
        if (actor == null && this._actorId != 0) {
            this.contents.clear();
            this._actorId = 0;
            this.hide();
        }
    };
})();