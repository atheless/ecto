import { defineStore } from "pinia";

export const useVideoStore = defineStore("video", {
  state: () => ({
    videos: [],
    db: null,
    // other states
  }),
  actions: {
    async initializeDB() {
      // IndexedDB initialization logic
    },
    startRecording() {
      // Start recording logic
    },
    loadLastVideo() {
      // Load last video logic
    },
    playVideo(index) {
      // Play video logic
    },
    downloadVideo(index) {
      // Download video logic
    },
    deleteVideo(index) {
      // Delete video logic
    },
  },
});
