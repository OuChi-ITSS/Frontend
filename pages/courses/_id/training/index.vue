<template>
  <v-container class="fill-height" fluid>
    <h1 class="display-1 mx-4">{{ $t('training') }}</h1>
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
        <!-- <div v-if="progress == 100"><CongratPage /></div> -->
      </v-col>
      <v-col cols="8">
        <ul id="example-1">
          <li v-for="index in range" :key="index">
            {{ guideTexts[index - 1] }}
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import * as tfjs from '@tensorflow/tfjs'
import { WebCam } from 'vue-web-cam'
import * as posenet from '@tensorflow-models/posenet'
import CongratPage from '~/components/CongratPage'
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
var dataList = [
	// {
	// 	leftArm: [80, 100],
	// 	rightArm: [0, 180],
	// 	leftLeg: [0, 180],
    //     rightLeg: [0, 180],
    //     leftShoulder: [0, 180],
    //     rightShoulder: [0, 180],
    //     leftHip: [0, 180],
	// 	rightHip: [0, 180],
	// },
	{
		leftArm: [30, 80],
		rightArm: [30, 80],
		leftLeg: [100, 180],
        rightLeg: [100, 180],
        leftShoulder: [20, 70],
        rightShoulder: [20, 70],
        leftHip: [100, 160],
		rightHip: [100, 160],
	},
]
var dataIndex = 0

var checkData = dataList[dataIndex]
export default {
	components: {
		WebCam,
		CongratPage,
	},
	middleware: 'authenticated',
	data() {
		return {
			img: null,
			camera: null,
			deviceId: null,
			devices: [],
			posenet: null,
			progress: 0,
			guideTexts: [],
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
	computed: {
		range:  function () {
			return this.guideTexts.length >= 2 ? 2 : this.guideTexts.length
		}
	},
	// async created() {
	// 	const resData = await this.$backend.getPoseList(this.$route.params.id)
	// 	dataList = resData.data.map((datum) => {
	// 		return JSON.parse(datum.specification)
	// 	})
	// 	console.log('data',dataList)
	// },
	async mounted() {
		const resData = await this.$backend.getPoseList(this.$route.params.id)
		dataList = resData.data.map((datum) => {
			return JSON.parse(datum.specification)
		})
		checkData = dataList[dataIndex]
		console.log('cam', this.$refs.webcam)
		this.posenet = await posenet.load()
		this.progressCheck()
		setTimeout(this.poseGuide, 5000)
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
						const checkedKeypoints =  this.$posenetUtils.checkPoseDrawing(checkData, data, keypoints)
						// console.log("check", checkedKeypoints)
						this.$posenetUtils.drawKeyPoints(
							checkedKeypoints,
							0.5,
							'#FF0000',
							'#00FF00',
							canvasContext
						)
						this.$posenetUtils.drawSkeleton(
							checkedKeypoints,
							0.5,
							'#FF0000',
							'#00FF00',
							6,
							canvasContext
						)
						
						// if (this.$posenetUtils.checkPose(checkData, data)) {
						// 	this.$posenetUtils.drawKeyPoints(
						// 		keypoints,
						// 		0.5,
						// 		'#00FF00',
						// 		canvasContext
						// 	)

						// 	this.$posenetUtils.drawSkeleton(
						// 		keypoints,
						// 		0.5,
						// 		'#00FF00',
						// 		6,
						// 		canvasContext
						// 	)
						// } else {
						// 	this.$posenetUtils.drawKeyPoints(
						// 		keypoints,
						// 		0.5,
						// 		'#ffadea',
						// 		canvasContext
						// 	)
						// 	this.$posenetUtils.drawSkeleton(
						// 		keypoints,
						// 		0.5,
						// 		'#ffadea',
						// 		6,
						// 		canvasContext
						// 	)
						// }
					}
				})
				requestAnimationFrame(findPoseDetectionFrame)
			}
			findPoseDetectionFrame()
        },
        // Kiem tra tien do tap moi 3s, neu dung thi chuyen sang pose tiep theo
        // TODO: chinh frontend cho phu hop
		progressCheck() {
			// console.log("checkData", checkData);
			if (this.progress == 100) {
				this.$router.push('/courses/' + this.$route.params.id + '/training/complete')
				dataIndex = 0
				checkData = dataList[dataIndex]
				return
			}
			if (this.$posenetUtils.checkPose(checkData, data)) {
				this.progress += 100 / dataList.length
				if (dataIndex < dataList.length - 1) {
					checkData = dataList[++dataIndex]
				}
			}
			clearTimeout(nIntervId)
			nIntervId = setTimeout(this.progressCheck, 3500)
		},
		poseGuide() {
			if (this.progress == 100) {
				this.guideTexts = []
				return;
			}
			this.guideTexts = this.$posenetUtils.checkPoseGuide(checkData, data)
			setTimeout(this.poseGuide, 1000)
		}
	},
}
</script>
