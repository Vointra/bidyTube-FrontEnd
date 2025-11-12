import Vue from "vue";

export default function ({ $axios }, inject) {
  const api = $axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  api.setBaseURL(process.env.API_URL + "");
  inject("api", api);
}
