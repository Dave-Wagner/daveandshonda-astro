// TODO: Componentize the RSVP form
// TODO: Add a RSVP modification version of this form

import React, { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    food_allergies: string;
    special_considerations: string;
    guest_count: number;
    guest_count_child: number;
    message: string;
}

interface ToastMessage {
    message: string | null;
    status: 'success' | 'info' | 'error';
}

export default function RSVPForm() {
    const [canAttend, setCanAttend] = useState<boolean>(true);
    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        food_allergies: 'None',
        special_considerations: 'None',
        guest_count: 1,
        guest_count_child: 0,
        message: '',
    });

    const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Custom validation logic
        if (!formData.first_name || !formData.last_name || !formData.email) {
            setToastMessage({
                message: 'Please provide your first name, last name, and email.',
                status: 'error',
            });
            return;
        }

        if (canAttend && (!formData.phone || formData.guest_count < 1)) {
            setToastMessage({
                message: 'Please provide a contact phone number and the number of adult guests attending.',
                status: 'error',
            });
            return;
        }

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (canAttend || ['first_name', 'last_name', 'email'].includes(key)) {
                formDataToSend.append(key, value.toString());
            }
        });
        formDataToSend.append('can_attend', canAttend.toString());

        try {
            const response = await fetch('/api/rsvp', {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await response.json();

            if (response.ok) {
                setToastMessage({
                    message: `${data.message}`,
                    status: 'success',
                }); // Success message
            } else {
                setToastMessage({
                    message: `${data.message}`,
                    status: 'error',
                }); // Error message
            }
        } catch (error) {
            setToastMessage({
                message: 'An error occurred. Please try again later.',
                status: 'error',
            }); // Error message
        }
    }

    // Automatically dismiss toast after 5 seconds
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage(null);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const handleCloseToast = () => {
        setToastMessage(null);
    };

    return (
        <div className='card glass w-full mb-8'>

            <form className="p-2" onSubmit={handleSubmit} noValidate>
                <label className="input input-bordered flex items-center gap-2 m-2">
                    First Name:
                    <input
                        id='first_name'
                        type="text"
                        className="grow"
                        placeholder="Daisy"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 m-2">
                    Last Name:
                    <input
                        id='last_name'
                        type="text"
                        className="grow"
                        placeholder="Duck"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 m-2">
                    Email:
                    <input
                        id='email'
                        type="email"
                        className="grow"
                        placeholder="daisy@duck.com"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </label>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Yes, I'll be there!</span>
                        <input
                            id='can_attend'
                            type="radio"
                            name="can_attend"
                            className="radio checked:bg-success"
                            checked={canAttend}
                            onChange={() => setCanAttend(true)}
                        />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Sorry, I won't be able to attend.</span>
                        <input
                            id='cannot_attend'
                            type="radio"
                            name="can_attend"
                            className="radio checked:bg-error"
                            checked={!canAttend}
                            onChange={() => setCanAttend(false)}
                        />
                    </label>
                </div>

                {canAttend && (
                    <>
                        <label className="input input-bordered flex items-center gap-2 m-2">
                            Phone:
                            <input
                                id='phone'
                                type="tel"
                                className="grow"
                                placeholder="555-555-5555"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </label>

                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Food Allergies?</span>
                                <span className="label-text-alt">Please list any food allergies you have.</span>
                            </label>
                            <input
                                id='food_allergies'
                                type="text"
                                placeholder="None"
                                className="input input-bordered w-full grow"
                                name="food_allergies"
                                value={formData.food_allergies}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Special Considerations?</span>
                            </label>
                            <input
                                id='special_considerations'
                                type="text"
                                placeholder="None"
                                className="input input-bordered w-full grow"
                                name="special_considerations"
                                value={formData.special_considerations}
                                onChange={handleInputChange}
                            />
                        </div>

                        <label className="form-control w-full max-w-xs m-2">
                            <div className="label">
                                <span className="label-text">Number of Adult Guests?</span>
                                <span className="label-text-alt">Including yourself</span>
                            </div>
                            <input
                                id='guest_count'
                                type="number"
                                placeholder="1"
                                className="input input-bordered w-full max-w-xs grow"
                                name="guest_count"
                                value={formData.guest_count}
                                onChange={handleInputChange}
                            />
                        </label>

                        <label className="form-control w-full max-w-xs m-2">
                            <div className="label">
                                <span className="label-text">Number of Child Guests?</span>
                            </div>
                            <input
                                id='guest_count_child'
                                type="number"
                                placeholder="0"
                                className="input input-bordered w-full max-w-xs grow"
                                name="guest_count_child"
                                value={formData.guest_count_child}
                                onChange={handleInputChange}
                            />
                        </label>

                        <label className="textarea textarea-bordered flex items-center gap-2 m-2">
                            Message:
                            <textarea
                                id='message'
                                className="textarea grow"
                                placeholder="I can't wait to see you!"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                            />
                        </label>
                    </>
                )}

                <div className="flex gap-4 justify-center m-6">
                    <button type="submit" className="btn btn-primary">
                        Send RSVP
                        <i className="fa-solid fa-arrow-right text-sm"></i>
                    </button>
                </div>
            </form>

            {toastMessage && (
                <div className={`toast toast-end z-10 mb-20`}>
                    <div className={`alert ${toastMessage.status === 'success' ? 'alert-success' : toastMessage.status === 'info' ? 'alert-info' : 'alert-error'}`}>
                        <span>{toastMessage.message}</span>
                        <button className="btn btn-sm btn-ghost ml-4 fa-solid fa-circle-xmark" onClick={handleCloseToast} />
                    </div>
                </div>
            )}

        </div>
    );
}
