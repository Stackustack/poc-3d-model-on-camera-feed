import { Camera } from "@mediapipe/camera_utils";

export type ICamera = (cameraOptions: CameraOptions) => Camera;

export type CameraOptions = {
  videoSrc: HTMLVideoElement;
  onFrame: () => Promise<void>;
  width: number;
  height: number;
};

export interface FingerResult {
  x: number;
  y: number;
  z: number;
}
