import { observable } from "@legendapp/state";

export const State = observable({
  settings: {
    showSidebar: false,
  },
  user: {
    profile: {
      name: "LAMPEL",
      ip: "localhost",
    },
  },
  noiseData: {
    noiseRules: observable([]),
  },
});