async function startVoice() {
    const response = await fetch('/voice-input');
    const data = await response.json();

    document.getElementById('message').value = data.text;
}

async function sendEmail() {
    const sender = document.getElementById('sender').value;
    const password = document.getElementById('password').value;

    const recipients = document
        .getElementById('recipients')
        .value
        .split(',')
        .map(email => email.trim());

    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sender_email: sender,
            app_password: password,
            recipients,
            subject,
            message
        })
    });

    const data = await response.json();

    const status = document.getElementById('status');

    if (data.status === 'success') {
        status.innerHTML = '✅ Email Sent Successfully';
    } else {
        status.innerHTML = '❌ Error: ' + data.message;
    }
}