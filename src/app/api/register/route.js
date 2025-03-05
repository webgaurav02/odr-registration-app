import connectMongo from "@/lib/mongodb";
import Registration from "@/models/Registration";

export async function POST(req) {
  try {
    await connectMongo();

    const { name, email, phone } = await req.json();

    if (!name || !email || !phone) {
      return new Response(JSON.stringify({ success: false, error: "All fields are required." }), { status: 400 });
    }

    const newSubmission = new Registration({ name, email, phone });
    await newSubmission.save();

    return new Response(JSON.stringify({ success: true, message: "Form submitted successfully!" }), { status: 201 });
  } catch (error) {
    console.error("Form Submission Error:", error);
    return new Response(JSON.stringify({ success: false, error: "Server error. Please try again." }), { status: 500 });
  }
}
