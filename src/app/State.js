import { observable } from "@legendapp/state";
import { persistObservable } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";

export const State = observable({
  settings: {
    showSidebar: false,
  },
  user: {
    profile: {
      name: "LAMPEL",
    },
  },
});

persistObservable(State, {
  local: "example",
  persistLocal: ObservablePersistLocalStorage,
});