import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { priorities, statuses } from './Helper';

class TicketForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClose() {
        this.props.onTicketFormClose();
    }

    handleSave() {
        this.props.onTicketFormSave();
    }

    handleChange(event) {
        this.props.onTicketFormChange(event);
    }

    render() {
        return (
            <div>
                <Dialog onClose={ this.handleClose } open={ this.props.open } aria-labelledby="ticket-form-title">
                    <DialogTitle id="ticket-form-title">{ this.props.ticket.id ? 'Edit' : 'New' } Ticket</DialogTitle>
                    <DialogContent>
                        <Box p={2}>
                            <TextField onChange={ this.handleChange } value={ this.props.ticket.summary }
                                id="summary" name="summary" label="Summary" type="text" fullWidth autoFocus />
                            <TextField onChange={ this.handleChange } value={ this.props.ticket.description }
                                id="description" name="description" label="Description" type="text"
                                multiline={ true } fullWidth />
                            <TextField onChange={ this.handleChange } value={ this.props.ticket.email }
                                id="email" name="email" label="Email" type="email" fullWidth />
                        </Box>
                        <Box p={2}>
                            <InputLabel htmlFor="priority">Priority</InputLabel>
                            <Select onChange={ this.handleChange } value={ this.props.ticket.priority }
                                id="priority" inputProps={{ name: 'priority' }} fullWidth >
                                    {
                                        Object.keys(priorities).map((priorityKey, index) =>
                                            <MenuItem key={ priorityKey } value={ priorityKey }>{ priorities[priorityKey] }</MenuItem >)
                                    }
                            </Select>
                        </Box>
                        <Box p={2}>
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <Select onChange={ this.handleChange } value={ this.props.ticket.status }
                                id="status" inputProps={{ name: 'status' }} fullWidth>
                                    {
                                        Object.keys(statuses).map((statusKey, index) =>
                                            <MenuItem key={ statusKey } value={ statusKey }>{ statuses[statusKey] }</MenuItem >)
                                    }
                            </Select>
                        </Box>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={ this.handleSave } color="primary">Save</Button>
                        <Button onClick={ this.handleClose } color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default TicketForm;
