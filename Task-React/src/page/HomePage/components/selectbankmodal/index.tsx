"use client";
import * as React from "react";
import { ArrowLeft, ChevronRight, Landmark, Plus } from "lucide-react";

import { BANKS } from "../../Type";
import { Modal } from "../../../../components/ui/Modal";
import { Button } from "../../../../components/ui/Button";

export interface SelectBankModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddManually: () => void;
}

export function SelectBankModal({ isOpen, onClose, onAddManually }: SelectBankModalProps) {
    const [activeTab, setActiveTab] = React.useState<"banks" | "loan">("banks");

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col justify-center">
                <div className="-translate-y-3">
                    <button
                        onClick={onClose}
                        className="w-13 h-8 rounded-full bg-[#242424] flex items-center justify-center text-white mb-5"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <h2 className="text-4xl font-bold text-white mb-1">Add new card</h2>
                    <p className="text-base text-[#EAEAEA99] leading-5 mt-3 mb-5">
                        Select bank to add card by verifying using
                        <p>OTP to your registered mobile number</p>
                    </p>
                </div>

                <div className="w-full items-center justify-center flex bg-[#1f1f1f] rounded-full p-1 mb-4">
                    <button
                        onClick={() => setActiveTab("banks")}
                        className={`px-20 py-1 text-sm font-semibold rounded-lg transition-colors ${activeTab === "banks"
                            ? "bg-[#636366] text-white border-[0.5px] border-[#EAEAEA8A]"
                            : "text-white"
                            }`}
                    >
                        Banks
                    </button>
                    <button
                        onClick={() => setActiveTab("loan")}
                        className={`px-20 py-1 text-sm font-semibold rounded-lg transition-colors ${activeTab === "loan"
                            ? "bg-[#636366] text-white border-[0.5px] border-[#EAEAEA8A]"
                            : "text-white"
                            }`}
                    >
                        Loan
                    </button>
                </div>

                {activeTab === "banks" ? (
                    <div className="flex flex-col divide-y divide-[#242424] mb-4">
                        {BANKS.map((bank) => (
                            <button
                                key={bank.id}
                                type="button"
                                className="flex items-center justify-between py-3.5 text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                                        style={{ backgroundColor: bank.color }}
                                    >
                                        {bank.tag}
                                    </div>
                                    <span className="text-white text-[15px] font-medium">{bank.name}</span>
                                </div>
                                <ChevronRight size={18} className="text-[#EAEAEA66]" />
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="py-10 flex flex-col items-center text-center gap-2 mb-4">
                        <Landmark size={28} className="text-[#EAEAEA66]" />
                        <p className="text-sm text-[#EAEAEA99]">No loan accounts linked yet</p>
                    </div>
                )}

           
                <Button
                    onClick={onAddManually}
                    variant={"soft"}
                    color={"neutral"}
                    leftIcon={
                        <Plus size={18}className=" gap-1 flex justify-center items-center" />
                    }>
                    Add Manually
                </Button>
            </div>
        </Modal>
    );
}