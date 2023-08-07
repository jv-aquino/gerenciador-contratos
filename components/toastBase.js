export default function toastBase(time) {
  return {
      position: "top-center",
      autoClose: time,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }
}