import { useEffect, useState, useRef, useCallback, memo } from 'react';
import { motion } from 'framer-motion';

interface DecryptedTextProps {
    text: string;
    speed?: number;
    characters?: string;
    className?: string;
    encryptedClassName?: string;
    parentClassName?: string;
    animateOn?: 'view' | 'hover';
    [key: string]: unknown;
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';

function DecryptedText({
    text,
    speed = 50,
    characters = DEFAULT_CHARS,
    className = '',
    parentClassName = '',
    encryptedClassName = '',
    animateOn = 'view',
    ...props
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const containerRef = useRef<HTMLSpanElement>(null);
    const charsArray = useRef<string[]>(characters.split('')).current;
    
    const getRandomChar = useCallback(() => {
        return charsArray[Math.floor(Math.random() * charsArray.length)];
    }, [charsArray]);

    const generateRandomText = useCallback((decryptedIndex: number) => {
        return text
            .split('')
            .map((char, i) => (i < decryptedIndex ? char : getRandomChar()))
            .join('');
    }, [text, getRandomChar]);

    useEffect(() => {
        if (!isActive || currentIndex >= text.length) return;
        
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const nextIndex = prevIndex + 1;
                if (nextIndex <= text.length) {
                    setDisplayText(generateRandomText(nextIndex));
                }
                return nextIndex;
            });
        }, speed);
        
        return () => clearInterval(interval);
    }, [isActive, currentIndex, text, speed, generateRandomText]);

    useEffect(() => {
        if (!isActive) {
            setCurrentIndex(0);
            setDisplayText(generateRandomText(0));
        }
    }, [isActive, generateRandomText]);

    useEffect(() => {
        setDisplayText(generateRandomText(0));
    }, [text, generateRandomText]);

    useEffect(() => {
        if (animateOn !== 'view') return;

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const isIntersecting = entries[0]?.isIntersecting;
            setIsActive(!!isIntersecting);
        };  

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.1,
        });
        
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [animateOn]);

    const hoverProps = animateOn === 'hover' 
        ? {
            onMouseEnter: () => setIsActive(true),
            onMouseLeave: () => setIsActive(false),
        } 
        : {};

    return (
        <motion.span
            ref={containerRef}
            className={`inline-block whitespace-pre-wrap text-5xl Oswald ${parentClassName}`}
            {...hoverProps}
            {...props}
        >
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
                {displayText && displayText.split('').map((char, index) => (
                    <span
                        key={`${index}-${char}`}
                        className={`${index < currentIndex ? className : encryptedClassName} tracking-wide`}
                    >
                        {char}
                    </span>
                ))}
            </span>
        </motion.span>
    );
}

export default memo(DecryptedText);