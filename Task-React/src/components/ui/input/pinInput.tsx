// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { cn } from "../../../lib/cn.js";
// import { toEnglishNumber } from "../../../lib/toEnglishNumberYup.js";

// interface PinInputProps {
//   length?: number;
//   value?: string;
//   onChange?: (value: string) => void;
//   error?: boolean;
//   errorMessage?: string;
//   size?: "lg" | "xl";
//   contactInformation: string;
//   onEditClick?: () => void;
//   reSendCodeHandler: () => void;
// }

// const sizeClasses = {
//   lg: "w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg",
//   xl: "w-[50px] h-[50px] sm:w-14 sm:h-14 text-lg sm:text-xl"
// };

// export function PinInput({
//   length = 4,
//   value = "",
//   onChange,
//   error = false,
//   errorMessage = "کد وارد شده صحیح نمی‌باشد",
//   size = "xl",
//   contactInformation,
//   onEditClick,
//   reSendCodeHandler,
// }: PinInputProps) {
//   const [time, setTime] = useState<string>("01:00");
//   const [hasTime, setHasTime] = useState<boolean>(true);

//   const [timerKey, setTimerKey] = useState<number>(0);

//   const [values, setValues] = useState<string[]>(() =>
//     Array.from({ length }, (_, i) => value[i] || "")
//   );

//   const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     let seconds = 60;

//     const updateTimer = () => {
//       const m = Math.floor(seconds / 60)
//         .toString()
//         .padStart(2, "0");
//       const s = (seconds % 60).toString().padStart(2, "0");
//       setTime(`${m}:${s}`);

//       if (seconds > 0) {
//         seconds--;
//         timer = setTimeout(updateTimer, 1000);
//       } else {
//         setHasTime(false);
//       }
//     };

//     updateTimer();

//     return () => clearTimeout(timer);
//   }, [timerKey]);

//   useEffect(() => {
//     const englishValue = toEnglishNumber(value);
//     setValues(Array.from({ length }, (_, i) => englishValue[i] || ""));
//   }, [value, length]);

//   const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     let val = e.target.value;
//     val = toEnglishNumber(val);

//     if (!/^\d*$/.test(val)) return;
//     const newValues = [...values];
//     newValues[index] = val.slice(-1);
//     setValues(newValues);
//     const code = newValues.join("");
//     onChange?.(code);
//     if (val && index < length - 1) {
//       inputsRef.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Backspace" && !values[index] && index > 0) {
//       inputsRef.current[index - 1]?.focus();
//     }
//   };

//   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     let text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
//     text = toEnglishNumber(text);
//     if (!text) return;
//     const newValues = Array.from({ length }, (_, i) => text[i] || "");
//     setValues(newValues);
//     onChange?.(newValues.join(""));
//     const focusIndex = Math.min(text.length, length - 1);
//     inputsRef.current[focusIndex]?.focus();
//   };

//   const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
//     e.target.select();
//   };

//   const retryTimerHandler = () => {
//     setTimerKey((prev) => prev + 1);
//     setHasTime(true);
//     setTime("01:00");
//     reSendCodeHandler();
//   };

//   return (
//     <div className="flex  flex-col items-center gap-4 w-full">
//       <div className=" space-y-3 w-full">
//         <p className="text-sm font-medium text-gray-700">
//           رمز عبور یکبار مصرف
//           {" "}
//           <span dir="ltr" className="font-bold text-gray-900 mx-1">
//             {contactInformation}
//           </span>
//           {" "}
//           رو اینجا بنویس
//         </p>

//         <button
//           type="button"
//           onClick={onEditClick}
//           disabled={hasTime}
//           className={cn(
//             "text-base font-medium transition-colors",
//             hasTime
//               ? "text-gray-300 cursor-not-allowed"
//               : "text-brand-500 hover:text-brand-700 underline"
//           )}
//         >
//           تغییر شماره تماس
//         </button>
//       </div>

//       <div className="flex flex-row-reverse gap-2 md:gap-3 w-full justify-center" dir="ltr">
//         {values.map((digit, index) => {
//           const hasValue = digit.length > 0;
//           return (
//             <input
//               key={index}
//               ref={(el) => {
//                 if (el) inputsRef.current[index] = el;
//               }}
//               type="tel"
//               inputMode="numeric"
//               maxLength={1}
//               value={digit}
//               onChange={(e) => handleChange(index, e)}
//               onKeyDown={(e) => handleKeyDown(index, e)}
//               onPaste={handlePaste}
//               onFocus={handleFocus}
//               disabled={false}
//               className={cn(
//                 "flex items-center justify-center text-center font-bold transition-all duration-200 outline-none rounded-2xl border-2",
//                 sizeClasses[size],
//                 error
//                   ? "border-red-500 text-red-500 bg-red-50"
//                   : hasValue
//                     ? "border-brand-500 text-brand-500 bg-brand-50"
//                     : "border-gray-200 text-gray-900 hover:border-gray-300",
//                 "focus:border-brand-500 focus:ring-2 focus:ring-brand-100",
//                 "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//               )}
//             />
//           );
//         })}
//       </div>

