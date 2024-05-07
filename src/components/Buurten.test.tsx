import { screen, render, waitFor } from "@testing-library/react";
import { Buurten } from "./Buurten";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Buurten", () => {
  it("renders page with the title 'Buurten in de wijk Naam Wijk'", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
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
      },
    });

    render(<Buurten wijkId="" />);

    await waitFor(() => screen.getByText("Buurten in de wijk Naam Wijk"));
  });

  it("renders page with error message", async () => {
    mockedAxios.get.mockRejectedValue({});

    render(<Buurten wijkId="" />);

    await waitFor(() => screen.getByText("Something went wrong."));
  });
});
