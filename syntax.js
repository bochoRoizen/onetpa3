UI.AddColorPicker('Indicator color #1')
UI.AddColorPicker('Indicator color #2')
UI.AddColorPicker('Keys Color #1')
UI.AddColorPicker('Keys Color #2')
UI.AddColorPicker('Keys Alpha')
UI.AddCheckbox('Anti aim')

var clock = 0
var invert = 0

const aa = function(){
    if(!UI.GetValue('Script items', 'Anti aim')){
        AntiAim.SetOverride(0)
        return;
    }
    clock += 0.5
    if(clock > 1){
        clock = 0
        invert = 1
    } else{
        invert = 0
    }
    AntiAim.SetOverride(1)
    const velocity = Math.round(GetVelocity(Entity.GetLocalPlayer())).toString()
    if(UI.IsHotkeyActive('Anti-Aim', 'Extra', 'Slow walk')){
        AntiAim.SetFakeOffset(1)
        AntiAim.SetRealOffset(random(-33, 33))
        AntiAim.SetLBYOffset(-30)
    } else if(inAir()){
        AntiAim.SetFakeOffset(0) 
        AntiAim.SetRealOffset(random(-24, 4)) 
        AntiAim.SetLBYOffset(12)
    } else if(Entity.GetProp(Entity.GetLocalPlayer(), 'CBasePlayer', 'm_flDuckAmount') > 0.8 && !invert || UI.IsHotkeyActive('Anti-Aim', 'Extra', 'Fake duck') && !invert){
        AntiAim.SetFakeOffset(0)
        AntiAim.SetRealOffset(49)
        AntiAim.SetLBYOffset(25)
    } else if(Entity.GetProp(Entity.GetLocalPlayer(), 'CBasePlayer', 'm_flDuckAmount') > 0.8 && invert || UI.IsHotkeyActive('Anti-Aim', 'Extra', 'Fake duck') && invert){
        AntiAim.SetFakeOffset(0)
        AntiAim.SetRealOffset(-37)
        AntiAim.SetLBYOffset(25)
    } else if(velocity > 2){
        AntiAim.SetFakeOffset(0)
        AntiAim.SetRealOffset(random(-37, 35))
    } else if(velocity == 0){
        AntiAim.SetFakeOffset(0)
        AntiAim.SetRealOffset(random(-12, -35))
        AntiAim.SetLBYOffset(17)
    }
}

Cheat.RegisterCallback('CreateMove', 'aa')

random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const GetVelocity = function(ce){
    var velocity = Entity.GetProp(ce, 'CBasePlayer', 'm_vecVelocity[0]');
    return Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
}

outline = function(x, y, i, s, c, f){
    return Render.StringCustom(x + 1, y, i, s, [0, 0, 0, 255], f), 
           Render.StringCustom(x - 1, y, i, s, [0, 0, 0, 255], f), 
           Render.StringCustom(x ,y + 1, i, s, [0, 0, 0, 255], f), 
           Render.StringCustom(x, y - 1, i, s, [0, 0, 0, 255], f);
}

