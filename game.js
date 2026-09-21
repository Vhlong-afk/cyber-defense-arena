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

const scoreText =
  document.querySelector(
    '#score'
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

const startMenu =
  document.querySelector(
    '#startMenu'
  );

const startBtn =
  document.querySelector(
    '#startBtn'
  );


const bossHud =
  document.querySelector(
    '#bossHud'
  );

const bossHpText =
  document.querySelector(
    '#bossHpText'
  );

const bossHpBar =
  document.querySelector(
    '#bossHpBar'
  );


const pausePanel =
  document.querySelector(
    '#pausePanel'
  );

const gameOverPanel =
  document.querySelector(
    '#gameOver'
  );

const finalScore =
  document.querySelector(
    '#finalScore'
  );

const finalWave =
  document.querySelector(
    '#finalWave'
  );

const finalCombo =
  document.querySelector(
    '#finalCombo'
  );

const restartBtn =
  document.querySelector(
    '#restartBtn'
  );


canvas.style.cursor =
  'none';


// ============================================================
// CONFIG
// Phần lớn cân bằng game sau này chỉ sửa ở đây.
// ============================================================

const CONFIG = {

  player: {

    radius:
      18,

    speed:
      250,

    maxHp:
      100,

    hitInvulnerabilityMs:
      450,

    dashSpeed:
      820,

    dashDurationMs:
      135,

    dashCooldownMs:
      1150

  },


  weapon: {

    fireIntervalMs:
      140,

    bulletSpeed:
      760,

    bulletRadius:
      4,

    bulletLifeMs:
      1250,

    damage:
      1,

    rapidFireMultiplier:
      0.52,

    rapidFireDurationMs:
      6500

  },


  enemies: {

    virus: {

      radius:
        16,

      speed:
        95,

      hp:
        1,

      damage:
        10,

      score:
        10,

      color:
        '#ff5c7a'

    },


    runner: {

      radius:
        11,

      speed:
        165,

      hp:
        1,

      damage:
        12,

      score:
        15,

      color:
        '#ffa94d'

    },


    tank: {

      radius:
        24,

      speed:
        62,

      hp:
        4,

      damage:
        22,

      score:
        35,

      color:
        '#b197fc'

    },


    shooter: {

      radius:
        17,

      speed:
        82,

      hp:
        2,

      damage:
        15,

      score:
        30,

      color:
        '#4dabf7',

      preferredRange:
        245,

      fireIntervalMs:
        1550,

      projectileSpeed:
        225

    }

  },


  enemyProjectile: {

    radius:
      6,

    lifeMs:
      6000

  },


  waves: {

    baseEnemies:
      7,

    enemiesPerWave:
      3,

    baseSpawnIntervalMs:
      820,

    minSpawnIntervalMs:
      330,

    spawnWarningMs:
      620,

    breakMs:
      2300,

    repairPerClear:
      8,

    bossEvery:
      5

  },


  boss: {

    radius:
      48,

    baseHp:
      48,

    hpPerBossTier:
      26,

    speed:
      72,

    contactDamage:
      30,

    score:
      500,

    targetedShotIntervalMs:
      1050,

    radialIntervalMs:
      3100,

    chargeIntervalMs:
      5600,

    chargeWarningMs:
      650,

    chargeDurationMs:
      650,

    chargeSpeed:
      420,

    projectileSpeed:
      260

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

    healAmount:
      24,

    shieldMaxCharges:
      2

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


const player = {

  x:
    canvas.width / 2,

  y:
    canvas.height / 2,

  radius:
    CONFIG.player.radius,

  hp:
    CONFIG.player.maxHp,

  angle:
    0,

  hurtFlashUntil:
    0,

  invulnerableUntil:
    0,

  dashUntil:
    0,

  dashCooldownUntil:
    0,

  dashX:
    0,

  dashY:
    0,

  shieldCharges:
    0,

  rapidFireUntil:
    0

};


let bullets = [];

let enemies = [];

let enemyProjectiles = [];

let particles = [];

let floatingTexts = [];

let pickups = [];

let pendingSpawns = [];


let boss =
  null;

let pendingBoss =
  null;

let bossSpawnedThisWave =
  false;


let score =
  0;

let wave =
  1;


let enemiesPlanned =
  0;

let spawnedThisWave =
  0;


let waveState =
  'active';

let nextWaveAt =
  0;

let lastEnemySpawnAt =
  0;


let waveBannerUntil =
  0;

let waveClearUntil =
  0;

let waveRewardMessage =
  '';


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

let screenShake =
  0;

let muzzleFlashUntil =
  0;


let gameState =
  GAME_STATE.MENU;


let gameTime =
  0;

let lastFrameTimestamp =
  performance.now();


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

  type =
    'sine',

  volume =
    0.025,

  endFrequency =
    frequency

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


function sfxShoot() {

  tone(
    520,
    55,
    'square',
    0.014,
    310
  );
}


function sfxHit() {

  tone(
    180,
    70,
    'square',
    0.018,
    100
  );
}


function sfxKill() {

  tone(
    260,
    90,
    'sawtooth',
    0.018,
    520
  );
}


function sfxPlayerHit() {

  tone(
    120,
    150,
    'sawtooth',
    0.035,
    55
  );
}


function sfxPickup() {

  tone(
    460,
    130,
    'sine',
    0.025,
    900
  );
}


function sfxDash() {

  tone(
    280,
    110,
    'sawtooth',
    0.018,
    120
  );
}


function sfxBoss() {

  tone(
    85,
    500,
    'sawtooth',
    0.045,
    48
  );
}


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
      event.key
        .toLowerCase()
    ] =
      true;
  }
);


window.addEventListener(

  'keyup',

  event => {

    keys[
      event.key
        .toLowerCase()
    ] =
      false;
  }
);


