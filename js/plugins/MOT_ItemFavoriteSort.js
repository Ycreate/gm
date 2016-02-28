//=============================================================================
// MOT_ItemFavoriteSort.js
//=============================================================================
// MOTplugin - アイテムソート＋お気に入りアイテム
// 作者: 翠 (http://midori.wp.xdomain.jp/)
// Version: 0.8
// 最終更新日: 2016/02/28
//=============================================================================
//■更新履歴
/*
  2016/02/28 - テスト版公開
  
*/
//=============================================================================
/*■利用規約
 *-クレジットの表記
 *  クレジットの表記は基本的に不要です。
 *  表記する場合はホームページを参照してください。
 *  営利目的での使用する場合は表記してください。
 *
 *  表記例
 *  スクリプト素材 翠 (http://midori.wp.xdomain.jp/)
 *  または
 *  スクリプト素材 HM Project (http://midori.wp.xdomain.jp/)
 *
 *-スクリプトの改変/配布
 *  スクリプトの改変はご自由に行ってください。
 *  改変を行って発生したバグ等には対処しません。
 *
 *-スクリプトの再配布
 *  そのままの再配布は禁止とさせていただきます。
 *  改造した物を配布する場合、オリジナルのクレジットを残してもらえれば
 *  配布することを可能とします。
 *  ※改造の有無に関わらず素材を有料で配布する場合は禁止とさせていただきます。
 *  ※ゲームに含まれる場合のみ再配布可能とします。
 *
 *-使用可能なゲームのジャンル
 *  エログロなんでも使用可能です。
 *
*/
//=============================================================================
/*:
 * @plugindesc アイテムソートとアイテムのお気に入り機能を追加します
 * @author 翠
 * @help
 * ■利用規約
 * 本プラグインの中に記述してある物、または配布サイト
 * の利用規約をご確認ください。
 * 
 * ■プラグイン概要
 * アイテムのソートとアイテムのお気に入り機能を追加します。
 * 
 * ■使用方法
 * アイテム画面でアイテムウィンドウがアクティブのとき、設定したキーを押下してください
 * アイテムをお気に入りに登録した場合、現在のソートの状況に関わらず
 * 登録順に昇順表示されます。
 * 価格や、個数が同一の場合はIDの昇順、降順に依存します。
 * 
 * 戦闘時は強制的にアイテムカテゴリのソートが適応されます。
 * 現状ではアイテム画面、ショップ画面、バトル画面でソートとお気に入り登録ができます。
 * 
 * ※五十音ソートについて
 * ひらがな、カタカナでしかソートを行っていません。
 * その為アイテム名の先頭に英字、漢字が含まれる場合はアイテムのメモ欄に以下を記述して
 * ソートの対象にしてください。
 * xxxxはひらがな及びカタカナで記述してください。
 * <sortCode:xxxx>
 *
 * 例:
 * 桜餅
 * <sortCode:さくら> 又は <sortCode:さくらもち>等
 * Ice
 * <sortCode:あい> 又は <sortCode:あいす>等
 *
 * @param お気に入り登録するキー
 * @desc アイテムをお気に入りに登録する際に使用するキー a～zのみ対応
 * @default a
 *
 * @param お気に入りアイテムのアイコン
 * @desc 使用するアイコンのIndex
 * @default 84
 *
 * @param お気に入り登録上限数
 * @desc カテゴリ毎
 * @default 10
 *
 * @param お気に入り登録時のSE:ファイル名
 * @desc
 * @default Decision2
 *
 * @param  お気に入り登録時のSE:ボリューム
 * @desc
 * @default 90
 *
 * @param  お気に入り登録時のSE:ピッチ
 * @desc
 * @default 100
 *
 * @param お気に入り解除時のSE:ファイル名
 * @desc
 * @default Cancel1
 *
 * @param  お気に入り解除時のSE:ボリューム
 * @desc
 * @default 90
 *
 * @param  お気に入り解除時のSE:ピッチ
 * @desc
 * @default 100
 *
 * @param 
 * @desc
 * @default
 *
 * @param ソート画面を開くキー
 * @desc ソート画面を表示させる際に使用するキー a～zのみ対応
 * @default s
 *
 * @param ソートタイトルに表示される文字列
 * @desc
 * @default 並び替え
 *
 * @param ソートタイトル画面:フォントサイズ
 * @desc
 * @default 23
 *
 * @param ソートタイトル画面:横幅
 * @desc ソートコマンドウィンドウも同一の横幅になります
 * @default 400
 *
 * @param ソートタイトル画面:縦幅 
 * @desc
 * @default 53
 *
 * @param ソートタイトル画面:パディング
 * @desc
 * @default 12
 *
 */
