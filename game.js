'use strict';

// ============================================================
// DOM
// ============================================================

const canvas =
  document.querySelector(
    '#gameCanvas'
  );

const ctx =
  canvas.getContext(
    '2d'
  );


const hpText =
  document.querySelector(
    '#hp'
  );

const hpBar =
  document.querySelector(
    '#hpBar'
  );

const livesText =
  document.querySelector(
    '#lives'
  );

const coreHpText =
  document.querySelector(
    '#coreHp'
  );

const coreHpBar =
  document.querySelector(
    '#coreHpBar'
  );

const coreShieldText =
  document.querySelector(
    '#coreShield'
  );

const scoreText =
  document.querySelector(
    '#score'
  );

const dataText =
  document.querySelector(
    '#data'
  );

const waveText =
  document.querySelector(
    '#wave'
  );

const threatsText =
  document.querySelector(
    '#threats'
  );

const comboText =
  document.querySelector(
    '#combo'
  );

const streakText =
  document.querySelector(
    '#streak'
  );

const dashStatus =
  document.querySelector(
    '#dashStatus'
  );

const powerStatus =
  document.querySelector(
    '#powerStatus'
  );

const stateStatus =
  document.querySelector(
    '#stateStatus'
  );


const bossHud =
  document.querySelector(
    '#bossHud'
  );

const bossName =
  document.querySelector(
    '#bossName'
  );

const bossHpText =
  document.querySelector(
    '#bossHpText'
  );

const bossHpBar =
  document.querySelector(
    '#bossHpBar'
  );


const startMenu =
  document.querySelector(
    '#startMenu'
  );

const startBtn =
  document.querySelector(
    '#startBtn'
  );

const pausePanel =
  document.querySelector(
    '#pausePanel'
  );

const upgradePanel =
  document.querySelector(
    '#upgradePanel'
  );

const upgradeChoices =
  document.querySelector(
    '#upgradeChoices'
  );

const buildPanel =
  document.querySelector(
    '#buildPanel'
  );

const buildTimerText =
  document.querySelector(
    '#buildTimer'
  );

const buildDataText =
  document.querySelector(
    '#buildData'
  );

const nextWaveTitle =
  document.querySelector(
    '#nextWaveTitle'
  );

const nextWaveArchetype =
  document.querySelector(
    '#nextWaveArchetype'
  );

const threatPreviewList =
  document.querySelector(
    '#threatPreviewList'
  );

const buildHint =
  document.querySelector(
    '#buildHint'
  );

const upgradeStructureBtn =
  document.querySelector(
    '#upgradeStructureBtn'
  );

const readyBtn =
  document.querySelector(
    '#readyBtn'
  );

const buildButtons =
  [
    ...document.querySelectorAll(
      '.build-option'
    )
  ];


const endingOverlay =
  document.querySelector(
    '#endingOverlay'
  );

const endingReasonText =
  document.querySelector(
    '#endingReason'
  );

const gameOverPanel =
  document.querySelector(
    '#gameOver'
  );

const resultTitle =
  document.querySelector(
    '#resultTitle'
  );

const resultReason =
  document.querySelector(
    '#resultReason'
  );

const finalWave =
  document.querySelector(
    '#finalWave'
  );

const finalScore =
  document.querySelector(
    '#finalScore'
  );

const finalKills =
  document.querySelector(
    '#finalKills'
  );

const finalElites =
  document.querySelector(
    '#finalElites'
  );

const finalBosses =
  document.querySelector(
    '#finalBosses'
  );

const finalStructures =
  document.querySelector(
    '#finalStructures'
  );

const finalCoreDamage =
  document.querySelector(
    '#finalCoreDamage'
  );

const finalCombo =
  document.querySelector(
    '#finalCombo'
  );

const finalTime =
  document.querySelector(
    '#finalTime'
  );

const finalData =
  document.querySelector(
    '#finalData'
  );

const restartBtn =
  document.querySelector(
    '#restartBtn'
  );


canvas.style.cursor =
  'none';


// ============================================================
// CONFIG
// ============================================================

const CONFIG = {

  player: {

    radius:
      18,

    speed:
      260,

    maxHp:
      100,

    startLives:
      3,

    maxLives:
      5,

    respawnMs:
      3000,

    respawnInvulnerabilityMs:
      1800,

    hitInvulnerabilityMs:
      420,

    dashSpeed:
      850,

    dashDurationMs:
      135,

    dashCooldownMs:
      1150
  },


  core: {

    radius:
      38,

    maxHp:
      1000,

    maxShield:
      250,

    shieldRechargePerWave:
      110,

    criticalRatio:
      0.10,

    noBuildRadius:
      105
  },


  weapon: {

    fireIntervalMs:
      140,

    bulletSpeed:
      790,

    bulletRadius:
      4,

    bulletLifeMs:
      1350,

    damage:
      1,

    rapidFireMultiplier:
      0.52,

    rapidFireDurationMs:
      6500
  },


  waves: {

    baseEnemies:
      8,

    perWave:
      3,

    maxRegularEnemies:
      72,

    baseSpawnIntervalMs:
      760,

    minSpawnIntervalMs:
      280,

    spawnWarningMs:
      560,

    clearDisplayMs:
      1200,

    buildSeconds:
      20,

    bossEvery:
      5
  },


  combo: {

    windowMs:
      2400,

    killsPerMultiplier:
      3,

    maxMultiplier:
      5
  },


  pickups: {

    dropChance:
      0.16,

    radius:
      13,

    lifeMs:
      12000,

    playerHeal:
      25,

    coreRepair:
      65,

    shieldMaxCharges:
      2
  },


  enemies: {

    virus: {

      radius:
        15,

      speed:
        98,

      hp:
        1,

      damage:
        11,

      score:
        10,

      data:
        4,

      color:
        '#ff5c7a',

      attackMs:
        900
    },


    runner: {

      radius:
        11,

      speed:
        175,

      hp:
        1,

      damage:
        14,

      score:
        15,

      data:
        5,

      color:
        '#ffa94d',

      attackMs:
        800
    },


    tank: {

      radius:
        24,

      speed:
        64,

      hp:
        5,

      damage:
        22,

      score:
        38,

      data:
        10,

      color:
        '#b197fc',

      attackMs:
        720
    },


    shooter: {

      radius:
        17,

      speed:
        84,

      hp:
        2,

      damage:
        13,

      score:
        30,

      data:
        8,

      color:
        '#4dabf7',

      attackMs:
        1450,

      range:
        265,

      projectileSpeed:
        255
    },


    sapper: {

      radius:
        16,

      speed:
        112,

      hp:
        3,

      damage:
        28,

      score:
        42,

      data:
        12,

      color:
        '#51cf66',

      attackMs:
        560
    }

  },


  elite: {

    hpMultiplier:
      1.8,

    speedMultiplier:
      1.28,

    scoreMultiplier:
      1.8,

    dataMultiplier:
      1.7,

    shieldHits:
      2
  },


  enemyProjectile: {

    radius:
      6,

    lifeMs:
      6000
  },


  boss: {

    radius:
      52,

    baseHp:
      55,

    hpPerTier:
      30,

    hpTierCap:
      8,

    speed:
      78,

    contactDamage:
      34,

    score:
      650,

    data:
      120,

    shotMs:
      900,

    radialMs:
      2900,

    chargeMs:
      5000,

    chargeWarningMs:
      650,

    chargeDurationMs:
      700,

    chargeSpeed:
      440,

    summonMs:
      4700,

    projectileSpeed:
      285
  },


  defenses: {

    turret: {

      name:
        'AUTO TURRET',

      cost:
        40,

      radius:
        19,

      hp:
        125,

      range:
        245,

      fireMs:
        620,

      damage:
        1.35,

      color:
        '#63e6ff'
    },


    firewall: {

      name:
        'FIREWALL',

      cost:
        35,

      radius:
        31,

      hp:
        310,

      color:
        '#ff8787'
    },


    slow: {

      name:
        'SLOW FIELD',

      cost:
        45,

      radius:
        24,

      hp:
        105,

      range:
        118,

      slow:
        0.55,

      color:
        '#74c0fc'
    },


    repair: {

      name:
        'REPAIR NODE',

      cost:
        55,

      radius:
        23,

      hp:
        105,

      heal:
        10,

      charges:
        5,

      pulseMs:
        4700,

      color:
        '#69db7c'
    }

  },


  placement: {

    edgePadding:
      58,

    overlapPadding:
      12
  },


  ending: {

    durationMs:
      2200
  }

};


// ============================================================
// STATE
// ============================================================

const GAME_STATE =
  Object.freeze({

    MENU:
      'menu',

    PLAYING:
      'playing',

    PAUSED:
      'paused',

    UPGRADE:
      'upgrade',

    BUILD:
      'build',

    ENDING:
      'ending',

    GAMEOVER:
      'gameover'

  });


const keys = {};


const mouse = {

  x:
    canvas.width / 2,

  y:
    canvas.height / 2,

  isDown:
    false

};


const core = {

  x:
    canvas.width / 2,

  y:
    canvas.height / 2,

  radius:
    CONFIG.core.radius,

  hp:
    CONFIG.core.maxHp,

  maxHp:
    CONFIG.core.maxHp,

  shield:
    CONFIG.core.maxShield,

  maxShield:
    CONFIG.core.maxShield,

  flashUntil:
    0
};


const player = {

  x:
    core.x,

  y:
    core.y + 125,

  radius:
    CONFIG.player.radius,

  hp:
    CONFIG.player.maxHp,

  maxHp:
    CONFIG.player.maxHp,

  lives:
    CONFIG.player.startLives,

  alive:
    true,

  respawnAt:
    0,

  invulnerableUntil:
    0,

  hurtFlashUntil:
    0,

  angle:
    -Math.PI / 2,

  dashUntil:
    0,

  dashCooldownUntil:
    0,

  dashX:
    0,

  dashY:
    -1,

  shieldCharges:
    0,

  rapidFireUntil:
    0
};


const runMods = {

  playerSpeed:
    1,

  dashCooldown:
    1,

  weaponDamage:
    1,

  fireRate:
    1,

  bulletSpeed:
    1,

  multishot:
    0,

  pierce:
    0,

  critChance:
    0,

  critMultiplier:
    2,

  chainChance:
    0,

  dataMultiplier:
    1,

  pickupBonus:
    0,

  coreDamageMultiplier:
    1,

  turretDamage:
    1,

  defenseHp:
    1,

  slowMultiplier:
    1,

  repairAmount:
    1,

  repairChargeBonus:
    0
};


let gameState =
  GAME_STATE.MENU;

let gameTime =
  0;

let lastFrameTimestamp =
  performance.now();

let runStartedAtReal =
  0;


let score =
  0;

let dataCurrency =
  0;

let wave =
  1;

let currentWavePlan =
  null;

let waveState =
  'idle';

let waveQueue =
  [];

let pendingSpawns =
  [];

let lastSpawnAt =
  0;

let waveBannerUntil =
  0;

let waveClearUntil =
  0;

let waveClearMessage =
  '';


let bullets =
  [];

let enemies =
  [];

let enemyProjectiles =
  [];

let particles =
  [];

let floatingTexts =
  [];

let pickups =
  [];

let structures =
  [];

let beams =
  [];

let boss =
  null;

let pendingBossAt =
  0;


let comboStreak =
  0;

let comboMultiplier =
  1;

let comboExpiresAt =
  0;

let bestComboMultiplier =
  1;


let lastShotAt =
  -Infinity;

let muzzleFlashUntil =
  0;

let screenShake =
  0;


let selectedBuildType =
  null;

let selectedStructureId =
  null;

let buildEndsAtReal =
  0;

let nextEntityId =
  1;


let endingStartedAtReal =
  0;

let endingReason =
  '';

let endingResultShown =
  false;

let lastStandActive =
  false;


const stats = {

  kills:
    0,

  elites:
    0,

  bosses:
    0,

  structuresBuilt:
    0,

  coreDamageTaken:
    0,

  dataCollected:
    0
};


// ============================================================
// AUDIO
// ============================================================

let audioCtx =
  null;


function ensureAudio() {

  const AudioContextClass =
    window.AudioContext ||
    window.webkitAudioContext;


  if (!AudioContextClass) {
    return;
  }


  if (!audioCtx) {

    audioCtx =
      new AudioContextClass();
  }


  if (
    audioCtx.state ===
    'suspended'
  ) {

    audioCtx
      .resume()
      .catch(
        () => {}
      );
  }
}


function tone(
  frequency,
  durationMs,
  type = 'sine',
  volume = 0.022,
  endFrequency = frequency
) {

  if (!audioCtx) {
    return;
  }


  const now =
    audioCtx.currentTime;


  const oscillator =
    audioCtx.createOscillator();


  const gain =
    audioCtx.createGain();


  oscillator.type =
    type;


  oscillator.frequency
    .setValueAtTime(
      frequency,
      now
    );


  oscillator.frequency
    .exponentialRampToValueAtTime(
      Math.max(
        30,
        endFrequency
      ),
      now +
      durationMs /
      1000
    );


  gain.gain
    .setValueAtTime(
      volume,
      now
    );


  gain.gain
    .exponentialRampToValueAtTime(
      0.0001,
      now +
      durationMs /
      1000
    );


  oscillator.connect(
    gain
  );


  gain.connect(
    audioCtx.destination
  );


  oscillator.start(
    now
  );


  oscillator.stop(
    now +
    durationMs /
    1000
  );
}


const sfx = {

  shoot:
    () =>
      tone(
        520,
        55,
        'square',
        0.012,
        310
      ),


  hit:
    () =>
      tone(
        180,
        70,
        'square',
        0.014,
        100
      ),


  kill:
    () =>
      tone(
        260,
        90,
        'sawtooth',
        0.015,
        520
      ),


  hurt:
    () =>
      tone(
        120,
        150,
        'sawtooth',
        0.03,
        55
      ),


  pickup:
    () =>
      tone(
        460,
        130,
        'sine',
        0.022,
        900
      ),


  dash:
    () =>
      tone(
        280,
        110,
        'sawtooth',
        0.015,
        120
      ),


  boss:
    () =>
      tone(
        85,
        520,
        'sawtooth',
        0.042,
        48
      ),


  build:
    () =>
      tone(
        410,
        100,
        'square',
        0.012,
        650
      ),


  upgrade:
    () =>
      tone(
        520,
        200,
        'sine',
        0.02,
        980
      )

};


// ============================================================
// INPUT
// ============================================================

window.addEventListener(
  'keydown',
  event => {

    ensureAudio();


    if (
      event.code ===
      'Escape'
    ) {

      event.preventDefault();


      if (
        gameState ===
          GAME_STATE.BUILD &&
        (
          selectedBuildType ||
          selectedStructureId
        )
      ) {

        clearBuildSelection();

        return;
      }


      togglePause();

      return;
    }


    if (
      event.code ===
      'Space'
    ) {

      event.preventDefault();


      if (!event.repeat) {
        tryDash();
      }
    }


    keys[
      event.key.toLowerCase()
    ] =
      true;
  }
);


window.addEventListener(
  'keyup',
  event => {

    keys[
      event.key.toLowerCase()
    ] =
      false;
  }
);


canvas.addEventListener(
  'mousemove',
  event => {

    const rect =
      canvas.getBoundingClientRect();


    mouse.x =
      (
        event.clientX -
        rect.left
      ) *
      (
        canvas.width /
        rect.width
      );


    mouse.y =
      (
        event.clientY -
        rect.top
      ) *
      (
        canvas.height /
        rect.height
      );
  }
);


canvas.addEventListener(
  'mousedown',
  event => {

    ensureAudio();


    if (
      gameState ===
        GAME_STATE.BUILD &&
      event.button === 0
    ) {

      handleBuildCanvasClick();

      return;
    }


    if (
      event.button !== 0 ||
      gameState !==
        GAME_STATE.PLAYING ||
      !player.alive
    ) {

      return;
    }


    mouse.isDown =
      true;


    shoot();


    lastShotAt =
      gameTime;
  }
);


window.addEventListener(
  'mouseup',
  event => {

    if (
      event.button === 0
    ) {

      mouse.isDown =
        false;
    }
  }
);


canvas.addEventListener(
  'mouseleave',
  () => {

    mouse.isDown =
      false;
  }
);


window.addEventListener(
  'blur',
  () => {

    mouse.isDown =
      false;
  }
);


canvas.addEventListener(
  'contextmenu',
  event => {

    event.preventDefault();


    if (
      gameState ===
      GAME_STATE.BUILD
    ) {

      clearBuildSelection();
    }
  }
);


function togglePause() {

  if (
    gameState ===
    GAME_STATE.PLAYING
  ) {

    gameState =
      GAME_STATE.PAUSED;


    mouse.isDown =
      false;


    pausePanel
      .classList
      .remove(
        'hidden'
      );


    return;
  }


  if (
    gameState ===
    GAME_STATE.PAUSED
  ) {

    gameState =
      GAME_STATE.PLAYING;


    pausePanel
      .classList
      .add(
        'hidden'
      );
  }
}


// ============================================================
// PLAYER
// ============================================================

