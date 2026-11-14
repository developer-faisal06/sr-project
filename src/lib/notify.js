import Swal from 'sweetalert2';

// Base customized SweetAlert with Gold & Navy Luxury styling
const DarkSwal = Swal.mixin({
  background: '#071738',
  color: '#f8fafc',
  confirmButtonColor: '#facc15',
  cancelButtonColor: '#334155',
  customClass: {
    popup: 'border-2 border-amber-400/40 rounded-3xl shadow-2xl font-sans',
    title: 'text-amber-400 font-black',
    confirmButton: 'text-slate-950 font-black px-6 py-2.5 rounded-xl shadow-lg',
    cancelButton: 'text-slate-300 font-bold px-6 py-2.5 rounded-xl'
  }
});

export const notifySuccess = (title, text = '') => {
  return DarkSwal.fire({
    icon: 'success',
    title,
    text,
    timer: 1400,
    timerProgressBar: true,
    showConfirmButton: false
  });
};

export const notifyError = (title, text = '') => {
  return DarkSwal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonText: 'Understood'
  });
};

export const notifyWarning = (title, text = '') => {
  return DarkSwal.fire({
    icon: 'warning',
    title,
    text,
    confirmButtonText: 'OK'
  });
};

export const notifyConfirm = async (title, text = '', confirmText = 'Yes, Proceed') => {
  const result = await DarkSwal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancel',
    reverseButtons: true
  });
  return result.isConfirmed;
};

export default DarkSwal;
