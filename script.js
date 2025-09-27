// Shared by both pages. Same-origin is required for cross-window access.
// On the builder page it opens preview.htm and saves the message to sessionStorage as a fallback.
// On the preview page it prefers reading from window.opener (live DOM), else falls back to sessionStorage.

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cardForm");
    const messageInput = document.getElementById("message");
    const previewBtn = document.getElementById("previewBtn");
    const cardOutput = document.getElementById("card");

    // Page 1: builder
    if (form && messageInput && previewBtn) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const text = messageInput.value.trim();

        // Persist to sessionStorage as a fallback in case pop-ups are blocked
        try {
          sessionStorage.setItem("cardMessage", text);
        } catch (err) {
          // Storage might be disabled; ignore
        }

        // Open or focus the preview window
        const w = window.open("preview.htm", "cardPreview");
        if (!w) {
          alert("Pop-up blocked. Please allow pop-ups to see the preview.");
        } else {
          // Optional focus for better UX
          w.focus();
        }
      });
    }

    // Page 2: preview
    if (cardOutput) {
      let text = "";

      // Preferred: read directly from the opener's DOM
      try {
        if (window.opener && !window.opener.closed) {
          const openerMessage = window.opener.document.getElementById("message");
          if (openerMessage) {
            text = openerMessage.value;
          }
        }
      } catch (err) {
        // Cross-origin or other access issue; fall back below
      }

      // Fallback: sessionStorage from the same tab that opened preview
      if (!text) {
        try {
          text = sessionStorage.getItem("cardMessage") || "";
        } catch (err) {
          text = "";
        }
      }

      // Render safely using textContent to avoid HTML injection
      cardOutput.textContent = text || "Your message will appear here.";
    }
  });
})();
