import React from 'react';
import MaterialTable from 'material-table';

import TicketForm from './TicketForm'
import * as Helper from './Helper';

class TicketDashboard extends React.Component {

    constructor(props) {
        super(props);
        // Using tableRef to force reload after modifying a ticket
        this.tableRef = React.createRef();
        this.state = { ticketFormOpen: false, isEdit: false, ticket: {} };

        this.loadTickets = this.loadTickets.bind(this);
        this.saveTicket = this.saveTicket.bind(this);
        this.openTicketForm = this.openTicketForm.bind(this);
        this.closeTicketForm = this.closeTicketForm.bind(this);
        this.onTicketFormChange = this.onTicketFormChange.bind(this);
    }

	render() {
		return (
		    <div>
                <MaterialTable title="Service Desk Dashboard"
                    tableRef={ this.tableRef }
                    columns = {[
                        { title: "ID", field: "id", render: rowData => "#" + rowData.id },
                        { title: "Summary", field: "summary" },
                        { title: "Priority", field: "priority", lookup: Helper.priorities,
                            customSort: (a, b) => a.priority - b.priority },
                        { title: "Status", field: "status", lookup: Helper.statuses,
                            customSort: (a, b) => a.status - b.status },
                        { title: "Email", field: "email" },
                        { title: "Created", field: "created",
                            render: rowData => new Date(rowData.created).toLocaleDateString() },
                    ]}
                    actions = {[{
                        icon: 'add_box',
                        tooltip: 'Add Ticket',
                        isFreeAction: true,
                        onClick: this.openTicketForm
                    }]}
                    onRowClick={ this.openTicketForm }
                    data={ this.loadTickets } />
                <TicketForm open={ this.state.ticketFormOpen } onTicketFormSave={ this.saveTicket }
                    onTicketFormClose={ this.closeTicketForm } onTicketFormChange={ this.onTicketFormChange }
                    ticket={ this.state.ticket } />
            </div>
		);
	}

	loadTickets(query) {
        return new Promise((resolve, reject) => {
            fetch(Helper.buildQueryUrl(query))
                .then(response => response.json())
                .then(result => {
                    resolve({
                        data: result._embedded.tickets,
                        totalCount: result.page.totalElements,
                        page: result.page.number
                    });
                }).catch(error => console.log('Fetch tickets failed ', error));
        });
    }

    openTicketForm(event, rowData) {
        let isEdit = rowData.id !== undefined;
        let ticket = isEdit
            ? rowData
            : Helper.initTicket();
        this.setState({
            ticketFormOpen: true, ticket: ticket, isEdit: isEdit
        });
    }

    onTicketFormChange(event) {
        let value = event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value;
        this.setState({
            ticket: {...this.state.ticket, [event.target.name]: value}
        });
    }

	closeTicketForm() {
        this.setState({ ticketFormOpen: false });
    }

    saveTicket() {
        fetch(Helper.buildSaveUrl(this.state.isEdit, this.state.ticket.id), {
            method: this.state.isEdit ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.ticket),
        }).then(() => {
            this.closeTicketForm();
            this.tableRef.current && this.tableRef.current.onQueryChange();
        }).catch(error => console.log('Save ticket failed ', error));;
    }
}

export default TicketDashboard;
