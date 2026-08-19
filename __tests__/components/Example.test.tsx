import { render, screen } from "@testing-library/react";

function Example() {
  return <h1>HireScope</h1>;
}

describe("Example component", () => {
  it("renders HireScope", () => {
    render(<Example />);

    expect(
      screen.getByRole("heading", { name: "HireScope" }),
    ).toBeInTheDocument();
  });
});
