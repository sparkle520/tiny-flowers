import '/src/assets/css/topic.scss'
import '/src/assets/css/code.scss'

export const options = {
  background: {
    color: {
      value: 'transparent',
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: 'push',
      },
      onHover: {
        enable: false,
        mode: 'repulse',
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#b399ff',
    },
    links: {
      color: '#30d5c8',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 30,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
}


export const change_layout = (flag) => {
  const topic_content = document.querySelector(".topic_content");
  if (flag) {
    topic_content.style.width = "800px";
  } else {
    topic_content.style.width = "80vw";
  }
};

export const select_by_id = (arr, id) => {
  if (arr.length == 0) return -1;
  let l = 0;
  let r = arr.length;
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);
    if (arr[mid].id == id) return arr[mid];
    else if (arr[mid].id > id) l = mid + 1;
    else r = mid;
  }
  return -1;
};