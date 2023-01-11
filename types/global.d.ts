export {}
declare global {
  interface Window {
    // AV: typeof import("leancloud-storage")
    WordCloud: typeof import("WordCloud")
  }
}
