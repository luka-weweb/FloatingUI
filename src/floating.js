import { ref, onMounted, onUnmounted, computed } from "vue";

// Add this utility function at the top of your file
function unwrapElement(element) {
  if (element && typeof element === "object" && "$el" in element) {
    const unwrappedEl = element.$el;
    return unwrappedEl instanceof HTMLElement ? unwrappedEl : null;
  }
  return element;
}

export function useFloating(referenceElement, floatingElement, options = {}) {
  const position = ref({ x: 0, y: 0 });
  const floatingStyles = computed(() => ({
    position: "absolute",
    transform: `translate(${position.value.x}px, ${position.value.y}px)`,
    top: 0,
    left: 0,
  }));

  const updatePosition = () => {
    // Unwrap elements here
    const unwrappedReference = unwrapElement(referenceElement.value);
    const unwrappedFloating = unwrapElement(floatingElement.value);

    if (!unwrappedReference || !unwrappedFloating) return;

    const referenceRect = unwrappedReference.getBoundingClientRect();
    const floatingRect = unwrappedFloating.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let placement = options.placement || "bottom";
    let x = 0;
    let y = 0;

    const calculatePosition = (placement) => {
      switch (placement) {
        case "top":
          x =
            referenceRect.left + (referenceRect.width - floatingRect.width) / 2;
          y = referenceRect.top - floatingRect.height;
          break;
        case "bottom":
          x =
            referenceRect.left + (referenceRect.width - floatingRect.width) / 2;
          y = referenceRect.bottom;
          break;
        case "left":
          x = referenceRect.left - floatingRect.width;
          y =
            referenceRect.top +
            (referenceRect.height - floatingRect.height) / 2;
          break;
        case "right":
          x = referenceRect.right;
          y =
            referenceRect.top +
            (referenceRect.height - floatingRect.height) / 2;
          break;
      }
    };

    calculatePosition(placement);

    // Check if there's enough space and flip if necessary
    if (options.flip) {
      if (placement === "top" && y < 0) {
        placement = "bottom";
        calculatePosition(placement);
      } else if (
        placement === "bottom" &&
        y + floatingRect.height > viewportHeight
      ) {
        placement = "top";
        calculatePosition(placement);
      } else if (placement === "left" && x < 0) {
        placement = "right";
        calculatePosition(placement);
      } else if (
        placement === "right" &&
        x + floatingRect.width > viewportWidth
      ) {
        placement = "left";
        calculatePosition(placement);
      }
    }

    // Apply offset if provided
    if (options.offset) {
      x += options.offset.x || 0;
      y += options.offset.y || 0;
    }

    position.value = { x, y };
  };

  let referenceResizeObserver, floatingResizeObserver;
  let animationFrameId;

  const checkPositionChange = () => {
    if (referenceElement.value) {
      const newRect = referenceElement.value.getBoundingClientRect();
      if (
        newRect.top !== lastKnownRect.top ||
        newRect.left !== lastKnownRect.left
      ) {
        lastKnownRect = newRect;
        updatePosition();
      }
    }
    if (options.autoUpdate) {
      animationFrameId = requestAnimationFrame(checkPositionChange);
    }
  };

  let lastKnownRect = { top: 0, left: 0 };

  onMounted(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    // Create and use ResizeObserver
    referenceResizeObserver = new ResizeObserver(updatePosition);
    floatingResizeObserver = new ResizeObserver(updatePosition);

    // Unwrap elements before observing
    const unwrappedReference = unwrapElement(referenceElement.value);
    const unwrappedFloating = unwrapElement(floatingElement.value);

    if (unwrappedReference) {
      referenceResizeObserver.observe(unwrappedReference);
      lastKnownRect = unwrappedReference.getBoundingClientRect();
    }
    if (unwrappedFloating) {
      floatingResizeObserver.observe(unwrappedFloating);
    }

    // Start position checking only if autoUpdate is true
    if (options.autoUpdate) {
      animationFrameId = requestAnimationFrame(checkPositionChange);
    }
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updatePosition);
    window.removeEventListener("scroll", updatePosition);

    // Disconnect ResizeObserver
    if (referenceResizeObserver) {
      referenceResizeObserver.disconnect();
    }
    if (floatingResizeObserver) {
      floatingResizeObserver.disconnect();
    }

    // Stop position checking if it was started
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });

  return {
    floatingStyles,
    updatePosition,
  };
}
