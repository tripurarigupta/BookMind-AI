// const PLACEHOLDER = "https://placehold.co/300x450?text=BookMind-AI";
const PLACEHOLDER = "https://images.gr-assets.com/books/1320564197m/1028358.jpg";

const BookImage = ({
    src,
    alt,
    className = "",
}) => {
    const imageSrc =
        !src || src.includes("nophoto")
            ? PLACEHOLDER
            : src;

    return (
        <img
            src={imageSrc}
            alt={alt}
            className={className}
            loading="lazy"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = PLACEHOLDER;
            }}
        />
    );
};

export default BookImage;