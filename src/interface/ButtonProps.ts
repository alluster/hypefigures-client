export type ButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    primary?: boolean;
    small?: boolean;
    white?: boolean;
    success?: boolean;
    dividerRight?: boolean;
    children?: React.ReactNode;
    to?: string;
};
