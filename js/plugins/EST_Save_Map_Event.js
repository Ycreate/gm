/*:
@plugindesc This plugin can make us save the map events so it won't be reloaded from database when entering new map.
<EST_SAVE_MAP_EVENT>
@author Estriole

@help
 ■ Information      ╒══════════════════════════╛
 EST - Save Map Event
 Version: 1.6
 By Estriole
 File name: EST_Save_Map_Event.js

 ■ Introduction     ╒══════════════════════════╛
 This plugin can make us save the map events so  it won't be reloaded 
 from database when entering new map. it will use saved event instead

 ■ Features         ╒══════════════════════════╛
 - save map events
 - not reload event at map enter but use saved event
 - option to reset event page prior entering the map

  ■ Changelog       ╒══════════════════════════╛
 v1.0 2015.10.25           Initial Release
 v1.1 2015.10.28     - minor change in unerase method
 v1.2 2015.10.31     - add notetags for event you want the page to "reset" upon reentering the map...
                       give comment 
                       <reinit_event>
                       so the event page will be reseted to prior activating the page when transfering to map.
                       if you create door manually without move route > this event > Through ON... 
                       or with through on but also with through OFF... you need to add above comment tag.
                       if you use auto door... see below:

                     - add auto door event detection... (in editor right click quick event creation > door)
                     since it's tedious work to edit ALL your auto door... 
                     i detect it like this:
                     if there's Event Command > Move Route > This Event > Through ON
                     AND
                     if there's NO Event Command > Move Route > This Event > Through OFF

                     i assume it's auto door event...
                     
                     - although it's "RARE"... is there a scenario that event like above is NOT an autodoor event?
                     if yes... don't worry... you could add comment at the "RARE EVENT" page:
                     <not_auto_door>
                     and it won't reset the page.
 v1.3 2015.11.01     - fix crash when no event page met condition...
 v1.4 2015.11.02     - new method to delete saved event so it will reload the map next time entering the map
                       Plugin parameter format change. so it's okay to rename the .js files.
 v1.5 2015.12.02     - removed plugin parameter auto save. because of save file for browser limitation 
                     is around 5.000 event...(5mb. 1b = 1event average) you need to pick which map you want to 
                     auto save by giving map notetags <auto_save_event> 
                     it will tag the map event to save it's event. also... there will be update in 
                     EST - CLONE EVENT to NOT save the map event if the map not tagged with that notetags. 
                     so we can clone / add event in every map. but if we want it to have permanent changes... 
                     the notetags required in the map note.
 v1.6 2015.12.??     - ability to tag event note / tag event page comment with <temporary_event> 
                     to make it deleted when reenter map. 

 ■ Plugin Download ╒══════════════════════════╛
 https://www.dropbox.com/s/1qmvuyijn6ofpp7/EST_Save_Map_Event.js?dl=0
  
 ■ How to use       ╒══════════════════════════╛
 1) Saving map events to memory
 Plugin Command: 
    save_cur_map
   or
 Script Call:
    $gameMap.save_cur_map()
 (also in case you want to use this from other plugin)

 IF you have event which change it's graphic (example Door)
 and you need to revert the changes back when doing transfer...
 add this COMMENT in the door event page

 <reinit_event>

 warning it won't reinit self switch!!!. this just change the page to state prior
 activating the page...

 if you use AUTO DOOR (in editor > right click > quick event creation > Door)
 i include some automatic detection. and you don't have to add any comment tags.
 the detection work like this:

 if there's Event Command > Move Route > This Event > Through ON
 AND
 if there's NO Event Command > Move Route > This Event > Through OFF
 i assume it's auto door event...
                     
 although it's "RARE"... is there a scenario that event like above is NOT an autodoor event?
 if yes... don't worry... you could add comment at the "RARE EVENT" page:

 <not_auto_door>

 and it won't reset the page. 
 
 2) Deleting map events from memory (it will reload map event from editor next time reenter map)
 self switch is left as it is though... so if any changes on self switch will be remain there.
 if you don't want this behavior use number 3) method below

 Plugin Command: 
    delete_cur_map
   or
 Script Call:
    $gameMap.delete_cur_map()

 3) RESETING map events to editor (all self switch also will be set to false)  
 Plugin Command: 
    reset_cur_map
   or
 Script Call:
    $gameMap.reset_cur_map()

 4) AUTO SAVING map event... WARNING... don't save too many map with many events if you make
 browser game. since there's 5mb size limitation (around 5000 event).
 so if you want to autosave in a certain map. add this in map note

 <auto_save_event>

 this note will also automatically save map events when there's a change using 
 EST Clone Transform Delete Event.
  
 5) to make event temporary. (will be deleted at entering the map. useful for spawned event you
 want to not stay the next time you reenter the map). add this in either event note or event page comment

 <temporary_event>

 ■ Dependencies     ╒══════════════════════════╛
 none

 ■ Compatibility    ╒══════════════════════════╛
 I'm new in JS... and MV is new engine... so i cannot say for sure. 
 but it should be compatible with most things. this even compatible with 
 Hudell - Custom Event

 ■ Parameters       ╒══════════════════════════╛
 None
 
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
 This is part of the EST - DECOR AND BUILD SERIES.

 this plugin is the first step to slowly convert my EST - BUILD AND DECOR 
 series from ACE to MV. the plugin needed so when the decoration placed... 
 it won't be gone when changing map and back...

*/

var EST = EST || {};
EST.Save_Map_Event = EST.Save_Map_Event || {};

EST.Save_Map_Event.param = $plugins.filter(function(p) { 
  return p.description.contains('<EST_SAVE_MAP_EVENT>'); })[0].parameters;
EST.Save_Map_Event.autosave = EST.Save_Map_Event.param['Auto Save'];