function tryDash() {

  if (
    gameState !==
      GAME_STATE.PLAYING ||
    !player.alive ||
    gameTime <
      player.dashCooldownUntil
  ) {

    return;
  }


  let dx =
    0;

  let dy =
    0;


  if (keys.w) {
    dy -= 1;
  }

  if (keys.s) {
    dy += 1;
  }

  if (keys.a) {
    dx -= 1;
  }

  if (keys.d) {
    dx += 1;
  }


  if (
    dx === 0 &&
    dy === 0
  ) {

    dx =
      Math.cos(
        player.angle
      );


    dy =
      Math.sin(
        player.angle
      );
  }


  const length =
    Math.hypot(
      dx,
      dy
    ) || 1;


  player.dashX =
    dx /
    length;


  player.dashY =
    dy /
    length;


  player.dashUntil =
    gameTime +
    CONFIG.player
      .dashDurationMs;


  player.dashCooldownUntil =
    gameTime +
    CONFIG.player
      .dashCooldownMs *
    runMods
      .dashCooldown;


  player.invulnerableUntil =
    Math.max(
      player.invulnerableUntil,
      player.dashUntil
    );


  screenShake =
    Math.max(
      screenShake,
      3
    );


  sfx.dash();
}


function updatePlayer(
  dt
) {

  if (!player.alive) {

    if (
      gameTime >=
        player.respawnAt &&
      gameState ===
        GAME_STATE.PLAYING
    ) {

      respawnPlayer();
    }


    return;
  }


  player.angle =
    Math.atan2(
      mouse.y -
      player.y,
      mouse.x -
      player.x
    );


  if (
    gameTime <
    player.dashUntil
  ) {

    player.x +=
      player.dashX *
      CONFIG.player
        .dashSpeed *
      dt;


    player.y +=
      player.dashY *
      CONFIG.player
        .dashSpeed *
      dt;


    if (
      Math.random() <
      0.65
    ) {

      createParticle(
        player.x,
        player.y,

        -player.dashX *
        random(
          60,
          140
        ),

        -player.dashY *
        random(
          60,
          140
        ),

        '#63e6ff',

        random(
          2,
          5
        ),

        random(
          180,
          300
        )
      );
    }

  } else {

    let moveX =
      0;

    let moveY =
      0;


    if (keys.w) {
      moveY -= 1;
    }

    if (keys.s) {
      moveY += 1;
    }

    if (keys.a) {
      moveX -= 1;
    }

    if (keys.d) {
      moveX += 1;
    }


    if (
      moveX ||
      moveY
    ) {

      const length =
        Math.hypot(
          moveX,
          moveY
        );


      const speed =
        CONFIG.player
          .speed *
        runMods
          .playerSpeed;


      player.x +=
        moveX /
        length *
        speed *
        dt;


      player.y +=
        moveY /
        length *
        speed *
        dt;
    }
  }


  player.x =
    clamp(
      player.x,
      player.radius,
      canvas.width -
      player.radius
    );


  player.y =
    clamp(
      player.y,
      player.radius,
      canvas.height -
      player.radius
    );
}


function damagePlayer(
  amount
) {

  if (
    gameState !==
      GAME_STATE.PLAYING ||
    !player.alive ||
    gameTime <
      player.invulnerableUntil
  ) {

    return false;
  }


  if (
    player.shieldCharges >
    0
  ) {

    player.shieldCharges--;


    player.invulnerableUntil =
      gameTime +
      320;


    addFloatingText(
      player.x,
      player.y - 30,
      'SHIELD BLOCK',
      '#74c0fc'
    );


    burstAt(
      player.x,
      player.y,
      '#74c0fc',
      14,
      2.8
    );


    tone(
      700,
      140,
      'sine',
      0.022,
      280
    );


    return true;
  }


  player.hp =
    Math.max(
      0,
      player.hp -
      amount
    );


  player.hurtFlashUntil =
    gameTime +
    180;


  player.invulnerableUntil =
    gameTime +
    CONFIG.player
      .hitInvulnerabilityMs;


  screenShake =
    Math.max(
      screenShake,
      9
    );


  addFloatingText(
    player.x,
    player.y - 28,
    `-${Math.round(amount)} HP`,
    '#ff8787'
  );


  sfx.hurt();


  if (
    player.hp <= 0
  ) {

    handlePlayerDeath();
  }


  return true;
}


function handlePlayerDeath() {

  if (!player.alive) {
    return;
  }


  player.lives--;


  player.alive =
    false;


  mouse.isDown =
    false;


  burstAt(
    player.x,
    player.y,
    '#63e6ff',
    32,
    4.7
  );


  screenShake =
    14;


  if (
    player.lives <=
    0
  ) {

    startEnding(
      'DEFENDER PROCESS TERMINATED'
    );

    return;
  }


  player.respawnAt =
    gameTime +
    CONFIG.player
      .respawnMs;


  addFloatingText(
    core.x,
    core.y + 85,
    `RESPAWN IN ${
      (
        CONFIG.player
          .respawnMs /
        1000
      ).toFixed(0)
    }s`,
    '#9befff'
  );
}


function respawnPlayer() {

  player.alive =
    true;


  player.hp =
    player.maxHp;


  player.x =
    clamp(
      core.x,
      player.radius,
      canvas.width -
      player.radius
    );


  player.y =
    clamp(
      core.y + 125,
      player.radius,
      canvas.height -
      player.radius
    );


  player.invulnerableUntil =
    gameTime +
    CONFIG.player
      .respawnInvulnerabilityMs;


  player.hurtFlashUntil =
    gameTime +
    450;


  burstAt(
    player.x,
    player.y,
    '#63e6ff',
    22,
    3.4
  );


  tone(
    330,
    220,
    'sine',
    0.02,
    760
  );
}


function drawPlayer() {

  if (!player.alive) {
    return;
  }


  ctx.save();


  ctx.translate(
    player.x,
    player.y
  );


  ctx.rotate(
    player.angle
  );


  if (
    player.shieldCharges >
    0
  ) {

    ctx.beginPath();


    ctx.arc(
      0,
      0,
      player.radius + 11,
      0,
      Math.PI * 2
    );


    ctx.strokeStyle =
      'rgba(116,192,252,.9)';


    ctx.lineWidth =
      3;


    ctx.shadowColor =
      '#74c0fc';


    ctx.shadowBlur =
      14;


    ctx.stroke();
  }


  if (
    gameTime <
    player.invulnerableUntil
  ) {

    ctx.globalAlpha =
      0.58 +
      Math.sin(
        performance.now() *
        .03
      ) *
      .28;
  }


  ctx.beginPath();


  ctx.arc(
    0,
    0,
    player.radius + 6,
    0,
    Math.PI * 2
  );


  ctx.strokeStyle =
    'rgba(99,230,255,.28)';


  ctx.lineWidth =
    2;


  ctx.stroke();


  ctx.fillStyle =
    '#8af3ff';


  ctx.fillRect(
    7,
    -5,
    28,
    10
  );


  ctx.fillStyle =
    '#d8fbff';


  ctx.fillRect(
    25,
    -3,
    12,
    6
  );


  ctx.beginPath();


  ctx.arc(
    0,
    0,
    player.radius,
    0,
    Math.PI * 2
  );


  ctx.fillStyle =
    gameTime <
    player.hurtFlashUntil

      ? '#ffffff'

      : '#23c7e6';


  ctx.shadowColor =
    '#52e8ff';


  ctx.shadowBlur =
    18;


  ctx.fill();


  ctx.beginPath();


  ctx.arc(
    0,
    0,
    7,
    0,
    Math.PI * 2
  );


  ctx.fillStyle =
    '#ecfdff';


  ctx.fill();


  if (
    gameTime <
    muzzleFlashUntil
  ) {

    ctx.beginPath();


    ctx.moveTo(
      38,
      0
    );


    ctx.lineTo(
      50,
      -7
    );


    ctx.lineTo(
      46,
      0
    );


    ctx.lineTo(
      50,
      7
    );


    ctx.closePath();


    ctx.fillStyle =
      '#ffe066';


    ctx.shadowColor =
      '#ffe066';


    ctx.shadowBlur =
      20;


    ctx.fill();
  }


  ctx.restore();
}


function drawRespawnStatus() {

  if (
    player.alive ||
    gameState !==
      GAME_STATE.PLAYING
  ) {

    return;
  }


  const seconds =
    Math.max(
      0,
      (
        player.respawnAt -
        gameTime
      ) /
      1000
    );


  ctx.save();


  ctx.textAlign =
    'center';


  ctx.font =
    'bold 24px monospace';


  ctx.fillStyle =
    '#b8f6ff';


  ctx.shadowColor =
    '#63e6ff';


  ctx.shadowBlur =
    14;


  ctx.fillText(
    `DEFENDER REBOOT ${seconds.toFixed(1)}s`,
    canvas.width / 2,
    canvas.height - 60
  );


  ctx.restore();
}


// ============================================================
// CORE
// ============================================================

function damageCore(
  rawAmount
) {

  if (
    gameState !==
      GAME_STATE.PLAYING ||
    core.hp <=
      0
  ) {

    return;
  }


  let amount =
    rawAmount *
    runMods
      .coreDamageMultiplier;


  core.flashUntil =
    gameTime +
    180;


  if (
    core.shield >
    0
  ) {

    const absorbed =
      Math.min(
        core.shield,
        amount
      );


    core.shield -=
      absorbed;


    amount -=
      absorbed;


    burstAt(
      core.x,
      core.y,
      '#74c0fc',
      8,
      2.2
    );
  }


  if (
    amount >
    0
  ) {

    core.hp =
      Math.max(
        0,
        core.hp -
        amount
      );


    stats.coreDamageTaken +=
      amount;


    addFloatingText(
      core.x,
      core.y - 52,
      `-${Math.round(amount)} CORE`,
      '#ff8787'
    );


    screenShake =
      Math.max(
        screenShake,
        8
      );


    sfx.hurt();
  }


  const criticalNow =
    core.hp >
      0 &&
    core.hp /
      core.maxHp <=
      CONFIG.core
        .criticalRatio;


  if (
    criticalNow &&
    !lastStandActive
  ) {

    lastStandActive =
      true;


    addFloatingText(
      core.x,
      core.y - 80,
      'LAST STAND',
      '#ff4d6d'
    );


    tone(
      160,
      500,
      'sawtooth',
      0.034,
      70
    );
  }


  if (
    core.hp <=
    0
  ) {

    startEnding(
      'CORE BREACHED'
    );
  }
}


function healCore(
  amount
) {

  if (
    core.hp <=
    0
  ) {

    return 0;
  }


  const before =
    core.hp;


  core.hp =
    Math.min(
      core.maxHp,
      core.hp +
      amount
    );


  const healed =
    core.hp -
    before;


  if (
    healed >
    0
  ) {

    addFloatingText(
      core.x,
      core.y - 50,
      `+${Math.round(healed)} CORE`,
      '#69db7c'
    );
  }


  if (
    core.hp /
    core.maxHp >
    CONFIG.core
      .criticalRatio
  ) {

    lastStandActive =
      false;
  }


  return healed;
}


function drawCore() {

  const visualTime =
    performance.now();


  ctx.save();


  ctx.translate(
    core.x,
    core.y
  );


  if (
    core.shield >
    0
  ) {

    const ratio =
      core.shield /
      core.maxShield;


    ctx.beginPath();


    ctx.arc(
      0,
      0,

      core.radius +
      15 +
      Math.sin(
        visualTime *
        .004
      ) *
      3,

      0,
      Math.PI * 2
    );


    ctx.strokeStyle =
      `rgba(116,192,252,${
        0.25 +
        ratio *
        0.55
      })`;


    ctx.lineWidth =
      4;


    ctx.shadowColor =
      '#74c0fc';


    ctx.shadowBlur =
      18;


    ctx.stroke();
  }


  ctx.rotate(
    visualTime *
    0.00025
  );


  drawPolygon(
    0,
    0,
    core.radius + 8,
    6,
    'rgba(99,230,255,.18)',
    true
  );


  ctx.rotate(
    -visualTime *
    0.0005
  );


  drawPolygon(
    0,
    0,
    core.radius,
    6,

    gameTime <
    core.flashUntil

      ? '#ffffff'

      : '#1c8ca6',

    false
  );


  ctx.beginPath();


  ctx.arc(
    0,
    0,

    18 +
    Math.sin(
      visualTime *
      .006
    ) *
    2,

    0,
    Math.PI * 2
  );


  ctx.fillStyle =
    lastStandActive

      ? '#ff4d6d'

      : '#63e6ff';


  ctx.shadowColor =
    lastStandActive

      ? '#ff4d6d'

      : '#63e6ff';


  ctx.shadowBlur =
    24;


  ctx.fill();


  ctx.beginPath();


  ctx.arc(
    0,
    0,
    7,
    0,
    Math.PI * 2
  );


  ctx.fillStyle =
    '#f1fdff';


  ctx.fill();


  ctx.restore();
}


// ============================================================
// PLAYER WEAPON
// ============================================================

function currentFireInterval() {

  let interval =
    CONFIG.weapon
      .fireIntervalMs *
    runMods
      .fireRate;


  if (
    gameTime <
    player.rapidFireUntil
  ) {

    interval *=
      CONFIG.weapon
        .rapidFireMultiplier;
  }


  return interval;
}


function shoot() {

  if (
    gameState !==
      GAME_STATE.PLAYING ||
    !player.alive
  ) {

    return;
  }


  const baseAngle =
    Math.atan2(
      mouse.y -
      player.y,

      mouse.x -
      player.x
    );


  const total =
    1 +
    runMods.multishot;


  const spreadStep =
    0.09;


  for (
    let i = 0;
    i < total;
    i++
  ) {

    const centered =
      i -
      (
        total -
        1
      ) /
      2;


    const angle =
      baseAngle +
      centered *
      spreadStep;


    const muzzle =
      34;


    const startX =
      player.x +
      Math.cos(
        angle
      ) *
      muzzle;


    const startY =
      player.y +
      Math.sin(
        angle
      ) *
      muzzle;


    const crit =
      Math.random() <
      runMods
        .critChance;


    bullets.push({

      id:
        nextEntityId++,

      owner:
        'player',

      x:
        startX,

      y:
        startY,

      prevX:
        startX,

      prevY:
        startY,

      vx:
        Math.cos(
          angle
        ) *
        CONFIG.weapon
          .bulletSpeed *
        runMods
          .bulletSpeed,

      vy:
        Math.sin(
          angle
        ) *
        CONFIG.weapon
          .bulletSpeed *
        runMods
          .bulletSpeed,

      radius:
        CONFIG.weapon
          .bulletRadius,

      damage:
        CONFIG.weapon
          .damage *
        runMods
          .weaponDamage *
        (
          crit
            ? runMods
                .critMultiplier
            : 1
        ),

      crit,

      remainingPierce:
        runMods.pierce,

      hitIds:
        new Set(),

      color:
        crit

          ? '#ff922b'

          : gameTime <
            player.rapidFireUntil

            ? '#69db7c'

            : '#ffe066',

      expiresAt:
        gameTime +
        CONFIG.weapon
          .bulletLifeMs

    });
  }


  muzzleFlashUntil =
    gameTime +
    55;


  sfx.shoot();
}


function handleShooting() {

  if (
    !mouse.isDown ||
    gameState !==
      GAME_STATE.PLAYING ||
    !player.alive
  ) {

    return;
  }


  if (
    gameTime -
    lastShotAt >=
    currentFireInterval()
  ) {

    shoot();


    lastShotAt =
      gameTime;
  }
}


function updateBullets(
  dt
) {

  for (
    const bullet
    of bullets
  ) {

    bullet.prevX =
      bullet.x;


    bullet.prevY =
      bullet.y;


    bullet.x +=
      bullet.vx *
      dt;


    bullet.y +=
      bullet.vy *
      dt;
  }


  bullets =
    bullets.filter(
      bullet =>

        gameTime <
          bullet.expiresAt &&

        bullet.x >
          -60 &&

        bullet.x <
          canvas.width +
          60 &&

        bullet.y >
          -60 &&

        bullet.y <
          canvas.height +
          60
    );
}


function drawBullets() {

  ctx.save();


  for (
    const bullet
    of bullets
  ) {

    ctx.beginPath();


    ctx.moveTo(
      bullet.prevX,
      bullet.prevY
    );


    ctx.lineTo(
      bullet.x,
      bullet.y
    );


    ctx.strokeStyle =
      bullet.color;


    ctx.lineWidth =
      bullet.owner ===
      'turret'

        ? 3

        : 4;


    ctx.lineCap =
      'round';


    ctx.shadowColor =
      bullet.color;


    ctx.shadowBlur =
      11;


    ctx.stroke();


    ctx.beginPath();


    ctx.arc(
      bullet.x,
      bullet.y,
      bullet.radius,
      0,
      Math.PI * 2
    );


    ctx.fillStyle =
      '#fff';


    ctx.fill();
  }


  ctx.restore();
}


// ============================================================
// WAVE GENERATION
// ============================================================

function isBossWave(
  number = wave
) {

  return (
    number %
    CONFIG.waves
      .bossEvery ===
    0
  );
}


function waveTotal(
  number
) {

  return Math.min(
    CONFIG.waves
      .maxRegularEnemies,

    CONFIG.waves
      .baseEnemies +
    (
      number -
      1
    ) *
    CONFIG.waves
      .perWave
  );
}


