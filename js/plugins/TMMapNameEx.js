//=============================================================================
// TMVplugin - マップ名表示拡張
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 0.2b
// 最終更新日: 2015/12/26
//=============================================================================

/*:
 * @plugindesc マップ名の表示を調整し、一部の制御文字に対応します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param windowX
 * @desc マップ名ウィンドウの X 座標
 * 初期値: 0
 * @default 0
 *
 * @param windowY
 * @desc マップ名ウィンドウの Y 座標
 * 初期値: 0
 * @default 0
 *
 * @param windowWidth
 * @desc マップ名ウィンドウの幅
 * 初期値: 360
 * @default 360
 *
 * @param windowLineHeight
 * @desc マップ名ウィンドウの１行の高さ
 * 初期値: 96
 * @default 96
 *
 * @param fontFace
 * @desc マップ名に使用するフォント
 * 初期値: GameFont
 * @default GameFont
 *
 * @param fontSize
 * @desc フォントサイズ
 * 初期値: 28
 * @default 28
 *
 * @help
 * fontFace に設定するフォント名は、事前に fonts/gamefont.css を
 * 編集して追加する必要があります。
 * 元から設定されている GameFont をまるごと（４行）コピペして、
 * font-family: フォント名;
 * src: url("フォントのファイル名");
 * 上記２行を書き換えてください。（最終的には８行になります）
 * gamefont.css が編集できたら、設定した『フォントのファイル名』と同名の
 * フォントファイルを fonts フォルダに置き、fontFace に
 * 『フォント名』を設定してください。
 *
 * フォントのファイル名に日本語などの2byte文字が含まれていると
 * エラーが発生する場合があります。
 *
 * 対応している制御文字:
 *   \V[n]
 *   \N[n]
 *   \P[n]
 *   \\
 *   \G
 *   内容は文章の表示と同様です。
 *
 * プラグインコマンドはありません。
 * 
 */

var Imported = Imported || {};
Imported.TMMapNameEx = true;

(function() {

  var parameters = PluginManager.parameters('TMMapNameEx');
  var windowX = Number(parameters['windowX']);
  var windowY = Number(parameters['windowY']);
  var windowWidth = Number(parameters['windowWidth']);
  var windowLineHeight = Number(parameters['windowLineHeight']);
  var fontFace = parameters['fontFace'];
  var fontSize = Number(parameters['fontSize']);
  
  //-----------------------------------------------------------------------------
  // Window_MapName
  //

  var _Window_MapName_initialize = Window_MapName.prototype.initialize;
  Window_MapName.prototype.initialize = function() {
    _Window_MapName_initialize.call(this);
    this.x = windowX;
    this.y = windowY;
  };

  Window_MapName.prototype.refresh = function() {
    this.contents.clear();
    if ($gameMap.displayName()) {
      var width = this.contentsWidth();
      this.drawBackground(0, 0, width, this.lineHeight());
      this.contents.fontFace = fontFace;
      this.contents.fontSize = fontSize;
      var text = this.convertEscapeCharacters($gameMap.displayName());
      this.drawText(text, 0, 0, width, 'center');
    }
  };

  Window_MapName.prototype.windowWidth = function() {
    return windowWidth;
  };

  Window_MapName.prototype.lineHeight = function() {
    return windowLineHeight;
  };

})();
