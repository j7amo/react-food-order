export function validateText(text) {
  return text.trim().length !== 0;
}

export function validateEmail(email) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
