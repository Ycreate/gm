//=============================================================================
// MPP_ChoiceEX.js
//=============================================================================
// Copyright (c) 2015 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【MPP】選択肢の機能拡張
 * @author 木星ペンギン
 *
 * @help イベントコマンド『選択肢の表示』を続けて配置すると
 * 一つの選択肢にまとめられます。
 * まとめたくない場合は、間に注釈などを入れることで通常通り分けることができます。
 * 
 * 『デフォルト』の処理は、なし以外を設定したものが適用されます。
 * 『デフォルト』の処理が複数ある場合、
 * 後に設定された選択肢のものが適用されます。
 * 
 * 『キャンセル』の処理は、禁止以外を設定したものが適用されます。
 * 『キャンセル』の処理が複数ある場合、
 * 後に設定された選択肢のものが適用されます。
 * 
 * 『背景』と『ウィンドウ位置』は後の選択肢のものが適用されます。
 * 
 * ●項目が表示される条件の設定
 * 選択肢の文章中に if(条件) と入れ、その条件が偽になると
 * 項目が表示されなくなります。
 * 
 * 条件内では s でスイッチ、v で変数を参照できます。
 * （例：if(s[1]) とした場合、スイッチ１番がONで表示、OFFで非表示となります）
 * 
 * 『デフォルト』や『キャンセル』の項目が表示されない場合、
 * なしや禁止と同じ処理をします。
 * 
 * ================================
 * Version : 1.0
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 *
 * @param maxPageRow
 * @desc 1ページに表示される行数
 * @default 6
 *
 */

(function() {

var parameters = PluginManager.parameters('MPP_ChoiceEX');

var maxPageRow = Number(parameters['maxPageRow']);

//-----------------------------------------------------------------------------
// Game_Interpreter

//9062
Game_Interpreter.prototype.setupChoices = function(params) {
    var data = {
        choices: [],
        result: [],
        cancelIndex: -1,
        defaultType: -1,
        positionType: 0,
        background: 0
    };
    data = this.addChoices(params, this._index, data, 0);
    var cancelType = -1;
    if (data.cancelIndex !== -1) {
        data.result.push(data.cancelIndex);
        cancelType = data.choices.length;
    }
    $gameMessage.setChoices(data.choices, data.defaultType, cancelType);
    $gameMessage.setChoiceBackground(data.background);
    $gameMessage.setChoicePositionType(data.positionType);
    $gameMessage.setChoiceCallback(function(n) {
        this._branch[this._indent] = data.result[n];
    }.bind(this));
};

Game_Interpreter.prototype.addChoices = function(params, i, data, d) {
    for (var n = 0; n < params[0].length; n++) {
        var ary = params[0][n].split(/\s+if\((.+)\)/);
        if (ary.length === 1 || this.evalChoice(ary[1])) {
            data.choices.push(ary[0]);
            data.result.push(n + d);
        }
    }
    var cancelType = params[1];
    if (cancelType === -2) {
        data.cancelIndex = cancelType + d;
    } else if (cancelType >= 0 && data.result.contains(cancelType + d)) {
        data.cancelIndex = data.result.indexOf(cancelType + d);
    }
    var defaultType = params.length > 2 ? params[2] : 0;
    if (defaultType >= 0 && data.result.contains(defaultType + d)) {
        data.defaultType = data.result.indexOf(defaultType + d);
    }
    data.positionType = params[3] || 2;
    data.background = params[4] || 0;
    do {
        i++;
    } while (this._list[i].code !== 404 || this._list[i].indent > this._indent)
    if (this._list[i + 1].code === 102) {
        this.addChoices(this._list[i + 1].parameters, i + 1, data, d + 10);
    }
    return data;
};

Game_Interpreter.prototype.evalChoice = function(formula) {
    try {
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        return !!eval(formula);
    } catch (e) {
        alert("条件エラー \n\n " + formula);
        return true;
    }
};

//9088
Game_Interpreter.prototype.command403 = function() {
    if (this._branch[this._indent] !== -2) {
        this.skipBranch();
    }
    return true;
};

Game_Interpreter.prototype.command404 = function() {
    if (this.nextEventCode() === 102) {
        this._branch[this._indent] -= 10;
        this._index++;
    }
    return true;
};

//-----------------------------------------------------------------------------
// Window_ChoiceList

//3876
var _Window_ChoiceList_numVisibleRows = Window_ChoiceList.prototype.numVisibleRows;
Window_ChoiceList.prototype.numVisibleRows = function() {
    return Math.min(_Window_ChoiceList_numVisibleRows.call(this), maxPageRow);
};

})();
