import { useFormik } from "formik";
import * as yup from "yup";
import { Divider, PageHeader } from "@/components";
import { CONTACT_EMAIL } from "@/const";

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

const contactValidationSchema = yup.object({
  name: yup.string().trim().required("Please enter your name."),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Please enter your email."),
  message: yup.string().trim().required("Please enter your message."),
});

const getMailtoHref = ({ name, email, message }: ContactFormValues) => {
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(
    [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
  );

  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
};

export const Contact = () => {
  const formik = useFormik<ContactFormValues>({
    initialValues,
    validationSchema: contactValidationSchema,
    onSubmit: (values, helpers) => {
      window.location.href = getMailtoHref(values);
      helpers.setSubmitting(false);
      helpers.resetForm();
    },
  });

  const getFieldStatus = (field: keyof ContactFormValues) =>
    formik.touched[field] && formik.errors[field];

  return (
    <div className="page">
      <div className="mx-auto flex min-h-full w-full max-w-215 flex-col gap-4 px-8 py-4">
        <PageHeader title="Get In Touch" subtitle="Let's build something" />

        <Divider />

        <div className="flex flex-col gap-4">
          <p className="font-writing text-[14px]">
            If you want to talk about a project, an opportunity, or just say hi,
            this is the best place to reach me. You can use the links above or
            send me a message through the form below.
          </p>
        </div>

        <div className="boxshadow-win95 mt-2 flex flex-col gap-2 p-4">
          <div className="flex flex-col">
            <p className="font-writing text-[22px] font-bold">
              Send me a message
            </p>
            <p className="font-writing text-[14px]">
              All fields marked with <span className="text-red-600">*</span> are
              required.
            </p>
          </div>

          <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-writing text-[16px]">
                Name <span className="text-red-600">*</span>
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="boxshadow-win95-inset min-h-9 bg-white px-3 py-2 text-[14px]"
                placeholder="Your name"
              />

              {getFieldStatus("name") ? (
                <span className="font-writing text-[12px] text-red-600">
                  {formik.errors.name}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-writing text-[16px]">
                Email <span className="text-red-600">*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="boxshadow-win95-inset min-h-9 bg-white px-3 py-2 text-[14px]"
                placeholder="your@email.com"
              />

              {getFieldStatus("email") ? (
                <span className="font-writing text-[12px] text-red-600">
                  {formik.errors.email}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="font-writing text-[16px]">
                Message <span className="text-red-600">*</span>
              </label>

              <textarea
                id="message"
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="boxshadow-win95-inset min-h-40 resize-y bg-white px-3 py-2 text-[14px]"
                placeholder="Tell me a little about your project or message"
              />

              {getFieldStatus("message") ? (
                <span className="font-writing text-[12px] text-red-600">
                  {formik.errors.message}
                </span>
              ) : null}
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="button cursor-pointer px-4 py-2 text-[14px]"
                disabled={formik.isSubmitting}
              >
                Send email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
