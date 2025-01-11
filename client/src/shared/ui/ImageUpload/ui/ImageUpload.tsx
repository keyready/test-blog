import { ChangeEvent, useCallback, useState } from 'react';

import classes from './ImageUpload.module.scss';

import { classNames, Mods } from '@/shared/lib/classNames';

interface ImageUploadProps {
    className?: string;
    onChange: (file: File) => void;
    isLoading?: boolean;
}

export const ImageUpload = (props: ImageUploadProps) => {
    const { className, isLoading, onChange } = props;

    const [uploadedImageSrc, setUploadedImageSrc] = useState<string>();
    const [isDragStart, setIsDragStart] = useState<boolean>(false);

    const handleUploadFile = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();

            const { files } = event.target;

            if (files?.length) {
                setUploadedImageSrc(URL.createObjectURL(files[0]));
                onChange(files[0]);
            }
        },
        [onChange],
    );

    const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const items = Array.from(event.dataTransfer.items);
        const files: File[] = [];
        items.forEach((item) => {
            if (item.kind === 'file') {
                const file = item.getAsFile();
                if (file && file.type.startsWith('image/')) {
                    files.push(file);
                }
            }
        });
        setUploadedImageSrc(URL.createObjectURL(files[0]));
        setIsDragStart(false);
    }, []);

    const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsDragStart(true);
    }, []);

    const handleDragStart = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsDragStart(true);
    }, []);

    const handleDragLeave = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsDragStart(false);
    }, []);

    const mods: Mods = {
        [classes.isLoading]: isLoading,
        [classes.hovered]: isDragStart,
    };

    return (
        <label
            htmlFor="avatar-uploaded"
            className={classNames(classes.ImageUpload, mods, [className])}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDragEnter={handleDragStart}
        >
            <input
                id="avatar-uploaded"
                className="hidden rounded-xl"
                onChange={handleUploadFile}
                type="file"
                accept="image/*"
                disabled={isLoading}
            />
            {isDragStart && <p className="text-center align-center text-white">Отпустите!</p>}
            {!isDragStart && !uploadedImageSrc && (
                <p className="text-xs text-center align-center text-white">
                    Выберите или перетащите картинку
                </p>
            )}
            {uploadedImageSrc && (
                <img className={classes.img} src={uploadedImageSrc} alt="Загруженная аватарка" />
            )}
        </label>
    );
};