function generateWavePlan(
  number
) {

  if (
    isBossWave(
      number
    )
  ) {

    return {

      wave:
        number,

      boss:
        true,

      archetype:
        'BOSS SIGNAL',

      counts:
        {},

      eliteChance:
        Math.min(
          0.12,
          number *
          0.004
        )

    };
  }


  let archetype =
    'STANDARD ATTACK';


  const available =
    [
      'STANDARD ATTACK'
    ];


  if (
    number >=
    3
  ) {

    available.push(
      'SWARM WAVE',
      'ARMORED ASSAULT'
    );
  }


  if (
    number >=
    4
  ) {

    available.push(
      'RANGED ATTACK'
    );
  }


  if (
    number >=
    6
  ) {

    available.push(
      'SIEGE WAVE'
    );
  }


  if (
    number >=
    8
  ) {

    available.push(
      'ELITE WAVE'
    );
  }


  archetype =
    available[
      Math.floor(
        Math.random() *
        available.length
      )
    ];


  let total =
    waveTotal(
      number
    );


  let eliteChance =
    Math.min(
      0.06 +
      number *
      0.007,
      0.22
    );


  let weights = {

    virus:
      .48,

    runner:
      .22,

    tank:
      .14,

    shooter:
      .10,

    sapper:
      .06

  };


  if (
    number ===
    1
  ) {

    weights = {

      virus:
        1,

      runner:
        0,

      tank:
        0,

      shooter:
        0,

      sapper:
        0
    };

  } else if (
    number ===
    2
  ) {

    weights = {

      virus:
        .72,

      runner:
        .28,

      tank:
        0,

      shooter:
        0,

      sapper:
        0
    };

  } else if (
    archetype ===
    'SWARM WAVE'
  ) {

    total =
      Math.round(
        total *
        1.22
      );


    weights = {

      virus:
        .62,

      runner:
        .38,

      tank:
        0,

      shooter:
        0,

      sapper:
        0
    };

  } else if (
    archetype ===
    'ARMORED ASSAULT'
  ) {

    weights = {

      virus:
        .38,

      runner:
        .16,

      tank:
        .38,

      shooter:
        .08,

      sapper:
        0
    };

  } else if (
    archetype ===
    'RANGED ATTACK'
  ) {

    weights = {

      virus:
        .34,

      runner:
        .16,

      tank:
        .12,

      shooter:
        .38,

      sapper:
        0
    };

  } else if (
    archetype ===
    'SIEGE WAVE'
  ) {

    weights = {

      virus:
        .25,

      runner:
        .10,

      tank:
        .24,

      shooter:
        .14,

      sapper:
        .27
    };

  } else if (
    archetype ===
    'ELITE WAVE'
  ) {

    total =
      Math.max(
        8,
        Math.round(
          total *
          .68
        )
      );


    eliteChance =
      Math.min(
        .48,
        .28 +
        number *
        .01
      );


    weights = {

      virus:
        .34,

      runner:
        .18,

      tank:
        .20,

      shooter:
        .16,

      sapper:
        .12
    };
  }


  if (
    number <
    4
  ) {

    weights.shooter =
      0;
  }


  if (
    number <
    6
  ) {

    weights.sapper =
      0;
  }


  const counts =
    allocateCounts(
      total,
      weights
    );


  return {

    wave:
      number,

    boss:
      false,

    archetype,

    counts,

    eliteChance

  };
}


function allocateCounts(
  total,
  weights
) {

  const entries =
    Object
      .entries(
        weights
      )
      .filter(
        (
          [
            ,
            weight
          ]
        ) =>
          weight >
          0
      );


  const weightTotal =
    entries.reduce(
      (
        sum,
        [
          ,
          weight
        ]
      ) =>
        sum +
        weight,
      0
    ) || 1;


  const counts =
    {};


  let assigned =
    0;


  for (
    let i = 0;
    i < entries.length;
    i++
  ) {

    const [
      type,
      weight
    ] =
      entries[i];


    const normalized =
      weight /
      weightTotal;


    const count =
      i ===
      entries.length -
      1

        ? total -
          assigned

        : Math.floor(
            total *
            normalized
          );


    counts[type] =
      Math.max(
        0,
        count
      );


    assigned +=
      counts[type];
  }


  return counts;
}


function makeWaveQueue(
  plan
) {

  const queue =
    [];


  for (
    const [
      type,
      count
    ]
    of Object.entries(
      plan.counts
    )
  ) {

    for (
      let i = 0;
      i < count;
      i++
    ) {

      queue.push(
        type
      );
    }
  }


  shuffle(
    queue
  );


  return queue;
}


function beginWaveCombat() {

  gameState =
    GAME_STATE.PLAYING;


  waveState =
    'active';


  buildPanel
    .classList
    .add(
      'hidden'
    );


  upgradePanel
    .classList
    .add(
      'hidden'
    );


  clearBuildSelection();


  waveBannerUntil =
    gameTime +
    1600;


  waveClearUntil =
    0;


  waveClearMessage =
    '';


  if (!currentWavePlan) {

    currentWavePlan =
      generateWavePlan(
        wave
      );
  }


  if (
    currentWavePlan.boss
  ) {

    waveQueue =
      [];


    pendingBossAt =
      gameTime +
      1300;

  } else {

    waveQueue =
      makeWaveQueue(
        currentWavePlan
      );


    pendingBossAt =
      0;


    lastSpawnAt =
      gameTime -
      spawnIntervalForWave() +
      250;
  }


  tone(
    360,
    160,
    'sine',
    0.017,
    520
  );
}


function spawnIntervalForWave() {

  return Math.max(

    CONFIG.waves
      .minSpawnIntervalMs,

    CONFIG.waves
      .baseSpawnIntervalMs -
    (
      wave -
      1
    ) *
    34
  );
}


function updateWaveSystem() {

  if (
    waveState ===
    'cleared'
  ) {

    if (
      gameTime >=
      waveClearUntil
    ) {

      enterUpgradeState();
    }


    return;
  }


  updatePendingSpawns();


  if (
    currentWavePlan?.boss
  ) {

    if (
      !boss &&
      pendingBossAt &&
      gameTime >=
        pendingBossAt
    ) {

      pendingBossAt =
        0;


      spawnBoss();
    }


    if (
      !boss &&
      !pendingBossAt &&
      enemies.length ===
        0 &&
      pendingSpawns.length ===
        0 &&
      waveState ===
        'active'
    ) {

      finishWave();
    }


    return;
  }


  if (
    waveQueue.length >
      0 &&
    gameTime -
      lastSpawnAt >=
      spawnIntervalForWave()
  ) {

    queueEnemySpawn(
      waveQueue.shift()
    );


    lastSpawnAt =
      gameTime;
  }


  if (
    waveQueue.length ===
      0 &&
    pendingSpawns.length ===
      0 &&
    enemies.length ===
      0 &&
    waveState ===
      'active'
  ) {

    finishWave();
  }
}


function queueEnemySpawn(
  type
) {

  const point =
    createSpawnPoint();


  pendingSpawns.push({

    ...point,

    type,

    elite:
      Math.random() <
      (
        currentWavePlan
          ?.eliteChance ||
        0
      ),

    createdAt:
      gameTime,

    readyAt:
      gameTime +
      CONFIG.waves
        .spawnWarningMs

  });
}


function updatePendingSpawns() {

  for (
    let i =
      pendingSpawns.length -
      1;

    i >=
    0;

    i--
  ) {

    if (
      gameTime >=
      pendingSpawns[i]
        .readyAt
    ) {

      spawnEnemy(
        pendingSpawns[i]
      );


      pendingSpawns.splice(
        i,
        1
      );
    }
  }
}


function finishWave() {

  if (
    waveState !==
      'active' ||
    gameState !==
      GAME_STATE.PLAYING
  ) {

    return;
  }


  waveState =
    'cleared';


  mouse.isDown =
    false;


  waveClearUntil =
    gameTime +
    CONFIG.waves
      .clearDisplayMs;


  const shieldGain =
    Math.min(

      CONFIG.core
        .shieldRechargePerWave,

      core.maxShield -
      core.shield
    );


  core.shield +=
    shieldGain;


  const clearData =
    12 +
    wave *
    3;


  dataCurrency +=
    clearData;


  stats.dataCollected +=
    clearData;


  waveClearMessage =
    `${
      shieldGain >
      0

        ? `CORE SHIELD +${Math.round(shieldGain)}`

        : 'CORE SHIELD FULL'
    } · DATA +${clearData}`;


  tone(
    520,
    220,
    'sine',
    0.02,
    860
  );
}


function enterUpgradeState() {

  if (
    gameState !==
    GAME_STATE.PLAYING
  ) {

    return;
  }


  gameState =
    GAME_STATE.UPGRADE;


  mouse.isDown =
    false;


  showUpgradeChoices();
}


function enterBuildState() {

  wave++;


  currentWavePlan =
    generateWavePlan(
      wave
    );


  gameState =
    GAME_STATE.BUILD;


  waveState =
    'prepare';


  buildEndsAtReal =
    performance.now() +
    CONFIG.waves
      .buildSeconds *
    1000;


  buildPanel
    .classList
    .remove(
      'hidden'
    );


  renderThreatPreview();


  updateBuildUi();
}


function startNextWaveFromBuild() {

  if (
    gameState !==
    GAME_STATE.BUILD
  ) {

    return;
  }


  beginWaveCombat();
}


function getThreatCount() {

  if (
    currentWavePlan?.boss
  ) {

    return (
      boss ||
      pendingBossAt

        ? 1

        : 0
    ) +
    enemies.length +
    pendingSpawns.length;
  }


  return (
    waveQueue.length +
    pendingSpawns.length +
    enemies.length
  );
}


function createSpawnPoint() {

  const side =
    Math.floor(
      Math.random() *
      4
    );


  const margin =
    45;


  if (
    side === 0
  ) {

    const x =
      random(
        45,
        canvas.width -
        45
      );


    return {

      spawnX:
        x,

      spawnY:
        -margin,

      warningX:
        x,

      warningY:
        22,

      warningAngle:
        Math.PI / 2

    };
  }


  if (
    side === 1
  ) {

    const y =
      random(
        45,
        canvas.height -
        45
      );


    return {

      spawnX:
        canvas.width +
        margin,

      spawnY:
        y,

      warningX:
        canvas.width -
        22,

      warningY:
        y,

      warningAngle:
        Math.PI

    };
  }


  if (
    side === 2
  ) {

    const x =
      random(
        45,
        canvas.width -
        45
      );


    return {

      spawnX:
        x,

      spawnY:
        canvas.height +
        margin,

      warningX:
        x,

      warningY:
        canvas.height -
        22,

      warningAngle:
        -Math.PI /
        2

    };
  }


  const y =
    random(
      45,
      canvas.height -
      45
    );


  return {

    spawnX:
      -margin,

    spawnY:
      y,

    warningX:
      22,

    warningY:
      y,

    warningAngle:
      0

  };
}


// ============================================================
// ENEMIES + TARGETING
// ============================================================

function spawnEnemy(
  spawnData
) {

  const base =
    CONFIG.enemies[
      spawnData.type
    ];


  const hpScale =
    1 +
    Math.min(
      .8,
      (
        wave -
        1
      ) *
      .025
    );


  const speedScale =
    1 +
    Math.min(
      .45,
      (
        wave -
        1
      ) *
      .018
    );


  const enemy = {

    id:
      nextEntityId++,

    type:
      spawnData.type,

    x:
      spawnData.spawnX,

    y:
      spawnData.spawnY,

    radius:
      base.radius,

    speed:
      base.speed *
      speedScale,

    hp:
      Math.max(
        1,
        base.hp *
        hpScale
      ),

    maxHp:
      Math.max(
        1,
        base.hp *
        hpScale
      ),

    damage:
      base.damage,

    reward:
      base.score,

    dataReward:
      base.data,

    hitFlashUntil:
      0,

    rotation:
      random(
        0,
        Math.PI * 2
      ),

    spin:
      random(
        -2.2,
        2.2
      ),

    strafeDir:
      Math.random() <
      .5

        ? -1

        : 1,

    nextAttackAt:
      gameTime +
      random(
        300,
        800
      ),

    elite:
      spawnData.elite ||
      false,

    eliteType:
      null,

    shieldHits:
      0

  };


  if (
    enemy.elite
  ) {

    applyEliteModifier(
      enemy
    );
  }


  enemies.push(
    enemy
  );
}


function spawnEnemyInsideArena(
  type,
  x,
  y,
  eliteChance = 0
) {

  spawnEnemy({

    type,

    spawnX:
      clamp(
        x,
        30,
        canvas.width -
        30
      ),

    spawnY:
      clamp(
        y,
        30,
        canvas.height -
        30
      ),

    elite:
      Math.random() <
      eliteChance

  });
}


function applyEliteModifier(
  enemy
) {

  const types =
    [
      'overclocked',
      'armored',
      'shielded',
      'berserk'
    ];


  enemy.eliteType =
    types[
      Math.floor(
        Math.random() *
        types.length
      )
    ];


  enemy.hp *=
    CONFIG.elite
      .hpMultiplier;


  enemy.maxHp =
    enemy.hp;


  enemy.reward *=
    CONFIG.elite
      .scoreMultiplier;


  enemy.dataReward *=
    CONFIG.elite
      .dataMultiplier;


  if (
    enemy.eliteType ===
    'overclocked'
  ) {

    enemy.speed *=
      CONFIG.elite
        .speedMultiplier;
  }


  if (
    enemy.eliteType ===
    'armored'
  ) {

    enemy.hp *=
      1.45;


    enemy.maxHp =
      enemy.hp;
  }


  if (
    enemy.eliteType ===
    'shielded'
  ) {

    enemy.shieldHits =
      CONFIG.elite
        .shieldHits;
  }
}


function getEnemyTarget(
  enemy
) {

  const aliveStructures =
    structures.filter(
      structure =>
        structure.hp >
        0
    );


  if (
    enemy.type ===
      'sapper' ||
    enemy.type ===
      'tank'
  ) {

    const target =
      nearestEntity(
        enemy.x,
        enemy.y,
        aliveStructures
      );


    if (target) {

      return {

        kind:
          'structure',

        entity:
          target

      };
    }


    return {

      kind:
        'core',

      entity:
        core

    };
  }


  if (
    enemy.type ===
    'shooter'
  ) {

    if (
      player.alive &&
      distance(
        enemy,
        player
      ) <
      450
    ) {

      return {

        kind:
          'player',

        entity:
          player

      };
    }


    return {

      kind:
        'core',

      entity:
        core

    };
  }


  const blockingFirewall =
    nearestEntity(

      enemy.x,
      enemy.y,

      aliveStructures.filter(
        structure =>
          structure.type ===
          'firewall'
      )

    );


  if (
    blockingFirewall &&
    distance(
      enemy,
      blockingFirewall
    ) <
    175 &&
    distance(
      enemy,
      blockingFirewall
    ) <
    distance(
      enemy,
      core
    )
  ) {

    return {

      kind:
        'structure',

      entity:
        blockingFirewall

    };
  }


  return {

    kind:
      'core',

    entity:
      core

  };
}


function enemySpeedMultiplier(
  enemy
) {

  let multiplier =
    1;


  for (
    const structure
    of structures
  ) {

    if (
      structure.type ===
        'slow' &&
      structure.hp >
        0 &&
      distance(
        enemy,
        structure
      ) <=
      structure.effectRange
    ) {

      multiplier =
        Math.min(
          multiplier,
          structure.slowAmount
        );
    }
  }


  if (
    enemy.eliteType ===
      'berserk' &&
    enemy.hp /
    enemy.maxHp <
    .5
  ) {

    multiplier *=
      1.45;
  }


  return multiplier;
}


function updateEnemies(
  dt
) {

  for (
    const enemy
    of enemies
  ) {

    const target =
      getEnemyTarget(
        enemy
      );


    if (
      !target?.entity
    ) {

      continue;
    }


    const tx =
      target.entity.x;


    const ty =
      target.entity.y;


    const dx =
      tx -
      enemy.x;


    const dy =
      ty -
      enemy.y;


    const dist =
      Math.hypot(
        dx,
        dy
      ) || 1;


    const angle =
      Math.atan2(
        dy,
        dx
      );


    const targetRadius =
      target.entity.radius ||
      20;


    const touching =
      dist <=
      enemy.radius +
      targetRadius +
      3;


    if (
      enemy.type ===
      'shooter'
    ) {

      const desiredRange =
        CONFIG.enemies
          .shooter
          .range;


      let direction =
        0;


      if (
        dist >
        desiredRange +
        35
      ) {

        direction =
          1;

      } else if (
        dist <
        desiredRange -
        35
      ) {

        direction =
          -.8;
      }


      const moveSpeed =
        enemy.speed *
        enemySpeedMultiplier(
          enemy
        );


      enemy.x +=
        Math.cos(
          angle
        ) *
        moveSpeed *
        direction *
        dt;


      enemy.y +=
        Math.sin(
          angle
        ) *
        moveSpeed *
        direction *
        dt;


      enemy.x +=
        Math.cos(
          angle +
          Math.PI /
          2
        ) *
        moveSpeed *
        .24 *
        enemy.strafeDir *
        dt;


      enemy.y +=
        Math.sin(
          angle +
          Math.PI /
          2
        ) *
        moveSpeed *
        .24 *
        enemy.strafeDir *
        dt;


      if (
        gameTime >=
        enemy.nextAttackAt
      ) {

        fireEnemyProjectile(

          enemy.x,
          enemy.y,

          angle,

          CONFIG.enemies
            .shooter
            .projectileSpeed,

          enemy.damage,

          '#4dabf7',

          5
        );


        enemy.nextAttackAt =
          gameTime +
          CONFIG.enemies
            .shooter
            .attackMs *
          Math.max(
            .65,
            1 -
            wave *
            .012
          ) +
          random(
            0,
            220
          );
      }

    } else if (
      !touching
    ) {

      const moveSpeed =
        enemy.speed *
        enemySpeedMultiplier(
          enemy
        );


      enemy.x +=
        Math.cos(
          angle
        ) *
        moveSpeed *
        dt;


      enemy.y +=
        Math.sin(
          angle
        ) *
        moveSpeed *
        dt;

    } else if (
      gameTime >=
      enemy.nextAttackAt
    ) {

      if (
        target.kind ===
        'core'
      ) {

        damageCore(
          enemy.damage
        );

      } else if (
        target.kind ===
        'player'
      ) {

        damagePlayer(
          enemy.damage
        );

      } else {

        damageStructure(
          target.entity,
          enemy.damage
        );
      }


      enemy.nextAttackAt =
        gameTime +
        CONFIG.enemies[
          enemy.type
        ].attackMs;


      if (
        enemy.type ===
          'virus' ||
        enemy.type ===
          'runner'
      ) {

        enemy.hp =
          0;


        createExplosion(
          enemy
        );

      } else {

        screenShake =
          Math.max(
            screenShake,
            3
          );
      }
    }


    enemy.rotation +=
      enemy.spin *
      dt;
  }


  enemies =
    enemies.filter(
      enemy =>
        enemy.hp >
        0
    );
}


