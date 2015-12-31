/*:
@plugindesc This plugin is the MANAGER to swap event with building / decorations based on item.
<EST_BUILD_AND_DECOR>
@author Estriole

@param VarIdForSelection
@desc Variable ID to be used to item selection
@default 7

@param DecorMoveSwitchId
@desc Switch ID to mark decor is being moved. also to stop player movement, open save, open menu
@default 7

@param DecorMoveSelfSwitch
@desc The self switch to flip when finishing decor movement
A, B, C, or D
@default C

@param DecorMoveCancelSelfSwitch
@desc The self switch to flip when canceling decor movement
(so you can give the item back then delete the event)
A, B, C, or D
@default B

@param DecorMoveMovementDelay
@desc delay frame between decor movement
@default 15

@param CannotBePlacedOpacity
@desc opacity of event if it cannot be placed when moving the event
@default 150

@help
 ■ Information      ╒══════════════════════════╛
 EST - Build And Decor EX
 Version: 1.5
 By Estriole
 File name: EST_Build_And_Decor_EX.js

 ■ Introduction     ╒══════════════════════════╛
	Conversion of my EST - BUILD AND DECOR SERIES script from ACE.
 Mainly this script make you can have 'decoration' item that you 
 can place to customize your map. if you're using my EST - EVENT SIZE AND TRIGGER
 plugin... you can also make the decoration as building. this plugin also include
 EST - DECOR MOVEMENT conversion from ACE instead making it separate plugin. 
 thus this plugin named: EST - Build And Decor EX

 ■ Features         ╒══════════════════════════╛
 - bind 'decoration'/'building' to item.
 it's actually event in template map.
 - you can separate decoration by category. ex: building, wall, furniture, etc
 - you can move the decoration freely using parallel event page and selfswitch

 ■ Changelog       ╒══════════════════════════╛
   v1.0 2015.11.10           Initial Release
   v1.1 2015.11.12      > add documentation on how to use this.isAnyEventOnSelf()
   						also minor bugfix on that method to recognize Through event.
   v1.2 2015.11.23      > add mouse detection for decor move:
   						Left mouse click => set event movement to that coordinate
   						Right mouse click => cancel decor movement. set selfswitch cancel
   						(so you can create event page to delete the event and give item)
   v1.3 2015.12.08      > add method to check event in xy have certain name or not.
						> add method to return list of all event in current map that have certain name
   v1.4 2015.12.14      > fix when canceling placing decor will open up menu
   						> fix incompatibility with EST - EVENT SIZE AND TRIGGER which not 
   						erasing master event size
   						> add plugin parameter to set delay for decor movement (15 is recommended)
   						> NEW DECOR MOVEMENT which more fluid with mouse. but also support touch screen.
   						which also support placing item from common event (see demo - 'table' item is reworked)
   						but if you prefer old decor movement just set in the plugin parameter.
   v1.5 2015.12.18      > NEW DECOR MOVEMENT now also check moved event SIZE... 
   						so if the moved event size is placed in 'unplaceable' coordinate... 
   						we won't be able to place the decoration.
   						to set size to moved event... add the comment tag in the parallel process
   						containing the decor movement command.
   						> add Region Limit to decor movement... now you can make Pokemon Center
   						only movable to region 100.
   						> when decoration/building cannot be placed... it will make it semi transparent.
   						so you have some visual help on where you can place your building.
   						i once want to color the decoration red... but chrome doesn't support it.
   						> ability to automatically flip Selfswitch C (enter decor movement)
   						so no need for placeholder event anymore.
   						> fix bug in decor move plugin command.
   v1.6 2015.12.27      > Removed Plugin Parameter... now it always use neo movement...
              also remove keyboard support since computer will have mouse and phone have touch screen.
              change the behaviour... right click press (move event to mouse pos)...
              right click release (place event in location)... so it should be more touch screen
              friendly now.
              > rework how the parameter for decor movement passed... old method still work
              but there's new method that added...
              > ability to set mapLimit for decor event. so you can only place it in certain map
              > ability to ignore map passage... so now we can build shipyard at the shallow water
              read 5.b in how to use...

 ■ Plugin Download ╒══════════════════════════╛
 https://www.dropbox.com/s/mwht3kmvjpu2v2c/EST_Build_And_Decor_EX.js?dl=0
 
 ■ How to use       ╒══════════════════════════╛
 1) Make Decoration Item
 create an item in database... give it notetags:
 
 mandatory:
 <decor_map: mapId>
 <decor_id: eventId>
 <decor_type: type>
 
 optional:
 <decor_xmod: x>
 <decor_xmod: y>

 change mapId => your template map id... you can have more than 1 template map
 change eventId => event in in your template map you want to place as your decoration
 change type => any string to mark the decoration type.
 change x => to any number of tiles you want the new decoration to shift it's placement. 
 			 positive value = right, negative value = left
 change y => to any number of tiles you want the new decoration to shift it's placement.
 			 positive value = down, negative value = up
 
 <decor_xmod: x>
 <decor_xmod: y>
 will be ignored if in your decor selection call you add posfix value 
 (it will be placed in posfix coordinate instead) 

 example notetags:
 <decor_map: 8>
 <decor_id: 12>
 <decor_type: Building>
 <decor_xmod: 1>
 <decor_xmod: -1>
 
 the item is listed in decor selection for "Building"
 when that item is selected in decor selection...
 it will grab event from map 8 event id 12
 and place it in the position of event that called it
 but will shift it x by 1 and y by -1

 2) Giving Decoration Item to player...
 just give the item using event command / monster drop / anything

 3) Placing the Decoration using Decor Selection
 plugin command
	DECOR_SELECT decortype delete? posfix
 
 or script Call
 	this.decorSelect(decortype,delete?,posfix)

 mandatory:
 decortype => will only list item with the decortype in script call this require
 			  you to pass a string... so wrap it in "". in plugin command
 			  it's not necessary. since all become string in plugin command.

 optional:
 delete? => delete the calling event / not. true = delete, false = don't delete.
            if you don't fill it... it will defaulted to true
 posfix => array containing [x,y] coordinate of where the new event placed.
 		   if you using this the <decor_xmod: x> and <decor_ymod: y>
		   will be ignored... since the event will be FIXED to placed in that coordinate

 you can choose to not using the optional parameter. just don't fill anything and it works

 Some example:
 Plugin command: 	decor_select building
 Script Call   : 	this.decorSelect("building");
 
 yes the DECOR_SELECT is not case sensitive... i make it caps above so people read it better.
 will list all item which have <decor_type: building> (not case sensitive. so BuIlDiNG works fine)
 
 Plugin command: 	decor_select building false
 Script Call   : 	this.decorSelect("building", false);
 
 will list all item which belong to building type. also will NOT delete the calling event

 Plugin command: 	decor_select building false [10,3]
 Script Call   : 	this.decorSelect("building",false,[10,3]);

 will list all item which belong to building type. also will NOT delete the calling event
 and will PLACED the event at x = 10, y = 3 coordinate

 
 4) Removing Decoration
 plugin command:
 	REMOVE_DECOR mastermap masteritem xmod ymod
 or script call:
    this.rmvDecoration(mastermap, masteritem, xmod, ymod)
 
 ALL is optional:
 fill this parameter only if you want the deleted decoration REPLACED by other event.
 for example replace the event to event that call decor_selection again.

 mastermap => map id for event which will replace deleted event
 masteritem => event id for event which will replace deleted event
 xmod => when placing replacement event it will shift x tiles from deleted event position
 		 positive value = right, negative value = left
 ymod => when placing replacement event it will shift y tiles from deleted event position

 it's optional so you don't need to fill it
 
 examples:
 Plugin command: 	remove_decor
 Script Call   : 	this.rmvDecoration();
 
 will delete the decoration and that's it.

 Plugin command: 	remove_decor 8 3
 Script Call   : 	this.rmvDecoration(8,3);
 
 will delete the decoration and replace it with event from map 8 event 3

 Plugin command: 	remove_decor 8 3 6 7
 Script Call   : 	this.rmvDecoration(8,3,6,-7);
 
 will delete the decoration and replace it with event from map 8 event 3
 and shift x by 6 tiles to right and shift y by 7 tiles above

 5) Moving Decoration
 make a page in existing decoration event. make it activate when selfSwitch C activated
 (you can change the selfSwitch in plugin parameter. but C is the default value)

 change it to Paralles Process. and make sure it's same as character priority
 you can add the plugin command / script call in the event page.

 plugin command FORMAT:
	DECOR_MOVE selfSwitchEnd cancelSelfSwitchEnd regionLimit
 or script call:
	this.decor_move(selfSwitchEnd, cancelSelfSwitchEnd, regionLimit);

 ALL parameter is optional
 selfSwitchEnd => the selfswitch (default 'C') value when the decor move ENDED.
                  true / false. 

                  it depend on how you set the event page...
				  > if decor movement placed in an event page that have selfSwitch C = ON as condition
				  and your "other" page is in page without condition. so you want selfSwitch C => OFF
				  at end of decor movement... use false.
				  > if decor movement placed in an event page that have no condition and the "other"
				  event page is the one with condition selfSwitch C = ON. so you want selfSwitch C => ON
				  at end of decor movement... use true.
          > after adding decor auto move feature... i decide this become false if you don't
          specify it (turning off the selfswitch)

cancelSelfSwitchEnd => selfswitch (default 'B') value when the decor move CANCELED
				  true / false.
          > by default it will become true if not entered...
				  the decor move can be cancelled using escape keyboard button, or right click mouse button.

regionLimit		=> limit the region where you can PLACE the decoration / building to certain region only
				  useful to make building that can be placed in 'shallow water only' such as shipyard, etc
				  or limit where you can place your building...

example:
 Plugin command:     decor_move false true 100
 Script Call   :     this.decor_move(false, true, 100);
  will move the decoration... when the decor movement end... it will flip selfSwitch you set in parameter to false (OFF).
  if decor move canceled. it will flip selfswitch cancel (default 'B') to true.
  and decoration only able to be placed on region 100

 Plugin command:     decor_move true
 Script Call   :     this.decor_move(true);
  will move the decoration... when the decor movement end... it will flip selfSwitch you set in parameter to true (ON).
  if decor move canceled. it will flip selfswitch cancel (default 'B') to true.

 Plugin command:     decor_move
 Script Call   :     this.decor_move();
  if you didn't fill true / false like above... it will defaulted selfswitch C to false
  and selfswitch B to true.

 5.a) YOU CAN make the event automatically enter movement mode (selfswitch C ON) by calling this
 BEFORE you call decor selection
 Plugin Command: DECOR_START_AUTO_MOVE
 Script Call   : $gameSystem._decorStartMove = true;

 5.b) THIS SCRIPT CALL / PLUGIN CALL can be called BEFORE decor_move plugin command to 
 modify the decor move behaviour. it will override the setting you passed on decor_move:
 Plugin Call:
 DMSelfSwitchEnd false
    > true / false
 DMCancelSelfSwitchEnd true 
    > true / false
 DMRegionLimit 22
    > change 22 to region id you limit the event to be placed
 DMIgnoreMapPass true
    > true / false
      if true it will ignore map passage and allow you to place event on wall (unpassable terain)
      now you can build a shipyard and place it at shallow water
 DMMapLimit [6,12]
    > change [6,12] to array of map id you allow the event to be placed.

 Script Call:
 $gameTemp._DMSelfSwitchEnd = false;
    > true / false
 $gameTemp._DMCancelSelfSwitchEnd = true; 
    > true / false
 $gameTemp._DMRegionLimit = 22;
    > change 22 to region id you limit the event to be placed
 $gameTemp._DMIgnoreMapPass = true;
    > true / false
      if true it will ignore map passage and allow you to place event on wall (unpassable terain)
      now you can build a shipyard and place it at shallow water
 $gameTemp._DMMapLimit = [6,12];
    > change [6,12] to array of map id you allow the event to be placed.

 6) HAVING Event on Top of other event... and you don't want event below it to activate.
 example case: you place a table. then place a vase on top of it. you want vase to activate while table is not.
 in table event page use conditional branch: script:
 this.isAnyEventOnSelf()
`
 if true do nothing...
 if false (means there's nothing on top of it): place your event command if there's nothing on top of it.
 example you can remove the table, etc. which you don't want to trigger if there's vase on top of table.

 7) some script call to use in conditional branch:
 
 $gameMap.isXyHasEventName(name, x, y);
 
 will check x y coordinate. does it have event with that name.
 if found it will return true. if not found it will return false
 name could be string or regExp (if string it will be case sensitive)
 	example:
	 $gameMap.isXyHasEventName("Red Roof Building", 2, 2);
	 will return true if in coordinate 2,2 you have event named "Red Roof Building"
	 case sensitive !!!
	 $gameMap.isXyHasEventName(/Red Roof Building/i, 2, 2);
	 will return true if in coordinate 2,2 you have event named "Red Roof Building"
	 not case sensitive. meaning that "ReD RoOF BuIlDiNg" will also detected
	 $gameMap.isXyHasEventName(/Red/i, 2, 2);
	 will return true if in coordinate 2,2 you have event named that contain Red inside the name
	 so something like "red roof building" "red wall building" is detected.
	 not case sensitive because of /i. meaning that "ReD" will also detected.

 8) another script call to use...

 $gameMap.eventWithNameList(name)

 will list all events in current map which match the name.
 if found it will return array of Game_Event. if not found it will return false
 name could be string or regExp (if string it will be case sensitive)
	example:
	 $gameMap.eventWithNameList("Red Roof Building")
	 will return array of events which have name "Red Rood Building"
	 case sensitive !!!
	 $gameMap.eventWithNameList(/Red Roof Building/i, 2, 2);
	 will return array of events that named "Red Roof Building"
	 not case sensitive. meaning that "ReD RoOF BuIlDiNg" will also detected
	 $gameMap.eventWithNameList(/Red/i, 2, 2);
	 will return array of events that contain Red inside the name
	 so something like "red roof building" "red wall building" is detected.
	 not case sensitive because of /i. meaning that "ReD" will also detected.

 XXX) FOR OTHER SCRIPTER that want to make compatibility patch for this plugin.
 check EST.Build_And_Decor exist or not.
 ex: 
 if(typeof EST !== 'undefined' && EST.Build_And_Decor) {
  place your code here.
 }
 
 ■ Dependencies     ╒══════════════════════════╛
 mandatory:
 EST - SAVE MAP EVENT
 EST - CLONE TRANSFORM DELETE EVENT
 optional:
 EST - EVENT SIZE AND TRIGGER
 EST - GRAPHIC SHIFT
 EST - REGIONMAPLOADER

 ■ Compatibility    ╒══════════════════════════╛
 I'm new in JS... and MV is new engine... so i cannot say for sure. 
 but it should be compatible with most things. 

 ■ Parameters       ╒══════════════════════════╛
  > VarIdForSelection
		Variable ID to be used to item selection
        default 7

  > DecorMoveSwitchId
        Switch ID to mark decor is being moved. also to stop player movement, open save, open menu
        default 7

  > DecorMoveSelfSwitch
    	The self switch to flip when finishing decor movement
		A, B, C, or D
        default C

 ■ License          ╒══════════════════════════╛
 Free to use in all project (except the one containing pornography)
 as long as i credited (ESTRIOLE). 

 ■ Support          ╒══════════════════════════╛
 While I'm flattered and I'm glad that people have been sharing and 
 asking support for scripts in other RPG Maker communities, I would 
 like to ask that you please avoid posting my scripts outside of where 
 I frequent because it would make finding support and fixing bugs 
 difficult for both of you and me.
   
 If you're ever looking for support, I can be reached at the following:
 [ http://forums.rpgmakerweb.com/ ]
 pm me : estriole

 ■ Author's Notes   ╒══════════════════════════╛
 This is FINAL part of the EST - DECOR AND BUILD SERIES.
*/
var EST = EST || {};
EST.Build_And_Decor = EST.Build_And_Decor || {};

