//=============================================================================
// chunkof_Utility.js
//
// Copyright (c) chunkof
//=============================================================================

/*:
 * @plugindesc Utility methods.
 * @author chunkof
 */

/*:ja
 * @plugindesc ユーティリティ関数群。
 * @author chunkof
 */

if (typeof chunkofUt === "undefined") {
  chunkofUt = {};
}


(function() {
  //
  // @fn inRangeTime
  //
  // @param 'hh:mm'
  //
  // @usage
  //   chunkofUt.inRangeTime('11:00','20:59');
  //   
  //   return
  //      now 10:59 = false
  //      now 11:00 = true
  //      now 20:59 = true
  //      now 21:00 = false
  //
  chunkofUt.inRangeTime = function(min_time, max_time){
    // min
    var min_h = Number(min_time.substr(0,2));
    var min_m = Number(min_time.substr(3,2));
    var min_by_m = min_h*60 + min_m;

    // max
    var max_h = Number(max_time.substr(0,2));
    var max_m = Number(max_time.substr(3,2));
    var max_by_m = max_h*60 + max_m;

    // now
    var date_obj = new Date();
    var now_h  = date_obj.getHours();
    var now_m  = date_obj.getMinutes();
    var now_by_m = now_h*60 + now_m;
    
    // Judge
    if ((min_by_m<=now_by_m) && (now_by_m<=max_by_m)){
        return true;
    }
    return false;
  };

  //
  // @fn isDay
  //
  // @usage
  //  
  //   chunkofUt.inDay('Mon')
  //   chunkofUt.inDay('MON')
  //   chunkofUt.inDay('Monday')
  //   chunkofUt.inDay('月')
  //   chunkofUt.inDay('月曜')
  //
  chunkofUt.isDay = function(day){
    // make check param
    var param_en = day.substr(0,3).toUpperCase();
    var param_ja = day.substr(0,1);
    
    // today
    var date_obj = new Date();
    var today    = date_obj.getDay();
    
    // checker array
    var days_en = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    var days_ja = ['日',  '月',  '火',  '水',  '木',  '金',  '土'];
    
    // Check
    if (days_en[today] == param_en){
      return true;
    }
    if (days_ja[today] == param_ja){
      return true;
    }
    
    return false;
  };


})();