function fireEnemyProjectile(
  x,
  y,
  angle,
  speed,
  damage,
  color = '#ff8787',
  radius = CONFIG.enemyProjectile.radius
) {

  enemyProjectiles.push({

    id:
      nextEntityId++,

    x,

    y,

    vx:
      Math.cos(
        angle
      ) *
      speed,

    vy:
      Math.sin(
        angle
      ) *
      speed,

    damage,

    radius,

    color,

    expiresAt:
      gameTime +
      CONFIG.enemyProjectile
        .lifeMs

  });
}


function updateEnemyProjectiles(
  dt
) {

  for (
    const projectile
    of enemyProjectiles
  ) {

    projectile.x +=
      projectile.vx *
      dt;


    projectile.y +=
      projectile.vy *
      dt;
  }


  enemyProjectiles =
    enemyProjectiles.filter(
      projectile =>

        gameTime <
          projectile.expiresAt &&

        projectile.x >
          -90 &&

        projectile.x <
          canvas.width +
          90 &&

        projectile.y >
          -90 &&

        projectile.y <
          canvas.height +
          90
    );
}


function drawEnemyProjectiles() {

  ctx.save();


  for (
    const projectile
    of enemyProjectiles
  ) {

    ctx.beginPath();


    ctx.arc(
      projectile.x,
      projectile.y,
      projectile.radius,
      0,
      Math.PI * 2
    );


    ctx.fillStyle =
      projectile.color;


    ctx.shadowColor =
      projectile.color;


    ctx.shadowBlur =
      14;


    ctx.fill();
  }


  ctx.restore();
}


function drawEnemy(
  enemy
) {

  ctx.save();


  ctx.translate(
    enemy.x,
    enemy.y
  );


  ctx.rotate(
    enemy.rotation
  );


  const baseColor =
    CONFIG.enemies[
      enemy.type
    ].color;


  const color =
    gameTime <
    enemy.hitFlashUntil

      ? '#ffffff'

      : baseColor;


  if (
    enemy.elite
  ) {

    ctx.beginPath();


    ctx.arc(
      0,
      0,

      enemy.radius +
      8 +
      Math.sin(
        performance.now() *
        .01
      ) *
      2,

      0,
      Math.PI * 2
    );


    ctx.strokeStyle =
      enemy.eliteType ===
      'shielded'

        ? '#74c0fc'

        : '#ffd43b';


    ctx.lineWidth =
      3;


    ctx.shadowColor =
      ctx.strokeStyle;


    ctx.shadowBlur =
      12;


    ctx.stroke();
  }


  if (
    enemy.type ===
    'runner'
  ) {

    ctx.beginPath();


    ctx.moveTo(
      enemy.radius + 5,
      0
    );


    ctx.lineTo(
      -enemy.radius,
      -enemy.radius * .8
    );


    ctx.lineTo(
      -enemy.radius * .42,
      0
    );


    ctx.lineTo(
      -enemy.radius,
      enemy.radius * .8
    );


    ctx.closePath();


    ctx.fillStyle =
      color;


    ctx.shadowColor =
      baseColor;


    ctx.shadowBlur =
      14;


    ctx.fill();

  } else if (
    enemy.type ===
    'shooter'
  ) {

    ctx.fillStyle =
      color;


    ctx.shadowColor =
      baseColor;


    ctx.shadowBlur =
      16;


    ctx.fillRect(
      -enemy.radius * .72,
      -enemy.radius * .72,
      enemy.radius * 1.44,
      enemy.radius * 1.44
    );


    ctx.beginPath();


    ctx.arc(
      0,
      0,
      5,
      0,
      Math.PI * 2
    );


    ctx.fillStyle =
      '#d0ebff';


    ctx.fill();

  } else if (
    enemy.type ===
    'sapper'
  ) {

    drawPolygon(
      0,
      0,
      enemy.radius,
      5,
      color,
      false
    );


    ctx.beginPath();


    ctx.moveTo(
      -5,
      -8
    );


    ctx.lineTo(
      7,
      0
    );


    ctx.lineTo(
      -5,
      8
    );


    ctx.closePath();


    ctx.fillStyle =
      '#0b3d1b';


    ctx.fill();

  } else {

    drawStarShape(
      0,
      0,

      enemy.radius,

      enemy.radius *
      (
        enemy.type ===
        'tank'

          ? .72

          : .68
      ),

      enemy.type ===
      'tank'

        ? 8

        : 12,

      color
    );
  }


  if (
    enemy.shieldHits >
    0
  ) {

    ctx.beginPath();


    ctx.arc(
      0,
      0,
      enemy.radius + 5,
      0,
      Math.PI * 2
    );


    ctx.strokeStyle =
      '#74c0fc';


    ctx.lineWidth =
      2;


    ctx.stroke();
  }


  ctx.restore();


  if (
    enemy.maxHp >
      1 &&
    enemy.hp <
      enemy.maxHp
  ) {

    drawSmallHpBar(
      enemy.x,

      enemy.y -
      enemy.radius -
      12,

      42,

      enemy.hp /
      enemy.maxHp,

      baseColor
    );
  }
}


function drawEnemies() {

  for (
    const enemy
    of enemies
  ) {

    drawEnemy(
      enemy
    );
  }
}


// ============================================================
// BOSS
// ============================================================

function spawnBoss() {

  const tier =
    Math.max(
      1,
      Math.floor(
        wave /
        CONFIG.waves
          .bossEvery
      )
    );


  const maxHp =
    CONFIG.boss
      .baseHp +
    Math.min(
      CONFIG.boss
        .hpTierCap,
      tier -
      1
    ) *
    CONFIG.boss
      .hpPerTier;


  boss = {

    id:
      nextEntityId++,

    x:
      canvas.width / 2,

    y:
      90,

    radius:
      CONFIG.boss
        .radius,

    hp:
      maxHp,

    maxHp,

    phase:
      1,

    rotation:
      0,

    hitFlashUntil:
      0,

    nextShotAt:
      gameTime +
      700,

    nextRadialAt:
      gameTime +
      2100,

    nextChargeAt:
      gameTime +
      3300,

    nextSummonAt:
      gameTime +
      3700,

    mode:
      'hunt',

    modeUntil:
      0,

    chargeX:
      0,

    chargeY:
      0,

    chargeTargetX:
      core.x,

    chargeTargetY:
      core.y,

    contactCooldownUntil:
      0

  };


  screenShake =
    15;


  burstAt(
    boss.x,
    boss.y,
    '#ff4d6d',
    38,
    5
  );


  sfx.boss();
}


function updateBoss(
  dt
) {

  if (!boss) {
    return;
  }


  const ratio =
    boss.hp /
    boss.maxHp;


  boss.phase =
    ratio >
    .66

      ? 1

      : ratio >
        .33

        ? 2

        : 3;


  boss.rotation +=
    dt *
    (
      boss.phase ===
      3

        ? 1.5

        : .9
    );


  if (
    boss.mode ===
    'chargeWarning'
  ) {

    if (
      gameTime >=
      boss.modeUntil
    ) {

      const dx =
        boss.chargeTargetX -
        boss.x;


      const dy =
        boss.chargeTargetY -
        boss.y;


      const len =
        Math.hypot(
          dx,
          dy
        ) || 1;


      boss.chargeX =
        dx /
        len;


      boss.chargeY =
        dy /
        len;


      boss.mode =
        'charge';


      boss.modeUntil =
        gameTime +
        CONFIG.boss
          .chargeDurationMs;


      screenShake =
        Math.max(
          screenShake,
          7
        );
    }


    return;
  }


  if (
    boss.mode ===
    'charge'
  ) {

    boss.x +=
      boss.chargeX *
      CONFIG.boss
        .chargeSpeed *
      dt;


    boss.y +=
      boss.chargeY *
      CONFIG.boss
        .chargeSpeed *
      dt;


    if (
      Math.random() <
      .7
    ) {

      createParticle(
        boss.x,
        boss.y,

        -boss.chargeX *
        random(
          60,
          150
        ),

        -boss.chargeY *
        random(
          60,
          150
        ),

        '#ff6b81',

        random(
          3,
          6
        ),

        random(
          220,
          360
        )
      );
    }


    handleBossContact();


    if (
      gameTime >=
      boss.modeUntil
    ) {

      boss.mode =
        'hunt';


      boss.nextChargeAt =
        gameTime +
        CONFIG.boss
          .chargeMs *
        (
          boss.phase ===
          3

            ? .75

            : 1
        );
    }


    clampBoss();


    return;
  }


  let target =
    core;


  if (
    boss.phase ===
      1 &&
    player.alive
  ) {

    target =
      player;
  }


  if (
    boss.phase ===
    3
  ) {

    target =
      nearestEntity(
        boss.x,
        boss.y,
        structures
      ) ||
      core;
  }


  const dx =
    target.x -
    boss.x;


  const dy =
    target.y -
    boss.y;


  const dist =
    Math.hypot(
      dx,
      dy
    ) || 1;


  const angle =
    Math.atan2(
      dy,
      dx
    );


  const speed =
    CONFIG.boss
      .speed *
    (
      1 +
      (
        boss.phase -
        1
      ) *
      .12
    );


  if (
    dist >
    230
  ) {

    boss.x +=
      Math.cos(
        angle
      ) *
      speed *
      dt;


    boss.y +=
      Math.sin(
        angle
      ) *
      speed *
      dt;

  } else {

    boss.x +=
      Math.cos(
        angle +
        Math.PI /
        2
      ) *
      speed *
      .42 *
      dt;


    boss.y +=
      Math.sin(
        angle +
        Math.PI /
        2
      ) *
      speed *
      .42 *
      dt;
  }


  if (
    gameTime >=
    boss.nextShotAt
  ) {

    const aimTarget =
      boss.phase ===
        1 &&
      player.alive

        ? player

        : core;


    const aim =
      Math.atan2(
        aimTarget.y -
        boss.y,

        aimTarget.x -
        boss.x
      );


    const spreads =
      boss.phase ===
      3

        ? [
            -.2,
            -.1,
            0,
            .1,
            .2
          ]

        : [
            -.12,
            0,
            .12
          ];


    for (
      const spread
      of spreads
    ) {

      fireEnemyProjectile(
        boss.x,
        boss.y,

        aim +
        spread,

        CONFIG.boss
          .projectileSpeed,

        boss.phase ===
        3

          ? 13

          : 11,

        '#ff6b81',

        7
      );
    }


    boss.nextShotAt =
      gameTime +
      CONFIG.boss
        .shotMs *
      (
        boss.phase ===
        3

          ? .68

          : 1
      );
  }


  if (
    gameTime >=
    boss.nextRadialAt
  ) {

    const count =
      boss.phase ===
      3

        ? 18

        : 12;


    for (
      let i = 0;
      i < count;
      i++
    ) {

      const shotAngle =
        boss.rotation +
        Math.PI *
        2 *
        i /
        count;


      fireEnemyProjectile(
        boss.x,
        boss.y,

        shotAngle,

        CONFIG.boss
          .projectileSpeed *
        .78,

        9,

        '#c77dff',

        6
      );
    }


    boss.nextRadialAt =
      gameTime +
      CONFIG.boss
        .radialMs *
      (
        boss.phase ===
        3

          ? .78

          : 1
      );


    screenShake =
      Math.max(
        screenShake,
        5
      );
  }


  if (
    gameTime >=
    boss.nextChargeAt
  ) {

    const chargeTarget =
      boss.phase ===
      3

        ? (
            nearestEntity(
              boss.x,
              boss.y,
              structures
            ) ||
            core
          )

        : core;


    boss.mode =
      'chargeWarning';


    boss.modeUntil =
      gameTime +
      CONFIG.boss
        .chargeWarningMs;


    boss.chargeTargetX =
      chargeTarget.x;


    boss.chargeTargetY =
      chargeTarget.y;


    tone(
      160,
      300,
      'sawtooth',
      0.027,
      90
    );
  }


  if (
    boss.phase >=
      2 &&
    gameTime >=
      boss.nextSummonAt
  ) {

    const summonCount =
      boss.phase ===
      3

        ? 4

        : 2;


    for (
      let i = 0;
      i < summonCount;
      i++
    ) {

      const angle2 =
        Math.PI *
        2 *
        i /
        summonCount;


      spawnEnemyInsideArena(

        Math.random() <
        .55

          ? 'runner'

          : 'virus',

        boss.x +
        Math.cos(
          angle2
        ) *
        70,

        boss.y +
        Math.sin(
          angle2
        ) *
        70,

        .12
      );
    }


    boss.nextSummonAt =
      gameTime +
      CONFIG.boss
        .summonMs;
  }


  handleBossContact();


  clampBoss();
}


function handleBossContact() {

  if (
    !boss ||
    gameTime <
    boss.contactCooldownUntil
  ) {

    return;
  }


  if (
    player.alive &&
    distance(
      boss,
      player
    ) <=
    boss.radius +
    player.radius
  ) {

    damagePlayer(
      CONFIG.boss
        .contactDamage
    );


    boss.contactCooldownUntil =
      gameTime +
      650;


    return;
  }


  if (
    distance(
      boss,
      core
    ) <=
    boss.radius +
    core.radius
  ) {

    damageCore(
      CONFIG.boss
        .contactDamage
    );


    boss.contactCooldownUntil =
      gameTime +
      650;


    return;
  }


  const structure =
    structures.find(
      structure =>
        structure.hp >
          0 &&
        distance(
          boss,
          structure
        ) <=
        boss.radius +
        structure.radius
    );


  if (structure) {

    damageStructure(
      structure,
      CONFIG.boss
        .contactDamage *
      1.25
    );


    boss.contactCooldownUntil =
      gameTime +
      650;
  }
}


function clampBoss() {

  if (!boss) {
    return;
  }


  boss.x =
    clamp(
      boss.x,
      boss.radius,
      canvas.width -
      boss.radius
    );


  boss.y =
    clamp(
      boss.y,
      boss.radius,
      canvas.height -
      boss.radius
    );
}


function drawBoss() {

  if (!boss) {
    return;
  }


  ctx.save();


  ctx.translate(
    boss.x,
    boss.y
  );


  ctx.rotate(
    boss.rotation
  );


  const color =
    gameTime <
    boss.hitFlashUntil

      ? '#ffffff'

      : '#ff4d6d';


  ctx.beginPath();


  ctx.arc(
    0,
    0,

    boss.radius +
    11 +
    Math.sin(
      performance.now() *
      .006
    ) *
    4,

    0,
    Math.PI * 2
  );


  ctx.strokeStyle =
    'rgba(199,125,255,.65)';


  ctx.lineWidth =
    4;


  ctx.shadowColor =
    '#c77dff';


  ctx.shadowBlur =
    25;


  ctx.stroke();


  drawStarShape(
    0,
    0,
    boss.radius,
    boss.radius * .7,
    16,
    color
  );


  ctx.beginPath();


  ctx.arc(
    0,
    0,
    16,
    0,
    Math.PI * 2
  );


  ctx.fillStyle =
    '#2b0a3d';


  ctx.fill();


  ctx.beginPath();


  ctx.arc(
    0,
    0,
    7,
    0,
    Math.PI * 2
  );


  ctx.fillStyle =
    '#f8f0fc';


  ctx.fill();


  ctx.restore();


  if (
    boss.mode ===
    'chargeWarning'
  ) {

    ctx.save();


    ctx.setLineDash(
      [
        10,
        8
      ]
    );


    ctx.beginPath();


    ctx.moveTo(
      boss.x,
      boss.y
    );


    ctx.lineTo(
      boss.chargeTargetX,
      boss.chargeTargetY
    );


    ctx.strokeStyle =
      'rgba(255,77,109,.8)';


    ctx.lineWidth =
      3;


    ctx.shadowColor =
      '#ff4d6d';


    ctx.shadowBlur =
      12;


    ctx.stroke();


    ctx.restore();
  }
}


function killBoss() {

  if (!boss) {
    return;
  }


  const deathX =
    boss.x;


  const deathY =
    boss.y;


  burstAt(
    deathX,
    deathY,
    '#ff4d6d',
    60,
    6
  );


  burstAt(
    deathX,
    deathY,
    '#c77dff',
    40,
    5
  );


  registerKill(
    CONFIG.boss
      .score,

    CONFIG.boss
      .data,

    deathX,

    deathY -
    30,

    true,

    false
  );


  stats.bosses++;


  spawnPickup(
    deathX - 45,
    deathY,
    'core'
  );


  spawnPickup(
    deathX,
    deathY + 28,
    'rapid'
  );


  spawnPickup(
    deathX + 45,
    deathY,
    'shield'
  );


  screenShake =
    20;


  tone(
    95,
    650,
    'sawtooth',
    0.05,
    35
  );


  boss =
    null;
}


