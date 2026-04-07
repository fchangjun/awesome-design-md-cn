(function () {
  let toastTimer;

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    fallbackCopy(text);
  }

  function showToast(message) {
    let toast = document.querySelector("[data-toast]");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("data-toast", "true");
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("visible");
    }, 2200);
  }

  async function handleCopy(event) {
    const button = event.target.closest("[data-copy]");
    if (!button) return;

    const text = button.getAttribute("data-copy") || "";
    if (!text.trim()) return;

    try {
      await copyText(text);
      showToast(button.getAttribute("data-copy-success") || "内容已复制");
    } catch (error) {
      showToast("复制失败，请手动复制");
    }
  }

  document.addEventListener("click", handleCopy);
})();