EST.Build_And_Decor.parameters = $plugins.filter(function(p) { 
	return p.description.contains('<EST_BUILD_AND_DECOR>'); })[0].parameters;
EST.Build_And_Decor.varId = Number(EST.Build_And_Decor.parameters['VarIdForSelection']);
EST.Build_And_Decor.selfSwitchId = EST.Build_And_Decor.parameters['DecorMoveSelfSwitch'];
EST.Build_And_Decor.cancelSelfSwitchId = EST.Build_And_Decor.parameters['DecorMoveCancelSelfSwitch'];
EST.Build_And_Decor.DecorMoveSwitchId = Number(EST.Build_And_Decor.parameters['DecorMoveSwitchId']);
EST.Build_And_Decor.moveDelay = EST.Build_And_Decor.parameters['DecorMoveMovementDelay'];
EST.Build_And_Decor.CannotBePlacedOpacity = Number(EST.Build_And_Decor.parameters['CannotBePlacedOpacity']);


//if plugin parameter is not correct it will show warning popup window
if (isNaN(EST.Build_And_Decor.varId)) window.alert("Wrong Variable Id in plugin Parameter");
if (isNaN(EST.Build_And_Decor.DecorMoveSwitchId)) window.alert("Wrong Variable Id in plugin Parameter");
if (isNaN(EST.Build_And_Decor.CannotBePlacedOpacity)) window.alert("Update your -CannotBePlacedOpacity- plugin parameter\n Open your plugin editor and set value to that parameter");

