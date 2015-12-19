//=============================================================================
// MaxItems.js
// Version: 0.01
//=============================================================================
/*:
 * @plugindesc Change possession possible number of items.
 * @author karakasr_dool
 *
 * @help ?
* Item Note:
 *   <max:n> # The maximum number of possession
 */
/*:ja
 * @plugindesc アイテムの所持可能数を変更.
 * @author 唐傘ドール
 * @help ?
* Item Note:
 *   <max:n> # 最大所持数
 */

(function() {
    Game_Party.prototype.maxItems = function(item) {
		return parseInt(item.meta.max || 99);
	};
})();

