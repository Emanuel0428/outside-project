import { useEffect, useState, useRef, useCallback } from 'react';
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

export default function DecryptedText({
    text,
    speed = 50,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
    className = '',
    parentClassName = '',
    encryptedClassName = '',
    animateOn = 'view',
    ...props
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState<string>('');
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const containerRef = useRef<HTMLSpanElement>(null);

    // Función para obtener un carácter aleatorio
    const getRandomChar = useCallback(() => {
        const chars = characters.split('');
        return chars[Math.floor(Math.random() * chars.length)];
    }, [characters]);

    // Efecto para manejar la animación de escritura
    useEffect(() => {
        let interval: number;

        if (isHovering && currentIndex < text.length) {
            interval = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;
                    if (nextIndex <= text.length) {
                        // Construir el texto actual con cifrado para las letras no reveladas
                        const newText = text
                            .split('')
                            .map((char, i) => (i < nextIndex ? char : getRandomChar()))
                            .join('');
                        setDisplayText(newText);
                    }
                    return nextIndex;
                });
            }, speed);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isHovering, currentIndex, text, speed, characters,getRandomChar]);

    // Reiniciar la animación cuando se deja de hacer hover
    useEffect(() => {
        if (!isHovering) {
            setCurrentIndex(0);
            setDisplayText('');
        }
    }, [isHovering]);

    // Animación basada en la visibilidad
    useEffect(() => {
        if (animateOn !== 'view') return;

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsHovering(true);
                } else {
                    // Reiniciar cuando el elemento sale de la vista
                    setIsHovering(false);
                    setCurrentIndex(0);
                    setDisplayText('');
                }
            });
        };  

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const currentRef = containerRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [animateOn]);

    const hoverProps =
        animateOn === 'hover'
            ? {
                  onMouseEnter: () => setIsHovering(true),
                  onMouseLeave: () => setIsHovering(false),
              }
            : {};

            return (
                <motion.span
                    ref={containerRef}
                    className={`inline-block whitespace-pre-wrap text-5xl font-sans ${parentClassName}`}
                    {...hoverProps}
                    {...props}
                >
                    <span className="sr-only">{text}</span>
                    <span aria-hidden="true">
                        {displayText.split('').map((char, index) => (
                            <span
                                key={index}
                                className={`${index < currentIndex ? className : encryptedClassName} tracking-wide`}
                            >
                                {char}
                            </span>
                        ))}
                    </span>
                </motion.span>
    );
}