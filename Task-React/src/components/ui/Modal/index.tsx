// "use client";
// import * as React from "react";
// import { cn } from "../../../lib/cn.js";
// import { X } from "lucide-react";

// export type ModalVariant = "center" | "bottom";
// export type ModalSize = "auto" | "half" | "full" | "xxl";

// export interface ModalProps {
//     isOpen?: boolean;
//     onClose?: () => void;
//     children?: React.ReactNode;
//     title?: string;
//     description?: string;
//     showCloseButton?: boolean;
//     closeOnOverlayClick?: boolean;
//     closeOnEsc?: boolean;
//     variant?: ModalVariant;
//     size?: ModalSize;
//     rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
//     overlayBlur?: boolean;
//     className?: string;
//     contentClassName?: string;
// }

// const sizeClasses: Record<ModalSize, string> = {
//     auto: "h-auto max-h-[85vh]",
//     half: "h-[50vh]",
//     xxl: "h-[53vh]",
//     full: "h-[90vh]",
// };

// export function Modal({
//     isOpen = false,
//     onClose,
//     children,
//     title,
//     description,
//     showCloseButton = true,
//     closeOnOverlayClick = true,
//     closeOnEsc = true,
//     variant = "bottom",
//     size = "auto",
//     rounded = "3xl",
//     overlayBlur = true,
//     className,
//     contentClassName,
// }: ModalProps) {
//     const [isMounted, setIsMounted] = React.useState(false);
//     const [isAnimating, setIsAnimating] = React.useState(false);

//     const [startY, setStartY] = React.useState(0);
//     const [currentY, setCurrentY] = React.useState(0);
//     const [isDragging, setIsDragging] = React.useState(false);
//     const modalRef = React.useRef<HTMLDivElement>(null);

//     React.useEffect(() => {
//         if (isOpen) {
//             setIsMounted(true);
//             requestAnimationFrame(() => {
//                 setIsAnimating(true);
//             });
//         } else {
//             setIsAnimating(false);
//             const timer = setTimeout(() => {
//                 setIsMounted(false);
//             }, 300);
//             return () => clearTimeout(timer);
//         }
//     }, [isOpen]);

//     React.useEffect(() => {
//         const handleEsc = (e: KeyboardEvent) => {
//             if (e.key === "Escape" && closeOnEsc && isOpen) {
//                 onClose?.();
//             }
//         };

//         if (isOpen) {
//             document.addEventListener("keydown", handleEsc);
//             document.body.style.overflow = "hidden";
//         }

//         return () => {
//             document.removeEventListener("keydown", handleEsc);
//             document.body.style.overflow = "unset";
//         };
//     }, [isOpen, closeOnEsc, onClose]);

//     const handleTouchStart = (e: any) => {
//         if (e.target === modalRef.current || (e.target as HTMLElement).closest('.modal-drag-handle')) {
//             setStartY(e.touches[0].clientY);
//             setIsDragging(true);
//         }
//     };

//     const handleTouchMove = (e: any) => {
//         if (!isDragging) return;
//         const y = e.touches[0].clientY;
//         if (y > startY) {
//             setCurrentY(y - startY);
//         }
//     };

//     const handleTouchEnd = () => {
//         if (!isDragging) return;
//         setIsDragging(false);
//         if (currentY > 100) {
//             onClose?.();
//         }
//         setCurrentY(0);
//     };

//     if (!isMounted) return null;
//     const isBottomVariant = variant === "bottom";

//     return (
//         <div
//             className={cn(
//                 "fixed inset-0 z-50 flex",
//                 isBottomVariant ? "items-end justify-center" : "items-center justify-center",
//                 className
//             )}
//             role="dialog"
//             aria-modal="true"
//         >
//             <div
//                 className={cn(
//                     "absolute inset-0 bg-white/70 transition-opacity duration-300",
//                     overlayBlur && "backdrop-blur-sm",
//                     isAnimating ? "opacity-100" : "opacity-0"
//                 )}
//                 onClick={() => closeOnOverlayClick && onClose?.()}
//             />

