import { useMemo } from 'react';

interface OdometerProps {
  value?: string;
  spaceBefore?: string;
  spaceAfter?: string;
  zeroDecimals?: number;
  wholeColor?: string;
  decimalColor?: string;
}

export const Odometer = ({
  value = '0',
  spaceBefore = '0px',
  spaceAfter = '0px',
  zeroDecimals = 0,
  wholeColor = 'var(--text-color-primary)',
  decimalColor = 'var(--text-color-tertiary)',
}: OdometerProps) => {
  const formattedValue = useMemo(() => {
    let [whole, decimal] = value.split('.');
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (decimal) {
      decimal = parseFloat(`0.${decimal}`).toFixed(zeroDecimals).substring(2);
    }
    return { whole, decimal };
  }, [value, zeroDecimals]);

  return (
    <span
      style={{
        paddingLeft: spaceBefore,
        paddingRight: spaceAfter,
        color: wholeColor,
      }}
    >
      {formattedValue.whole.split('').map((digit, index) => (
        <span key={`whole-${index}`}>{digit}</span>
      ))}
      {formattedValue.decimal && (
        <span style={{ color: decimalColor || wholeColor }}>
          .
          {formattedValue.decimal.split('').map((digit, index) => (
            <span key={`decimal-${index}`}>{digit}</span>
          ))}
        </span>
      )}
    </span>
  );
};
