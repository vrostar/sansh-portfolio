"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useScrollProgress } from "@/hooks/useScrollProgress"
import * as THREE from "three"

export default function Background() {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const scrollRef = useScrollProgress()

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime

      materialRef.current.uniforms.uResolution.value.set(
        state.size.width,
        state.size.height
      )

    materialRef.current.uniforms.uScroll.value = scrollRef.current
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: new THREE.Vector2() },
          uScroll: { value: 0 }
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
uniform float uScroll;
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
  float t = mod(uTime, 60.0);

  vec2 uv = vUv - 0.5;

  // aspect ratio
  float aspect = 1.0;
  uv.x *= aspect;

  float n1 = noise(uv * 4.0 + t * 0.3);
  float n2 = noise(uv * 2.0 - t * 0.2);

  float distortionStrength = mix(0.25, 0.02, uScroll);

  uv.y += (n1 - 0.5) * distortionStrength;
  uv.x += (n2 - 0.5) * distortionStrength;

  uv += 0.5;

  // colors
  vec3 warm1 = vec3(1.0,0.45,0.2);
  vec3 warm2 = vec3(0.98,0.92,0.85);
  vec3 darkSpace = vec3(0.02,0.02,0.05);

  float mix1 = smoothstep(0.2,0.8,uv.y);
  float mix2 = smoothstep(0.3,1.0,uv.x);

  // base molten color
  vec3 warmColor = mix(warm1, warm2, mix1);
  warmColor = mix(warmColor, vec3(0.1), mix2 * 0.7);

  // scroll transition
  vec3 color = mix(warmColor, darkSpace, uScroll);

  // stars appear as you scroll
  float stars = step(0.995, random(uv * 200.0 + uTime));
  color += stars * uScroll;

  // grain
  float grain = random(uv + t);
  color += (grain - 0.5) * 0.08;

  // more contrast
  color = mix(color, color * color, 0.4);

  // subtle pulse
  float pulse = sin(t * 0.5) * 0.03;
  color += pulse * (1.0 - uScroll);

  gl_FragColor = vec4(color,1.0);
}
`