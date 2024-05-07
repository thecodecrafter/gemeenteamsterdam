import Home from "@/app/page";
import { mockFetchSuccess } from "../../__mocks__/mock-fetch";
import { render, screen, waitFor } from "@testing-library/react";

describe("Page", () => {
  it("renders a heading", async () => {
    global.fetch = mockFetchSuccess(true, {});
    render(<Home />);

    await waitFor(() => {});

    const heading = screen.getByRole("heading", { level: 4 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Kies een stadsdeel");
  });
});
