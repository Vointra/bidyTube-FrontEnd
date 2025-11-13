<template>
  <div class="download-box">
    <h1>Downloader Video YouTube Gratis</h1>
    <p class="text-muted mb-4">Tempelkan tautan video YouTube di bawah ini</p>

    <form @submit.prevent="fungsiDapatkanResolusi">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Tempel tautan video YouTube di sini..."
          v-model="videoLink"
          required
        />
        <button class="btn btn-orange" type="submit">Download</button>
      </div>
    </form>

    <div class="description">
      <p>
        <strong>Platform ini sepenuhnya gratis</strong> dan berfungsi untuk
        mengunduh video dari YouTube agar dapat ditonton secara offline tanpa
        koneksi internet. Gunakan dengan bijak untuk keperluan pribadi.
      </p>
    </div>

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
              v-if="resolusi.thumbnail"
              :src="resolusi.thumbnail"
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
                <tr v-for="(item, index) in resolusi.resolutions" :key="index">
                  <td>{{ item.resolution }}</td>
                  <td>
                    {{
                      item.filesize_mb
                        ? item.filesize_mb + " MB"
                        : "Tidak diketahui"
                    }}
                  </td>
                  <td>
                    <button
                      class="btn btn-orange btn-sm"
                      @click="fungsiDownloadVideo(item.format_id)"
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
      resolusi: [],
    };
  },
  methods: {
    extractVideoId(url) {
      const match = url.match(
        /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
      );
      return match ? match[1] : null;
    },

    fungsiDapatkanResolusi: async function () {
      this.resolusi = (
        await this.$api.$get(
          `/resolutions?url=${encodeURIComponent(this.videoLink)}`
        )
      ).data;
      const modal = new bootstrap.Modal(
        document.getElementById("previewModal")
      );
      modal.show();
    },

    async fungsiDownloadVideo(format_id) {
      if (!this.videoLink || !format_id) {
        alert("Tautan atau format tidak valid.");
        return;
      }

      try {
        const downloadUrl = `${
          process.env.API_URL || "http://localhost:5000"
        }/download?url=${encodeURIComponent(
          this.videoLink
        )}&format_id=${format_id}`;

        window.open(downloadUrl, "_blank");
      } catch (error) {
        console.error("Gagal memulai download:", error);
        alert("Terjadi kesalahan saat mencoba mendownload video.");
      }
    },
  },
};
</script>
