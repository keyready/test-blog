import ContentLoader from 'react-content-loader';

interface SkeletonProps {
    width: number | string;
    height: number | string;
    rounded?: number | string;
    className?: string;
}

export const Skeleton = (props: SkeletonProps) => {
    const { className, height, rounded = 4, width } = props;

    return (
        <ContentLoader
            speed={2}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            backgroundColor="#808080"
            foregroundColor="#444"
            className={className}
        >
            <rect x="0" y="0" rx={rounded} ry={rounded} width="100%" height="100%" />
        </ContentLoader>
    );
};