//       {error && (
//         <span className="text-red-500 text-sm font-medium animate-pulse text-center">
//           {errorMessage}
//         </span>
//       )}

//       <div className="w-full text-center">
//         {hasTime ? (
//           <span className="text-gray-400 font-medium text-sm">{time}</span>
//         ) : (
//           <button
//             type="button"
//             onClick={retryTimerHandler}
//             className="text-brand-500 font-medium text-sm hover:underline"
//           >
//             ارسال مجدد کد تایید
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/cn.js";
import { toEnglishNumber } from "../../../lib/toEnglishNumberYup.js";

interface PinInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  size?: "lg" | "xl";
  contactInformation: string;
  onEditClick?: () => void;
  reSendCodeHandler: () => void;
}

const sizeClasses = {
  lg: "w-12 h-12 text-lg",
  xl: "w-14 h-14 text-xl"
};

export function PinInput({
  length = 4,
  value = "",
  onChange,
  error = false,
  errorMessage = "کد وارد شده صحیح نمی‌باشد",
  size = "xl",
  contactInformation,
  onEditClick,
  reSendCodeHandler,
}: PinInputProps) {
  const [time, setTime] = useState<string>("01:00");
  const [hasTime, setHasTime] = useState<boolean>(true);
  const [timerKey, setTimerKey] = useState<number>(0);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const [values, setValues] = useState<string[]>(() =>
    Array.from({ length }, (_, i) => value[i] || "")
  );

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // فوکوس خودکار روی اولین input هنگام لود شدن
  useEffect(() => {
    if (isFirstLoad && inputsRef.current[0]) {
      inputsRef.current[0].focus();
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);

  // فوکوس مجدد وقتی خطا رخ می‌دهد
  useEffect(() => {
    if (error && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [error]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let seconds = 60;

    const updateTimer = () => {
      const m = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");
      const s = (seconds % 60).toString().padStart(2, "0");
      setTime(`${m}:${s}`);

      if (seconds > 0) {
        seconds--;
        timer = setTimeout(updateTimer, 1000);
      } else {
        setHasTime(false);
      }
    };

    updateTimer();

    return () => clearTimeout(timer);
  }, [timerKey]);

  useEffect(() => {
    const englishValue = toEnglishNumber(value);
    setValues(Array.from({ length }, (_, i) => englishValue[i] || ""));
  }, [value, length]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = toEnglishNumber(val);
    if (!/^\d*$/.test(val)) return;
    const newValues = [...values];
    newValues[index] = val.slice(-1);
    setValues(newValues);
    const code = newValues.join("");
    onChange?.(code);
    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    let text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    text = toEnglishNumber(text);
    if (!text) return;
    const newValues = Array.from({ length }, (_, i) => text[i] || "");
    setValues(newValues);
    onChange?.(newValues.join(""));
    const focusIndex = Math.min(text.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const retryTimerHandler = () => {
    setTimerKey((prev) => prev + 1);
    setHasTime(true);
    setTime("01:00");
    reSendCodeHandler();
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="space-y-3 w-full">
        <p className="text-sm font-medium text-neutral-700">
          رمز عبور یکبار مصرف
          {" "}
          <span dir="ltr" className="font-bold text-neutral-700 mx-1">
            {contactInformation}
          </span>
          {" "}
          رو اینجا بنویس
        </p>

        <button
          type="button"
          onClick={onEditClick}
          className={cn(
            "text-base font-medium transition-colors",
            hasTime
              ? "text-neutral-300 cursor-not-allowed"
              : "text-black underline"
          )}
          disabled={hasTime}
        >
          تغییر شماره تماس
        </button>
      </div>

      <div className="flex flex-row-reverse gap-1 w-full justify-center" dir="ltr">
        {values.map((digit, index) => {
          const hasValue = digit.length > 0;
          return (
            <input
              key={index}
              ref={(el) => {
                if (el) inputsRef.current[index] = el;
              }}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={handleFocus}
              disabled={false}
              className={cn(
                "flex items-center justify-center text-center font-medium transition-all duration-200 outline-none rounded-2xl border-2",
                sizeClasses[size],
                error
                  ? "border-red-500 text-red-500 bg-red-50"
                  : hasValue
                    ? "border-brand-400 text-black bg-brand-100"
                    : "border-gray-200 text-gray-900 hover:border-gray-300",
                "focus:border-brand-400 focus:ring-2 focus:ring-brand-100",
                "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              )}
            />
          );
        })}
      </div>

      {error && (
        <span className="text-red-500 text-sm font-medium animate-pulse text-center">
          {errorMessage}
        </span>
      )}

      <div className="w-full text-center">
        {hasTime ? (
          <span className="text-brand-700 font-bold text-sm">{time}</span>
        ) : (
          <button
            type="button"
            onClick={retryTimerHandler}
            className="text-black font-medium text-sm hover:underline"
          >
            ارسال مجدد کد تایید
          </button>
        )}
      </div>
    </div>
  );
}