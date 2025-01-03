import { cn } from '@/lib/utils';
import { HTMLAttributes, createElement } from 'react';

type TextVariantStyle = 'h3' | 'body-small' | 'h4' | 'h2';
type TextVariant = 'h3' | 'p' | 'h4' | 'span';
type BoldVariant = 'bold' | 'regular' | 'medium';

type CustomTextProps = HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement> & {
  variant?: TextVariant;
  variantStyle: TextVariantStyle;
  boldness?: BoldVariant;
};

const textStyles: Record<TextVariantStyle, string> = {
  h3: 'text-2xl leading-[2.8rem] sm:text-[38px]',
  'body-small': 'text-base',
  h2: 'text-xl sm:text-2xl leading-[2rem]',
  h4: 'sm:text-[32px] text-2xl leading-[3rem]',
} as const;

const boldStyles: Record<BoldVariant, string> = {
  bold: 'font-bold',
  regular: 'font-normal',
  medium: 'font-medium',
} as const;

const Text = ({
  variant = 'p',
  boldness = variant?.startsWith('h') ? 'bold' : 'regular',
  variantStyle,
  children,
  className,
  ...props
}: CustomTextProps) =>
  createElement(
    variant,
    {
      className: cn(textStyles[variantStyle], boldStyles[boldness], className),
      ...props,
    },
    children,
  );

export default Text;
