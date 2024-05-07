import { screen, render, waitFor } from "@testing-library/react";
import { Wijken } from "./Wijken";
import { mockFetchSuccess } from "../../__mocks__/mock-fetch";

describe("Wijken", () => {
  it("renders page with the title 'Wijken in stadsdeel Naam Stadsdeel'", async () => {
    global.fetch = mockFetchSuccess(
      true,
      Promise.resolve({
        _embedded: {
          wijken: [
            {
              identificatie: 1,
              naam: "Wijknaam",
              _links: {
                ligtInStadsdeel: {
                  href: "",
                  title: "Naam Stadsdeel",
                },
              },
            },
          ],
        },
      })
    );

    render(<Wijken stadsdeelId="" />);

    await waitFor(() => screen.getByText("Wijken in stadsdeel Naam Stadsdeel"));
  });

  it("renders page with error message 'Failed to fetch wijken'", async () => {
    global.fetch = mockFetchSuccess(false, Promise.resolve({}));

    render(<Wijken stadsdeelId="" />);

    await waitFor(() => screen.getByText("Failed to fetch wijken"));
  });
});
