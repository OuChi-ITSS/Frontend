<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <!-- TODO: File nay tam de day de test, a Lam chinh ve dung route cho b nhe-->
      <!-- Phan nay la camera da duoc hide di roi nhe-->
      <v-col cols="12" align="center" justify="center">
        <web-cam
          ref="webcam"
          style="
            transform: scaleX(-1);
            -moz-transform: scaleX(-1);
            -o-transform: scaleX(-1);
            -webkit-transform: scaleX(-1);
            display: none !important;
          "
          width="900"
          :device-id="deviceId"
          @cameras="onCameras"
          @video-live="onLive"
        />
        <!-- Phan nay moi la phan thuc hien detection-->
        <canvas ref="canvas" />
      </v-col>
      <v-col cols="8">
        <!-- Bien cai nay thanh progress bar nhe-->
        <v-progress-linear
          v-model="progress"
          stream
          color="cyan"
          rounded
          height="25"
        >
          <strong>{{ progress }}%</strong>
        </v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import * as tfjs from '@tensorflow/tfjs'
// import {
// 	drawKeyPoints,
// 	drawSkeleton,
// 	countPoseAngle,
// 	checkPose,
// } from "../util/utils";
import { WebCam } from 'vue-web-cam'
import * as posenet from '@tensorflow-models/posenet'
var nIntervId
var data = {
	leftArm: 0,
	rightArm: 0,
	leftLeg: 0,
    rightLeg: 0,
    leftShoulder: 0,
	rightShoulder: 0,
	leftHip: 0,
	rightHip: 0,
}
const dataList = [
	{
		leftArm: [80, 100],
		rightArm: [0, 180],
		leftLeg: [0, 180],
        rightLeg: [0, 180],
        leftShoulder: [0, 180],
        rightShoulder: [0, 180],
        leftHip: [0, 180],
		rightHip: [0, 180],
	},
	{
		leftArm: [40, 60],
		rightArm: [0, 180],
		leftLeg: [0, 180],
        rightLeg: [0, 180],
        leftShoulder: [0, 180],
        rightShoulder: [0, 180],
        leftHip: [0, 180],
		rightHip: [0, 180],
	},
]
var dataIndex = 0

var checkData = dataList[dataIndex]
export default {
	components: {
		WebCam,
	},
	data() {
		return {
			img: null,
			camera: null,
			deviceId: null,
			devices: [],
			posenet: null,
			progress: 0,
		}
	},
	watch: {
		camera: function (id) {
			this.deviceId = id
		},
		devices: function () {
			// Once we have a list select the first one
			const [first, ...tail] = this.devices
			if (first) {
				this.camera = first.deviceId
				this.deviceId = first.deviceId
			}
		},
	},
	async mounted() {
		console.log('cam', this.$refs.webcam)
		this.posenet = await posenet.load()
		this.progressCheck()
	},
	methods: {
		onCameras(cameras) {
			this.devices = cameras
			console.log('On Cameras Event', cameras)
		},
		onLive(stream) {
			this.detectPose()
        },
        // Ve cac duong tren co the, mau do la sai mau xanh la dung form
		detectPose() {
			const canvas = this.$refs.canvas
			const canvasContext = canvas.getContext('2d')

			canvas.width = 900
			canvas.height = 500

			this.poseDetectionFrame(canvasContext)
		},

		poseDetectionFrame(canvasContext) {
			const posenetModel = this.posenet
			const video = this.video

			const findPoseDetectionFrame = async () => {
				let poses = []

				const pose = await posenetModel.estimateSinglePose(
					this.$refs.webcam.$el,
					{
						flipHorizontal: true,
					}
				)
				poses.push(pose)

				canvasContext.clearRect(0, 0, 900, 500)

				if (true) {
					canvasContext.save()
					canvasContext.scale(-1, 1)
					canvasContext.translate(-900, 0)
					canvasContext.drawImage(
						this.$refs.webcam.$el,
						0,
						0,
						900,
						500
					)
					canvasContext.restore()
				}

				poses.forEach(({ score, keypoints }) => {
					if (score >= 0.1) {
						data = this.$posenetUtils.countPoseAngle(keypoints)
						// console.log("Pose Angle", data);
						if (this.$posenetUtils.checkPose(checkData, data)) {
							this.$posenetUtils.drawKeyPoints(
								keypoints,
								0.5,
								'#00FF00',
								canvasContext
							)

							this.$posenetUtils.drawSkeleton(
								keypoints,
								0.5,
								'#00FF00',
								6,
								canvasContext
							)
						} else {
							this.$posenetUtils.drawKeyPoints(
								keypoints,
								0.5,
								'#ffadea',
								canvasContext
							)
							this.$posenetUtils.drawSkeleton(
								keypoints,
								0.5,
								'#ffadea',
								6,
								canvasContext
							)
						}
					}
				})
				requestAnimationFrame(findPoseDetectionFrame)
			}
			findPoseDetectionFrame()
        },
        // Kiem tra tien do tap moi 3s, neu dung thi chuyen sang pose tiep theo
        // TODO: chinh frontend cho phu hop
		progressCheck() {
			if (this.progress == 100) {
				return
			}
			if (this.$posenetUtils.checkPose(checkData, data)) {
				this.progress += 50
				if (dataIndex < dataList.length - 1) {
					checkData = dataList[++dataIndex]
				}
			}
			clearTimeout(nIntervId)
			nIntervId = setTimeout(this.progressCheck, 3000)
		},
	},
}
</script>
