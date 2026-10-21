import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

const EARTH_TEXTURE =
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg";

const EARTH_NORMAL =
  "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg";

const EARTH_SPECULAR =
  "https://threejs.org/examples/textures/planets/earth_specular_2048.jpg";

function Earth() {
  const earthRef = useRef();

  const [earthTexture, normalTexture, specularTexture] = useLoader(
    THREE.TextureLoader,
    [EARTH_TEXTURE, EARTH_NORMAL, EARTH_SPECULAR]
  );

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0018;
    }
  });

  return (
    <group ref={earthRef}>
      {/* Realistic Earth */}
      <mesh>
        <sphereGeometry args={[1.7, 128, 128]} />

        <meshPhongMaterial
          map={earthTexture}
          normalMap={normalTexture}
          specularMap={specularTexture}
          specular={new THREE.Color("#555555")}
          shininess={12}
        />
      </mesh>

      {/* Soft atmospheric layer */}
      <mesh scale={[1.035, 1.035, 1.035]}>
        <sphereGeometry args={[1.7, 64, 64]} />

        <meshPhongMaterial
          color="#6fa8ff"
          transparent
          opacity={0.10}
          side={THREE.FrontSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer blue atmosphere */}
      <mesh scale={[1.07, 1.07, 1.07]}>
        <sphereGeometry args={[1.7, 64, 64]} />

        <meshBasicMaterial
          color="#4c8dff"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function RotatingGlobe() {
  return (
    <div className="globe-container">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 40,
        }}
        dpr={[1, 2]}
      >
        {/* Earth lighting */}
        <ambientLight intensity={0.35} />

        <directionalLight
          position={[4, 2, 5]}
          intensity={3}
        />

        <pointLight
          position={[-4, -2, 3]}
          intensity={0.8}
          color="#6d8fff"
        />

        <Earth />

        {/* Background stars */}
        <Stars
          radius={10}
          depth={5}
          count={1200}
          factor={2}
          saturation={0}
          fade
          speed={0.25}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}

export default RotatingGlobe;