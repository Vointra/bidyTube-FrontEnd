<template>
  <div class="download-box">
    <h1>Downloader Video YouTube Gratis</h1>
    <p class="text-muted mb-4">Tempelkan tautan video YouTube di bawah ini</p>

    <!-- Input -->
    <form @submit.prevent="downloadVideo">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Tempel tautan video YouTube di sini..."
          v-model="videoLink"
        />
        <button class="btn btn-orange" type="submit">Download</button>
      </div>
    </form>

    <!-- Deskripsi -->
    <div class="description">
      <p>
        <strong>Platform ini sepenuhnya gratis</strong> dan berfungsi untuk
        mengunduh video dari YouTube agar dapat ditonton secara offline tanpa
        koneksi internet. Gunakan dengan bijak untuk keperluan pribadi.
      </p>
    </div>

    <!-- Modal Preview -->
    <div
      class="modal fade"
      id="previewModal"
      tabindex="-1"
      aria-labelledby="previewModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="previewModalLabel">Pilih Resolusi</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body text-center">
            <img
              v-if="thumbnailUrl"
              :src="thumbnailUrl"
              alt="Thumbnail"
              class="img-fluid rounded mb-3"
            />

            <table class="table table-bordered align-middle">
              <thead class="table-light">
                <tr>
                  <th>Resolusi</th>
                  <th>Ukuran</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(option, i) in resolutions" :key="i">
                  <td>{{ option.quality }}</td>
                  <td>{{ option.size }}</td>
                  <td>
                    <button
                      class="btn btn-orange btn-sm"
                      @click="simulateDownload(option)"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoLink: "",
      thumbnailUrl: "",
      resolutions: [
        { quality: "720p", size: "50 MB" },
        { quality: "480p", size: "30 MB" },
        { quality: "360p", size: "20 MB" },
      ],
    };
  },
  methods: {
    // Ambil ID video dari URL YouTube
    extractVideoId(url) {
      const match = url.match(
        /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
      );
      return match ? match[1] : null;
    },

    // Saat klik tombol Download
    downloadVideo() {
      if (!this.videoLink) {
        alert("Masukkan tautan video terlebih dahulu.");
        return;
      }

      const videoId = this.extractVideoId(this.videoLink);

      // Buat thumbnail dari ID
      this.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

      // Tampilkan modal Bootstrap
      const modal = new bootstrap.Modal(
        document.getElementById("previewModal")
      );
      modal.show();
    },

    // Simulasi tombol Download di dalam modal
    simulateDownload(option) {
      alert(`Mengunduh versi ${option.quality} (${option.size})...`);
    },
  },
};
</script>
