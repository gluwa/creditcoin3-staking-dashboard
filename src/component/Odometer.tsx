import { useMemo } from 'react';

interface OdometerProps {
  value: string;
  spaceAfter?: string;
  zeroDecimals?: number;
}

export const Odometer = (props: OdometerProps) => {
  const { value, spaceAfter, zeroDecimals } = props;
  const formattedValue = useMemo(() => {
    if (value === '0') {
      return '0';
    }
    return formatNumber(value, zeroDecimals);
  }, [value, zeroDecimals]);

  return (
    <span>
      {formattedValue}
      {spaceAfter && <>&nbsp;{spaceAfter}</>}
    </span>
  );
};

const formatNumber = (value: string, zeroDecimals?: number) => {
  const number = parseFloat(value);
  if (zeroDecimals !== undefined) {
    return number.toFixed(zeroDecimals);
  }
  return number.toLocaleString();
};
