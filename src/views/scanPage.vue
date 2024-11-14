<template>
  <div class="scan-page" style="position: relative">
    <van-nav-bar
      title="扫描二维码/条形码"
      left-text="取消"
      left-arrow
      fixed
      class="scan-index-bar"
      @click-left="clickIndexLeft()"
    ></van-nav-bar>
    <!-- 扫码区域 -->
    <canvas
      style="
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2000;
        background: 0; /* 确保背景透明 */
      "
      ref="canvasRef"
    ></canvas>
    <video ref="video" id="video" class="scan-video" autoplay></video>
    <div
      style="
        width: 80%;
        height: 30%;
        border: 1px solid red;
        position: absolute;
        z-index: 999999;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -70%);
      "
      ref="scanBox"
    ></div>
  </div>
</template>

<script>
import { BrowserMultiFormatReader } from "@zxing/library";
import { usebookstore } from "@/stores";
export default {
  name: "ScanCodePage", // 扫码页面
  data() {
    return {
      boolstore: usebookstore(),
      codeReader: null,
      tipShow: false, // 是否展示提示
      tipMsg: "", // 提示文本内容
      scanText: "", // 扫码结果文本内容
      scanBox: null,
      canvas: null,
      elData: {
        left: Infinity, //无穷大
        top: Infinity,
        right: -Infinity, //无穷校小
        bottom: -Infinity,
        width: -Infinity,
        height: -Infinity,
      },
    };
  },
  created() {
    this.openScan();
    this.initCanvas();
  },
  watch: {
    $route(to, from) {
      if (to.path == "/ScanCodePage") {
        // 当处于该页面时
        this.openScan();
      }
    },
  },
  methods: {
    initCanvas() {
      // 确保 canvasRef 已经渲染
      this.$nextTick(() => {
        this.canvas = this.$refs.canvasRef;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // 确保 scanBox 已经渲染并且可以计算出位置
        this.elData = {
          left: this.$refs.scanBox.getBoundingClientRect().left,
          top: this.$refs.scanBox.getBoundingClientRect().top,
          right: this.$refs.scanBox.getBoundingClientRect().right,
          bottom: this.$refs.scanBox.getBoundingClientRect().bottom,
          width: this.$refs.scanBox.getBoundingClientRect().width,
          height: this.$refs.scanBox.getBoundingClientRect().height,
        };

        const context = this.canvas.getContext("2d");
        context.fillStyle = "rgba(0, 0, 0, 0.8)";
        context.filter = "grayscale(100%)"; // 完全灰度
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        context.strokeStyle = "white"; // 设置边框颜色为白色
        context.lineWidth = 2; // 设置边框宽度

        // 设置虚线样式
        context.setLineDash([7, 4]);

        // 绘制虚线白色边框
        context.strokeRect(
          this.elData.left - 15 - context.lineWidth / 2,
          this.elData.top - 15 - context.lineWidth / 2,
          this.elData.width + 30 + context.lineWidth,
          this.elData.height + 30 + context.lineWidth
        );

        // 设置合成方式为 destination-out，绘制选中区域为透明
        context.globalCompositeOperation = "destination-out";
        context.fillRect(
          this.elData.left - 15,
          this.elData.top - 15,
          this.elData.width + 30,
          this.elData.height + 30
        );
      });
    },
    async openScan() {
      // 初始化摄像头
      this.codeReader = await new BrowserMultiFormatReader();
      this.codeReader
        .getVideoInputDevices()
        .then((videoDevices) => {
          this.tipMsg = "正在调用摄像头...";
          this.tipShow = true;
          console.log("get-videoDevices", videoDevices);

          // 优先选择后置摄像头
          let selectedDeviceId = null;

          // 查找后置摄像头
          const backCamera = videoDevices.find((device) => {
            return (
              device.label.toLowerCase().includes("back") ||
              device.label.toLowerCase().includes("rear")
            );
          });

          // 如果没有后置摄像头，则选择前置摄像头
          const frontCamera = videoDevices.find((device) => {
            return (
              device.label.toLowerCase().includes("front") ||
              device.label.toLowerCase().includes("face")
            );
          });

          // 确定使用的摄像头
          if (backCamera) {
            selectedDeviceId = backCamera.deviceId;
          } else if (frontCamera) {
            selectedDeviceId = frontCamera.deviceId;
          } else {
            // 如果没有找到合适的摄像头，可以选择默认的第一个设备
            selectedDeviceId = videoDevices[0].deviceId;
          }

          console.log("get-selectedDeviceId", selectedDeviceId);
          this.decodeFromInputVideoFunc(selectedDeviceId);
        })
        .catch((err) => {
          this.tipShow = false;
          console.error(err);
        });
    },

    decodeFromInputVideoFunc(firstDeviceId) {
      this.codeReader.reset(); // 重置
      this.codeReader.decodeFromInputVideoDeviceContinuously(
        firstDeviceId,
        "video",
        (result, err) => {
          //   if (err) {
          //     console.error("解码错误:", err);
          //     this.tipMsg = "未能识别二维码，请尝试对准二维码";
          //     return;
          //   }

          if (result) {
            console.log("扫码结果", result.text);
            this.boolstore.setbookIBSN(result.text);
            this.codeReader.reset();
            this.codeReader = null;
            this.$router.push("/home");

            // if (this.scanText) {
            //   this.tipShow = false;
            //   ElMessage.then(() => {
            //     // 点击确认
            //   }).catch(() => {
            //     // 点击取消
            //   });
            // }
          }
        }
      );
    },

    clickIndexLeft() {
      try {
        this.codeReader.reset();
        this.codeReader = null;
        this.$router.go(-1);
      } catch (error) {
        console.error("Error in clickIndexLeft:", error);
      }
    },
  },
};
</script>

<style lang="scss">
.scan-index-bar {
  z-index: 1000000;
  background-image: linear-gradient(-45deg, #42a5ff, #59cfff);
  .van-nav-bar__title,
  .van-nav-bar__arrow,
  .van-nav-bar__text {
    color: #fff !important;
  }
}
.scan-page {
  min-height: 100vh;
  background-color: #363636;
  overflow-y: hidden;
  .scan-video {
    width: 100vw; /* 设置宽度为100% */
    height: 100vh; /* 设置高度为100% */
    object-fit: cover; /* 保持比例裁剪视频 */
  }
  .scan-tip {
    width: 100vw;
    text-align: center;
    color: white;
    font-size: 5vw;
  }
}
</style>