const indicators = function(){
    if(!Entity.IsAlive(Entity.GetLocalPlayer())){
        return;
    }
    const screen_size = Global.GetScreenSize();
    const font1 = Render.AddFont( 'Verdana', 7, 900)
    const font = Render.AddFont( 'Verdana', 6, 900)
    icolor1 = UI.GetColor('Script items' ,'Indicator color #1')
    icolor2 = UI.GetColor('Script items' ,'Indicator color #2')
    alpha1 = UI.GetColor('Script items' ,'Keys Alpha')
    kcolor1 = UI.GetColor('Script items' ,'Keys Color #1')
    kcolor2 = UI.GetColor('Script items' ,'Keys Color #2')
    outline(screen_size[0] / 2 - 24, screen_size[1] / 2 + 10, 0, 'predi', [ 0, 0, 0, 255 ], font1)
    outline(screen_size[0] / 2 + 1, screen_size[1] / 2 + 10, 0, 'ction', [ 0, 0, 0, 255 ], font1)
    if(side() == 'left'){
        Render.StringCustom( screen_size[0] / 2 - 24, screen_size[1] / 2 + 10, 0, 'predi', [ icolor1[0], icolor1[1], icolor1[2], 255 ], font1);
        Render.StringCustom( screen_size[0] / 2 + 1, screen_size[1] / 2 + 10, 0, 'ction', [ icolor2[0], icolor2[1], icolor2[2], 255 ], font1);
    } else if(side() == 'right'){
        Render.StringCustom( screen_size[0] / 2 - 24, screen_size[1] / 2 + 10, 0, 'predi', [ icolor2[0], icolor2[1], icolor2[2], 255 ], font1);
        Render.StringCustom( screen_size[0] / 2 + 1, screen_size[1] / 2 + 10, 0, 'ction', [ icolor1[0], icolor1[1], icolor1[2], 255 ], font1);
    } else{
        Render.StringCustom( screen_size[0] / 2 - 24, screen_size[1] / 2 + 10, 0, 'predi', [ icolor1[0], icolor1[1], icolor1[2], 255 ], font1);
        Render.StringCustom( screen_size[0] / 2 + 1, screen_size[1] / 2 + 10, 0, 'ction', [ icolor2[0], icolor2[1], icolor2[2], 255 ], font1);
    }
    if(UI.IsHotkeyActive('Rage', 'Exploits', 'Doubletap')){
        outline(screen_size[0] / 2 - 4, screen_size[1] / 2 + 21, 0, 'dt', [ 0, 0, 0, 255 ], font)
        Render.StringCustom( screen_size[0] / 2 - 4, screen_size[1] / 2 + 21, 0, 'dt', [ kcolor1[0], kcolor1[1], kcolor1[2], 255 ], font)
    } else{
        outline(screen_size[0] / 2 - 4, screen_size[1] / 2 + 21, 0, 'dt', [ 0, 0, 0, alpha1[3] ], font)
        Render.StringCustom( screen_size[0] / 2 - 4, screen_size[1] / 2 + 21, 0, 'dt', [ kcolor2[0], kcolor2[1], kcolor2[2], alpha1[3] ], font)
    }
    if(UI.IsHotkeyActive('Rage', 'Exploits', 'Hide shots')){
        outline(screen_size[0] / 2 - 4, screen_size[1] / 2 + 29, 0, 'hs', [ 0, 0, 0, 255 ], font)
        Render.StringCustom( screen_size[0] / 2 - 4, screen_size[1] / 2 + 29, 0, 'hs', [ kcolor1[0], kcolor1[1], kcolor1[2], 255 ], font)
    } else{
        outline(screen_size[0] / 2 - 4, screen_size[1] / 2 + 29, 0, 'hs', [ 0, 0, 0, alpha1[3] ], font)
        Render.StringCustom( screen_size[0] / 2 - 4, screen_size[1] / 2 + 29, 0, 'hs', [ kcolor2[0], kcolor2[1], kcolor2[2], alpha1[3] ], font)
    }
    if(UI.IsHotkeyActive('Rage', 'General', 'Force body aim')){
        outline(screen_size[0] / 2 - 4, screen_size[1] / 2 + 37, 0, 'ba', [ 0, 0, 0, 255 ], font)
        Render.StringCustom( screen_size[0] / 2 - 4, screen_size[1] / 2 + 37, 0, 'ba', [ kcolor1[0], kcolor1[1], kcolor1[2], 255 ], font)
    } else{
        outline(screen_size[0] / 2 - 4, screen_size[1] / 2 + 37, 0, 'ba', [ 0, 0, 0, alpha1[3] ], font)
        Render.StringCustom( screen_size[0] / 2 - 4, screen_size[1] / 2 + 37, 0, 'ba', [ kcolor2[0], kcolor2[1], kcolor2[2], alpha1[3] ], font)
    }
    if(UI.IsHotkeyActive('Rage', 'General', 'Force safe point')){
        outline(screen_size[0] / 2 - 4, screen_size[1] / 2 + 45, 0, 'sp', [ 0, 0, 0, 255 ], font)
        Render.StringCustom( screen_size[0] / 2 - 4, screen_size[1] / 2 + 45, 0, 'sp', [ kcolor1[0], kcolor1[1], kcolor1[2], 255 ], font)
    } else{
        outline(screen_size[0] / 2 - 4, screen_size[1] / 2 + 45, 0, 'sp', [ 0, 0, 0, alpha1[3] ], font)
        Render.StringCustom( screen_size[0] / 2 - 4, screen_size[1] / 2 + 45, 0, 'sp', [ kcolor2[0], kcolor2[1], kcolor2[2], alpha1[3] ], font)
    }
}

