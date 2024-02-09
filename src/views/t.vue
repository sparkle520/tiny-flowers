<!-- @Author: LT -->
<!-- @Date: 2024-01-05 21:37:09 -->
<!-- @Description:  -->

<script setup>
import {
  reactive,
  toRefs,
  onBeforeMount,
  onUnmounted,
  onMounted,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const { theme } = storeToRefs(store);
store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
const router = useRouter();
onBeforeMount(() => {});
onUnmounted(() => {
  window.removeEventListener("resize", func);
  // window.removeEventListener("touchstart", touch_start.bind(this));
  // window.removeEventListener("mousedown", mouse_down);
  // window.removeEventListener("touchmove", touch_move);
  // window.removeEventListener("mousemove", mouse_move);
});
onMounted(() => {
  change_theme(theme.value);
  let num = 200;
  let w = window.innerWidth;
  let h = window.innerHeight;
  let max = 100;
  let _x = 0;
  let _y = 0;
  let _z = 150;
  let dtr = function (d) {
    return (d * Math.PI) / 180;
  };

  let rnd = function () {
    return Math.sin((Math.floor(Math.random() * 360) * Math.PI) / 180);
  };
  let dist = function (p1, p2, p3) {
    return Math.sqrt(
      Math.pow(p2.x - p1.x, 2) +
        Math.pow(p2.y - p1.y, 2) +
        Math.pow(p2.z - p1.z, 2)
    );
  };

  let cam = {
    obj: {
      x: _x,
      y: _y,
      z: _z,
    },
    dest: {
      x: 0,
      y: 0,
      z: 1,
    },
    dist: {
      x: 0,
      y: 0,
      z: 200,
    },
    ang: {
      cplane: 0,
      splane: 0,
      ctheta: 0,
      stheta: 0,
    },
    zoom: 1,
    disp: {
      x: w / 2,
      y: h / 2,
      z: 0,
    },
    upd: function () {
      cam.dist.x = cam.dest.x - cam.obj.x;
      cam.dist.y = cam.dest.y - cam.obj.y;
      cam.dist.z = cam.dest.z - cam.obj.z;
      cam.ang.cplane =
        -cam.dist.z /
        Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
      cam.ang.splane =
        cam.dist.x /
        Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
      cam.ang.ctheta =
        Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) /
        Math.sqrt(
          cam.dist.x * cam.dist.x +
            cam.dist.y * cam.dist.y +
            cam.dist.z * cam.dist.z
        );
      cam.ang.stheta =
        -cam.dist.y /
        Math.sqrt(
          cam.dist.x * cam.dist.x +
            cam.dist.y * cam.dist.y +
            cam.dist.z * cam.dist.z
        );
    },
  };

  let trans = {
    parts: {
      sz: function (p, sz) {
        return {
          x: p.x * sz.x,
          y: p.y * sz.y,
          z: p.z * sz.z,
        };
      },
      rot: {
        x: function (p, rot) {
          return {
            x: p.x,
            y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
            z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x)),
          };
        },
        y: function (p, rot) {
          return {
            x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
            y: p.y,
            z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y)),
          };
        },
        z: function (p, rot) {
          return {
            x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
            y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
            z: p.z,
          };
        },
      },
      pos: function (p, pos) {
        return {
          x: p.x + pos.x,
          y: p.y + pos.y,
          z: p.z + pos.z,
        };
      },
    },
    pov: {
      plane: function (p) {
        return {
          x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
          y: p.y,
          z: p.x * -cam.ang.splane + p.z * cam.ang.cplane,
        };
      },
      theta: function (p) {
        return {
          x: p.x,
          y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
          z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta,
        };
      },
      set: function (p) {
        return {
          x: p.x - cam.obj.x,
          y: p.y - cam.obj.y,
          z: p.z - cam.obj.z,
        };
      },
    },
    persp: function (p) {
      return {
        x: ((p.x * cam.dist.z) / p.z) * cam.zoom,
        y: ((p.y * cam.dist.z) / p.z) * cam.zoom,
        z: p.z * cam.zoom,
        p: cam.dist.z / p.z,
      };
    },
    disp: function (p, disp) {
      return {
        x: p.x + disp.x,
        y: -p.y + disp.y,
        z: p.z + disp.z,
        p: p.p,
      };
    },
    steps: function (_obj_, sz, rot, pos, disp) {
      let _args = trans.parts.sz(_obj_, sz);
      _args = trans.parts.rot.x(_args, rot);
      _args = trans.parts.rot.y(_args, rot);
      _args = trans.parts.rot.z(_args, rot);
      _args = trans.parts.pos(_args, pos);
      _args = trans.pov.plane(_args);
      _args = trans.pov.theta(_args);
      _args = trans.pov.set(_args);
      _args = trans.persp(_args);
      _args = trans.disp(_args, disp);
      return _args;
    },
  };

  (function () {
    "use strict";
    let threeD = function (param) {
      this.transIn = {};
      this.transOut = {};
      this.transIn.vtx = param.vtx;
      this.transIn.sz = param.sz;
      this.transIn.rot = param.rot;
      this.transIn.pos = param.pos;
    };

    threeD.prototype.vupd = function () {
      this.transOut = trans.steps(
        this.transIn.vtx,
        this.transIn.sz,
        this.transIn.rot,
        this.transIn.pos,
        cam.disp
      );
    };

    let Build = function () {
      this.vel = 0.04;
      this.lim = 360;
      this.diff = 200;
      this.initPos = 100;
      this.toX = _x;
      this.toY = _y;
      this.go();
    };

    Build.prototype.go = function () {
      this.canvas = document.getElementById("canv");
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.$ = canv.getContext("2d");
      this.$.globalCompositeOperation = "source-over";
      this.varr = [];
      this.dist = [];
      this.calc = [];

      for (let i = 0, len = num; i < len; i++) {
        this.add();
      }

      this.rotObj = {
        x: 0,
        y: 0,
        z: 0,
      };
      this.objSz = {
        x: w / 5,
        y: h / 5,
        z: w / 5,
      };
    };

    Build.prototype.add = function () {
      this.varr.push(
        new threeD({
          vtx: {
            x: rnd(),
            y: rnd(),
            z: rnd(),
          },
          sz: {
            x: 0,
            y: 0,
            z: 0,
          },
          rot: {
            x: 20,
            y: -20,
            z: 0,
          },
          pos: {
            x: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
            y: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
            z: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
          },
        })
      );
      this.calc.push({
        x: 360 * Math.random(),
        y: 360 * Math.random(),
        z: 360 * Math.random(),
      });
    };

    Build.prototype.upd = function () {
      cam.obj.x += (this.toX - cam.obj.x) * 0.05;
      cam.obj.y += (this.toY - cam.obj.y) * 0.05;
    };

    Build.prototype.draw = function () {
      this.$.clearRect(0, 0, this.canvas.width, this.canvas.height);
      cam.upd();
      this.rotObj.x += 0.1;
      this.rotObj.y += 0.1;
      this.rotObj.z += 0.1;

      for (let i = 0; i < this.varr.length; i++) {
        for (let val in this.calc[i]) {
          if (this.calc[i].hasOwnProperty(val)) {
            this.calc[i][val] += this.vel;
            if (this.calc[i][val] > this.lim) this.calc[i][val] = 0;
          }
        }

        this.varr[i].transIn.pos = {
          x: this.diff * Math.cos((this.calc[i].x * Math.PI) / 180),
          y: this.diff * Math.sin((this.calc[i].y * Math.PI) / 180),
          z: this.diff * Math.sin((this.calc[i].z * Math.PI) / 180),
        };
        this.varr[i].transIn.rot = this.rotObj;
        this.varr[i].transIn.sz = this.objSz;
        this.varr[i].vupd();
        if (this.varr[i].transOut.p < 0) continue;
        let g = this.$.createRadialGradient(
          this.varr[i].transOut.x,
          this.varr[i].transOut.y,
          this.varr[i].transOut.p,
          this.varr[i].transOut.x,
          this.varr[i].transOut.y,
          this.varr[i].transOut.p * 2
        );
        this.$.globalCompositeOperation = "lighter";
        g.addColorStop(0, "hsla(255, 255%, 255%, 1)");
        g.addColorStop(0.5, "hsla(" + (i + 2) + ",85%, 40%,1)");
        g.addColorStop(1, "hsla(" + i + ",85%, 40%,.5)");
        this.$.fillStyle = g;
        this.$.beginPath();
        this.$.arc(
          this.varr[i].transOut.x,
          this.varr[i].transOut.y,
          this.varr[i].transOut.p * 2,
          0,
          Math.PI * 2,
          false
        );
        this.$.fill();
        this.$.closePath();
      }
    };
    Build.prototype.anim = function () {
      window.requestAnimationFrame = (function () {
        return (
          window.requestAnimationFrame ||
          function (callback, element) {
            window.setTimeout(callback, 1000 / 60);
          }
        );
      })();
      let anim = function () {
        this.upd();
        this.draw();
        window.requestAnimationFrame(anim);
      }.bind(this);
      window.requestAnimationFrame(anim);
    };

    Build.prototype.run = function () {
      this.anim();
      const mouse_move = (e) => {
        this.toX = (e.clientX - this.canvas.width / 2) * -0.8;
        this.toY = (e.clientY - this.canvas.height / 2) * 0.8;
      };
      window.addEventListener("mousemove", mouse_move.bind(this));

      const touch_move = (e) => {
        e.preventDefault();
        this.toX = (e.touches[0].clientX - this.canvas.width / 2) * -0.8;
        this.toY = (e.touches[0].clientY - this.canvas.height / 2) * 0.8;
      };
      window.addEventListener("touchmove", touch_move.bind(this));

      const mouse_down = (e) => {
        for (let i = 0; i < 100; i++) {
          this.add();
        }
      };
      window.addEventListener("mousedown", mouse_down.bind(this));

      const touch_start = (e) => {
        e.preventDefault();
        for (let i = 0; i < 100; i++) {
          this.add();
        }
      };
      window.addEventListener("touchstart", touch_start.bind(this));
    };
    let app = new Build();
    app.run();
  })();
  window.addEventListener("resize", func, false);
});
const func = () => {
  canvas.width = w = window.innerWidth;
  canvas.height = h = window.innerHeight;
};

