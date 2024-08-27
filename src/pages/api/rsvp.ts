import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const first_name = data.get("first_name");
    const last_name = data.get("last_name");
    const email = data.get("email");
    const phone = data.get("phone");
    const guest_count = data.get("guest_count");
    const message = data.get("message");

    // Validate the data - TODO: you'll probably want to do more than this
    if (!first_name || !last_name || !email || !phone || !guest_count) {
        return new Response(
            JSON.stringify({
                message: "Missing required fields",
            }),
            { status: 400 }
        );
    }
    // Do something with the data, then return a success response
    return new Response(
        JSON.stringify({
            message: "Success!"
        }),
        { status: 200 }
    );
};