Cheat.RegisterCallback('Draw', 'indicators')

const side = function(){
    if(Math.sign(Local.GetRealYaw()) == 1){
        return 'right'
    } else if(Math.sign(Local.GetRealYaw()) == -1){
        return 'left'
    }
}

UI.AddHotkey('Min Damage key')
UI.AddSliderInt('Pistol Min damage val', 0, 100)
UI.AddSliderInt('Heavy Pistol Min damage val', 0, 100)
UI.AddSliderInt('Scout Min damage val', 0, 100)
UI.AddSliderInt('Awp Min damage val', 0, 100)
UI.AddSliderInt('Autosniper Min damage val', 0, 100)

const isKnife = function(){
    if (lp == 'bayonet' || lp == 'flip knife' || lp == 'gut knife' || lp == 'karambit' || lp == 'm9 bayonet' || lp == 'falchion knife' || lp == 'bowie knife' || lp == 'butterfly knife' || lp == 'shadow daggers' || lp == 'ursus knife' || lp == 'navaja knife' || lp == 'stiletto knife' || lp == 'skeleton knife' || lp == 'huntsman knife' || lp == 'talon knife' || lp == 'classic knife' || lp == 'paracord knife' || lp == 'survival knife' || lp == 'nomad knife' || lp == 'knife'){
        return true;
    } 
}

const isPistol = function(){
    if(lp == 'glock 18' || lp == 'five seven' || lp == 'dual berettas' || lp == 'p250' || lp == 'tec 9' || lp == 'usp s' || lp == 'cz75 auto' || lp == 'p2000'){
        return true;
    } 
}

const isHPistol = function(){
    if(lp == 'desert eagle' || lp == 'r8 revolver'){
        return true;
    } 
}

const isr8 = function(){
    if(lp == 'r8 revolver'){
        return true;
    } 
}

const isdk = function(lp){
    if(lp == 'desert eagle'){
        return true;
    } 
}

const isScout = function(){
    if(lp == 'ssg 08'){
        return true;
    } 
}

const isAwp = function(){
    if(lp == 'awp'){
        return true;
    }
}

const isAutoSniper = function(){
    if(lp =='g3sg1' || lp == 'scar 20'){
        return true;
    } 
}

const manualAttack = function(){
    if(Input.IsKeyPressed(0x01) || Input.IsKeyPressed(0x02)){
        return true;
    }
}

const can_shoot = function(M){
    const L = Entity.GetLocalPlayer()
    const w = Entity.GetWeapon(L);
    if(w == null || L == null){
        return false;
    }
    var K = Entity.GetProp(L, 'CCSPlayer', 'm_nTickBase');
    var o = Globals.TickInterval() * (K - M);
    if(o < Entity.GetProp(L, 'CCSPlayer', 'm_flNextAttack')){
        return false;
    }
    if (o < Entity.GetProp(w, 'CBaseCombatWeapon', 'm_flNextPrimaryAttack')) {
        return false;
    }
    return true;
}

Exploit.EnableRecharge();
UI.AddSliderFloat('Aspect Ratio', 0, 2)

oncm = function(){
    lp = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    UI.SetValue('Misc', 'GENERAL', 'Movement', 'Turn speed', 400)
    Global.ExecuteCommand('r_aspectratio ' + UI.GetValue('Script items','Aspect Ratio'))
}

tp = function(){
    const dtOn = UI.IsHotkeyActive('Rage', 'GENERAL', 'Exploits', 'Doubletap') ? 1 : 0;
    if(isKnife() && dtOn && manualAttack() && !UI.IsMenuOpen()){ 
        UI.ToggleHotkey('Rage', 'GENERAL', 'Exploits', 'Doubletap');
        cu = Globals.Curtime()
    }
    if(cu + 0.5 == Globals.Curtime()){
        UI.ToggleHotkey('Rage', 'GENERAL', 'Exploits', 'Doubletap');
        cu = 0
    }
}

