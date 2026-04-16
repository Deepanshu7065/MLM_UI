import React from 'react';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';




const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()

// Form-level components that use form context
function FormSubmitStatus({ children }: { children?: React.ReactNode }) {
   const form = useFormContext();

   if (!form) {
      return React.createElement(
         'div',
         { className: 'flex items-center gap-2' },
         children
      );
   }

   const isSubmitting = form.state.isSubmitting;
   const canSubmit = form.state.canSubmit;

   return React.createElement(
      'div',
      { className: 'flex items-center gap-2' },
      children,
      isSubmitting &&
      React.createElement(
         'span',
         { className: 'text-sm text-muted-foreground' },
         'Submitting...'
      ),
      !canSubmit &&
      !isSubmitting &&
      React.createElement(
         'span',
         { className: 'text-sm text-destructive' },
         'Please fix errors before submitting'
      )
   );
}

function FormErrorSummary() {
   const form = useFormContext();

   if (!form) return null;

   const errors = form.state.errors;

   if (errors.length === 0) return null;

   return React.createElement(
      'div',
      { className: 'rounded-md bg-destructive/15 p-3' },
      React.createElement(
         'h3',
         { className: 'text-sm font-medium text-destructive' },
         'Please fix the following errors:'
      ),
      React.createElement(
         'ul',
         { className: 'mt-2 list-disc list-inside text-sm text-destructive' },
         errors.map((error: any, index: number) =>
            React.createElement('li', { key: index }, error)
         )
      )
   );
}

function AppForm({ children, form, ...props }: React.PropsWithChildren<any>) {
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault(); 
     form.handleSubmit(e);
   };
 
   return React.createElement(
     'form',
     { onSubmit: handleSubmit, noValidate: true, ...props },
     children
   );
 }

// Create the form hook with all components
export const { useAppForm, withForm, withFieldGroup } = createFormHook({
   fieldContext,
   formContext,
   fieldComponents: {
      // Base components
      //   FormField,
      //   FormInput,
      //   FormSelect,
      //   FormButton,
      //   FormSearchField,

      //   // Input variants
      //   FormEmailInput,
      //   FormPasswordInput,
      //   FormNumberInput,

      //   // Button variants
      //   FormSubmitButton,
      //   FormResetButton,
      //   FormDestructiveButton
   },
   formComponents: {
      FormSubmitStatus,
      FormErrorSummary,
      AppForm
   }
});

// Re-export contexts for direct usage
export { useFieldContext, useFormContext };