//=============================================================================
var Imported = Imported || {};
Imported.MOT_ItemFavoriteSort = true;
//=============================================================================
var MOT = MOT || {};
MOT.ItemFavoriteSort = MOT.ItemFavoriteSort || {};
//=============================================================================
MOT.Parameters = PluginManager.parameters('MOT_ItemFavoriteSort');
MOT.Param = MOT.Param || {};
//=============================================================================
MOT.Param.FavoriteKey     = String(MOT.Parameters['お気に入り登録するキー']);
MOT.Param.FavoriteIcon    = Number(MOT.Parameters['お気に入りアイテムのアイコン']);
MOT.Param.FavoriteLimit   = Number(MOT.Parameters['お気に入り登録上限数']);
MOT.Param.FavoriteRegSeFile    = String(MOT.Parameters['お気に入り登録時のSE:ファイル名']);
MOT.Param.FavoriteRegSeVol     = Number(MOT.Parameters['お気に入り登録時のSE:ボリューム']);
MOT.Param.FavoriteRegSePit     = Number(MOT.Parameters['お気に入り登録時のSE:ピッチ']);
MOT.Param.FavoriteRelSeFile    = String(MOT.Parameters['お気に入り解除時のSE:ファイル名']);
MOT.Param.FavoriteRelSeVol     = Number(MOT.Parameters['お気に入り解除時のSE:ボリューム']);
MOT.Param.FavoriteRelSePit     = Number(MOT.Parameters['お気に入り解除時のSE:ピッチ']);


