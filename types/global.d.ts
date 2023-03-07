export { }
declare global {
  interface Window {
    // AV: typeof import("leancloud-storage")
    WordCloud: typeof import("WordCloud")
    heic2any?: typeof import('heic2any').default
  }
}
