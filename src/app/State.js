import { observable } from "@legendapp/state";

export const State = observable({
  settings: {
    showSidebar: false,
  },
  user: {
    profile: {
      name: "LAMPEL",
      ip: "192.168.1.158",
    },
  },
  noiseData: {
    noiseRules: observable([]),
  },
});