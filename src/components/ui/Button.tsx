import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

const variants = cva('inline-flex items-center justify-center', {
  variants: {
    variant: {
      default: 'p-2',
      primary:
        'px-6 py-2 rounded-full border-2 border-zinc-600 hover:scale-105 hover:border-white',
      secondary: 'px-6 py-2 rounded-full bg-zinc-800 hover:scale-105 hover:bg-zinc-700',
      text: 'hover:text-blue-500',
      tab: 'px-4 py-2 rounded-full border-2 border-zinc-700 text-sm font-bold hover:bg-zinc-100/10 [&.active]:bg-green-600 [&.active]:border-green-600',
    },
    disabled: {
      false: 'cursor-pointer',
      true: 'opacity-50',
    },
  },
  compoundVariants: [
    {
      variant: 'default',
      disabled: false,
      class: 'hover:[&>p]:text-blue-500 hover:[&_svg]:fill-blue-500',
    },
  ],
  defaultVariants: {
    variant: 'default',
    disabled: false,
  },
});

interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof variants> {
  asChild?: boolean;
}

export function Button({ variant, disabled, asChild, className, ...props }: Props) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={variants({ variant, disabled, className })} {...props} />;
}
