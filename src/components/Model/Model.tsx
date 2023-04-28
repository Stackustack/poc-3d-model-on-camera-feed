import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

interface ModelProps {
  position: {
    x: number;
    y: number;
  };
  scale?: number;
}

export const Model = ({ position, scale = 1 }: ModelProps) => {
  const gltf = useLoader(GLTFLoader, "/oilcan_3d_asset.glb");
  const modelRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.05;
      modelRef.current.position.x = position.x;
      modelRef.current.position.y = position.y;
      modelRef.current.scale.set(-10 * scale, -10 * scale, -10 * scale);
    }
  });

  return <primitive ref={modelRef} object={gltf.scene} />;
};
