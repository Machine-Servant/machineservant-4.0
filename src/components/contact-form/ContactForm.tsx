import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ContactFormHelpText } from './components/contact-form-help-text';
import { ContactFormInput } from './components/contact-form-input';
import { ContactFormTextArea } from './components/contact-form-text-area';

export const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    name: string;
    subject: string;
    email: string;
    message: string;
  }>();

  const onSubmit = useCallback(() => {
    const form = document.getElementsByName('contact')[0] as HTMLFormElement;
    form.submit();
  }, []);

  return (
    <form
      className="mx-4 flex flex-col sm:mx-auto sm:pr-0 lg:px-12"
      data-netlify="true"
      netlify-honeypot="true"
      name="contact"
      method="POST"
      action="/form-success"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="contact" />
      <label htmlFor="contact-name" className="sr-only">
        Name
      </label>
      <ContactFormInput
        id="contact-name"
        type="text"
        placeholder="Name"
        error={!!errors.name}
        {...register('name', { required: 'Please enter your name.' })}
      />
      {errors.name && (
        <ContactFormHelpText>{errors.name.message}</ContactFormHelpText>
      )}
      <label htmlFor="contact-subject" className="sr-only">
        Subject
      </label>
      <ContactFormInput
        id="contact-subject"
        type="text"
        placeholder="Subject"
        error={!!errors.subject}
        {...register('subject', { required: 'Please enter a subject' })}
      />
      {errors.subject && (
        <ContactFormHelpText>{errors.subject.message}</ContactFormHelpText>
      )}
      <label htmlFor="contact-email" className="sr-only">
        Email
      </label>
      <ContactFormInput
        id="contact-email"
        type="email"
        placeholder="Email"
        error={!!errors.email}
        {...register('email', { required: 'Please enter an email' })}
      />
      {errors.email && (
        <ContactFormHelpText>{errors.email.message}</ContactFormHelpText>
      )}
      <label htmlFor="contact-message" className="sr-only">
        Message
      </label>
      <ContactFormTextArea
        id="contact-message"
        className="mt-4"
        rows={7}
        placeholder="Type your message here..."
        error={!!errors.message}
        {...register('message', { required: 'Please enter a message' })}
      />
      {errors.message && (
        <ContactFormHelpText>{errors.message.message}</ContactFormHelpText>
      )}
      <button
        className="mt-4 w-full bg-lochmara-700 py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-black"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
