import { Hands, Results } from "@mediapipe/hands";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { FingerResult, ICamera } from "../../types/types";

interface useIndexFingerLandmarkProps {
  camera: ICamera;
  handsDetection: Hands;
}

const useIndexFingerLandmark = ({
  camera: cameraProp,
  handsDetection: handsDetectionProp,
}: useIndexFingerLandmarkProps) => {
  const [isCameraLoading, setIsCameraLoading] = useState<boolean>(true);
  const [fingerResults, isFingerResults] = useState<FingerResult | undefined>(
    undefined
  );

  const webcamRef = useRef<Webcam>(null);
  const camera = useRef(cameraProp).current;
  const handsDetection = useRef(handsDetectionProp).current;

  const handleOnResults = useCallback((results: Results) => {
    const isFingerDetected = results.multiHandLandmarks.length !== 0;

    isFingerResults(
      isFingerDetected
        ? {
            x: results.multiHandLandmarks[0][8].x,
            y: results.multiHandLandmarks[0][8].y,
            z: results.multiHandLandmarks[0][8].z,
          }
        : undefined
    );
  }, []);

  const handleHandsDetection = useCallback(
    async (videoSrc: HTMLVideoElement) => {
      handsDetection.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      handsDetection.onResults(handleOnResults);

      if (videoSrc instanceof HTMLVideoElement && camera) {
        const cameraConfig = {
          videoSrc,
          width: videoSrc.videoWidth,
          height: videoSrc.videoHeight,
          onFrame: async () => {
            await handsDetection.send({ image: videoSrc });
            if (isCameraLoading) setIsCameraLoading(false);
          },
        };
        camera(cameraConfig).start();
      }
    },
    [handsDetection, handleOnResults, camera, isCameraLoading]
  );

  useEffect(() => {
    if (webcamRef.current && webcamRef.current.video) {
      handleHandsDetection(webcamRef.current.video);
    }
  }, [handleHandsDetection, handleOnResults]);

  return { isCameraLoading, webcamRef, fingerResults };
};

export default useIndexFingerLandmark;
