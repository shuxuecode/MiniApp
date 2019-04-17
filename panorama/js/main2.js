import THREE from  './libs/three-min'

let ctx   = canvas.getContext('2d')


var camera, scene, renderer;

var isUserInteracting = false,
  onMouseDownMouseX = 0, onMouseDownMouseY = 0,
  lon = 0, onMouseDownLon = 0,
  lat = 0, onMouseDownLat = 0,
  phi = 0, theta = 0;

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId    = 0

  
    var container, mesh;

    // container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(75, 320 / 568, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);

    scene = new THREE.Scene();


//  声明一个球体
    // var geometry = new THREE.SphereBufferGeometry(500, 60, 40);

//  反转X轴上的几何图形，使所有的面点向内。
    // geometry.scale(- 1, 1, 1);

    var material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('/images/意大利圣马可广场.jpg')
    });
    // mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
  }

  
}
