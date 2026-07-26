import React from 'react';
import { Check } from 'lucide-react';
import { StepType } from '@/types';

export interface StepperProps {
  currentStep: StepType;
  onStepClick?: (step: StepType) => void;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    { number: 1, title: 'Item Katalog' },
    { number: 2, title: 'Metode Pembayaran' },
    { number: 3, title: 'Konfirmasi' }
  ];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-2xs">
      <div className="flex items-center justify-between max-w-xl mx-auto">
        {steps.map((step, idx) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;
          const isClickable = step.number < currentStep && onStepClick;

          return (
            <React.Fragment key={step.number}>
              {/* Step Item */}
              <div 
                onClick={() => isClickable && onStepClick(step.number as StepType)}
                className={`flex items-center gap-2.5 ${isClickable ? 'cursor-pointer group' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCompleted
                      ? 'bg-brand-600 text-white'
                      : isActive
                      ? 'bg-brand-600 text-white ring-4 ring-brand-100 shadow-sm'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.number}
                </div>
                <span
                  className={`text-xs font-semibold hidden sm:inline-block ${
                    isActive
                      ? 'text-brand-700 font-bold'
                      : isCompleted
                      ? 'text-slate-800'
                      : 'text-slate-400'
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {/* Connecting Line */}
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-3 transition-colors ${
                    currentStep > idx + 1 ? 'bg-brand-600' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
