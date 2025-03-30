import { useState, useRef, useEffect } from 'react';
import styles from '../styles/dropdown.module.css';
import { DropdownProps } from "../models/dropdown";

export function Dropdown<T>({ options, value, onChange, placeholder = 'Select...', disabled = false, className = '', renderOption,}: DropdownProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selected = options.find((opt) => opt.value === value);

    const toggleOpen = () => {
        if (!disabled) setIsOpen((prev) => !prev);
    };

    const handleSelect = (val: T) => {
        onChange(val);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // Closes the dropdown if the click was OUTSIDE the container
            // 1. containerRef.current — checks that the DOM element exists
            // 2. e.target instanceof Node — ensures that target is a DOM node
            // 3. !contains(...) — checks that the click was not inside the container
            if (
                containerRef.current &&
                e.target instanceof Node &&
                !containerRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className={`${styles.dropdown} ${className} ${disabled ? styles.disabled : ''}`}>
            <button className={styles.control} onClick={toggleOpen} disabled={disabled}>
                {selected ? selected.label : placeholder}
                <span className={styles.arrow}>{isOpen ? `👆`: `👇`}</span>
            </button>
            {isOpen && (
                <ul className={styles.menu}>
                    {options.map((option) => {
                        const isSelected = option.value === value;
                        return (
                            <li
                                key={String(option.value)}
                                className={`${styles.option} ${isSelected ? styles.selected : ''}`}
                                onClick={() => handleSelect(option.value)}
                            >
                                {renderOption ? renderOption(option, isSelected) : option.label}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
