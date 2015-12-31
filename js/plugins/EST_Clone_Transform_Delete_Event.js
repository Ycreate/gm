/*:
@plugindesc This plugin can add new event / transform existing event based on other event. and finally can delete the event.
<EST_CLONE_TRANSFORM_DELETE_EVENT>
@author Estriole
@help
 ■ Information      ╒══════════════════════════╛
 EST - Clone Transform Delete Event 
 Version: 1.9
 By Estriole
 File name: EST_Clone_Transform_Delete_Event.js

 ■ Introduction     ╒══════════════════════════╛
 Want to Add New Event based on template event in current / other map
 or Transform Existing Event in current map Based on template event in current / other Map.
 then maybe you want to delete existing Event in current map? Now it's all
 possible with this Plugin.

 This plugin is second part of my Build and Decor Script conversion from ACE - MV

 ■ Features         ╒══════════════════════════╛
 - Add New Event in current map Based on other event in current/other Map.
 - Transform Existing Event in current map Based on other event in current / other Map.
 - Delete Existing Event in CURRENT Map.

 ■ Changelog       ╒══════════════════════════╛
 v1.0 2015.10.29           Initial Release
 v1.1 2015.11.02           Patch for delete_cur_map from EST_Save_Map_Event plugin
                    to reset selfswitches for event that changed. also method to reinit all map event.
 v1.2 2015.11.09           fixed bugs when having event with higher index than max index of map in editor
                    removed imported and use other method to recognized this script installed or not.
                    some callibration to make it flow with EST BUILD AND DECOR EX plugins.
 v1.3 2015.11.12           fix minor bug which 'sometimes' execute event command after tranforming event.
                    i change it so after event REPLACED using 'transform'. 
                    all event command after that will be stopped.
 v1.4 2015.11.27           fixed problem when running game online. and having lots of parallel process
                    that spawn / transform event. then transfer map. it can throw $dataMap null error. 
                    this caused by loading map data asynchronously...
                    the 'turnaround' fix is given by hudell. after i pm him for advice. 
                    so this plugin now have extra credits you have to add if you use it. 
 v1.5 2015.12.02    now if the map didn't tagged with <auto_save_event>. what you clone / transform
                    will not auto saved. and you need to run save_cur_map plugin command manually.                    
 v1.6 2015.12.06    > add method to delete all event based on their source map and id.
                    it will delete all event that cloned from that map and id across all SAVED map
                    > add method to delete event based on their xy 
                    (and can delete across map if you save that map)
 v1.7 2015.12.15    > fix incompatibility with EST - EVENT SIZE AND TRIGGER which didn't remove size
                    when event deleted.
 v1.8 2015.12.18    > fix error if no event 1 in map when adding new event...
 v1.9 2015.12.20    > fix error when somehow $dataMap.events have null value as last record...

 ■ Plugin Download ╒══════════════════════════╛
  https://www.dropbox.com/s/euio02n6fyxr2l7/EST_Clone_Transform_Delete_Event.js?dl=0
  
 ■ How to use       ╒══════════════════════════╛
 1) Add New Event
 Plugin Command: 
  add_event source_map_id source_event_id x y
    example:
    add_event 8 2 3 7
    will add new event cloned from Map 8 EventId 2
    and will be placed in x = 3 and y = 7.

 Script Call:
  $gameMap.add_event(source_map_id, source_event_id ,x , y);
    example:
    $gameMap.add_event(8,2,3,7);
    will add new event cloned from Map 8 EventId 2
    and will be placed in x = 3 and y = 7.

 2) Transform Existing Event
 Plugin Command: 
  transform_event target_event_id source_map_id source_event_id
    example:
    transform_event 24 8 1
    will transform event 24 in current map with event
    cloned from Map 8 EventId 1
    x and y will still use old event value.

  transform_this_event source_map_id source_event_id
    example:
    transform_this_event 8 1
    will transform event that called it with event
    cloned from Map 8 EventId 1
    x and y will still use old event value.

 Script Call:
  $gameMap.transform_event(target_event_id, source_map_id, source_event_id);
    example:
    $gameMap.transform_event(24,8,1);
    will transform event 24 in current map with event
    cloned from Map 8 EventId 1
    x and y will still use old event value.

    some tips... if called from script call event command...
    $gameMap.transform_event(this._eventId,8,1);
    will transform event that calling it to event
    cloned from Map 8 EventId 1
    x and y will still use old event value.

 3) Delete Existing Event
 Plugin Command: 
  delete_event target_event_id
    example:
    delete_event 24
    will delete event 24 in current map

  delete_this_event
    will delete event that called it


 Script Call:
  $gameMap.delete_event(target_event_id);
    example:
    $gameMap.delete_event(24);
    will delete event 24 in current map

    some tips... if called from script call event command...
    $gameMap.delete_event(this._eventId);
    will delete event that CALLED it.

 4) if you want to delete all clone based on sourcemapid and source event id
 ACROSS ALL SAVED MAP...
 plugin command:
 DELETE_ALL_EVENT_BY_SOURCE srcMapId srcEventId
    example:
    DELETE_ALL_EVENT_BY_SOURCE 8 14
    will delete event that cloned from map 8 id 14 across ALL SAVED map.

 script call:
 $gameMap.delete_all_event_bysource(srcMapId,srcEventId);
    example:
    $gameMap.delete_all_event_bysource(8,14);
    will delete event that cloned from map 8 id 14 across ALL SAVED map.

 5) if you want to delete event based on xy location across ANY SAVED map
  plugin command:
  DELETE_EVENT_BY_XY mapId x y
    example:
    DELETE_EVENT_BY_XY 6 7 8
    will delete event in map 6, is coordinate x = 7, coordinate y = 8
    MAP 6 MUST BE ALREADY SAVED before you call this. or it will do nothing.

  script call:
  $gameMap.delete_event_byxy(mapId, ev_x, ev_y);
    example:
    $gameMap.delete_event_byxy(6, 7, 8);
    will delete event in map 6, is coordinate x = 7, coordinate y = 8
    MAP 6 MUST BE ALREADY SAVED before you call this. or it will do nothing.
  
 x) FOR OTHER SCRIPTER that want to make compatibility patch for this plugin.
 check EST.Clone_Transform_Delete_Event exist or not.
 ex: 

 if(typeof EST !== 'undefined' && EST.Clone_Transform_Delete_Event) {
  place your code here.
 }
  
 ■ Dependencies     ╒══════════════════════════╛
 EST_Save_Map_Event.js plugin MUST be INSTALLED for this plugin to work.

 ■ Compatibility    ╒══════════════════════════╛
 I'm new in JS... and MV is new engine... so i cannot say for sure. 
 but it should be compatible with most things. this even compatible with 
 Hudell - Custom Event. so you can use both script without conflicting.

 ■ Parameters       ╒══════════════════════════╛
 this plugin did not have any parameter to set in plugin manager

 ■ License          ╒══════════════════════════╛
 Free to use in all project (except the one containing pornography)
 as long as i credited (ESTRIOLE). 

 ■ Extra Credit          ╒══════════════════════════╛
 - Hudell - for workaround to fix $dataMap.null problem with browser online.

 ■ Support          ╒══════════════════════════╛
 While I'm flattered and I'm glad that people have been sharing and 
 asking support for scripts in other RPG Maker communities, I would 
 like to ask that you please avoid posting my scripts outside of where 
 I frequent because it would make finding support and fixing bugs 
 difficult for both of you and me.
   
 If you're ever looking for support, I can be reached at the following:
 [ http://www.rpgmakervxace.net/  ]
 [ http://forums.rpgmakerweb.com/ ]
 pm me : estriole

 ■ Author's Notes   ╒══════════════════════════╛
 This is part of the EST - DECOR AND BUILD SERIES.

 this plugin is the second step to slowly convert my EST - BUILD AND DECOR 
 series from ACE to MV. the plugin needed to add / transform / delete event
*/

