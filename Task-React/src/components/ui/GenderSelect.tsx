// GenderSelect.tsx
import { Field, useFormikContext } from "formik";
import { clsx } from "clsx";

export default function GenderSelect({ Name, disabled = false }: { Name: string; disabled?: boolean }) {
    const formikContext = useFormikContext<any>();
    
    // اگر خارج از Formik هستیم، از props استفاده می‌کنیم
    const isOutsideFormik = !formikContext;
    
    if (isOutsideFormik || disabled) {
        // حالت نمایشی (غیرفعال) - بدون Formik
        return (
            <div className="w-full flex justify-start items-center gap-6 opacity-60">
                <label className="radio-wrapper cursor-not-allowed">
                    <input
                        type="radio"
                        name={Name}
                        value="MALE"
                        disabled={true}
                        className="radio-input"
                    />
                    <span className="radio-circle border-2 border-gray-500" />
                    <span className="radio-label text-neutral-900">
                        آقا هستم
                    </span>
                </label>

                <label className="radio-wrapper cursor-not-allowed">
                    <input
                        type="radio"
                        name={Name}
                        value="FEMALE"
                        disabled={true}
                        className="radio-input"
                    />
                    <span className="radio-circle border-2 border-gray-500" />
                    <span className="radio-label text-neutral-900">
                        خانم هستم
                    </span>
                </label>
            </div>
        );
    }

    const { values, errors, touched } = formikContext;

    return (
        <div className="w-full flex justify-start items-center gap-6">
            <label className="radio-wrapper">
                <Field
                    type="radio"
                    name={Name}
                    value="MALE"
                    className="radio-input"
                    disabled={disabled}
                />
                <span
                    className={clsx(
                        "radio-circle border-2",
                        errors.gender && touched.gender ? "border-red-600" : "border-gray-500"
                    )}
                />
                <span
                    className={clsx(
                        "radio-label",
                        values.gender === "MALE" ? "text-brand-800" : "text-neutral-900"
                    )}
                >
                    آقا هستم
                </span>
            </label>

            <label className="radio-wrapper">
                <Field
                    type="radio"
                    name={Name}
                    value="FEMALE"
                    className="radio-input"
                    disabled={disabled}
                />
                <span
                    className={clsx(
                        "radio-circle border-2",
                        errors.gender && touched.gender ? "border-red-600" : "border-gray-500"
                    )}
                />
                <span
                    className={clsx(
                        "radio-label",
                        values.gender === "FEMALE" ? "text-brand-800" : "text-neutral-900"
                    )}
                >
                    خانم هستم
                </span>
            </label>
        </div>
    );
}