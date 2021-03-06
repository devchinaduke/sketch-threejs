const THREE = require('three/build/three.js');
const glslify = require('glslify');

export default class PostEffectBright {
  constructor(texture) {
    this.uniforms = {
      minBright: {
        type: 'f',
        value: 0.3,
      },
      texture: {
        type: 't',
        value: texture,
      }
    };
    this.obj = this.createObj();
  }
  createObj() {
    return new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2, 2),
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('./glsl/postEffect.vs'),
        fragmentShader: glslify('./glsl/postEffectBright.fs'),
      })
    );
  }
}
