import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { EffectComposer } from 'https://unpkg.com/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@0.160.0/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'https://unpkg.com/three@0.160.0/examples/jsm/postprocessing/ShaderPass.js';

(function initThreeFx() {
  const canvas = document.getElementById('threeViewport');
  const overlay = document.getElementById('sceneOverlay');
  const ambience = document.getElementById('bgAmbience');
  if (!canvas) { window.threeFx = {}; return; }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'low-power' });
  } catch {
    window.threeFx = {};
    document.body.classList.add('three-disabled');
    return;
  }

  const lowPower = window.matchMedia('(max-width: 700px)').matches;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030406, 0.12);

  const camera = new THREE.PerspectiveCamera(56, 1, 0.1, 30);
  camera.position.set(0.65, 1.65, 2.25);
  camera.lookAt(-0.75, 1.45, -2.3);

  renderer.setClearColor(0x090c12, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const ambient = new THREE.AmbientLight(0x32465f, 0.5);
  const mainLight = new THREE.PointLight(0xc7ddff, 1.5, 14, 2);
  mainLight.position.set(0, 2.4, 0);
  const emergencyLight = new THREE.PointLight(0x9a0818, 0, 9, 2);
  emergencyLight.position.set(0, 2.25, -0.6);
  scene.add(ambient, mainLight, emergencyLight);

  const room = new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 3.4, 5.2),
    new THREE.MeshStandardMaterial({ color: 0x21252b, roughness: 0.92, metalness: 0.1, side: THREE.BackSide })
  );
  room.position.y = 1.7;
  scene.add(room);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 5.2),
    new THREE.MeshStandardMaterial({ color: 0x111317, roughness: 0.88, metalness: 0.22 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0.02;
  scene.add(floor);

  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 1.4, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x2b2f38, roughness: 0.42, metalness: 0.6 })
  );
  panel.position.set(-1.6, 1.42, -1.25);
  panel.rotation.y = 0.32;
  scene.add(panel);

  const indicatorButtons = new Map();
  for (let i = 1; i <= 13; i += 1) {
    const col = (i - 1) % 3;
    const row = Math.floor((i - 1) / 3);
    const light = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 0.02, 10),
      new THREE.MeshStandardMaterial({ color: 0x70747e, emissive: 0x000000, roughness: 0.28, metalness: 0.72 })
    );
    light.rotation.x = Math.PI / 2;
    light.position.set(-1.78 + col * 0.125, 1.88 - row * 0.13, -1.2);
    light.rotation.z = 0.32;
    indicatorButtons.set(i, light);
    scene.add(light);
  }

  const doorMat = new THREE.MeshStandardMaterial({ color: 0x3b4048, roughness: 0.44, metalness: 0.7 });
  const leftDoor = new THREE.Mesh(new THREE.BoxGeometry(1.25, 2.45, 0.08), doorMat);
  const rightDoor = leftDoor.clone();
  leftDoor.position.set(-0.63, 1.25, -2.45);
  rightDoor.position.set(0.63, 1.25, -2.45);
  scene.add(leftDoor, rightDoor);

  const ceilingLight = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 0.7),
    new THREE.MeshBasicMaterial({ color: 0xc9d7ef, transparent: true, opacity: 0.45 })
  );
  ceilingLight.rotation.x = Math.PI / 2;
  ceilingLight.position.set(0, 3.35, -0.7);
  scene.add(ceilingLight);

  const particles = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({ color: 0xcfd7e8, size: 0.025, transparent: true, opacity: 0.2 })
  );
  const dust = new Float32Array(90);
  for (let i = 0; i < 90; i += 3) {
    dust[i] = (Math.random() - 0.5) * 2.3;
    dust[i + 1] = 0.5 + Math.random() * 2.1;
    dust[i + 2] = -2 + Math.random() * 2;
  }
  particles.geometry.setAttribute('position', new THREE.BufferAttribute(dust, 3));
  scene.add(particles);

  const usePost = !lowPower;
  let composer;
  if (usePost) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const postShader = {
      uniforms: {
        tDiffuse: { value: null },
        amount: { value: 0.18 },
        scanline: { value: 0.04 },
        time: { value: 0 }
      },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `uniform sampler2D tDiffuse; uniform float amount; uniform float scanline; uniform float time; varying vec2 vUv;
      float rand(vec2 c){return fract(sin(dot(c.xy, vec2(12.9898,78.233))) * 43758.5453);} 
      void main(){
        vec2 uv = vUv;
        vec2 ca = vec2((uv.x - 0.5) * 0.002, 0.0);
        vec4 c;
        c.r = texture2D(tDiffuse, uv + ca).r;
        c.g = texture2D(tDiffuse, uv).g;
        c.b = texture2D(tDiffuse, uv - ca).b;
        c.a = 1.0;
        float vig = smoothstep(0.95, 0.2, distance(uv, vec2(0.5)));
        float grain = (rand(uv + time) - 0.5) * amount;
        float lines = sin((uv.y + time * 0.4) * 900.0) * scanline;
        c.rgb = c.rgb * vig + grain - lines;
        gl_FragColor = c;
      }`
    };
    const pass = new ShaderPass(postShader);
    composer.addPass(pass);
  }

  const fx = {
    muted: true,
    fear: 0,
    flickerBoost: 0,
    shake: 0,
    bob: 0,
    doorOpen: 0,
    doorTarget: 0
  };

  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1.25 : 1.5));
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
    if (composer) composer.setSize(w, h);
  };
  window.addEventListener('resize', resize);
  resize();

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const ping = (freq, dur, gainAmt = 0.03, type = 'sine') => {
    if (fx.muted) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = 0.0001;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    gain.gain.exponentialRampToValueAtTime(gainAmt, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.start(now);
    osc.stop(now + dur + 0.01);
  };

  const render = (t) => {
    const time = t * 0.001;
    fx.bob *= 0.9;
    fx.shake *= 0.86;
    fx.flickerBoost *= 0.9;

    const fearFactor = fx.fear / 100;
    const sway = Math.sin(time * 0.45) * 0.015;
    camera.position.x = 0.65 + sway + (Math.random() - 0.5) * fx.shake;
    camera.position.y = 1.65 + Math.sin(time * 0.7) * 0.01 + fx.bob;
    camera.lookAt(-0.75, 1.45, -2.3);

    const base = 0.85 - fearFactor * 0.22;
    const randomFlicker = Math.random() < (0.01 + fearFactor * 0.05) ? (Math.random() * 0.55) : 0;
    mainLight.intensity = Math.max(0.18, base - randomFlicker - fx.flickerBoost);
    ambient.intensity = 0.22 + (1 - fearFactor) * 0.08;
    emergencyLight.intensity = Math.max(0, fx.flickerBoost * 1.7);

    fx.doorOpen += (fx.doorTarget - fx.doorOpen) * 0.08;
    leftDoor.position.x = -0.63 - fx.doorOpen * 0.55;
    rightDoor.position.x = 0.63 + fx.doorOpen * 0.55;

    overlay.style.opacity = String(0.24 + fearFactor * 0.22);

    const pos = particles.geometry.attributes.position;
    for (let i = 0; i < pos.count; i += 1) {
      pos.array[i * 3 + 1] += 0.00035;
      if (pos.array[i * 3 + 1] > 2.9) pos.array[i * 3 + 1] = 0.55;
    }
    pos.needsUpdate = true;

    if (composer) {
      composer.passes[1].uniforms.time.value = time;
      composer.passes[1].uniforms.amount.value = 0.12 + fearFactor * 0.07;
      composer.render();
    } else {
      renderer.render(scene, camera);
    }
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

  window.threeFx = {
    onButtonPress(floor) {
      fx.bob = 0.008;
      indicatorButtons.forEach((m, id) => m.material.emissive.setHex(id === floor ? 0xa31f33 : 0x000000));
      ping(1200, 0.08, 0.015, 'square');
    },
    onArrival() {
      fx.doorTarget = 1;
      ping(880, 0.22, 0.02, 'triangle');
      setTimeout(() => { fx.doorTarget = 0; }, 550);
    },
    onFlicker13() {
      fx.flickerBoost = 0.38;
      fx.shake = 0.03;
      ping(180, 0.35, 0.045, 'sawtooth');
    },
    onFearChanged(fear) {
      fx.fear = Math.max(0, Math.min(100, fear));
    },
    onSuspicionChanged(suspicion) {
      if (suspicion > 50) fx.flickerBoost = Math.max(fx.flickerBoost, 0.08);
    },
    onIntercom() {
      ping(430, 0.4, 0.014, 'sine');
    },
    onEnding(type) {
      if (type === 'bad') fx.flickerBoost = 0.6;
      if (type === 'secret') fx.doorTarget = 1;
    },
    setMuted(muted) {
      fx.muted = !!muted;
      if (!fx.muted) audioCtx.resume().catch(() => {});
      if (ambience) ambience.volume = fx.muted ? 0 : Math.max(ambience.volume, 0.08);
    }
  };
})();
