export const homeThumbnail = (cover: string | undefined) => {
  if (cover) {
    if (cover.startsWith("https://static.nnnnzs.cn")) {
      return (
        cover + "?imageMogr2/thumbnail/680x/format/webp/interlace/1/quality/100"
      );
    } else {
      return cover;
    }
  } else {
    return "https://static.nnnnzs.cn/upload/c794699b0dcd2d1db62b4d3b583744a9.gif";
  }
};
