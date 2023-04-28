# 3D Asset on Camera Feed - Proof of Concept

This is simple example how to display 3d asset on camera feed, based on finger position. This can be used for virtual-try-on with further development.

To capture finger position @mediapipe/hands was used.
To display 3d asset (GLB file) @react-three/fiber was used.

Asset by https://sketchfab.com/motionpix on licence: https://creativecommons.org/licenses/by/4.0/legalcode

## Demo
![screencast 2023-04-29 01-31-42](https://user-images.githubusercontent.com/8258455/235269661-a08f8c5f-81ce-4c88-acc6-ef7b217d2895.gif)


## VTO Module

Basic implementation works as follows:
![image](https://user-images.githubusercontent.com/8258455/235269056-a7148604-4081-4568-bcbe-605c640d2dea.png)


## Exporting the asset from ThreeKit

Documentation: https://developer.threekit.com/

Unfortuntelly sandbox doesn't allow downloading asset from sandbox due to restrictions (probably... call for the second endpoint is returning 403 Forbidden, even when using token that works for for other endpoints).

Technically, to fetch the asset:

- Create export job: https://developer.threekit.com/reference/exportasset
- Download exported asset: https://developer.threekit.com/reference/jobdownloads

Tip:

- `sync: true` on first endpoint can be used to wait for asset to be exported, then second endpoint can be called (chained).
