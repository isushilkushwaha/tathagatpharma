import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { type, email, name, phone, problem, doctor, date, time } = body;

    // ✅ DEBUG (remove later)
    console.log("USER:", process.env.EMAIL_USER);
    console.log("PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

    // ❌ STOP if env missing (prevents crash)
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return Response.json(
        { error: "Email credentials missing in ENV ❌" },
        { status: 500 }
      );
    }

    // ✅ BETTER TRANSPORTER (more stable than 'service: gmail')
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let subject = "";
    let html = "";

    // 📌 STEP 1 EMAIL
    if (type === "submitted") {
      subject = "Appointment Submitted Successfully ✅";

      html = `
        <div style="font-family:sans-serif;padding:20px">
          <h2 style="color:#16a34a">Appointment Request Received</h2>

          <p>Hello <b>${name}</b>,</p>
          <p>Your appointment request has been submitted successfully.</p>

          <h3>Details:</h3>
          <ul>
            <li><b>Name:</b> ${name}</li>
            <li><b>Phone:</b> ${phone}</li>
            <li><b>Problem:</b> ${problem}</li>
            <li><b>Status:</b> Pending Approval</li>
          </ul>

          <p>We will notify you once approved.</p>

          <hr/>
          <p><b>Tathagat Pharma</b></p>
        </div>
      `;
    }

    // 📌 STEP 2 EMAIL
    if (type === "approved") {
      subject = "Appointment Confirmed 🎉";

      html = `
        <div style="font-family:sans-serif;padding:20px">
          <h2 style="color:#16a34a">Appointment Confirmed</h2>

          <p>Hello <b>${name}</b>,</p>
          <p>Your appointment has been approved by doctor.</p>

          <h3>Appointment Details:</h3>
          <ul>
            <li><b>Doctor:</b> ${doctor}</li>
            <li><b>Date:</b> ${date}</li>
            <li><b>Time:</b> ${time}</li>
          </ul>

          <p>Please arrive 10 minutes early.</p>

          <hr/>
          <p><b>Tathagat Pharma</b></p>
        </div>
      `;
    }

    // ❌ Safety check
    if (!subject || !html) {
      return Response.json({ error: "Invalid email type" }, { status: 400 });
    }

    await transporter.sendMail({
      from: `"Tathagat Pharma" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return Response.json({ error: "Email failed ❌" }, { status: 500 });
  }
}