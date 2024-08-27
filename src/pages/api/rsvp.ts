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

    // Construct the JSON object to send to the webhook
    const jsonData = {
        first_name,
        last_name,
        email,
        canAttend,
        phone,
        guest_count_adult,
        guest_count_child,
        food_allergies,
        special_considerations,
        message,
    };

    // Send the JSON data to the Make.com webhook
    try {
        const response = await fetch("https://hook.us1.make.com/byoc8c8frxbmfgqdy3fdh6x47xl67n7k", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
            return new Response(
                JSON.stringify({
                    message: "There was an error processing your RSVP. Please try again later."
                }),
                { status: 500 }
            );
        }

        // Different messages based on attendance
        const successMessage = canAttend
            ? "Thank you for your RSVP! We look forward to seeing you."
            : "Thank you for letting us know. Your response has been recorded.";

        return new Response(
            JSON.stringify({
                message: successMessage
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: "There was an error processing your RSVP. Please try again later.",
                error: (error as Error).message,
            }),
            { status: 500 }
        );
    }
};
