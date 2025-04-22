// API error messages
export const API_ERRORS = {
  UNAUTHORIZED: "Unauthorized access",
  FETCH_IDEAS: "Failed to fetch ideas",
  CREATE_IDEA: "Failed to create idea",
  UPDATE_IDEA: "Failed to update idea",
  DELETE_IDEA: "Failed to delete idea",
  FETCH_CHANGES: "Failed to fetch changes",
  RECORD_CHANGE: "Failed to record change",
  AUDIO_UPLOAD: "Failed to upload audio",
  AUDIO_DELETE: "Failed to delete audio",
}

// Route paths
export const ROUTES = {
  HOME: "/",
  EDITOR: "/editor",
  NEW_IDEA: "/editor/new",
  COMPARE: "/compare",
  TEMPLATES: "/templates",
  CHANGES: "/changes",
  AUDIO_LOGS: "/audio-logs",
  SCALING: "/scaling",
  SETTINGS: "/settings",
  AUTH: {
    SIGNIN: "/auth/signin",
    SIGNOUT: "/auth/signout",
    ERROR: "/auth/error",
    VERIFY: "/auth/verify-request",
  },
}

// Local storage keys
export const STORAGE_KEYS = {
  THEME: "theme",
  SIDEBAR_STATE: "sidebar-state",
}
