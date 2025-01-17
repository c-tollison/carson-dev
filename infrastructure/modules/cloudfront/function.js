function handler(event) {
    var request = event.request;
    if (request.headers['host'] && request.headers['host'].value.startsWith('www')) {
        var response = {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                location: { value: 'https://carson-dev.com' + event.request.uri },
            },
        };
        return response;
    }
    return request;
}
