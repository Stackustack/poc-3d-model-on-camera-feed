import { Canvas } from "@react-three/fiber";
import { Model } from "../Model/Model";
import { FingerResult } from "../../types/types";

interface ModelOverlayProps {
  width: number;
  height: number;
  fingerData?: FingerResult;
}

const ModelOverlay: React.FC<ModelOverlayProps> = ({
  width,
  height,
  fingerData,
}) => {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: width,
        height: height,
      }}
      camera={{ position: [0, 0, 1], fov: 50 }}
      gl={{ alpha: true }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {fingerData && (
        <Model
          position={{
            x: (fingerData?.x - 0.5) * 1.2,
            y: -(fingerData.y - 0.5) * 1.0,
          }}
          scale={fingerData.z || 1}
        />
      )}
    </Canvas>
  );
};

export default ModelOverlay;
