const unsavedTicket = {
    summary: "summary1",
    description: "description1",
    email: "email@example.com",
    status: 1,
    priority: 1
};

const savedTicket = {
    ...unsavedTicket,
    id: 1,
    created: '2019-07-20T16:37:14.861+0000'
};

const emptyTicketsResponse = {
    _embedded:{
       tickets: []
    },
    page: {
       totalElements: 0,
       number: 0
    }
};

const threeTicketsResponse = {
    _embedded:{
       tickets: [
           { ...savedTicket },
           { ...savedTicket, id: 2, summary: "summary2" },
           { ...savedTicket, id: 3, summary: "summary3" }
       ]
    },
    page: {
       totalElements: 3,
       number: 0
    }
};

export {
    unsavedTicket,
    savedTicket,
    emptyTicketsResponse,
    threeTicketsResponse
};
