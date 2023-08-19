import React from "react";
import { customRender } from "../../../utils/test-utils";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignIn from "./SignIn";
import userEvent from "@testing-library/user-event";
import { State } from "@/app/State";

// Create a mock router object
const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
};

// Mock the Next.js useRouter hook
jest.mock("next/router", () => ({
  useRouter: () => mockRouter,
}));

describe("SignIn", () => {
  it("should login the user successfully", async () => {
    // If you're mocking a global fetch, you can do this:
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ token: "fake-token" }),
      }),
    );

    const { debug } = customRender(<SignIn />);
    debug();

    // Assuming your form has fields with labels "Username" and "Password"
    const usernameInput = screen.getByPlaceholderText("UserName");

    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /Sign In/i });

    // Simulate the user filling out the form
    userEvent.type(usernameInput, "username");
    userEvent.type(passwordInput, "password");

    // Simulate the user submitting the form
    userEvent.click(submitButton);

    // Add assertions to check if the fetch was called with the right parameters
    expect(fetch).toBeCalledWith(
      `http://${State.user.profile.ip.get()}:4900/api/auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "username",
          password: "password",
        }),
      },
    );

    // You can add additional assertions to check how your component reacts to a successful login
    // For example, if it should navigate to a new page or show a success message
  });
});