//             <div
//                 ref={modalRef}
//                 onTouchStart={handleTouchStart}
//                 onTouchMove={handleTouchMove}
//                 onTouchEnd={handleTouchEnd}
//                 style={{
//                     transform: isDragging
//                         ? `translateY(${currentY}px)`
//                         : (isAnimating ? "translateY(0)" : "translateY(100%)"),
//                     transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)"
//                 }}
//                 className={cn(
//                     "relative z-10 border-t-2 border-brand-500 w-full bg-white shadow-2xl flex flex-col",
//                     isBottomVariant ? "rounded-t-3xl" : `rounded-${rounded}`,
//                     sizeClasses[size],
//                     contentClassName
//                 )}
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 {isBottomVariant && (
//                     <div className="modal-drag-handle flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
//                         <div className="h-1.5 w-40 bg-brand-600 rounded-full" />
//                     </div>
//                 )}

//                 {(title || showCloseButton) && (
//                     <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
//                         <div>
//                             {title && (
//                                 <h3 className="text-lg font-semibold text-gray-900">
//                                     {title}
//                                 </h3>
//                             )}
//                             {description && (
//                                 <p className="mt-1 text-sm text-gray-500">
//                                     {description}
//                                 </p>
//                             )}
//                         </div>
//                         {showCloseButton && (
//                             <button
//                                 onClick={onClose}
//                                 className="rounded-full p- text-brand-600 hover:bg-gray-100 hover:text-gray-600 transition-colors"
//                             >
//                                 <X className="h-7 w-7" />
//                             </button>
//                         )}
//                     </div>
//                 )}

//                 <div className="flex-1 overflow-y-auto px-6 py-4">
//                     {children}
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";
import * as React from "react";
import { createPortal } from "react-dom";

import { X } from "lucide-react";
import { cn } from "../../../core/lib/cn";

export type ModalVariant = "center" | "bottom";
export type ModalSize = "auto" | "half" | "full" | "xxl";

export interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    title?: string;
    description?: string;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    variant?: ModalVariant;
    size?: ModalSize;
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
    overlayBlur?: boolean;
    className?: string;
    contentClassName?: string;
    containerClassName?: string;
}

const sizeClasses: Record<ModalSize, string> = {
    auto: "h-[95vh] max-h-[93vh]",
    half: "h-[50vh]",
    xxl: "h-[53vh]",
    full: "h-[90vh]",
};

export function Modal({
    isOpen = false,
    onClose,
    children,
    title,
    description,
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    variant = "bottom",
    size = "auto",
    rounded = "3xl",
    overlayBlur = true,
    className,
    contentClassName,
    containerClassName,
}: ModalProps) {
    const [isMounted, setIsMounted] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [startY, setStartY] = React.useState(0);
    const [currentY, setCurrentY] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);
    const modalRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            requestAnimationFrame(() => {
                setIsAnimating(true);
            });
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => {
                setIsMounted(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && closeOnEsc && isOpen) {
                onClose?.();
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, closeOnEsc, onClose]);

    const handleTouchStart = (e: any) => {
        if (e.target === modalRef.current || (e.target as HTMLElement).closest('.modal-drag-handle')) {
            setStartY(e.touches[0].clientY);
            setIsDragging(true);
        }
    };

    const handleTouchMove = (e: any) => {
        if (!isDragging) return;
        const y = e.touches[0].clientY;
        if (y > startY) {
            setCurrentY(y - startY);
        }
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (currentY > 100) {
            onClose?.();
        }
        setCurrentY(0);
    };

    if (!isMounted) return null;

    const isBottomVariant = variant === "bottom";

    const modalContent = (
        <div
            className={cn(
                "fixed inset-0 z-50 flex ",
                isBottomVariant ? "items-end justify-center" : "items-center justify-center",
                className
            )}
            role="dialog"
            aria-modal="true"
        >
            <div
                className={cn(
                    "absolute inset-0  transition-opacity duration-300",
                    overlayBlur && "",
                    isAnimating ? "opacity-100" : "opacity-0"
                )}
                onClick={() => closeOnOverlayClick && onClose?.()}
            />

            <div
                ref={modalRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    transform: isDragging
                        ? `translateY(${currentY}px)`
                        : (isAnimating ? "translateY(0)" : "translateY(100%)"),
                    transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",

                }}
                className={cn(
                    "relative z-10 max-w-[400px] 3xl:max-w-[504px] border-t-2 border-brand-500 w-full bg-[#191919]  flex flex-col mx-auto",
                    isBottomVariant ? "rounded-t-lg" : `rounded-${rounded}`,
                    sizeClasses[size],
                    contentClassName
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {isBottomVariant && (
                    <div className="modal-drag-handle flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
                        <div className="h-1.5 w-40 bg-brand-600 rounded-full" />
                    </div>
                )}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between px-4 w-[90%] mx-auto rounded-tl-2xl rounded-tr-2xl  py-1.5 bg-[#282828] -translate-y-8.5 border-t bordert-[#393939]  ">


                    </div>
                )}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                    {children}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}