var EST = EST || {};
EST.Clone_Transform_Delete_Event = EST.Clone_Transform_Delete_Event || {};

// warning to requires EST_Save_Map_Event
EST.Clone_Transform_Delete_Event.scene_boot_init = Scene_Boot.prototype.initialize
Scene_Boot.prototype.initialize = function() {
  EST.Clone_Transform_Delete_Event.scene_boot_init.call(this);
    if (EST && EST.Save_Map_Event === undefined) {
    alert_msg = "EST_Clone_Event.js plugin requires EST_Save_Map_Event.js plugin INSTALLED !!" ;
    alert_msg += "\nIf you don't install it... bugs can happen";
    window.alert(alert_msg);
    }
};

// Game Map new method to get the next event id
// smart search which will also look for blank event id in between 
// ex: event [1,2,3,4,5] -> it will give 6
// ex: event [1,3,4,5,6] -> it will give 2 (event id missing in between)
Game_Map.prototype.next_ev_id = function() {
    var idlist = [];
    var between_id = [];
    var next_id = 0;
    for (ev of events = this.events()) idlist.push(ev._eventId);
    var max_id = Math.max.apply(null, idlist);
    for (var i = 1; i <= max_id; i++) if (!(idlist.indexOf(i) >= 0)) { between_id.push(i) };
    if (JSON.stringify(between_id) == JSON.stringify([]))    next_id = max_id + 1;
    if (JSON.stringify(between_id) != JSON.stringify([]))    next_id = between_id[0];
    return next_id;
};

