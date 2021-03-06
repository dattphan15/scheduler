import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

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
    /*
    UPDATED AWAIT, ASYNC SYNTAX USED FOR REMAINING TESTS BELOW
    it("changes the schedule when a new day is selected", async () => {
      const { getByText } = render(<Application />);
      await waitForElement(() => getByText("Monday"));
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
    */

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    
    // 1. Render the Application
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 2. Selects the first appointment slot available
    const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment")[0];

    // 3. Clicks on Add Button to create new appointment
    const addButton = getByAltText(appointment, "Add");
    fireEvent.click(addButton);

    // 4. Enters in name
    const formInput = getByPlaceholderText(appointment, /enter student name/i)
    fireEvent.change(formInput, {
      target: { value: "Lydia Miller-Jones" }
    });

    // 5. Selects interviewer, then saves
    const interviewerImg = getByAltText(appointment, "Sylvia Palmer");
    fireEvent.click(interviewerImg);

    const saveButton = getByText(appointment, "Save");
    fireEvent.click(saveButton);

    // 6. Confirms the Saving loader to be present
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
  
    // 8. Finds current day being updated
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    // 9. Confirms no spots remaining after the last spot was booked
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  })


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));
    
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument(); 

    // 5. Click the "Confirm" button for confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Checks if the "Deleting" popout is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument(); 

    // 7. Wait till the element with "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check if the day list item with the text Monday also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
 
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Change the input value to Kevin
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Kevin" }
    });
    
    // 5. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Check that the element with the text "Kevin" is displayed.
    await waitForElement(() => getByAltText(appointment, "Edit"));
    expect(getByText(appointment, "Kevin")).toBeInTheDocument();

    // 8. Check if the day list item with the text Monday also has the text "1 spot remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });


  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Check that the element with the text "Save" is displayed.    
    expect(getByText(appointment, "Save")).toBeInTheDocument();

    // 5. Change the input value to Kevin
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Kevin" }
    });

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. Check that the element with the text "Error" is displayed.
    await waitForElement(() => getByAltText(appointment, "Close"));
    expect(getByText(appointment, "Failed to save")).toBeInTheDocument();

  });


  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);
      
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is displayed
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button 
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the Deleting message is displayed
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Check that the element with the text "Error" is displayed.
    await waitForElement(() => getByAltText(appointment, "Close"));
    expect(getByText(appointment, "Failed to delete")).toBeInTheDocument();
  });


});