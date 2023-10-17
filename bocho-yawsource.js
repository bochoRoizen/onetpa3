const menu = function(){
    if(!UI.IsMenuOpen()){
        return;
    }
    const dropval = UI.GetValue('Script items', 'TAB'), 
    infoval = dropval == 0, 
    rageval = dropval == 1, 
    antiaimval = dropval == 2, 
    Visualsval = dropval == 3, 
    miscval = dropval == 4, 
    hcair = UI.GetValue('Script items', 'Hitchance in air Scout/Revolver'), 
    ce = rageval == 1 ? 1 : 0, 
    hcactive = hcair == 1 && ce ? 1 : 0, 
    customaa = UI.GetValue('Script items', 'Anti Aim mode') == 3 ? 1 : 0, 
    ga = antiaimval == 1 ? 1 : 0, 
    ge = customaa && ga ? 1 : 0, 
    ma = UI.GetValue('Script items', 'Show min damage'), 
    mr = Visualsval == 1 ? 1 : 0, 
    me = mr && ma ? 1 : 0
    
    UI.SetEnabled('Script items', 'JS devoleped by bocho#0001\n', infoval), 
    UI.SetEnabled('Script items', 'Load default config', miscval) , 
    UI.SetEnabled('Script items', 'Min Damage key', rageval), 
    UI.SetEnabled('Script items', 'Pistol Min damage val', rageval), 
    UI.SetEnabled('Script items', 'Heavy Pistol Min damage val', rageval), 
    UI.SetEnabled('Script items', 'Scout Min damage val', rageval), 
    UI.SetEnabled('Script items', 'Awp Min damage val', rageval), 
    UI.SetEnabled('Script items', 'Autosniper Min damage val', rageval), 
    UI.SetEnabled('Script items', 'Adaptive auto scope', rageval), 
    UI.SetEnabled('Script items', 'Faster DT Recharge', rageval), 
    UI.SetEnabled('Script items', 'Better Peek Scout/AWP', rageval), 
    UI.SetEnabled('Script items', 'Hitchance in air Scout/Revolver', rageval), 
    UI.SetEnabled('Script items', 'HC in air', hcactive), 
    UI.SetEnabled('Script items', 'Aspect Ratio', miscval),  
    UI.SetEnabled('Script items', 'Autostrafe smoothness', miscval), 
    UI.SetEnabled('Script items', 'Third person distance', miscval), 
    UI.SetEnabled('Script items', 'Knife teleport', miscval), 
    UI.SetEnabled('Script items', 'Show min damage', Visualsval), 
    UI.SetEnabled('Script items','Anti Aim mode', antiaimval), 
    UI.SetEnabled('Script items','Custom real', ge), 
    UI.SetEnabled('Script items','Custom fake', ge), 
    UI.SetEnabled('Script items','Custom real on slow motion', ge), 
    UI.SetEnabled('Script items','Anti BruteForce', antiaimval), 
    UI.SetEnabled('Script items', 'Whitelist', miscval), 
    UI.SetEnabled('Script items', 'Min damage location', me), 
    UI.SetEnabled('Script items', 'Pitch 0 on land', antiaimval), 
    UI.SetEnabled('Script items', 'Leg breaker', antiaimval), 
    UI.SetEnabled('Script items', 'Force safepoint on limbs', rageval), 
    UI.SetEnabled('Script items', 'Static Legs (visual break)', Visualsval), 
    UI.SetEnabled('Script items', 'Dynamic Autobuy', miscval), 
    UI.SetEnabled('Script items', 'Thanks to senki & chanchan', infoval), 
    UI.SetEnabled('Script items', 'discord.gg/HDRwu7qQM2', infoval), 
    UI.SetEnabled('Script items', 'Indicators', Visualsval)
    UI.SetEnabled('Script items', 'Only show when overriding', ma)
    UI.SetEnabled('Script items', 'Global color', Visualsval)
}

Cheat.RegisterCallback('Draw', 'menu')

const unload = function(){
    Cheat.Print('\nBye ' + Cheat.GetUsername() + '!\n')
    AntiAim.SetOverride(0)
    UI.SetValue('Misc', 'GENERAL', 'Movement', 'Turn speed', 100)
    if(UI.GetValue('Script items', 'Static Legs (visual break)')){
        UI.SetValue('Visual', 'SELF' ,'Chams', 'Desync type', 2)
        UI.SetValue('Visual', 'SELF' ,'Chams', 'Layered', 0)
        UI.SetValue('Visual', 'SELF' ,'Chams', 'Visible override', 0)
        UI.SetValue('Visual', 'SELF' ,'Chams', 'Visible transparency', 0)
        UI.SetValue('Visual', 'SELF' ,'Chams', 'Desync override', 0)
    }
}

Cheat.RegisterCallback('Unload', 'unload')

const getdropdownval = function(a, b){
    const o = 1 << b;
    return a & o ? 1 : 0;
}

const GetVelocity = function(ce){
    var velocity = Entity.GetProp(ce, 'CBasePlayer', 'm_vecVelocity[0]');
    return Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
}

const inAir = function(index){
    if (!(Entity.GetProp(index, 'CBasePlayer', 'm_fFlags') & 1)) {
        return true;
    } 
}

const isKnife = function(pe){
    if (pe == 'bayonet' || pe == 'flip knife' || pe == 'gut knife' || pe == 'karambit' || pe == 'm9 bayonet' || pe == 'falchion knife' || pe == 'bowie knife' || pe == 'butterfly knife' || pe == 'shadow daggers' || pe == 'ursus knife' || pe == 'navaja knife' || pe == 'stiletto knife' || pe == 'skeleton knife' || pe == 'huntsman knife' || pe == 'talon knife' || pe == 'classic knife' || pe == 'paracord knife' || pe == 'survival knife' || pe == 'nomad knife' || pe == 'knife'){
        return true;
    } 
}

const isPistol = function(pa){
    if(pa == 'glock 18' || pa == 'five seven' || pa == 'dual berettas' || pa == 'p250' || pa == 'tec 9' || pa == 'usp s' || pa == 'cz75 auto' || pa == 'p2000'){
        return true;
    } 
}

const isHPistol = function(pb){
    if(pb == 'desert eagle' || pb == 'r8 revolver'){
        return true;
    } 
}

const isr8 = function(pr){
    if(pr == 'r8 revolver'){
        return true;
    } 
}

const isdk = function(pr){
    if(pr == 'desert eagle'){
        return true;
    } 
}

