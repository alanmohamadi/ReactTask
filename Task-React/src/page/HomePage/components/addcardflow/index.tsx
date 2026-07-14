"use client";
import * as React from "react";
import { CreditCard } from "lucide-react";

import { SelectBankModal } from "../selectbankmodal";
import { AddCardManualModal } from "../addcardmanualmodal";
import { CardAddedModal } from "../cardaddedmodal";
import type { CardFormData, Step } from "../../Type";
import { Button } from "../../../../components/ui/Button";

interface AddCardFlowProps {
  onCardAdded?: (data: CardFormData) => void;
}

export function AddCardFlow({ onCardAdded }: AddCardFlowProps) {
  const [step, setStep] = React.useState<Step>("closed");
  const [cardData, setCardData] = React.useState<CardFormData | null>(null);

  const closeAll = () => setStep("closed");

  const handleManualSubmit = (data: CardFormData) => {
    setCardData(data);
    setStep("success");
  };

  const handleContinue = () => {
    if (cardData && onCardAdded) {
      onCardAdded(cardData);
    }
    closeAll();
  };

  return (
    <>

      <Button
        onClick={() => setStep("select")}
        size={"xl"}
        variant={"soft"}
        color={"neutral"}
        leftIcon={
          <CreditCard size={18} className=" gap-3 flex justify-center items-center" />
        }>
        Add new card
      </Button>


      <SelectBankModal
        isOpen={step === "select"}
        onClose={closeAll}
        onAddManually={() => setStep("manual")}
      />

      <AddCardManualModal
        isOpen={step === "manual"}
        onClose={closeAll}
        onBack={() => setStep("select")}
        onSubmit={handleManualSubmit}
      />

      <CardAddedModal
        isOpen={step === "success"}
        onClose={closeAll}
        data={cardData}
        onContinue={handleContinue}
      />
    </>
  );
}