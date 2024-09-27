import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import CustomerRecords from "./CustomerRecords"
import App from "../App";
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import MyRoutes from "../assets/routes";

describe("Customer Records Page", () => {
    test('CustomerRecords page renders', async () => {
        render(
            <MemoryRouter initialEntries={[ '/' ]}>
            <MyRoutes/>
          </MemoryRouter>
          )
        // render(<App />)
        const headingElement = screen.getByRole('heading', { name: /Customer Records/i });
        expect(headingElement).toBeInTheDocument();
    });

    test('Data grid contains fetched data', async () => {
        render(
            <MemoryRouter initialEntries={[ '/' ]}>
            <MyRoutes/>
          </MemoryRouter>
          )
    
        const gridElement = screen.getByRole('grid');
        expect(gridElement).toBeInTheDocument();
        // render(<App />);
    
        await waitFor(() => {
            expect(screen.getByText("Corene Doby")).toBeInTheDocument();
            expect(screen.getByText("cdoby0@netlog.com")).toBeInTheDocument();
        });
    
    });

    test('Clicking on a cell makes text for that row bold', async () => {
        render(
            <MemoryRouter initialEntries={[ '/' ]}>
            <MyRoutes/>
          </MemoryRouter>
          )
    
        // render(<App />);
    
        // Wait for data to be fetched, and then find a name
        const testCell = await screen.findByText("Corene Doby");
    
        // Get the parent row element for cell
        const testRow = testCell.closest('div[data-rowindex]');
    
        // cell has not been clicked, so check that row does not have class
        expect(testRow).not.toHaveClass('selected-row'); 
    
        // Simulate the click event 
        fireEvent.click(testRow);
    
        // Wait for the class to be applied and check if the row has the expected class
        await waitFor(() => {
          expect(testRow).toHaveClass('selected-row'); // Check for the class
        });
    });

    test('Clicking on Add button navigates to EditPage', async () => {
        render(
            <MemoryRouter initialEntries={[ '/' ]}>
                <MyRoutes/>
            </MemoryRouter>
        );
    
        // render(<App />)
    
        const addButton = await screen.getByTestId("add_button");
    
        expect(addButton).toBeInTheDocument();
    
        fireEvent.click(addButton);
    
        const headingElement = await screen.getByRole('heading', { name: /Add a new record/i });
        expect(headingElement).toBeInTheDocument();
    });

    test('Form is empty when mode is add', async () => {
        render(
            <MemoryRouter initialEntries={[ '/' ]}>
                <MyRoutes/>
            </MemoryRouter>
        );

        const addButton = await screen.getByTestId("add_button");
    
        expect(addButton).toBeInTheDocument();
    
        fireEvent.click(addButton)

        // check that we are on the right page
        const headingElement = await screen.getByRole('heading', { name: /Add a new record/i });
        expect(headingElement).toBeInTheDocument();

        // check that there is a name text field
        const nameInput = await screen.getByTestId('name_field');
        expect(nameInput).toBeInTheDocument();
        
        // check name textfield is empty
        const nameInputElement = nameInput.querySelector('input'); 
        expect(nameInputElement.value).toBe('');

        // repeat for email and password textfields
        const emailInput = await screen.getByTestId('email_field');
        expect(emailInput).toBeInTheDocument();
        
        const emailInputElement = emailInput.querySelector('input'); 
        expect(emailInputElement.value).toBe('');

        const passwordInput = await screen.getByTestId('password_field');
        expect(passwordInput).toBeInTheDocument();
        
        const passwordInputElement = passwordInput.querySelector('input'); 
        expect(passwordInputElement.value).toBe('');

    });
    
    test('Clicking on Save in the add form causes a success snackbar to appear if successful', async () => {
        render(
            <MemoryRouter initialEntries={[ '/' ]}>
                <MyRoutes/>
            </MemoryRouter>
        );
    
        // render(<App />)
    
        const addButton = await screen.getByTestId("add_button");
    
        expect(addButton).toBeInTheDocument();
    
        fireEvent.click(addButton);
    
        const headingElement = await screen.getByRole('heading', { name: /Add a new record/i });
        expect(headingElement).toBeInTheDocument();

        // check name field is there, and then change the value to 'Test User'
        const nameInput = await screen.getByTestId('name_field');
        expect(nameInput).toBeInTheDocument();
        const inputElement = nameInput.querySelector('input'); 
        fireEvent.change(inputElement, { target: { value: 'Test User' } });
        expect(inputElement.value).toBe('Test User');

        // check email field is there and then change the value to 'test@email'
        const emailInput = await screen.getByTestId('email_field');
        expect(emailInput).toBeInTheDocument();
        const emailInputElement = emailInput.querySelector('input'); 
        fireEvent.change(emailInputElement, { target: { value: 'test@email' } });
        expect(emailInputElement.value).toBe('test@email');

        // check password field is there and then change the value to 'goodpassword'
        const passwordInput = await screen.getByTestId('password_field');
        expect(passwordInput).toBeInTheDocument();
        const passwordInputElement = passwordInput.querySelector('input'); 
        fireEvent.change(passwordInputElement, { target: { value: 'goodpassword' } });
        expect(passwordInputElement.value).toBe('goodpassword');

        // check save button is there and click it
        const saveButton = await screen.getByTestId("save_button");
        expect(saveButton).toBeInTheDocument();
        fireEvent.click(saveButton);

        const snackbar = await waitFor(() => screen.getByText(/User created successfully/i));

        // check if the Snackbar is in the document
        expect(snackbar).toBeInTheDocument();

    });

    test('Clicking on Cancel button navigates back to CustomerRecords page', async () => {
        render(
            <MemoryRouter initialEntries={[ '/' ]}>
                <MyRoutes/>
            </MemoryRouter>
        );
    
        // render(<App />)
    
        const addButton = await screen.getByTestId("add_button");
    
        expect(addButton).toBeInTheDocument();
    
        fireEvent.click(addButton);
    
        const headingElement = await screen.getByRole('heading', { name: /Add a new record/i });
        expect(headingElement).toBeInTheDocument();

        const cancelButton = await screen.getByTestId("cancel_button");
        expect(cancelButton).toBeInTheDocument();
        fireEvent.click(cancelButton);
    
        const newHeadingElement = await screen.getByRole('heading', { name: /Customer Records/i });
        expect(newHeadingElement).toBeInTheDocument();
    });

    test('Clicking on Update button navigates to EditPage', async () => {
        render(
            <MemoryRouter initialEntries={[ '/' ]}>
                <MyRoutes/>
            </MemoryRouter>
        );
        
        // click on cell (with fetched data)
        const testCell = await screen.findByText("Corene Doby"); 
        fireEvent.click(testCell); 
    
        // click update button once cell has been clicked
        const updateButton =  await screen.getByTestId("update_button");
        expect(updateButton).toBeInTheDocument(); 
        fireEvent.click(updateButton); 
    
        // check that new page has been loaded
        await waitFor(() => {
            // expect(window.location.pathname).toBe('/edit'); 
            const headingElement = screen.getByRole('heading', { name: /Update an existing record/i });
            expect(headingElement).toBeInTheDocument();
        })
    })

    test('If editing a customer, the form should be prefilled with the correct information', async () => {
        render(
            <MemoryRouter initialEntries={[ '/' ]}>
                <MyRoutes/>
            </MemoryRouter>
        );
        
        // click on cell (with fetched data)
        const testCell = await screen.findByText("Corene Doby"); 
        fireEvent.click(testCell); 
    
        // click update button once cell has been clicked
        const updateButton =  await screen.getByTestId("update_button");
        expect(updateButton).toBeInTheDocument(); 
        fireEvent.click(updateButton); 
    
        // check that new page has been loaded
        await waitFor(() => {
            // expect(window.location.pathname).toBe('/edit'); 
            const headingElement = screen.getByRole('heading', { name: /Update an existing record/i });
            expect(headingElement).toBeInTheDocument();

            // check that there is a name text field
            const nameInput = screen.getByTestId('name_field');
            expect(nameInput).toBeInTheDocument();
            
            // check name textfield is Corene Doby
            const nameInputElement = nameInput.querySelector('input'); 
            expect(nameInputElement.value).toBe('Corene Doby');
        })
    });

    test("Clicking on delete in the update form causes a success snackbar to appear if successful", async () => {
        render(
            <MemoryRouter initialEntries={[ '/' ]}>
                <MyRoutes/>
            </MemoryRouter>
        );
        
        // click on cell (with fetched data)
        const testCell = await screen.findByText("Harri Borborough"); 
        fireEvent.click(testCell); 
    
        // click update button once cell has been clicked
        const updateButton =  await screen.getByTestId("update_button");
        expect(updateButton).toBeInTheDocument(); 
        fireEvent.click(updateButton); 
    
        // Wait to check if we're on the right page
        const headingElement = await waitFor(() => 
            screen.getByRole('heading', { name: /Update an existing record/i })
        );

        expect(headingElement).toBeInTheDocument();

        // Check that there is a name text field
        const nameInput = screen.getByTestId('name_field');
        expect(nameInput).toBeInTheDocument();

        // Check the name text field has the correct value
        const nameInputElement = nameInput.querySelector('input'); 
        expect(nameInputElement.value).toBe('Harri Borborough');

        // Check delete button is there and click it
        const deleteButton = screen.getByTestId("delete_button");
        expect(deleteButton).toBeInTheDocument();

        // Simulate clicking the delete button
        fireEvent.click(deleteButton);

        // Wait for the Snackbar to appear after the delete action
        const snackbar = await waitFor(() => 
            screen.getByText(/User deleted successfully/i)
        );

        // Check if the Snackbar is in the document
        expect(snackbar).toBeInTheDocument();
    });
})