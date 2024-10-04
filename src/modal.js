// Modal utility to block interactions and prevent scroll except for a specified element
import { watch } from "vue";

let activeModal = null;
let originalBodyStyle = null;
let overlay = null;

function blockInteractions(excludeElement, onOverlayClick, isBlocking = true) {
  if (!isBlocking) {
    unblockInteractions();
    return;
  }

  if (activeModal) {
    console.warn(
      "A modal is already active. Close it before opening a new one."
    );
    return;
  }

  // Get the front document using wwLib
  const frontDocument = wwLib.getFrontDocument();
  if (!frontDocument) {
    console.warn("No front document found.");
    return;
  }

  // Create overlay element
  overlay = frontDocument.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.pointerEvents = "auto";

  // Add click event listener to the overlay
  overlay.addEventListener("click", (event) => {
    // Check if the click target is the overlay itself
    if (event.target === overlay && typeof onOverlayClick === "function") {
      onOverlayClick();
    }
  });

  // Find the #app element in the front document
  const appElement = frontDocument.querySelector("#app");

  if (appElement) {
    // Append the overlay to the #app element
    appElement.appendChild(overlay);
  } else {
    console.warn(
      "No #app element found in the front document. Appending overlay to body instead."
    );
    frontDocument.body.appendChild(overlay);
  }

  // Store original body style and prevent scrolling
  const frontBody = frontDocument.body;
  originalBodyStyle = frontBody.style.cssText;
  frontBody.style.overflow = "hidden";
  frontBody.style.position = "fixed";
  frontBody.style.width = "100%";
  frontBody.style.height = "100%";
  frontBody.style.marginRight = "15px !important";

  activeModal = true;
}

function unblockInteractions() {
  if (!activeModal) {
    console.warn("No active modal to close.");
    return;
  }

  // Restore original body style
  const frontBody = wwLib.getFrontDocument().body;
  frontBody.style.cssText = originalBodyStyle;
  originalBodyStyle = null;

  // Remove the overlay
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
  }
  overlay = null;
  activeModal = false;
}

export { blockInteractions, unblockInteractions };

// Add this new function for Vue components to use
export function useModalBlocking(
  isBlockingRef,
  excludeElement,
  onOverlayClick
) {
  watch(
    isBlockingRef,
    (newValue) => {
      if (newValue) {
        blockInteractions(excludeElement, onOverlayClick);
      } else {
        unblockInteractions();
      }
    },
    { immediate: true }
  );
}
