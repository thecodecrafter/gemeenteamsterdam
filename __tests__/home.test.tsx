import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("Page", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 4 });

    expect(heading).toBeInTheDocument();
  });
});