MOT.Param.SortItemKey       = String(MOT.Parameters['ソート画面を開くキー']);
MOT.Param.SortItemTitle     = String(MOT.Parameters['ソートタイトルに表示される文字列']);
MOT.Param.SortItemFontSize  = Number(MOT.Parameters['ソートタイトル画面:フォントサイズ']);
MOT.Param.SortItemWidth     = Number(MOT.Parameters['ソートタイトル画面:横幅']);
MOT.Param.SortItemHeight    = Number(MOT.Parameters['ソートタイトル画面:縦幅']);
MOT.Param.SortItemPadding   = Number(MOT.Parameters['ソートタイトル画面:パディング']);
//=============================================================================
MOT.Keys =
{
    '':-1,
    'none':-1,
    'a':65,
    'b':66,
    'c':67,
    'd':68,
    'e':69,
    'f':70,
    'g':71,
    'h':72,
    'i':73,
    'j':74,
    'k':75,
    'l':76,
    'm':77,
    'n':78,
    'o':79,
    'p':80,
    'q':81,
    'r':82,
    's':83,
    't':84,
    'u':85,
    'v':86,
    'w':87,
    'x':88,
    'y':89,
    'z':90,
};
MOT.Keys.set = function(keycode)
{
    keycode = keycode.toLowerCase();
    if (Input.keyMapper[MOT.Keys[keycode]] === undefined) { Input.keyMapper[MOT.Keys[keycode]] = keycode; }
    return Input.keyMapper[MOT.Keys[keycode]];
}
MOT.ItemFavoriteSort.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    MOT.ItemFavoriteSort.Game_System_initialize.call(this);
    this.sortModeItems   = 0;
    this.sortModeWeapons = 0;
    this.sortModeArmors  = 0;
    this.sortModeKeys    = 0;
    this.favoriteItems = [0];
    this.favoriteWeapons = [0];
    this.favoriteArmors = [0];
    this.favoriteKeyItems = [0];
};
Game_System.prototype.favoriteCheck = function(id,category) {
    var index = 0;
    
    if (category === 'item') {
	    for (var i = 0; i < this.favoriteItems.length; i++){
	        if(this.favoriteItems[i] === id) index = i;
	    }
    } else if (category === 'weapon') {
	    for (var i = 0; i < this.favoriteWeapons.length; i++){
	        if(this.favoriteWeapons[i] === id) index = i;
	    }
    } else if (category === 'armor') {
	    for (var i = 0; i < this.favoriteArmors.length; i++){
	        if(this.favoriteArmors[i] === id) index = i;
	    }
    } else if (category === 'keyItem') {
	    for (var i = 0; i < this.favoriteKeyItems.length; i++){
	        if(this.favoriteKeyItems[i] === id) index = i;
	    }
    }
    if (index === 0){
        this.favoriteReg(id,category);
    } else {
        this.favoriteRel(index,category);
    }
};
Game_System.prototype.getfavoriteId = function(id,category) {
    var fid = 0;
    if (category === 'item') {
	    for (var i = 0; i < this.favoriteItems.length; i++){
	        if(this.favoriteItems[i] === id) fid = i;
	    }
    } else if (category === 'weapon') {
	    for (var i = 0; i < this.favoriteWeapons.length; i++){
	        if(this.favoriteWeapons[i] === id) fid = i;
	    }
    } else if (category === 'armor') {
	    for (var i = 0; i < this.favoriteArmors.length; i++){
	        if(this.favoriteArmors[i] === id) fid = i;
	    }
    } else if (category === 'keyItem') {
	    for (var i = 0; i < this.favoriteKeyItems.length; i++){
	        if(this.favoriteKeyItems[i] === id) fid = i;
	    }
    }
    return fid;
};
Game_System.prototype.favoriteReg = function(id,category) {
	var flg = true;
    if (category === 'item' && this.favoriteItems.length < MOT.Param.FavoriteLimit + 1) {
		this.favoriteItems.push(id);
    } else if (category === 'weapon' && this.favoriteWeapons.length < MOT.Param.FavoriteLimit + 1) {
		this.favoriteWeapons.push(id);
    } else if (category === 'armor' && this.favoriteArmors.length < MOT.Param.FavoriteLimit + 1) {
		this.favoriteArmors.push(id);
    } else if (category === 'keyItem' && this.favoriteKeyItems.length < MOT.Param.FavoriteLimit + 1) {
		this.favoriteKeyItems.push(id);
    } else {
	    flg = false;
    }
    if (flg) {
	    AudioManager.playSe({name: MOT.Param.FavoriteRegSeFile, volume: MOT.Param.FavoriteRegSeVol, pitch: MOT.Param.FavoriteRegSePit, pan: 0});
	} else {
		SoundManager.playBuzzer();
	}
};
Game_System.prototype.favoriteRel = function(index,category) {
    if (category === 'item') {
		this.favoriteItems.splice(index, 1);
    } else if (category === 'weapon') {
		this.favoriteWeapons.splice(index, 1);
    } else if (category === 'armor') {
		this.favoriteArmors.splice(index, 1);
    } else if (category === 'keyItem') {
		this.favoriteKeyItems.splice(index, 1);
    }
    AudioManager.playSe({name: MOT.Param.FavoriteRelSeFile, volume: MOT.Param.FavoriteRelSeVol, pitch: MOT.Param.FavoriteRelSePit, pan: 0});
};
//-----------------------------------------------------------------------------
// Window_ItemSortTitle
//-----------------------------------------------------------------------------
function Window_ItemSortTitle() {
    this.initialize.apply(this, arguments);
}

Window_ItemSortTitle.prototype = Object.create(Window_Base.prototype);
Window_ItemSortTitle.prototype.constructor = Window_ItemSortTitle;

Window_ItemSortTitle.prototype.initialize = function() {
    var width = MOT.Param.SortItemWidth;
    var height = MOT.Param.SortItemHeight;
    var x = (Graphics.boxWidth - width) / 2;
    var y = (Graphics.boxHeight / 2) - 180;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.hide();
    this.refresh();
};
Window_ItemSortTitle.prototype.standardFontSize = function() {
    return MOT.Param.SortItemFontSize;
};
Window_ItemSortTitle.prototype.refresh = function() {
    this.contents.clear();
    this.drawText(MOT.Param.SortItemTitle, 0, 0, MOT.Param.SortItemWidth,'center');
};
Window_ItemSortTitle.prototype.standardPadding = function() {
    return MOT.Param.SortItemPadding;
};
//-----------------------------------------------------------------------------
// Window_ItemSort
//-----------------------------------------------------------------------------
function Window_ItemSort() {
    this.initialize.apply(this, arguments);
}

Window_ItemSort.prototype = Object.create(Window_HorzCommand.prototype);
Window_ItemSort.prototype.constructor = Window_ItemSort;

Window_ItemSort.prototype.initialize = function() {
    Window_HorzCommand.prototype.initialize.call(this, 0, 0);
    this.active = false;
    this.hide();
    this._category = 'none';
};

