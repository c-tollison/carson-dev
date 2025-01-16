// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handler(event) {
    var request = event.request;
    var headers = request.headers;

    if (headers.host.value === 'www.carson-dev.com') {
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                location: { value: 'https://carson-dev.com' + request.uri },
            },
        };
    }

    return request;
}
