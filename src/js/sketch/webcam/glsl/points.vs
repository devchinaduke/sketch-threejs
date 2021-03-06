attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

void main() {
  // coordinate transformation
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  float distanceFromCamera = 100.0 / length(mvPosition.xyz);

  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = 10.0;
}
