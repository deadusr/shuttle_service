const DockLeftIcon = ({ className, ...props }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <path
                d="M19.25,4 C20.7688,4 22,5.23122 22,6.75 L22,6.75 L22,17.25 C22,18.7688 20.7688,20 19.25,20 L19.25,20 L4.75,20 C3.23122,20 2,18.7688 2,17.25 L2,17.25 L2,6.75 C2,5.23122 3.23122,4 4.75,4 L4.75,4 Z M19.25,5.5 L9,5.5 L9,18.5 L19.25,18.5 C19.9404,18.5 20.5,17.9404 20.5,17.25 L20.5,6.75 C20.5,6.05964 19.9404,5.5 19.25,5.5 Z"
                fill="currentColor"
                fillRule="nonzero"
            />
        </svg>
    );
};

export default DockLeftIcon;
