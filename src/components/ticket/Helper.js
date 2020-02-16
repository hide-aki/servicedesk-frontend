module.exports = {

    priorities: { 1: 'Lowest', 2: 'Low', 3: 'Medium', 4: 'High', 5: 'Not Great, Not Terrible' },
    statuses: { 1: 'Open', 2: 'In Progress', 3: 'Closed' },

    initTicket: function() {
        return {
            summary: '',
            description: '',
            email: '',
            priority: 1,
            status: 1
        };
    },

    buildQueryUrl: function(query) {
        return '/api/tickets/search/findActive?'
            + 'size=' + query.pageSize
            + '&page=' + query.page
            + (query.orderBy !== undefined
                ? '&sort=' + query.orderBy.field + ',' + query.orderDirection
                : '');
    },

    buildSaveUrl: function(isEdit, ticketId) {
        return '/api/tickets' + (isEdit
            ? '/' + ticketId
            : '');
    }

}
