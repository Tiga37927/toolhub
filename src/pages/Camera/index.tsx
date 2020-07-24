import React, { useState, useRef } from 'react';
import { Button, Space, Divider } from 'antd';
import './index.less';

const Camera: React.FC = () => {
  const canvasRef = useRef<any>(null);
  const videoRef = useRef<any>(null);
  const [imgUrl, setImgUrl] = useState();
  const [showChangeBtn, setShowChangeBtn] = useState(false);
  const [hasOpenCamera, setHasOpenCamera] = useState(false);
  const [mediaStreamTrack, setMediaStreamTrack] = useState<any>();

  const handleOpenCamera = () => {
    // 获取媒体方法（旧方法）
    let video = videoRef.current;
    // 打开摄像头
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream: any) => {
          typeof stream.stop === 'function'
            ? setMediaStreamTrack(stream)
            : setMediaStreamTrack(stream.getTracks()[0]);
          // 新版浏览器不再支持src
          video.srcObject = stream;
          video.play();
        })
        .catch((e) => console.log(e));
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { video: true },
        (stream) => {
          setMediaStreamTrack(stream.getTracks()[0]);
          video.src = (window.URL || window.webkitURL).createObjectURL(stream);
          video.play();
        },
        (e) => console.log(e),
      );
    }
    setHasOpenCamera(true);
  };
  const handleSnap = () => {
    let canvas = canvasRef.current,
      context = canvas.getContext('2d'),
      video = videoRef.current;
    context.drawImage(video, 0, 0, video.videoWidth / 2, video.videoHeight / 2);
    setShowChangeBtn(true);
  };
  const handleRemoveSnap = () => {
    let canvas = canvasRef.current,
      context = canvas.getContext('2d');
    context.clearRect(0, 0, 400, 400);
    setShowChangeBtn(false);
  };
  const handleChange = () => {
    if (!showChangeBtn) return;
    let canvas = canvasRef.current;
    setImgUrl(canvas.toDataURL('image/png', 0.6));
  };
  const handleClose = () => {
    mediaStreamTrack && mediaStreamTrack.stop();
  };
  return (
    <div className="camera-wrapper">
      <Divider orientation="left">web 调用设备摄像头</Divider>
      <div className="camera-content">
        <canvas ref={canvasRef} className="canvas"></canvas>
        <video ref={videoRef} className="video"></video>
        {imgUrl && <img src={imgUrl} alt="截取图片" className="img" />}
      </div>
      <Space>
        <Button type="primary" onClick={handleOpenCamera} disabled={hasOpenCamera}>
          打开摄像头
        </Button>
        <Button type="primary" onClick={handleSnap}>
          拍照
        </Button>
        <Button type="primary" onClick={handleChange} disabled={!showChangeBtn}>
          转换成图片
        </Button>
        <Button type="primary" onClick={handleRemoveSnap}>
          删除
        </Button>
        <Button type="primary" onClick={handleClose} disabled={!hasOpenCamera}>
          关闭摄像头
        </Button>
      </Space>
    </div>
  );
};
export default Camera;
