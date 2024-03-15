<script setup>
import { useRoute } from "vue-router";
import { inject, onMounted, watch, ref, onUnmounted, nextTick } from "vue";
import { clickEffect } from "/src/assets/js/mouse.js";
import emitter from "@/assets/config/mitt_bus.js";

const route = useRoute();
// const change_current_index =(index) =>{
//     g_current_index = index
// }
// let g_side_bar = inject('g_side_bar')
let current_side_view = true;
onMounted(() => {
  // emitter.emit('new_side_view', {current_side_view:current_side_view})
  document.addEventListener("click", click_handle)
});
const click_handle = (e) => {

    
}
//鼠标特效
onUnmounted(() => {
  // emitter.all.clear()
});
const side_view_handle = () => {
  current_side_view = !current_side_view;
  // emitter.emit('new_side_view', {current_side_view:current_side_view})
};
// emitter.on('side_view_change', () => side_view_handle())

clickEffect();
const music_handle = (status) => {
  let music_player = document.querySelector(".music_player");
  if(status){
    music_player.style.transform = `translateX(0%)`
    music_player.style.opacity = 1

  }else{
    music_player.style.transform = `translateX(100%)`
    music_player.style.opacity = 0

  }
};
// var maxParticles = 2000,
//     particleSize = 3,
//     emissionRate = 1,
//     particles = [],
//     ballFriction = 0.99,
//     collisionDamper = 0.1,
//     lastPos,
//     objectSize = 3; // drawSize of emitter/field

// var canvas = document.querySelector('canvas');
// var ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// var midX = canvas.width / 2;
// var midY = canvas.height / 2;

// function particle() {
//     this.position = {
//         x: 40 + (Math.random() * (canvas.width - 40)),
//         y: -(Math.random() * 50),
//         z: (Math.random() * 10)
//     };
//     this.velocity = {
//         x: 0,
//         y: 0
//     };
//     this.radius = particleSize;
//     this.mass = particleSize;
//     this.alpha = 1;
//     this.length = 10;
//     this.lineWidth = (1 - ((this.position.z / 12)));
//     this.acceleration = {
//         x: 0,
//         y: (1 - ((this.position.z / 7)))
//     };
// }

// function newParticle() {
//     var curPart = new particle();
//     particles.push(curPart);
// }

// function drawParticles() {
//     for (var i = 0; i < particles.length; i++) {
//         var position = particles[i].position;
//         ctx.fillStyle = 'rgb(255,255,255)';
//         ctx.strokeStyle = 'rgba(255,255,255,' + particles[i].alpha + ')';
//         ctx.lineWidth = particles[i].lineWidth;
//         ctx.beginPath();
//         ctx.moveTo(position.x, position.y);
//         ctx.lineTo(position.x, position.y + particles[i].length);
//         ctx.stroke();

//     }
// }

// function updateParticles() {
//     for (var i = 0; i < particles.length; i++) {
//         particles[i].velocity.x = particles[i].velocity.x + particles[i].acceleration.x;
//         particles[i].velocity.y = particles[i].velocity.y + particles[i].acceleration.y;
//         particles[i].position.x = particles[i].position.x + particles[i].velocity.x;
//         particles[i].position.y = particles[i].position.y + particles[i].velocity.y;
//         checkNextBoundaries(i, particles[i].position.y);
//         if (particles[i]) {
//             particles[i].length = particles[i].velocity.y * 1.8;
//             //particles[i].lineWidth -= 0.2;
//             var nextVy = particles[i].velocity.y + particles[i].acceleration.y;
//             var nextPy = particles[i].position.y + particles[i].velocity.y;
//             checkNextBoundaries(i, nextPy);
//         }

//     }
// }

// function checkNextBoundaries(i, nextPy) {
//     // floor condition
//     if (nextPy >= ((canvas.height * 0.9 - ((particles[i].position.z) * 55)) - particles[i].radius)) {
//         particles[i].velocity.y *= -1;
//         particles[i].velocity.y *= collisionDamper;
//         particles[i].length = 3;
//         if (particles[i].velocity.y >= -0.2 && particles[i].velocity.y <= 0.2) {
//             particles[i].acceleration.y = 0;
//             particles[i].velocity.y = 0;
//             particles.splice(i, 1);
//         }
//     }