// ============================================================
// DEFENSES + BUILD PHASE
// ============================================================

function defenseCost(
  type
) {

  return CONFIG.defenses[
    type
  ].cost;
}


function createStructure(
  type,
  x,
  y
) {

  const base =
    CONFIG.defenses[
      type
    ];


  const maxHp =
    base.hp *
    runMods
      .defenseHp;


  return {

    id:
      nextEntityId++,

    type,

    x,

    y,

    radius:
      base.radius,

    level:
      1,

    hp:
      maxHp,

    maxHp,

    rotation:
      0,

    nextActionAt:
      gameTime +
      random(
        200,
        700
      ),

    effectRange:
      type ===
      'slow'

        ? base.range

        : 0,

    slowAmount:
      type ===
      'slow'

        ? base.slow *
          runMods
            .slowMultiplier

        : 1,

    repairCharges:
      type ===
      'repair'

        ? base.charges +
          runMods
            .repairChargeBonus

        : 0

  };
}


function handleBuildCanvasClick() {

  if (
    selectedBuildType
  ) {

    const cost =
      defenseCost(
        selectedBuildType
      );


    const check =
      canPlaceStructure(
        selectedBuildType,
        mouse.x,
        mouse.y
      );


    if (!check.ok) {

      buildHint.textContent =
        check.reason;


      tone(
        120,
        80,
        'square',
        0.012,
        80
      );


      return;
    }


    if (
      dataCurrency <
      cost
    ) {

      buildHint.textContent =
        'Not enough DATA.';


      tone(
        120,
        80,
        'square',
        0.012,
        80
      );


      return;
    }


    dataCurrency -=
      cost;


    structures.push(
      createStructure(
        selectedBuildType,
        mouse.x,
        mouse.y
      )
    );


    stats.structuresBuilt++;


    sfx.build();


    burstAt(
      mouse.x,
      mouse.y,

      CONFIG.defenses[
        selectedBuildType
      ].color,

      14,
      2.4
    );


    updateBuildUi();


    return;
  }


  const clicked =
    structures

      .filter(
        structure =>
          structure.hp >
          0
      )

      .sort(
        (
          a,
          b
        ) =>
          distancePoint(
            mouse.x,
            mouse.y,
            a.x,
            a.y
          ) -
          distancePoint(
            mouse.x,
            mouse.y,
            b.x,
            b.y
          )
      )[0];


  if (
    clicked &&
    distancePoint(
      mouse.x,
      mouse.y,
      clicked.x,
      clicked.y
    ) <=
    clicked.radius +
    12
  ) {

    selectedStructureId =
      clicked.id;


    buildHint.textContent =
      `${
        CONFIG.defenses[
          clicked.type
        ].name
      } selected - Level ${clicked.level}.`;

  } else {

    selectedStructureId =
      null;


    buildHint.textContent =
      'Select a defense, then click the arena to place it.';
  }


  updateBuildUi();
}


function canPlaceStructure(
  type,
  x,
  y
) {

  const radius =
    CONFIG.defenses[
      type
    ].radius;


  const pad =
    CONFIG.placement
      .edgePadding;


  if (
    x <
      pad +
      radius ||
    x >
      canvas.width -
      pad -
      radius ||
    y <
      pad +
      radius ||
    y >
      canvas.height -
      pad -
      radius
  ) {

    return {

      ok:
        false,

      reason:
        'Too close to the arena edge.'

    };
  }


  if (
    distancePoint(
      x,
      y,
      core.x,
      core.y
    ) <
    CONFIG.core
      .noBuildRadius +
    radius
  ) {

    return {

      ok:
        false,

      reason:
        'Core safety zone - build farther away.'

    };
  }


  for (
    const structure
    of structures
  ) {

    if (
      structure.hp <=
      0
    ) {

      continue;
    }


    if (
      distancePoint(
        x,
        y,
        structure.x,
        structure.y
      ) <
      radius +
      structure.radius +
      CONFIG.placement
        .overlapPadding
    ) {

      return {

        ok:
          false,

        reason:
          'Defense overlaps another structure.'

      };
    }
  }


  return {

    ok:
      true,

    reason:
      ''

  };
}


function selectBuildType(
  type
) {

  if (
    gameState !==
    GAME_STATE.BUILD
  ) {

    return;
  }


  selectedBuildType =
    selectedBuildType ===
    type

      ? null

      : type;


  selectedStructureId =
    null;


  buildHint.textContent =
    selectedBuildType

      ? `${
          CONFIG.defenses[
            type
          ].name
        }: click a green location to place.`

      : 'Select a defense, then click the arena to place it.';


  updateBuildUi();
}


function clearBuildSelection() {

  selectedBuildType =
    null;


  selectedStructureId =
    null;


  buildButtons.forEach(
    button =>
      button
        .classList
        .remove(
          'selected'
        )
  );


  if (buildHint) {

    buildHint.textContent =
      'Select a defense, then click the arena to place it.';
  }


  if (
    upgradeStructureBtn
  ) {

    upgradeStructureBtn.disabled =
      true;
  }
}


function selectedStructure() {

  return (
    structures.find(
      structure =>
        structure.id ===
          selectedStructureId &&
        structure.hp >
          0
    ) ||
    null
  );
}


function structureUpgradeCost(
  structure
) {

  const base =
    CONFIG.defenses[
      structure.type
    ].cost;


  return Math.round(
    base *
    (
      .7 +
      structure.level *
      .45
    )
  );
}


function upgradeSelectedStructure() {

  const structure =
    selectedStructure();


  if (
    !structure ||
    structure.level >=
      3
  ) {

    return;
  }


  const cost =
    structureUpgradeCost(
      structure
    );


  if (
    dataCurrency <
    cost
  ) {

    buildHint.textContent =
      'Not enough DATA to upgrade this defense.';


    return;
  }


  dataCurrency -=
    cost;


  structure.level++;


  const oldMax =
    structure.maxHp;


  structure.maxHp *=
    1.32;


  structure.hp =
    Math.min(
      structure.maxHp,

      structure.hp +
      (
        structure.maxHp -
        oldMax
      ) +
      structure.maxHp *
      .15
    );


  if (
    structure.type ===
    'slow'
  ) {

    structure.effectRange *=
      1.12;


    structure.slowAmount =
      Math.max(
        .3,
        structure.slowAmount *
        .9
      );
  }


  if (
    structure.type ===
    'repair'
  ) {

    structure.repairCharges +=
      2;
  }


  burstAt(
    structure.x,
    structure.y,

    CONFIG.defenses[
      structure.type
    ].color,

    18,
    2.6
  );


  sfx.upgrade();


  buildHint.textContent =
    `${
      CONFIG.defenses[
        structure.type
      ].name
    } upgraded to Level ${structure.level}.`;


  updateBuildUi();
}


function updateStructures(
  dt
) {

  for (
    const structure
    of structures
  ) {

    if (
      structure.hp <=
      0
    ) {

      continue;
    }


    structure.rotation +=
      dt *
      .8;


    if (
      structure.type ===
        'turret' &&
      gameTime >=
        structure.nextActionAt
    ) {

      const targets =
        [
          ...enemies
        ];


      if (boss) {

        targets.push(
          boss
        );
      }


      const target =
        nearestEntity(

          structure.x,
          structure.y,

          targets.filter(
            target =>
              distancePoint(
                structure.x,
                structure.y,
                target.x,
                target.y
              ) <=
              CONFIG.defenses
                .turret
                .range *
              (
                1 +
                (
                  structure.level -
                  1
                ) *
                .08
              )
          )

        );


      if (target) {

        const angle =
          Math.atan2(
            target.y -
            structure.y,

            target.x -
            structure.x
          );


        bullets.push({

          id:
            nextEntityId++,

          owner:
            'turret',

          x:
            structure.x,

          y:
            structure.y,

          prevX:
            structure.x,

          prevY:
            structure.y,

          vx:
            Math.cos(
              angle
            ) *
            700,

          vy:
            Math.sin(
              angle
            ) *
            700,

          radius:
            3,

          damage:
            CONFIG.defenses
              .turret
              .damage *
            runMods
              .turretDamage *
            (
              1 +
              (
                structure.level -
                1
              ) *
              .28
            ),

          crit:
            false,

          remainingPierce:
            0,

          hitIds:
            new Set(),

          color:
            '#63e6ff',

          expiresAt:
            gameTime +
            1200

        });


        structure.nextActionAt =
          gameTime +
          CONFIG.defenses
            .turret
            .fireMs *
          Math.pow(
            .88,
            structure.level -
            1
          );
      }
    }


    if (
      structure.type ===
        'repair' &&
      structure.repairCharges >
        0 &&
      gameTime >=
        structure.nextActionAt &&
      core.hp <
        core.maxHp
    ) {

      const heal =
        CONFIG.defenses
          .repair
          .heal *
        runMods
          .repairAmount *
        (
          1 +
          (
            structure.level -
            1
          ) *
          .35
        );


      healCore(
        heal
      );


      structure.repairCharges--;


      structure.nextActionAt =
        gameTime +
        CONFIG.defenses
          .repair
          .pulseMs *
        Math.pow(
          .9,
          structure.level -
          1
        );


      burstAt(
        structure.x,
        structure.y,
        '#69db7c',
        10,
        1.7
      );
    }
  }


  structures =
    structures.filter(
      structure =>
        structure.hp >
        0
    );
}


function damageStructure(
  structure,
  amount
) {

  if (
    !structure ||
    structure.hp <=
    0
  ) {

    return;
  }


  structure.hp =
    Math.max(
      0,
      structure.hp -
      amount
    );


  addFloatingText(
    structure.x,

    structure.y -
    structure.radius -
    8,

    `-${Math.round(amount)}`,

    '#ff8787'
  );


  if (
    structure.hp <=
    0
  ) {

    burstAt(
      structure.x,
      structure.y,

      CONFIG.defenses[
        structure.type
      ].color,

      24,
      3.8
    );


    if (
      selectedStructureId ===
      structure.id
    ) {

      selectedStructureId =
        null;
    }
  }
}


function drawStructures() {

  for (
    const structure
    of structures
  ) {

    const base =
      CONFIG.defenses[
        structure.type
      ];


    ctx.save();


    ctx.translate(
      structure.x,
      structure.y
    );


    if (
      structure.type ===
      'slow'
    ) {

      ctx.beginPath();


      ctx.arc(
        0,
        0,
        structure.effectRange,
        0,
        Math.PI * 2
      );


      ctx.fillStyle =
        'rgba(116,192,252,.055)';


      ctx.strokeStyle =
        'rgba(116,192,252,.25)';


      ctx.lineWidth =
        2;


      ctx.fill();


      ctx.stroke();
    }


    ctx.rotate(
      structure.rotation
    );


    if (
      structure.type ===
      'turret'
    ) {

      drawPolygon(
        0,
        0,
        structure.radius,
        6,
        base.color,
        false
      );


      ctx.fillStyle =
        '#dffaff';


      ctx.fillRect(
        4,
        -3,
        21,
        6
      );

    } else if (
      structure.type ===
      'firewall'
    ) {

      drawPolygon(
        0,
        0,
        structure.radius,
        6,
        base.color,
        false
      );


      ctx.strokeStyle =
        '#ffe3e8';


      ctx.lineWidth =
        3;


      ctx.strokeRect(
        -13,
        -13,
        26,
        26
      );

    } else if (
      structure.type ===
      'slow'
    ) {

      ctx.beginPath();


      ctx.arc(
        0,
        0,
        structure.radius,
        0,
        Math.PI * 2
      );


      ctx.fillStyle =
        base.color;


      ctx.shadowColor =
        base.color;


      ctx.shadowBlur =
        14;


      ctx.fill();

    } else {

      drawPolygon(
        0,
        0,
        structure.radius,
        4,
        base.color,
        false
      );


      ctx.fillStyle =
        '#0d3d20';


      ctx.fillRect(
        -3,
        -11,
        6,
        22
      );


      ctx.fillRect(
        -11,
        -3,
        22,
        6
      );
    }


    ctx.restore();


    drawSmallHpBar(
      structure.x,

      structure.y -
      structure.radius -
      10,

      40,

      structure.hp /
      structure.maxHp,

      base.color
    );


    if (
      structure.type ===
      'repair'
    ) {

      ctx.save();


      ctx.font =
        'bold 10px monospace';


      ctx.textAlign =
        'center';


      ctx.fillStyle =
        '#b2f2bb';


      ctx.fillText(
        `${structure.repairCharges}`,
        structure.x,
        structure.y +
        structure.radius +
        15
      );


      ctx.restore();
    }


    if (
      gameState ===
        GAME_STATE.BUILD &&
      selectedStructureId ===
        structure.id
    ) {

      ctx.save();


      ctx.beginPath();


      ctx.arc(
        structure.x,
        structure.y,
        structure.radius + 8,
        0,
        Math.PI * 2
      );


      ctx.strokeStyle =
        '#ffe066';


      ctx.lineWidth =
        3;


      ctx.setLineDash(
        [
          7,
          5
        ]
      );


      ctx.stroke();


      ctx.restore();
    }
  }
}


function drawPlacementPreview() {

  if (
    gameState !==
      GAME_STATE.BUILD ||
    !selectedBuildType
  ) {

    return;
  }


  const base =
    CONFIG.defenses[
      selectedBuildType
    ];


  const check =
    canPlaceStructure(
      selectedBuildType,
      mouse.x,
      mouse.y
    );


  const color =
    check.ok &&
    dataCurrency >=
      base.cost

      ? '#69db7c'

      : '#ff6b6b';


  ctx.save();


  ctx.globalAlpha =
    .6;


  ctx.beginPath();


  ctx.arc(
    mouse.x,
    mouse.y,
    base.radius,
    0,
    Math.PI * 2
  );


  ctx.fillStyle =
    color;


  ctx.fill();


  ctx.beginPath();


  ctx.arc(
    mouse.x,
    mouse.y,
    base.radius + 5,
    0,
    Math.PI * 2
  );


  ctx.strokeStyle =
    color;


  ctx.lineWidth =
    2;


  ctx.stroke();


  if (
    selectedBuildType ===
    'slow'
  ) {

    ctx.beginPath();


    ctx.arc(
      mouse.x,
      mouse.y,
      base.range,
      0,
      Math.PI * 2
    );


    ctx.strokeStyle =
      'rgba(116,192,252,.45)';


    ctx.stroke();
  }


  ctx.restore();
}


function updateBuildPhase(
  timestamp
) {

  if (
    gameState !==
    GAME_STATE.BUILD
  ) {

    return;
  }


  const left =
    Math.max(
      0,
      buildEndsAtReal -
      timestamp
    );


  buildTimerText.textContent =
    `${
      (
        left /
        1000
      ).toFixed(1)
    }s`;


  if (
    left <=
    0
  ) {

    startNextWaveFromBuild();
  }
}


function renderThreatPreview() {

  nextWaveTitle.textContent =
    `WAVE ${wave}`;


  nextWaveArchetype.textContent =
    currentWavePlan
      .archetype;


  threatPreviewList.innerHTML =
    '';


  if (
    currentWavePlan.boss
  ) {

    const chip =
      document.createElement(
        'span'
      );


    chip.className =
      'threat-chip';


    chip.textContent =
      'BOSS x1';


    threatPreviewList
      .appendChild(
        chip
      );


    return;
  }


  for (
    const [
      type,
      count
    ]
    of Object.entries(
      currentWavePlan.counts
    )
  ) {

    if (!count) {
      continue;
    }


    const chip =
      document.createElement(
        'span'
      );


    chip.className =
      'threat-chip';


    chip.textContent =
      `${type.toUpperCase()} x${count}`;


    threatPreviewList
      .appendChild(
        chip
      );
  }


  if (
    currentWavePlan
      .eliteChance >=
    .2
  ) {

    const chip =
      document.createElement(
        'span'
      );


    chip.className =
      'threat-chip';


    chip.textContent =
      'ELITE RISK HIGH';


    threatPreviewList
      .appendChild(
        chip
      );
  }
}


function updateBuildUi() {

  if (!buildPanel) {
    return;
  }


  buildDataText.textContent =
    Math.floor(
      dataCurrency
    );


  for (
    const button
    of buildButtons
  ) {

    const type =
      button.dataset
        .build;


    button.classList.toggle(
      'selected',
      selectedBuildType ===
      type
    );


    button.disabled =
      dataCurrency <
      defenseCost(
        type
      );
  }


  const structure =
    selectedStructure();


  if (structure) {

    const maxed =
      structure.level >=
      3;


    const cost =
      maxed

        ? 0

        : structureUpgradeCost(
            structure
          );


    upgradeStructureBtn.disabled =
      maxed ||
      dataCurrency <
      cost;


    upgradeStructureBtn.textContent =
      maxed

        ? 'MAX LEVEL'

        : `UPGRADE L${structure.level + 1} - ${cost} DATA`;

  } else {

    upgradeStructureBtn.disabled =
      true;


    upgradeStructureBtn.textContent =
      'UPGRADE SELECTED';
  }
}


// ============================================================
// UPGRADES
// ============================================================

