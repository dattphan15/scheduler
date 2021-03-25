describe("Appointments", () => {

  beforeEach(() => {
    // 1. Resets database (method, url)
    cy.request("GET", "/api/debug/reset");
  
    // 2. Visits root
    cy.visit("/");
  
    // 3. Finds Monday
    cy.contains("Monday");
   });


// BOOK AN INTERVIEW
  it("should book an interview", () => {
    // 4. Clicks on the first "Add" button
    cy.get("[alt=Add]")
      .first()
      .click();
      
    // 5. Enters their name
    cy.get("[data-testid=student-name-input]")
      .click()
      .type("Lydia Miller-Jones")

    // 6. Clicks Sylvia Palmer from interviewers list
    cy.get("[alt='Sylvia Palmer']")
      .click();

    // 7. Clicks the save button
    cy.contains("Save")
      .click();

    // 8. Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
      .contains(".appointment__card--show", "Sylvia Palmer");
  });


// EDIT AN INTERVIEW
  it("should edit an interview", () => {
    // 4. Force click on the "Edit" button (instead of hovering, then clicking)
    cy.get("[alt=Edit]")
      .click({ force: true});

    // 5. Clicks Tori Malcolm from interviewers list
    cy.get("[alt='Tori Malcolm']")
    .click();

    // 6. Clear text input, then change name to Rick James
    cy.get('[type="text"]').clear()
      .click()
      .type("Rick James")

    // 7. Clicks the save button
    cy.contains("Save")
      .click();

    // 8. Sees the edited appointment with the new names
    cy.contains(".appointment__card--show", "Rick James")
      .contains(".appointment__card--show", "Tori Malcolm");
  });


// DELETE AN INTERVIEW
  it("should cancel an interview", () => {

    // 4. Force click on the "Delete" button (instead of hovering, then clicking)
    cy.get("[alt=Delete]")
      .click({ force: true});

    // 5. Clicks the confirm delete button
    cy.contains("Confirm")
      .click()
    
    // 6. Checks that the loading indicator Deleting exists
    cy.contains("Deleting")
      .should("exist");

    // 7. Confirms that the Deleting indicator is gone
    cy.contains("Deleting")
      .should("not.exist");

    // 8. Confirms the previously booked appointment is deleted
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  })


});