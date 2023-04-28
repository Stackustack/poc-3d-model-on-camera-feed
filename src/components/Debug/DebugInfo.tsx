import { FingerResult } from "../../hooks/useIndexFingerLandmark/useIndexFingerLandmark";

interface DebugInfoProps {
  fingerResults?: FingerResult;
  debug?: boolean;
  isCameraLoading: boolean;
}

const DebugInfo = ({
  fingerResults,
  debug,
  isCameraLoading,
}: DebugInfoProps) => {
  if (!debug) return null;

  return (
    <div>
      <div>Camera Loading: {isCameraLoading.toString()}</div>
      <div>Finger Detected X: {fingerResults?.x}</div>
      <div>Finger Detected Y: {fingerResults?.y}</div>
      <div>Finger Detected Z: {fingerResults?.z}</div>
    </div>
  );
};

export default DebugInfo;