const UPGRADE_POOL = [

  {

    id:
      'damage',

    name:
      'HEAVY PACKETS',

    rarity:
      'COMMON',

    desc:
      '+25% player weapon damage.',

    valid:
      () => true,

    apply:
      () => {

        runMods.weaponDamage *=
          1.25;
      }

  },


  {

    id:
      'firerate',

    name:
      'OVERCLOCK',

    rarity:
      'COMMON',

    desc:
      '+15% fire rate.',

    valid:
      () =>
        runMods.fireRate >
        .48,

    apply:
      () => {

        runMods.fireRate *=
          .85;
      }

  },


  {

    id:
      'velocity',

    name:
      'VECTOR BOOST',

    rarity:
      'COMMON',

    desc:
      '+18% projectile speed.',

    valid:
      () => true,

    apply:
      () => {

        runMods.bulletSpeed *=
          1.18;
      }

  },


  {

    id:
      'speed',

    name:
      'MOBILITY PATCH',

    rarity:
      'COMMON',

    desc:
      '+10% movement speed.',

    valid:
      () =>
        runMods.playerSpeed <
        1.65,

    apply:
      () => {

        runMods.playerSpeed *=
          1.10;
      }

  },


  {

    id:
      'dash',

    name:
      'PHASE CACHE',

    rarity:
      'COMMON',

    desc:
      'Dash cooldown -15%.',

    valid:
      () =>
        runMods.dashCooldown >
        .52,

    apply:
      () => {

        runMods.dashCooldown *=
          .85;
      }

  },


  {

    id:
      'hp',

    name:
      'HARDENED PROCESS',

    rarity:
      'COMMON',

    desc:
      '+20% max Player HP and heal the gained amount.',

    valid:
      () =>
        player.maxHp <
        230,

    apply:
      () => {

        const add =
          player.maxHp *
          .20;


        player.maxHp +=
          add;


        player.hp =
          Math.min(
            player.maxHp,
            player.hp +
            add
          );
      }

  },


  {

    id:
      'crit',

    name:
      'CRITICAL ROUTING',

    rarity:
      'COMMON',

    desc:
      '+8% critical-hit chance.',

    valid:
      () =>
        runMods.critChance <
        .40,

    apply:
      () => {

        runMods.critChance +=
          .08;
      }

  },


  {

    id:
      'multi',

    name:
      'PACKET SPLITTER',

    rarity:
      'RARE',

    desc:
      '+1 projectile per shot with a small spread.',

    valid:
      () =>
        runMods.multishot <
        4,

    apply:
      () => {

        runMods.multishot++;
      }

  },


  {

    id:
      'pierce',

    name:
      'PIERCING PROTOCOL',

    rarity:
      'RARE',

    desc:
      'Bullets pierce +1 target.',

    valid:
      () =>
        runMods.pierce <
        3,

    apply:
      () => {

        runMods.pierce++;
      }

  },


  {

    id:
      'chain',

    name:
      'ELECTRIC FORK',

    rarity:
      'RARE',

    desc:
      '+15% chance for hits to chain damage to a nearby threat.',

    valid:
      () =>
        runMods.chainChance <
        .45,

    apply:
      () => {

        runMods.chainChance +=
          .15;
      }

  },


  {

    id:
      'life',

    name:
      'BACKUP PROCESS',

    rarity:
      'RARE',

    desc:
      '+1 life. Maximum 5 lives.',

    valid:
      () =>
        player.lives <
        CONFIG.player
          .maxLives,

    apply:
      () => {

        player.lives =
          Math.min(
            CONFIG.player
              .maxLives,

            player.lives +
            1
          );
      }

  },


  {

    id:
      'corehp',

    name:
      'CORE CAPACITY',

    rarity:
      'COMMON',

    desc:
      '+15% Core max HP and restore 10% of the new maximum.',

    valid:
      () =>
        core.maxHp <
        2300,

    apply:
      () => {

        core.maxHp *=
          1.15;


        core.hp =
          Math.min(
            core.maxHp,

            core.hp +
            core.maxHp *
            .10
          );
      }

  },


  {

    id:
      'coreshield',

    name:
      'SHIELD MATRIX',

    rarity:
      'COMMON',

    desc:
      '+25% Core max shield and refill the gained capacity.',

    valid:
      () =>
        core.maxShield <
        900,

    apply:
      () => {

        const old =
          core.maxShield;


        core.maxShield *=
          1.25;


        core.shield =
          Math.min(
            core.maxShield,

            core.shield +
            (
              core.maxShield -
              old
            )
          );
      }

  },


  {

    id:
      'armor',

    name:
      'CORE ARMOR',

    rarity:
      'RARE',

    desc:
      'Core takes 10% less HP damage.',

    valid:
      () =>
        runMods
          .coreDamageMultiplier >
        .60,

    apply:
      () => {

        runMods.coreDamageMultiplier *=
          .90;
      }

  },


  {

    id:
      'turret',

    name:
      'TURRET PROTOCOL',

    rarity:
      'COMMON',

    desc:
      '+25% Auto Turret damage.',

    valid:
      () => true,

    apply:
      () => {

        runMods.turretDamage *=
          1.25;
      }

  },


  {

    id:
      'fortify',

    name:
      'FORTIFICATION',

    rarity:
      'COMMON',

    desc:
      '+20% structure max HP, including existing defenses.',

    valid:
      () =>
        runMods.defenseHp <
        2.1,

    apply:
      () => {

        runMods.defenseHp *=
          1.20;


        for (
          const structure
          of structures
        ) {

          const old =
            structure.maxHp;


          structure.maxHp *=
            1.20;


          structure.hp +=
            structure.maxHp -
            old;
        }
      }

  },


  {

    id:
      'slow',

    name:
      'DEEP PACKET INSPECTION',

    rarity:
      'COMMON',

    desc:
      'Slow Fields reduce enemy speed more strongly.',

    valid:
      () =>
        runMods.slowMultiplier >
        .68,

    apply:
      () => {

        runMods.slowMultiplier *=
          .88;


        for (
          const structure
          of structures
        ) {

          if (
            structure.type ===
            'slow'
          ) {

            structure.slowAmount =
              Math.max(
                .3,
                structure.slowAmount *
                .88
              );
          }
        }
      }

  },


  {

    id:
      'repair',

    name:
      'NANOREPAIR',

    rarity:
      'COMMON',

    desc:
      '+25% Repair Node healing and +1 charge for new nodes.',

    valid:
      () => true,

    apply:
      () => {

        runMods.repairAmount *=
          1.25;


        runMods.repairChargeBonus++;
      }

  },


  {

    id:
      'data',

    name:
      'DATA MINER',

    rarity:
      'COMMON',

    desc:
      '+15% DATA from threat eliminations.',

    valid:
      () =>
        runMods.dataMultiplier <
        2,

    apply:
      () => {

        runMods.dataMultiplier *=
          1.15;
      }

  },


  {

    id:
      'salvage',

    name:
      'SALVAGE ROUTINE',

    rarity:
      'COMMON',

    desc:
      '+4% pickup drop chance.',

    valid:
      () =>
        runMods.pickupBonus <
        .20,

    apply:
      () => {

        runMods.pickupBonus +=
          .04;
      }

  }

];


function showUpgradeChoices() {

  upgradePanel
    .classList
    .remove(
      'hidden'
    );


  upgradeChoices.innerHTML =
    '';


  const available =
    UPGRADE_POOL.filter(
      upgrade =>
        upgrade.valid()
    );


  shuffle(
    available
  );


  const choices =
    available.slice(
      0,
      Math.min(
        3,
        available.length
      )
    );


  for (
    const upgrade
    of choices
  ) {

    const button =
      document.createElement(
        'button'
      );


    button.type =
      'button';


    button.className =
      `upgrade-card${
        upgrade.rarity ===
        'RARE'

          ? ' rare'

          : ''
      }`;


    button.innerHTML =
      `
        <span class="rarity">
          ${upgrade.rarity}
        </span>

        <strong>
          ${upgrade.name}
        </strong>

        <p>
          ${upgrade.desc}
        </p>
      `;


    button.addEventListener(
      'click',
      () =>
        chooseUpgrade(
          upgrade
        )
    );


    upgradeChoices
      .appendChild(
        button
      );
  }
}


function chooseUpgrade(
  upgrade
) {

  if (
    gameState !==
    GAME_STATE.UPGRADE
  ) {

    return;
  }


  upgrade.apply();


  sfx.upgrade();


  upgradePanel
    .classList
    .add(
      'hidden'
    );


  enterBuildState();
}


// ============================================================
// COMBAT COLLISIONS
// ============================================================

function checkCombatCollisions() {

  for (
    let bulletIndex =
      bullets.length -
      1;

    bulletIndex >=
    0;

    bulletIndex--
  ) {

    const bullet =
      bullets[
        bulletIndex
      ];


    let consumed =
      false;


    for (
      let enemyIndex =
        enemies.length -
        1;

      enemyIndex >=
      0;

      enemyIndex--
    ) {

      const enemy =
        enemies[
          enemyIndex
        ];


      if (
        bullet.hitIds.has(
          enemy.id
        )
      ) {

        continue;
      }


      if (
        distance(
          bullet,
          enemy
        ) >
        bullet.radius +
        enemy.radius
      ) {

        continue;
      }


      bullet.hitIds.add(
        enemy.id
      );


      damageEnemy(
        enemy,
        bullet.damage,
        bullet.crit,
        bullet.x,
        bullet.y
      );


      maybeChainLightning(
        enemy,
        bullet.damage *
        .65
      );


      if (
        bullet.remainingPierce >
        0
      ) {

        bullet.remainingPierce--;

      } else {

        consumed =
          true;
      }


      if (
        enemy.hp <=
        0
      ) {

        killEnemy(
          enemy,
          enemyIndex
        );
      }


      if (consumed) {
        break;
      }
    }


    if (
      !consumed &&
      boss &&
      !bullet.hitIds.has(
        boss.id
      ) &&
      distance(
        bullet,
        boss
      ) <=
      bullet.radius +
      boss.radius
    ) {

      bullet.hitIds.add(
        boss.id
      );


      boss.hp -=
        bullet.damage;


      boss.hitFlashUntil =
        gameTime +
        70;


      createHitParticles(
        bullet.x,
        bullet.y,
        '#f3d9fa'
      );


      screenShake =
        Math.max(
          screenShake,
          2.5
        );


      if (
        bullet.remainingPierce >
        0
      ) {

        bullet.remainingPierce--;

      } else {

        consumed =
          true;
      }


      if (
        boss.hp <=
        0
      ) {

        killBoss();
      }
    }


    if (consumed) {

      bullets.splice(
        bulletIndex,
        1
      );
    }
  }


  for (
    let i =
      enemyProjectiles.length -
      1;

    i >=
    0;

    i--
  ) {

    const projectile =
      enemyProjectiles[i];


    let hit =
      false;


    if (
      player.alive &&
      distance(
        projectile,
        player
      ) <=
      projectile.radius +
      player.radius
    ) {

      damagePlayer(
        projectile.damage
      );


      hit =
        true;

    } else if (
      distance(
        projectile,
        core
      ) <=
      projectile.radius +
      core.radius
    ) {

      damageCore(
        projectile.damage
      );


      hit =
        true;

    } else {

      const structure =
        structures.find(
          structure =>
            structure.hp >
              0 &&
            distance(
              projectile,
              structure
            ) <=
            projectile.radius +
            structure.radius
        );


      if (structure) {

        damageStructure(
          structure,
          projectile.damage
        );


        hit =
          true;
      }
    }


    if (hit) {

      enemyProjectiles.splice(
        i,
        1
      );
    }
  }
}


function damageEnemy(
  enemy,
  damage,
  crit = false,
  x = enemy.x,
  y = enemy.y
) {

  if (
    enemy.shieldHits >
    0
  ) {

    enemy.shieldHits--;


    addFloatingText(
      enemy.x,
      enemy.y -
      enemy.radius,
      'BLOCK',
      '#74c0fc'
    );


    createHitParticles(
      x,
      y,
      '#74c0fc'
    );


    return;
  }


  enemy.hp -=
    damage;


  enemy.hitFlashUntil =
    gameTime +
    80;


  createHitParticles(
    x,
    y,

    crit

      ? '#ff922b'

      : '#ffffff'
  );


  screenShake =
    Math.max(
      screenShake,

      crit

        ? 3.5

        : 2
    );


  sfx.hit();


  if (crit) {

    addFloatingText(
      enemy.x,
      enemy.y -
      enemy.radius,
      'CRIT!',
      '#ff922b'
    );
  }
}


function killEnemy(
  enemy,
  index
) {

  createExplosion(
    enemy
  );


  maybeDropPickup(
    enemy
  );


  registerKill(
    enemy.reward,
    enemy.dataReward,
    enemy.x,
    enemy.y -
    enemy.radius,
    false,
    enemy.elite
  );


  enemies.splice(
    index,
    1
  );


  sfx.kill();
}


function maybeChainLightning(
  sourceEnemy,
  damage
) {

  if (
    runMods.chainChance <=
      0 ||
    Math.random() >=
      runMods.chainChance
  ) {

    return;
  }


  const candidates =
    enemies

      .filter(
        enemy =>
          enemy.id !==
            sourceEnemy.id &&
          enemy.hp >
            0 &&
          distance(
            sourceEnemy,
            enemy
          ) <
          170
      )

      .sort(
        (
          a,
          b
        ) =>
          distance(
            sourceEnemy,
            a
          ) -
          distance(
            sourceEnemy,
            b
          )
      );


  const target =
    candidates[0];


  if (!target) {
    return;
  }


  damageEnemy(
    target,
    damage,
    false,
    target.x,
    target.y
  );


  beams.push({

    x1:
      sourceEnemy.x,

    y1:
      sourceEnemy.y,

    x2:
      target.x,

    y2:
      target.y,

    color:
      '#63e6ff',

    expiresAt:
      gameTime +
      90

  });


  if (
    target.hp <=
    0
  ) {

    const index =
      enemies.findIndex(
        enemy =>
          enemy.id ===
          target.id
      );


    if (
      index >=
      0
    ) {

      killEnemy(
        target,
        index
      );
    }
  }
}


function registerKill(
  baseScore,
  baseData,
  x,
  y,
  isBoss = false,
  isElite = false
) {

  if (
    comboStreak >
      0 &&
    gameTime <=
      comboExpiresAt
  ) {

    comboStreak++;

  } else {

    comboStreak =
      1;
  }


  comboMultiplier =
    Math.min(

      CONFIG.combo
        .maxMultiplier,

      1 +
      Math.floor(
        comboStreak /
        CONFIG.combo
          .killsPerMultiplier
      )
    );


  bestComboMultiplier =
    Math.max(
      bestComboMultiplier,
      comboMultiplier
    );


  comboExpiresAt =
    gameTime +
    CONFIG.combo
      .windowMs;


  const gainedScore =
    Math.round(
      baseScore *
      comboMultiplier
    );


  const gainedData =
    Math.max(
      1,
      Math.round(
        baseData *
        runMods
          .dataMultiplier
      )
    );


  score +=
    gainedScore;


  dataCurrency +=
    gainedData;


  stats.dataCollected +=
    gainedData;


  if (!isBoss) {

    stats.kills++;
  }


  if (isElite) {

    stats.elites++;
  }


  addFloatingText(
    x,
    y,

    `+${gainedScore}  DATA +${gainedData}`,

    isBoss

      ? '#f3d9fa'

      : '#ffe066'
  );


  if (
    comboMultiplier >
      1 &&
    comboStreak %
    CONFIG.combo
      .killsPerMultiplier ===
      0
  ) {

    addFloatingText(
      player.x,
      player.y - 50,
      `COMBO x${comboMultiplier}`,
      '#ffd43b'
    );
  }
}


function updateCombo() {

  if (
    comboStreak >
      0 &&
    gameTime >
      comboExpiresAt
  ) {

    comboStreak =
      0;


    comboMultiplier =
      1;
  }
}


// ============================================================
// PICKUPS
// ============================================================

function maybeDropPickup(
  enemy
) {

  if (
    Math.random() >
    CONFIG.pickups
      .dropChance +
    runMods
      .pickupBonus
  ) {

    return;
  }


  const roll =
    Math.random();


  let type =
    'rapid';


  if (
    core.hp /
    core.maxHp <
      .45 &&
    roll <
      .36
  ) {

    type =
      'core';

  } else if (
    player.hp /
    player.maxHp <
      .5 &&
    roll <
      .35
  ) {

    type =
      'heal';

  } else if (
    roll <
    .32
  ) {

    type =
      'heal';

  } else if (
    roll <
    .58
  ) {

    type =
      'rapid';

  } else if (
    roll <
    .78
  ) {

    type =
      'shield';

  } else {

    type =
      'core';
  }


  spawnPickup(
    enemy.x,
    enemy.y,
    type
  );
}


function spawnPickup(
  x,
  y,
  type
) {

  pickups.push({

    id:
      nextEntityId++,

    x,

    y,

    type,

    radius:
      CONFIG.pickups
        .radius,

    phase:
      random(
        0,
        Math.PI * 2
      ),

    expiresAt:
      gameTime +
      CONFIG.pickups
        .lifeMs

  });
}


function updatePickups(
  dt
) {

  for (
    let i =
      pickups.length -
      1;

    i >=
    0;

    i--
  ) {

    const pickup =
      pickups[i];


    pickup.phase +=
      dt *
      4;


    if (
      player.alive &&
      distance(
        player,
        pickup
      ) <=
      player.radius +
      pickup.radius +
      3
    ) {

      applyPickup(
        pickup
      );


      pickups.splice(
        i,
        1
      );


      continue;
    }


    if (
      gameTime >=
      pickup.expiresAt
    ) {

      pickups.splice(
        i,
        1
      );
    }
  }
}


