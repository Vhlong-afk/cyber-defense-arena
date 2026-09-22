'use strict';


// ============================================================
// DOM
// ============================================================

const canvas =
  document.querySelector('#gameCanvas');

const ctx =
  canvas.getContext('2d');


const gameLayout =
  document.querySelector('#gameLayout');


const hpText =
  document.querySelector('#hp');

const hpBar =
  document.querySelector('#hpBar');

const livesText =
  document.querySelector('#lives');


const coreHpText =
  document.querySelector('#coreHp');

const coreHpBar =
  document.querySelector('#coreHpBar');

const coreShieldText =
  document.querySelector('#coreShield');


const levelText =
  document.querySelector('#level');

const expText =
  document.querySelector('#expText');

const expBar =
  document.querySelector('#expBar');


const scoreText =
  document.querySelector('#score');

const dataText =
  document.querySelector('#data');

const waveText =
  document.querySelector('#wave');

const threatsText =
  document.querySelector('#threats');

const comboText =
  document.querySelector('#combo');

const streakText =
  document.querySelector('#streak');


const dashStatus =
  document.querySelector('#dashStatus');

const powerStatus =
  document.querySelector('#powerStatus');

const stateStatus =
  document.querySelector('#stateStatus');


const bossHud =
  document.querySelector('#bossHud');

const bossName =
  document.querySelector('#bossName');

const bossHpText =
  document.querySelector('#bossHpText');

const bossHpBar =
  document.querySelector('#bossHpBar');


const startMenu =
  document.querySelector('#startMenu');

const startBtn =
  document.querySelector('#startBtn');

const pausePanel =
  document.querySelector('#pausePanel');


const upgradePanel =
  document.querySelector('#upgradePanel');

const upgradeTitle =
  document.querySelector('#upgradeTitle');

const upgradeChoices =
  document.querySelector('#upgradeChoices');


const buildPanel =
  document.querySelector('#buildPanel');

const buildTimerText =
  document.querySelector('#buildTimer');

const buildDataText =
  document.querySelector('#buildData');

const nextWaveTitle =
  document.querySelector('#nextWaveTitle');

const nextWaveArchetype =
  document.querySelector('#nextWaveArchetype');

const threatPreviewList =
  document.querySelector('#threatPreviewList');

const buildHint =
  document.querySelector('#buildHint');

const upgradeStructureBtn =
  document.querySelector('#upgradeStructureBtn');

const readyBtn =
  document.querySelector('#readyBtn');

const buildToggleBtn =
  document.querySelector(
    '#buildToggleBtn'
  );


const buildButtons =
  [
    ...document.querySelectorAll(
      '.build-option'
    )
  ];


const endingOverlay =
  document.querySelector('#endingOverlay');

const endingReasonText =
  document.querySelector('#endingReason');


const gameOverPanel =
  document.querySelector('#gameOver');

const resultTitle =
  document.querySelector('#resultTitle');

const resultReason =
  document.querySelector('#resultReason');

const finalWave =
  document.querySelector('#finalWave');

const finalScore =
  document.querySelector('#finalScore');

const finalKills =
  document.querySelector('#finalKills');

const finalElites =
  document.querySelector('#finalElites');

const finalBosses =
  document.querySelector('#finalBosses');

const finalStructures =
  document.querySelector('#finalStructures');

const finalCoreDamage =
  document.querySelector('#finalCoreDamage');

const finalCombo =
  document.querySelector('#finalCombo');

const finalTime =
  document.querySelector('#finalTime');

const finalData =
  document.querySelector('#finalData');

const restartBtn =
  document.querySelector('#restartBtn');


canvas.style.cursor =
  'none';


// ============================================================
// CONFIG
// ============================================================

const CONFIG = {

  player: {

    radius: 18,

    speed: 260,

    maxHp: 100,

    startLives: 3,

    maxLives: 4,

    respawnMs: 3000,

    respawnInvulnerabilityMs: 1800,

    hitInvulnerabilityMs: 420,

    dashSpeed: 850,

    dashDurationMs: 135,

    dashCooldownMs: 1150
  },


  core: {

    radius: 38,

    maxHp: 1000,

    maxShield: 250,

    shieldRechargeBase: 20,

    shieldRechargeCleanBonus: 20,

    cleanShieldWindowMs: 10000,

    criticalRatio: 0.10,

    noBuildRadius: 105
  },


  weapon: {

    fireIntervalMs: 140,

    bulletSpeed: 790,

    bulletRadius: 4,

    bulletLifeMs: 1350,

    damage: 1,

    rapidFireMultiplier: 0.52,

    rapidFireDurationMs: 6500
  },


  economy: {

    startingData: 60,

    waveClearData: 5
  },


  waves: {

    baseEnemies: 8,

    perWave: 3,

    maxRegularEnemies: 72,

    baseSpawnIntervalMs: 760,

    minSpawnIntervalMs: 280,

    spawnWarningMs: 560,

    clearDisplayMs: 1100,

    buildSeconds: 12,

    bossBuildSeconds: 18,

    bossEvery: 5
  },


  combo: {

    windowMs: 2400,

    killsPerMultiplier: 3,

    maxMultiplier: 5
  },


  pickups: {

    dropChance: 0.13,

    radius: 13,

    lifeMs: 12000,

    playerHeal: 25,

    coreRepair: 55,

    shieldMaxCharges: 2
  },


  enemies: {

    virus: {

      radius: 15,

      speed: 100,

      hp: 1,

      damage: 11,

      score: 10,

      data: 1,

      exp: 5,

      color: '#ff5c7a',

      attackMs: 900
    },


    runner: {

      radius: 11,

      speed: 178,

      hp: 1,

      damage: 14,

      score: 15,

      data: 2,

      exp: 7,

      color: '#ffa94d',

      attackMs: 800
    },


    tank: {

      radius: 24,

      speed: 65,

      hp: 5,

      damage: 22,

      score: 38,

      data: 4,

      exp: 15,

      color: '#b197fc',

      attackMs: 720
    },


    shooter: {

      radius: 17,

      speed: 86,

      hp: 2,

      damage: 13,

      score: 30,

      data: 3,

      exp: 11,

      color: '#4dabf7',

      attackMs: 1450,

      range: 275,

      projectileSpeed: 260
    },


    sapper: {

      radius: 16,

      speed: 113,

      hp: 3,

      damage: 28,

      score: 42,

      data: 5,

      exp: 14,

      color: '#51cf66',

      attackMs: 560
    },


    hunter: {

      radius: 14,

      speed: 132,

      hp: 3,

      damage: 18,

      score: 40,

      data: 4,

      exp: 14,

      color: '#f06595',

      attackMs: 720,

      burstMultiplier: 2.35,

      burstDurationMs: 520,

      burstCooldownMs: 2700
    }

  },


  elite: {

    hpMultiplier: 1.8,

    speedMultiplier: 1.26,

    scoreMultiplier: 1.8,

    dataMultiplier: 1.5,

    expMultiplier: 1.65,

    shieldHits: 2
  },


  defenses: {

    turret: {

      name: 'AUTO TURRET',

      cost: 70,

      radius: 19,

      hp: 125,

      range: 245,

      fireMs: 620,

      damage: 1.35,

      color: '#63e6ff'
    },


    firewall: {

      name: 'FIREWALL',

      cost: 55,

      radius: 31,

      hp: 310,

      color: '#ff8787'
    },


    slow: {

      name: 'SLOW FIELD',

      cost: 90,

      radius: 24,

      hp: 105,

      range: 118,

      slow: 0.55,

      color: '#74c0fc'
    },


    repair: {

      name: 'REPAIR NODE',

      cost: 110,

      radius: 23,

      hp: 105,

      heal: 10,

      charges: 5,

      pulseMs: 4700,

      color: '#69db7c'
    }

  },


  placement: {

    edgePadding: 58,

    overlapPadding: 12
  },


  enemyProjectile: {

    radius: 6,

    lifeMs: 6000
  },


  bosses: {

    ddos: {

      name: 'DDoS SWARM CORE',

      baseHp: 220,

      speed: 72,

      damage: 18,

      score: 900,

      data: 45,

      exp: 90,

      color: '#ff4d6d',

      turretDamageMultiplier: 0.70
    },


    ransomware: {

      name: 'RANSOMWARE WARDEN',

      baseHp: 300,

      shield: 90,

      speed: 64,

      damage: 22,

      score: 1150,

      data: 60,

      exp: 120,

      color: '#e64980',

      turretDamageMultiplier: 0.55
    },


    rootkit: {

      name: 'ROOTKIT PHANTOM',

      baseHp: 340,

      speed: 92,

      damage: 24,

      score: 1350,

      data: 70,

      exp: 145,

      color: '#9775fa',

      turretDamageMultiplier: 0.45
    },


    zeroday: {

      name: 'ZERO-DAY SINGULARITY',

      baseHp: 500,

      speed: 84,

      damage: 28,

      score: 1800,

      data: 90,

      exp: 190,

      color: '#ff922b',

      turretDamageMultiplier: 0.50
    }

  },


  bossScaling: {

    hpPerCycle: 1.45,

    damagePerCycle: 0.18,

    speedPerCycle: 0.05
  },


  ending: {

    durationMs: 2200
  }

};


// ============================================================
// GAME STATES
// ============================================================

const GAME_STATE =
  Object.freeze({

    MENU: 'menu',

    PLAYING: 'playing',

    PAUSED: 'paused',

    UPGRADE: 'upgrade',

    BUILD: 'build',

    ENDING: 'ending',

    GAMEOVER: 'gameover'
  });


let gameState =
  GAME_STATE.MENU;


function setGameState(
  state
) {

  gameState =
    state;


  if (
    state !==
    GAME_STATE.BUILD
  ) {

    buildPanelOpen =
      true;


    buildPanel
      .classList
      .remove(
        'placement-mode'
      );


    buildToggleBtn
      .classList
      .add(
        'hidden'
      );
  }
}


// ============================================================
// GLOBAL STATE
// ============================================================

const keys = {};


const mouse = {

  x:
    canvas.width / 2,

  y:
    canvas.height / 2,

  isDown: false
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

  flashUntil: 0,

  lastDamageAt: -Infinity
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

  alive: true,

  respawnAt: 0,

  invulnerableUntil: 0,

  hurtFlashUntil: 0,

  angle:
    -Math.PI / 2,

  dashUntil: 0,

  dashCooldownUntil: 0,

  dashX: 0,

  dashY: -1,

  shieldCharges: 0,

  rapidFireUntil: 0
};


let playerLevel =
  1;

let playerExp =
  0;

let pendingLevelUps =
  0;


const runMods = {

  playerSpeed: 1,

  dashCooldown: 1,

  weaponDamage: 1,

  fireRate: 1,

  bulletSpeed: 1,

  multishot: 0,

  pierce: 0,

  critChance: 0,

  critMultiplier: 2,

  chainChance: 0,

  dataMultiplier: 1,

  pickupBonus: 0,

  coreDamageMultiplier: 1,

  turretDamage: 1,

  defenseHp: 1,

  slowMultiplier: 1,

  repairAmount: 1,

  repairChargeBonus: 0
};


let score =
  0;

let dataCurrency =
  CONFIG.economy.startingData;

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


let bullets = [];

let enemies = [];

let enemyProjectiles = [];

let particles = [];

let floatingTexts = [];

let pickups = [];

let structures = [];

let beams = [];

let hazards = [];


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

let buildPanelOpen =
  true;

let buildEndsAtReal =
  0;


let nextEntityId =
  1;


let endingStartedAtReal =
  0;