// new Game_Map method to grab event data from other map
Game_Map.prototype.get_event_data_from = function(mapId, eventId, callback) {
  var variableName = '$Map%1'.format(mapId.padZero(3));
  var filename = 'data/Map%1.json'.format(mapId.padZero(3));
  var onError = undefined
  var onLoad = function(xhr, filePath, name) {
    if (xhr.status < 400) {
      window[name] = JSON.parse(xhr.responseText);
      DataManager.onLoad(window[name]);

        var variableName = '$Map%1'.format(mapId.padZero(3));
        if (window[variableName] === undefined || window[variableName] === null) return;
         var event = window[variableName].events[eventId];
        if (event === undefined) return;
         var eventData = JsonEx.makeDeepCopy(event);
        callback.call(this, eventData);
    }
  };

  if (window[variableName] === undefined || window[variableName] === null) {
      var xhr = new XMLHttpRequest();
      var name = '$' + filename.replace(/^.*(\\|\/|\:)/, '').replace(/\..*/, '');
      xhr.open('GET', filename);
      xhr.overrideMimeType('application/json');

    if(onLoad === undefined){
      onLoad = function(xhr, filename, name) {
        if (xhr.status < 400) {
          window[name] = JSON.parse(xhr.responseText);
          DataManager.onLoad(window[name]);
        }
      };
    }
    if(onError === undefined) {
      onError = function() {
        DataManager._errorUrl = DataManager._errorUrl || filename;
      };
    }
    xhr.onload = function() {
      onLoad.call(this, xhr, filename, name);
    };
    xhr.onerror = onError;
    window[name] = null;
    xhr.send();

   } else {
    var variableName = '$Map%1'.format(mapId.padZero(3));
     if (window[variableName] === undefined || window[variableName] === null) return;
     var event = window[variableName].events[eventId];
     if (event === undefined) return;
     var eventData = JsonEx.makeDeepCopy(event);
     callback.call(this, eventData);
   }  
};

//alias Game_Event.event to use event data if exist
EST.Clone_Transform_Delete_Event.Game_Event_event = Game_Event.prototype.event;
Game_Event.prototype.event = function() {
   if (this._eventData) return this._eventData;
   return EST.Clone_Transform_Delete_Event.Game_Event_event.call(this);
};

EST.Clone_Transform_Delete_Event.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    if ($dataMap !== null) {
      this._eventData = this._eventData || $dataMap.events[eventId] || 
                              EST.Clone_Transform_Delete_Event.grabFirstNotNull($dataMap.events);
      this._isNewEvent = false;
      EST.Clone_Transform_Delete_Event.Game_Event_initialize.call(this, mapId, eventId);
    }
};

EST.Clone_Transform_Delete_Event.grabFirstNotNull = function(arr){
  for (el of arr) if (el) return el;
};

// replace _eventData in the event and reinit event based on new data
Game_Event.prototype.replace_data = function(new_data) {
    this._eventData = new_data;
    this.initialize(this._mapId, this._eventId);
    this._isNewEvent = true;
};

// new method to add event from same map / other map
Game_Map.prototype.add_event = function(mapid, eventid, x, y) {
    var next_id = this.next_ev_id();
    var this_map_id = this._mapId;
    this.get_event_data_from(mapid,eventid,function(eventData){
      eventData.x = x;
      eventData.y = y;
      eventData._eventId = next_id;
      var new_event = new Game_Event(this_map_id, next_id);
      new_event.replace_data(eventData);
      new_event._sourceId = [mapid , eventid];
      new_event._eventId = next_id;
      new_event._isNewEvent = true;
      $gameMap._events[next_id] = new_event;

      if (SceneManager._scene instanceof Scene_Map) {
      var sprite = new Sprite_Character(new_event);
      SceneManager._scene._spriteset._characterSprites.push(sprite);
      SceneManager._scene._spriteset._tilemap.addChild(sprite);
      }
    });
    if (!(EST && EST.Save_Map_Event === undefined)) 
    {
      if(this.mapEventAutoSave()) $gameMap.save_cur_map()
    }
  return next_id;
};