Cheat.RegisterCallback('CreateMove', 'tp')

dt = function(){
    if(!isr8()){
        const c = Exploit.GetCharge()
        Exploit[(c != 1 ? 'Enable' : 'Disable') + 'Recharge']();
        if(can_shoot(17) && c != 1){
            Exploit.DisableRecharge();
            Exploit.Recharge();
        }
    } else {
        Exploit.EnableRecharge();
    }
}

Cheat.RegisterCallback('CreateMove', 'dt')

UI.SetValue('Misc', 'GENERAL', 'Miscellaneous', 'Hidden cvars', 1)
UI.SetValue('Misc', 'GENERAL', 'Matchmaking', 'Bypass sv_pure', 1)
const prefersafecache = UI.GetValue('Rage', 'AWP', 'Acuraccy', 'Prefer safe point')

for1 = function(){
    e = Entity.GetEnemies()
    if(UI.IsHotkeyActive('Script items', 'Min Damage key')){
        for(var i in e){
            if(isScout()){
                Ragebot.ForceTargetMinimumDamage(e[i], UI.GetValue('Script items', 'Scout Min damage val'))
            } else if(isHPistol()){
                Ragebot.ForceTargetMinimumDamage(e[i], UI.GetValue('Script items', 'Heavy Pistol Min damage val'))
            } else if(isPistol()){
                Ragebot.ForceTargetMinimumDamage(e[i], UI.GetValue('Script items', 'Pistol Min damage val'))
            } else if(isAwp()){
                Ragebot.ForceTargetMinimumDamage(e[i], UI.GetValue('Script items', 'Awp Min damage val'))
            } else if(isAutoSniper()){
                Ragebot.ForceTargetMinimumDamage(e[i], UI.GetValue('Script items', 'Autosniper Min damage val'))
            }
        }
    }
}

for2 = function(){
    w = isAwp() || isScout() ? 1 : 0;
    ison = UI.IsHotkeyActive('Misc', 'GENERAL', 'Movement', 'Auto peek') && UI.IsHotkeyActive('Rage', 'GENERAL', 'Exploits', 'Doubletap') && w ? 1 : 0;
    e = Entity.GetEnemies()
    for(var i in e){
        if(ison){
            if(isScout()){
                Ragebot.ForceTargetMinimumDamage(e[i], UI.GetValue('Script items', 'Scout Min damage val'))
            } else if(isAwp()){
                Ragebot.ForceTargetMinimumDamage(e[i], UI.GetValue('Script items', 'Awp Min damage val'))
            }
        }
    }
    if(ison){
        UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Auto direction', 1)
    } else  {
        UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Auto direction', 0)
    }
    if(ison){
        UI.SetValue('Rage', 'AWP', 'Acuraccy', 'Prefer safe point', 1)
        UI.SetValue('Rage', 'SCOUT', 'Acuraccy', 'Prefer safe point', 1)
    } else {
        UI.SetValue('Rage', 'AWP', 'Acuraccy', 'Prefer safe point', prefersafecache)
        UI.SetValue('Rage', 'SCOUT', 'Acuraccy', 'Prefer safe point', 0)
    }
}

Cheat.RegisterCallback('CreateMove', 'oncm')
Cheat.RegisterCallback('CreateMove', 'for1')
Cheat.RegisterCallback('CreateMove', 'for2')

UI.AddSliderInt('Third person distance', 40, 300)

const inAir = function(){
    if (!(Entity.GetProp(Entity.GetLocalPlayer(), 'CBasePlayer', 'm_fFlags') & 1)) {
        return true;
    } 
}