let endingDeadlineReal =
  0;

let endingTimeoutId =
  null;

let endingReason =
  '';

let endingResultShown =
  false;


let lastStandActive =
  false;


let gameTime =
  0;

let lastFrameTimestamp =
  performance.now();


const stats = {

  kills: 0,

  elites: 0,

  bosses: 0,

  structuresBuilt: 0,

  coreDamageTaken: 0,

  dataCollected: 0
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

  shoot() {

    tone(
      520,
      55,
      'square',
      .012,
      310
    );
  },


  hit() {

    tone(
      180,
      70,
      'square',
      .014,
      100
    );
  },


  kill() {

    tone(
      260,
      90,
      'sawtooth',
      .015,
      520
    );
  },


  hurt() {

    tone(
      120,
      150,
      'sawtooth',
      .03,
      55
    );
  },


  pickup() {

    tone(
      460,
      130,
      'sine',
      .022,
      900
    );
  },


  dash() {

    tone(
      280,
      110,
      'sawtooth',
      .015,
      120
    );
  },


  boss() {

    tone(
      85,
      520,
      'sawtooth',
      .042,
      48
    );
  },


  build() {

    tone(
      410,
      100,
      'square',
      .012,
      650
    );
  },


  upgrade() {

    tone(
      520,
      200,
      'sine',
      .02,
      980
    );
  }

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
        'KeyB' &&
      gameState ===
        GAME_STATE.BUILD
    ) {

      event.preventDefault();


      setBuildPanelOpen(
        !buildPanelOpen
      );


      return;
    }


    if (
      event.code ===
        'Enter' &&
      gameState ===
        GAME_STATE.BUILD
    ) {

      event.preventDefault();


      startNextWaveFromBuild();


      return;
    }


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


      setBuildPanelOpen(
        true
      );


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
      event.button ===
      0
    ) {

      mouse.isDown =
        false;
    }
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
  'mouseleave',
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


      setBuildPanelOpen(
        true
      );
    }
  }
);


function togglePause() {

  if (
    gameState ===
    GAME_STATE.PLAYING
  ) {

    setGameState(
      GAME_STATE.PAUSED
    );


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

    setGameState(
      GAME_STATE.PLAYING
    );


    pausePanel
      .classList
      .add(
        'hidden'
      );
  }
}


// ============================================================
// LEVEL / EXP
// ============================================================

function expNeeded(
  level
) {

  return Math.round(

    45 *
    Math.pow(
      1.28,
      level - 1
    ) +

    12 *
    (
      level - 1
    )
  );
}


function addExp(
  amount
) {

  playerExp +=
    amount;


  let needed =
    expNeeded(
      playerLevel
    );


  while (
    playerExp >=
    needed
  ) {

    playerExp -=
      needed;


    playerLevel++;


    pendingLevelUps++;


    needed =
      expNeeded(
        playerLevel
      );
  }
}


function checkPendingLevelUp() {

  if (
    pendingLevelUps <=
      0 ||
    gameState !==
      GAME_STATE.PLAYING
  ) {

    return;
  }


  setGameState(
    GAME_STATE.UPGRADE
  );


  mouse.isDown =
    false;


  upgradeTitle.textContent =
    `LEVEL ${playerLevel}`;


  showUpgradeChoices();
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


  if (keys.w) dy--;
  if (keys.s) dy++;
  if (keys.a) dx--;
  if (keys.d) dx++;


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
    runMods.dashCooldown;


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
        player.respawnAt
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
      .65
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


    if (keys.w) moveY--;
    if (keys.s) moveY++;
    if (keys.a) moveX--;
    if (keys.d) moveX++;


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
        runMods.playerSpeed;


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
    player.hp <=
    0
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
}


function respawnPlayer() {

  player.alive =
    true;


  player.hp =
    player.maxHp;


  player.x =
    core.x;


  player.y =
    core.y +
    125;


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
}

function drawRespawnStatus() {

  if (
    player.alive ||
    gameState !==
    GAME_STATE.PLAYING
  ) {

    return;
  }


  const remaining =
    Math.max(
      0,
      player.respawnAt -
      gameTime
    );


  const seconds =
    remaining /
    1000;


  const progress =
    clamp(

      1 -
      remaining /
      CONFIG.player.respawnMs,

      0,
      1
    );


  const centerX =
    canvas.width /
    2;


  const y =
    canvas.height -
    72;


  ctx.save();


  ctx.textAlign =
    'center';


  ctx.font =
    'bold 22px monospace';


  ctx.fillStyle =
    '#b8f6ff';


  ctx.shadowColor =
    '#63e6ff';


  ctx.shadowBlur =
    14;


  ctx.fillText(
    `DEFENDER REBOOT ${seconds.toFixed(1)}s`,
    centerX,
    y
  );


  // Thanh countdown nền
  const barWidth =
    280;


  const barHeight =
    7;


  const barX =
    centerX -
    barWidth /
    2;


  const barY =
    y +
    18;


  ctx.shadowBlur =
    0;


  ctx.fillStyle =
    'rgba(255,255,255,.12)';


  ctx.fillRect(
    barX,
    barY,
    barWidth,
    barHeight
  );


  // Thanh tiến trình reboot
  ctx.fillStyle =
    '#63e6ff';


  ctx.shadowColor =
    '#63e6ff';


  ctx.shadowBlur =
    10;


  ctx.fillRect(
    barX,
    barY,
    barWidth *
    progress,
    barHeight
  );


  ctx.restore();
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
    gameTime <
    player.invulnerableUntil
  ) {

    ctx.globalAlpha =
      .58 +
      Math.sin(
        performance.now() *
        .03
      ) *
      .28;
  }


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
      16;


    ctx.stroke();
  }


  // Outer cyber ring
  ctx.beginPath();


  ctx.arc(
    0,
    0,
    player.radius + 6,
    0,
    Math.PI * 2
  );


  ctx.strokeStyle =
    'rgba(99,230,255,.32)';


  ctx.lineWidth =
    2;


  ctx.shadowColor =
    '#63e6ff';


  ctx.shadowBlur =
    12;


  ctx.stroke();


  // Gun
  ctx.fillStyle =
    '#8af3ff';


  ctx.fillRect(
    7,
    -5,
    28,
    10
  );


  ctx.fillStyle =
    '#e2fcff';


  ctx.fillRect(
    26,
    -3,
    12,
    6
  );


  // Body
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

      : gameTime <
        player.dashUntil

        ? '#9bf6ff'

        : '#23c7e6';


  ctx.shadowColor =
    '#52e8ff';


  ctx.shadowBlur =
    20;


  ctx.fill();


  // Inner core
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


  ctx.shadowColor =
    '#ffffff';


  ctx.shadowBlur =
    12;


  ctx.fill();


  // Muzzle
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
      52,
      -8
    );


    ctx.lineTo(
      47,
      0
    );


    ctx.lineTo(
      52,
      8
    );


    ctx.closePath();


    ctx.fillStyle =
      '#ffe066';


    ctx.shadowColor =
      '#ffe066';


    ctx.shadowBlur =
      22;


    ctx.fill();
  }


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


  core.lastDamageAt =
    gameTime;


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
  }


  if (
    core.hp >
      0 &&
    core.hp /
      core.maxHp <=
      CONFIG.core
        .criticalRatio &&
    !lastStandActive
  ) {

    lastStandActive =
      true;


    addFloatingText(
      core.x,
      core.y - 78,
      'LAST STAND',
      '#ff4d6d'
    );


    tone(
      160,
      500,
      'sawtooth',
      .034,
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

  const now =
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
        now *
        .005
      ) *
      3,

      0,
      Math.PI * 2
    );


    ctx.strokeStyle =
      `rgba(
        116,
        192,
        252,
        ${
          .3 +
          ratio *
          .5
        }
      )`;


    ctx.lineWidth =
      4;


    ctx.shadowColor =
      '#74c0fc';


    ctx.shadowBlur =
      20;


    ctx.stroke();
  }


  ctx.save();


  ctx.rotate(
    now *
    .00028
  );


  drawPolygon(
    0,
    0,
    core.radius + 10,
    6,
    'rgba(99,230,255,.23)',
    true
  );


  ctx.restore();


  ctx.save();


  ctx.rotate(
    -now *
    .00045
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


  ctx.restore();


  const pulse =
    18 +
    Math.sin(
      now *
      (
        lastStandActive
          ? .016
          : .006
      )
    ) *
    3;


  ctx.beginPath();


  ctx.arc(
    0,
    0,
    pulse,
    0,
    Math.PI * 2
  );


  ctx.fillStyle =
    lastStandActive

      ? '#ff4d6d'

      : '#63e6ff';


  ctx.shadowColor =
    ctx.fillStyle;


  ctx.shadowBlur =
    lastStandActive
      ? 30
      : 22;


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
    '#f4feff';


  ctx.fill();


  ctx.restore();
}


// ============================================================
// PLAYER WEAPON
// ============================================================

function currentFireInterval() {

  let value =
    CONFIG.weapon
      .fireIntervalMs *
    runMods.fireRate;


  if (
    gameTime <
    player.rapidFireUntil
  ) {

    value *=
      CONFIG.weapon
        .rapidFireMultiplier;
  }


  return value;
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


  const count =
    1 +
    runMods.multishot;


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const centered =
      i -
      (
        count -
        1
      ) /
      2;


    const angle =
      baseAngle +
      centered *
      .09;


    const crit =
      Math.random() <
      runMods.critChance;


    const x =
      player.x +
      Math.cos(
        angle
      ) *
      34;


    const y =
      player.y +
      Math.sin(
        angle
      ) *
      34;


    bullets.push({

      id:
        nextEntityId++,

      owner:
        'player',

      x,

      y,

      prevX:
        x,

      prevY:
        y,

      vx:
        Math.cos(
          angle
        ) *
        CONFIG.weapon
          .bulletSpeed *
        runMods.bulletSpeed,

      vy:
        Math.sin(
          angle
        ) *
        CONFIG.weapon
          .bulletSpeed *
        runMods.bulletSpeed,

      radius:
        CONFIG.weapon
          .bulletRadius,

      damage:
        CONFIG.weapon
          .damage *
        runMods.weaponDamage *
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
        -70 &&

        bullet.x <
        canvas.width +
        70 &&

        bullet.y >
        -70 &&

        bullet.y <
        canvas.height +
        70
    );
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

      bossType:
        getBossType(
          number
        ),

      archetype:
        'BOSS SIGNAL',

      counts:
        {},

      eliteChance:
        0
    };
  }


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
    7
  ) {

    available.push(
      'HUNTER STRIKE'
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


  const archetype =
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
      .05 +
      number *
      .006,
      .20
    );


  let weights = {

    virus: .42,

    runner: .20,

    tank: .13,

    shooter: .10,

    sapper: .07,

    hunter: .08
  };


  if (
    number === 1
  ) {

    weights = {

      virus: 1,

      runner: 0,

      tank: 0,

      shooter: 0,

      sapper: 0,

      hunter: 0
    };

  } else if (
    number === 2
  ) {

    weights = {

      virus: .72,

      runner: .28,

      tank: 0,

      shooter: 0,

      sapper: 0,

      hunter: 0
    };

  } else if (
    archetype ===
    'SWARM WAVE'
  ) {

    total =
      Math.round(
        total *
        1.20
      );


    weights = {

      virus: .55,

      runner: .32,

      hunter: .13,

      tank: 0,

      shooter: 0,

      sapper: 0
    };

  } else if (
    archetype ===
    'ARMORED ASSAULT'
  ) {

    weights = {

      virus: .30,

      runner: .12,

      tank: .42,

      shooter: .08,

      sapper: .08,

      hunter: 0
    };

  } else if (
    archetype ===
    'RANGED ATTACK'
  ) {

    weights = {

      virus: .25,

      runner: .12,

      tank: .10,

      shooter: .40,

      sapper: .03,

      hunter: .10
    };

  } else if (
    archetype ===
    'SIEGE WAVE'
  ) {

    weights = {

      virus: .20,

      runner: .08,

      tank: .27,

      shooter: .10,

      sapper: .28,

      hunter: .07
    };

  } else if (
    archetype ===
    'HUNTER STRIKE'
  ) {

    weights = {

      virus: .22,

      runner: .18,

      tank: .08,

      shooter: .15,

      sapper: .07,

      hunter: .30
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
          .7
        )
      );


    eliteChance =
      Math.min(
        .45,
        .26 +
        number *
        .01
      );
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


  if (
    number <
    7
  ) {

    weights.hunter =
      0;
  }


  return {

    wave:
      number,

    boss:
      false,

    archetype,

    counts:
      allocateCounts(
        total,
        weights
      ),

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
          value
        ]
      ) =>
        sum +
        value,
      0
    );


  const counts =
    {};


  let assigned =
    0;


  entries.forEach(
    (
      [
        type,
        weight
      ],
      index
    ) => {

      const count =
        index ===
        entries.length -
        1

          ? total -
            assigned

          : Math.floor(
              total *
              weight /
              weightTotal
            );


      counts[type] =
        Math.max(
          0,
          count
        );


      assigned +=
        counts[type];
    }
  );


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


  return shuffle(
    queue
  );
}


