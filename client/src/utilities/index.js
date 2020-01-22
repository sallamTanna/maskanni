import Swal from "sweetalert2";

const alert = (
  type,
  icon,
  title,
  text,
  timer,
  showConfirmButton,
  showCancelButton,
  confirmButtonColor,
  cancelButtonColor,
  confirmButtonText
) =>
  Swal.fire({
    type,
    icon,
    title,
    text,
    timer,
    showConfirmButton,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
  });

export { alert };
