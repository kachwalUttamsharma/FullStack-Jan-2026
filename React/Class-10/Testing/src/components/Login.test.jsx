import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
} from "vitest";
import Login from "./Login";

describe("Login Component Testing", () => {
  // it execute before each test is executed
  let userNameInput;
  let passwordInput;
  let submitButton;
  beforeEach(() => {
    render(<Login />);
    userNameInput = screen.getByPlaceholderText("enter username");
    passwordInput = screen.getByPlaceholderText("enter password");
    submitButton = screen.getByRole("button");
  });

  beforeAll(() => {
    cleanup();
  });

  afterEach(() => {});

  afterAll(() => {});

  test("is form rendered", () => {
    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(userNameInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(submitButton).toBeDisabled();
  });

  test("check for username change event", () => {
    expect(userNameInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(submitButton).toBeDisabled();
    fireEvent.change(userNameInput, { target: { value: "Amrendra" } });
    expect(userNameInput.value).toBe("Amrendra");
    expect(passwordInput.value).toBe("");
    expect(submitButton).toBeDisabled();
  });

  test("check for password change event", () => {
    expect(userNameInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(submitButton).toBeDisabled();
    fireEvent.change(passwordInput, { target: { value: "test1234" } });
    expect(userNameInput.value).toBe("");
    expect(passwordInput.value).toBe("test1234");
    expect(submitButton).toBeDisabled();
  });

  test("check for submit change event", () => {
    expect(userNameInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(submitButton).toBeDisabled();
    fireEvent.change(passwordInput, { target: { value: "test1234" } });
    fireEvent.change(userNameInput, { target: { value: "Amrendra" } });
    expect(userNameInput.value).toBe("Amrendra");
    expect(passwordInput.value).toBe("test1234");
    expect(submitButton).toBeEnabled();
  });
});
