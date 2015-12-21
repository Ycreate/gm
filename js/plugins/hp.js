

1.//=============================================================================


2.// EnemyBars.js


3.//=============================================================================


4.//v1.1


5./*:


6. * @plugindesc Makes enemy hp bar appear in battle. 


7. * @author Jeremy Cannady


8. *


9. * @param High HP Color


10. * @desc Insert the color code.


11. * @default #009900


12. *


13. * @param Medium HP Color


14. * @desc Insert the color code.


15. * @default #ffcc00


16. *


17. * @param Low HP Color


18. * @desc Insert the color code.


19. * @default #ff6600


20. *


21. * @param Critical HP Color


22. * @desc Insert the color code.


23. * @default #ff3300


24. *


25. * @help


26. * Put <hpBar> in the enemy note tag to activate the hp bar for that enemy


27. during battle.


28. *Put <hpBarSelectionOnly> to actiavte the hp bar only during selection.


29. *Put<hpBarTurnASelection> to actiavet he bar during selection and attack.


30. *Put <hpBarTurnOnly> to only show the bar during the attack phase.


31. *PLEASE PUT ONLY ONE NOTETAG.


32. * For the paramters use any html hex color codes.


33. * A few color codes are:


34. Green: #009900


35. Yellow: #ffcc00


36. Orange: #ff6600


37. Red: #ff3300


38. White: #ffffff


39. Blue: #33ffff


40. Purple: #660099


41. *


42.*/


43. 


44.(function(){


45.//=============================================================================


46.// Create some variables and define the colors


47.//=============================================================================


48.Game_Enemy.prototype.battlerHeight = null;


49.Game_Enemy.prototype.battlerWidth = null;


50.var parameters = PluginManager.parameters('EnemyBars');


51.var high = parameters['High HP Color'] || '#009900';


52.var medium = parameters['Medium HP Color'] || '#ffcc00';


53.var low = parameters['Low HP Color'] || '#ff6600';


54.var critical = parameters['Critical HP Color'] || '#ff3300';


55. 


56.//=============================================================================


57.// Create the enemy hp window that displays all the hp bars


58.//=============================================================================


59.function Enemy_Bars() { 


60.        this.initialize.apply(this, arguments);


61.};


62. 


63.Enemy_Bars.prototype = Object.create(Window_Base.prototype);


64.Enemy_Bars.prototype.constructor = Enemy_Bars;


65. 


66.Enemy_Bars.prototype.initialize = function(x, y, width, height) {


67.    Window_Base.prototype.initialize.call(this, x, y, width, height);


68.    this.deactivate();


69.        //Make the window transparent


70.        this.opacity = 0;


71.};


72. 


73.Enemy_Bars.prototype.update = function() {


74.    Window_Base.prototype.update.call(this);


75.        //Clear the window and re-draw the hp bars


76.    this.contents.clear();


77.    this.drawBar();


78.};


79. 


80.//FUNCTION: return the color the hp bar should be based on current hp


81.Enemy_Bars.prototype.guageColor = function(rate) {


82.        if(rate > 0.75){


83.                return high;//High hp color


84.        }else if(rate > 0.50){


85.                return medium;//Medium hp color


86.        }else if(rate > 0.25){


87.                return low;//Low hp color


88.        }else{


89.                return critical;//Critical hp color


90.        };


91.};


92. 


93.//FUNCTION: draw the hp guage


94.Enemy_Bars.prototype.drawBar = function() {


95.        //Go through the enemies and draw the bars


96.        for(var i = 0; i < $gameTroop._enemies.length; i++){


97.                var enemyId = $gameTroop._enemies[i]._enemyId;


98.                var selected = $gameTroop._enemies[i]._selected;


99.                if(BattleManager._phase === "action" || BattleManager._phase === "turn"){


100.                        var turn = true


101.                }else{ 


102.                        var turn = false


103.                        console.log(BattleManager._phase)


104.                        };


105. 


106.                var enabled = false;


107.                var meta = new Array(4);


108.                meta[0] = $dataEnemies[enemyId].meta.hpBar


109.                meta[1] = $dataEnemies[enemyId].meta.hpBarSelectionOnly


110.                meta[2] = $dataEnemies[enemyId].meta.hpBarTurnASelection


111.                meta[3] = $dataEnemies[enemyId].meta.hpBarTurnOnly


112. 


113.                if(meta[0]){


114.                        enabled = true;


115.                }else if(meta[1] && selected){


116.                        enabled = true;


117.                }else if(meta[2] && (selected || turn)){


118.                        enabled = true;


119.                }else if(meta[3] && turn){


120.                        enabled = true;


121.                }else{


122.                        enabled = false;


123.                }


124.                


125.                //Current hp    


126.                var currentHp = $gameTroop._enemies[i]._hp;


127.                //If the enemy hp is not zero then draw the hp bar


128.                if(currentHp > 0 && enabled){


129.                        //Max hp defined from the enemies parameters.


130.                        var maxHp = $dataEnemies[enemyId].params[0];


131.                        //Rate is the currnet hp compared to the max hp


132.                        var rate = currentHp/maxHp;


133.                        //Width of the bar


134.                        var width = $dataEnemies[enemyId].battlerWidth;


135.                        var xOffset = $dataEnemies[enemyId].battlerWidth / 2 + 16;


136.                        var x = $gameTroop._enemies[i]._screenX - xOffset;


137.                        var y = $gameTroop._enemies[i]._screenY - 32;


138.                        //Draw the guage


139.                        this.drawGauge(x, y, width, rate , this.guageColor(rate), this.guageColor(rate));


140.                };


141.        };


142. };


143. 


144.//=============================================================================


145.// Alias the Scene_Battle createAllWindows to add the hp window


146.//=============================================================================


147.var battleWindows = Scene_Battle.prototype.createAllWindows;


148.Scene_Battle.prototype.createAllWindows = function() {


149.        battleWindows.call(this)


150.        //Add the hp window to the battle scene


151.        this.Bar = new Enemy_Bars(0, 0, Graphics.width, Graphics.height);


152.        this.addChild(this.Bar);


153.};


154. 


155.//=============================================================================


156.// Alias the Sprite_Enemy.updateFrame to return information back to the hp window.


157.//=============================================================================


158.var copyOfSprite_EnemyupdateFrame = Sprite_Enemy.prototype.updateFrame;


159.Sprite_Enemy.prototype.updateFrame = function() {


160.    Sprite_Battler.prototype.updateFrame.call(this);


161.        copyOfSprite_EnemyupdateFrame.call(this);


162.        //As we are updating the enemy sprites return the bitmaps height and width


163.        $dataEnemies[this._enemy._enemyId].battlerHeight = this.bitmap.height;


164.        $dataEnemies[this._enemy._enemyId].battlerWidth = this.bitmap.width;


165.};


166.})();

