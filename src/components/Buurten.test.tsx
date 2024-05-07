import { screen, render, waitFor } from "@testing-library/react";
import { mockFetchSuccess } from "../../__mocks__/mock-fetch";
import { Buurten } from "./Buurten";

describe("Buurten", () => {
  it("renders page with the title 'Buurten in de wijk Naam Wijk'", async () => {
    global.fetch = mockFetchSuccess(
      true,
      Promise.resolve({
        _embedded: {
          buurten: [
            {
              identificatie: 1,
              naam: "Buurtnaam",
              _links: {
                ligtInWijk: {
                  href: "",
                  title: "Naam Wijk",
                },
              },
            },
          ],
        },
      })
    );

    render(<Buurten wijkId="" />);

    await waitFor(() => screen.getByText("Buurten in de wijk Naam Wijk"));
  });

  it("renders page with error message 'Failed to fetch buurten'", async () => {
    global.fetch = mockFetchSuccess(false, Promise.resolve({}));

    render(<Buurten wijkId="" />);

    await waitFor(() => screen.getByText("Failed to fetch buurten"));
  });
});
