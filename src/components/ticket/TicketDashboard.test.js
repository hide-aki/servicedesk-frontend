import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';

import TicketDashboard from './TicketDashboard';
import { emptyTicketsResponse, threeTicketsResponse }
    from './../../__fixtures__/TicketsFixture';

afterEach(cleanup);

describe('TicketDashboard', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('renders empty dashboard', async () => {
        fetch.mockResponse(JSON.stringify(emptyTicketsResponse));

        const { queryByText } = render(
            <TicketDashboard />,
        );

        expect(fetch.mock.calls.length).toEqual(1);

        expect(queryByText("Service Desk Dashboard")).not.toBeNull();
        expect(queryByText("No records to display")).not.toBeNull();
    });

    it('renders dashboard with three tickets', async () => {
        fetch.mockResponse(JSON.stringify(threeTicketsResponse));

        const { queryByText, queryAllByText } = render(
            <TicketDashboard />,
        );

        expect(fetch.mock.calls.length).toEqual(1);

        expect(queryByText("Service Desk Dashboard")).not.toBeNull();

        // Await first element and assume the rest have been loaded afterwards.
        expect(await waitForElement(() => queryByText("summary1"))).not.toBeNull();
        expect(queryByText("summary2")).not.toBeNull();
        expect(queryByText("summary3")).not.toBeNull();

        expect(queryByText("#1")).not.toBeNull();
        expect(queryByText("#2")).not.toBeNull();
        expect(queryByText("#3")).not.toBeNull();

        expect(queryAllByText("Lowest").length).toBe(3); // priority
        expect(queryAllByText("Open").length).toBe(3); // status
        expect(queryAllByText("7/20/2019").length).toBe(3); // created
        expect(queryAllByText("email@example.com").length).toBe(3); //email
    });
});
