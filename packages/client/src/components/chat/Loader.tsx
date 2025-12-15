import styles from './Loader.module.css';

// Visual cue for loading state:
const LoadingDots = () => {
    return (
        <div className={styles.ldsEllipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default LoadingDots;
