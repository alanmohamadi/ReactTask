"use client";
import * as React from "react";
import { ArrowLeft, CreditCard } from "lucide-react";
import type { CardFormData } from "../../Type";
import { Modal } from "../../../../components/ui/Modal";
import { Button } from "../../../../components/ui/Button";
import clsx from "clsx";

export interface AddCardManualModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBack: () => void;
    onSubmit: (data: CardFormData) => void;
}

const formatCardNumber = (value: string) =>
    value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

export function AddCardManualModal({
    isOpen,
    onClose,
    onBack,
    onSubmit
}: AddCardManualModalProps) {
    const [cardNumber, setCardNumber] = React.useState("");
    const [mm, setMm] = React.useState("");
    const [yy, setYy] = React.useState("");
    const [cvv, setCvv] = React.useState("");
    const [saveCard, setSaveCard] = React.useState(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const yyRef = React.useRef<HTMLInputElement>(null);
    const cvvRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (isOpen) {
            setCardNumber("");
            setMm("");
            setYy("");
            setCvv("");
            setSaveCard(false);
            setErrors({});
        }
    }, [isOpen]);

    const validate = () => {
        const next: Record<string, string> = {};
        const raw = cardNumber.replace(/\s/g, "");
        if (raw.length !== 16) next.cardNumber = "Enter a valid 16 digit card number";
        const monthNum = Number(mm);
        if (mm.length !== 2 || monthNum < 1 || monthNum > 12) next.mm = "Invalid";
        if (yy.length !== 2) next.yy = "Invalid";
        if (cvv.length !== 3) next.cvv = "Invalid";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit({
            cardNumber: cardNumber.replace(/\s/g, ""),
            expiryMonth: mm,
            expiryYear: yy,
            cvv,
            saveCard,
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="-translate-y-3">
                    <button
                        onClick={onBack}
                        className="w-13 h-8 rounded-full bg-[#242424] flex items-center justify-center text-white mb-5"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <h2 className="text-4xl font-bold text-white mb-1">Add new card</h2>
                    <p className="text-base text-[#EAEAEA99] leading-5 mt-3 mb-5">
                        We recommend you to set card for further
                        <p>reference too you can use it anytime</p>
                    </p>
                </div>

                <label className="text-sm font-semibold text-white mb-3">Card number</label>
                <div
                    className={`flex items-center gap-2 rounded-2xl border px-4 py-3.5 mb-1 ${errors.cardNumber ? "border-red-500" : "border-[#3a3a3a]"
                        }`}
                >
                    <CreditCard size={18} className="text-[#EAEAEA80]" />
                    <input
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="0000 0000 0000 0000"
                        inputMode="numeric"
                        className="bg-transparent outline-none text-white placeholder:text-[#EAEAEA4D] tracking-widest text-[15px] w-full"
                    />
                </div>
                {errors.cardNumber && <p className="text-xs text-red-400 mb-3">{errors.cardNumber}</p>}

                <div className="flex gap-4 mt-4">
                    <div className="flex-1">
                        <label className="text-sm font-semibold text-white mb-2 block">Expiry Date</label>
                        <div className="flex gap-2">
                            <input
                                value={mm}
                                onChange={(e) => {
                                    const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                                    setMm(v);
                                    if (v.length === 2) yyRef.current?.focus();
                                }}
                                placeholder="MM"
                                inputMode="numeric"
                                className={`w-full text-center rounded-2xl border px-2 py-3.5 bg-transparent outline-none text-white placeholder:text-[#EAEAEA4D] text-[15px] ${errors.mm ? "border-red-500" : "border-[#3a3a3a]"
                                    }`}
                            />
                            <input
                                ref={yyRef}
                                value={yy}
                                onChange={(e) => {
                                    const v = e.target.value.replace(/\D/g, "").slice(0, 2);
                                    setYy(v);
                                    if (v.length === 2) cvvRef.current?.focus();
                                }}
                                placeholder="YY"
                                inputMode="numeric"
                                className={`w-full text-center rounded-2xl border px-2 py-3.5 bg-transparent outline-none text-white placeholder:text-[#EAEAEA4D] text-[15px] ${errors.yy ? "border-red-500" : "border-[#3a3a3a]"
                                    }`}
                            />
                        </div>
                    </div>

                    <div className="flex-1">
                        <label className="text-sm font-semibold text-white mb-2 block">Security Code</label>
                        <div
                            className={`flex items-center gap-2 rounded-2xl border px-4 py-3.5 ${errors.cvv ? "border-red-500" : "border-[#3a3a3a]"
                                }`}
                        >
                            <CreditCard size={16} className="text-[#EAEAEA80]" />
                            <input
                                ref={cvvRef}
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                                placeholder="CVV"
                                inputMode="numeric"
                                type="password"
                                className="bg-transparent outline-none text-white placeholder:text-[#EAEAEA4D] text-[15px] w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <span className="text-sm text-[#eaeaeaa8]">Save this card for future reference</span>
                    <button
                        type="button"
                        onClick={() => setSaveCard((s) => !s)}
                        className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${saveCard ? "bg-[#34C759] justify-end" : "bg-[#3a3a3a] justify-start"
                            }`}
                    >
                        <span className="w-5 h-5 rounded-full bg-white block" />
                    </button>
                </div>

                <Button
                    className={clsx(" w-full translate-y-33 ")}
                    variant={"soft"}
                    color={"neutral"}
                    type="submit"
                >
                    Add Card
                </Button>
            </form>
        </Modal>
    );
}