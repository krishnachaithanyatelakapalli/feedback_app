const REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (recipients) => {
    if (recipients === undefined) {
        return;
    }
    const invalidEmails = recipients.split(',').map(email => email.trim())
        .filter(email => !REGEX.test(email));

    if (invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }
    return;
}