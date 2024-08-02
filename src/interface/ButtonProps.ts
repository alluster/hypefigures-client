export type ButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    title?: string;
    ghost?: false;
    primary?: boolean;
    small?: boolean;
    orange?: boolean;
    white?: boolean;
    back?: boolean;
    success?: boolean;
    dividerRight?: boolean;
    children?: React.ReactNode;
    to?: string;
    layoutType?: 'default' | 'back' | 'link' | 'dropdown' | 'linkOutside';
    disabled?: boolean;
    borderWhite?: boolean;
};
