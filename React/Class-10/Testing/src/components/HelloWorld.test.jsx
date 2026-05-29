import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import HelloWorld from "./HelloWorld";

test("render hello component", () => {
  // mocking
  render(<HelloWorld />);
  // assertion
  expect(screen.getByText("HelloWorld")).toBeInTheDocument();
});