// new method to delete event and event sprite
Game_Map.prototype.delete_event = function (eventid){
  if ($gameMap._events[eventid]) var ev = $gameMap._events[eventid];
  if (ev === undefined) return;
  for (sprite of SceneManager._scene._spriteset._tilemap.children)    
  {
    if (sprite._character == ev) SceneManager._scene._spriteset._tilemap.removeChild(sprite);
  }
  if (EST && EST.Event_Size) $gameMap.open_passability($gameMap._mapId, eventid);
  delete $gameMap._events[eventid];
  $gameSelfSwitches.setValue([this._mapId, eventid, 'A'], false);
  $gameSelfSwitches.setValue([this._mapId, eventid, 'B'], false);
  $gameSelfSwitches.setValue([this._mapId, eventid, 'C'], false);
  $gameSelfSwitches.setValue([this._mapId, eventid, 'D'], false);
    if (!(EST && EST.Save_Map_Event === undefined)) 
    {
      if(this.mapEventAutoSave()) $gameMap.save_cur_map()
    }
};

Game_Map.prototype.delete_othermap_event = function (mapId, eventid){
  if (!EST.Save_Map_Event) return;
  if (!$gameSystem._est_resaved_map[mapId]) return;
  if ($gameSystem._est_resaved_map[mapId][eventid])
    var ev = $gameSystem._est_resaved_map[mapId][eventid];
  if (typeof ev === 'undefined') return;
  for (sprite of SceneManager._scene._spriteset._tilemap.children)    
  {
    if (sprite._character == ev) SceneManager._scene._spriteset._tilemap.removeChild(sprite);
  }
  if (EST && EST.Event_Size) $gameMap.open_passability(mapId, eventid);
  $gameSystem._est_resaved_map[mapId][eventid] = null;
  $gameSelfSwitches.setValue([mapId, eventid, 'A'], false);
  $gameSelfSwitches.setValue([mapId, eventid, 'B'], false);
  $gameSelfSwitches.setValue([mapId, eventid, 'C'], false);
  $gameSelfSwitches.setValue([mapId, eventid, 'D'], false);
};

Game_Map.prototype.delete_all_event_bysource = function (srcMapId, srcEventId){
  var events = null;
  for(mapId in $gameSystem._est_resaved_map)
  {
    events = $gameSystem._est_resaved_map[mapId]
    for (ev of events)
    {
     if(!ev) continue;
     if(!ev._sourceId) continue;
     if(ev._sourceId[0] == srcMapId && ev._sourceId[1] == srcEventId)
       this.delete_othermap_event(mapId, ev._eventId);
    }
  }
};

Game_Map.prototype.delete_event_byxy = function (mapId, x, y){
  var events = null;
  if (mapId == this._mapId)
  {
    events = $gameMap._events;
    for (ev of events)
    {
     if(!ev) continue;
     if(ev.x == x && ev.y == y)
       this.delete_event(ev._eventId);
    }

  } else {
    for(mapId in $gameSystem._est_resaved_map)
    {
      events = $gameSystem._est_resaved_map[mapId];
      for (ev of events)
      {
       if(!ev) continue;
       if(ev.x == x && ev.y == y)
         this.delete_othermap_event(mapId, ev._eventId);
      }
    }
  }
};
// new method to transform CURRENT map event to other / same map event.
Game_Map.prototype.transform_event = function (eventid, src_map, src_evid){
  if ($gameMap._events[eventid]) var target_event = $gameMap._events[eventid];
  if (target_event === undefined) return;
  var this_map_id = this._mapId;
  var event_replaced = false;
  this.get_event_data_from(src_map, src_evid, function(eventData){
    eventData.x = target_event.x;
    eventData.y = target_event.y;
    eventData.id = eventid;
    target_event.replace_data(eventData);
    target_event._sourceId = [src_map , src_evid];
    $gameSelfSwitches.setValue([this_map_id, eventid, 'A'], false);
    $gameSelfSwitches.setValue([this_map_id, eventid, 'B'], false);
    $gameSelfSwitches.setValue([this_map_id, eventid, 'C'], false);
    $gameSelfSwitches.setValue([this_map_id, eventid, 'D'], false);
    event_replaced = true;
  });
  if (event_replaced) this._interpreter.clear();
    if (!(EST && EST.Save_Map_Event === undefined)) 
    {
      if(this.mapEventAutoSave()) $gameMap.save_cur_map()
    }
};

