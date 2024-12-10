import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Booking from "../src/views/Booking";
import { BrowserRouter } from "react-router-dom";

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: "12345", price: "600", when: "2023-12-13T15:30", people: 4, lanes: 1 }),
  })
);

describe("Booking Component", () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <Booking />
      </BrowserRouter>
    );
  };

  test("renders the booking form with all fields", () => {
    setup();

    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of awesome bowlers/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of lanes/i)).toBeInTheDocument();
    expect(screen.getByText(/strIIIIIike!/i)).toBeInTheDocument();
  });

  test("displays error when fields are incomplete", () => {
    setup();

    const submitButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(submitButton);

    expect(screen.getByText(/Alla fälten måste vara ifyllda/i)).toBeInTheDocument();
  });

  test("allows adding shoe sizes for players", () => {
    setup();

    const addButton = screen.getByText("+");
    fireEvent.click(addButton);

    const shoeInput = screen.getByLabelText(/Shoe size \/ person 1/i);
    expect(shoeInput).toBeInTheDocument();
  });

  test("removes a shoe size field when clicking the '-' button", () => {
    setup();

    const addButton = screen.getByText("+");
    fireEvent.click(addButton);

    const removeButton = screen.getByText("-");
    fireEvent.click(removeButton);

    expect(screen.queryByLabelText(/Shoe size \/ person 1/i)).not.toBeInTheDocument();
  });

  test("displays error when number of players exceeds max players per lane", () => {
    setup();

    const lanesInput = screen.getByLabelText(/Number of lanes/i);
    fireEvent.change(lanesInput, { target: { value: "1" } });

    const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
    fireEvent.change(playersInput, { target: { value: "5" } });

    const submitButton = screen.getByText(/strIIIIIike!/i);
    fireEvent.click(submitButton);

    expect(screen.getByText(/Det får max vara 4 spelare per bana/i)).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    setup();

    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: "2023-12-13" } });
    fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: "15:30" } });
    fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), { target: { value: "4" } });
    fireEvent.change(screen.getByLabelText(/Number of lanes/i), { target: { value: "1" } });

    fireEvent.click(screen.getByText(/strIIIIIike!/i));

    expect(await screen.findByText(/Sweet, let's go!/i)).toBeInTheDocument();
  });
});
