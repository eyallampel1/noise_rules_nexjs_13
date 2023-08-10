import { render } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createRouter } from "next-router-mock";

const customRender = (ui, { route = "/", ...options } = {}) => {
  const mockedRouter = createRouter(route);
  return render(ui, {
    wrapper: ({ children }) => (
      <RouterContext.Provider value={mockedRouter}>
        {children}
      </RouterContext.Provider>
    ),
    ...options,
  });
};

export { customRender };