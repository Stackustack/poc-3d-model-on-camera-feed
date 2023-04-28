import { Camera } from "@mediapipe/camera_utils";
import useHandsLandmarks from "../../hooks/useIndexFingerLandmark/useIndexFingerLandmark";
import { Hands } from "@mediapipe/hands";
import Webcam from "react-webcam";
import ModelOverlay from "../ModelOverlay/ModelOverlay";
import DebugInfo from "../Debug/DebugInfo";
import { CameraOptions } from "../../types/types";

interface VirtualTryOnModuleProps {
  debug?: boolean;
  width: number;
  height: number;
}

const VirtualTryOnModule = ({
  debug,
  width,
  height,
}: VirtualTryOnModuleProps) => {
  const { isCameraLoading, webcamRef, fingerResults } = useHandsLandmarks({
    handsDetection: new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    }),
    camera: ({ videoSrc, onFrame }: CameraOptions) =>
      new Camera(videoSrc, {
        onFrame,
        width,
        height,
      }),
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Webcam
          ref={webcamRef}
          forceScreenshotSourceSize
          style={{
            height,
            width,
          }}
        />
        <ModelOverlay
          width={width}
          height={height}
          fingerData={fingerResults}
        />
      </div>

      <DebugInfo
        fingerResults={fingerResults}
        isCameraLoading={isCameraLoading}
        debug={debug}
      />
    </>
  );
};

export default VirtualTryOnModule;
