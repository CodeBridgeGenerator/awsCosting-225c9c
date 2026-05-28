import React from "react";
import { render, screen } from "@testing-library/react";

import CostsPage from "../CostsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders costs page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CostsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("costs-datatable")).toBeInTheDocument();
    expect(screen.getByRole("costs-add-button")).toBeInTheDocument();
});