// this will create variable in game system to store the resaved map events
EST.Save_Map_Event.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	EST.Save_Map_Event.Game_System_initialize.call(this);
	this._est_resaved_map = {};
};


// method to unerase event which erased earlier so it will be back when re-entering the map
// if you want permanent erase... do the self switch approach
Game_Event.prototype.unerase = function() {
	if(this._erased == false) return;
    this._erased = false;
    this.refresh();
};

// alias Game_Map.prototype.setupEvents method
// modifying Game_Map.prototype.setupEvents so when there's a saved event. it will use it.
// else will use old method
EST.Save_Map_Event.Game_Map_SetupEvents = Game_Map.prototype.setupEvents;	
Game_Map.prototype.setupEvents = function() {
  if($gameSystem._est_resaved_map[this._mapId]){
   for (ev of $gameSystem._est_resaved_map[this._mapId])
   {
      if(!ev) continue;
      if(ev.temporary_event()) $gameSystem._est_resaved_map[this._mapId][ev._eventId] = null;
   }
   this._events = $gameSystem._est_resaved_map[this._mapId];
	} else {
	EST.Save_Map_Event.Game_Map_SetupEvents.call(this);
	}  
  var auto_save_check = this.mapEventAutoSave();
  if(auto_save_check) this.save_cur_map();
};

Game_Map.prototype.mapEventAutoSave = function() {
  if($dataMap.note.match(/<auto_save_event>?/im)) return true;
  return false;
};

// alias method to unerase and reinit event page
EST.Save_Map_Event.Game_Player_performTransfer = Game_Player.prototype.performTransfer
Game_Player.prototype.performTransfer = function() {
  EST.Save_Map_Event.Game_Player_performTransfer.call(this);
  for (ev of events = $gameMap.events())
  {
    ev.unerase();
    if(ev.need_reinit_event()) ev.reinit_event();
    if(ev.this_event_auto_door() && !ev.not_auto_door()) ev.reinit_event();
  }
};

// new method to reinit event page
Game_Event.prototype.reinit_event = function() {
  this.initialize(this._mapId, this._eventId);
};

// new method to check comment tag <reinit_event>
Game_Event.prototype.temporary_event = function() {
  if(this.event().note.match(/<temporary_event>/im)) return true;
  var comment = "";
  if(!this.page()) return false;
  var pagelist = this.page().list;
  for (var cmd of pagelist)
  {
    if(cmd.code == 108)   comment += cmd.parameters[0] + "\n";
    if(cmd.code == 408)   comment += cmd.parameters[0] + "\n";
  }
  if(comment.match(/<temporary_event>/im)) return true;
  return false;
};


// new method to check comment tag <reinit_event>
Game_Event.prototype.need_reinit_event = function() {
  var comment = "";
  if(!this.page()) return false;
  var pagelist = this.page().list;
  for (var cmd of pagelist)
  {
    if(cmd.code == 108)   comment += cmd.parameters[0] + "\n";
    if(cmd.code == 408)   comment += cmd.parameters[0] + "\n";
  }
  if(comment.match(/<reinit_event>/im)) return true;
  return false;
};

// new method to check comment tag <not_auto_door>
Game_Event.prototype.not_auto_door = function() {
  var comment = "";
  if(!this.page()) return false;
  var pagelist = this.page().list;
  for (var cmd of pagelist)
  {
    if(cmd.code == 108)   comment += cmd.parameters[0] + "\n";
    if(cmd.code == 408)   comment += cmd.parameters[0] + "\n";
  }
  if(comment.match(/<not_auto_door>/im)) return true;
  return false;
};

// new method to check if the event auto door or not
Game_Event.prototype.this_event_auto_door = function() {
  var check_TON = false;
  var check_TOFF = false;
  var check_event = false;
  if(!this.page()) return false;
  var pagelist = this.page().list;
  for (var cmd of pagelist)
  {
    if(cmd.code == 205 && cmd.parameters[0] == 0) check_event = true;
    if(cmd.code == 205 && cmd.parameters[0] != 0) check_event = false;
    if(cmd.code == 505 && cmd.parameters[0].code == 37 && check_event)   check_TON = true;
    if(cmd.code == 505 && cmd.parameters[0].code == 38 && check_event)   check_TOFF = true;
  }
  return check_TON && !check_TOFF;
};

// new method to save current map
Game_Map.prototype.save_cur_map = function() {
	$gameSystem._est_resaved_map[this._mapId] = this._events;
};

// this will delete current map saved event. so it will be loaded
// from database next time we enter map... selfswitch is left though
Game_Map.prototype.delete_cur_map = function (){
  if(!$gameSystem._est_resaved_map[this._mapId]) return;  
  $gameSystem._est_resaved_map[this._mapId] = null;
};

// this will unflip all event self switch to false.
// basically make it back to editor state.
Game_Map.prototype.reset_cur_map = function (){
  this.delete_cur_map();
  for (ev of this.events()) {
      $gameSelfSwitches.setValue([this._mapId, ev._eventId, 'A'], false);
      $gameSelfSwitches.setValue([this._mapId, ev._eventId, 'B'], false);
      $gameSelfSwitches.setValue([this._mapId, ev._eventId, 'C'], false);
      $gameSelfSwitches.setValue([this._mapId, ev._eventId, 'D'], false);      
      ev.reinit_event();
  }
};

// alias interpreter plugin command
EST.Save_Map_Event.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;

// add my plugin command
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    EST.Save_Map_Event.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command.toUpperCase() === 'SAVE_CUR_MAP') $gameMap.save_cur_map();
    if (command.toUpperCase() === 'DELETE_CUR_MAP') $gameMap.delete_cur_map();
    if (command.toUpperCase() === 'RESET_CUR_MAP') $gameMap.reset_cur_map();
};