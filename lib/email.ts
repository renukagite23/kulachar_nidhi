import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendDonationReceipt = async (donation: any) => {
  if (!donation.email) return;

  const mailOptions = {
    from: `"Shri Mahalakshmi Temple" <${process.env.EMAIL_USER}>`,
    to: donation.email,
    subject: `Divine Contribution Receipt - ${donation.receiptNumber}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0d5c1; border-radius: 15px; overflow: hidden; background-color: #fffdf9;">
        <div style="background-color: #e65100; padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Jai Mata Di</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.8; font-size: 14px;">Shri Mahalakshmi Temple Trust</p>
        </div>
        
        <div style="padding: 40px;">
          <h2 style="color: #4e342e; margin-top: 0; text-align: center;">Donation Receipt</h2>
          <p style="color: #555; line-height: 1.6; text-align: center;">Namaste <strong>${donation.donorName}</strong>,<br>Thank you for your generous contribution to the temple trust. Your support helps us maintain the spiritual sanctity and serve the community.</p>
          
          <div style="background-color: #fcf8f1; border-radius: 10px; padding: 25px; margin: 30px 0; border-left: 5px solid #e65100;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #8b7361; font-weight: bold; font-size: 13px; text-transform: uppercase;">Receipt No</td>
                <td style="padding: 8px 0; color: #4e342e; font-weight: bold; text-align: right;">${donation.receiptNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #8b7361; font-weight: bold; font-size: 13px; text-transform: uppercase;">Amount</td>
                <td style="padding: 8px 0; color: #e65100; font-weight: 800; font-size: 20px; text-align: right;">₹${donation.amount}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #8b7361; font-weight: bold; font-size: 13px; text-transform: uppercase;">Purpose</td>
                <td style="padding: 8px 0; color: #4e342e; text-align: right;">${donation.reason}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #8b7361; font-weight: bold; font-size: 13px; text-transform: uppercase;">Date</td>
                <td style="padding: 8px 0; color: #4e342e; text-align: right;">${new Date(donation.donationDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #8b7361; font-size: 12px; text-align: center; font-style: italic;">"May Goddess Mahalakshmi bless you with abundance and prosperity."</p>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 20px; text-align: center; color: #999; font-size: 11px;">
          <p style="margin: 0;">This is a computer generated receipt and does not require a physical signature.</p>
          <p style="margin: 5px 0 0 0;">© ${new Date().getFullYear()} Shri Mahalakshmi Temple Trust, Mumbai</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Donation receipt sent to ${donation.email}`);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};
export const sendContactEmail = async (data: { name: string; email: string; subject: string; message: string }) => {
  const mailOptions = {
    from: `"Temple Website Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // Send to temple office
    replyTo: data.email,
    subject: `New Contact Form Submission: ${data.subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
        <h2 style="color: #e65100;">New Message from Contact Form</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <hr style="border: 0; border-top: 1px solid #eee;">
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Contact email sending failed:', error);
    return false;
  }
};