Window_ItemSort.prototype.windowWidth = function() {
    return MOT.Param.SortItemWidth;
};
Window_ItemSort.prototype.setCategory = function(category) {
    if (this._category !== category) {
        this._category = category;
    }
};
Window_ItemSort.prototype.numVisibleRows = function() {
    return 4;
};

Window_ItemSort.prototype.maxCols = function() {
    return 2;
};

Window_ItemSort.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
};
Window_ItemSort.prototype.setSort = function() {
    switch(this._category){
        case 'item':
            $gameSystem.sortModeItems = this._index;
            break;
        case 'weapon':
            $gameSystem.sortModeWeapons = this._index;
            break;
        case 'armor':
            $gameSystem.sortModeArmors = this._index;
            break;
        case 'keyItem':
            $gameSystem.sortModeKeys = this._index;
            break;
    }
    if ($gameParty.inBattle()){
    	$gameSystem.sortModeItems = this._index;
    }
};
Window_ItemSort.prototype.makeCommandList = function() {
    this.addCommand('ID昇順',    'idup');
    this.addCommand('ID降順',    'iddown');
    
    this.addCommand('名前昇順',    'nameup');
    this.addCommand('名前降順',    'namedown');
    
    this.addCommand('価格昇順',    'priceup');
    this.addCommand('価格降順',    'pricedown');
    
    this.addCommand('個数昇順',    'numup');
    this.addCommand('個数降順',    'numdown');
};
//-----------------------------------------------------------------------------
// Window_ItemCategory
//-----------------------------------------------------------------------------
Window_ItemCategory.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setCategory(this.currentSymbol());
    }
    if (this._sortWindow) {
        this._sortWindow.setCategory(this.currentSymbol());
    }
};
Window_ItemCategory.prototype.setSortWindow = function(sortWindow) {
    this._sortWindow = sortWindow;
    this.update();
};
//-----------------------------------------------------------------------------
// Window_ItemList
//-----------------------------------------------------------------------------
Window_ItemList.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.updateFavoriteItem();
};

Window_ItemList.prototype.updateFavoriteItem = function() {
    if (this._index === -1) return ;
    if (!this.active) return ;
    if (Input.isTriggered(MOT.Keys.set(MOT.Param.FavoriteKey))) {
        $gameSystem.favoriteCheck(this._data[this._index].id,this.getCategorys(this._data[this._index]));
        this.refresh();
    }
    
};
Window_ItemList.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        var fIconId = $gameSystem.getfavoriteId(item.id,this.getCategorys(item));
        if (fIconId !== 0){
            this.drawIcon(MOT.Param.FavoriteIcon, x + iconBoxWidth, y + 2);
            x = x + iconBoxWidth + 2;
        }
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};
Window_ItemList.prototype.refresh = function() {
    this.makeItemList();
    this.appySort();
    this.createContents();
    this.drawAllItems();
};
Window_ItemList.prototype.appySort = function() {
    var sortMode = this.getSortMode();
    switch(sortMode){
        case 0:
            this.ascending('id')
            break;
        case 1:
            this.descending('id')
            break;
        case 2:
            this.ascending('name')
            break;
        case 3:
            this.descending('name')
            break;
        case 4:
            this.ascending('price')
            break;
        case 5:
            this.descending('price')
            break;
        case 6:
            this.ascending('num')
            break;
        case 7:
            this.descending('num')
            break;
    }
};

Window_ItemList.prototype.getSortMode = function() {
    switch(this._category){
        case 'item':
            return $gameSystem.sortModeItems;
        case 'weapon':
            return $gameSystem.sortModeWeapons;
        case 'armor':
            return $gameSystem.sortModeArmors;
        case 'keyItem':
            return $gameSystem.sortModeKeys;
    }
    if ($gameParty.inBattle()){
    	return $gameSystem.sortModeItems;
    }
};

