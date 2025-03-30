export interface DropdownOption<T> {
    label: string;
    value: T;
}

export interface DropdownProps<T> {
    options: DropdownOption<T>[];
    value: T | null;
    onChange: (value: T) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    renderOption?: (option: DropdownOption<T>, isSelected: boolean) => React.ReactNode;
}