function applyPickup(
  pickup
) {

  if (
    pickup.type ===
    'heal'
  ) {

    const before =
      player.hp;


    player.hp =
      Math.min(
        player.maxHp,
        player.hp +
        CONFIG.pickups
          .playerHeal
      );


    const healed =
      player.hp -
      before;


    if (
      healed >
      0
    ) {

      addFloatingText(
        player.x,
        player.y - 30,
        `+${Math.round(healed)} HP`,
        '#69db7c'
      );

    } else {

      score +=
        25;
    }

  } else if (
    pickup.type ===
    'rapid'
  ) {

    player.rapidFireUntil =
      Math.max(
        gameTime,
        player.rapidFireUntil
      ) +
      CONFIG.weapon
        .rapidFireDurationMs;


    addFloatingText(
      player.x,
      player.y - 30,
      'RAPID FIRE',
      '#ffe066'
    );

  } else if (
    pickup.type ===
    'shield'
  ) {

    player.shieldCharges =
      Math.min(

        CONFIG.pickups
          .shieldMaxCharges,

        player.shieldCharges +
        1
      );


    addFloatingText(
      player.x,
      player.y - 30,
      'PLAYER SHIELD +1',
      '#74c0fc'
    );

  } else if (
    pickup.type ===
    'core'
  ) {

    const healed =
      healCore(
        CONFIG.pickups
          .coreRepair
      );


    if (
      healed <=
      0
    ) {

      core.shield =
        Math.min(
          core.maxShield,
          core.shield +
          45
        );


      addFloatingText(
        core.x,
        core.y - 52,
        '+45 CORE SHIELD',
        '#74c0fc'
      );
    }
  }


  burstAt(
    pickup.x,
    pickup.y,
    pickupColor(
      pickup.type
    ),
    18,
    3.4
  );


  sfx.pickup();
}


function pickupColor(
  type
) {

  if (
    type ===
    'heal'
  ) {

    return '#69db7c';
  }


  if (
    type ===
    'rapid'
  ) {

    return '#ffe066';
  }


  if (
    type ===
    'core'
  ) {

    return '#c77dff';
  }


  return '#74c0fc';
}


function drawPickups() {

  ctx.save();


  for (
    const pickup
    of pickups
  ) {

    const y =
      pickup.y +
      Math.sin(
        pickup.phase
      ) *
      4;


    const color =
      pickupColor(
        pickup.type
      );


    ctx.save();


    ctx.translate(
      pickup.x,
      y
    );


    ctx.rotate(
      pickup.phase *
      .35
    );


    ctx.beginPath();


    ctx.moveTo(
      0,
      -pickup.radius
    );


    ctx.lineTo(
      pickup.radius,
      0
    );


    ctx.lineTo(
      0,
      pickup.radius
    );


    ctx.lineTo(
      -pickup.radius,
      0
    );


    ctx.closePath();


    ctx.fillStyle =
      color;


    ctx.shadowColor =
      color;


    ctx.shadowBlur =
      18;


    ctx.fill();


    ctx.rotate(
      -pickup.phase *
      .35
    );


    ctx.fillStyle =
      '#081019';


    ctx.font =
      'bold 11px monospace';


    ctx.textAlign =
      'center';


    ctx.textBaseline =
      'middle';


    const label =
      pickup.type ===
      'heal'

        ? 'H'

        : pickup.type ===
          'rapid'

          ? 'R'

          : pickup.type ===
            'core'

            ? 'C'

            : 'S';


    ctx.fillText(
      label,
      0,
      1
    );


    ctx.restore();
  }


  ctx.restore();
}


// ============================================================
// PARTICLES + FLOATING TEXT + BEAMS
// ============================================================

function createParticle(
  x,
  y,
  vx,
  vy,
  color,
  size,
  lifeMs
) {

  particles.push({

    x,

    y,

    vx,

    vy,

    color,

    size,

    lifeMs,

    maxLifeMs:
      lifeMs

  });
}


function burstAt(
  x,
  y,
  color,
  count = 14,
  speedScale = 3.5
) {

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const angle =
      random(
        0,
        Math.PI * 2
      );


    const speed =
      random(
        30,
        85
      ) *
      speedScale;


    createParticle(
      x,
      y,

      Math.cos(
        angle
      ) *
      speed,

      Math.sin(
        angle
      ) *
      speed,

      color,

      random(
        2,
        5.5
      ),

      random(
        260,
        520
      )
    );
  }
}


function createExplosion(
  enemy
) {

  const color =
    CONFIG.enemies[
      enemy.type
    ]?.color ||
    '#ff5c7a';


  burstAt(
    enemy.x,
    enemy.y,
    color,

    enemy.type ===
    'tank'

      ? 23

      : 15,

    enemy.type ===
    'runner'

      ? 4.2

      : 3.5
  );
}


function createHitParticles(
  x,
  y,
  color = '#ffffff'
) {

  for (
    let i = 0;
    i < 7;
    i++
  ) {

    const angle =
      random(
        0,
        Math.PI * 2
      );


    const speed =
      random(
        45,
        140
      );


    createParticle(
      x,
      y,

      Math.cos(
        angle
      ) *
      speed,

      Math.sin(
        angle
      ) *
      speed,

      color,

      random(
        1.5,
        3.2
      ),

      random(
        150,
        250
      )
    );
  }
}


function updateParticles(
  dt
) {

  for (
    const particle
    of particles
  ) {

    particle.x +=
      particle.vx *
      dt;


    particle.y +=
      particle.vy *
      dt;


    particle.vx *=
      Math.pow(
        .05,
        dt
      );


    particle.vy *=
      Math.pow(
        .05,
        dt
      );


    particle.lifeMs -=
      dt *
      1000;
  }


  particles =
    particles.filter(
      particle =>
        particle.lifeMs >
        0
    );


  beams =
    beams.filter(
      beam =>
        gameTime <
        beam.expiresAt
    );
}


function drawParticles() {

  ctx.save();


  for (
    const particle
    of particles
  ) {

    const alpha =
      clamp(
        particle.lifeMs /
        particle.maxLifeMs,
        0,
        1
      );


    ctx.globalAlpha =
      alpha;


    ctx.beginPath();


    ctx.arc(
      particle.x,
      particle.y,

      particle.size *
      alpha +
      .4,

      0,
      Math.PI * 2
    );


    ctx.fillStyle =
      particle.color;


    ctx.shadowColor =
      particle.color;


    ctx.shadowBlur =
      10;


    ctx.fill();
  }


  ctx.restore();
}


function drawBeams() {

  ctx.save();


  for (
    const beam
    of beams
  ) {

    ctx.beginPath();


    ctx.moveTo(
      beam.x1,
      beam.y1
    );


    ctx.lineTo(
      beam.x2,
      beam.y2
    );


    ctx.strokeStyle =
      beam.color;


    ctx.lineWidth =
      3;


    ctx.shadowColor =
      beam.color;


    ctx.shadowBlur =
      15;


    ctx.stroke();
  }


  ctx.restore();
}


function addFloatingText(
  x,
  y,
  text,
  color
) {

  floatingTexts.push({

    x,

    y,

    text,

    color,

    lifeMs:
      850,

    maxLifeMs:
      850

  });
}


function updateFloatingTexts(
  dt
) {

  for (
    const item
    of floatingTexts
  ) {

    item.y -=
      42 *
      dt;


    item.lifeMs -=
      dt *
      1000;
  }


  floatingTexts =
    floatingTexts.filter(
      item =>
        item.lifeMs >
        0
    );
}


function drawFloatingTexts() {

  ctx.save();


  ctx.font =
    'bold 15px monospace';


  ctx.textAlign =
    'center';


  for (
    const item
    of floatingTexts
  ) {

    ctx.globalAlpha =
      clamp(
        item.lifeMs /
        item.maxLifeMs,
        0,
        1
      );


    ctx.fillStyle =
      item.color;


    ctx.fillText(
      item.text,
      item.x,
      item.y
    );
  }


  ctx.restore();
}


// ============================================================
// WORLD DRAWING
// ============================================================

function drawGrid() {

  const visualTime =
    performance.now();


  const gridSize =
    50;


  const pulse =
    .10 +
    Math.sin(
      visualTime *
      .002
    ) *
    .025;


  ctx.save();


  ctx.strokeStyle =
    `rgba(54,91,135,${pulse})`;


  ctx.lineWidth =
    1;


  for (
    let x = 0;
    x < canvas.width;
    x += gridSize
  ) {

    ctx.beginPath();


    ctx.moveTo(
      x,
      0
    );


    ctx.lineTo(
      x,
      canvas.height
    );


    ctx.stroke();
  }


  for (
    let y = 0;
    y < canvas.height;
    y += gridSize
  ) {

    ctx.beginPath();


    ctx.moveTo(
      0,
      y
    );


    ctx.lineTo(
      canvas.width,
      y
    );


    ctx.stroke();
  }


  ctx.beginPath();


  ctx.arc(
    core.x,
    core.y,
    CONFIG.core
      .noBuildRadius,
    0,
    Math.PI * 2
  );


  ctx.strokeStyle =
    'rgba(99,230,255,.045)';


  ctx.lineWidth =
    2;


  ctx.stroke();


  ctx.restore();
}


function drawSpawnWarnings() {

  ctx.save();


  for (
    const pending
    of pendingSpawns
  ) {

    const progress =
      clamp(

        (
          gameTime -
          pending.createdAt
        ) /
        CONFIG.waves
          .spawnWarningMs,

        0,

        1
      );


    const ringRadius =
      17 +
      (
        1 -
        progress
      ) *
      18;


    ctx.globalAlpha =
      .62 +
      Math.sin(
        gameTime *
        .025
      ) *
      .2;


    ctx.beginPath();


    ctx.arc(
      pending.warningX,
      pending.warningY,
      ringRadius,
      0,
      Math.PI * 2
    );


    ctx.strokeStyle =
      pending.elite

        ? '#ffd43b'

        : '#ff4d6d';


    ctx.lineWidth =
      3;


    ctx.shadowColor =
      ctx.strokeStyle;


    ctx.shadowBlur =
      18;


    ctx.stroke();


    ctx.save();


    ctx.translate(
      pending.warningX,
      pending.warningY
    );


    ctx.rotate(
      pending.warningAngle
    );


    ctx.beginPath();


    ctx.moveTo(
      13,
      0
    );


    ctx.lineTo(
      -8,
      -8
    );


    ctx.lineTo(
      -8,
      8
    );


    ctx.closePath();


    ctx.fillStyle =
      ctx.strokeStyle;


    ctx.fill();


    ctx.restore();
  }


  if (
    pendingBossAt
  ) {

    const remaining =
      Math.max(
        0,
        pendingBossAt -
        gameTime
      );


    const progress =
      1 -
      clamp(
        remaining /
        1300,
        0,
        1
      );


    ctx.globalAlpha =
      .7 +
      Math.sin(
        gameTime *
        .02
      ) *
      .2;


    ctx.beginPath();


    ctx.arc(
      canvas.width / 2,
      90,

      38 +
      (
        1 -
        progress
      ) *
      42,

      0,
      Math.PI * 2
    );


    ctx.strokeStyle =
      '#ff4d6d';


    ctx.lineWidth =
      5;


    ctx.shadowColor =
      '#ff4d6d';


    ctx.shadowBlur =
      25;


    ctx.stroke();


    ctx.font =
      'bold 18px monospace';


    ctx.textAlign =
      'center';


    ctx.fillStyle =
      '#ffb3c1';


    ctx.fillText(
      'BOSS SIGNAL',
      canvas.width / 2,
      96
    );
  }


  ctx.restore();
}


function drawWaveOverlay() {

  ctx.save();


  ctx.textAlign =
    'center';


  if (
    gameTime <
    waveBannerUntil
  ) {

    const alpha =
      Math.min(
        1,
        (
          waveBannerUntil -
          gameTime
        ) /
        300
      );


    ctx.globalAlpha =
      alpha;


    ctx.font =
      'bold 42px monospace';


    ctx.fillStyle =
      currentWavePlan
        ?.boss

        ? '#ffb3c1'

        : '#b8f6ff';


    ctx.shadowColor =
      currentWavePlan
        ?.boss

        ? '#ff4d6d'

        : '#4de5ff';


    ctx.shadowBlur =
      20;


    ctx.fillText(

      currentWavePlan
        ?.boss

        ? `BOSS WAVE ${wave}`

        : `WAVE ${wave}`,

      canvas.width / 2,

      100
    );


    ctx.font =
      'bold 14px monospace';


    ctx.fillText(
      currentWavePlan
        ?.archetype ||
      'INCOMING THREATS',

      canvas.width / 2,

      130
    );
  }


  if (
    waveState ===
      'cleared' &&
    gameTime <
      waveClearUntil
  ) {

    ctx.globalAlpha =
      1;


    ctx.font =
      'bold 32px monospace';


    ctx.fillStyle =
      '#69f0ae';


    ctx.shadowColor =
      '#69f0ae';


    ctx.shadowBlur =
      14;


    ctx.fillText(
      'SECTOR SECURED',
      canvas.width / 2,
      canvas.height / 2 - 12
    );


    ctx.font =
      '14px monospace';


    ctx.shadowBlur =
      0;


    ctx.fillText(
      waveClearMessage,
      canvas.width / 2,
      canvas.height / 2 + 20
    );
  }


  if (
    lastStandActive &&
    gameState ===
      GAME_STATE.PLAYING
  ) {

    ctx.globalAlpha =
      .72 +
      Math.sin(
        performance.now() *
        .01
      ) *
      .18;


    ctx.font =
      'bold 16px monospace';


    ctx.fillStyle =
      '#ff6b81';


    ctx.shadowColor =
      '#ff4d6d';


    ctx.shadowBlur =
      12;


    ctx.fillText(
      'CRITICAL CORE CONDITION - LAST STAND',
      canvas.width / 2,
      canvas.height - 24
    );
  }


  ctx.restore();
}


function drawCrosshair() {

  if (
    ![
      GAME_STATE.PLAYING,
      GAME_STATE.PAUSED,
      GAME_STATE.BUILD
    ].includes(
      gameState
    )
  ) {

    return;
  }


  const color =
    gameState ===
    GAME_STATE.BUILD

      ? '#b2f2bb'

      : '#9befff';


  ctx.save();


  ctx.strokeStyle =
    color;


  ctx.lineWidth =
    2;


  ctx.shadowColor =
    color;


  ctx.shadowBlur =
    8;


  ctx.beginPath();


  ctx.arc(
    mouse.x,
    mouse.y,
    7,
    0,
    Math.PI * 2
  );


  ctx.stroke();


  ctx.beginPath();


  ctx.moveTo(
    mouse.x - 15,
    mouse.y
  );


  ctx.lineTo(
    mouse.x - 5,
    mouse.y
  );


  ctx.moveTo(
    mouse.x + 5,
    mouse.y
  );


  ctx.lineTo(
    mouse.x + 15,
    mouse.y
  );


  ctx.moveTo(
    mouse.x,
    mouse.y - 15
  );


  ctx.lineTo(
    mouse.x,
    mouse.y - 5
  );


  ctx.moveTo(
    mouse.x,
    mouse.y + 5
  );


  ctx.lineTo(
    mouse.x,
    mouse.y + 15
  );


  ctx.stroke();


  ctx.restore();
}


function drawDamageVignette() {

  if (
    gameTime <
      player.hurtFlashUntil ||
    lastStandActive
  ) {

    ctx.save();


    const alpha =
      gameTime <
      player.hurtFlashUntil

        ? .12

        : .035 +
          Math.sin(
            performance.now() *
            .006
          ) *
          .02;


    ctx.fillStyle =
      `rgba(255,30,65,${
        Math.max(
          0,
          alpha
        )
      })`;


    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    ctx.restore();
  }
}


// ============================================================
// ENDING / RUN OVER
// ============================================================

function startEnding(
  reason
) {

  if (
    [
      GAME_STATE.ENDING,
      GAME_STATE.GAMEOVER
    ].includes(
      gameState
    )
  ) {

    return;
  }


  gameState =
    GAME_STATE.ENDING;


  endingReason =
    reason;


  endingStartedAtReal =
    performance.now();


  endingResultShown =
    false;


  mouse.isDown =
    false;


  pausePanel
    .classList
    .add(
      'hidden'
    );


  upgradePanel
    .classList
    .add(
      'hidden'
    );


  buildPanel
    .classList
    .add(
      'hidden'
    );


  bossHud
    .classList
    .add(
      'hidden'
    );


  endingOverlay
    .classList
    .remove(
      'hidden'
    );


  endingReasonText.textContent =
    reason;


  enemyProjectiles =
    [];


  bullets =
    [];


  const explosionX =
    reason ===
    'CORE BREACHED'

      ? core.x

      : player.x;


  const explosionY =
    reason ===
    'CORE BREACHED'

      ? core.y

      : player.y;


  burstAt(
    explosionX,
    explosionY,
    '#ff4d6d',
    70,
    7
  );


  burstAt(
    explosionX,
    explosionY,
    '#c77dff',
    45,
    5
  );


  screenShake =
    24;


  tone(
    100,
    1000,
    'sawtooth',
    0.05,
    35
  );
}


function updateEnding(
  timestamp,
  dt
) {

  updateParticles(
    dt *
    .65
  );


  updateFloatingTexts(
    dt *
    .4
  );


  screenShake =
    Math.max(
      0,
      screenShake -
      18 *
      dt
    );


  const elapsed =
    timestamp -
    endingStartedAtReal;


  if (
    elapsed >=
      CONFIG.ending
        .durationMs &&
    !endingResultShown
  ) {

    showGameOver();
  }
}