Window_ItemList.prototype.getCategorys = function(item) {
    if (item.itypeId) {
    	if (item.itypeId == 1){
	    	return 'keyItem';
    	}else{
    		return 'item';
    	}
    }else if (item.wtypeId){
    	return 'weapon';
    }else if (item.etypeId){
    	return 'armor';
    }
}
Window_ItemList.prototype.ascending = function(mode) {
    var sortMode = this.getSortMode();
    var sthis = this;
    this._data.sort(function(a, b){

        var a_fitem = $gameSystem.getfavoriteId(a.id,sthis.getCategorys(a));
        if (a_fitem === 0) a_fitem = 99 ; 
        var b_fitem = $gameSystem.getfavoriteId(b.id,sthis.getCategorys(b));
        if (b_fitem === 0) b_fitem = 99 ; 
        if(a_fitem < b_fitem) return -1;
        if(a_fitem > b_fitem) return 1;
        if (mode === 'name'){
            var na = (a.meta.sortCode)? a.meta.sortCode : a.name;
            var nb = (b.meta.sortCode)? b.meta.sortCode : b.name;
            na = sthis.changeStrCode(na);
            nb = sthis.changeStrCode(nb);
            if(na < nb) return -1;
            if(na > nb) return 1;
        } else if (mode === 'price'){
            if(a.price < b.price) return -1;
            if(a.price > b.price) return 1;
        } else if (mode === 'num'){
            if($gameParty.numItems(a) < $gameParty.numItems(b)) return -1;
            if($gameParty.numItems(a) > $gameParty.numItems(b)) return 1;
        }
        if(a.id < b.id) return -1;
        if(a.id > b.id) return 1;
        return 0;
    },this);
};
Window_ItemList.prototype.descending = function(mode) {
    var sortMode = this.getSortMode();
    var sthis = this;
    this._data.sort(function(a, b){
        var a_fitem = $gameSystem.getfavoriteId(a.id,sthis.getCategorys(a));
        if (a_fitem === 0) a_fitem = 99 ; 
        var b_fitem = $gameSystem.getfavoriteId(b.id,sthis.getCategorys(b));
        if (b_fitem === 0) b_fitem = 99 ; 
        if(a_fitem < b_fitem) return -1;
        if(a_fitem > b_fitem) return 1;
        if (mode === 'name'){
            var na = (a.meta.sortCode)? a.meta.sortCode : a.name;
            var nb = (b.meta.sortCode)? b.meta.sortCode : b.name;
            na = sthis.changeStrCode(na);
            nb = sthis.changeStrCode(nb);
            if(na > nb) return -1;
            if(na < nb) return 1;
        } else if (mode === 'price'){
            if(a.price > b.price) return -1;
            if(a.price < b.price) return 1;
        } else if (mode === 'num'){
            if($gameParty.numItems(a) > $gameParty.numItems(b)) return -1;
            if($gameParty.numItems(a) < $gameParty.numItems(b)) return 1;
        }
        if(a.id > b.id) return -1;
        if(a.id < b.id) return 1;
        return 0;
    },this);
};

Window_ItemList.prototype.changeStrCode = function(item) {
    return item.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    },this);
}
//-----------------------------------------------------------------------------
// Scene_Item
//-----------------------------------------------------------------------------
MOT.ItemFavoriteSort.Scene_Item_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function() {
    MOT.ItemFavoriteSort.Scene_Item_create.call(this);
    this.createSortTitleWindow();
    this.createSortWindow();
};
Scene_Item.prototype.createSortTitleWindow = function() {
    this._sortTitleWindow = new Window_ItemSortTitle();
    this.addWindow(this._sortTitleWindow);
};
Scene_Item.prototype.createSortWindow = function() {
    this._sortWindow = new Window_ItemSort();
    this._sortWindow.x = (Graphics.boxWidth - MOT.Param.SortItemWidth) / 2;
    this._sortWindow.y = this._sortTitleWindow.y + this._sortTitleWindow.height;
    this._sortWindow.setHandler('ok',     this.onSortOk.bind(this));
    this._sortWindow.setHandler('cancel', this.onSortCancel.bind(this));
    this._categoryWindow.setSortWindow(this._sortWindow);
    this.addWindow(this._sortWindow);
};

Scene_Item.prototype.onSortOk = function() {
    this._sortWindow.setSort();
    this._sortTitleWindow.hide();
    this._sortWindow.hide();
    this._itemWindow.refresh();
    this._itemWindow.activate();
    this._itemWindow.selectLast();
};
Scene_Item.prototype.onSortCancel = function() {
    this._sortTitleWindow.hide();
    this._sortWindow.hide();
    this._itemWindow.activate();
    this._itemWindow.selectLast();
};

Scene_Item.prototype.update = function() {
    if (Input.isTriggered(MOT.Keys.set(MOT.Param.SortItemKey)) && this._itemWindow.active) {
        SoundManager.playOk();
        this._itemWindow.deactivate();
        this._sortWindow.activate();
        this._sortWindow.select(this._itemWindow.getSortMode());
        this._sortTitleWindow.show();
        this._sortWindow.show();
    }
    Scene_MenuBase.prototype.update.call(this);
};

