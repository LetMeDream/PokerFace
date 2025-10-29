import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & { name: string };

const MaskedInput = forwardRef<HTMLInputElement, Props>(({ name, className, ...rest }, ref) => {
  const real = useRef('');
  const [display, setDisplay] = useState('');
  const innerRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // simple logic: if user adds/removes, update real accordingly
    // More advanced caret handling omitted for brevity
    if (val.length >= display.length) {
      // append new chars at end
      const appended = val.slice(display.length);
      real.current += appended;
    } else {
      // deletion
      real.current = real.current.slice(0, val.length);
    }
    setDisplay('*'.repeat(real.current.length));
  };

  return (
    <>
      {/* visible masked input */}
      <input
        {...rest}
        name={`${name}_masked`}
        ref={innerRef}
        value={display}
        onChange={onChange}
        className={className}
        autoComplete="off"
      />
      {/* hidden real value for form submit */}
      <input type="hidden" name={name} value={real.current} />
    </>
  );
});

export default MaskedInput;