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
})



// test('Data grid renders', async () => {
//     render(
//         <MemoryRouter initialEntries={[ '/' ]}>
//         <MyRoutes/>
//       </MemoryRouter>
//       )
//     // render(<App />);
//     const gridElement = screen.getByRole('grid');
//     expect(gridElement).toBeInTheDocument();
// })










describe("Add/Edit Form", () => {
    test("Clicking add navigates to edit page and form is empty", async () => {

    })
})