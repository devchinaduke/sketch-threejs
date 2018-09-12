const THREE = require('three');
const glslify = require('glslify');
const MathEx = require('js-util/MathEx');

export default class Points {
  constructor() {
    this.positions =
    this.uniforms = {
      time: {
        type: 'f',
        value: 0
      },
    };
    this.obj = null;
  }
  createObj() {
    // Define Geometry
    const num = 68;
    const geometry = new THREE.BufferGeometry();
    this.positions = new THREE.BufferAttribute(new Float32Array(num * 3), 3);
    geometry.addAttribute('position', this.positions);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: glslify('./glsl/points.vs'),
      fragmentShader: glslify('./glsl/points.fs'),
    });

    // Create Object3D
    this.obj = new THREE.Points(geometry, material);
  }
  setPositions(positions, webcam) {
    const isFacing = (webcam.facingMode === 'user') ? -1 : 1;
    if (positions === false) return;
    for (var i = 0; i < this.positions.count; i++) {
      this.positions.setXYZ(
        i,
        (positions[i][0] / webcam.resolution.x * 2 - 1) * 25 * isFacing,
        (positions[i][1] / webcam.resolution.y * 2 - 1) * -25,
        10
      );
    }
    this.positions.needsUpdate = true;
  }
  render(time) {
    this.uniforms.time.value += time;
  }
}