canvas.addEventListener(

  'mousemove',

  event => {

    const rect =
      canvas
        .getBoundingClientRect();


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

    event.button !==
        0 ||

    gameState !==
        GAME_STATE.PLAYING

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
// PLAYER / DASH
// ============================================================

function tryDash() {

    if (

    gameState !==
        GAME_STATE.PLAYING ||

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
      .dashCooldownMs;


  player.invulnerableUntil =
    Math.max(

      player
        .invulnerableUntil,

      player
        .dashUntil
    );


  screenShake =
    Math.max(
      screenShake,
      3
    );


  sfxDash();
}


function updatePlayer(
  dt
) {

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
      0.7
    ) {

      createParticle(

        player.x -
        player.dashX *
        10,

        player.y -
        player.dashY *
        10,

        -player.dashX *
        (
          40 +
          Math.random() *
          80
        ),

        -player.dashY *
        (
          40 +
          Math.random() *
          80
        ),

        '#63e6ff',

        3 +
        Math.random() *
        3,

        240
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
      moveX !== 0 ||
      moveY !== 0
    ) {

      const length =
        Math.hypot(
          moveX,
          moveY
        );


      moveX /=
        length;


      moveY /=
        length;


      player.x +=

        moveX *

        CONFIG.player
          .speed *

        dt;


      player.y +=

        moveY *

        CONFIG.player
          .speed *

        dt;
    }
  }


  player.x =
    Math.max(

      player.radius,

      Math.min(

        canvas.width -
        player.radius,

        player.x
      )
    );


  player.y =
    Math.max(

      player.radius,

      Math.min(

        canvas.height -
        player.radius,

        player.y
      )
    );
}


function damagePlayer(
  amount
) {

  if (

    gameState !==
      GAME_STATE.PLAYING ||

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
      350;


    screenShake =
      Math.max(
        screenShake,
        5
      );


    addFloatingText(

      player.x,

      player.y -
      32,

      'SHIELD BLOCK',

      '#74c0fc'
    );


    burstAt(

      player.x,

      player.y,

      '#74c0fc',

      16,

      3.4
    );


    tone(
      700,
      150,
      'sine',
      0.025,
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
      10
    );


  addFloatingText(

    player.x,

    player.y -
    28,

    `-${amount} HP`,

    '#ff8787'
  );


  sfxPlayerHit();


  if (
    player.hp <=
    0
  ) {

    endGame();
  }


  return true;
}


function drawPlayer() {

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

      player.radius +
      11,

      0,
      Math.PI * 2
    );


    ctx.strokeStyle =
      'rgba(116, 192, 252, .85)';


    ctx.lineWidth =
      3;


    ctx.shadowColor =
      '#74c0fc';


    ctx.shadowBlur =
      14;


    ctx.stroke();
  }


  ctx.beginPath();


  ctx.arc(

    0,
    0,

    player.radius +
    6,

    0,
    Math.PI * 2
  );


  ctx.strokeStyle =
    'rgba(99, 230, 255, .28)';


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


  if (
    gameTime <
    player.hurtFlashUntil
  ) {

    ctx.fillStyle =
      '#ffffff';

  } else if (
    gameTime <
    player.dashUntil
  ) {

    ctx.fillStyle =
      '#8ceeff';

  } else {

    ctx.fillStyle =
      '#23c7e6';
  }


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


  ctx.shadowBlur =
    10;


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


// ============================================================
// PLAYER WEAPON
// ============================================================

function currentFireInterval() {

  if (
    gameTime <
    player.rapidFireUntil
  ) {

    return (

      CONFIG.weapon
        .fireIntervalMs *

      CONFIG.weapon
        .rapidFireMultiplier
    );
  }


  return (
    CONFIG.weapon
      .fireIntervalMs
  );
}


function shoot() {

    if (
    gameState !==
    GAME_STATE.PLAYING
    ) {

    return;
    }


  const angle =
    Math.atan2(

      mouse.y -
      player.y,

      mouse.x -
      player.x
    );


  const muzzleDistance =
    34;


  const startX =

    player.x +

    Math.cos(
      angle
    ) *

    muzzleDistance;


  const startY =

    player.y +

    Math.sin(
      angle
    ) *

    muzzleDistance;


  bullets.push({

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
        .bulletSpeed,

    vy:

      Math.sin(
        angle
      ) *

      CONFIG.weapon
        .bulletSpeed,

    radius:
      CONFIG.weapon
        .bulletRadius,

    damage:
      CONFIG.weapon
        .damage,

    expiresAt:

      gameTime +

      CONFIG.weapon
        .bulletLifeMs

  });


  muzzleFlashUntil =
    gameTime +
    55;


  sfxShoot();


  for (
    let i = 0;
    i < 4;
    i++
  ) {

    const spread =

      angle +

      (
        Math.random() -
        0.5
      ) *
      0.45;


    const speed =

      60 +

      Math.random() *
      110;


    createParticle(

      startX,

      startY,

      Math.cos(
        spread
      ) *
      speed,

      Math.sin(
        spread
      ) *
      speed,

      '#ffe066',

      1.5 +
      Math.random() *
      2.2,

      150
    );
  }
}


function handleShooting() {

    if (

    !mouse.isDown ||

    gameState !==
        GAME_STATE.PLAYING

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
        -40 &&

        bullet.x <
        canvas.width +
        40 &&

        bullet.y >
        -40 &&

        bullet.y <
        canvas.height +
        40
    );
}


function drawBullets() {

  ctx.save();


  const rapid =
    gameTime <
    player.rapidFireUntil;


  const color =

    rapid

      ? '#69db7c'

      : '#ffe066';


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
      color;


    ctx.lineWidth =
      4;


    ctx.lineCap =
      'round';


    ctx.shadowColor =
      color;


    ctx.shadowBlur =
      12;


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
      '#fff9db';


    ctx.fill();
  }


  ctx.restore();
}


// ============================================================
// WAVES
// ============================================================

function isBossWave() {

  return (

    wave %

    CONFIG.waves
      .bossEvery ===

    0
  );
}


function enemiesForWave() {

  return (

    CONFIG.waves
      .baseEnemies +

    (
      wave -
      1
    ) *

    CONFIG.waves
      .enemiesPerWave
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
    42
  );
}


function chooseEnemyType() {

  const roll =
    Math.random();


  if (
    wave === 1
  ) {

    return 'virus';
  }


  if (
    wave === 2
  ) {

    return (

      roll <
      0.27

        ? 'runner'

        : 'virus'
    );
  }


  if (
    wave === 3
  ) {

    if (
      roll <
      0.16
    ) {

      return 'tank';
    }


    if (
      roll <
      0.44
    ) {

      return 'runner';
    }


    return 'virus';
  }


  const shooterChance =
    Math.min(

      0.13 +
      wave *
      0.008,

      0.24
    );


  const tankChance =
    Math.min(

      0.15 +
      wave *
      0.007,

      0.24
    );


  const runnerChance =
    Math.min(

      0.24 +
      wave *
      0.008,

      0.34
    );


  if (
    roll <
    shooterChance
  ) {

    return 'shooter';
  }


  if (
    roll <
    shooterChance +
    tankChance
  ) {

    return 'tank';
  }


  if (
    roll <
    shooterChance +
    tankChance +
    runnerChance
  ) {

    return 'runner';
  }


  return 'virus';
}


function createSpawnPoint() {

  const side =
    Math.floor(
      Math.random() *
      4
    );


  const margin =
    42;


  if (
    side === 0
  ) {

    const x =

      40 +

      Math.random() *
      (
        canvas.width -
        80
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
        Math.PI /
        2

    };
  }


  if (
    side === 1
  ) {

    const y =

      40 +

      Math.random() *
      (
        canvas.height -
        80
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

      40 +

      Math.random() *
      (
        canvas.width -
        80
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

    40 +

    Math.random() *
    (
      canvas.height -
      80
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


function queueEnemySpawn() {

  const point =
    createSpawnPoint();


  pendingSpawns.push({

    ...point,

    type:
      chooseEnemyType(),

    createdAt:
      gameTime,

    readyAt:

      gameTime +

      CONFIG.waves
        .spawnWarningMs

  });


  spawnedThisWave++;
}


function spawnEnemy(
  spawnData
) {

  const base =

    CONFIG.enemies[
      spawnData.type
    ];


  const speedScale =
    Math.min(

      1.5,

      1 +
      (
        wave -
        1
      ) *
      0.035
    );


  let hpBonus =
    0;


  if (
    spawnData.type ===
    'tank'
  ) {

    hpBonus =
      Math.floor(
        (
          wave -
          1
        ) /
        5
      );

  } else if (
    spawnData.type ===
    'shooter'
  ) {

    hpBonus =
      Math.floor(
        (
          wave -
          1
        ) /
        6
      );

  } else {

    hpBonus =
      Math.floor(
        (
          wave -
          1
        ) /
        10
      );
  }


  enemies.push({

    x:
      spawnData.spawnX,

    y:
      spawnData.spawnY,

    type:
      spawnData.type,

    radius:
      base.radius,

    speed:

      base.speed *
      speedScale,

    hp:

      base.hp +
      hpBonus,

    maxHp:

      base.hp +
      hpBonus,

    damage:
      base.damage,

    reward:
      base.score,

    hitFlashUntil:
      0,

    rotation:

      Math.random() *
      Math.PI *
      2,

    spin:

      (
        Math.random() -
        0.5
      ) *
      2.4,

    strafeDir:

      Math.random() <
      0.5

        ? -1

        : 1,

    nextShotAt:

      gameTime +

      700 +

      Math.random() *
      800

  });
}


function beginWave() {

  waveState =
    'active';


  spawnedThisWave =
    0;


  pendingSpawns =
    [];


  pendingBoss =
    null;


  bossSpawnedThisWave =
    false;


  waveBannerUntil =
    gameTime +
    1650;


  waveClearUntil =
    0;


  waveRewardMessage =
    '';


  if (
    isBossWave()
  ) {

    enemiesPlanned =
      0;


    pendingBoss = {

      x:
        canvas.width /
        2,

      y:
        90,

      createdAt:
        gameTime,

      readyAt:

        gameTime +
        1350

    };

  } else {

    enemiesPlanned =
      enemiesForWave();


    lastEnemySpawnAt =

      gameTime -

      spawnIntervalForWave() +

      260;
  }


  if (audioCtx) {

    tone(
      360,
      160,
      'sine',
      0.018,
      520
    );
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
    'break';


  nextWaveAt =

    gameTime +

    CONFIG.waves
      .breakMs;


  waveClearUntil =

    gameTime +

    CONFIG.waves
      .breakMs;


  const missingHp =

    CONFIG.player
      .maxHp -

    player.hp;


  if (
    missingHp >
    0
  ) {

    const repaired =
      Math.min(

        CONFIG.waves
          .repairPerClear,

        missingHp
      );


    player.hp +=
      repaired;


    waveRewardMessage =
      `AUTO-REPAIR +${repaired} HP`;


    addFloatingText(

      player.x,

      player.y -
      34,

      `+${repaired} HP`,

      '#69db7c'
    );

  } else {

    const bonus =

      40 +

      wave *
      10;


    score +=
      bonus;


    waveRewardMessage =
      `PERFECT CORE +${bonus} SCORE`;


    addFloatingText(

      player.x,

      player.y -
      34,

      `+${bonus}`,

      '#ffe066'
    );
  }


  tone(
    520,
    220,
    'sine',
    0.02,
    860
  );
}


function updateWaveSystem() {

  updatePendingSpawns();


  updatePendingBoss();


  if (
    waveState ===
    'break'
  ) {

    if (
      gameTime >=
      nextWaveAt
    ) {

      wave++;


      beginWave();
    }


    return;
  }


  if (
    !isBossWave()
  ) {

    if (

      spawnedThisWave <
      enemiesPlanned &&

      gameTime -
      lastEnemySpawnAt >=
      spawnIntervalForWave()

    ) {

      queueEnemySpawn();


      lastEnemySpawnAt =
        gameTime;
    }


    const allScheduled =

      spawnedThisWave >=
      enemiesPlanned;


    const allDestroyed =

      enemies.length ===
      0 &&

      pendingSpawns.length ===
      0;


    if (
      allScheduled &&
      allDestroyed
    ) {

      finishWave();
    }

  } else {

    if (

      bossSpawnedThisWave &&

      !boss &&

      !pendingBoss

    ) {

      finishWave();
    }
  }
}


function updatePendingSpawns() {

  for (

    let i =
      pendingSpawns.length -
      1;

    i >= 0;

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


function updatePendingBoss() {

  if (

    !pendingBoss ||

    gameTime <
    pendingBoss.readyAt

  ) {

    return;
  }


  spawnBoss(

    pendingBoss.x,

    pendingBoss.y
  );


  pendingBoss =
    null;


  bossSpawnedThisWave =
    true;
}


function getThreatCount() {

  if (
    isBossWave()
  ) {

    return (

      boss ||

      pendingBoss

        ? 1

        : 0
    );
  }


  return Math.max(

    0,

    enemiesPlanned -
    spawnedThisWave +

    enemies.length +

    pendingSpawns.length
  );
}


function drawSpawnWarnings() {

  ctx.save();


  for (
    const pending
    of pendingSpawns
  ) {

    const progress =
      Math.min(

        1,

        (
          gameTime -
          pending.createdAt
        ) /

        CONFIG.waves
          .spawnWarningMs
      );


    const pulse =

      0.55 +

      Math.sin(
        gameTime *
        0.025
      ) *
      0.25;


    const ringRadius =

      17 +

      (
        1 -
        progress
      ) *
      18;


    ctx.globalAlpha =

      0.45 +

      pulse *
      0.45;


    ctx.beginPath();


    ctx.arc(

      pending.warningX,

      pending.warningY,

      ringRadius,

      0,
      Math.PI * 2
    );


    ctx.strokeStyle =
      '#ff4d6d';


    ctx.lineWidth =
      3;


    ctx.shadowColor =
      '#ff4d6d';


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
      '#ff6b81';


    ctx.fill();


    ctx.restore();
  }


  if (
    pendingBoss
  ) {

    const progress =
      Math.min(

        1,

        (
          gameTime -
          pendingBoss.createdAt
        ) /

        (
          pendingBoss.readyAt -
          pendingBoss.createdAt
        )
      );


    ctx.globalAlpha =

      0.7 +

      Math.sin(
        gameTime *
        0.02
      ) *
      0.2;


    ctx.beginPath();


    ctx.arc(

      pendingBoss.x,

      pendingBoss.y,

      36 +

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

      pendingBoss.x,

      pendingBoss.y +
      5
    );
  }


  ctx.restore();
}


// ============================================================
// ENEMIES
// ============================================================

function fireEnemyProjectile(

  x,

  y,

  angle,

  speed,

  damage,

  color =
    '#ff8787',

  radius =
    CONFIG.enemyProjectile
      .radius

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

    radius,

    color,

    expiresAt:

      gameTime +

      CONFIG.enemyProjectile
        .lifeMs

  });
}


function updateEnemies(
  dt
) {

  for (
    const enemy
    of enemies
  ) {

    const dx =
      player.x -
      enemy.x;


    const dy =
      player.y -
      enemy.y;


    const distance =
      Math.hypot(
        dx,
        dy
      ) || 1;


    const angle =
      Math.atan2(
        dy,
        dx
      );


    if (
      enemy.type ===
      'shooter'
    ) {

      const preferred =
        CONFIG.enemies
          .shooter
          .preferredRange;


      let moveForward =
        0;


      if (
        distance >
        preferred +
        35
      ) {

        moveForward =
          1;

      } else if (
        distance <
        preferred -
        35
      ) {

        moveForward =
          -0.85;
      }


      enemy.x +=

        Math.cos(
          angle
        ) *

        enemy.speed *

        moveForward *

        dt;


      enemy.y +=

        Math.sin(
          angle
        ) *

        enemy.speed *

        moveForward *

        dt;


      enemy.x +=

        Math.cos(
          angle +
          Math.PI /
          2
        ) *

        enemy.speed *

        0.28 *

        enemy.strafeDir *

        dt;


      enemy.y +=

        Math.sin(
          angle +
          Math.PI /
          2
        ) *

        enemy.speed *

        0.28 *

        enemy.strafeDir *

        dt;


      if (
        gameTime >=
        enemy.nextShotAt
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


        const intervalScale =
          Math.max(

            0.72,

            1 -
            (
              wave -
              1
            ) *
            0.025
          );


        enemy.nextShotAt =

          gameTime +

          CONFIG.enemies
            .shooter
            .fireIntervalMs *

          intervalScale +

          Math.random() *
          260;
      }

    } else {

      enemy.x +=

        Math.cos(
          angle
        ) *

        enemy.speed *

        dt;


      enemy.y +=

        Math.sin(
          angle
        ) *

        enemy.speed *

        dt;
    }


    enemy.rotation +=

      enemy.spin *
      dt;
  }
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


  const flashing =

    gameTime <
    enemy.hitFlashUntil;


  const baseColor =

    CONFIG.enemies[
      enemy.type
    ].color;


  const fill =

    flashing

      ? '#ffffff'

      : baseColor;


  if (
    enemy.type ===
    'tank'
  ) {

    drawStarShape(

      0,

      0,

      enemy.radius,

      enemy.radius *
      0.72,

      8,

      fill
    );


    ctx.beginPath();


    ctx.arc(

      0,

      0,

      8,

      0,
      Math.PI * 2
    );


    ctx.fillStyle =
      '#5f3dc4';


    ctx.fill();

  } else if (
    enemy.type ===
    'runner'
  ) {

    ctx.beginPath();


    ctx.moveTo(

      enemy.radius +
      4,

      0
    );


    ctx.lineTo(

      -enemy.radius,

      -enemy.radius *
      0.8
    );


    ctx.lineTo(

      -enemy.radius *
      0.45,

      0
    );


    ctx.lineTo(

      -enemy.radius,

      enemy.radius *
      0.8
    );


    ctx.closePath();


    ctx.fillStyle =
      fill;


    ctx.shadowColor =
      baseColor;


    ctx.shadowBlur =
      14;


    ctx.fill();

  } else if (
    enemy.type ===
    'shooter'
  ) {

    ctx.beginPath();


    ctx.rect(

      -enemy.radius *
      0.75,

      -enemy.radius *
      0.75,

      enemy.radius *
      1.5,

      enemy.radius *
      1.5
    );


    ctx.fillStyle =
      fill;


    ctx.shadowColor =
      baseColor;


    ctx.shadowBlur =
      16;


    ctx.fill();


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

  } else {

    drawStarShape(

      0,

      0,

      enemy.radius,

      enemy.radius *
      0.7,

      12,

      fill
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
      '#7a1027';


    ctx.fill();
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

      40,

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

    i < points;

    i++

  ) {

    const angle =

      (
        Math.PI *
        2 *
        i
      ) /
      points;


    const radius =

      i % 2 ===
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
    'rgba(0, 0, 0, .6)';


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
    Math.max(
      0,
      ratio
    ),

    5
  );


  ctx.restore();
}


// ============================================================
// BOSS
// ============================================================

function spawnBoss(
  x,
  y
) {

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

    (
      tier -
      1
    ) *

    CONFIG.boss
      .hpPerBossTier;


  boss = {

    x,

    y,

    radius:
      CONFIG.boss
        .radius,

    hp:
      maxHp,

    maxHp,

    speed:

      CONFIG.boss
        .speed +

      (
        tier -
        1
      ) *
      4,

    damage:
      CONFIG.boss
        .contactDamage,

    rotation:
      0,

    hitFlashUntil:
      0,

    nextTargetedShotAt:

      gameTime +
      850,

    nextRadialAt:

      gameTime +
      2200,

    nextChargeAt:

      gameTime +
      3600,

    mode:
      'hunt',

    modeUntil:
      0,

    chargeTargetX:
      player.x,

    chargeTargetY:
      player.y,

    chargeX:
      0,

    chargeY:
      0

  };


  screenShake =
    14;


  burstAt(

    x,

    y,

    '#ff4d6d',

    36,

    5.2
  );


  sfxBoss();
}


function updateBoss(
  dt
) {

  if (!boss) {
    return;
  }


  boss.rotation +=
    dt *
    0.9;


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


      const length =
        Math.hypot(
          dx,
          dy
        ) || 1;


      boss.chargeX =
        dx /
        length;


      boss.chargeY =
        dy /
        length;


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

  } else if (
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
      0.65
    ) {

      createParticle(

        boss.x,

        boss.y,

        -boss.chargeX *
        (
          50 +
          Math.random() *
          90
        ),

        -boss.chargeY *
        (
          50 +
          Math.random() *
          90
        ),

        '#ff6b81',

        3 +
        Math.random() *
        4,

        260
      );
    }


    if (
      gameTime >=
      boss.modeUntil
    ) {

      boss.mode =
        'hunt';


      boss.nextChargeAt =

        gameTime +

        CONFIG.boss
          .chargeIntervalMs;
    }

  } else {

    const dx =

      player.x -
      boss.x;


    const dy =

      player.y -
      boss.y;


    const distance =
      Math.hypot(
        dx,
        dy
      ) || 1;


    const angle =
      Math.atan2(
        dy,
        dx
      );


    if (
      distance >
      210
    ) {

      boss.x +=

        Math.cos(
          angle
        ) *

        boss.speed *

        dt;


      boss.y +=

        Math.sin(
          angle
        ) *

        boss.speed *

        dt;

    } else {

      boss.x +=

        Math.cos(
          angle +
          Math.PI /
          2
        ) *

        boss.speed *

        0.45 *

        dt;


      boss.y +=

        Math.sin(
          angle +
          Math.PI /
          2
        ) *

        boss.speed *

        0.45 *

        dt;
    }


    if (
      gameTime >=
      boss.nextTargetedShotAt
    ) {

      for (
        const spread
        of [
          -0.13,
          0,
          0.13
        ]
      ) {

        fireEnemyProjectile(

          boss.x,

          boss.y,

          angle +
          spread,

          CONFIG.boss
            .projectileSpeed,

          12,

          '#ff6b81',

          7
        );
      }


      boss.nextTargetedShotAt =

        gameTime +

        CONFIG.boss
          .targetedShotIntervalMs;
    }


    if (
      gameTime >=
      boss.nextRadialAt
    ) {

      const count =
        12;


      const offset =
        boss.rotation;


      for (

        let i = 0;

        i < count;

        i++

      ) {

        const shotAngle =

          offset +

          (
            Math.PI *
            2 *
            i
          ) /
          count;


        fireEnemyProjectile(

          boss.x,

          boss.y,

          shotAngle,

          CONFIG.boss
            .projectileSpeed *
          0.82,

          10,

          '#c77dff',

          6
        );
      }


      boss.nextRadialAt =

        gameTime +

        CONFIG.boss
          .radialIntervalMs;


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

      boss.mode =
        'chargeWarning';


      boss.modeUntil =

        gameTime +

        CONFIG.boss
          .chargeWarningMs;


      boss.chargeTargetX =
        player.x;


      boss.chargeTargetY =
        player.y;


      tone(
        160,
        300,
        'sawtooth',
        0.028,
        90
      );
    }
  }


  boss.x =
    Math.max(

      boss.radius,

      Math.min(

        canvas.width -
        boss.radius,

        boss.x
      )
    );


  boss.y =
    Math.max(

      boss.radius,

      Math.min(

        canvas.height -
        boss.radius,

        boss.y
      )
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


  const flashing =

    gameTime <
    boss.hitFlashUntil;


  const color =

    flashing

      ? '#ffffff'

      : '#ff4d6d';


  ctx.beginPath();


  ctx.arc(

    0,
    0,

    boss.radius +
    10 +

    Math.sin(
      gameTime *
      0.006
    ) *
    4,

    0,
    Math.PI * 2
  );


  ctx.strokeStyle =
    'rgba(199, 125, 255, .55)';


  ctx.lineWidth =
    4;


  ctx.shadowColor =
    '#c77dff';


  ctx.shadowBlur =
    24;


  ctx.stroke();


  drawStarShape(

    0,

    0,

    boss.radius,

    boss.radius *
    0.7,

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


  ctx.shadowColor =
    '#ffffff';


  ctx.shadowBlur =
    18;


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
      'rgba(255, 77, 109, .75)';


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


  for (

    let i = 0;

    i < 55;

    i++

  ) {

    const angle =

      Math.random() *
      Math.PI *
      2;


    const speed =

      90 +

      Math.random() *
      300;


    createParticle(

      deathX,

      deathY,

      Math.cos(
        angle
      ) *
      speed,

      Math.sin(
        angle
      ) *
      speed,

      i % 2 ===
      0

        ? '#ff4d6d'

        : '#c77dff',

      3 +
      Math.random() *
      6,

      500 +
      Math.random() *
      450
    );
  }


  registerKill(

    CONFIG.boss
      .score,

    deathX,

    deathY -
    20,

    true
  );


  spawnPickup(

    deathX -
    38,

    deathY,

    'heal'
  );


  spawnPickup(

    deathX,

    deathY +
    18,

    'rapid'
  );


  spawnPickup(

    deathX +
    38,

    deathY,

    'shield'
  );


  screenShake =
    18;


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
// ENEMY PROJECTILES
// ============================================================

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
        -80 &&

        projectile.x <
        canvas.width +
        80 &&

        projectile.y >
        -80 &&

        projectile.y <
        canvas.height +
        80
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


// ============================================================
// COMBO
// ============================================================

function registerKill(

  baseScore,

  x,

  y,

  isBoss =
    false

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


  const gained =

    baseScore *

    comboMultiplier;


  score +=
    gained;


  addFloatingText(

    x,

    y,

    `+${gained}${
      comboMultiplier >
      1

        ? ` x${comboMultiplier}`

        : ''
    }`,

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

      player.y -
      48,

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
      .dropChance

  ) {

    return;
  }


  let type;


  const roll =
    Math.random();


  if (

    player.hp <=
    45 &&

    roll <
    0.5

  ) {

    type =
      'heal';

  } else if (
    roll <
    0.38
  ) {

    type =
      'heal';

  } else if (
    roll <
    0.7
  ) {

    type =
      'rapid';

  } else {

    type =
      'shield';
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

    expiresAt:

      gameTime +

      CONFIG.pickups
        .lifeMs,

    phase:

      Math.random() *
      Math.PI *
      2

  });
}


function updatePickups(
  dt
) {

  for (

    let i =
      pickups.length -
      1;

    i >= 0;

    i--

  ) {

    const pickup =
      pickups[i];


    pickup.phase +=
      dt *
      4;


    const distance =
      Math.hypot(

        player.x -
        pickup.x,

        player.y -
        pickup.y
      );


    if (

      distance <

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

        CONFIG.player
          .maxHp,

        player.hp +

        CONFIG.pickups
          .healAmount
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

        player.y -
        30,

        `+${healed} HP`,

        '#69db7c'
      );

    } else {

      score +=
        25;


      addFloatingText(

        player.x,

        player.y -
        30,

        '+25 SCORE',

        '#ffe066'
      );
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

      player.y -
      30,

      'RAPID FIRE',

      '#69db7c'
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

      player.y -
      30,

      'SHIELD +1',

      '#74c0fc'
    );
  }


  burstAt(

    pickup.x,

    pickup.y,

    pickupColor(
      pickup.type
    ),

    18,

    3.6
  );


  sfxPickup();
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
      0.35
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
      0.35
    );


    ctx.fillStyle =
      '#081019';


    ctx.font =
      'bold 12px monospace';


    ctx.textAlign =
      'center';


    ctx.textBaseline =
      'middle';


    ctx.fillText(

      pickup.type ===
      'heal'

        ? 'H'

        : pickup.type ===
          'rapid'

          ? 'R'

          : 'S',

      0,

      1
    );


    ctx.restore();
  }


  ctx.restore();
}


// ============================================================
// COLLISION
// ============================================================

function checkCollisions() {

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


    const playerDistance =
      Math.hypot(

        enemy.x -
        player.x,

        enemy.y -
        player.y
      );


    if (

      playerDistance <

      enemy.radius +
      player.radius

    ) {

      createExplosion(
        enemy
      );


      enemies.splice(
        enemyIndex,
        1
      );


      damagePlayer(
        enemy.damage
      );


      continue;
    }


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


      const distance =
        Math.hypot(

          enemy.x -
          bullet.x,

          enemy.y -
          bullet.y
        );


      if (

        distance <

        enemy.radius +
        bullet.radius

      ) {

        bullets.splice(
          bulletIndex,
          1
        );


        enemy.hp -=
          bullet.damage;


        enemy.hitFlashUntil =
          gameTime +
          80;


        createHitParticles(

          bullet.x,

          bullet.y
        );


        screenShake =
          Math.max(
            screenShake,
            2.5
          );


        sfxHit();


        if (
          enemy.hp <=
          0
        ) {

          createExplosion(
            enemy
          );


          maybeDropPickup(
            enemy
          );


          registerKill(

            enemy.reward,

            enemy.x,

            enemy.y -
            enemy.radius
          );


          enemies.splice(
            enemyIndex,
            1
          );


          sfxKill();
        }


        break;
      }
    }
  }


  if (
    boss
  ) {

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


      const distance =
        Math.hypot(

          boss.x -
          bullet.x,

          boss.y -
          bullet.y
        );


      if (

        distance <

        boss.radius +
        bullet.radius

      ) {

        bullets.splice(
          bulletIndex,
          1
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


        sfxHit();


        if (
          boss.hp <=
          0
        ) {

          killBoss();
        }


        break;
      }
    }
  }


  for (

    let i =
      enemyProjectiles.length -
      1;

    i >= 0;

    i--

  ) {

    const projectile =
      enemyProjectiles[i];


    const distance =
      Math.hypot(

        projectile.x -
        player.x,

        projectile.y -
        player.y
      );


    if (

      distance <

      projectile.radius +
      player.radius

    ) {

      enemyProjectiles.splice(
        i,
        1
      );


      damagePlayer(
        projectile.damage
      );
    }
  }


  if (
    boss
  ) {

    const bossDistance =
      Math.hypot(

        boss.x -
        player.x,

        boss.y -
        player.y
      );


    if (

      bossDistance <

      boss.radius +
      player.radius

    ) {

      const wasDamaged =
        damagePlayer(
          boss.damage
        );


      if (
        wasDamaged
      ) {

        const angle =
          Math.atan2(

            player.y -
            boss.y,

            player.x -
            boss.x
          );


        player.x +=

          Math.cos(
            angle
          ) *
          28;


        player.y +=

          Math.sin(
            angle
          ) *
          28;
      }
    }
  }
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

  count =
    14,

  speedScale =
    3.5

) {

  for (

    let i = 0;

    i < count;

    i++

  ) {

    const angle =

      Math.random() *
      Math.PI *
      2;


    const speed =

      (
        30 +
        Math.random() *
        55
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

      2 +
      Math.random() *
      3.5,

      280 +
      Math.random() *
      260
    );
  }
}


function createExplosion(
  enemy
) {

  const color =

    CONFIG.enemies[
      enemy.type
    ].color;


  const count =

    enemy.type ===
    'tank'

      ? 22

      : 14;


  burstAt(

    enemy.x,

    enemy.y,

    color,

    count,

    enemy.type ===
    'runner'

      ? 4.4

      : 3.5
  );
}


function createHitParticles(

  x,

  y,

  color =
    '#ffffff'

) {

  for (

    let i = 0;

    i < 7;

    i++

  ) {

    const angle =

      Math.random() *
      Math.PI *
      2;


    const speed =

      45 +

      Math.random() *
      95;


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

      1.5 +
      Math.random() *
      2,

      150 +
      Math.random() *
      100
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
        0.05,
        dt
      );


    particle.vy *=
      Math.pow(
        0.05,
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
}


function drawParticles() {

  ctx.save();


  for (
    const particle
    of particles
  ) {

    const alpha =
      Math.max(

        0,

        particle.lifeMs /
        particle.maxLifeMs
      );


    ctx.globalAlpha =
      alpha;


    ctx.beginPath();


    ctx.arc(

      particle.x,

      particle.y,

      particle.size *
      alpha +
      0.4,

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


// ============================================================
// FLOATING TEXT
// ============================================================

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
    'bold 16px monospace';


  ctx.textAlign =
    'center';


  for (
    const item
    of floatingTexts
  ) {

    ctx.globalAlpha =
      Math.max(

        0,

        item.lifeMs /
        item.maxLifeMs
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
// WORLD
// ============================================================

function drawGrid() {

  const gridSize =
    50;

  const visualTime =
    performance.now();


  const pulse =

    0.1 +

    Math.sin(
      visualTime *
      0.002
    ) *
    0.025;


  ctx.save();


  ctx.strokeStyle =
    `rgba(54, 91, 135, ${pulse})`;


  ctx.lineWidth =
    1;


  for (

    let x = 0;

    x <
    canvas.width;

    x +=
    gridSize

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

    y <
    canvas.height;

    y +=
    gridSize

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

    player.x,

    player.y,

    70 +

    Math.sin(
      visualTime *
      0.004
    ) *
    6,

    0,
    Math.PI * 2
  );


  ctx.strokeStyle =
    'rgba(99, 230, 255, .07)';


  ctx.lineWidth =
    2;


  ctx.stroke();


  ctx.restore();
}


function drawCrosshair() {

  const x =
    mouse.x;


  const y =
    mouse.y;


  const size =
    10;


  const gap =
    5;


  ctx.save();


  ctx.strokeStyle =
    '#9befff';


  ctx.lineWidth =
    2;


  ctx.shadowColor =
    '#63e6ff';


  ctx.shadowBlur =
    8;


  ctx.beginPath();


  ctx.arc(

    x,

    y,

    7,

    0,
    Math.PI * 2
  );


  ctx.stroke();


  ctx.beginPath();


  ctx.moveTo(

    x -
    size -
    gap,

    y
  );


  ctx.lineTo(

    x -
    gap,

    y
  );


  ctx.moveTo(

    x +
    gap,

    y
  );


  ctx.lineTo(

    x +
    size +
    gap,

    y
  );


  ctx.moveTo(

    x,

    y -
    size -
    gap
  );


  ctx.lineTo(

    x,

    y -
    gap
  );


  ctx.moveTo(

    x,

    y +
    gap
  );


  ctx.lineTo(

    x,

    y +
    size +
    gap
  );


  ctx.stroke();


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

    const remaining =

      waveBannerUntil -
      gameTime;


    const alpha =
      Math.min(

        1,

        remaining /
        300
      );


    ctx.globalAlpha =
      alpha;


    ctx.font =
      'bold 42px monospace';


    ctx.fillStyle =

      isBossWave()

        ? '#ffb3c1'

        : '#b8f6ff';


    ctx.shadowColor =

      isBossWave()

        ? '#ff4d6d'

        : '#4de5ff';


    ctx.shadowBlur =
      20;


    ctx.fillText(

      isBossWave()

        ? `BOSS WAVE ${wave}`

        : `WAVE ${wave}`,

      canvas.width /
      2,

      canvas.height /
      2 -
      18
    );


    ctx.font =
      'bold 15px monospace';


    ctx.shadowBlur =
      8;


    ctx.fillText(

      isBossWave()

        ? 'INTRUSION OVERLORD DETECTED'

        : 'NEW ATTACK VECTOR DETECTED',

      canvas.width /
      2,

      canvas.height /
      2 +
      18
    );
  }


  if (

    waveState ===
    'break' &&

    gameTime <
    waveClearUntil

  ) {

    const secondsLeft =
      Math.max(

        0,

        (
          nextWaveAt -
          gameTime
        ) /
        1000
      );


    ctx.globalAlpha =
      1;


    ctx.font =
      'bold 28px monospace';


    ctx.fillStyle =
      '#69f0ae';


    ctx.shadowColor =
      '#69f0ae';


    ctx.shadowBlur =
      14;


    ctx.fillText(

      'SECTOR SECURED',

      canvas.width /
      2,

      canvas.height /
      2 -
      16
    );


    ctx.font =
      '14px monospace';


    ctx.fillStyle =
      '#c8ffe1';


    ctx.shadowBlur =
      0;


    ctx.fillText(

      waveRewardMessage,

      canvas.width /
      2,

      canvas.height /
      2 +
      12
    );


    ctx.fillText(

      `Next wave in ${secondsLeft.toFixed(1)}s`,

      canvas.width /
      2,

      canvas.height /
      2 +
      36
    );
  }


  ctx.restore();
}


function drawDamageVignette() {

  if (
    gameTime >=
    player.hurtFlashUntil
  ) {

    return;
  }


  ctx.save();


  ctx.fillStyle =
    'rgba(255, 30, 65, .12)';


  ctx.fillRect(

    0,
    0,

    canvas.width,
    canvas.height
  );


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
      Math.max(
        0,
        player.hp /
        CONFIG.player
          .maxHp
      ) *
      100
    }%`;


  scoreText.textContent =
    score;


  waveText.textContent =
    wave;


  threatsText.textContent =
    getThreatCount();


  comboText.textContent =
    `x${comboMultiplier}`;


  streakText.textContent =
    `${comboStreak} streak`;


  const dashLeft =
    Math.max(

      0,

      player.dashCooldownUntil -
      gameTime
    );


  dashStatus.textContent =

    dashLeft <=
    0

      ? 'DASH READY'

      : `DASH ${(dashLeft / 1000).toFixed(1)}s`;


  const powerParts =
    [];


  if (
    player.shieldCharges >
    0
  ) {

    powerParts.push(
      `SHIELD x${player.shieldCharges}`
    );
  }


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


    bossHpText.textContent =
      `${
        Math.max(
          0,
          Math.ceil(
            boss.hp
          )
        )
      } / ${boss.maxHp}`;


    bossHpBar.style.width =
      `${
        Math.max(
          0,
          boss.hp /
          boss.maxHp
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
}


// ============================================================
// UPDATE
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


  checkCollisions();


  updateWaveSystem();


  screenShake =
    Math.max(

      0,

      screenShake -
      36 *
      dt
    );
}


// ============================================================
// DRAW
// ============================================================

function drawGame() {

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
        0.5
      ) *

      screenShake;


    shakeY =

      (
        Math.random() -
        0.5
      ) *

      screenShake;
  }


  ctx.save();


  ctx.translate(
    shakeX,
    shakeY
  );


  // Background/grid luôn được vẽ,
  // kể cả khi đang ở Start Menu.
  drawGrid();


  // Khi ở MENU thì chưa vẽ player,
  // enemy, đạn, boss...
  if (
    gameState !==
    GAME_STATE.MENU
  ) {

    drawSpawnWarnings();


    drawPickups();


    drawEnemyProjectiles();


    drawBullets();


    drawEnemies();


    drawBoss();


    drawPlayer();


    drawParticles();


    drawFloatingTexts();


    drawWaveOverlay();


    drawDamageVignette();
  }


  ctx.restore();


  // Menu và Game Over không cần crosshair.
  if (

    gameState ===
      GAME_STATE.PLAYING ||

    gameState ===
      GAME_STATE.PAUSED

  ) {

    drawCrosshair();
  }
}


// ============================================================
// GAME LOOP
// ============================================================

function gameLoop(
  timestamp
) {

  const dt =
    Math.min(

      0.033,

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
    }


  drawGame();


  updateHud();


  requestAnimationFrame(
    gameLoop
  );
}


// ============================================================
// GAME OVER
// ============================================================

function endGame() {

  gameState =
    GAME_STATE.GAMEOVER;


  mouse.isDown =
    false;


  pausePanel
    .classList
    .add(
      'hidden'
    );


  gameOverPanel
    .classList
    .remove(
      'hidden'
    );


  finalScore.textContent =
    score;


  finalWave.textContent =
    wave;


  finalCombo.textContent =
    `x${bestComboMultiplier}`;
}


// ============================================================
// RESTART
// ============================================================

function resetGame() {

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


  pendingSpawns =
    [];


  boss =
    null;


  pendingBoss =
    null;


  bossSpawnedThisWave =
    false;


  score =
    0;


  wave =
    1;


  enemiesPlanned =
    0;


  spawnedThisWave =
    0;


  waveState =
    'active';


  nextWaveAt =
    0;


  lastEnemySpawnAt =
    0;


  waveBannerUntil =
    0;


  waveClearUntil =
    0;


  waveRewardMessage =
    '';


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


  screenShake =
    0;


  muzzleFlashUntil =
    0;


  gameTime =
    0;


    gameState =
    GAME_STATE.PLAYING;


  mouse.isDown =
    false;


  player.x =
    canvas.width /
    2;


  player.y =
    canvas.height /
    2;


  player.hp =
    CONFIG.player
      .maxHp;


  player.angle =
    0;


  player.hurtFlashUntil =
    0;


  player.invulnerableUntil =
    0;


  player.dashUntil =
    0;


  player.dashCooldownUntil =
    0;


  player.dashX =
    0;


  player.dashY =
    0;


  player.shieldCharges =
    0;


  player.rapidFireUntil =
    0;

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


  beginWave();
}


restartBtn.addEventListener(

  'click',

  () => {

    ensureAudio();


    resetGame();
  }
);

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

startBtn.addEventListener(

  'click',

  () => {

    ensureAudio();


    resetGame();
  }
);


// ============================================================
// START
// ============================================================

showStartMenu();


requestAnimationFrame(
  gameLoop
);