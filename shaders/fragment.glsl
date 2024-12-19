uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

#define PI 3.14159265359

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.x *= uResolution.x / uResolution.y;

    vec2 pos = vec2(0.5) - st;

    float r = length(pos) * 2.0;
    float a = atan(pos.y, pos.x);

    float f = abs(cos(a * 12.) * sin(a * 3.)) * .8 + .1;

    vec3 color = vec3(1. - smoothstep(f, f + 0.02, r));

    color = mix(color, vec3(random(st + uTime * 0.1)), 0.1);

    gl_FragColor = vec4(color, 1.0);
}

