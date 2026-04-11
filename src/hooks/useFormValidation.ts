"use client";

import { useState } from "react";
import { ZodType, ZodError } from "zod";

type UseFormValidationProps<T> = {
  schema: ZodType<T>;
  requiredKeys?: string[];
  excludedKeys?: string[];
};

type FormErrors = Record<string, string>;

export function useFormValidation<T>({
  schema,
  requiredKeys = [],
  excludedKeys = [],
}: UseFormValidationProps<T>) {
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // 🔍 Get nested value using dot path (e.g., "user.name")
  const getValueByPath = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, part) => {
      if (acc == null) return undefined;
      return Object.prototype.hasOwnProperty.call(acc, part)
        ? acc[part]
        : undefined;
    }, obj);
  };

  // ✅ Validate full form
  const validateForm = (formData: T): boolean => {
    const fieldErrors: FormErrors = {};

    // 🔹 Required field validation
    requiredKeys.forEach((path) => {
      if (excludedKeys.includes(path)) return;

      const value = getValueByPath(formData, path);

      if (
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        const fieldName = path.split(".").pop();
        fieldErrors[path] = `${fieldName} is required`;
      }
    });

    // 🔹 Schema validation (Zod)
    const result = schema.safeParse(formData);

    if (!result.success) {
      result.error.issues.forEach((err: ZodError["issues"][number]) => {
        const path = err.path.join(".");

        if (excludedKeys.includes(path)) return;

        if (!fieldErrors[path]) {
          fieldErrors[path] = err.message;
        }
      });
    }

    setFormErrors(fieldErrors);

    return Object.keys(fieldErrors).length === 0;
  };

  // 🧹 Reset errors
  const resetErrors = () => setFormErrors({});

  return {
    formErrors,
    validateForm,
    setFormErrors,
    resetErrors,
  };
}

/**
 * -----------------------------------------------------------------------------
 * 📌 Example Usage
 * -----------------------------------------------------------------------------
 *
 * import { useFormValidation } from "tezor";
 * import { z } from "zod";
 *
 * const schema = z.object({
 *   name: z.string().min(1, "Name is required"),
 *   email: z.string().email("Invalid email"),
 * });
 *
 * function MyForm() {
 *   const { formErrors, validateForm } = useFormValidation({
 *     schema,
 *     requiredKeys: ["name", "email"],
 *   });
 *
 *   const handleSubmit = () => {
 *     const formData = {
 *       name: "",
 *       email: "test",
 *     };
 *
 *     const isValid = validateForm(formData);
 *
 *     if (isValid) {
 *       console.log("Form is valid ✅");
 *     } else {
 *       console.log(formErrors);
 *     }
 *   };
 *
 *   return <button onClick={handleSubmit}>Submit</button>;
 * }
 *
 * -----------------------------------------------------------------------------
 */