if (['A','B','C','D'].indexOf(EST.Build_And_Decor.selfSwitchId.toUpperCase()) < 0) 
	window.alert("Wrong SelfSwitchId in plugin Parameter. only A B C D supported");

(function($){

Game_Interpreter.prototype.isAnyEventOnSelf = function() {
	var this_event = $gameMap._events[this._eventId];
	var idlist = $gameMap.eventsXy(this_event.x, this_event.y);
	if (idlist.length > 1) return true;
	return false;
};

Game_Interpreter.prototype.decorSelect = function(type, del, posfix) {
	if (type == undefined || type == null) type = null;
	if (del == undefined || del == null) del = true;
	if (posfix == undefined || posfix == null) posfix = [null,null];
	if (typeof(type) === "string") type = [type];
	$gameSystem._decorDel = del;
	$gameSystem._decorPosfix = posfix;
	$gameVariables.setValue(EST.Build_And_Decor.varId, 0);
	$gameParty._decorType = type;
	this._params = [EST.Build_And_Decor.varId];
	this.command104();
};

Game_Interpreter.prototype.addDecoration = function(mastermap, del, posfix) {
	// initing default value data
	if (mastermap == undefined || mastermap == null) mastermap = 0;
	if (del == undefined || del == null) del = true;
	if (posfix == undefined || posfix == null) posfix = [null,null];
	// check does item  selection fail or not
	if ($gameVariables[EST.Build_And_Decor.varId] == 0) return;
	// setting default x and y
	ev = $gameMap._events[this._eventId];
	try{var x = $gameMap._events[this._eventId].x;} catch(err){var x = $gamePlayer.x};
	try{var y = $gameMap._events[this._eventId].y;} catch(err){var y = $gamePlayer.y};
	var id = $gameVariables.value(EST.Build_And_Decor.varId);
	var item = $dataItems[id]
	mastermap = $gameSystem.getDecorMap(item);
	event_id = $gameSystem.getDecorEventId(item);

	if(mastermap == 0) return;
	if(event_id == 0) return;
	var xmod = $gameSystem.getDecorXmod(item);
	var ymod = $gameSystem.getDecorYmod(item);
	x += xmod; 
	y += ymod;
	if(posfix[0]) x = Number(posfix[0])
	if(posfix[1]) y = Number(posfix[1])

	var id = $gameMap.add_event(mastermap, event_id, x, y);
	if($gameSystem._decorStartMove)
	{ 
	  $gameSelfSwitches.setValue([this._mapId, id, EST.Build_And_Decor.selfSwitchId], true);
	  $gameSystem._decorStartMove = false;
	}
	if (del) this.delete_this_event();
	$gameParty.loseItem(item, 1);
};

Game_Interpreter.prototype.rmvDecoration = function(mastermap, masteritem, xmod, ymod) {
	if (mastermap == undefined || mastermap == null) mastermap = 0;
	if (masteritem == undefined || masteritem == null) masteritem = 0;
	if (xmod == undefined || xmod == null) xmod = 0;
	if (ymod == undefined || ymod == null) ymod = 0;

	var x = $gameMap._events[this._eventId].x + xmod;
	var y = $gameMap._events[this._eventId].y + ymod;
	this.delete_this_event();
	if (mastermap == 0 || masteritem == 0) return;
	$gameMap.add_event(mastermap, masteritem, x, y);
};

Game_Interpreter.prototype.rescuePlayerStuck = function(offset_x, offset_y) {
	if (!offset_x) offset_x = 0;
	if (!offset_y) offset_y = 0;
	//place player where he don't stuck
	var eventx = $gameMap._events[this._eventId].x;
	var eventy = $gameMap._events[this._eventId].y;
	$gamePlayer.locate(eventx+offset_x, eventy+offset_y)

};

$.game_system_init = Game_System.prototype.initialize
Game_System.prototype.initialize = function() {
	$.game_system_init.call(this);
	this._decorDel = null;
	this._decorPosfix = null;
	this._decorStartMove = null;
};

Game_System.prototype.getDecorMap = function(item) {
	var mastermap = 0;
	if (!item) return 0;
	var comment = item.note;
	if(comment.match(/<decor_map:\s*(\d+)?>/im)) mastermap = Number(comment.match(/<decor_map:\s*(\d+)?>/im)[1]);
	return mastermap;
};

Game_System.prototype.getDecorEventId = function(item) {
	var decorItemId = 0;
	if (!item) return 0;
	var comment = item.note;
	if(comment.match(/<decor_id:\s*(\d+)?>/im)) decorItemId = Number(comment.match(/<decor_id:\s*(\d+)?>/im)[1]);
	return decorItemId;
};
Game_System.prototype.getDecorXmod = function(item) {
	var decorXmod = 0;
	if (!item) return 0;
	var comment = item.note;
	if(comment.match(/<decor_xmod:\s*(.*)?>/im)) decorXmod = Number(comment.match(/<decor_xmod:\s*(.*)?>/im)[1]);
	return decorXmod;
};
Game_System.prototype.getDecorYmod = function(item) {
	var decorYmod = 0;
	if (!item) return 0;
	var comment = item.note;
	if(comment.match(/<decor_ymod:\s*(.*)?>/im)) decorYmod = Number(comment.match(/<decor_ymod:\s*(.*)?>/im)[1]);
	return decorYmod;
};

Game_System.prototype.getDecorType = function(item) {
	var decorType = null;
	if (!item) return null;
	var comment = item.note;
	if(comment.match(/<decor_type:\s*(.*)?>/im)) var decorType = comment.match(/<decor_type:\s*(.*)?>/im)[1];
	return decorType;
};


Game_Interpreter.prototype.delete_this_event = function (){
	if (EST && EST.Event_Size) $gameMap.open_passability($gameMap._mapId, this._eventId);
	$gameMap.delete_event(this._eventId);
};

$.game_party_initialize = Game_Party.prototype.initialize
Game_Party.prototype.initialize = function() {
	$.game_party_initialize.call(this);
    this._decorType = null;
    this._savingStatus = null;
};

$.Window_EventItem_includes = Window_EventItem.prototype.includes;
Window_EventItem.prototype.includes = function(item) {
	if($gameParty._decorType && item && $gameSystem.getDecorType(item)){
	   return $gameParty._decorType.some(function(t){
	   	if(t.toUpperCase() == $gameSystem.getDecorType(item).toUpperCase()) {
	   		return true;
	   	}
		return false;
	   });
	}
	return $.Window_EventItem_includes(this,item);
};

$.window_eventitem_onok = Window_EventItem.prototype.onOk
Window_EventItem.prototype.onOk = function() {
    $.window_eventitem_onok.call(this);
    if ($gameParty._decorType)
    {
     $gameParty._savingStatus = $gameSystem.isMenuEnabled();
	 $gameMap._interpreter.addDecoration(0, $gameSystem._decorDel, $gameSystem._decorPosfix);
	 $gameParty._decorType = null;
	 $gameSystem._decorDel = null;
	 $gameSystem._decorPosfix = null;
	 $gameSystem._decorStartMove = null;
    }
};

// //decor movement part

//disable player movement
$.game_player_moveByInput = Game_Player.prototype.moveByInput
Game_Player.prototype.moveByInput = function() {
 	if($gameSwitches.value(EST.Build_And_Decor.DecorMoveSwitchId) == true) return;	
	$.game_player_moveByInput.call(this);
};

$.game_event_updateselfmovement = Game_Event.prototype.updateSelfMovement
Game_Event.prototype.updateSelfMovement = function() {
 	if($gameSwitches.value(EST.Build_And_Decor.DecorMoveSwitchId) == true) return;		
	$.game_event_updateselfmovement.call(this);
};

Game_Interpreter.prototype.decor_move = function (selfSwitchEnd, cancelSelfSwitchEnd, regionLimit){
  if(selfSwitchEnd === undefined) selfSwitchEnd = false;
  if(cancelSelfSwitchEnd === undefined) cancelSelfSwitchEnd = true;

  $gameSwitches.setValue(EST.Build_And_Decor.DecorMoveSwitchId, true);
  var ev = $gameMap._events[this._eventId];
  var mx = $gameMap.canvasToMapX(TouchInput.x);
    var my = $gameMap.canvasToMapY(TouchInput.y);
    if (mx == 0 && my == 0)
    {
      mx = ev.x; 
      my = ev.y;
    }
  ev.locate(mx,my);
  if(!ev.decorCanPlaced(regionLimit)) ev._opacity = EST.Build_And_Decor.CannotBePlacedOpacity;
  if(ev.decorCanPlaced(regionLimit)) 
     ev._opacity = (EST.Graphic_Shift && ev.get_event_opacity()) ? ev.get_event_opacity() : 255;
  if (!ev._decorMove) TouchInput.clear();
  if (!ev._decorMove) Input.clear();
  if (Input.isPressed('ok') && ev._decorMove) 
         return this.decor_move_end(ev, selfSwitchEnd, regionLimit);
  if (Input.isPressed('cancel') && ev._decorMove) 
         return this.decor_move_cancel(ev, cancelSelfSwitchEnd);
  if (TouchInput.isPressed() && ev._decorMove) return   ev.locate(mx,my);
  if (TouchInput.isReleased() && ev._decorMove) return this.decor_move_end(ev, selfSwitchEnd, regionLimit);
  if (TouchInput.isCancelled() && ev._decorMove) return this.decor_move_cancel(ev, cancelSelfSwitchEnd);
  ev._decorMove = true;
};

Game_Event.prototype.decorCanPlaced = function(regionLimit, ignoreMapPass, mapLimit) {
  if($gameTemp._DMRegionLimit != null) regionLimit = $gameTemp._DMRegionLimit;
  if($gameTemp._DMMapLimit != null) mapLimit = $gameTemp._DMMapLimit;
  if($gameTemp._DMIgnoreMapPass != null) ignoreMapPass = $gameTemp._DMIgnoreMapPass;
	var x = this.x;
	var y = this.y;
    if (mapLimit && mapLimit.indexOf($gameMap.mapId()) < 0 ) return false;
    if (!$gameMap.isValid(x, y)) {
        return false;
    }
    if (this.isThrough() || this.isDebugThrough()) {
        return true;
    }
    if (!($gameMap.checkPassage(x, y, 0x0800) && $gameMap.checkPassage(x, y, 0x0f))) {
      if(ignoreMapPass != true) return false;
    }
    if (this.isCollidedWithCharacters(x, y)) {
        return false;
    }
    if (this.check_events_size(x, y)) {
        return false;
    }
    if (regionLimit && $gameMap.regionId(x,y) != Number(regionLimit)) {
        return false;
    }
    if (!EST.Event_Size) return;
  	this.set_event_size_and_trigger();
    var passage_map = $gameSystem._est_custom_passage_map;
    passage_map[this._mapId] = passage_map[this._mapId] || {};
    passage_map[this._mapId][this._eventId] = passage_map[this._mapId][this._eventId] || [];
    for(size of passage_map[this._mapId][this._eventId])
    {	
    	size = JSON.parse(size);
    	x = size[0];
    	y = size[1];
	    if (!$gameMap.isValid(x, y)) {
        return false;
    	}
    	if (this.isThrough() || this.isDebugThrough()) {
        return true;
    	}
    	if (!($gameMap.checkPassage(x, y, 0x0800) && $gameMap.checkPassage(x, y, 0x0f))) {
        if(ignoreMapPass != true) return false;
   		}
    	if (this.isCollidedWithCharacters(x, y)) {
        return false;
    	}
    	if (this.check_events_size(x, y)) {
        return false;
    	}
	    if (regionLimit && $gameMap.regionId(x,y) != Number(regionLimit)) {
        return false;
    	}
    }
    return true;	
};

Game_Interpreter.prototype.decor_move_end = function (ev, selfSwitchEnd, regionLimit){
  if($gameTemp._DMSelfSwitchEnd != null) selfSwitchEnd = $gameTemp._DMSelfSwitchEnd;

  if(!ev.decorCanPlaced(regionLimit)) return 	SoundManager.playBuzzer();
  ev._targetX = null;
  ev._targetY = null;
	// if($gamePlayer.x == ev.x && $gamePlayer.y == ev.y) return SoundManager.playBuzzer();
	SoundManager.playOk();
	$gameSelfSwitches.setValue([this._mapId,this._eventId,EST.Build_And_Decor.selfSwitchId],selfSwitchEnd);
	ev._decorMove = false;
	ev._oldpos = false;
	ev.refresh();
	TouchInput.clear();
	Input.clear();
  $gameTemp._DMSelfSwitchEnd = null;
  $gameTemp._DMCancelSelfSwitchEnd = null;
  $gameTemp._DMRegionLimit = null;
  $gameTemp._DMMapLimit = null;
  $gameTemp._DMIgnoreMapPass = null;
	$gameSwitches.setValue(EST.Build_And_Decor.DecorMoveSwitchId, false);
};

Game_Interpreter.prototype.decor_move_cancel = function (ev, cancelSelfSwitchEnd){
  if($gameTemp._DMCancelSelfSwitchEnd != null) cancelSelfSwitchEnd = $gameTemp._DMCancelSelfSwitchEnd;
	SoundManager.playCancel();
	var key = [this._mapId,this._eventId,EST.Build_And_Decor.cancelSelfSwitchId]
	$gameSelfSwitches.setValue(key ,cancelSelfSwitchEnd);
	ev._decorMove = false;
	ev._oldpos = false;
	ev.refresh();
	TouchInput.clear();
	Input.clear();
  $gameTemp._DMSelfSwitchEnd = null;
  $gameTemp._DMCancelSelfSwitchEnd = null;
  $gameTemp._DMRegionLimit = null;
  $gameTemp._DMMapLimit = null;
  $gameTemp._DMIgnoreMapPass = null;
	$gameSwitches.setValue(EST.Build_And_Decor.DecorMoveSwitchId, false);
};


$.game_system_issaveenabled = Game_System.prototype.isSaveEnabled
Game_System.prototype.isSaveEnabled = function() {
 	if($gameSwitches.value(EST.Build_And_Decor.DecorMoveSwitchId) == true) return false;		
	return $.game_system_issaveenabled.call(this);
};

$.game_system_ismenuenabled = Game_System.prototype.isMenuEnabled
Game_System.prototype.isMenuEnabled = function() {
 	if($gameSwitches.value(EST.Build_And_Decor.DecorMoveSwitchId) == true) return false;		
    return $.game_system_ismenuenabled.call(this);
};

$.game_event_init = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    $.game_event_init.call(this, mapId, eventId);
    this._decorMove = false;
};

Game_Map.prototype.isXyHasEventName = function(name, x, y) {
	var events = $gameMap.eventsXy(x,y)
	for(ev of events) if(ev.event().name.match(name)) return true;
	return false;
};

Game_Map.prototype.eventWithNameList = function(name) {
	var events = $gameMap.events()
	var evlist = [];
	for(ev of events) if(ev.event().name.match(name)) evlist.push(ev);
 	if (evlist.length == 0) return false;
 	return evlist;
};

$.game_temp_init = Game_Temp.prototype.initialize
Game_Temp.prototype.initialize = function() {
  $.game_temp_init.call(this);
  this._DMSelfSwitchEnd = null;
  this._DMCancelSelfSwitchEnd = null;
  this._DMRegionLimit = null;
  this._DMMapLimit = null;
  this._DMIgnoreMapPass = null;
};

  $.GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    $.GameInterpreter_pluginCommand.call(this, command, args);
     if (command.toUpperCase() === 'DECOR_SELECT') 
      {
        var alert_msg = "wrong plugin command\nread the help in plugins manager"
      	try{
      	var type = args[0];
      	if (args[1] && args[1].toUpperCase() == 'NULL') var del = null;
      	if (args[1] && args[1].toUpperCase() == 'TRUE') var del = true;
      	if (args[1] && args[1].toUpperCase() == 'FALSE') var del = false;
      	if (args[2] && args[2].match(/\[(.*)\]/i)) var posfix = JSON.parse(args[2]);
      	this.decorSelect(type, del, posfix);
      	}
      	catch(err){window.alert(alert_message)};
      };
     if (command.toUpperCase() === 'REMOVE_DECOR') 
      {
        var alert_msg = "wrong plugin command\nread the help in plugins manager"
      	try{
      	if (args[0]) var mastermap = Number(args[0]);
      	if (args[1]) var masteritem = Number(args[1]);
      	if (args[2]) var xmod = Number(args[2]);
      	if (args[3]) var ymod = Number(args[3]);
      	this.rmvDecoration(mastermap, masteritem, xmod, ymod)
      	}
      	catch(err){window.alert(alert_message)};
      };
     if (command.toUpperCase() === 'DECOR_START_AUTO_MOVE') $gameSystem._decorStartMove = true;
     if (command.toUpperCase() === 'DECOR_MOVE') 
      {
        var alert_msg = "wrong plugin command\nread the help in plugins manager"
      	try{
      	if (args[0] && args[0].toUpperCase() == 'TRUE') var selfSwitchEnd = true;
      	if (args[0] && args[0].toUpperCase() == 'FALSE') var selfSwitchEnd = false;
      	if (args[1] && args[1].toUpperCase() == 'TRUE') var cancelSelfSwitchEnd = true;
      	if (args[1] && args[1].toUpperCase() == 'FALSE') var cancelSelfSwitchEnd = false;
      	this.decor_move(selfSwitchEnd, cancelSelfSwitchEnd, args[2]);
      	}
      	catch(err){window.alert(alert_message)};
      };
     if (command.toUpperCase() === 'DMSELFSWITCHEND')
      {
        var alert_msg = "wrong plugin command\nread the help in plugins manager"
        try{
        if (args[0] && args[0].toUpperCase() == 'TRUE') $gameTemp._DMSelfSwitchEnd = true;
        if (args[0] && args[0].toUpperCase() == 'FALSE') $gameTemp._DMSelfSwitchEnd = false;        
        }
        catch(err){window.alert(alert_message)};
      };
     if (command.toUpperCase() === 'DMCANCELSELFSWITCHEND')
      {
        var alert_msg = "wrong plugin command\nread the help in plugins manager"
        try{
        if (args[0] && args[0].toUpperCase() == 'TRUE') $gameTemp._DMCancelSelfSwitchEnd = true;
        if (args[0] && args[0].toUpperCase() == 'FALSE') $gameTemp._DMCancelSelfSwitchEnd = false;        
        }
        catch(err){window.alert(alert_message)};
      };
     if (command.toUpperCase() === 'DMIGNOREMAPPASS')
      {
        var alert_msg = "wrong plugin command\nread the help in plugins manager"
        try{
        if (args[0] && args[0].toUpperCase() == 'TRUE') $gameTemp._DMIgnoreMapPass = true;
        if (args[0] && args[0].toUpperCase() == 'FALSE') $gameTemp._DMIgnoreMapPass = false;        
        }
        catch(err){window.alert(alert_message)};
      };
     if (command.toUpperCase() === 'DMREGIONLIMIT')
      {
        var alert_msg = "wrong plugin command\nread the help in plugins manager"
        try{
        if (args[0]) $gameTemp._DMRegionLimit = Number(args[0]);
        }
        catch(err){window.alert(alert_message)};
      };

     if (command.toUpperCase() === 'DMMAPLIMIT')
      {
        var alert_msg = "wrong plugin command\nread the help in plugins manager"
        try{
        $gameTemp._DMMapLimit = JSON.parse(args.join(""));
        }
        catch(err){window.alert(alert_message)};
      };
  };

})(EST.Build_And_Decor);