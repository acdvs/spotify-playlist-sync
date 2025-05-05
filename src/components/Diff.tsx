import clsx from 'clsx';

function Diff({ value, sign }: { value?: number; sign: '+' | '-' }) {
  return (
    <p
      className={clsx(
        sign === '+' ? 'text-green-500' : 'text-red-500',
        'w-10 text-center font-bold transition-opacity',
      )}
    >
      {sign}
      {value}
    </p>
  );
}

export default Diff;
