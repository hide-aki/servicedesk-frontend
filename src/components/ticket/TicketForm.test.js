import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import TicketForm from './TicketForm';
import { savedTicket, unsavedTicket } from './../../__fixtures__/TicketsFixture'

afterEach(cleanup);

describe('TicketForm', () => {
    it('is edit form if ticket id set', () => {
        // given
        const ticket = { ...savedTicket };

        // when
        const {queryByText, findByText} = render(
            <TicketForm open={ true } ticket={ ticket } />,
        );

        // then
        expect(findByText("Edit Ticket")).toBeDefined();
        expect(queryByText("New Ticket")).toBeNull();
    });

    it('is create form if ticket id not set', () => {
        // given
        const ticket = { ...unsavedTicket };

        // when
        const { queryByText, findByText } = render(
            <TicketForm open={ true } ticket={ ticket } />,
        );

        // then
        expect(findByText("New Ticket")).toBeDefined();
        expect(queryByText("Edit Ticket")).toBeNull();
    });

    it('delegates actions to handlers provided via props', () => {
        // given
        const ticket = { ...unsavedTicket };
        let isOpen = true;

        const saveHandler = jest.fn();
        const closeHandler = jest.fn();
        const changeHandler = jest.fn();

        // when
        const { queryByText, getByText, getByLabelText } = render(
            <TicketForm onTicketFormSave={ saveHandler }
                onTicketFormClose={ closeHandler }
                onTicketFormChange={ changeHandler }
                open={ isOpen } ticket={ ticket } />,
        );

        fireEvent.change(getByLabelText("Summary"), {target: {value: 'new summary'}});
        fireEvent.click(getByText("Save"));
        fireEvent.click(getByText("Close"));

        // then
        expect(saveHandler.mock.calls.length).toBe(1);
        expect(closeHandler.mock.calls.length).toBe(1);
        expect(changeHandler.mock.calls.length).toBe(1);
    });

});
