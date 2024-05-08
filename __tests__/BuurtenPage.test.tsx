import BuurtPage from "@/app/buurten/[wijkId]/page";
import { render, screen, waitFor } from "@testing-library/react";

import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("BuurtenPage", () => {
  it("should render the page correctly", async () => {
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

    render(<BuurtPage params={{ wijkId: "" }} />);

    await waitFor(() => {
      screen.getByText("Buurten in de wijk Naam Wijk");
    });
  });
});