// alias method to delete saved map from the memory
EST.Clone_Transform_Delete_Event.Game_Map_delete_cur_map = Game_Map.prototype.delete_cur_map;
Game_Map.prototype.delete_cur_map = function (){
  if($gameSystem._est_resaved_map[this._mapId]){
    for (ev of $gameSystem._est_resaved_map[this._mapId]) {
     if (ev && ev._isNewEvent){
      $gameSelfSwitches.setValue([this._mapId, ev._eventId, 'A'], false);
      $gameSelfSwitches.setValue([this._mapId, ev._eventId, 'B'], false);
      $gameSelfSwitches.setValue([this._mapId, ev._eventId, 'C'], false);
      $gameSelfSwitches.setValue([this._mapId, ev._eventId, 'D'], false);      
      $gameMap.delete_event(ev._eventId);
     }
    }
  }
  EST.Clone_Transform_Delete_Event.Game_Map_delete_cur_map.call(this);
};

//alias method to create plugin command
EST.Clone_Transform_Delete_Event.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    EST.Clone_Transform_Delete_Event.Game_Interpreter_pluginCommand.call(this, command, args);
     if (command.toUpperCase() === 'ADD_EVENT') 
      {
       var alert_msg = "wrong plugin command\ncorrect format> add_event source_map_id source_event_id x y"
       if (args.length != 4) return window.alert(alert_msg);
       var source_map_id = Number(args[0]);
       var source_event_id = Number(args[1]);
       var ev_x = Number(args[2]);
       var ev_y = Number(args[3]);
       $gameMap.add_event(source_map_id,source_event_id,ev_x,ev_y);
      };
     if (command.toUpperCase() === 'TRANSFORM_EVENT')
      {
       var alert_msg = "wrong plugin command\ncorrect format> transform_event target_event_id source_map_id source_event_id"
       if (args.length != 3) return window.alert(alert_msg);
       var target_event_id = Number(args[0]);
       var source_map_id = Number(args[1]);
       var source_event_id = Number(args[2]);
       $gameMap.transform_event(target_event_id, source_map_id, source_event_id);
      };
     if (command.toUpperCase() === 'TRANSFORM_THIS_EVENT')
      {
       var alert_msg = "wrong plugin command\ncorrect format> transform_this_event source_map_id source_event_id"
       if (args.length != 2) return window.alert(alert_msg);
       var target_event_id = this._eventId;
       var source_map_id = Number(args[0]);
       var source_event_id = Number(args[1]);
       $gameMap.transform_event(target_event_id, source_map_id, source_event_id);
      };
     if (command.toUpperCase() === 'DELETE_EVENT')
      {
       var alert_msg = "wrong plugin command\ncorrect format> delete_event target_event_id"
       if (args.length != 1) return window.alert(alert_msg);
       var target_event_id = Number(args[0]);
       $gameMap.delete_event(target_event_id);
      };
     if (command.toUpperCase() === 'DELETE_THIS_EVENT')
      {
       var target_event_id = this._eventId;
       $gameMap.delete_event(target_event_id);
      };
     if (command.toUpperCase() === 'DELETE_ALL_EVENT_BY_SOURCE')
      {
       var alert_msg = "wrong plugin command\ncorrect format> DELETE_ALL_EVENT_BY_SOURCE srcMapId srcEventId"
       if (args.length != 2) return window.alert(alert_msg);        
       var srcMapId = Number(args[0]);
       var srcEventId = Number(args[1]);
       $gameMap.delete_all_event_bysource(srcMapId,srcEventId);
      };
     if (command.toUpperCase() === 'DELETE_EVENT_BY_XY')
      {
       var alert_msg = "wrong plugin command\ncorrect format> DELETE_EVENT_BY_XY mapId x y"
       if (args.length != 3) return window.alert(alert_msg);        
       var mapId = Number(args[0]);
       var ev_x = Number(args[1]);
       var ev_y = Number(args[2]);
       $gameMap.delete_event_byxy(mapId, ev_x, ev_y);
      };
  };