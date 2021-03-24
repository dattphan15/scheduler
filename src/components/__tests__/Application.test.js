import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);


describe("Appointment", () => {
// RAW PROMISE SYNTAX
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />); 
    return waitForElement(() => getByText("Monday"))
    .then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

    // UPDATED AWAIT, ASYNC SYNTAX
    // it("changes the schedule when a new day is selected", async () => {
    //   const { getByText } = render(<Application />);
    //   await waitForElement(() => getByText("Monday"));
    //   fireEvent.click(getByText("Tuesday"));
    //   expect(getByText("Leopold Silvers")).toBeInTheDocument();
    // });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    // console.log(prettyDOM(appointments));
    
    const appointment = getAllByTestId(container, "appointment")[0];
    // console.log(prettyDOM(appointment));

    const addButton = getByAltText(appointment, "Add");
    // console.log(prettyDOM(addButton));
    fireEvent.click(addButton);

    const formInput = getByPlaceholderText(appointment, /enter student name/i)
    // console.log(prettyDOM(formInput));
    fireEvent.change(formInput, {
      target: { value: "Lydia Miller-Jones" }
    });

    const interviewerImg = getByAltText(appointment, "Sylvia Palmer");
    // console.log(prettyDOM(interviewerImg));
    fireEvent.click(interviewerImg);

    const saveButton = getByText(appointment, "Save");
    // console.log(prettyDOM(saveButton));
    fireEvent.click(saveButton);

    console.log(prettyDOM(appointment));

    debug();

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
  })

});