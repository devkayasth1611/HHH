const zod = require("zod");

const userValidation = zod.object({
  body: zod.object({
    fullName: zod
      .string()
      .max(50, "The maximum character of user name should be 50")
      .min(3, "The minimum character of user name should be 3"),
    email: zod
      .string()
      .email("Invalid email format") // Zod's built-in email validation
      .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(val), {
        message: "Email must be in a valid format.",
      }),
    password: zod
      .string()
      .min(6, "Password must be at least 6 characters long."),
    confirmPassword: zod.string().min(6, "Password must be at least 6 characters long."),
    phoneNumber: zod
      .string()
      .refine(
        (val) => {
          const indianPhoneNumberRegex = /^\+91\d{10}$/;
          return indianPhoneNumberRegex.test(val);
        },
        {
          message: "Phone number must start with +91 followed by 10 digits.",
        }
      ),
    address: zod
      .string()
      .max(50, "The maximum character of address should be 50")
      .min(3, "The minimum character of address should be 3"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match.",
      });
    }
  }),
});

module.exports = userValidation;
