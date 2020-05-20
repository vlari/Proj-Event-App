
export const recoverPasswordTemplate = options => {
    `<div style="font-family:-apple-system,BlinkMacSystemFont,Roboto,'Helvetica neue',Helvetica,Tahoma,Arial,sans-serif;">
    <h1>Hi Obed,</h1>
    <p>
    We received a request to reset your password for your Eventbrite account: ${options.email}. We're here to help!  
    </p>
    <p>
    Simply click on the button to set a new password:  
    </p>
    <a href="${options.url}">Set a New Password</a>
    <p>
    If you didn't ask to change your password, don't worry! Your password is still safe and you can delete this email.   
    </p>
    </div>`
};
