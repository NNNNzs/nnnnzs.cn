/**
* 描述图像文件的元数据信息
*/
interface ImageMetadata {
  /**
   * 曝光值
   */
  apertureValue: number;

  /**
   * 亮度值
   */
  brightnessValue: number;

  /**
   * 色彩空间
   */
  colorSpace: number;

  /**
   * 合成图像
   */
  compositeImage: string;

  /**
   * 创建日期
   */
  createDate: string;

  /**
   * 原始日期时间
   */
  dateTimeOriginal: string;

  /**
   * EXIF图像高度
   */
  exifImageHeight: number;

  /**
   * EXIF图像宽度
   */
  exifImageWidth: number;

  /**
   * EXIF版本
   */
  exifVersion: string;

  /**
   * 曝光补偿
   */
  exposureCompensation: number;

  /**
   * 曝光模式
   */
  exposureMode: string;

  /**
   * 曝光程序
   */
  exposureProgram: string;

  /**
   * 曝光时间
   */
  exposureTime: number;

  /**
   * F数
   */
  fNumber: number;

  /**
   * 闪光灯状态
   */
  flash: string;

  /**
   * 焦距
   */
  focalLength: number;

  /**
   * 35mm胶片格式等效焦距
   */
  focalLengthIn35mmFormat: number;

  /**
   * GPS海拔
   */
  gpsAltitude: number;

  /**
   * GPS海拔参考
   */
  gpsAltitudeRef: Uint8Array;

  /**
   * GPS日期戳
   */
  gpsDateStamp: string;

  /**
   * GPS目的地方位
   */
  gpsDestBearing: number;

  /**
   * GPS目的地方位参考
   */
  gpsDestBearingRef: string;

  /**
   * GPS定位误差
   */
  gpsHPositioningError: number;

  /**
   * GPS图像方向
   * 这个参数表示拍摄时相机的朝向角度，通常是相对于地理北方（True North）的角度。
   * 您提供的值是 186.48645778013807，表示相机在拍摄时朝向的是地理北方顺时针方向大约 186.49 度的位置。换言之，相机是朝向南方偏西的角度。
   */
  gpsImgDirection: number;

  /**
   * GPS图像方向参考
   * 这个参数定义了 GPSImgDirection 角度的参考方向。常见的值有 "T"（True North，地理北方）和 "M"（Magnetic North，地磁北极）。
   * 您提供的值是 "M"，意味着 GPSImgDirection 的角度是相对于地磁北极的。地磁北极与地理北极不完全重合，存在磁偏角。
   */
  gpsImgDirectionRef: string;

  /**
   * GPS纬度
   */
  gpsLatitude: [number, number, number];

  /**
   * GPS纬度参考
   */
  gpsLatitudeRef: string;

  /**
   * GPS经度
   */
  gpsLongitude: [number, number, number];

  /**
   * GPS经度参考
   */
  gpsLongitudeRef: string;

  /**
   * GPS速度
   */
  gpsSpeed: number;

  /**
   * GPS速度参考
   */
  gpsSpeedRef: string;

  /**
   * 主机计算机
   */
  hostComputer: string;

  /**
   * ISO感光度
   */
  iso: number;

  /**
   * 镜头信息数组
   */
  lensInfo: number[];

  /**
   * 镜头制造商
   */
  lensMake: string;

  /**
   * 镜头型号
   */
  lensModel: string;

  /**
   * 制造商
   */
  make: string;

  /**
   * 测光模式
   */
  meteringMode: string;

  /**
   * 模型
   */
  model: string;

  /**
   * 修改日期
   */
  modifyDate: string;

  /**
   * 时区偏移量
   */
  offsetTime: string;

  /**
   * 数字化时区偏移量
   */
  offsetTimeDigitized: string;

  /**
   * 原始时区偏移量
   */
  offsetTimeOriginal: string;

  /**
   * 方向
   */
  orientation: string;

  /**
   * 分辨率单位
   */
  resolutionUnit: string;

  /**
   * 场景类型
   */
  sceneType: string;

  /**
   * 感光方式
   */
  sensingMethod: string;

  /**
   * 快门速度值
   */
  shutterSpeedValue: number;

  /**
   * 软件版本
   */
  software: string;

  /**
   * 数字化子秒时间
   */
  subSecTimeDigitized: string;

  /**
   * 原始子秒时间
   */
  subSecTimeOriginal: string;

  /**
   * 主题区域
   */
  subjectArea: Uint16Array;

  /**
   * 白平衡
   */
  whiteBalance: string;

  /**
   * X方向分辨率
   */
  xResolution: number;

  /**
   * Y方向分辨率
   */
  yResolution: number;

  /**
   * 纬度
   */
  latitude: number;

  /**
   * 经度
   */
  longitude: number;
}