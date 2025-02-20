export function convertToMySqlDate() {
    const localDate = new Date();

    const localDateString = localDate.toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day:'2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second:'2-digit',
            hour12:false
         }
    )

    const [datePart, timePart] = localDateString.split(', ');

    const [day, month, year] = datePart.split('/');
    const [hour, minute, second] = timePart.split(':');

    const formattedMySQLFormat = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    return formattedMySQLFormat
}