const ondraw = function(){
    const screen_size = Global.GetScreenSize();
    const lmao = UI.GetValue('Script items','Third person distance')
    UI.SetValue('Visual', 'WORLD', 'View', 'Thirdperson', lmao)
    const font = Render.AddFont( 'verdana', 5, 600)
    if(ison){
        if(isScout()){
            outline(screen_size[0] / 2 + 7, screen_size[1] / 2 - 20, 0, UI.GetValue('Script items', 'Scout Min damage val').toString(), [ 0, 0, 0, 255 ], font)
            Render.StringCustom( screen_size[0] / 2 + 7, screen_size[1] / 2 - 20, 0, UI.GetValue('Script items', 'Scout Min damage val').toString(), [ 255, 255, 255, 255 ], font);
        } else if(isAwp()){
            outline(screen_size[0] / 2 + 7, screen_size[1] / 2 - 20, 0, UI.GetValue('Script items', 'Awp Min damage val').toString(), [ 0, 0, 0, 255 ], font)
            Render.StringCustom( screen_size[0] / 2 + 7, screen_size[1] / 2 - 20, 0, UI.GetValue('Script items', 'Awp Min damage val').toString(), [ 255, 255, 255, 255 ], font);
        }
    }
    if(UI.IsHotkeyActive('Script items', 'Min Damage key')){
        if(isPistol()){
            outline(screen_size[0] / 2 + 7, screen_size[1] / 2 - 20, 0, UI.GetValue('Script items', 'Pistol Min damage val').toString(), [ 255, 255, 255, 255 ], font)
            Render.StringCustom( screen_size[0] / 2 + 7, screen_size[1] / 2 - 20, 0, UI.GetValue('Script items', 'Pistol Min damage val').toString(), [ 255, 255, 255, 255 ], font);
        } else if(isHPistol()){
            outline(screen_size[0] / 2 + 7, screen_size[1] / 2 - 20, 0, UI.GetValue('Script items', 'Heavy Pistol Min damage val').toString(), [ 255, 255, 255, 255 ], font)
            Render.StringCustom( screen_size[0] / 2 + 7, screen_size[1] / 2 - 20, 0, UI.GetValue('Script items', 'Heavy Pistol Min damage val').toString(), [ 255, 255, 255, 255 ], font);
        } else if(isScout()){
            outline(screen_size[0] / 2 + 7, screen_size[1] / 2 - 20, 0, UI.GetValue('Script items', 'Scout Min damage val').toString(), [ 0, 0, 0, 255 ], font)
            Render.StringCustom( screen_size[0] / 2 + 7, screen_size[1] / 2 - 20, 0, UI.GetValue('Script items', 'Scout Min damage val').toString(), [ 255, 255, 255, 255 ], font);
        } else if(isAwp()){
            outline(screen_size[0] / 2 + 7, screen_size[1] / 2 - 20, 0, UI.GetValue('Script items', 'Awp Min damage val').toString(), [ 0, 0, 0, 255 ], font)
            Render.StringCustom( screen_size[0] / 2 + 7, screen_size[1] / 2 - 20, 0, UI.GetValue('Script items', 'Awp Min damage val').toString(), [ 255, 255, 255, 255 ], font);
        } else if(isAutoSniper()){
            outline(screen_size[0] / 2 + 7, screen_size[1] / 2 - 20, 0, UI.GetValue('Script items', 'Autosniper Min damage val').toString(), [ 255, 255, 255, 255 ], font)
            Render.StringCustom( screen_size[0] / 2 + 7, screen_size[1] / 2 - 20, 0, UI.GetValue('Script items', 'Autosniper Min damage val').toString(), [ 255, 255, 255, 255 ], font);
        } else{
            outline(screen_size[0] / 2 + 7, screen_size[1] / 2 - 20, 0, '0', [ 255, 255, 255, 255 ], font)
            Render.StringCustom( screen_size[0] / 2 + 7, screen_size[1] / 2 - 20, 0, '0', [ 255, 255, 255, 255 ], font);
        }
    }
}

Cheat.RegisterCallback('Draw', 'ondraw')

const autobuy = function(){
    if(Entity.GetProp(Entity.GetLocalPlayer(), 'CCSPlayer', 'm_iAccount') >= 16000){
        UI.SetValue('Misc', 'Buybot', 'Enable', 1)
    } else {
        UI.SetValue('Misc', 'Buybot', 'Enable', 0)
    }
}   

Cheat.RegisterCallback("CreateMove", "autobuy")