function drawEndingEffects(
  timestamp
) {

  if (
    gameState !==
    GAME_STATE.ENDING
  ) {

    return;
  }


  const elapsed =
    timestamp -
    endingStartedAtReal;


  const progress =
    clamp(
      elapsed /
      CONFIG.ending
        .durationMs,
      0,
      1
    );


  ctx.save();


  ctx.fillStyle =
    `rgba(80,0,14,${
      .06 +
      progress *
      .30
    })`;


  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  ctx.globalAlpha =
    .18 +
    progress *
    .42;


  for (
    let i = 0;
    i < 9;
    i++
  ) {

    const y =
      (
        Math.sin(
          timestamp *
          .02 +
          i *
          7.1
        ) *
        .5 +
        .5
      ) *
      canvas.height;


    const height =
      random(
        2,
        9
      );


    ctx.fillStyle =
      i %
      2

        ? '#ff4d6d'

        : '#c77dff';


    ctx.fillRect(
      random(
        -50,
        50
      ),

      y,

      canvas.width +
      random(
        -80,
        120
      ),

      height
    );
  }


  ctx.restore();
}


function showGameOver() {

  endingResultShown =
    true;


  gameState =
    GAME_STATE.GAMEOVER;


  endingOverlay
    .classList
    .add(
      'hidden'
    );


  gameOverPanel
    .classList
    .remove(
      'hidden'
    );


  resultTitle.textContent =
    endingReason ===
    'CORE BREACHED'

      ? 'NETWORK COLLAPSED'

      : 'DEFENSE PROCESS LOST';


  resultReason.textContent =
    endingReason;


  finalWave.textContent =
    wave;


  finalScore.textContent =
    Math.floor(
      score
    ).toLocaleString();


  finalKills.textContent =
    stats.kills
      .toLocaleString();


  finalElites.textContent =
    stats.elites
      .toLocaleString();


  finalBosses.textContent =
    stats.bosses
      .toLocaleString();


  finalStructures.textContent =
    stats.structuresBuilt
      .toLocaleString();


  finalCoreDamage.textContent =
    Math.round(
      stats.coreDamageTaken
    ).toLocaleString();


  finalCombo.textContent =
    `x${bestComboMultiplier}`;


  finalTime.textContent =
    formatTime(
      gameTime /
      1000
    );


  finalData.textContent =
    stats.dataCollected
      .toLocaleString();
}


// ============================================================
// HUD
// ============================================================

function updateHud() {

  hpText.textContent =
    Math.max(
      0,
      Math.ceil(
        player.hp
      )
    );


  hpBar.style.width =
    `${
      clamp(
        player.hp /
        player.maxHp,
        0,
        1
      ) *
      100
    }%`;


  livesText.textContent =
    `LIVES ${
      player.lives >
      0

        ? '◆ '
            .repeat(
              player.lives
            )
            .trim()

        : '0'
    }`;


  coreHpText.textContent =
    `${
      Math.max(
        0,
        Math.ceil(
          core.hp
        )
      )
    }`;


  coreHpBar.style.width =
    `${
      clamp(
        core.hp /
        core.maxHp,
        0,
        1
      ) *
      100
    }%`;


  coreShieldText.textContent =
    `SHIELD ${Math.round(core.shield)} / ${Math.round(core.maxShield)}`;


  scoreText.textContent =
    Math.floor(
      score
    ).toLocaleString();


  dataText.textContent =
    Math.floor(
      dataCurrency
    ).toLocaleString();


  waveText.textContent =
    wave;


  threatsText.textContent =
    `${getThreatCount()} threats`;


  comboText.textContent =
    `COMBO x${comboMultiplier}`;


  streakText.textContent =
    `${comboStreak} streak`;


  const dashLeft =
    Math.max(
      0,
      player.dashCooldownUntil -
      gameTime
    );


  dashStatus.textContent =
    !player.alive

      ? `REBOOT ${
          Math.max(
            0,
            (
              player.respawnAt -
              gameTime
            ) /
            1000
          ).toFixed(1)
        }s`

      : dashLeft <=
        0

        ? 'DASH READY'

        : `DASH ${
            (
              dashLeft /
              1000
            ).toFixed(1)
          }s`;


  const powerParts =
    [];


  if (
    player.shieldCharges >
    0
  ) {

    powerParts.push(
      `P-SHIELD x${player.shieldCharges}`
    );
  }


  if (
    gameTime <
    player.rapidFireUntil
  ) {

    powerParts.push(
      `RAPID ${
        (
          (
            player.rapidFireUntil -
            gameTime
          ) /
          1000
        ).toFixed(1)
      }s`
    );
  }


  powerStatus.textContent =
    powerParts.length

      ? powerParts.join(
          ' · '
        )

      : 'NO POWER-UP';


  if (
    gameState ===
    GAME_STATE.MENU
  ) {

    stateStatus.textContent =
      'SYSTEM IDLE';

  } else if (
    gameState ===
    GAME_STATE.BUILD
  ) {

    stateStatus.textContent =
      'BUILD PHASE';

  } else if (
    gameState ===
    GAME_STATE.UPGRADE
  ) {

    stateStatus.textContent =
      'UPGRADE AVAILABLE';

  } else if (
    gameState ===
    GAME_STATE.PAUSED
  ) {

    stateStatus.textContent =
      'SESSION PAUSED';

  } else if (
    lastStandActive
  ) {

    stateStatus.textContent =
      'LAST STAND';

  } else {

    stateStatus.textContent =
      currentWavePlan
        ?.archetype ||
      'DEFENSE ACTIVE';
  }


  if (
    boss &&
    gameState !==
    GAME_STATE.ENDING
  ) {

    bossHud
      .classList
      .remove(
        'hidden'
      );


    bossName.textContent =
      `INTRUSION OVERLORD · PHASE ${boss.phase}`;


    bossHpText.textContent =
      `${
        Math.max(
          0,
          Math.ceil(
            boss.hp
          )
        )
      } / ${Math.ceil(boss.maxHp)}`;


    bossHpBar.style.width =
      `${
        clamp(
          boss.hp /
          boss.maxHp,
          0,
          1
        ) *
        100
      }%`;

  } else {

    bossHud
      .classList
      .add(
        'hidden'
      );
  }


  if (
    gameState ===
    GAME_STATE.BUILD
  ) {

    updateBuildUi();
  }
}


// ============================================================
// GAME UPDATE / DRAW
// ============================================================

function updateGame(
  dt
) {

  updatePlayer(
    dt
  );


  handleShooting();


  updateBullets(
    dt
  );


  updateStructures(
    dt
  );


  updateEnemies(
    dt
  );


  updateBoss(
    dt
  );


  updateEnemyProjectiles(
    dt
  );


  updatePickups(
    dt
  );


  updateParticles(
    dt
  );


  updateFloatingTexts(
    dt
  );


  updateCombo();


  checkCombatCollisions();


  updateWaveSystem();


  screenShake =
    Math.max(
      0,
      screenShake -
      36 *
      dt
    );
}


function drawGame(
  timestamp
) {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  let shakeX =
    0;


  let shakeY =
    0;


  if (
    screenShake >
    0
  ) {

    shakeX =
      (
        Math.random() -
        .5
      ) *
      screenShake;


    shakeY =
      (
        Math.random() -
        .5
      ) *
      screenShake;
  }


  ctx.save();


  ctx.translate(
    shakeX,
    shakeY
  );


  drawGrid();


  if (
    gameState !==
    GAME_STATE.MENU
  ) {

    drawCore();


    drawStructures();


    drawSpawnWarnings();


    drawPickups();


    drawEnemyProjectiles();


    drawBullets();


    drawBeams();


    drawEnemies();


    drawBoss();


    drawPlayer();


    drawParticles();


    drawFloatingTexts();


    drawWaveOverlay();


    drawRespawnStatus();


    drawDamageVignette();


    drawPlacementPreview();
  }


  ctx.restore();


  drawCrosshair();


  drawEndingEffects(
    timestamp
  );
}


function gameLoop(
  timestamp
) {

  const dt =
    Math.min(
      .033,
      Math.max(
        0,
        (
          timestamp -
          lastFrameTimestamp
        ) /
        1000
      )
    );


  lastFrameTimestamp =
    timestamp;


  if (
    gameState ===
    GAME_STATE.PLAYING
  ) {

    gameTime +=
      dt *
      1000;


    updateGame(
      dt
    );

  } else if (
    gameState ===
    GAME_STATE.BUILD
  ) {

    updateBuildPhase(
      timestamp
    );

  } else if (
    gameState ===
    GAME_STATE.ENDING
  ) {

    updateEnding(
      timestamp,
      dt
    );
  }


  drawGame(
    timestamp
  );


  updateHud();


  requestAnimationFrame(
    gameLoop
  );
}


// ============================================================
// RUN RESET / START
// ============================================================

function resetRun() {

  score =
    0;


  dataCurrency =
    0;


  wave =
    1;


  gameTime =
    0;


  runStartedAtReal =
    performance.now();


  nextEntityId =
    1;


  bullets =
    [];


  enemies =
    [];


  enemyProjectiles =
    [];


  particles =
    [];


  floatingTexts =
    [];


  pickups =
    [];


  structures =
    [];


  beams =
    [];


  pendingSpawns =
    [];


  boss =
    null;


  pendingBossAt =
    0;


  comboStreak =
    0;


  comboMultiplier =
    1;


  comboExpiresAt =
    0;


  bestComboMultiplier =
    1;


  lastShotAt =
    -Infinity;


  muzzleFlashUntil =
    0;


  screenShake =
    0;


  lastStandActive =
    false;


  endingReason =
    '';


  endingResultShown =
    false;


  Object.assign(
    runMods,
    {

      playerSpeed:
        1,

      dashCooldown:
        1,

      weaponDamage:
        1,

      fireRate:
        1,

      bulletSpeed:
        1,

      multishot:
        0,

      pierce:
        0,

      critChance:
        0,

      critMultiplier:
        2,

      chainChance:
        0,

      dataMultiplier:
        1,

      pickupBonus:
        0,

      coreDamageMultiplier:
        1,

      turretDamage:
        1,

      defenseHp:
        1,

      slowMultiplier:
        1,

      repairAmount:
        1,

      repairChargeBonus:
        0

    }
  );


  Object.assign(
    stats,
    {

      kills:
        0,

      elites:
        0,

      bosses:
        0,

      structuresBuilt:
        0,

      coreDamageTaken:
        0,

      dataCollected:
        0

    }
  );


  core.x =
    canvas.width / 2;


  core.y =
    canvas.height / 2;


  core.hp =
    CONFIG.core
      .maxHp;


  core.maxHp =
    CONFIG.core
      .maxHp;


  core.shield =
    CONFIG.core
      .maxShield;


  core.maxShield =
    CONFIG.core
      .maxShield;


  core.flashUntil =
    0;


  player.x =
    core.x;


  player.y =
    core.y +
    125;


  player.hp =
    CONFIG.player
      .maxHp;


  player.maxHp =
    CONFIG.player
      .maxHp;


  player.lives =
    CONFIG.player
      .startLives;


  player.alive =
    true;


  player.respawnAt =
    0;


  player.invulnerableUntil =
    0;


  player.hurtFlashUntil =
    0;


  player.angle =
    -Math.PI /
    2;


  player.dashUntil =
    0;


  player.dashCooldownUntil =
    0;


  player.shieldCharges =
    0;


  player.rapidFireUntil =
    0;


  mouse.isDown =
    false;


  clearBuildSelection();


  startMenu
    .classList
    .add(
      'hidden'
    );


  pausePanel
    .classList
    .add(
      'hidden'
    );


  upgradePanel
    .classList
    .add(
      'hidden'
    );


  buildPanel
    .classList
    .add(
      'hidden'
    );


  endingOverlay
    .classList
    .add(
      'hidden'
    );


  gameOverPanel
    .classList
    .add(
      'hidden'
    );


  bossHud
    .classList
    .add(
      'hidden'
    );


  currentWavePlan =
    generateWavePlan(
      wave
    );


  beginWaveCombat();
}


function showStartMenu() {

  gameState =
    GAME_STATE.MENU;


  mouse.isDown =
    false;


  startMenu
    .classList
    .remove(
      'hidden'
    );


  pausePanel
    .classList
    .add(
      'hidden'
    );


  upgradePanel
    .classList
    .add(
      'hidden'
    );


  buildPanel
    .classList
    .add(
      'hidden'
    );


  endingOverlay
    .classList
    .add(
      'hidden'
    );


  gameOverPanel
    .classList
    .add(
      'hidden'
    );


  bossHud
    .classList
    .add(
      'hidden'
    );
}


// ============================================================
// HELPERS
// ============================================================

function random(
  min,
  max
) {

  return (
    min +
    Math.random() *
    (
      max -
      min
    )
  );
}


function clamp(
  value,
  min,
  max
) {

  return Math.max(
    min,
    Math.min(
      max,
      value
    )
  );
}


function distance(
  a,
  b
) {

  return Math.hypot(
    a.x -
    b.x,
    a.y -
    b.y
  );
}


function distancePoint(
  x1,
  y1,
  x2,
  y2
) {

  return Math.hypot(
    x1 -
    x2,
    y1 -
    y2
  );
}


function nearestEntity(
  x,
  y,
  list
) {

  let best =
    null;


  let bestDistance =
    Infinity;


  for (
    const entity
    of list
  ) {

    if (
      !entity ||
      entity.hp ===
      0
    ) {

      continue;
    }


    const currentDistance =
      distancePoint(
        x,
        y,
        entity.x,
        entity.y
      );


    if (
      currentDistance <
      bestDistance
    ) {

      bestDistance =
        currentDistance;


      best =
        entity;
    }
  }


  return best;
}


function shuffle(
  array
) {

  for (
    let i =
      array.length -
      1;

    i >
    0;

    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
        (
          i +
          1
        )
      );


    [
      array[i],
      array[j]
    ] =
      [
        array[j],
        array[i]
      ];
  }


  return array;
}


function formatTime(
  seconds
) {

  const total =
    Math.max(
      0,
      Math.floor(
        seconds
      )
    );


  const minutes =
    Math.floor(
      total /
      60
    );


  const secs =
    total %
    60;


  return `${
    String(
      minutes
    ).padStart(
      2,
      '0'
    )
  }:${
    String(
      secs
    ).padStart(
      2,
      '0'
    )
  }`;
}


function drawPolygon(
  x,
  y,
  radius,
  sides,
  fill,
  strokeOnly = false
) {

  ctx.beginPath();


  for (
    let i = 0;
    i < sides;
    i++
  ) {

    const angle =
      -Math.PI /
      2 +
      Math.PI *
      2 *
      i /
      sides;


    const px =
      x +
      Math.cos(
        angle
      ) *
      radius;


    const py =
      y +
      Math.sin(
        angle
      ) *
      radius;


    if (
      i === 0
    ) {

      ctx.moveTo(
        px,
        py
      );

    } else {

      ctx.lineTo(
        px,
        py
      );
    }
  }


  ctx.closePath();


  ctx.shadowColor =
    fill;


  ctx.shadowBlur =
    14;


  if (
    strokeOnly
  ) {

    ctx.strokeStyle =
      fill;


    ctx.lineWidth =
      2;


    ctx.stroke();

  } else {

    ctx.fillStyle =
      fill;


    ctx.fill();
  }
}


function drawStarShape(
  x,
  y,
  outerRadius,
  innerRadius,
  points,
  fill
) {

  ctx.beginPath();


  for (
    let i = 0;
    i < points * 2;
    i++
  ) {

    const angle =
      Math.PI *
      i /
      points;


    const radius =
      i %
      2 ===
      0

        ? outerRadius

        : innerRadius;


    const px =
      x +
      Math.cos(
        angle
      ) *
      radius;


    const py =
      y +
      Math.sin(
        angle
      ) *
      radius;


    if (
      i === 0
    ) {

      ctx.moveTo(
        px,
        py
      );

    } else {

      ctx.lineTo(
        px,
        py
      );
    }
  }


  ctx.closePath();


  ctx.fillStyle =
    fill;


  ctx.shadowColor =
    fill;


  ctx.shadowBlur =
    16;


  ctx.fill();
}


function drawSmallHpBar(
  x,
  y,
  width,
  ratio,
  color
) {

  ctx.save();


  ctx.fillStyle =
    'rgba(0,0,0,.62)';


  ctx.fillRect(
    x -
    width /
    2,

    y,

    width,

    5
  );


  ctx.fillStyle =
    color;


  ctx.fillRect(
    x -
    width /
    2,

    y,

    width *
    clamp(
      ratio,
      0,
      1
    ),

    5
  );


  ctx.restore();
}


// ============================================================
// UI EVENTS
// ============================================================

startBtn.addEventListener(
  'click',
  () => {

    ensureAudio();

    resetRun();
  }
);


restartBtn.addEventListener(
  'click',
  () => {

    ensureAudio();

    resetRun();
  }
);


readyBtn.addEventListener(
  'click',
  () => {

    startNextWaveFromBuild();
  }
);


upgradeStructureBtn.addEventListener(
  'click',
  () => {

    upgradeSelectedStructure();
  }
);


for (
  const button
  of buildButtons
) {

  button.addEventListener(
    'click',
    () => {

      selectBuildType(
        button.dataset.build
      );
    }
  );
}


// ============================================================
// START
// ============================================================

showStartMenu();


requestAnimationFrame(
  gameLoop
);