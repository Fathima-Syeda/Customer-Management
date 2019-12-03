# Contact Management

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8. Make sure you build using the correct CLI version if you were using the global `ng` & reference the right [API version](https://v7.angular.io/api).

## Setup

Clone the repo or fork it into your own account. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Requirements

- Create a login page to authenticate the user for further actions.
  - There should be a simulated authentication service to grant/deny the access. Hardcoded username/password is fine.
  - There's no need to retain the session, e.g. refreshing the page will redirect the user back to the login page.
  - Two roles should be defined, one as `admin`, another `user`.
- Once the users log in, they should be able to see the list of users, which could be either presented as a grid or a list. Users can also sort/filter/search in order to locate a contact easily.
  - Simulation data has been provided, `CmContactService` will provide it.
  - Add more endpoint to `CmContactService` as needed, see the `search` method as an example.
- Depending on the role of the current logged in user, as `user`, they can only see the list; as `admin`, upon clicking of the row/card of the contact, users should be able to see the details of the contact on the right-hand-side, so they can edit, revert & save an existing contact. They can also add a new contact.
  - Persistence is not required, the simulation data will not be written, any changes will be reverted on page refresh.
  - Form fields could simply use `<input>`, `<select>` etc. from standard HTML5 tags.
- Users should be able to logout & be redirected to login.

### User Experience

- Apply some simple styles to the application, could consider using [bootstrap](https://www.npmjs.com/
package/bootstrap).
- Given the number of users is fairly large, the grid/list should be either paged or virtually scrolled.
- Pay attention to the user experience when using the application, e.g the way how user navigates between screens should be convenient & straightforward.

## Bonus

- Create valid test cases on the created components. Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- Add session management to allow the authenticated user to stay even on page refresh.
- Add different form components for different types of data, e.g date picker for birthday, dropdown with typeahead support for friends etc. when adding/editing a contact.
- Persist data on save.

### User Experience
- Consider responsiveness how the UX of the application on smaller mobile devices.

## Completion

Once completed, you can either send the link of the git repo or simply zip the project & send via email. A fully functioning app is ideal and a review session will be held to review the code.

A maximum of 3 days is allowed to finish the project upon receiving the initial code.
