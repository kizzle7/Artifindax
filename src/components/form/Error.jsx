import React from 'react';

const Error = ({ errorName }) => {
    if (!errorName) return null;
    return (
        <span className="text-red-500 text-[10px] mt-1 block px-1 font-medium italic">
            {errorName.message || errorName}
        </span>
    );
};

export default Error;
