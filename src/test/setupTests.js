// Mock ResizeObserver which doesn't exist in the Jest DOM environment
class ResizeObserverMock {
  constructor(callback) {
    this.callback = callback;
    this.observations = [];
  }

  observe(target) {
    // Store the target being observed
    this.observations.push(target);
    // Call the callback with empty entries
    this.callback([{ target, contentRect: new DOMRectReadOnly(0, 0, 0, 0) }]);
  }

  unobserve(target) {
    // Remove target from observations
    this.observations = this.observations.filter(obs => obs !== target);
  }

  disconnect() {
    // Clear all observations
    this.observations = [];
  }
}

// Mock DOMRectReadOnly if not available
class DOMRectReadOnly {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.top = y;
    this.right = x + width;
    this.bottom = y + height;
    this.left = x;
  }
}

// Add the mocks to the global object
global.ResizeObserver = ResizeObserverMock;
global.DOMRectReadOnly = DOMRectReadOnly;