//     // right wall condition
//     if (particles[i] && particles[i].position && particles[i].position.x >= (canvas.width - particles[i].radius)) {
//         particles[i].velocity.x *= -1;
//         particles[i].velocity.x *= collisionDamper;
//     }

//     // left wall condition
//     if (particles[i] && particles[i].position && particles[i].position.x <= (particles[i].radius)) {
//         particles[i].velocity.x *= -1;
//         particles[i].velocity.x *= collisionDamper;
//     }
// }

// function checkCollision(i) {
//     for (var ii = 0; ii < particles.length; ii++) {
//         if (ii != i) {
//             var result = circleCollision(particles[i], particles[ii]);
//             if (result) {
//                 var newVelX1 = (particles[i].velocity.x * (particles[i].mass - particles[ii].mass) + (2 * particles[ii].mass * particles[ii].velocity.x)) / (particles[i].mass + particles[ii].mass);
//                 var newVelY1 = (particles[i].velocity.y * (particles[i].mass - particles[ii].mass) + (2 * particles[ii].mass * particles[ii].velocity.y)) / (particles[i].mass + particles[ii].mass);
//                 var newVelX2 = (particles[ii].velocity.x * (particles[ii].mass - particles[i].mass) + (2 * particles[i].mass * particles[i].velocity.x)) / (particles[i].mass + particles[ii].mass);
//                 var newVelY2 = (particles[ii].velocity.y * (particles[ii].mass - particles[i].mass) + (2 * particles[i].mass * particles[i].velocity.y)) / (particles[i].mass + particles[ii].mass);
//                 particles[i].velocity.x = newVelX1 * ballFriction;
//                 particles[i].velocity.y = newVelY1 * ballFriction;
//                 particles[ii].velocity.x = newVelX2 * ballFriction;
//                 particles[ii].velocity.y = newVelY2 * ballFriction;
//             }
//         }

//     }
// }

// function circleCollision(c1, c2) {
//     var dx = c1.position.x - c2.position.x;
//     var dy = c1.position.y - c2.position.y;
//     var dist = c1.radius + c2.radius;
//     var result = (dx * dx + dy * dy <= dist * dist)
//     return result;
// }

// function loop() {
//     clear();
//     update();
//     draw();
//     queue();
// }

// function clear() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// function update() {
//     if (particles.length < maxParticles) {
//         newParticle();
//         newParticle();
//         newParticle();
//     }
//     updateParticles();
// }

// function draw() {
//     drawParticles();
// }

// function queue() {
//     window.requestAnimationFrame(loop);
// }
// window.onload = function() {
//     setTimeout(function() {
//         startTime = (new Date()).getTime();
//         loop();
//     }, 100);
// }
</script>

<template>
  <div id="main" class="flex flex_direction_column">
    <!-- <canvas  id="canvas" width="800" height="500" class="absolute"></canvas> -->
    <!-- <LeftNavBar @music_change="music_handle" class="nav"></LeftNavBar> -->
    <TopNavBar @music_change="music_handle" class="nav"></TopNavBar>
    <div v-if="!$route.meta.screenFull" class="park"></div>
    <router-view :key="$route.fullPath" class="router_view"></router-view>
    <MusicPlayer class="music_player absolute"></MusicPlayer>
  </div>
</template>

<style lang="scss" scoped>
$bg_color: var(--bg_color, #fdfbfb);

#main {
  background: $bg_color;
  width: 100vw;
  .nav {
    z-index: 10000000000;
    transition: transform .5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .park {
    width: 100vw;
    z-index: 99;
    height: 70px;
    top: 0;
    background: transparent;
  }
  .router_view {
  }
  .music_player {
    width: 400px;
    right: 0;
    top: 100px;
    height: 150px;
    z-index: 1000000000;
    position: fixed;
    transform: translateX(100%);
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
}

</style>
