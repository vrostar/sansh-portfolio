"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function Background() {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uResolution.value.set(
        state.size.width,
        state.size.height
      )
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2() }
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
      />
    </mesh>
  )
}

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;

float random(vec2 st){
  return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123);
}

float noise(vec2 st){
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = random(i);
  float b = random(i + vec2(1.0,0.0));
  float c = random(i + vec2(0.0,1.0));
  float d = random(i + vec2(1.0,1.0));

  vec2 u = f*f*(3.0-2.0*f);

  return mix(a,b,u.x) +
         (c-a)*u.y*(1.0-u.x) +
         (d-b)*u.x*u.y;
}

void main(){

  // loop (or else it turns into mush)
  float t = mod(uTime, 20.0);

  vec2 uv = vUv - 0.5;

  // aspect ratio
  float aspect = 1.0;
  uv.x *= aspect;

  float n1 = noise(uv * 4.0 + t * 0.3);
  float n2 = noise(uv * 2.0 - t * 0.2);

  uv.y += (n1 - 0.5) * 0.25;
  uv.x += (n2 - 0.5) * 0.15;

  uv += 0.5;

  // colors
  vec3 color1 = vec3(1.0,0.45,0.2);
  vec3 color2 = vec3(0.98,0.92,0.85);
  vec3 color3 = vec3(0.05,0.05,0.05);

  float mix1 = smoothstep(0.2,0.8,uv.y);
  float mix2 = smoothstep(0.3,1.0,uv.x);

  vec3 color = mix(color1,color2,mix1);
  color = mix(color,color3,mix2 * 0.7);

  // grain
  float grain = random(uv + t);
  color += (grain - 0.5) * 0.08;

  // more contrast
  color = mix(color, color * color, 0.4);

  // subtle pulse
  float pulse = sin(t * 0.5) * 0.03;
  color += pulse;

  gl_FragColor = vec4(color,1.0);
}
`