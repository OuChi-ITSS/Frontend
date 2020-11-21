import * as posenet from '@tensorflow-models/posenet'

const pointRadius = 3

function toTuple({ x, y }) {
  return [x, y]
}

function drawSegment(
  [firstX, firstY],
  [nextX, nextY],
  color,
  lineWidth,
  scale,
  canvasContext
) {
  canvasContext.beginPath()
  canvasContext.moveTo(firstX * scale, firstY * scale)
  canvasContext.lineTo(nextX * scale, nextY * scale)
  canvasContext.lineWidth = lineWidth
  canvasContext.strokeStyle = color
  canvasContext.stroke()
}

function countAngle(posA, posB, posC) {
  const lineAB = Math.sqrt(
    Math.pow(posA.x - posB.x, 2) + Math.pow(posA.y - posB.y, 2)
  )
  const lineBC = Math.sqrt(
    Math.pow(posB.x - posC.x, 2) + Math.pow(posB.y - posC.y, 2)
  )
  const lineAC = Math.sqrt(
    Math.pow(posA.x - posC.x, 2) + Math.pow(posA.y - posC.y, 2)
  )
  const angleABC =
    (Math.pow(lineAB, 2) + Math.pow(lineBC, 2) - Math.pow(lineAC, 2)) /
    (2 * lineAB * lineBC)
  return Math.acos(angleABC) * (180 / Math.PI)
}

/**
 * 0: nose
 * 1: leftEye
 * 2: rightEye
 * 3: leftEar
 * 4: rightEar
 * 5: leftShoulder
 * 6: rightShoulder
 * 7: leftElbow
 * 8: rightElbow
 * 9: leftWrist
 * 10: rightWrist
 * 11: leftHip
 * 12: rightHip
 * 13: leftKnee
 * 14: rightKnee
 * 15: leftAnkle
 * 16: rightAnkle
 */