function beginWaveCombat() {

  setGameState(
    GAME_STATE.PLAYING
  );


  waveState =
    'active';


  buildPanel
    .classList
    .add(
      'hidden'
    );


  clearBuildSelection();


  waveBannerUntil =
    gameTime +
    1600;


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

      enterBuildState();
    }


    return;
  }


  updatePendingSpawns();


  if (
    currentWavePlan.boss
  ) {

    if (
      !boss &&
      pendingBossAt &&
      gameTime >=
      pendingBossAt
    ) {

      pendingBossAt =
        0;


      spawnBoss(
        currentWavePlan
          .bossType
      );
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


function finishWave() {

  if (
    waveState !==
    'active'
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


  let recharge =
    CONFIG.core
      .shieldRechargeBase;


  const clean =
    gameTime -
    core.lastDamageAt >=
    CONFIG.core
      .cleanShieldWindowMs;


  if (clean) {

    recharge +=
      CONFIG.core
        .shieldRechargeCleanBonus;
  }


  const shieldBefore =
    core.shield;


  core.shield =
    Math.min(
      core.maxShield,
      core.shield +
      recharge
    );


  const gainedShield =
    core.shield -
    shieldBefore;


  dataCurrency +=
    CONFIG.economy
      .waveClearData;


  stats.dataCollected +=
    CONFIG.economy
      .waveClearData;


  waveClearMessage =
    `SHIELD +${Math.round(gainedShield)} · DATA +${CONFIG.economy.waveClearData}`;


  if (
    !player.alive &&
    player.lives >
      0
  ) {

    respawnPlayer();
  }


  tone(
    520,
    220,
    'sine',
    .02,
    860
  );
}


function enterBuildState() {

  wave++;


  currentWavePlan =
    generateWavePlan(
      wave
    );


  setGameState(
    GAME_STATE.BUILD
  );


  waveState =
    'prepare';


  const seconds =
    currentWavePlan.boss

      ? CONFIG.waves
          .bossBuildSeconds

      : CONFIG.waves
          .buildSeconds;


  buildEndsAtReal =
    performance.now() +
    seconds *
    1000;


  buildPanel
    .classList
    .remove(
      'hidden'
    );

  setBuildPanelOpen(
    true
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


// ============================================================
// SPAWN
// ============================================================

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
          .eliteChance ||
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


function createSpawnPoint() {

  const side =
    Math.floor(
      Math.random() *
      4
    );


  const margin =
    45;


  if (
    side ===
    0
  ) {

    const x =
      random(
        45,
        canvas.width - 45
      );


    return {

      spawnX: x,

      spawnY:
        -margin,

      warningX: x,

      warningY: 22
    };
  }


  if (
    side ===
    1
  ) {

    const y =
      random(
        45,
        canvas.height - 45
      );


    return {

      spawnX:
        canvas.width +
        margin,

      spawnY: y,

      warningX:
        canvas.width - 22,

      warningY: y
    };
  }


  if (
    side ===
    2
  ) {

    const x =
      random(
        45,
        canvas.width - 45
      );


    return {

      spawnX: x,

      spawnY:
        canvas.height +
        margin,

      warningX: x,

      warningY:
        canvas.height - 22
    };
  }


  const y =
    random(
      45,
      canvas.height - 45
    );


  return {

    spawnX:
      -margin,

    spawnY: y,

    warningX: 22,

    warningY: y
  };
}


// ============================================================
// ENEMIES
// ============================================================

function spawnEnemy(
  spawn
) {

  const base =
    CONFIG.enemies[
      spawn.type
    ];


  const hpScale =
    1 +
    Math.min(
      .7,
      (
        wave -
        1
      ) *
      .022
    );


  const speedScale =
    1 +
    Math.min(
      .38,
      (
        wave -
        1
      ) *
      .015
    );


  const enemy = {

    id:
      nextEntityId++,

    type:
      spawn.type,

    x:
      spawn.spawnX,

    y:
      spawn.spawnY,

    radius:
      base.radius,

    speed:
      base.speed *
      speedScale,

    hp:
      base.hp *
      hpScale,

    maxHp:
      base.hp *
      hpScale,

    damage:
      base.damage,

    reward:
      base.score,

    dataReward:
      base.data,

    expReward:
      base.exp,

    elite:
      spawn.elite ||
      false,

    eliteType:
      null,

    shieldHits:
      0,

    hitFlashUntil:
      0,

    rotation:
      random(
        0,
        Math.PI * 2
      ),

    spin:
      random(
        -2,
        2
      ),

    nextAttackAt:
      gameTime +
      random(
        300,
        750
      ),

    nextBurstAt:
      gameTime +
      random(
        1300,
        2300
      ),

    burstUntil:
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


  enemy.expReward *=
    CONFIG.elite
      .expMultiplier;


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
      1.4;


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

  const validStructures =
    structures.filter(
      structure =>
        structure.hp >
        0
    );


  if (
    enemy.type ===
    'hunter'
  ) {

    return {

      kind:
        player.alive
          ? 'player'
          : 'core',

      entity:
        player.alive
          ? player
          : core
    };
  }


  if (
    enemy.type ===
    'runner'
  ) {

    if (
      player.alive &&
      distance(
        enemy,
        player
      ) <
      520
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


  if (
    enemy.type ===
    'virus'
  ) {

    if (
      player.alive &&
      distance(
        enemy,
        player
      ) <
      360 &&
      distance(
        enemy,
        player
      ) <
      distance(
        enemy,
        core
      )
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


  if (
    enemy.type ===
    'shooter'
  ) {

    return {

      kind:
        player.alive
          ? 'player'
          : 'core',

      entity:
        player.alive
          ? player
          : core
    };
  }


  if (
    enemy.type ===
      'tank' ||
    enemy.type ===
      'sapper'
  ) {

    const structure =
      nearestEntity(
        enemy.x,
        enemy.y,
        validStructures
      );


    if (structure) {

      return {

        kind:
          'structure',

        entity:
          structure
      };
    }


    return {

      kind:
        'core',

      entity:
        core
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

  let result =
    1;


  for (
    const structure
    of structures
  ) {

    if (
      structure.type !==
        'slow' ||
      structure.hp <=
        0 ||
      structure.disabledUntil >
        gameTime
    ) {

      continue;
    }


    if (
      distance(
        enemy,
        structure
      ) <=
      structure.effectRange
    ) {

      result =
        Math.min(
          result,
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

    result *=
      1.4;
  }


  return result;
}


function updateEnemies(
  dt
) {

  for (
    const enemy
    of enemies
  ) {

    if (
      enemy.type ===
      'hunter' &&
      gameTime >=
      enemy.nextBurstAt
    ) {

      enemy.burstUntil =
        gameTime +
        CONFIG.enemies
          .hunter
          .burstDurationMs;


      enemy.nextBurstAt =
        gameTime +
        CONFIG.enemies
          .hunter
          .burstCooldownMs;


      burstAt(
        enemy.x,
        enemy.y,
        '#f06595',
        7,
        1.7
      );
    }


    const target =
      getEnemyTarget(
        enemy
      );


    const dx =
      target.entity.x -
      enemy.x;


    const dy =
      target.entity.y -
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


    const touching =
      dist <=
      enemy.radius +
      target.entity.radius +
      3;


    if (
      enemy.type ===
      'shooter'
    ) {

      const range =
        CONFIG.enemies
          .shooter
          .range;


      let direction =
        0;


      if (
        dist >
        range +
        35
      ) {

        direction =
          1;

      } else if (
        dist <
        range -
        35
      ) {

        direction =
          -.7;
      }


      const speed =
        enemy.speed *
        enemySpeedMultiplier(
          enemy
        );


      enemy.x +=
        Math.cos(
          angle
        ) *
        speed *
        direction *
        dt;


      enemy.y +=
        Math.sin(
          angle
        ) *
        speed *
        direction *
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

          '#4dabf7'
        );


        enemy.nextAttackAt =
          gameTime +
          CONFIG.enemies
            .shooter
            .attackMs;
      }


      continue;
    }


    if (!touching) {

      let speed =
        enemy.speed *
        enemySpeedMultiplier(
          enemy
        );


      if (
        enemy.type ===
          'hunter' &&
        gameTime <
        enemy.burstUntil
      ) {

        speed *=
          CONFIG.enemies
            .hunter
            .burstMultiplier;
      }


      enemy.x +=
        Math.cos(
          angle
        ) *
        speed *
        dt;


      enemy.y +=
        Math.sin(
          angle
        ) *
        speed *
        dt;

    } else if (
      gameTime >=
      enemy.nextAttackAt
    ) {

      attackEnemyTarget(
        enemy,
        target
      );


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


function attackEnemyTarget(
  enemy,
  target
) {

  if (
    target.kind ===
    'player'
  ) {

    damagePlayer(
      enemy.damage
    );

  } else if (
    target.kind ===
    'structure'
  ) {

    damageStructure(
      target.entity,
      enemy.damage
    );

  } else {

    damageCore(
      enemy.damage
    );
  }
}


// ============================================================
// ENEMY PROJECTILES
// ============================================================

function fireEnemyProjectile(
  x,
  y,
  angle,
  speed,
  damage,
  color = '#ff8787',
  radius = 6
) {

  enemyProjectiles.push({

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

    color,

    radius,

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
        canvas.width + 90 &&

        projectile.y >
        -90 &&

        projectile.y <
        canvas.height + 90
    );
}


// ============================================================
// BOSSES
// ============================================================

function getBossType(
  waveNumber
) {

  const bossNumber =
    Math.floor(
      waveNumber /
      5
    );


  const index =
    (
      bossNumber -
      1
    ) %
    4;


  return [
    'ddos',
    'ransomware',
    'rootkit',
    'zeroday'
  ][index];
}


function bossCycle(
  waveNumber
) {

  return Math.floor(
    (
      waveNumber -
      5
    ) /
    20
  );
}


function spawnBoss(
  type
) {

  const base =
    CONFIG.bosses[
      type
    ];


  const cycle =
    bossCycle(
      wave
    );


  const hpScale =
    Math.pow(
      CONFIG.bossScaling
        .hpPerCycle,
      cycle
    );


  boss = {

    id:
      nextEntityId++,

    type,

    name:
      base.name,

    x:
      canvas.width / 2,

    y:
      95,

    radius: 52,

    hp:
      base.baseHp *
      hpScale,

    maxHp:
      base.baseHp *
      hpScale,

    shield:
      type ===
      'ransomware'

        ? base.shield *
          hpScale

        : 0,

    maxShield:
      type ===
      'ransomware'

        ? base.shield *
          hpScale

        : 0,

    speed:
      base.speed *
      (
        1 +
        cycle *
        CONFIG.bossScaling
          .speedPerCycle
      ),

    damage:
      base.damage *
      (
        1 +
        cycle *
        CONFIG.bossScaling
          .damagePerCycle
      ),

    score:
      base.score,

    dataReward:
      base.data,

    expReward:
      base.exp,

    color:
      base.color,

    turretDamageMultiplier:
      base
        .turretDamageMultiplier,

    phase: 1,

    lastPhase: 1,

    rotation: 0,

    hitFlashUntil: 0,

    stealthUntil: 0,

    nextShotAt:
      gameTime + 800,

    nextRadialAt:
      gameTime + 2200,

    nextSummonAt:
      gameTime + 2800,

    nextAbilityAt:
      gameTime + 3300,

    nextTeleportAt:
      gameTime + 2600,

    nextEmpAt:
      gameTime + 3800,

    mode:
      'normal',

    modeUntil: 0,

    chargeX: 0,

    chargeY: 0,

    contactCooldownUntil: 0
  };


  burstAt(
    boss.x,
    boss.y,
    boss.color,
    40,
    5
  );


  screenShake =
    15;


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


  if (
    boss.phase !==
    boss.lastPhase
  ) {

    if (
      boss.type ===
      'ransomware'
    ) {

      boss.shield =
        Math.max(
          boss.shield,

          boss.maxShield *
          .45
        );
    }


    boss.lastPhase =
      boss.phase;


    screenShake =
      10;
  }


  boss.rotation +=
    dt *
    (
      .7 +
      boss.phase *
      .15
    );


  if (
    boss.type ===
    'ddos'
  ) {

    updateDdosBoss(
      dt
    );

  } else if (
    boss.type ===
    'ransomware'
  ) {

    updateRansomwareBoss(
      dt
    );

  } else if (
    boss.type ===
    'rootkit'
  ) {

    updateRootkitBoss(
      dt
    );

  } else {

    updateZeroDayBoss(
      dt
    );
  }


handleBossContact();


if (
  gameState !==
    GAME_STATE.PLAYING ||
  !boss
) {

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


function updateDdosBoss(
  dt
) {

  const target =
    player.alive
      ? player
      : core;


  moveBossToward(
    target,
    dt,
    270
  );


  if (
    gameTime >=
    boss.nextShotAt
  ) {

    bossFireFan(
      target,
      boss.phase === 3
        ? 7
        : 5,
      .10,
      290,
      9
    );


    boss.nextShotAt =
      gameTime +
      (
        boss.phase ===
        3
          ? 560
          : 780
      );
  }


  if (
    gameTime >=
    boss.nextRadialAt
  ) {

    bossRadial(
      boss.phase ===
      3
        ? 18
        : 12,
      235,
      8,
      '#c77dff'
    );


    boss.nextRadialAt =
      gameTime +
      (
        boss.phase ===
        3
          ? 1900
          : 2700
      );
  }


  if (
    gameTime >=
    boss.nextSummonAt
  ) {

    bossSummon(
      boss.phase ===
      3
        ? 6
        : 4,
      [
        'virus',
        'runner'
      ]
    );


    boss.nextSummonAt =
      gameTime +
      (
        boss.phase ===
        3
          ? 2600
          : 3400
      );
  }
}


function updateRansomwareBoss(
  dt
) {

  moveBossToward(
    core,
    dt,
    250
  );


  if (
    gameTime >=
    boss.nextShotAt
  ) {

    bossFireFan(
      core,
      boss.phase === 3
        ? 5
        : 3,
      .13,
      250,
      11
    );


    boss.nextShotAt =
      gameTime +
      900;
  }


  if (
    gameTime >=
    boss.nextAbilityAt
  ) {

    let target =
      player.alive
        ? player
        : core;


    if (
      structures.length >
      0 &&
      Math.random() <
      .5
    ) {

      target =
        structures[
          Math.floor(
            Math.random() *
            structures.length
          )
        ];
    }


    createHazard(
      target.x,
      target.y,
      75,
      4500,
      7,
      '#e64980'
    );


    if (
      structures.length >
      0
    ) {

      const structure =
        structures[
          Math.floor(
            Math.random() *
            structures.length
          )
        ];


      structure.disabledUntil =
        Math.max(
          structure.disabledUntil,
          gameTime + 3000
        );


      addFloatingText(
        structure.x,
        structure.y - 35,
        'ENCRYPTED',
        '#e64980'
      );
    }


    boss.nextAbilityAt =
      gameTime +
      (
        boss.phase ===
        3
          ? 3300
          : 4400
      );
  }


  if (
    boss.phase >=
      2 &&
    gameTime >=
    boss.nextSummonAt
  ) {

    bossSummon(
      boss.phase ===
      3
        ? 4
        : 2,
      [
        'sapper',
        'virus'
      ]
    );


    boss.nextSummonAt =
      gameTime +
      4200;
  }
}


function updateRootkitBoss(
  dt
) {

  const target =
    player.alive
      ? player
      : core;


  moveBossToward(
    target,
    dt,
    180
  );


  if (
    gameTime >=
    boss.nextTeleportAt
  ) {

    const angle =
      random(
        0,
        Math.PI * 2
      );


    const range =
      random(
        170,
        260
      );


    boss.x =
      clamp(

        target.x +
        Math.cos(
          angle
        ) *
        range,

        boss.radius,

        canvas.width -
        boss.radius
      );


    boss.y =
      clamp(

        target.y +
        Math.sin(
          angle
        ) *
        range,

        boss.radius,

        canvas.height -
        boss.radius
      );


    boss.stealthUntil =
      gameTime +
      (
        boss.phase ===
        3
          ? 1600
          : 1200
      );


    boss.nextTeleportAt =
      gameTime +
      (
        boss.phase ===
        3
          ? 2300
          : 3200
      );


    burstAt(
      boss.x,
      boss.y,
      '#9775fa',
      18,
      2.5
    );
  }


  if (
    gameTime >=
    boss.nextShotAt
  ) {

    bossFireFan(
      target,
      boss.phase ===
      3
        ? 5
        : 3,
      .16,
      320,
      11
    );


    boss.nextShotAt =
      gameTime +
      (
        boss.phase ===
        3
          ? 620
          : 900
      );
  }


  if (
    boss.phase >=
      2 &&
    gameTime >=
    boss.nextSummonAt
  ) {

    bossSummon(
      3,
      [
        'hunter',
        'runner'
      ]
    );


    boss.nextSummonAt =
      gameTime +
      3900;
  }
}


function updateZeroDayBoss(
  dt
) {

  if (
    boss.mode ===
    'charge'
  ) {

    boss.x +=
      boss.chargeX *
      430 *
      dt;


    boss.y +=
      boss.chargeY *
      430 *
      dt;


    if (
      gameTime >=
      boss.modeUntil
    ) {

      boss.mode =
        'normal';
    }


    return;
  }


  moveBossToward(
    core,
    dt,
    220
  );


  if (
    gameTime >=
    boss.nextShotAt
  ) {

    bossFireFan(
      player.alive
        ? player
        : core,
      boss.phase === 3
        ? 7
        : 5,
      .11,
      310,
      12
    );


    boss.nextShotAt =
      gameTime +
      (
        boss.phase ===
        3
          ? 520
          : 760
      );
  }


  if (
    gameTime >=
    boss.nextRadialAt
  ) {

    bossRadial(
      boss.phase ===
      3
        ? 20
        : 14,
      260,
      10,
      '#ff922b'
    );


    boss.nextRadialAt =
      gameTime +
      2300;
  }


  if (
    gameTime >=
    boss.nextEmpAt
  ) {

    for (
      const structure
      of structures
    ) {

      structure.disabledUntil =
        Math.max(
          structure.disabledUntil,
          gameTime +
          (
            boss.phase ===
            3
              ? 2500
              : 1800
          )
        );
    }


    addFloatingText(
      core.x,
      core.y - 90,
      'NETWORK EMP',
      '#ff922b'
    );


    boss.nextEmpAt =
      gameTime +
      (
        boss.phase ===
        3
          ? 3800
          : 5000
      );
  }


  if (
    gameTime >=
    boss.nextSummonAt
  ) {

    bossSummon(
      boss.phase ===
      3
        ? 5
        : 3,
      [
        'hunter',
        'sapper',
        'shooter'
      ]
    );


    boss.nextSummonAt =
      gameTime +
      3900;
  }


  if (
    gameTime >=
    boss.nextAbilityAt
  ) {

    const target =
      structures.length >
      0

        ? nearestEntity(
            boss.x,
            boss.y,
            structures
          )

        : core;


    const dx =
      target.x -
      boss.x;


    const dy =
      target.y -
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
      650;


    boss.nextAbilityAt =
      gameTime +
      4800;
  }
}


function moveBossToward(
  target,
  dt,
  desiredRange
) {

  if (
    !boss ||
    !target
  ) {
    return;
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


  const nx =
    dx /
    dist;


  const ny =
    dy /
    dist;


  /*
    Nếu còn xa:
    Boss tiếp tục tiến về mục tiêu.
  */
  if (
    dist >
    desiredRange +
    25
  ) {

    boss.x +=
      nx *
      boss.speed *
      dt;


    boss.y +=
      ny *
      boss.speed *
      dt;


    return;
  }


  /*
    Nếu quá gần:
    Boss lùi nhẹ ra ngoài.
  */
  if (
    dist <
    desiredRange -
    35
  ) {

    boss.x -=
      nx *
      boss.speed *
      .55 *
      dt;


    boss.y -=
      ny *
      boss.speed *
      .55 *
      dt;
  }


  /*
    Khi đã ở đúng khoảng cách:
    Boss chạy vòng quanh mục tiêu
    thay vì đứng im.
  */
  const orbitDirection =
    boss.id % 2 === 0
      ? 1
      : -1;


  const orbitSpeed =
    boss.speed *
    .55;


  boss.x +=
    -ny *
    orbitSpeed *
    orbitDirection *
    dt;


  boss.y +=
    nx *
    orbitSpeed *
    orbitDirection *
    dt;
}


function bossFireFan(
  target,
  count,
  spacing,
  speed,
  damage
) {

  const center =
    Math.atan2(

      target.y -
      boss.y,

      target.x -
      boss.x
    );


  for (
    let i = 0;
    i < count;
    i++
  ) {

    const offset =
      i -
      (
        count -
        1
      ) /
      2;


    fireEnemyProjectile(
      boss.x,
      boss.y,

      center +
      offset *
      spacing,

      speed,

      damage,

      boss.color,

      7
    );
  }
}


function bossRadial(
  count,
  speed,
  damage,
  color
) {

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const angle =
      Math.PI *
      2 *
      i /
      count +
      boss.rotation;


    fireEnemyProjectile(
      boss.x,
      boss.y,
      angle,
      speed,
      damage,
      color,
      6
    );
  }
}


function bossSummon(
  count,
  types
) {

  for (
    let i = 0;
    i < count;
    i++
  ) {

    const angle =
      Math.PI *
      2 *
      i /
      count;


    const type =
      types[
        Math.floor(
          Math.random() *
          types.length
        )
      ];


    spawnEnemyInsideArena(

      type,

      boss.x +
      Math.cos(
        angle
      ) *
      80,

      boss.y +
      Math.sin(
        angle
      ) *
      80,

      .08
    );
  }
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
    ) <
    boss.radius +
    player.radius
  ) {

damagePlayer(
  boss.damage
);


if (
  gameState !==
    GAME_STATE.PLAYING ||
  !boss
) {

  return;
}


boss.contactCooldownUntil =
  gameTime +
  650;


    return;
  }


  if (
    distance(
      boss,
      core
    ) <
    boss.radius +
    core.radius
  ) {

damageCore(
  boss.damage
);


if (
  gameState !==
    GAME_STATE.PLAYING ||
  !boss
) {

  return;
}


boss.contactCooldownUntil =
  gameTime +
  650;


    return;
  }


  const structure =
    structures.find(
      item =>
        distance(
          boss,
          item
        ) <
        boss.radius +
        item.radius
    );


  if (structure) {

    damageStructure(
      structure,
      boss.damage *
      1.2
    );


    boss.contactCooldownUntil =
      gameTime +
      650;
  }
}


function damageBoss(
  bullet
) {

  if (!boss) {
    return;
  }


  if (
    boss.type ===
      'rootkit' &&
    gameTime <
      boss.stealthUntil &&
    bullet.owner ===
      'turret'
  ) {

    return;
  }


  let damage =
    bullet.damage;


  if (
    bullet.owner ===
    'turret'
  ) {

    damage *=
      boss
        .turretDamageMultiplier;
  }


  if (
    boss.type ===
      'rootkit' &&
    bullet.owner ===
      'player' &&
    gameTime <
      boss.stealthUntil
  ) {

    boss.stealthUntil =
      0;


    addFloatingText(
      boss.x,
      boss.y - 55,
      'REVEALED',
      '#d0bfff'
    );
  }


  if (
    boss.shield >
    0
  ) {

    const blocked =
      Math.min(
        boss.shield,
        damage
      );


    boss.shield -=
      blocked;


    damage -=
      blocked;
  }


  boss.hp -=
    damage;


  boss.hitFlashUntil =
    gameTime +
    70;


  if (
    boss.hp <=
    0
  ) {

    killBoss();
  }
}


function killBoss() {

  const deadBoss =
    boss;


  if (!deadBoss) {
    return;
  }


  burstAt(
    deadBoss.x,
    deadBoss.y,
    deadBoss.color,
    70,
    6
  );


  registerKill(

    deadBoss.score,

    deadBoss.dataReward,

    deadBoss.expReward,

    deadBoss.x,

    deadBoss.y - 40,

    true,

    false
  );


  stats.bosses++;


  spawnPickup(
    deadBoss.x,
    deadBoss.y,
    'core'
  );


  boss =
    null;


  screenShake =
    20;
}


// ============================================================
// HAZARDS
// ============================================================

function createHazard(
  x,
  y,
  radius,
  durationMs,
  damage,
  color
) {

  hazards.push({

    x,

    y,

    radius,

    damage,

    color,

    expiresAt:
      gameTime +
      durationMs,

    nextTickAt:
      gameTime +
      500
  });
}


function updateHazards() {

  for (
    const hazard
    of hazards
  ) {

    if (
      gameTime <
      hazard.nextTickAt
    ) {

      continue;
    }


    hazard.nextTickAt =
      gameTime +
      650;


    if (
      player.alive &&
      distance(
        hazard,
        player
      ) <
      hazard.radius
    ) {

      damagePlayer(
        hazard.damage
      );
    }


    for (
      const structure
      of structures
    ) {

      if (
        distance(
          hazard,
          structure
        ) <
        hazard.radius
      ) {

        damageStructure(
          structure,
          hazard.damage *
          .55
        );
      }
    }
  }


  hazards =
    hazards.filter(
      hazard =>
        gameTime <
        hazard.expiresAt
    );
}


// ============================================================
// DEFENSE
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
    runMods.defenseHp;


  return {

    id:
      nextEntityId++,

    type,

    x,

    y,

    radius:
      base.radius,

    level: 1,

    hp:
      maxHp,

    maxHp,

    disabledUntil: 0,

    rotation: 0,

    nextActionAt:
      gameTime +
      random(
        200,
        600
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


function updateStructures(
  dt
) {

  for (
    const structure
    of structures
  ) {

    structure.rotation +=
      dt *
      .8;


    if (
      structure.disabledUntil >
      gameTime
    ) {

      continue;
    }


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


      if (
        boss &&
        !(
          boss.type ===
            'rootkit' &&
          gameTime <
            boss.stealthUntil
        )
      ) {

        targets.push(
          boss
        );
      }


      const range =
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
        );


      const target =
        nearestEntity(

          structure.x,
          structure.y,

          targets.filter(
            target =>
              distance(
                structure,
                target
              ) <=
              range
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

          radius: 3,

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

          crit: false,

          remainingPierce: 0,

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
      core.hp <
        core.maxHp &&
      gameTime >=
        structure.nextActionAt
    ) {

      healCore(

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
        )
      );


      structure.repairCharges--;


      structure.nextActionAt =
        gameTime +
        CONFIG.defenses
          .repair
          .pulseMs;
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

      20,

      3.4
    );
  }
}


// ============================================================
// BUILD PHASE
// ============================================================
function setBuildPanelOpen(
  open
) {

  if (
    gameState !==
    GAME_STATE.BUILD
  ) {

    return;
  }


  buildPanelOpen =
    open;


  buildPanel
    .classList
    .toggle(
      'placement-mode',
      !open
    );


  buildToggleBtn
    .classList
    .toggle(
      'hidden',
      open
    );
}


function enterPlacementMode() {

  if (
    gameState !==
      GAME_STATE.BUILD ||
    !selectedBuildType
  ) {

    return;
  }


  setBuildPanelOpen(
    false
  );
}

function handleBuildCanvasClick() {

  if (
    selectedBuildType
  ) {

    const cost =
      defenseCost(
        selectedBuildType
      );


    const result =
      canPlaceStructure(

        selectedBuildType,

        mouse.x,

        mouse.y
      );


    if (!result.ok) {

      buildHint.textContent =
        result.reason;

      return;
    }


    if (
      dataCurrency <
      cost
    ) {

      buildHint.textContent =
        'Not enough DATA.';

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


    updateBuildUi();


    return;
  }


  const structure =
    nearestEntity(
      mouse.x,
      mouse.y,
      structures
    );


  if (
    structure &&
    distancePoint(

      mouse.x,
      mouse.y,

      structure.x,
      structure.y
    ) <=
    structure.radius +
    12
  ) {

    selectedStructureId =
      structure.id;

  } else {

    selectedStructureId =
      null;
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


  const padding =
    CONFIG.placement
      .edgePadding;


  if (
    x <
      padding +
      radius ||
    x >
      canvas.width -
      padding -
      radius ||
    y <
      padding +
      radius ||
    y >
      canvas.height -
      padding -
      radius
  ) {

    return {

      ok: false,

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

      ok: false,

      reason:
        'Core safety zone.'
    };
  }


  for (
    const structure
    of structures
  ) {

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

        ok: false,

        reason:
          'Defense overlaps another structure.'
      };
    }
  }


  return {

    ok: true,

    reason: ''
  };
}


function selectBuildType(
  type
) {

  selectedBuildType =
    selectedBuildType ===
    type

      ? null

      : type;


  selectedStructureId =
    null;


  updateBuildUi();
}


function clearBuildSelection() {

  selectedBuildType =
    null;


  selectedStructureId =
    null;


  updateBuildUi();
}


function selectedStructure() {

  return (
    structures.find(
      item =>
        item.id ===
        selectedStructureId
    ) ||
    null
  );
}


function structureUpgradeCost(
  structure
) {

  return Math.round(

    CONFIG.defenses[
      structure.type
    ].cost *

    (
      .8 +
      structure.level *
      .6
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

    return;
  }


  dataCurrency -=
    cost;


  structure.level++;


  const oldMax =
    structure.maxHp;


  structure.maxHp *=
    1.30;


  structure.hp +=
    structure.maxHp -
    oldMax;


  if (
    structure.type ===
    'slow'
  ) {

    structure.effectRange *=
      1.10;


    structure.slowAmount *=
      .92;
  }


  if (
    structure.type ===
    'repair'
  ) {

    structure.repairCharges +=
      2;
  }


  sfx.upgrade();


  updateBuildUi();
}


function updateBuildPhase(
  timestamp
) {

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
    currentWavePlan.boss

      ? CONFIG.bosses[
          currentWavePlan
            .bossType
        ].name

      : currentWavePlan
          .archetype;


  threatPreviewList.innerHTML =
    '';


  if (
    currentWavePlan.boss
  ) {

    addThreatChip(
      'BOSS x1'
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

    if (
      count >
      0
    ) {

      addThreatChip(
        `${type.toUpperCase()} x${count}`
      );
    }
  }


  if (
    currentWavePlan
      .eliteChance >=
    .20
  ) {

    addThreatChip(
      'ELITE RISK HIGH'
    );
  }
}


function addThreatChip(
  text
) {

  const chip =
    document.createElement(
      'span'
    );


  chip.className =
    'threat-chip';


  chip.textContent =
    text;


  threatPreviewList
    .appendChild(
      chip
    );
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


    button.classList
      .toggle(
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


  if (!structure) {

    upgradeStructureBtn.disabled =
      true;


    upgradeStructureBtn.textContent =
      'UPGRADE SELECTED';


    return;
  }


  if (
    structure.level >=
    3
  ) {

    upgradeStructureBtn.disabled =
      true;


    upgradeStructureBtn.textContent =
      'MAX LEVEL';


    return;
  }


  const cost =
    structureUpgradeCost(
      structure
    );


  upgradeStructureBtn.disabled =
    dataCurrency <
    cost;


  upgradeStructureBtn.textContent =
    `UPGRADE L${structure.level + 1} - ${cost} DATA`;
}


// ============================================================
// UPGRADES
// ============================================================

const UPGRADE_POOL = [

  {
    name:
      'HEAVY PACKETS',

    rarity:
      'COMMON',

    desc:
      '+25% weapon damage.',

    valid:
      () => true,

    apply() {

      runMods.weaponDamage *=
        1.25;
    }
  },


  {
    name:
      'OVERCLOCK',

    rarity:
      'COMMON',

    desc:
      '+15% fire rate.',

    valid:
      () =>
        runMods.fireRate >
        .5,

    apply() {

      runMods.fireRate *=
        .85;
    }
  },


  {
    name:
      'PACKET SPLITTER',

    rarity:
      'RARE',

    desc:
      '+1 projectile per shot.',

    valid:
      () =>
        runMods.multishot <
        4,

    apply() {

      runMods.multishot++;
    }
  },


  {
    name:
      'PIERCING PROTOCOL',

    rarity:
      'RARE',

    desc:
      '+1 bullet penetration.',

    valid:
      () =>
        runMods.pierce <
        3,

    apply() {

      runMods.pierce++;
    }
  },


  {
    name:
      'ELECTRIC FORK',

    rarity:
      'RARE',

    desc:
      '+15% chain lightning chance.',

    valid:
      () =>
        runMods.chainChance <
        .45,

    apply() {

      runMods.chainChance +=
        .15;
    }
  },


  {
    name:
      'CRITICAL ROUTING',

    rarity:
      'COMMON',

    desc:
      '+8% critical chance.',

    valid:
      () =>
        runMods.critChance <
        .40,

    apply() {

      runMods.critChance +=
        .08;
    }
  },


  {
    name:
      'MOBILITY PATCH',

    rarity:
      'COMMON',

    desc:
      '+10% movement speed.',

    valid:
      () =>
        runMods.playerSpeed <
        1.6,

    apply() {

      runMods.playerSpeed *=
        1.10;
    }
  },


  {
    name:
      'PHASE CACHE',

    rarity:
      'COMMON',

    desc:
      'Dash cooldown -15%.',

    valid:
      () =>
        runMods.dashCooldown >
        .55,

    apply() {

      runMods.dashCooldown *=
        .85;
    }
  },


  {
    name:
      'HARDENED PROCESS',

    rarity:
      'COMMON',

    desc:
      '+20% maximum Player HP.',

    valid:
      () =>
        player.maxHp <
        220,

    apply() {

      const gain =
        player.maxHp *
        .20;


      player.maxHp +=
        gain;


      player.hp +=
        gain;
    }
  },


  {
    name:
      'BACKUP PROCESS',

    rarity:
      'RARE',

    desc:
      '+1 Life. Maximum 4.',

    valid:
      () =>
        player.lives <
        CONFIG.player
          .maxLives,

    apply() {

      player.lives++;
    }
  },


  {
    name:
      'CORE CAPACITY',

    rarity:
      'COMMON',

    desc:
      '+15% Core maximum HP.',

    valid:
      () =>
        core.maxHp <
        2200,

    apply() {

      const old =
        core.maxHp;


      core.maxHp *=
        1.15;


      core.hp +=
        core.maxHp -
        old;
    }
  },


  {
    name:
      'SHIELD MATRIX',

    rarity:
      'COMMON',

    desc:
      '+20% Core maximum shield.',

    valid:
      () =>
        core.maxShield <
        750,

    apply() {

      const old =
        core.maxShield;


      core.maxShield *=
        1.20;


      core.shield +=
        core.maxShield -
        old;
    }
  },


  {
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
        .65,

    apply() {

      runMods.coreDamageMultiplier *=
        .90;
    }
  },


  {
    name:
      'TURRET PROTOCOL',

    rarity:
      'COMMON',

    desc:
      '+25% Turret damage.',

    valid:
      () => true,

    apply() {

      runMods.turretDamage *=
        1.25;
    }
  },


  {
    name:
      'FORTIFICATION',

    rarity:
      'COMMON',

    desc:
      '+20% structure HP.',

    valid:
      () =>
        runMods.defenseHp <
        2,

    apply() {

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
    name:
      'NANOREPAIR',

    rarity:
      'COMMON',

    desc:
      '+25% Repair Node healing.',

    valid:
      () => true,

    apply() {

      runMods.repairAmount *=
        1.25;
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
    shuffle(
      UPGRADE_POOL.filter(
        upgrade =>
          upgrade.valid()
      )
    );


  for (
    const upgrade
    of available.slice(
      0,
      3
    )
  ) {

    const button =
      document.createElement(
        'button'
      );


    button.type =
      'button';


    button.className =
      `upgrade-card ${
        upgrade.rarity ===
        'RARE'

          ? 'rare'

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

  upgrade.apply();


  pendingLevelUps--;


  sfx.upgrade();


  if (
    pendingLevelUps >
    0
  ) {

    upgradeTitle.textContent =
      `LEVEL ${playerLevel}`;


    showUpgradeChoices();

    return;
  }


  upgradePanel
    .classList
    .add(
      'hidden'
    );


  setGameState(
    GAME_STATE.PLAYING
  );
}


// ============================================================
// COMBAT
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

    if (!bullet) {
      continue;
    }


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

      if (!enemy) {
        continue;
      }


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
        bullet.crit
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


      break;
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
      ) <
      bullet.radius +
      boss.radius
    ) {

      bullet.hitIds.add(
        boss.id
      );


      damageBoss(
        bullet
      );

      if (
        gameState !==
        GAME_STATE.PLAYING
      ) {

        return;
      }


      if (
        bullet.remainingPierce >
        0
      ) {

        bullet.remainingPierce--;

      } else {

        consumed =
          true;
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


    if (!projectile) {
      continue;
    }


    let hit =
      false;


    if (
      player.alive &&
      distance(
        projectile,
        player
      ) <
      projectile.radius +
      player.radius
    ) {

      damagePlayer(
        projectile.damage
      );

      if (
        gameState !==
        GAME_STATE.PLAYING
      ) {

        return;
      }


      hit =
        true;

    } else if (
      distance(
        projectile,
        core
      ) <
      projectile.radius +
      core.radius
    ) {

      damageCore(
        projectile.damage
      );

      if (
        gameState !==
        GAME_STATE.PLAYING
      ) {

        return;
      }


      hit =
        true;

    } else {

      const structure =
        structures.find(
          structure =>
            distance(
              projectile,
              structure
            ) <
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
  crit
) {

  if (
    enemy.shieldHits >
    0
  ) {

    enemy.shieldHits--;

    return;
  }


  enemy.hp -=
    damage;


  enemy.hitFlashUntil =
    gameTime +
    80;


  if (crit) {

    addFloatingText(
      enemy.x,
      enemy.y - 30,
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


  registerKill(

    enemy.reward,

    enemy.dataReward,

    enemy.expReward,

    enemy.x,

    enemy.y,

    false,

    enemy.elite
  );


  maybeDropPickup(
    enemy
  );


  enemies.splice(
    index,
    1
  );


  sfx.kill();
}


function registerKill(
  baseScore,
  baseData,
  expReward,
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


  const scoreGain =
    Math.round(
      baseScore *
      comboMultiplier
    );


  const dataGain =
    Math.max(
      1,
      Math.round(
        baseData *
        runMods
          .dataMultiplier
      )
    );


  score +=
    scoreGain;


  dataCurrency +=
    dataGain;


  stats.dataCollected +=
    dataGain;


  addExp(
    expReward
  );


  if (!isBoss) {

    stats.kills++;
  }


  if (isElite) {

    stats.elites++;
  }


  addFloatingText(
    x,
    y - 20,
    `+${scoreGain}`,
    '#ffe066'
  );
}


function maybeChainLightning(
  source,
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


  const target =
    enemies

      .filter(
        enemy =>
          enemy.id !==
            source.id &&
          distance(
            source,
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
            source,
            a
          ) -
          distance(
            source,
            b
          )
      )[0];


  if (!target) {
    return;
  }


  target.hp -=
    damage;


  beams.push({

    x1:
      source.x,

    y1:
      source.y,

    x2:
      target.x,

    y2:
      target.y,

    expiresAt:
      gameTime +
      100
  });
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
    runMods.pickupBonus
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
      .4 &&
    roll <
      .30
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
    .60
  ) {

    type =
      'rapid';

  } else if (
    roll <
    .82
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


function updatePickups() {

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


    if (
      player.alive &&
      distance(
        player,
        pickup
      ) <
      player.radius +
      pickup.radius
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

    player.hp =
      Math.min(
        player.maxHp,

        player.hp +
        CONFIG.pickups
          .playerHeal
      );

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

  } else {

    healCore(
      CONFIG.pickups
        .coreRepair
    );
  }


  sfx.pickup();
}


// ============================================================
// PARTICLES
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
  speedScale = 3
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
        5
      ),

      random(
        220,
        500
      )
    );
  }
}


function createExplosion(
  enemy
) {

  burstAt(

    enemy.x,

    enemy.y,

    CONFIG.enemies[
      enemy.type
    ].color,

    enemy.type ===
    'tank'
      ? 22
      : 14,

    3.5
  );
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
    const text
    of floatingTexts
  ) {

    text.y -=
      40 *
      dt;


    text.lifeMs -=
      dt *
      1000;
  }


  floatingTexts =
    floatingTexts.filter(
      text =>
        text.lifeMs >
        0
    );
}


// ============================================================
// ENDING
// ============================================================

function startEnding(
  reason
) {

  if (
    gameState ===
      GAME_STATE.ENDING ||
    gameState ===
      GAME_STATE.GAMEOVER
  ) {

    return;
  }


  setGameState(
    GAME_STATE.ENDING
  );


  endingReason =
    reason;


  endingStartedAtReal =
    performance.now();


  endingDeadlineReal =
    endingStartedAtReal +
    CONFIG.ending.durationMs +
    500;


  endingResultShown =
    false;


  mouse.isDown =
    false;


  waveState =
    'ending';


  selectedBuildType =
    null;


  selectedStructureId =
    null;


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


  buildToggleBtn
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


/*
  KHÔNG clear entity ở startEnding().

  startEnding() có thể được gọi ngay giữa:
  - checkCombatCollisions()
  - updateBoss()
  - updateEnemies()

  Nếu xóa array/object ở đây thì vòng lặp hiện tại
  vẫn tiếp tục và sẽ đọc phần tử undefined.
  GAME_STATE.ENDING đã đủ để đóng băng gameplay.
*/


  const target =
    reason ===
    'CORE BREACHED'

      ? core

      : player;


  burstAt(
    target.x,
    target.y,
    '#ff4d6d',
    80,
    7
  );


  burstAt(
    target.x,
    target.y,
    '#c77dff',
    50,
    5
  );


  screenShake =
    25;


  tone(
    100,
    1000,
    'sawtooth',
    .05,
    35
  );


  if (
    endingTimeoutId !==
    null
  ) {

    window.clearTimeout(
      endingTimeoutId
    );
  }


  // Failsafe:
  // kể cả RAF ending có lỗi,
  // Result Screen vẫn phải mở.
  endingTimeoutId =
    window.setTimeout(
      () => {

        if (
          gameState ===
          GAME_STATE.ENDING
        ) {

          showGameOver();
        }

      },

      CONFIG.ending
        .durationMs +
      650
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


  if (
    timestamp >=
    endingDeadlineReal
  ) {

    showGameOver();


    return;
  }


  const elapsed =
    timestamp -
    endingStartedAtReal;


  if (
    elapsed >=
    CONFIG.ending
      .durationMs
  ) {

    showGameOver();
  }
}


function showGameOver() {
  if (
    endingResultShown
  ) {

    return;
  }

  endingResultShown =
    true;

  if (
    endingTimeoutId !==
    null
  ) {

    window.clearTimeout(
      endingTimeoutId
    );


    endingTimeoutId =
      null;
  }


  setGameState(
    GAME_STATE.GAMEOVER
  );


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
// DRAW
// ============================================================

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
      random(
        -screenShake / 2,
        screenShake / 2
      );


    shakeY =
      random(
        -screenShake / 2,
        screenShake / 2
      );
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

    drawHazards();

    drawCore();

    drawSpawnWarnings();

    drawStructures();

    drawPickups();

    drawEnemyProjectiles();

    drawBullets();

    drawBeams();

    drawEnemies();

    drawBoss();

    drawPlayer();

    drawRespawnStatus();

    drawParticles();

    drawFloatingTexts();

    drawWaveOverlay();

    drawPlacementPreview();
  }


  ctx.restore();


  drawCrosshair();


  if (
    gameState ===
    GAME_STATE.ENDING
  ) {

    drawEndingGlitch(
      timestamp
    );
  }
}


function drawGrid() {

  const time =
    performance.now();


  ctx.save();


  ctx.strokeStyle =
    `rgba(
      54,
      91,
      135,
      ${
        .10 +
        Math.sin(
          time *
          .002
        ) *
        .025
      }
    )`;


  for (
    let x = 0;
    x < canvas.width;
    x += 50
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
    y += 50
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


    const radius =
      32 -
      progress *
      14;


    const pulse =
      .65 +
      Math.sin(
        performance.now() *
        .018
      ) *
      .25;


    const color =
      pending.elite

        ? '#ffd43b'

        : '#ff4d6d';


    ctx.globalAlpha =
      pulse;


    ctx.beginPath();


    ctx.arc(
      pending.warningX,
      pending.warningY,
      radius,
      0,
      Math.PI * 2
    );


    ctx.strokeStyle =
      color;


    ctx.lineWidth =
      3;


    ctx.shadowColor =
      color;


    ctx.shadowBlur =
      18;


    ctx.stroke();


    ctx.beginPath();


    ctx.arc(
      pending.warningX,
      pending.warningY,
      5,
      0,
      Math.PI * 2
    );


    ctx.fillStyle =
      color;


    ctx.fill();
  }


  if (
    pendingBossAt
  ) {

    const pulse =
      48 +
      Math.sin(
        performance.now() *
        .012
      ) *
      8;


    ctx.beginPath();


    ctx.arc(
      canvas.width / 2,
      95,
      pulse,
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
      28;


    ctx.stroke();


    ctx.font =
      'bold 17px monospace';


    ctx.textAlign =
      'center';


    ctx.fillStyle =
      '#ffb3c1';


    ctx.fillText(
      'BOSS SIGNAL',
      canvas.width / 2,
      101
    );
  }


  ctx.restore();
}


function drawEnemies() {

  for (
    const enemy
    of enemies
  ) {

    const color =
      gameTime <
      enemy.hitFlashUntil

        ? '#ffffff'

        : CONFIG.enemies[
            enemy.type
          ].color;


    ctx.save();


    ctx.translate(
      enemy.x,
      enemy.y
    );


    ctx.rotate(
      enemy.rotation
    );


    if (
      enemy.elite
    ) {

      ctx.beginPath();


      ctx.arc(
        0,
        0,
        enemy.radius + 7,
        0,
        Math.PI * 2
      );


      ctx.strokeStyle =
        '#ffd43b';


      ctx.lineWidth =
        3;


      ctx.stroke();
    }


    if (
      enemy.type ===
      'runner'
    ) {

      ctx.beginPath();

      ctx.moveTo(
        enemy.radius + 4,
        0
      );

      ctx.lineTo(
        -enemy.radius,
        -enemy.radius
      );

      ctx.lineTo(
        -enemy.radius,
        enemy.radius
      );

      ctx.closePath();

      ctx.fillStyle =
        color;

      ctx.fill();

    } else if (
      enemy.type ===
      'shooter'
    ) {

      ctx.fillStyle =
        color;


      ctx.fillRect(
        -enemy.radius,
        -enemy.radius,
        enemy.radius * 2,
        enemy.radius * 2
      );

    } else if (
      enemy.type ===
      'hunter'
    ) {

      drawPolygon(
        0,
        0,
        enemy.radius,
        4,
        color,
        false
      );

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

    } else {

      drawStarShape(

        0,
        0,

        enemy.radius,

        enemy.radius *
        .68,

        enemy.type ===
        'tank'
          ? 8
          : 12,

        color
      );
    }


    ctx.restore();

        if (
            enemy.maxHp >
            1
          ) {

            drawSmallHpBar(

              enemy.x,

              enemy.y -
              enemy.radius -
              11,

              42,

              enemy.hp /
              enemy.maxHp,

              CONFIG.enemies[
                enemy.type
              ].color
            );
          }
  }


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


  if (
    boss.type ===
      'rootkit' &&
    gameTime <
      boss.stealthUntil
  ) {

    ctx.globalAlpha =
      .22;
  }


  drawStarShape(

    0,
    0,

    boss.radius,

    boss.radius *
    .68,

    boss.type ===
    'zeroday'
      ? 18
      : 14,

    gameTime <
    boss.hitFlashUntil

      ? '#ffffff'

      : boss.color
  );


  ctx.beginPath();


  ctx.arc(
    0,
    0,
    15,
    0,
    Math.PI * 2
  );


  ctx.fillStyle =
    '#ffffff';


  ctx.fill();


  ctx.restore();


  if (
    boss.shield >
    0
  ) {

    ctx.save();


    ctx.beginPath();


    ctx.arc(
      boss.x,
      boss.y,
      boss.radius + 10,
      0,
      Math.PI * 2
    );


    ctx.strokeStyle =
      '#e64980';


    ctx.lineWidth =
      4;


    ctx.stroke();


    ctx.restore();
  }
}


function drawStructures() {

  for (
    const structure
    of structures
  ) {

    const config =
      CONFIG.defenses[
        structure.type
      ];


    ctx.save();


    ctx.translate(
      structure.x,
      structure.y
    );


    ctx.globalAlpha =
      structure.disabledUntil >
      gameTime

        ? .35

        : 1;


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
        'rgba(116,192,252,.05)';


      ctx.fill();
    }


    drawPolygon(

      0,
      0,

      structure.radius,

      structure.type ===
      'repair'
        ? 4
        : 6,

      config.color,

      false
    );


    ctx.restore();
      drawSmallHpBar(

  structure.x,

  structure.y -
  structure.radius -
  10,

  40,

  structure.hp /
  structure.maxHp,

  CONFIG.defenses[
    structure.type
  ].color
);


if (
  structure.disabledUntil >
  gameTime
) {

  ctx.save();


  ctx.font =
    'bold 10px monospace';


  ctx.textAlign =
    'center';


  ctx.fillStyle =
    '#ff8fab';


  ctx.shadowColor =
    '#e64980';


  ctx.shadowBlur =
    8;


  ctx.fillText(
    'ENCRYPTED',
    structure.x,
    structure.y -
    structure.radius -
    20
  );


  ctx.restore();
}
  }


}


function drawBullets() {

  ctx.save();


  ctx.lineCap =
    'round';


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

        : bullet.remainingPierce >
          0

          ? 5

          : 4;


    ctx.shadowColor =
      bullet.color;


    ctx.shadowBlur =
      bullet.owner ===
      'turret'

        ? 9

        : 14;


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
      '#fffbe6';


    ctx.fill();
  }


  ctx.restore();
}


function drawEnemyProjectiles() {

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


    ctx.fill();
  }
}


function drawPickups() {

  const now =
    performance.now();


  for (
    const pickup
    of pickups
  ) {

    const y =
      pickup.y +
      Math.sin(
        now *
        .004 +
        pickup.phase
      ) *
      5;


    let color =
      '#74c0fc';


    let label =
      'S';


    if (
      pickup.type ===
      'heal'
    ) {

      color =
        '#69db7c';

      label =
        'H';

    } else if (
      pickup.type ===
      'rapid'
    ) {

      color =
        '#ffe066';

      label =
        'R';

    } else if (
      pickup.type ===
      'core'
    ) {

      color =
        '#c77dff';

      label =
        'C';
    }


    ctx.save();


    ctx.translate(
      pickup.x,
      y
    );


    ctx.rotate(
      now *
      .001 +
      pickup.phase
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
      20;


    ctx.fill();


    ctx.rotate(
      -(
        now *
        .001 +
        pickup.phase
      )
    );


    ctx.fillStyle =
      '#071018';


    ctx.font =
      'bold 11px monospace';


    ctx.textAlign =
      'center';


    ctx.textBaseline =
      'middle';


    ctx.fillText(
      label,
      0,
      1
    );


    ctx.restore();
  }
}


function drawHazards() {

  for (
    const hazard
    of hazards
  ) {

    ctx.beginPath();


    ctx.arc(
      hazard.x,
      hazard.y,
      hazard.radius,
      0,
      Math.PI * 2
    );


    ctx.fillStyle =
      `${hazard.color}22`;


    ctx.strokeStyle =
      hazard.color;


    ctx.lineWidth =
      2;


    ctx.fill();

    ctx.stroke();
  }
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


    ctx.shadowColor =
      item.color;


    ctx.shadowBlur =
      7;


    ctx.fillText(
      item.text,
      item.x,
      item.y
    );
  }


  ctx.restore();
}


function drawBeams() {

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
      '#63e6ff';


    ctx.lineWidth =
      3;


    ctx.stroke();
  }
}


function drawWaveOverlay() {

  ctx.save();


  ctx.textAlign =
    'center';


  if (
    gameTime <
    waveBannerUntil
  ) {

    ctx.font =
      'bold 38px monospace';


    ctx.fillStyle =
      currentWavePlan.boss

        ? '#ff9bab'

        : '#b8f6ff';


    ctx.fillText(

      currentWavePlan.boss

        ? `BOSS WAVE ${wave}`

        : `WAVE ${wave}`,

      canvas.width / 2,

      95
    );
  }


  if (
    waveState ===
      'cleared'
  ) {

    ctx.font =
      'bold 30px monospace';


    ctx.fillStyle =
      '#69f0ae';


    ctx.fillText(
      'SECTOR SECURED',
      canvas.width / 2,
      canvas.height / 2
    );


    ctx.font =
      '14px monospace';


    ctx.fillText(
      waveClearMessage,
      canvas.width / 2,
      canvas.height / 2 + 30
    );
  }


  if (
    lastStandActive
  ) {

    ctx.font =
      'bold 15px monospace';


    ctx.fillStyle =
      '#ff6b81';


    ctx.fillText(
      'CRITICAL CORE CONDITION — LAST STAND',
      canvas.width / 2,
      canvas.height - 24
    );
  }


  ctx.restore();
}


function drawPlacementPreview() {

  if (
    gameState !==
      GAME_STATE.BUILD ||
    !selectedBuildType
  ) {

    return;
  }


  const config =
    CONFIG.defenses[
      selectedBuildType
    ];


  const valid =
    canPlaceStructure(

      selectedBuildType,

      mouse.x,

      mouse.y
    ).ok &&
    dataCurrency >=
      config.cost;


  ctx.beginPath();


  ctx.arc(
    mouse.x,
    mouse.y,
    config.radius,
    0,
    Math.PI * 2
  );


  ctx.fillStyle =
    valid

      ? 'rgba(105,219,124,.55)'

      : 'rgba(255,107,107,.55)';


  ctx.fill();
}

function crosshairThreatDetected() {

  for (
    const enemy
    of enemies
  ) {

    if (
      distancePoint(
        mouse.x,
        mouse.y,
        enemy.x,
        enemy.y
      ) <=
      enemy.radius +
      8
    ) {

      return true;
    }
  }


  if (
    boss &&
    distancePoint(
      mouse.x,
      mouse.y,
      boss.x,
      boss.y
    ) <=
    boss.radius +
    8
  ) {

    return true;
  }


  return false;
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


  let color =
    '#9befff';


  if (
    gameState ===
    GAME_STATE.BUILD &&
    selectedBuildType
  ) {

    const valid =
      canPlaceStructure(
        selectedBuildType,
        mouse.x,
        mouse.y
      ).ok &&
      dataCurrency >=
      defenseCost(
        selectedBuildType
      );


    color =
      valid

        ? '#69db7c'

        : '#ff6b6b';

  } else if (
    crosshairThreatDetected()
  ) {

    color =
      '#ff8787';
  }


  ctx.save();


  ctx.strokeStyle =
    color;


  ctx.lineWidth =
    2;


  ctx.shadowColor =
    color;


  ctx.shadowBlur =
    10;


  const gap =
    6;


  const length =
    10;


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
    mouse.x -
    gap -
    length,
    mouse.y
  );


  ctx.lineTo(
    mouse.x -
    gap,
    mouse.y
  );


  ctx.moveTo(
    mouse.x +
    gap,
    mouse.y
  );


  ctx.lineTo(
    mouse.x +
    gap +
    length,
    mouse.y
  );


  ctx.moveTo(
    mouse.x,
    mouse.y -
    gap -
    length
  );


  ctx.lineTo(
    mouse.x,
    mouse.y -
    gap
  );


  ctx.moveTo(
    mouse.x,
    mouse.y +
    gap
  );


  ctx.lineTo(
    mouse.x,
    mouse.y +
    gap +
    length
  );


  ctx.stroke();


  ctx.restore();
}


function drawEndingGlitch(
  timestamp
) {

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


  // Nền đỏ tăng dần
  ctx.fillStyle =
    `rgba(
      80,
      0,
      14,
      ${
        .06 +
        progress *
        .30
      }
    )`;


  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  // Các vạch glitch dài giống bản đầu
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


// ============================================================
// HUD
// ============================================================

function updateHud() {

  hpText.textContent =
    Math.ceil(
      player.hp
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
    Math.ceil(
      core.hp
    );


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


  const needed =
    expNeeded(
      playerLevel
    );


  levelText.textContent =
    playerLevel;


  expText.textContent =
    `${Math.floor(playerExp)} / ${needed} EXP`;


  expBar.style.width =
    `${
      clamp(
        playerExp /
        needed,
        0,
        1
      ) *
      100
    }%`;


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


  if (
    !player.alive &&
    player.lives >
    0
  ) {

    dashStatus.textContent =
      `REBOOT ${Math.max(
        0,
        (
          player.respawnAt -
          gameTime
        ) /
        1000
      ).toFixed(1)}s`;

  } else {

    dashStatus.textContent =
      gameTime >=
      player.dashCooldownUntil

        ? 'DASH READY'

        : `DASH ${
            (
              (
                player.dashCooldownUntil -
                gameTime
              ) /
              1000
            ).toFixed(1)
          }s`;
  }


  const powerParts =
    [];


  if (
    gameTime <
    player.rapidFireUntil
  ) {

    powerParts.push(
      `RAPID ${(
        (
          player.rapidFireUntil -
          gameTime
        ) /
        1000
      ).toFixed(1)}s`
    );
  }


  if (
    player.shieldCharges >
    0
  ) {

    powerParts.push(
      `P-SHIELD x${player.shieldCharges}`
    );
  }


  powerStatus.textContent =
    powerParts.length >
    0

      ? powerParts.join(
          ' · '
        )

      : 'NO POWER-UP';


  if (
    boss
  ) {

    bossHud
      .classList
      .remove(
        'hidden'
      );


    let suffix =
      ` · PHASE ${boss.phase}`;


    if (
      boss.type ===
        'ransomware' &&
      boss.shield >
        0
    ) {

      suffix +=
        ` · ENC ${Math.ceil(boss.shield)}`;
    }


    if (
      boss.type ===
        'rootkit' &&
      gameTime <
        boss.stealthUntil
    ) {

      suffix +=
        ' · STEALTH';
    }


    bossName.textContent =
      boss.name +
      suffix;


    bossHpText.textContent =
      `${Math.ceil(boss.hp)} / ${Math.ceil(boss.maxHp)}`;


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

    stateStatus.textContent =
      'BUILD PHASE';

  } else if (
    gameState ===
    GAME_STATE.UPGRADE
  ) {

    stateStatus.textContent =
      'LEVEL UP';

  } else if (
    lastStandActive
  ) {

    stateStatus.textContent =
      'LAST STAND';

  } else {

    stateStatus.textContent =
      currentWavePlan
        ?.archetype ||
      'SYSTEM READY';
  }
}


// ============================================================
// GAME LOOP
// ============================================================
function updateGame(
  dt
) {

  updatePlayer(
    dt
  );


  if (
    gameState !==
    GAME_STATE.PLAYING
  ) return;


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


  if (
    gameState !==
    GAME_STATE.PLAYING
  ) return;


  updateBoss(
    dt
  );


  if (
    gameState !==
    GAME_STATE.PLAYING
  ) {

    return;
  }


  updateEnemyProjectiles(
    dt
  );


  updateHazards();


  if (
    gameState !==
    GAME_STATE.PLAYING
  ) return;


  updatePickups();


  updateParticles(
    dt
  );


  updateFloatingTexts(
    dt
  );


  updateCombo();


  checkCombatCollisions();


  if (
    gameState !==
    GAME_STATE.PLAYING
  ) {

    return;
  }


  updateWaveSystem();


  if (
    gameState !==
    GAME_STATE.PLAYING
  ) return;


  checkPendingLevelUp();


  screenShake =
    Math.max(
      0,
      screenShake -
      35 *
      dt
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
// RESET
// ============================================================

function resetRun() {
  if (
    endingTimeoutId !==
    null
  ) {

    window.clearTimeout(
      endingTimeoutId
    );


    endingTimeoutId =
      null;
  }


  endingDeadlineReal =
    0;

  endingStartedAtReal =
    0;


  lastFrameTimestamp =
    performance.now();


  for (
    const key
    of Object.keys(
      keys
    )
  ) {

    delete keys[key];
  }

  score =
    0;


  dataCurrency =
    CONFIG.economy
      .startingData;


  wave =
    1;


  gameTime =
    0;


  playerLevel =
    1;


  playerExp =
    0;


  pendingLevelUps =
    0;


  nextEntityId =
    1;


  bullets = [];

  enemies = [];

  enemyProjectiles = [];

  particles = [];

  floatingTexts = [];

  pickups = [];

  structures = [];

  beams = [];

  hazards = [];

  pendingSpawns = [];


  boss =
    null;


  pendingBossAt =
    0;


  comboStreak =
    0;


  comboMultiplier =
    1;


  bestComboMultiplier =
    1;


  lastStandActive =
    false;


  endingReason =
    '';


  endingResultShown =
    false;


  Object.assign(
    runMods,
    {

      playerSpeed: 1,

      dashCooldown: 1,

      weaponDamage: 1,

      fireRate: 1,

      bulletSpeed: 1,

      multishot: 0,

      pierce: 0,

      critChance: 0,

      critMultiplier: 2,

      chainChance: 0,

      dataMultiplier: 1,

      pickupBonus: 0,

      coreDamageMultiplier: 1,

      turretDamage: 1,

      defenseHp: 1,

      slowMultiplier: 1,

      repairAmount: 1,

      repairChargeBonus: 0
    }
  );


  Object.assign(
    stats,
    {

      kills: 0,

      elites: 0,

      bosses: 0,

      structuresBuilt: 0,

      coreDamageTaken: 0,

      dataCollected: 0
    }
  );


  core.x =
    canvas.width / 2;


  core.y =
    canvas.height / 2;


  core.maxHp =
    CONFIG.core
      .maxHp;


  core.hp =
    core.maxHp;


  core.maxShield =
    CONFIG.core
      .maxShield;


  core.shield =
    core.maxShield;


  core.lastDamageAt =
    -Infinity;

  core.flashUntil =
    0;

  player.maxHp =
    CONFIG.player
      .maxHp;


  player.hp =
    player.maxHp;


  player.lives =
    CONFIG.player
      .startLives;


  player.alive =
    true;

  player.respawnAt =
    0;

  player.hurtFlashUntil =
    0;

  
  player.angle =
    -Math.PI /
    2;


  player.x =
    core.x;


  player.y =
    core.y +
    125;


  player.invulnerableUntil =
    0;

  player.dashUntil =
    0;

  player.dashCooldownUntil =
    0;

  player.dashX =
    0;


  player.dashY =
    -1;


  player.shieldCharges =
    0;


  player.rapidFireUntil =
    0;


  mouse.isDown =
    false;


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

  lastShotAt =
    -Infinity;


  muzzleFlashUntil =
    0;


  screenShake =
    0;


  waveBannerUntil =
    0;


  waveClearUntil =
    0;


  waveClearMessage =
    '';


  comboExpiresAt =
    0;


  selectedBuildType =
    null;


  selectedStructureId =
    null;


  buildPanelOpen =
    true;

  buildToggleBtn
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

  setGameState(
    GAME_STATE.MENU
  );


  startMenu
    .classList
    .remove(
      'hidden'
    );


  buildPanel
    .classList
    .add(
      'hidden'
    );


  gameOverPanel
    .classList
    .add(
      'hidden'
    );
}


// ============================================================
// HELPERS
// ============================================================

function getThreatCount() {

  return (

    waveQueue.length +

    pendingSpawns.length +

    enemies.length +

    (
      boss ||
      pendingBossAt

        ? 1

        : 0
    )
  );
}


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

  if (
    !a ||
    !b
  ) {

    return Infinity;
  }


  return Math.hypot(
    a.x - b.x,
    a.y - b.y
  );
}


function distancePoint(
  x1,
  y1,
  x2,
  y2
) {

  return Math.hypot(
    x1 - x2,
    y1 - y2
  );
}


function nearestEntity(
  x,
  y,
  list
) {

  let result =
    null;


  let best =
    Infinity;


  for (
    const item
    of list
  ) {

    const d =
      distancePoint(
        x,
        y,
        item.x,
        item.y
      );


    if (
      d <
      best
    ) {

      best =
        d;


      result =
        item;
    }
  }


  return result;
}


function shuffle(
  array
) {

  const copy =
    [
      ...array
    ];


  for (
    let i =
      copy.length - 1;

    i >
    0;

    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
        (
          i + 1
        )
      );


    [
      copy[i],
      copy[j]
    ] =
      [
        copy[j],
        copy[i]
      ];
  }


  return copy;
}


function formatTime(
  seconds
) {

  const total =
    Math.floor(
      seconds
    );


  const minutes =
    Math.floor(
      total / 60
    );


  const secs =
    total % 60;


  return (
    String(
      minutes
    )
      .padStart(
        2,
        '0'
      ) +

    ':' +

    String(
      secs
    )
      .padStart(
        2,
        '0'
      )
  );
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
    'rgba(0,0,0,.65)';


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


  ctx.shadowColor =
    color;


  ctx.shadowBlur =
    5;


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


function drawPolygon(
  x,
  y,
  radius,
  sides,
  color,
  strokeOnly
) {

  ctx.beginPath();


  for (
    let i = 0;
    i < sides;
    i++
  ) {

    const angle =
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


  if (strokeOnly) {

    ctx.strokeStyle =
      color;


    ctx.stroke();

  } else {

    ctx.fillStyle =
      color;


    ctx.fill();
  }
}


function drawStarShape(
  x,
  y,
  outer,
  inner,
  points,
  color
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
      i % 2 === 0

        ? outer

        : inner;


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
    color;


  ctx.fill();
}


// ============================================================
// EVENTS
// ============================================================

buildPanel.addEventListener(
  'mouseleave',
  () => {

    if (
      selectedBuildType
    ) {

      enterPlacementMode();
    }
  }
);


buildToggleBtn.addEventListener(
  'click',
  () => {

    setBuildPanelOpen(
      true
    );
  }
);

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
  startNextWaveFromBuild
);


upgradeStructureBtn
  .addEventListener(
    'click',
    upgradeSelectedStructure
  );


for (
  const button
  of buildButtons
) {

  button.addEventListener(
    'click',
    () => {

      selectBuildType(
        button.dataset
          .build
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