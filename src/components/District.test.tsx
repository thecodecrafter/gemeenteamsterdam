import { render, screen, waitFor } from "@testing-library/react";
import { District } from "./District";
import { mockFetchFail, mockFetchSuccess } from "../../__mocks__/mock-fetch";

describe("District", () => {
  it("renders error message 'Failed to fetch districts'", async () => {
    global.fetch = mockFetchSuccess(false, Promise.resolve([]));

    render(<District />);

    await waitFor(() => screen.getByText("Failed to fetch districts"));
  });

  it("renders error message 'Invalid data structure'", async () => {
    global.fetch = mockFetchSuccess(true, Promise.resolve([]));

    render(<District />);

    await waitFor(() => screen.getByText("Invalid data structure"));
  });

  it("Renders successfully'", async () => {
    global.fetch = mockFetchSuccess(
      true,
      Promise.resolve({
        _embedded: {
          stadsdelen: [
            {
              identificatie: 1,
              naam: "Centrum",
            },
          ],
        },
      })
    );

    render(<District />);

    await waitFor(() => screen.getByText("Centrum"));
  });
});
