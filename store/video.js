import { defineStore } from "pinia";

export const useVideoStore = defineStore("video", {
  state: () => ({
    videos: [],
    db: null,
  }),
  actions: {
    async initializeDB() {
    },
    startRecording() {
    },
    loadLastVideo() {
    },
    playVideo(index) {
    },
    downloadVideo(index) {
    },
    deleteVideo(index) {
    },
  },
});
