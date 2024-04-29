<template>
  <div>
    <Splitter class="bg-white" style="height: 500px; margin-bottom: 4px">
      <SplitterPanel
        class="flex align-items-center justify-content-center"
        :size="25"
        :minSize="10"
      >
        <div
          class="flex flex-col align-items-center justify-content-center w-full"
          style="height: 100%"
        >
          <Button
            class="pi pi-eye"
            @click="startRecording"
            text
            raised
            style="margin: 5px; flex: 1; width: 100%"
            >Record screen</Button
          >
          <Button
            class="pi pi-history p-button"
            @click="loadLastVideo"
            text
            raised
            style="margin: 5px; flex: 1; width: 100%"
            >Load Last Recording</Button
          >
        </div>
      </SplitterPanel>

      <SplitterPanel
        class="flex align-items-center justify-content-center"
        :size="75"
      >
        <div style="width: 99%; height: 99%; box-sizing: border-box">
          <video
            ref="videoElement"
            class="h-full w-full mx-2 mb-2 mr-2 ml-2"
            style="width: 100%; height: 100%; z-index: 0"
            controls
          ></video>
        </div>
      </SplitterPanel>
    </Splitter>

    <DataTable
      :value="videos"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle=""
    >
      <template #paginatorstart>
        <Button icon="pi pi-refresh" @click="updateVideoList" />
      </template>
      <template #paginatorend>
        <Button icon="pi pi-download" />
      </template>
      <Column field="date" header="Recorded On"></Column>
      <Column header="Actions">
        <template #body="slotProps">
          <Button class="pi pi-play mr-2" @click="playVideo(slotProps.index)" />
          <Button
            class="pi pi-download mr-2"
            @click="downloadVideo(slotProps.index)"
          />
          <Button
            class="pi pi-trash mr-2"
            @click="deleteVideo(slotProps.index)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const videoElement = ref(null);
const videos = ref([]);
let db;

const openDB = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("VideoDB", 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("videos")) {
        db.createObjectStore("videos", { autoIncrement: true });
      }
    };
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
    request.onerror = (event) => reject(event.target.error);
  });
};

const updateVideoList = async () => {
  const tx = db.transaction(["videos"], "readonly");
  const store = tx.objectStore("videos");
  const allVideos = store.getAll();
  allVideos.onsuccess = () => {
    videos.value = allVideos.result;
  };
};

onMounted(async () => {
  await openDB();
  await updateVideoList();
});

const startRecording = async () => {
  const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
    ? "video/webm; codecs=vp9"
    : "video/webm";
  const mediaRecorder = new MediaRecorder(stream, { mimeType: mime });
  const chunks = [];

  mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
  mediaRecorder.onstop = async () => {
    const blob = new Blob(chunks, { type: chunks[0].type });
    const videoData = {
      blob,
      date: new Date().toLocaleString(),
    };
    const tx = db.transaction(["videos"], "readwrite");
    const store = tx.objectStore("videos");
    await store.put(videoData);
    await updateVideoList();
    alert("Video saved to DB");
  };
  mediaRecorder.start();
};

const playVideo = (index) => {
  const url = URL.createObjectURL(videos.value[index].blob);
  videoElement.value.src = url;
};

const downloadVideo = (index) => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(videos.value[index].blob);
  a.download = `video_${index}.webm`;
  a.click();
};

const deleteVideo = async (index) => {
  const tx = db.transaction(["videos"], "readwrite");
  const store = tx.objectStore("videos");
  const allKeys = store.getAllKeys();
  allKeys.onsuccess = async () => {
    await store.delete(allKeys.result[index]);
    await updateVideoList();
    alert("Video deleted successfully");
  };
};

const loadLastVideo = () => {
  const tx = db.transaction(["videos"], "readonly");
  const store = tx.objectStore("videos");
  const request = store.openCursor(null, "prev");
  request.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const url = URL.createObjectURL(cursor.value.blob);
      videoElement.value.src = url;
      console.log("Last video loaded successfully.");
    } else {
      alert("No videos found!");
    }
  };
  request.onerror = (event) =>
    console.error("Error fetching last video.", event);
};
</script>

<style scoped>
/* Add any styles here */
</style>