const go_github = () => {
  window.location.href = "https://github.com/sparkle520";
};
const go_netEase_cloud_music = () => {
  window.location.href =
    "https://music.163.com/song?id=1401025134&userid=499623339";
};
//change scss let
const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
const change_theme = (current_theme) => {
  if (current_theme) {
    c_c("--about_bg_color", "#0b0e14");
  } else {
    c_c("--about_bg_color", "#0b0e14");
  }
};
</script>
<template>
  <div id="about_main" class="relative">
    <canvas id="canv"></canvas>
    <!-- <div class="space flex justify_content_center"> -->

    <!-- <div class="stars">
        <div class="star"></div>
        <div class="star pink"></div>
        <div class="star blue"></div>
        <div class="star yellow"></div>
    </div> -->
    <!-- </div> -->

    <!-- <div class="bg absolute">
      <img
        class="absolute"
        src="https://pic.imgdb.cn/item/659e6246871b83018a27b7cc.jpg"
        alt=""
      />
    </div>
    <div class="card absolute">
      <div class="img flex align_items_center justify_content_center">
        <img
          src="https://pic.imgdb.cn/item/659e63dc871b83018a2d7de3.jpg"
          alt=""
        />
      </div>
      <h1>SPARKLE</h1>
      <div class="info_box">
        <span>
          个性签名:
          <span>雨停了,</span>
        </span>
      </div>
      <p class="absolute flex flex_direction_row align_items_center">
        <svg
          @click="go_github"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
        >
          <path
            d="M950.930286 512q0 143.433143-83.748571 257.974857t-216.283429 158.573714q-15.433143 2.852571-22.601143-4.022857t-7.168-17.115429l0-120.539429q0-55.442286-29.696-81.115429 32.548571-3.437714 58.587429-10.313143t53.686857-22.308571 46.299429-38.034286 30.281143-59.977143 11.702857-86.016q0-69.12-45.129143-117.686857 21.138286-52.004571-4.534857-116.589714-16.018286-5.12-46.299429 6.290286t-52.589714 25.161143l-21.723429 13.677714q-53.174857-14.848-109.714286-14.848t-109.714286 14.848q-9.142857-6.290286-24.283429-15.433143t-47.689143-22.016-49.152-7.68q-25.161143 64.585143-4.022857 116.589714-45.129143 48.566857-45.129143 117.686857 0 48.566857 11.702857 85.723429t29.988571 59.977143 46.006857 38.253714 53.686857 22.308571 58.587429 10.313143q-22.820571 20.553143-28.013714 58.88-11.995429 5.705143-25.746286 8.557714t-32.548571 2.852571-37.449143-12.288-31.744-35.693714q-10.825143-18.285714-27.721143-29.696t-28.306286-13.677714l-11.410286-1.682286q-11.995429 0-16.603429 2.56t-2.852571 6.582857 5.12 7.972571 7.460571 6.875429l4.022857 2.852571q12.580571 5.705143 24.868571 21.723429t17.993143 29.110857l5.705143 13.165714q7.460571 21.723429 25.161143 35.108571t38.253714 17.115429 39.716571 4.022857 31.744-1.974857l13.165714-2.267429q0 21.723429 0.292571 50.834286t0.292571 30.866286q0 10.313143-7.460571 17.115429t-22.820571 4.022857q-132.534857-44.032-216.283429-158.573714t-83.748571-257.974857q0-119.442286 58.88-220.306286t159.744-159.744 220.306286-58.88 220.306286 58.88 159.744 159.744 58.88 220.306286z"
            fill="#364a62"
          ></path>
        </svg>
        <svg
        @click="go_netEase_cloud_music"
          t="1704891046783"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4231"
          width="40"
          height="40"
        >
          <path
            d="M679.74985728 16.02916228c10.23612444 1.63311391 20.58889897 2.79962356 30.73753463 4.9868305a227.49858884 227.49858884 0 0 1 95.59548468 45.69802419c18.46001853 14.81467525 25.98400722 34.14957675 20.6472245 57.04233275-4.81185294 20.58889897-18.25587966 34.47036669-39.01975521 40.39040472-19.65569144 5.59924712-37.38664131 1.34148625-53.51364054-11.28598303-20.44308563-16.03951044-43.13170275-27.12135459-70.31138287-24.75917203-23.03857031 2.01222937-45.05644431 25.72154281-43.07337722 46.89369709 0.874882 9.47789253 4.34524966 18.72248391 6.79492003 28.05456212 4.34524966 16.44778916 8.83631266 32.86641603 13.23988688 49.31420519 0.75823094 2.82878681 1.48730056 5.07431831 5.54092256 5.30762044 61.91251219 3.29539009 117.7008465 23.00940706 167.42332944 59.55032866 48.87676419 35.928504 88.88805247 79.06020675 115.71778037 133.24459137a330.00564463 330.00564463 0 0 1 33.62464697 125.83725278c3.87864541 58.58795884-3.14957675 115.892756-26.45061147 169.98965185-54.18438366 125.74976497-149.45907841 206.85136434-283.43273747 244.12135459a479.37723425 479.37723425 0 0 1-156.07902184 16.79774234c-109.91439341-6.12417691-205.13076166-46.74788375-285.32831578-120.2088424C132.71504941 814.56349913 83.37168194 725.47130778 66.22398641 620.89369709c-23.35936025-142.25587966 12.45249269-269.78457187 107.20225765-380.39887068 52.02634094-60.77516481 116.97177784-104.54844744 192.70743222-132.80715038 26.10065828-9.76952019 54.65098791-0.67074312 68.96989663 21.60959625 14.63969866 22.77610494 11.19849522 52.08466647-9.06961479 70.19473181a68.64910669 68.64910669 0 0 1-20.18062025 12.07337722c-115.455315 46.10630291-191.71589819 127.32455334-222.01599278 245.78363078-29.39604934 114.90122294-3.41204116 220.09125122 71.62370685 312.77046129 47.03951044 58.09219231 107.81467525 97.11194753 181.36312269 116.27187146 47.53527794 12.39416716 95.56632144 13.18156134 143.97648234 5.8617125 49.95578506-7.55315194 96.616181-23.62182466 138.46472206-51.6472245 57.56726253-38.58231422 98.59924712-89.99623659 119.10065828-155.43744197 17.70178759-56.48824069 18.31420519-113.53057344-3.5578545-169.58137312-17.61429881-45.11476984-48.76011312-79.81843866-87.80903159-108.45625609-20.85136434-15.31044178-43.24835381-27.23800566-68.79492003-33.09971719-1.16650966-0.26246441-2.36218256-0.40827872-4.46189975-0.72906866 3.49952994 13.06491028 6.7365945 25.48824069 10.09031012 37.88240785 8.107244 29.86265262 16.38946363 59.69614297 24.35089331 89.61712112 17.29350888 65.03292569 0.55409206 121.98777062-45.20225765 170.51458163-42.34430856 44.91063-96.23706456 64.44967038-158.03292569 58.58795884-68.82408231-6.53245562-117.96331091-43.07337722-150.01317047-102.24459041-16.79774234-30.97083772-24.03010338-64.36218256-25.37158962-99.2991535-2.12888044-55.64252097 11.14016969-106.99811878 43.71495806-152.92944509 34.99529647-49.31420519 83.43461869-80.95578506 140.71025356-100.61147747 4.491063-1.54562512 9.06961478-2.94543788 14.34807197-4.66603959-3.09125122-11.46095962-6.2991535-22.63029159-9.06961478-33.88711138-3.82031988-15.51458162-8.71966159-30.94167447-10.64440219-46.68955822-5.65757266-46.60206944 8.95296372-87.10912522 41.84854203-121.05456212C577.41777809 40.75917203 610.08005428 23.14487322 649.21646056 17.86641603c4.31608641-0.58325531 8.60301053-1.22483519 12.91909694-1.83725375h17.61429978z m-122.22107275 361.67638775c-33.91627462 10.55691437-63.19567291 26.65475034-85.15522137 53.42615272-29.36688609 35.87017847-35.22859859 77.07714062-25.86735616 120.85042325 4.87017847 22.74694266 16.24365028 42.19849522 36.19096841 55.78833528 24.93414862 16.97271894 58.90874878 16.24365028 84.98024478-1.39981178 26.65475034-18.08090306 38.52398869-47.21448703 30.73753559-77.07714062-8.51552175-32.72060172-17.58513653-65.32455334-26.42144919-97.98682954l-14.46472206-53.60112931z"
            p-id="4232"
            fill="#d81e06"
          ></path>
        </svg>
      </p>
    </div> -->
    <div class="absolute absolute_center intro">
      <span> 祝你有一天能和你重要的人重逢</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$about_bg_color: var(--about_bg_color, #0b0e14);

#about_main {
  width: 100vw;
  height: 101vh;
  background-color: $about_bg_color;
  color: #fff;
  .intro {
    font-size: 20px;
    font-weight: 600;
    span {
      opacity: 0;
      animation: text_type 10s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
}
@keyframes text_type {
  0% {
    opacity: 1;
    transform: translateY(100px);
  }
  100% {
    opacity: 0;
    transform: translateY(0);
  }
}

// .space {
//     width: 100%;
//     height: 100%;
//     background: #0b0e14;
// }
// .star {
//     width: 5px;
//     height: 5px;
//     border-radius: 50%;
//     background: #FFF;

//     position: relative;
//     transform-origin: 100% 0;
//     animation: star-ani 6s infinite ease-out;
//     box-shadow: 0 0 5px 5px rgba(255, 255, 255, .3);
//     opacity: 0;
//     z-index: 10000;
// }
// .star:after {
//     content: '';
//     display: block;
//     top: 0px;
//     left: 4px;
//     border: 0px solid #fff;
//     border-width: 0px 90px 2px 90px;
//     border-color: transparent transparent transparent rgba(255, 255, 255, .3);
//     transform: rotate(-45deg) translate3d(1px, 3px, 0);
//     box-shadow: 0 0 1px 0 rgba(255, 255, 255, .1);
//     transform-origin: 0% 100%;
//     animation: shooting-ani 3s infinite ease-out;
// }
// .pink {
//     top: 30px;
//     left: 395px;
//     background: #ff5a99;
//     animation-delay: 5s;
//     -webkit-animation-delay: 5s;
//     -moz-animation-delay: 5s;
// }
// .pink:after {
//     border-color: transparent transparent transparent #ff5a99;
//     animation-delay: 5s;
//     -webkit-animation-delay: 5s;
//     -moz-animation-delay: 5s;
// }
// .blue {
//     top: 35px;
//     left: 432px;
//     background: cyan;
//     animation-delay: 7s;
//     -webkit-animation-delay: 7s;
//     -moz-animation-delay: 7s;
// }
// .blue:after {
//     border-color: #213;
//     -webkit-animation-delay: 7s;
//     -moz-animation-delay: 7s;
//     animation-delay: 7s;
// }
// .yellow {
//     top: 50px;
//     left: 600px;
//     background: #ffcd5c;
//     animation-delay: 5.8s;
// }
// .yellow:after {
//     border-color: transparent transparent transparent #ffcd5c;
//     animation-delay: 5.8s;
// }
// @keyframes star-ani {
//     0% {
//         opacity: 0;
//         transform: scale(0) rotate(0) translate3d(0, 0, 0);
//         -webkit-transform: scale(0) rotate(0) translate3d(0, 0, 0);
//         -moz-transform: scale(0) rotate(0) translate3d(0, 0, 0);
//     }
//     50% {
//         opacity: 1;
//         transform: scale(1) rotate(0) translate3d(-200px, 200px, 0);
//         -webkit-transform: scale(1) rotate(0) translate3d(-200px, 200px, 0);
//         -moz-transform: scale(1) rotate(0) translate3d(-200px, 200px, 0);
//     }
//     100% {
//         opacity: 0;
//         transform: scale(1) rotate(0) translate3d(-300px, 300px, 0);
//         -webkit-transform: scale(1) rotate(0) translate3d(-300px, 300px, 0);
//         -moz-transform: scale(1) rotate(0) translate3d(-300px, 300px, 0);
//     }
// }
</style>