const isScout = function(pc){
    if(pc == 'ssg 08'){
        return true;
    } 
}

const isAwp = function(pd){
    if(pd == 'awp'){
        return true;
    }
}

const isAutoSniper = function(pe){
    if(pe =='g3sg1' || pe == 'scar 20'){
        return true;
    } 
}

const manualAttack = function(){
    if(Input.IsKeyPressed(0x01) || Input.IsKeyPressed(0x02)){
        return true;
    }
}

const knifeTp = function(){
    if(!Entity.IsAlive(Entity.GetLocalPlayer())){
        return;
    }
    if(UI.IsMenuOpen()){
        return;
    }
    const P = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    const dtOn = UI.IsHotkeyActive('Rage', 'GENERAL', 'Exploits', 'Doubletap') ? 1 : 0;
    if(UI.GetValue('Script items', 'Knife teleport')){
        if(isKnife(P) && dtOn && manualAttack()){ 
            UI.ToggleHotkey('Rage', 'GENERAL', 'Exploits', 'Doubletap');
            cu = Globals.Curtime()
        }
        if(cu + 0.5 == Globals.Curtime()){
            UI.ToggleHotkey('Rage', 'GENERAL', 'Exploits', 'Doubletap');
            cu = 0
        }
    }
}

Cheat.RegisterCallback('CreateMove', 'knifeTp')