//-----------------------------------------------------------------------------
// Scene_Shop
//-----------------------------------------------------------------------------
MOT.ItemFavoriteSort.Scene_Shop_create = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function() {
    MOT.ItemFavoriteSort.Scene_Shop_create.call(this);
    this.createSortTitleWindow();
    this.createSortWindow();
};
Scene_Shop.prototype.createSortTitleWindow = function() {
    this._sortTitleWindow = new Window_ItemSortTitle();
    this.addWindow(this._sortTitleWindow);
};
Scene_Shop.prototype.createSortWindow = function() {
    this._sortWindow = new Window_ItemSort();
    this._sortWindow.x = (Graphics.boxWidth - MOT.Param.SortItemWidth) / 2;
    this._sortWindow.y = this._sortTitleWindow.y + this._sortTitleWindow.height;
    this._sortWindow.setHandler('ok',     this.onSortOk.bind(this));
    this._sortWindow.setHandler('cancel', this.onSortCancel.bind(this));
    this._categoryWindow.setSortWindow(this._sortWindow);
    this.addWindow(this._sortWindow);
};

Scene_Shop.prototype.onSortOk = function() {
    this._sortWindow.setSort();
    this._sortTitleWindow.hide();
    this._sortWindow.hide();
    this._sellWindow.refresh();
    this._sellWindow.activate();
    this._sellWindow.selectLast();
};
Scene_Shop.prototype.onSortCancel = function() {
    this._sortTitleWindow.hide();
    this._sortWindow.hide();
    this._sellWindow.activate();
    this._sellWindow.selectLast();
};

Scene_Shop.prototype.update = function() {
    if (Input.isTriggered(MOT.Keys.set(MOT.Param.SortItemKey)) && this._sellWindow.active) {
        SoundManager.playOk();
        this._sellWindow.deactivate();
        this._sortWindow.activate();
        this._sortWindow.select(this._sellWindow.getSortMode());
        this._sortTitleWindow.show();
        this._sortWindow.show();
    }
    Scene_MenuBase.prototype.update.call(this);
};
//-----------------------------------------------------------------------------
// Scene_Battle
//-----------------------------------------------------------------------------
MOT.ItemFavoriteSort.Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    MOT.ItemFavoriteSort.Scene_Battle_createAllWindows.call(this);
    this.createSortTitleWindow();
    this.createSortWindow();
};
Scene_Battle.prototype.createSortTitleWindow = function() {
    this._sortTitleWindow = new Window_ItemSortTitle();
    this.addWindow(this._sortTitleWindow);
};
Scene_Battle.prototype.createSortWindow = function() {
    this._sortWindow = new Window_ItemSort();
    this._sortWindow.x = (Graphics.boxWidth - MOT.Param.SortItemWidth) / 2;
    this._sortWindow.y = this._sortTitleWindow.y + this._sortTitleWindow.height;
    this._sortWindow.setHandler('ok',     this.onSortOk.bind(this));
    this._sortWindow.setHandler('cancel', this.onSortCancel.bind(this));
    this.addWindow(this._sortWindow);
};

Scene_Battle.prototype.onSortOk = function() {
    this._sortWindow.setSort();
    this._sortTitleWindow.hide();
    this._sortWindow.hide();
    this._itemWindow.refresh();
    this._itemWindow.activate();
    this._itemWindow.selectLast();
};
Scene_Battle.prototype.onSortCancel = function() {
    this._sortTitleWindow.hide();
    this._sortWindow.hide();
    this._itemWindow.activate();
    this._itemWindow.selectLast();
};
MOT.ItemFavoriteSort.Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    if (Input.isTriggered(MOT.Keys.set(MOT.Param.SortItemKey)) && this._itemWindow.active) {
        SoundManager.playOk();
        this._itemWindow.deactivate();
        this._actorCommandWindow.deactivate();
        this._sortWindow.activate();
        this._sortWindow.select(this._itemWindow.getSortMode());
        this._sortTitleWindow.show();
        this._sortWindow.show();
    }
	if (this._sortWindow.active) {
	    var active = this.isActive();
	    $gameTimer.update(active);
	    $gameScreen.update();
		 Scene_Base.prototype.update.call(this);
	} else {
		MOT.ItemFavoriteSort.Scene_Battle_update.call(this);
	}
};