export default ({ app }, inject) => {
  const posenetUtils = {
    countPoseAngle(keypoints) {
      const poseAngles = {
        leftArm: countAngle(
          keypoints[5].position,
          keypoints[7].position,
          keypoints[9].position
        ),
        rightArm: countAngle(
          keypoints[6].position,
          keypoints[8].position,
          keypoints[10].position
        ),
        leftLeg: countAngle(
          keypoints[11].position,
          keypoints[13].position,
          keypoints[15].position
        ),
        rightLeg: countAngle(
          keypoints[12].position,
          keypoints[14].position,
          keypoints[16].position
        ),
        leftShoulder: countAngle(
          keypoints[7].position,
          keypoints[5].position,
          keypoints[11].position
        ),
        rightShoulder: countAngle(
          keypoints[8].position,
          keypoints[6].position,
          keypoints[12].position
        ),
        leftHip: countAngle(
          keypoints[5].position,
          keypoints[11].position,
          keypoints[13].position
        ),
        rightHip: countAngle(
          keypoints[6].position,
          keypoints[12].position,
          keypoints[14].position
        ),
      }
      return poseAngles
    },
    checkPose(checkData, data) {
      return (
        checkData.leftArm[0] <= data.leftArm &&
        data.leftArm <= checkData.leftArm[1] &&
        checkData.rightArm[0] <= data.rightArm &&
        data.rightArm <= checkData.rightArm[1] &&
        checkData.leftLeg[0] <= data.leftLeg &&
        data.leftLeg <= checkData.leftLeg[1] &&
        checkData.rightLeg[0] <= data.rightLeg &&
        data.rightLeg <= checkData.rightLeg[1] &&
        checkData.leftShoulder[0] <= data.leftShoulder &&
        data.leftShoulder <= checkData.leftShoulder[1] &&
        checkData.rightShoulder[0] <= data.rightShoulder &&
        data.rightShoulder <= checkData.rightShoulder[1] &&
        checkData.leftHip[0] <= data.leftHip &&
        data.leftHip <= checkData.leftHip[1] &&
        checkData.rightHip[0] <= data.rightHip &&
        data.rightHip <= checkData.rightHip[1]
      )
    },
    checkPoseDrawing(checkData, data, keypoints) {
      const keypointsChecked = [
        { check: 1 },
        { check: 1 },
        { check: 1 },
        { check: 1 },
        { check: 1 },
        { check: 0 },
        { check: 0 },
        { check: 0 },
        { check: 0 },
        { check: 0 },
        { check: 0 },
        { check: 0 },
        { check: 0 },
        { check: 0 },
        { check: 0 },
        { check: 0 },
        { check: 0 },
      ]
      const res = []
      if (
        checkData.leftArm[0] <= data.leftArm &&
        data.leftArm <= checkData.leftArm[1]
      ) {
        keypointsChecked[5].check = 1
        keypointsChecked[7].check = 1
        keypointsChecked[9].check = 1
      }
      if (
        checkData.rightArm[0] <= data.rightArm &&
        data.rightArm <= checkData.rightArm[1]
      ) {
        keypointsChecked[6].check = 1
        keypointsChecked[8].check = 1
        keypointsChecked[10].check = 1
      }
      if (
        checkData.leftLeg[0] <= data.leftLeg &&
        data.leftLeg <= checkData.leftLeg[1]
      ) {
        keypointsChecked[11].check = 1
        keypointsChecked[13].check = 1
        keypointsChecked[15].check = 1
      }
      if (
        checkData.rightLeg[0] <= data.rightLeg &&
        data.rightLeg <= checkData.rightLeg[1]
      ) {
        keypointsChecked[12].check = 1
        keypointsChecked[14].check = 1
        keypointsChecked[16].check = 1
      }
      if (
        checkData.leftShoulder[0] <= data.leftShoulder &&
        data.leftShoulder <= checkData.leftShoulder[1]
      ) {
        keypointsChecked[7].check = 1
        keypointsChecked[5].check = 1
        keypointsChecked[11].check = 1
      }
      if (
        checkData.rightShoulder[0] <= data.rightShoulder &&
        data.rightShoulder <= checkData.rightShoulder[1]
      ) {
        keypointsChecked[8].check = 1
        keypointsChecked[6].check = 1
        keypointsChecked[12].check = 1
      }
      if (
        checkData.leftHip[0] <= data.leftHip &&
        data.leftHip <= checkData.leftHip[1]
      ) {
        keypointsChecked[5].check = 1
        keypointsChecked[11].check = 1
        keypointsChecked[13].check = 1
      }
      if (
        checkData.rightHip[0] <= data.rightHip &&
        data.rightHip <= checkData.rightHip[1]
      ) {
        keypointsChecked[6].check = 1
        keypointsChecked[12].check = 1
        keypointsChecked[14].check = 1
      }
      for (let i = 0; i < keypoints.length; i++) {
        const elm = { ...keypoints[i], ...keypointsChecked[i] }
        res.push(elm)
      }
      return res
    },
    drawSkeleton(
      keypoints,
      minConfidence,
      color,
      colorCorrect,
      lineWidth,
      canvasContext,
      scale = 1
    ) {
      const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
        keypoints,
        minConfidence
      )

      adjacentKeyPoints.forEach((keypoints) => {
        if (keypoints[0].check === 1 && keypoints[1].check === 1) {
          drawSegment(
            toTuple(keypoints[0].position),
            toTuple(keypoints[1].position),
            colorCorrect,
            lineWidth,
            scale,
            canvasContext
          )
        } else {
          drawSegment(
            toTuple(keypoints[0].position),
            toTuple(keypoints[1].position),
            color,
            lineWidth,
            scale,
            canvasContext
          )
        }
      })
    },
    drawKeyPoints(
      keypoints,
      minConfidence,
      skeletonColor,
      skeletonColorCorrect,
      canvasContext,
      scale = 1
    ) {
      keypoints.forEach((keypoint) => {
        if (keypoint.score >= minConfidence) {
          const { x, y } = keypoint.position
          canvasContext.beginPath()
          canvasContext.arc(x * scale, y * scale, pointRadius, 0, 2 * Math.PI)
          if (keypoint.check === 1) {
            canvasContext.fillStyle = skeletonColorCorrect
          } else {
            canvasContext.fillStyle = skeletonColor
          }
          canvasContext.fill()
        }
      })
    },
  }
  inject('posenetUtils', posenetUtils)
}
