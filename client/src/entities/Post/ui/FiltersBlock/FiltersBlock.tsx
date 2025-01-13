import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    SharedSelection,
} from '@nextui-org/react';
import { useDebounce } from 'use-debounce';

import { PostsApiProps } from '../../api/PostApi';

import { classNames } from '@/shared/lib/classNames';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';

interface FiltersBlockProps {
    className?: string;
    onFiltersChange: (filters: PostsApiProps) => void;
    filters: PostsApiProps;
}

export const FiltersBlock = (props: FiltersBlockProps) => {
    const { className, filters, onFiltersChange } = props;

    const [localFilters, setLocalFilters] = useState<PostsApiProps>(filters);
    const [debouncedFilters] = useDebounce<PostsApiProps>(localFilters, 500);

    useEffect(() => {
        onFiltersChange(debouncedFilters);
    }, [debouncedFilters, onFiltersChange]);

    const handleQueryChange = useCallback(
        (val: string) => {
            setLocalFilters({
                ...localFilters,
                query: val,
            });
        },
        [localFilters],
    );

    const selectedSort = useMemo(
        () => ({
            DESC: 'Сначала новые',
            ASC: 'Сначала старые',
        }),
        [],
    );

    const handleSortingChange = useCallback(
        ({ currentKey }: SharedSelection) => {
            onFiltersChange({
                ...filters,
                order: currentKey as PostsApiProps['order'],
            });
        },
        [filters, onFiltersChange],
    );

    return (
        <VStack
            align="start"
            maxW
            className={classNames('bg-default-600 p-5 rounded-md sticky -top-5 z-50', {}, [
                className,
            ])}
        >
            <Input onValueChange={handleQueryChange} label="Поиск по статьям" />

            <HStack gap="12px">
                <p>Сортировка по:</p>
                <Dropdown>
                    <DropdownTrigger>
                        <Button size="sm">{selectedSort[filters.order || 'DESC']}</Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        onSelectionChange={handleSortingChange}
                        selectionMode="single"
                        selectedKeys="DESC"
                    >
                        <DropdownItem key="DESC">Сначала новые</DropdownItem>
                        <DropdownItem key="ASC">Сначала старые</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </HStack>
        </VStack>
    );
};
