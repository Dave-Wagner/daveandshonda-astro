import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const first_name = data.get("first_name");
    const last_name = data.get("last_name");
    const email = data.get("email");
    const canAttend = data.get("can_attend") === "true"; // Convert to boolean
    const phone = data.get("phone");
    const guest_count_adult = data.get("guest_count");
    const guest_count_child = data.get("guest_count_child");
    const food_allergies = data.get("food_allergies");
    const special_considerations = data.get("special_considerations");
    const message = data.get("message");

    // Basic validation for required fields
    if (!first_name || !last_name || !email) {
        return new Response(
            JSON.stringify({
                message: "Please provide your first name, last name, and email."
            }),
            { status: 400 }
        );
    }

    // If the user is not attending, no need to validate further
    if (!canAttend) {
        return new Response(
            JSON.stringify({
                message: "Thank you for letting us know. Your RSVP has been recorded."
            }),
            { status: 200 }
        );
    }

    // If the user is attending, validate only the fields that are required
    if (canAttend) {
        if (!phone) {
            return new Response(
                JSON.stringify({
                    message: "Please provide a contact phone number."
                }),
                { status: 400 }
            );
        }

        // Convert guest_count_adult to a number and check if it's valid
        const guestCountAdult = guest_count_adult ? parseInt(guest_count_adult.toString(), 10) : 0;
        if (guestCountAdult < 1) {
            return new Response(
                JSON.stringify({
                    message: "Please provide the number of adult guests attending."
                }),
                { status: 400 }
            );
        }
    }

    // Further processing of the data if necessary...
    return new Response(
        JSON.stringify({
            message: "Thank you for your RSVP! We look forward to seeing you."
        }),
        { status: 200 }
    );
};