const can_shoot = function(M){
    if(!Entity.IsAlive(Entity.GetLocalPlayer())){
        return;
    }
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

const dmgoverride = function(){
    if(!Entity.IsAlive(Entity.GetLocalPlayer())){
        return;
    }
    const e = Entity.GetEnemies()
    const P = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    for(var i in e){
        if(UI.IsHotkeyActive('Script items', 'Min Damage key')){
            if(isScout(P)){
                Ragebot.ForceTargetMinimumDamage(e[i], UI.GetValue('Script items', 'Scout Min damage val'))
            } else if(isHPistol(P)){
                Ragebot.ForceTargetMinimumDamage(e[i], UI.GetValue('Script items', 'Heavy Pistol Min damage val'))
            } else if(isPistol(P)){
                Ragebot.ForceTargetMinimumDamage(e[i], UI.GetValue('Script items', 'Pistol Min damage val'))
            } else if(isAwp(P)){
                Ragebot.ForceTargetMinimumDamage(e[i], UI.GetValue('Script items', 'Awp Min damage val'))
            } else if(isAutoSniper(P)){
                Ragebot.ForceTargetMinimumDamage(e[i], UI.GetValue('Script items', 'Autosniper Min damage val'))
            }
        }
    }
}

Cheat.RegisterCallback('CreateMove', 'dmgoverride');

const adaptivesafe = function(){
    if(UI.GetValue('Script items', 'Force safepoint on limbs')){
        Ragebot.ForceHitboxSafety(7);
        Ragebot.ForceHitboxSafety(8);
        Ragebot.ForceHitboxSafety(9);
        Ragebot.ForceHitboxSafety(10);
        Ragebot.ForceHitboxSafety(11);
        Ragebot.ForceHitboxSafety(12);
    }
}

Cheat.RegisterCallback('CreateMove', 'adaptivesafe');

const hcinairfunc = function(){
    if(!Entity.IsAlive(Entity.GetLocalPlayer())){
        return;
    }
    const e = Entity.GetEnemies()
    const P = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    for(var i in e){
        if(UI.GetValue('Script items', 'Hitchance in air Scout/Revolver')){
            if(inAir(Entity.GetLocalPlayer())){
                if(isScout(P) || isr8(P)){
                    Ragebot.ForceTargetHitchance(e[i], UI.GetValue('Script items', 'HC in air'))
                }
            }
        }
    }
}

Cheat.RegisterCallback('CreateMove', 'hcinairfunc');

const autoscope = function(){
    if(!Entity.IsAlive(Entity.GetLocalPlayer())){
        return;
    }
    const P = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    if(UI.GetValue('Script items', 'Adaptive auto scope') == 1){
        if(isAutoSniper(P)){
            UI.SetValue('Rage', 'GENERAL', 'General', 'Auto scope', 0)
        } else {
            UI.SetValue('Rage', 'GENERAL', 'General', 'Auto scope', 1)
        }
    }
}

Cheat.RegisterCallback('CreateMove', 'autoscope');

const doubletap = function(){
    if(!Entity.IsAlive(Entity.GetLocalPlayer())){
        return;
    }
    const P = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    if(UI.GetValue('Script items', 'Faster DT Recharge') && !isr8(P)){
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

Cheat.RegisterCallback('CreateMove', 'doubletap');

const idealtick = function(){
    if(!Entity.IsAlive(Entity.GetLocalPlayer())){
        return;
    }
    const e = Entity.GetEnemies()
    const P = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    const w = isAwp(P) || isScout(P) ? 1 : 0;
    const ui = UI.GetValue('Script items', 'Better Peek Scout/AWP')
    const ison = UI.IsHotkeyActive('Misc', 'GENERAL', 'Movement', 'Auto peek') && UI.IsHotkeyActive('Rage', 'GENERAL', 'Exploits', 'Doubletap') && w ? 1 : 0;
    if(getdropdownval(ui, 0)){
        if(ison){
            UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', 1)
            UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', 1)
        } else {
            UI.SetValue('Anti-Aim', 'Fake-Lag', 'Limit', fakelagcache)
            UI.SetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit', fakelagcache2)
        }
    }
    if(getdropdownval(ui, 1)){
        if(ison){
            UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Auto direction', 1)
        } else  {
            UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Auto direction', 0)
        }
    }
    if(getdropdownval(ui, 2)){
        if(ison){
            for(var i in e){
                if(isScout(P)){
                    Ragebot.ForceTargetMinimumDamage(e[i], UI.GetValue('Script items', 'Scout Min damage val'))
                } else if(isAwp(P)){
                    Ragebot.ForceTargetMinimumDamage(e[i], UI.GetValue('Script items', 'Awp Min damage val'))
                }
            }
        }
    }
    if(getdropdownval(ui, 3)){
        if(ison){
            UI.SetValue('Rage', 'AWP', 'Acuraccy', 'Prefer safe point', 1)
            UI.SetValue('Rage', 'SCOUT', 'Acuraccy', 'Prefer safe point', 1)
        } else {
            UI.SetValue('Rage', 'AWP', 'Acuraccy', 'Prefer safe point', prefersafecache)
            UI.SetValue('Rage', 'SCOUT', 'Acuraccy', 'Prefer safe point', 0)
        }
    }
}

const fakelagcache = UI.GetValue('Anti-Aim', 'Fake-Lag', 'Limit')
const fakelagcache2 = UI.GetValue('Anti-Aim', 'Fake-Lag', 'Trigger limit')
const prefersafecache = UI.GetValue('Rage', 'AWP', 'Acuraccy', 'Prefer safe point')

Cheat.RegisterCallback('CreateMove', 'idealtick');

const aspectratio = function(){
    const ui = UI.GetValue('Script items','Aspect Ratio')
    if(UI.GetValue('Misc', 'GENERAL', 'Misc', 'Hidden cvars')){
        Global.ExecuteCommand('r_aspectratio ' + ui)
    }
}

Cheat.RegisterCallback('CreateMove', 'aspectratio')

UI.SetValue('Misc', 'GENERAL', 'Miscellaneous', 'Hidden cvars', 1)
UI.SetValue('Misc', 'GENERAL', 'Matchmaking', 'Bypass sv_pure', 1)

const misc = function(){
    if(!Entity.IsAlive(Entity.GetLocalPlayer())){
        return;
    }
    //auto strafe
    const strafe = UI.GetValue('Script items','Autostrafe smoothness')
    if(strafe == 0){
        UI.SetValue('Misc', 'GENERAL', 'Movement', 'Turn speed', 550)
    } else if(strafe <= 5){
        UI.SetValue('Misc', 'GENERAL', 'Movement', 'Turn speed', 500)
    } else if(strafe <= 30){
        UI.SetValue('Misc', 'GENERAL', 'Movement', 'Turn speed', 400)
    } else if(strafe <= 50){
        UI.SetValue('Misc', 'GENERAL', 'Movement', 'Turn speed', 350)
    } else if(strafe <= 70){
        UI.SetValue('Misc', 'GENERAL', 'Movement', 'Turn speed', 200)
    } else if(strafe < 100){
        UI.SetValue('Misc', 'GENERAL', 'Movement', 'Turn speed', 150)
    } else if(strafe == 100){}
    
    
    //third person distance
    const lmao = UI.GetValue('Script items','Third person distance')
    UI.SetValue('Visual', 'WORLD', 'View', 'Thirdperson', lmao)
}

Cheat.RegisterCallback('Draw', 'misc')

const where = function(){
    const b = UI.GetValue('Script items', 'Min damage location')
    if(b == 0){
        return -15
    } else if(b == 1){
        return -1
    } else if(b == 2){
        return 7
    }
}

const drawmd = function(){
    if(!Entity.IsAlive(Entity.GetLocalPlayer())){
        return;
    }
    if(!UI.GetValue('Script items', 'Show min damage')){
        return;
    }
    const a = UI.IsHotkeyActive('Script items', 'Min Damage key')
    const screen_size = Global.GetScreenSize();
    const font = Render.AddFont( 'verdana', 5, 600)
    const P = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    const w = isAwp(P) || isScout(P) ? 1 : 0;
    const idealdraw = UI.IsHotkeyActive('Misc', 'GENERAL', 'Movement', 'Auto peek') && UI.IsHotkeyActive('Rage', 'GENERAL', 'Exploits', 'Doubletap') && w ? 1 : 0;
    if(idealdraw && getdropdownval(UI.GetValue('Script items', 'Better Peek Scout/AWP'), 2)){
        if(isScout(P)){
            Render.StringCustom( screen_size[0] / 2 + where() - 1, screen_size[1] / 2 - 25, 0, UI.GetValue('Script items', 'Scout Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 + 1, 0, UI.GetValue('Script items', 'Scout Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 - 1, 0, UI.GetValue('Script items', 'Scout Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25, 0, UI.GetValue('Script items', 'Scout Min damage val').toString(), [ 255, 255, 255, 255 ], font);
            return;
        } else if(isAwp(P)){
            Render.StringCustom( screen_size[0] / 2 + where() - 1, screen_size[1] / 2 - 25, 0, UI.GetValue('Script items', 'Awp Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 + 1, 0, UI.GetValue('Script items', 'Awp Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 - 1, 0, UI.GetValue('Script items', 'Awp Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25, 0, UI.GetValue('Script items', 'Awp Min damage val').toString(), [ 255, 255, 255, 255 ], font);
            return;
        }
    }

    if(a){    
        if(isScout(P)){
            Render.StringCustom( screen_size[0] / 2 + where() - 1, screen_size[1] / 2 - 25, 0, UI.GetValue('Script items', 'Scout Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 + 1, 0, UI.GetValue('Script items', 'Scout Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 - 1, 0, UI.GetValue('Script items', 'Scout Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25, 0, UI.GetValue('Script items', 'Scout Min damage val').toString(), [ 255, 255, 255, 255 ], font);
        } else if(isAwp(P)){
            Render.StringCustom( screen_size[0] / 2 + where() - 1, screen_size[1] / 2 - 25, 0, UI.GetValue('Script items', 'Awp Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 + 1, 0, UI.GetValue('Script items', 'Awp Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 - 1, 0, UI.GetValue('Script items', 'Awp Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25, 0, UI.GetValue('Script items', 'Awp Min damage val').toString(), [ 255, 255, 255, 255 ], font);
        } else if(isAutoSniper(P)){
            Render.StringCustom( screen_size[0] / 2 + where()  - 1, screen_size[1] / 2 - 25, 0, UI.GetValue('Script items', 'Autosniper Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 + 1, 0, UI.GetValue('Script items', 'Autosniper Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 - 1, 0, UI.GetValue('Script items', 'Autosniper Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25, 0, UI.GetValue('Script items', 'Autosniper Min damage val').toString(), [ 255, 255, 255, 255 ], font);
        } else if(isHPistol(P)){
            Render.StringCustom( screen_size[0] / 2 + where() - 1, screen_size[1] / 2 - 25, 0, UI.GetValue('Script items', 'Heavy Pistol Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 + 1, 0, UI.GetValue('Script items', 'Heavy Pistol Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 - 1, 0, UI.GetValue('Script items', 'Heavy Pistol Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25, 0, UI.GetValue('Script items', 'Heavy Pistol Min damage val').toString(), [ 255, 255, 255, 255 ], font);
        } else if(isPistol(P)){
            Render.StringCustom( screen_size[0] / 2 + where() - 1, screen_size[1] / 2 - 25, 0, UI.GetValue('Script items', 'Pistol Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 + 1, 0, UI.GetValue('Script items', 'Pistol Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 - 1, 0, UI.GetValue('Script items', 'Pistol Min damage val').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25, 0, UI.GetValue('Script items', 'Pistol Min damage val').toString(), [ 255, 255, 255, 255 ], font);
        } else{
            Render.StringCustom( screen_size[0] / 2 + where() - 1, screen_size[1] / 2 - 25 , 0, '0', [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 + 1, 0, '0', [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 - 1, 0, '0', [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25, 0, '0', [ 255, 255, 255, 255 ], font);
        }
        return;
    }
    if(!UI.GetValue('Script items', 'Only show when overriding')){
        if(isScout(P)){
            Render.StringCustom( screen_size[0] / 2 + where() - 1, screen_size[1] / 2 - 25, 0, UI.GetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 + 1, 0, UI.GetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 - 1, 0, UI.GetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25, 0, UI.GetValue('Rage', 'SCOUT', 'Targeting', 'Minimum damage').toString(), [ 255, 255, 255, 255 ], font);
        } else if(isAwp(P)){
            Render.StringCustom( screen_size[0] / 2 + where() - 1, screen_size[1] / 2 - 25, 0, UI.GetValue('Rage', 'AWP', 'Targeting', 'Minimum damage').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 + 1, 0, UI.GetValue('Rage', 'AWP', 'Targeting', 'Minimum damage').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 - 1, 0, UI.GetValue('Rage', 'AWP', 'Targeting', 'Minimum damage').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25, 0, UI.GetValue('Rage', 'AWP', 'Targeting', 'Minimum damage').toString(), [ 255, 255, 255, 255 ], font);
        } else if(isAutoSniper(P)){
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25, 0, UI.GetValue('Rage', 'AUTOSNIPER', 'Targeting', 'Minimum damage').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 + 1, 0, UI.GetValue('Rage', 'AUTOSNIPER', 'Targeting', 'Minimum damage').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 - 1, 0, UI.GetValue('Rage', 'AUTOSNIPER', 'Targeting', 'Minimum damage').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25, 0, UI.GetValue('Rage', 'AUTOSNIPER', 'Targeting', 'Minimum damage').toString(), [ 255, 255, 255, 255 ], font);
        } else if(isHPistol(P)){
            Render.StringCustom( screen_size[0] / 2 + where() - 1, screen_size[1] / 2 - 25, 0, UI.GetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 + 1, 0, UI.GetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 - 1, 0, UI.GetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25, 0, UI.GetValue('Rage', 'HEAVY PISTOL', 'Targeting', 'Minimum damage').toString(), [ 255, 255, 255, 255 ], font);
        } else if(isPistol(P)){
            Render.StringCustom( screen_size[0] / 2 + where() - 1, screen_size[1] / 2 - 25, 0, UI.GetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 + 1, 0, UI.GetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 - 1, 0, UI.GetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage').toString(), [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25, 0, UI.GetValue('Rage', 'PISTOL', 'Targeting', 'Minimum damage').toString(), [ 255, 255, 255, 255 ], font);
        } else{
            Render.StringCustom( screen_size[0] / 2 + where() - 1, screen_size[1] / 2 - 25, 0, '0', [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 + 1, 0, '0', [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25 - 1, 0, '0', [ 0, 0, 0, 255 ], font);
            Render.StringCustom( screen_size[0] / 2 + where(), screen_size[1] / 2 - 25, 0, '0', [ 255, 255, 255, 255 ], font);
        }
    }
}   

Cheat.RegisterCallback('Draw', 'drawmd')

const indicators = function(){
    if(!Entity.IsAlive(Entity.GetLocalPlayer()) || !UI.GetValue('Script items', 'Indicators')){
        return;
    }
    const screen_size = Global.GetScreenSize();
    const font1 = Render.AddFont( 'Verdana', 7, 800)
    const gcolor = UI.GetColor('Script items', 'Global color')
    Render.StringCustom( screen_size[0] / 2 - 25 + 1, screen_size[1] / 2 + 15, 0, 'bocho', [ 0, 0, 0, 255 ], font1), 
    Render.StringCustom( screen_size[0] / 2 - 25, screen_size[1] / 2 + 15 - 1, 0, 'bocho', [ 0, 0, 0, 255 ], font1), 
    Render.StringCustom( screen_size[0] / 2 - 25, screen_size[1] / 2 + 15 + 1, 0, 'bocho', [ 0, 0, 0, 255 ], font1), 
    Render.StringCustom( screen_size[0] / 2 - 25 - 1, screen_size[1] / 2 + 15, 0, 'bocho', [ 0, 0, 0, 255 ], font1), 
    Render.StringCustom( screen_size[0] / 2 - 25 + 29.7 + 1, screen_size[1] / 2 + 15, 0, 'yaw', [ 0, 0, 0, 255 ], font1), 
    Render.StringCustom( screen_size[0] / 2 - 25 + 29.7, screen_size[1] / 2 + 15 - 1, 0, 'yaw', [ 0, 0, 0, 255 ], font1), 
    Render.StringCustom( screen_size[0] / 2 - 25 + 29.7, screen_size[1] / 2 + 15 + 1, 0, 'yaw', [ 0, 0, 0, 255 ], font1), 
    Render.StringCustom( screen_size[0] / 2 - 25 + 29.7 - 1, screen_size[1] / 2 + 15, 0, 'yaw', [ 0, 0, 0, 255 ], font1);
    if(side() == 'left'){
        Render.StringCustom( screen_size[0] / 2 - 25, screen_size[1] / 2 + 15, 0, 'bocho', [ gcolor[0], gcolor[1], gcolor[2], 255 ], font1);
        Render.StringCustom( screen_size[0] / 2 - 25 + 29.7, screen_size[1] / 2 + 15, 0, 'yaw', [ 255, 255, 255, 255 ], font1);
    } else if(side() == 'right'){
        Render.StringCustom( screen_size[0] / 2 - 25, screen_size[1] / 2 + 15, 0, 'bocho', [ 255, 255, 255, 255 ], font1);
        Render.StringCustom( screen_size[0] / 2 - 25 + 29.7, screen_size[1] / 2 + 15, 0, 'yaw', [ gcolor[0], gcolor[1], gcolor[2], 255 ], font1);
    } else{
        Render.StringCustom( screen_size[0] / 2 - 25, screen_size[1] / 2 + 15, 0, 'bocho', [ 255, 255, 255, 255 ], font1);
        Render.StringCustom( screen_size[0] / 2 - 25 + 29.7, screen_size[1] / 2 + 15, 0, 'yaw', [ 255, 255, 255, 255 ], font1);
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

const playerlistnames = function(){
    var players = [];
    const e = Entity.GetEnemies()
    for(var i in e){
        players.push(Entity.GetName(e[i]).toString())
    }
    return players;
}

const whitelist = function(){
    var players = [];
    const e = Entity.GetEnemies()
    const ui = UI.GetValue('Script items', 'Whitelist')
    for(var i in e){
        players.push(Entity.GetName(e[i]).toString())
        if(getdropdownval(ui, i)){
            if(Entity.GetName(e[i]) == players[i]){
                Ragebot.IgnoreTarget(e[i])
            }
        }
    }
}

Cheat.RegisterCallback('CreateMove', 'whitelist')

var clock = 0
var clock1 = 0
var clock2 = 0
var aastate = 'default'
var lclock = 0
var antibrute = 0
var firstslow = 0
var slowdelta = 33
var slowdelta2 = 24
var slowdelta3 = 33

const invertcalc = function(num){
    const inverted = UI.IsHotkeyActive('Anti-Aim', 'Fake angles', 'Inverter')
    if(inverted){
        return num * -1
    } else{
        return num * 1
    }
}

const antihit = function(){
    const velocity = Math.round(GetVelocity(Entity.GetLocalPlayer())).toString()
    const ui = UI.GetValue('Script items', 'Anti Aim mode')
    if(ui == 0){
        clock += 0.5
        AntiAim.SetOverride(0);
        if(UI.GetValue('Inverter spam')){
            if(clock > 1){
                UI.ToggleHotkey('Anti-Aim', 'Fake angles', 'Inverter')
                clock = 0
            }
        }
        if(UI.GetValue('Script items', 'Leg breaker')){
            lclock += 0.5
            if(la == 1){
                return;
            }
            if(lclock > 1){
                UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 1)
                lclock = 0
            } else{
                UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 0)
            }
        }
    }
    if(ui == 1){
        UI.SetValue('Anti-Aim', 'Fake angles', 'Desync on shot', 0), UI.SetValue('Anti-Aim', 'Fake angles', 'Hide real angle', 0), UI.SetValue('Anti-Aim', 'Fake angles', 'Avoid overlap', 0), UI.SetValue('Anti-Aim', 'Fake angles', 'Fake desync', 0), UI.SetValue('Anti-Aim', 'Extras', 'bocho-yaw move', 1)
        if(antibrute == 2){
            antibrute = 0
        }
        if(clock > 1){
            inverted = 1, clock = 0
        } else{
            inverted = 0
        }
        if(inverted == 1){
            slowdelta = 24, slowdelta2 = -17, slowdelta3 = 33
        } else{
            slowdelta = -22, slowdelta2 = 12, slowdelta3 = -33
        }
        if(UI.IsHotkeyActive('Anti-Aim', 'Extra', 'Slow walk') && antibrute == 0){
             clock += 0.6
            aastate = 'slowwalk', AntiAim.SetOverride(1), 
            AntiAim.SetFakeOffset(1), 
            AntiAim.SetRealOffset(invertcalc(slowdelta)), 
            AntiAim.SetLBYOffset(20)
        } else if (UI.IsHotkeyActive('Anti-Aim', 'Extra', 'Slow walk') && antibrute == 1){
            clock += 0.6
            aastate = 'slowwalk', 
            AntiAim.SetOverride(1), 
            AntiAim.SetFakeOffset(1), 
            AntiAim.SetRealOffset(invertcalc(slowdelta2)), 
            AntiAim.SetLBYOffset(20)
        } else if(UI.IsHotkeyActive('Anti-Aim', 'Extra', 'Slow walk') && antibrute == 2){
            clock += 0.6
            aastate = 'slowwalk', 
            AntiAim.SetOverride(1), 
            AntiAim.SetFakeOffset(1), 
            AntiAim.SetRealOffset(invertcalc(slowdelta3)), 
            AntiAim.SetLBYOffset(20)
        } else if(inAir(Entity.GetLocalPlayer()) && !inverted){
            clock += 0.1
            aastate = 'air', 
            AntiAim.SetOverride(1), 
            AntiAim.SetFakeOffset(0), 
            AntiAim.SetRealOffset(invertcalc(24)), 
            AntiAim.SetLBYOffset(12)
        } else if(inAir(Entity.GetLocalPlayer()) && inverted){
            clock += 0.1
            aastate = 'air', 
            AntiAim.SetOverride(1), 
            AntiAim.SetFakeOffset(0), 
            AntiAim.SetRealOffset(invertcalc(-27)), 
            AntiAim.SetLBYOffset(12)
        } else if(Entity.GetProp(Entity.GetLocalPlayer(), 'CBasePlayer', 'm_flDuckAmount') > 0.8 && !inverted || UI.IsHotkeyActive('Anti-Aim', 'Extra', 'Fake duck') && !inverted){
            clock += 0.33
            aastate = 'duck', 
            AntiAim.SetOverride(1), 
            AntiAim.SetFakeOffset(-6), 
            AntiAim.SetRealOffset(-23), 
            AntiAim.SetLBYOffset(28)
        } else if(Entity.GetProp(Entity.GetLocalPlayer(), 'CBasePlayer', 'm_flDuckAmount') > 0.8 && inverted || UI.IsHotkeyActive('Anti-Aim', 'Extra', 'Fake duck') && inverted){
            clock += 0.33
            aastate = 'duck', 
            AntiAim.SetOverride(1), 
            AntiAim.SetFakeOffset(-6),
             AntiAim.SetRealOffset(-43), 
             AntiAim.SetLBYOffset(28)
        } else if(velocity > 2 && !inverted){
            clock += 0.17
            aastate = 'normal', 
            AntiAim.SetOverride(1), 
            AntiAim.SetFakeOffset(0), 
            AntiAim.SetRealOffset(invertcalc(-23))
        } else if(velocity > 2 && inverted){
            clock += 0.17
            aastate = 'normal', 
            AntiAim.SetOverride(1), 
            AntiAim.SetFakeOffset(5), 
            AntiAim.SetRealOffset(invertcalc(31))
        } else if(velocity == 0 && inverted){
            clock += 0.33
            aastate = 'standing', 
            AntiAim.SetOverride(1), 
            AntiAim.SetRealOffset(invertcalc(7)), 
            AntiAim.SetFakeOffset(0), 
            AntiAim.SetLBYOffset(7)
        } else if(velocity == 0 && !inverted){
            clock += 0.33
            aastate = 'standing', 
            AntiAim.SetOverride(1), 
            AntiAim.SetRealOffset(invertcalc(-22)), 
            AntiAim.SetFakeOffset(0), 
            AntiAim.SetLBYOffset(24)
        }
        if(UI.GetValue('Script items', 'Leg breaker')){
            lclock += 0.5
            if(la == 1){
                return;
            }
            if(lclock > 1){
                UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 1)
                lclock = 0
            } else{
                UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 0)
            }
        }
    }
    if(ui == 3){
        if(UI.IsHotkeyActive('Anti-Aim', 'Extra', 'Slow walk')){
            AntiAim.SetOverride(1);
            AntiAim.SetRealOffset(UI.GetValue('Script items', 'Custom real on slow motion'));
        } else{
            AntiAim.SetOverride(1);
            AntiAim.SetRealOffset(UI.GetValue('Script items', 'Custom real'));
            AntiAim.SetLBYOffset(UI.GetValue('Script items', 'Custom fake'));
        }
        if(UI.GetValue('Script items', 'Leg breaker')){
            lclock += 0.1
            if(la == 1){
                return;
            }
            if(lclock > 1){
                UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 1)
                lclock = 0
            } else{
                UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 0)
            }
        }
    }
    if(ui == 2){
        UI.SetValue('Anti-Aim', 'Fake angles', 'Desync on shot', 0), UI.SetValue('Anti-Aim', 'Fake angles', 'Hide real angle', 1), UI.SetValue('Anti-Aim', 'Fake angles', 'Avoid overlap', 1), UI.SetValue('Anti-Aim', 'Fake angles', 'Fake desync', 0), UI.SetValue('Anti-Aim', 'Extras', 'bocho-yaw move', 1)
        if(UI.IsHotkeyActive('Anti-Aim', 'Extra', 'Slow walk')){
            aastate = 'slowwalk', AntiAim.SetOverride(1), AntiAim.SetFakeOffset(2), AntiAim.SetRealOffset(invertcalc(24)), AntiAim.SetLBYOffset(7)
        } else if(inAir(Entity.GetLocalPlayer())){
            aastate = 'air', AntiAim.SetOverride(1), AntiAim.SetFakeOffset(7), AntiAim.SetRealOffset(invertcalc(14)), AntiAim.SetLBYOffset(0)
        } else if(Entity.GetProp(Entity.GetLocalPlayer(), 'CBasePlayer', 'm_flDuckAmount') > 0.8 || UI.IsHotkeyActive('Anti-Aim', 'Extra', 'Fake duck')){
            aastate = 'duck', AntiAim.SetOverride(1), AntiAim.SetFakeOffset(-4), AntiAim.SetRealOffset(invertcalc(-12)), AntiAim.SetLBYOffset(0)
        } else if(velocity > 2){
            aastate = 'normal', AntiAim.SetOverride(1), AntiAim.SetFakeOffset(5), AntiAim.SetRealOffset(invertcalc(-35))
        } else if(velocity == 0){
            aastate = 'standing', AntiAim.SetOverride(1), AntiAim.SetRealOffset(invertcalc(-22)), AntiAim.SetFakeOffset(0), AntiAim.SetLBYOffset(22)
        }
        UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset', 5)
        clock2 += 0.4
        if(clock2 > 1){
            UI.SetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset', UI.GetValue('Anti-Aim', 'Rage Anti-Aim', 'Yaw offset') * -1)
            clock2 = 0
        }
        if(UI.GetValue('Script items', 'Leg breaker')){
            lclock += 0.1
            if(la == 1){
                return;
            }
            if(lclock > 1){
                UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 1)
                lclock = 0
            } else{
                UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 0)
            }
        }
    }
}

Cheat.RegisterCallback('CreateMove', 'antihit')

const ondeath = function(){
    const died1 = Event.GetInt('userid')
    const attacker1 = Event.GetInt('attacker')
    const local = Entity.GetName(Entity.GetLocalPlayer())
    const attacker2 = Entity.GetEntityFromUserID(attacker1)
    const died2 = Entity.GetEntityFromUserID(died1)
    const attacker = Entity.GetName(attacker2)
    const died = Entity.GetName(died2)
    if(died == local || attacker == local){
        antibrute = 0
    }
}

Cheat.RegisterCallback('player_death', 'ondeath')

const invertos = function(){
    la = 0
    if(UI.GetValue('Script items', 'Invert on shot')){
        UI.ToggleHotkey('Anti-Aim', 'Fake angles', 'Inverter')
    }
}

Cheat.RegisterCallback('ragebot_fire', 'invertos')

const isvisible = function(){
    const e = Entity.GetEnemies()
    for(var i in e){
        if(Entity.IsValid(e[i]) == true && Entity.IsAlive(e[i]) && Entity.IsDormant(e[i]) == false){
            return true;
        }
    }
}

var la = 0
var slidewalkcache = UI.GetValue("Misc", "GENERAL", "Movement", "Slide walk")

const picth = function(){
    if(!UI.GetValue('Script items', 'Pitch 0 on land')){
        return;
    }
    UI.SetValue('Misc', 'Restrictions', 0)
    UI.SetValue('Anti-Aim', 'Extras' ,'Pitch', 1)
    if(Input.IsKeyPressed(0x20)){
        return;
    }
    if(inAir(Entity.GetLocalPlayer())){
        pclock = Globals.Curtime()
        UI.SetValue('Anti-Aim', 'Extras' ,'Pitch', 1)
        la = 1
    }
    const visible = isvisible() ? 0.3 : 1
    if(!inAir(Entity.GetLocalPlayer()) && la == 1){
        UI.SetValue('Anti-Aim', 'Extras' ,'Pitch', 0)
        UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", 1)
        if(pclock + visible < Globals.Curtime()){
            UI.SetValue('Anti-Aim', 'Extras' ,'Pitch', 1)
            UI.SetValue("Misc", "GENERAL", "Movement", "Slide walk", slidewalkcache)
            la = 0
        }
    }
    if(la == 0){
        UI.SetValue('Anti-Aim', 'Extras' ,'Pitch', 1)
    }
}

Cheat.RegisterCallback('CreateMove', 'picth')

var asdfgfd = 0

const staticlegs = function(){
    if(UI.GetValue('Script items', 'Static Legs (visual break)') && asdfgfd == 0){
        asdfgfd = 1
        Material.Create("Static Legs");
        UI.SetValue('Visual', 'SELF' ,'Chams', 'Desync type', 6)
        UI.SetValue('Visual', 'SELF' ,'Chams', 'Layered', 1)
        UI.SetValue('Visual', 'SELF' ,'Chams', 'Desync transparency', 0)
        UI.SetValue('Visual', 'SELF' ,'Chams', 'Visible override', 1)
        UI.SetValue('Visual', 'SELF' ,'Chams', 'Visible transparency', 100)
        UI.SetValue('Visual', 'SELF' ,'Chams', 'Desync override', 1)
        Material.Destroy("Static Legs");
    } 
    if(!UI.GetValue('Script items', 'Static Legs (visual break)') && asdfgfd == 1){
        asdfgfd = 0
        UI.SetValue('Visual', 'SELF' ,'Chams', 'Desync type', 2)
        UI.SetValue('Visual', 'SELF' ,'Chams', 'Visible override', 0)
        UI.SetValue('Visual', 'SELF' ,'Chams', 'Visible transparency', 0)
        UI.SetValue('Visual', 'SELF' ,'Chams', 'Desync override', 0)
    }
}

Cheat.RegisterCallback("Material", "staticlegs")

var bbot = 0

const autobuy = function(){
    if(UI.GetValue('Script items', 'Dynamic Autobuy')){
        bbot = 1
        if(Entity.GetProp(Entity.GetLocalPlayer(), 'CCSPlayer', 'm_iAccount') >= 16000){
            UI.SetValue('Misc', 'Buybot', 'Enable', 1)
        } else {
            UI.SetValue('Misc', 'Buybot', 'Enable', 0)
        }
    }
    if(!UI.GetValue('Script items', 'Dynamic Autobuy') && bbot == 1){
        bbot = 0
        UI.SetValue('Misc', 'Buybot', 'Enable', 0)
    }
}   

Cheat.RegisterCallback("CreateMove", "autobuy")

var pitchr = 0

const donttrusttheuser = function(){ //i dont trust the user btw
    
}   

Cheat.RegisterCallback("CreateMove", "autobuy")

const defaultcfg = function(){
    if(UI.GetValue('Script items', 'Load default config')){
        UI.SetValue('Script items', 'Load default config', 0), 
        UI.SetValue('Script items', 'Aspect Ratio', 1), 
        UI.SetValue('Script items', 'Autostrafe smoothness', 40), 
        UI.SetValue('Script items', 'Third person distance', 70), 
        UI.SetValue('Script items', 'Knife teleport', 1), 
        UI.SetValue('Script items', 'Dynamic Autobuy', 1), 
        UI.SetValue('Script items', 'Pistol Min damage val', 5), 
        UI.SetValue('Script items', 'Heavy Pistol Min damage val', 5), 
        UI.SetValue('Script items', 'Scout Min damage val', 5), 
        UI.SetValue('Script items', 'Awp Min damage val', 10), 
        UI.SetValue('Script items', 'Autosniper Min damage val', 5), 
        UI.SetValue('Script items', 'Adaptive auto scope', 1), 
        UI.SetValue('Script items', 'Faster DT Recharge', 1), 
        UI.SetValue('Script items', 'Force safepoint on limbs', 1), 
        UI.SetValue('Script items', 'Hitchance in air Scout/Revolver', 1), 
        UI.SetValue('Script items', 'HC in air', 50), 
        UI.SetValue('Script items', 'Better Peek Scout/AWP', 702), 
        UI.SetValue('Script items', 'Anti Aim mode', 1), 
        UI.SetValue('Script items', 'Anti BruteForce', 1), 
        UI.SetValue('Script items', 'Pitch 0 on land', 0), 
        UI.SetValue('Script items', 'Leg breaker', 1), 
        UI.SetValue('Script items', 'Show min damage', 1), 
        UI.SetValue('Script items', 'Min damage location', 2), 
        UI.SetValue('Script items', 'Static Legs (visual break)', 1)
    }
}

Cheat.RegisterCallback("Draw", "defaultcfg")

UI.AddLabel('/-------------------------------/')
UI.AddDropdown('TAB', ['Info', 'Ragebot', 'Anti Aim', 'Visuals', 'Misc'])
//info
UI.AddLabel('JS devoleped by bocho#0001\n')
UI.AddLabel('Thanks to senki & chanchan')
UI.AddLabel('discord.gg/HDRwu7qQM2')
//ragebot
UI.AddHotkey('Min Damage key')
UI.AddSliderInt('Pistol Min damage val', 0, 100)
UI.AddSliderInt('Heavy Pistol Min damage val', 0, 100)
UI.AddSliderInt('Scout Min damage val', 0, 100)
UI.AddSliderInt('Awp Min damage val', 0, 100)
UI.AddSliderInt('Autosniper Min damage val', 0, 100)
UI.AddCheckbox('Adaptive auto scope')
UI.AddCheckbox('Faster DT Recharge')
UI.AddCheckbox('Force safepoint on limbs')
UI.AddMultiDropdown('Better Peek Scout/AWP', ['Fakelag', 'Freestanding', 'Min damage', 'Prefer safe point'])
UI.AddCheckbox('Hitchance in air Scout/Revolver')
UI.AddSliderInt('HC in air', 0, 100)
UI.AddMultiDropdown('Whitelist', playerlistnames())
//antiaim
UI.AddDropdown('Anti Aim mode', ['Stock', 'bocho-yaw', 'Static' ,'Custom'])
UI.AddSliderInt('Custom real', -60, 60)
UI.AddSliderInt('Custom fake', -60, 60)
UI.AddSliderInt('Custom real on slow motion', -60, 60)
UI.AddCheckbox('Anti BruteForce')
UI.AddCheckbox('Pitch 0 on land')
UI.AddCheckbox('Leg breaker')
//visuals
UI.AddColorPicker('Global color')
UI.AddCheckbox('Show min damage')
UI.AddCheckbox('Only show when overriding')
UI.AddDropdown('Min damage location', ['Left', 'Middle', 'Right'])
UI.AddCheckbox('Indicators')
UI.AddCheckbox('Static Legs (visual break)')
//misc
UI.AddSliderFloat('Aspect Ratio', 0, 2)
UI.AddSliderInt('Autostrafe smoothness', 0, 100)
UI.AddSliderInt('Third person distance', 40, 300)
UI.AddCheckbox('Knife teleport')
UI.AddCheckbox('Dynamic Autobuy')
UI.AddCheckbox('Load default config')
UI.AddLabel('|-------------------------------|')

Cheat.Print('\n\n\n\n\n _             _        discord.gg/HDRwu7qQM2\n');
Cheat.Print('| |__  ___  __| |_  ___ ___ _  _ __ ___ __ __\n');
Cheat.Print('| \'_ \\/ _ \\/ _| \' \\/ _ \\___| || / _` \\ V  V /\n');
Cheat.Print('|_.__/\\___/\\__|_||_\\___/    \\_, \\__,_|\\_/\\_/ \n');
Cheat.Print('                            |__/       v1.2.0\n\n\n\n\n\n');
//------------------------------------------------------------------------------------------------------------------------------\\\\

function radian(hj) {
  return hj * Math.PI / 180;
}

function ExtendVector(hk, hl, hm) {
  var hn = radian(hl);
  return [
    hm * Math.cos(hn) + hk[0],
    hm * Math.sin(hn) + hk[1],
    hk[2]
  ];
}

function VectorAdd(ho, hq) {
  return [
    ho[0] + hq[0],
    ho[1] + hq[1],
    ho[2] + hq[2]
  ];
}

function VectorSubtract(hr, hs) {
  return [
    hr[0] - hs[0],
    hr[1] - hs[1],
    hr[2] - hs[2]
  ];
}

function VectorMultiply(hy, hz) {
  return [
    hy[0] * hz[0],
    hy[1] * hz[1],
    hy[2] * hz[2]
  ];
}

function VectorLength(ia, ib, ic) {
  return Math.sqrt(ia * ia + ib * ib + ic * ic);
}

function VectorNormalize(ie) {
  var ig = VectorLength(ie[0], ie[1], ie[2]);
  return [
    ie[0] / ig,
    ie[1] / ig,
    ie[2] / ig
  ];
}

function VectorDot(ih, ii) {
  return ih[0] * ii[0] + ih[1] * ii[1] + ih[2] * ii[2];
}

function VectorDistance(ij, ik) {
  return VectorLength(ij[0] - ik[0], ij[1] - ik[1], ij[2] - ik[2]);
}

function ClosestPointOnRay(il, im, io) {
  var ip = VectorSubtract(il, im);
  var iq = VectorSubtract(io, im);
  var ir = VectorLength(iq[0], iq[1], iq[2]);
  iq = VectorNormalize(iq);
  var is = VectorDot(iq, ip);
  if (is < 0) {
    return im;
  };
  if (is > ir) {
    return io;
  };
  return VectorAdd(im, VectorMultiply(iq, [
    is,
    is,
    is
  ]));
}
var lastHitTime = 0;
var lastImpactTimes = [0];
var lastImpacts = [
  [
    0,
    0,
    0
  ]
];

function OnHurt1() {
  if (UI.GetValue('Script items', 'Anti BruteForce')) {
    if (Entity.GetEntityFromUserID(Event.GetInt('userid')) !== Entity.GetLocalPlayer()) {
      return;
    };
    var it = Event.GetInt('hitgroup');
    if (it == 1 || it == 6 || it == 7) {
      var iu = Global.Curtime();
      if (Math.abs(lastHitTime - iu) > 0.5) {
        lastHitTime = iu;
        UI.ToggleHotkey('Anti-Aim', 'Fake angles', 'Inverter');
        la = 0
        antibrute += 1
      }
    }
  }
}

function OnBulletImpact() {
    if (UI.GetValue('Script items', 'Anti BruteForce')) {
      var iv = Global.Curtime();
      if (Math.abs(lastHitTime - iv) < 0.5) {
        return;
      };
      var iw = Entity.GetEntityFromUserID(Event.GetInt('userid'));
      var ix = [
        Event.GetFloat('x'),
        Event.GetFloat('y'),
        Event.GetFloat('z'),
        iv
      ];
      var iy;
      if (Entity.IsValid(iw) && Entity.IsEnemy(iw)) {
        if (!Entity.IsDormant(iw)) {
          iy = Entity.GetEyePosition(iw);
        } else {
          if (Math.abs(lastImpactTimes[iw] - iv) < 0.1) {
            iy = lastImpacts[iw];
          } else {
            lastImpacts[iw] = ix;
            lastImpactTimes[iw] = iv;
            return;
          }
        };
        var iz = Entity.GetLocalPlayer();
        var ja = Entity.GetEyePosition(iz);
        var jb = Entity.GetProp(iz, 'CBaseEntity', 'm_vecOrigin');
        var jc = VectorMultiply(VectorAdd(ja, jb), [
          0.5,
          0.5,
          0.5
        ]);
        var jd = ClosestPointOnRay(jc, iy, ix);
        var je = VectorDistance(jc, jd);
        if (je < 85) {
          var jf = Local.GetRealYaw();
          var jg = Local.GetFakeYaw();
          var jh = ClosestPointOnRay(ja, iy, ix);
          var ji = VectorDistance(ja, jh);
          var jj = ClosestPointOnRay(jb, iy, ix);
          var jk = VectorDistance(jb, jj);
          var jl;
          var jm;
          var jn;
          if (je < ji && je < jk) {
            jl = jd;
            jm = ExtendVector(jd, jf + 180, 10);
            jn = ExtendVector(jd, jg + 180, 10);
          } else {
            if (jk < ji) {
              jl = jj;
              var jo = ExtendVector(jd, jf - 30 + 60, 10);
              var jp = ExtendVector(jd, jf - 30 - 60, 10);
              var jq = ExtendVector(jd, jg - 30 + 60, 10);
              var jr = ExtendVector(jd, jg - 30 - 60, 10);
              if (VectorDistance(jj, jo) < VectorDistance(jj, jp)) {
                jm = jo;
              } else {
                jm = jp;
              };
              if (VectorDistance(jj, jq) < VectorDistance(jj, jr)) {
                jn = jq;
              } else {
                jn = jr;
              }
            } else {
              jl = jh;
              jm = ExtendVector(jd, jf, 10);
              jn = ExtendVector(jd, jg, 10);
            }
          };
          ji = ji.toFixed(1);
          if (VectorDistance(jl, jn) < VectorDistance(jl, jm)) {
            lastHitTime = iv;
            UI.ToggleHotkey('Anti-Aim', 'Fake angles', 'Inverter');
            la = 0
            antibrute += 1
          }
        };
        lastImpacts[iw] = ix;
        lastImpactTimes[iw] = iv;
      }
    }
}

Cheat.RegisterCallback('bullet_impact', 'OnBulletImpact')
Cheat.RegisterCallback('player_hurt', 'OnHurt1')
  
  // I didn't code this antibruteforce, don't give me credit if you paste it