const notifySupplierAccountApproval = function (supplierName: string, url: string) {
  url = process.env.URL || '';
  const html = `
    <!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
        <meta charset="utf-8">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
        <title>Supplier Account Approved</title>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700" rel="stylesheet" media="screen">
        <style>
            .hover-underline:hover {
                text-decoration: underline !important;
            }
        </style>
    </head>

    <body style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; --bg-opacity: 1; background-color: #eceff1;">
        <div role="article" aria-roledescription="email" aria-label="Supplier Account Approved" lang="en">
            <table style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                    <td align="center" style="--bg-opacity: 1; background-color: #eceff1; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                        <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;" width="600" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                                <td class="sm-py-32 sm-px-24" style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; padding: 48px; text-align: center;" align="center">
                                    <a href="">
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">
                                    <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                        <tr>
                                            <td class="sm-px-24" style="--bg-opacity: 1; background-color: #ffffff; border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262;" align="left">
                                                <p style="font-weight: 600; font-size: 18px; margin-bottom: 10px;margin-top: 10px">Hello ${supplierName},</p>
                                                <p style="margin: 0 0 24px;">Your account with [Supplier Name] has been approved by the admin. You can now log in and start using our platform.</p>
                                                <p style="margin: 20px 0 2px;">If you have any questions or need further assistance, please feel free to contact us.</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;" height="20"></td>
                                        </tr>
                                        <tr>
                                            <td style="font-family: 'Montserrat',Arial,sans-serif; height: 16px;" height="16"></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </body>

    </html>`;

  const text = `
        Supplier Account Approved
        
        Hello ${supplierName},
        
        Your account with [Supplier Name] has been approved by the admin. You can now log in via the link below <a href="${url}">Login Link</a>
        aand start using our platform.
        
        If you have any questions or need further assistance, please feel free to contact us.
    `;

  return {
    html: html,
    text: text,
  };
};

export default notifySupplierAccountApproval;
